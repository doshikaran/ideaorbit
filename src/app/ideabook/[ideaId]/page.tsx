import DeleteButton from "@/components/DeleteButton";
import Editor from "@/components/Editor";
import { Button } from "@/components/ui/button";
import { clerk } from "@/lib/clerk.server";
import { db } from "@/lib/db";
import { $ideas } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { eq, and } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: {
    ideaId: string;
  };
}

const IdeaBookPage = async ({ params: { ideaId } }: Props) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/dashboard");
  }
  const user = await clerk.users.getUser(userId);
  const ideas = await db
    .select()
    .from($ideas)
    .where(and(eq($ideas.id, parseInt(ideaId)), eq($ideas.userId, userId)));

  if (ideas.length != 1) {
    return redirect("/dashboard");
  }
  const idea = ideas[0];
  return (
    <div className="min-h-screen grainy p-8">
      <div className="max-w-4xl mx-auto">
        <div className="border shadow-xl border-stone-200 rounded-lg p-4 flex items-center">
          <Link href="/dashboard">
            <Button className="bg-orange-500" size="sm">
              Back
            </Button>
          </Link>
          <div className="w-3"></div>
          <span className="font-semibold">
            {user.firstName} {user.lastName}
          </span>
          <span className="inline-block mx-1">/</span>
          <span className="text-stone-500 font-semibold">{idea.name}</span>
          <div className="ml-auto">
            <DeleteButton ideaId={idea.id} />
          </div>
        </div>

        <div className="border-stone-200 shadow-xl border rounded-lg px-16 py-8 w-full mt-10">
          <Editor idea={idea} />
        </div>
      </div>
    </div>
  );
};

export default IdeaBookPage;
