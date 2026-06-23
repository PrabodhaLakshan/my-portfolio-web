import { get, put } from "@vercel/blob";
import { defaultPortfolioData } from "@/app/modules/shared/default-portfolio-data";
import type { PortfolioData } from "@/app/modules/shared/types/portfolio-data";
import { BLOB_ACCESS, toServedPortfolioAssetUrls } from "@/lib/blob-assets";

const PORTFOLIO_DATA_BLOB_PATH =
  process.env.PORTFOLIO_DATA_BLOB_PATH || "portfolio-data.json";

function cloneDefaultData(): PortfolioData {
  return structuredClone(defaultPortfolioData);
}

export async function getPortfolioData(): Promise<PortfolioData> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return toServedPortfolioAssetUrls(cloneDefaultData());

  try {
    const result = await get(PORTFOLIO_DATA_BLOB_PATH, {
      access: BLOB_ACCESS,
      useCache: false,
    });
    if (!result || result.statusCode === 304) return toServedPortfolioAssetUrls(cloneDefaultData());

    const response = new Response(result.stream);
    return toServedPortfolioAssetUrls((await response.json()) as PortfolioData);
  } catch {
    return toServedPortfolioAssetUrls(cloneDefaultData());
  }
}

export async function savePortfolioData(
  data: PortfolioData,
): Promise<PortfolioData> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
  }

  await put(PORTFOLIO_DATA_BLOB_PATH, JSON.stringify(data, null, 2), {
    access: BLOB_ACCESS,
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
