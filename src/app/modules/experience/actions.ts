"use server";
import { getPortfolioData } from "@/lib/portfolio-store";
export async function getExperience() { return (await getPortfolioData()).experience.sort((a, b) => a.order - b.order); }
