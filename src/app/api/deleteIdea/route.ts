import { db } from "@/lib/db";
import { $ideas } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { ideaId } = await req.json();
  await db.delete($ideas).where(eq($ideas.id, parseInt(ideaId)));
  return new NextResponse("ok", { status: 200 });
}
