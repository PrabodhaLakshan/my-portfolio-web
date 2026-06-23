import { NextResponse } from "next/server";
import type { SiteSettings } from "@/app/modules/shared/types/portfolio-data";
import { requireAdmin } from "@/lib/api";
import { getPortfolioData, updatePortfolioData } from "@/lib/portfolio-store";
import { settingsSchema } from "@/lib/validations/settings";

export async function GET() {
  try {
    return NextResponse.json({ success: true, message: "Settings loaded", data: (await getPortfolioData()).settings });
  } catch {
    return NextResponse.json({ success: false, message: "Could not load settings" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
  try {
    const parsed = settingsSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ success: false, message: parsed.error.issues[0]?.message, data: parsed.error.flatten() }, { status: 400 });
    const settingsData = Object.fromEntries(
      Object.entries(parsed.data).filter(([, value]) => value !== null),
    ) as SiteSettings;
    const portfolio = await updatePortfolioData((current) => ({ ...current, settings: settingsData }));
    const settings = portfolio.settings;
    return NextResponse.json({ success: true, message: "Settings updated", data: settings });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Could not update settings",
      },
      { status: 500 },
    );
  }
}
