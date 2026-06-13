"use server";
import { getPortfolioData } from "@/lib/portfolio-store";
export async function getProjects() { return (await getPortfolioData()).projects.sort((a, b) => a.order - b.order); }
