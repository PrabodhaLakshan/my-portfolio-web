"use server";
import { getPortfolioData } from "@/lib/portfolio-store";
export async function getProfile() { return (await getPortfolioData()).profile; }
