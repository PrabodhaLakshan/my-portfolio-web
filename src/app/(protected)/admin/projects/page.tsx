import { AdminHeading } from "@/app/modules/admin/components/admin-heading";
import { ProjectList } from "@/app/modules/projects/components/project-list";
import { getPortfolioData } from "@/lib/portfolio-store";

export const dynamic = "force-dynamic";

export default async function Page() {
  const projects = (await getPortfolioData()).projects.sort((a, b) => a.order - b.order);
  return (
    <>
      <AdminHeading title="Projects" description="Create, feature, reorder, and publish portfolio projects and demo videos." />
      <ProjectList projects={projects} />
    </>
  );
}
