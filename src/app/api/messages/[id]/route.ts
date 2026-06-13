import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/api";
import { getPortfolioData, updatePortfolioData } from "@/lib/portfolio-store";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
  const parsed = z.object({ status: z.enum(["read", "unread"]) }).safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ success: false, message: "Invalid status" }, { status: 400 });
  const { id } = await params;
  const exists = (await getPortfolioData()).messages.find((message) => message.id === id);
  if (!exists) return NextResponse.json({ success: false, message: "Message not found" }, { status: 404 });
  const data = { ...exists, ...parsed.data, updatedAt: new Date().toISOString() };
  await updatePortfolioData((portfolio) => ({ ...portfolio, messages: portfolio.messages.map((message) => message.id === id ? data : message) }));
  return NextResponse.json({ success: true, message: "Message updated", data });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
  const { id } = await params;
  const exists = (await getPortfolioData()).messages.some((message) => message.id === id);
  if (!exists) return NextResponse.json({ success: false, message: "Message not found" }, { status: 404 });
  await updatePortfolioData((portfolio) => ({ ...portfolio, messages: portfolio.messages.filter((message) => message.id !== id) }));
  return NextResponse.json({ success: true, message: "Message deleted" });
}
