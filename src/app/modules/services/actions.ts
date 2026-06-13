"use server";
import { getPortfolioData } from "@/lib/portfolio-store";
export async function getServices() { return (await getPortfolioData()).services.sort((a, b) => a.order - b.order); }
