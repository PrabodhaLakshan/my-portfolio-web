import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api";
import { getPortfolioData, updatePortfolioData } from "@/lib/portfolio-store";
import { normalizeProjectVideo } from "@/lib/project-video";
import { projectSchema } from "@/lib/validations/project";

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Context) {
  const { id } = await params;
  const data = (await getPortfolioData()).projects.find((project) => project.id === id);
  return data
    ? NextResponse.json({ success: true, message: "Project loaded", data })
    : NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
}

export async function PATCH(request: Request, { params }: Context) {
  if (!(await requireAdmin())) return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
  const { id } = await params;
  const parsed = projectSchema.partial().safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ success: false, message: parsed.error.issues[0]?.message, data: parsed.error.flatten() }, { status: 400 });
  const current = await getPortfolioData();
  const existing = current.projects.find((project) => project.id === id);
  if (!existing) return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
  if (parsed.data.slug && current.projects.some((project) => project.id !== id && project.slug === parsed.data.slug)) {
    return NextResponse.json({ success: false, message: "That project slug is already in use" }, { status: 409 });
  }
  const video = normalizeProjectVideo((parsed.data.video ?? existing.video) as never);
  if (!video.success) return NextResponse.json({ success: false, message: video.message }, { status: 400 });
  const data = JSON.parse(JSON.stringify({ ...existing, ...parsed.data, video: video.data, updatedAt: new Date().toISOString() }));
  await updatePortfolioData((portfolio) => ({ ...portfolio, projects: portfolio.projects.map((project) => project.id === id ? data : project) }));
  return NextResponse.json({ success: true, message: "Project updated", data });
}

export async function DELETE(_request: Request, { params }: Context) {
  if (!(await requireAdmin())) return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
  const { id } = await params;
  const current = await getPortfolioData();
  if (!current.projects.some((project) => project.id === id)) return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
  await updatePortfolioData((portfolio) => ({ ...portfolio, projects: portfolio.projects.filter((project) => project.id !== id) }));
  return NextResponse.json({ success: true, message: "Project deleted" });
}
