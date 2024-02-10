import CreateIdeaDialog from "@/components/CreateIdeaDialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserButton } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

interface Props {}

const Dashboard = (props: Props) => {
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
              My Notes
            </h1>
            <UserButton />
          </div>

          <div className=" mt-10">
            <Separator />
          </div>

          {/*  */}
          <div className=" mt-10 text-center">
            <h2 className=" tracking-widest text-gray-500">
              Currently you have no ideas penned down.
            </h2>
          </div>

          {/* display all the ideas */}
          <div className=" grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-3 mt-3">
            <CreateIdeaDialog />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
