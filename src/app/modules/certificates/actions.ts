"use server";
import { getPortfolioData } from "@/lib/portfolio-store";
export async function getCertificates() { return (await getPortfolioData()).certificates.sort((a, b) => a.order - b.order); }
