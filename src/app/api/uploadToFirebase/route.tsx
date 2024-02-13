import { db } from "@/lib/db";
import { $ideas } from "@/lib/db/schema";
import { uploadFileToFirebase } from "@/lib/firebase";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { ideaId } = await req.json();
    // extract out the dalle imageurl
    // save it to firebase
    const ideas = await db
      .select()
      .from($ideas)
      .where(eq($ideas.id, parseInt(ideaId)));
    if (!ideas[0].imageUrl) {
      return new NextResponse("no image url", { status: 400 });
    }
    const firebase_url = await uploadFileToFirebase(
      ideas[0].imageUrl,
      ideas[0].name
    );
    // update the note with the firebase url
    await db
      .update($ideas)
      .set({
        imageUrl: firebase_url,
      })
      .where(eq($ideas.id, parseInt(ideaId)));
    return new NextResponse("ok", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("error", { status: 500 });
  }
}