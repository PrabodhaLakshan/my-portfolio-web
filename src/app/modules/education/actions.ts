"use server";
import { getPortfolioData } from "@/lib/portfolio-store";
export async function getEducation() { return (await getPortfolioData()).education.sort((a, b) => a.order - b.order); }
