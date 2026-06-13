import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import type { AnyZodObject } from "zod";
import type { PortfolioData } from "@/app/modules/shared/types/portfolio-data";
import { authOptions } from "@/lib/auth";
import { getPortfolioData, updatePortfolioData } from "@/lib/portfolio-store";

type ModelName = "project" | "skill" | "education" | "experience" | "certificate" | "service";
type CollectionKey = "projects" | "skills" | "education" | "experience" | "certificates" | "services";

const collectionKeys: Record<ModelName, CollectionKey> = {
  project: "projects",
  skill: "skills",
  education: "education",
  experience: "experience",
  certificate: "certificates",
  service: "services",
};

function response(success: boolean, message: string, data?: unknown, status = 200) {
  return NextResponse.json({ success, message, ...(data === undefined ? {} : { data }) }, { status });
}

export async function requireAdmin() {
  return Boolean(await getServerSession(authOptions));
}

function serialized<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function collectionHandlers(model: ModelName, schema: AnyZodObject) {
  return {
    GET: async () => {
      try {
        const data = [...(await getPortfolioData())[collectionKeys[model]]].sort(
          (a, b) => a.order - b.order,
        );
        return response(true, "Records loaded", data);
      } catch {
        return response(false, "Could not load records", undefined, 500);
      }
    },
    POST: async (request: Request) => {
      if (!(await requireAdmin())) return response(false, "Authentication required", undefined, 401);
      try {
        const parsed = schema.safeParse(await request.json());
        if (!parsed.success) return response(false, parsed.error.issues[0]?.message ?? "Invalid request", parsed.error.flatten(), 400);
        const now = new Date().toISOString();
        const data = serialized({
          ...parsed.data,
          id: crypto.randomUUID(),
          ...(model === "project" ? { createdAt: now, updatedAt: now } : {}),
        });
        await updatePortfolioData((portfolio) => {
          const key = collectionKeys[model];
          (portfolio[key] as unknown[]).push(data);
          return portfolio;
        });
        return response(true, "Record created", data, 201);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Could not create record";
        return response(false, message, undefined, 500);
      }
    },
  };
}

export function itemHandlers(model: ModelName, schema: AnyZodObject) {
  return {
    GET: async (_request: Request, context: { params: Promise<{ id: string }> }) => {
      try {
        const { id } = await context.params;
        const data = (await getPortfolioData())[collectionKeys[model]].find(
          (item) => item.id === id,
        );
        return data ? response(true, "Record loaded", data) : response(false, "Record not found", undefined, 404);
      } catch {
        return response(false, "Could not load record", undefined, 500);
      }
    },
    PATCH: async (request: Request, context: { params: Promise<{ id: string }> }) => {
      if (!(await requireAdmin())) return response(false, "Authentication required", undefined, 401);
      try {
        const { id } = await context.params;
        const parsed = schema.partial().safeParse(await request.json());
        if (!parsed.success) return response(false, parsed.error.issues[0]?.message ?? "Invalid request", parsed.error.flatten(), 400);
        const current = await getPortfolioData();
        const key = collectionKeys[model];
        const exists = current[key].find((item) => item.id === id);
        if (!exists) return response(false, "Record not found", undefined, 404);
        const data = serialized({
          ...exists,
          ...parsed.data,
          ...(model === "project" ? { updatedAt: new Date().toISOString() } : {}),
        });
        await updatePortfolioData((portfolio) => {
          const items = portfolio[key] as unknown as { id: string }[];
          const index = items.findIndex((item) => item.id === id);
          items[index] = data;
          return portfolio;
        });
        return response(true, "Record updated", data);
      } catch {
        return response(false, "Could not update record", undefined, 500);
      }
    },
    DELETE: async (_request: Request, context: { params: Promise<{ id: string }> }) => {
      if (!(await requireAdmin())) return response(false, "Authentication required", undefined, 401);
      try {
        const { id } = await context.params;
        const key = collectionKeys[model];
        const exists = (await getPortfolioData())[key].some((item) => item.id === id);
        if (!exists) return response(false, "Record not found", undefined, 404);
        await updatePortfolioData((portfolio) => {
          (portfolio[key] as unknown as { id: string }[]) = portfolio[key].filter(
            (item) => item.id !== id,
          ) as never;
          return portfolio;
        });
        return response(true, "Record deleted");
      } catch {
        return response(false, "Could not delete record", undefined, 500);
      }
    },
  };
}
