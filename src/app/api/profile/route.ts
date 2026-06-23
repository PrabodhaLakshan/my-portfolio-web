import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api";
import { getPortfolioData, updatePortfolioData } from "@/lib/portfolio-store";
import { profileSchema } from "@/lib/validations/profile";
import { emptyToNull } from "@/lib/utils";

export async function GET() {
  try {
    return NextResponse.json({ success: true, message: "Profile loaded", data: (await getPortfolioData()).profile });
  } catch {
    return NextResponse.json({ success: false, message: "Could not load profile" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
  try {
    const parsed = profileSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ success: false, message: parsed.error.issues[0]?.message, data: parsed.error.flatten() }, { status: 400 });
    const data = Object.fromEntries(Object.entries(parsed.data).map(([key, value]) => [key, typeof value === "string" ? emptyToNull(value) ?? undefined : value]));
    const portfolio = await updatePortfolioData((current) => ({ ...current, profile: data as typeof current.profile }));
    const profile = portfolio.profile;
    return NextResponse.json({ success: true, message: "Profile updated", data: profile });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Could not update profile",
      },
      { status: 500 },
    );
  }
}
