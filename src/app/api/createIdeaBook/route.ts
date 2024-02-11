// /api/createIdeaBook


import { db } from "@/lib/db";
import { $ideas } from "@/lib/db/schema";
import { generateImage, generateImagePrompt } from "@/lib/openai";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("unauthorised", { status: 401 });
  }
  const body = await req.json();
  const { name } = body;
  const image_description = await generateImagePrompt(name);
  if (!image_description) {
    return new NextResponse("Failed to generate image description", {
      status: 500,
    });
  }
  const image_url = await generateImage(image_description);
  if (!image_url) {
    return new NextResponse("Failed to generate image ", {
      status: 500,
    });
  }

  const idea_id = await db
    .insert($ideas)
    .values({
      name,
      userId,
      imageUrl: image_url,
    })
    .returning({
      insertedId: $ideas.id,
    });

  return NextResponse.json({
    idea_id: idea_id[0].insertedId,
  });
}
