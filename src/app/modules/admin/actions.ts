"use server";
import { getPortfolioData } from "@/lib/portfolio-store";
export async function getMessages() { return (await getPortfolioData()).messages.sort((a, b) => b.createdAt.localeCompare(a.createdAt)); }
export async function getSettings() { return (await getPortfolioData()).settings; }
