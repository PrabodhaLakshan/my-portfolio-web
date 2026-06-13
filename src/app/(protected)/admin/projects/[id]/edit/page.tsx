import { notFound } from "next/navigation";
import { getPortfolioData } from "@/lib/portfolio-store";
import { ProjectEditor } from "@/app/modules/projects/components/project-editor";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = (await getPortfolioData()).projects.find((item) => item.id === id);
  if (!project) notFound();
  return <ProjectEditor project={project} />;
}
