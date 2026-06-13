import { getPortfolioData as readPortfolioData } from "@/lib/portfolio-store";

export async function getPortfolioData() {
  const data = await readPortfolioData();
  return {
    ...data,
    projects: [...data.projects].sort(
      (a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order,
    ),
    skills: [...data.skills].sort(
      (a, b) => a.category.localeCompare(b.category) || a.order - b.order,
    ),
    services: data.services.filter((service) => service.active).sort((a, b) => a.order - b.order),
  };
}
