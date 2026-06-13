import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api";
import { getPortfolioData, updatePortfolioData } from "@/lib/portfolio-store";
import { messageSchema } from "@/lib/validations/message";

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
  const data = (await getPortfolioData()).messages.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return NextResponse.json({ success: true, message: "Messages loaded", data });
}

export async function POST(request: Request) {
  try {
    const parsed = messageSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ success: false, message: parsed.error.issues[0]?.message, data: parsed.error.flatten() }, { status: 400 });
    const now = new Date().toISOString();
    const data = { ...parsed.data, id: crypto.randomUUID(), status: "unread" as const, createdAt: now, updatedAt: now };
    await updatePortfolioData((portfolio) => ({ ...portfolio, messages: [data, ...portfolio.messages] }));
    return NextResponse.json({ success: true, message: "Message sent", data }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: "Could not send message" }, { status: 500 });
  }
}
