import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api";
import { getPortfolioData, updatePortfolioData } from "@/lib/portfolio-store";
import { normalizeProjectVideo } from "@/lib/project-video";
import { projectSchema } from "@/lib/validations/project";

export async function GET() {
  const projects = (await getPortfolioData()).projects.sort((a, b) => a.order - b.order);
  return NextResponse.json({ success: true, message: "Projects loaded", data: projects });
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
  const parsed = projectSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ success: false, message: parsed.error.issues[0]?.message, data: parsed.error.flatten() }, { status: 400 });

  const current = await getPortfolioData();
  if (current.projects.some((project) => project.slug === parsed.data.slug)) {
    return NextResponse.json({ success: false, message: "That project slug is already in use" }, { status: 409 });
  }

  const video = normalizeProjectVideo(parsed.data.video as never);
  if (!video.success) return NextResponse.json({ success: false, message: video.message }, { status: 400 });
  const now = new Date().toISOString();
  const data = JSON.parse(JSON.stringify({ ...parsed.data, video: video.data, id: crypto.randomUUID(), createdAt: now, updatedAt: now }));
  await updatePortfolioData((portfolio) => ({ ...portfolio, projects: [...portfolio.projects, data] }));
  return NextResponse.json({ success: true, message: "Project created", data }, { status: 201 });
}
