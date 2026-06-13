"use server";
import { getPortfolioData } from "@/lib/portfolio-store";
export async function getSkills() { return (await getPortfolioData()).skills.sort((a, b) => a.order - b.order); }
