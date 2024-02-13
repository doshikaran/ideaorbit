import CreateIdeaDialog from "@/components/CreateIdeaDialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { $ideas } from "@/lib/db/schema";
import { UserButton, auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface Props {}

const Dashboard = async (props: Props) => {
  const { userId } = auth();
  const ideas = await db
    .select()
    .from($ideas)
    .where(eq($ideas.userId, userId!));
  return (
    <>
      <div className=" min-h-screen grainy">
        <div className=" max-w-5xl mx-auto p-10">
          <div className="flex justify-evenly items-center md:flex-row flex-col  p-5">
            <Link href="/">
              <Button className="bg-orange-500" size="sm">
                <ArrowLeft className="mr-1 w-4 h-4" />
                Back
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-black tracking-widest">
              My Ideas
            </h1>
            <UserButton />
          </div>

          <div className=" mt-10">
            <Separator />
          </div>

          {/*  */}
          {ideas.length === 0 && (
            <div className=" mt-10 text-center">
              <h2 className=" tracking-widest text-gray-500">
                Currently you have no ideas penned down.
              </h2>
            </div>
          )}

          {/* display all the ideas */}
          <div className=" grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-3 mt-3">
            <CreateIdeaDialog />
            {ideas.map((idea) => {
              return (
                <a href={`/ideabook/${idea.id}`} key={idea.id}>
                  <div className="border border-stone-300 rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition hover:-translate-y-1">
                    <img
                      width={400}
                      height={200}
                      alt={idea.name}
                      src={idea.imageUrl || ""}
                    />
                    <div className=" p-5">
                      <h3 className=" uppercase tracking-wider font-bold text-xl text-black">
                        {idea.name}
                      </h3>
                      <p className=" mt-3 text-xs">
                      {new Date(idea.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
