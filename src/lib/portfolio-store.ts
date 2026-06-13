import { list, put } from "@vercel/blob";
import { defaultPortfolioData } from "@/app/modules/shared/default-portfolio-data";
import type { PortfolioData } from "@/app/modules/shared/types/portfolio-data";

const PORTFOLIO_DATA_BLOB_PATH =
  process.env.PORTFOLIO_DATA_BLOB_PATH || "portfolio-data.json";

function cloneDefaultData(): PortfolioData {
  return structuredClone(defaultPortfolioData);
}

export async function getPortfolioData(): Promise<PortfolioData> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return cloneDefaultData();

  try {
    const result = await list({ prefix: PORTFOLIO_DATA_BLOB_PATH });
    const blob = result.blobs.find(
      (item) => item.pathname === PORTFOLIO_DATA_BLOB_PATH,
    );
    if (!blob?.url) return cloneDefaultData();

    const response = await fetch(blob.url, { cache: "no-store" });
    if (!response.ok) return cloneDefaultData();

    return (await response.json()) as PortfolioData;
  } catch {
    return cloneDefaultData();
  }
}

export async function savePortfolioData(
  data: PortfolioData,
): Promise<PortfolioData> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
  }

  await put(PORTFOLIO_DATA_BLOB_PATH, JSON.stringify(data, null, 2), {
    access: "public",
    contentType: "application/json",
    allowOverwrite: true,
    addRandomSuffix: false,
    cacheControlMaxAge: 60,
  });
  return data;
}

export async function updatePortfolioData(
  updater: (data: PortfolioData) => PortfolioData | Promise<PortfolioData>,
): Promise<PortfolioData> {
  const updatedData = await updater(await getPortfolioData());
  await savePortfolioData(updatedData);
  return updatedData;
}
