import { db } from "@/lib/db";
import { $ideas } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { ideaId, editorState } = body;
    if (!editorState || !ideaId) {
      return new NextResponse("Missing either editorState or Idea Id", { status: 400 });
    }

    ideaId = parseInt(ideaId);
    const notes = await db.select().from($ideas).where(eq($ideas.id, ideaId));
    if (notes.length != 1) {
      return new NextResponse("Failed to update", { status: 500 });
    }

    const note = notes[0];
    if (note.editorState !== editorState) {
      await db
        .update($ideas)
        .set({
          editorState,
        })
        .where(eq($ideas.id, ideaId));
    }
    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}
