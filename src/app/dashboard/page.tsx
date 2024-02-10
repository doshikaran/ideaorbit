import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {}

const Dashboard = (props: Props) => {
  return (
    <>
      <div className=" min-h-screen">
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
        </div>
      </div>
    </>
  );
};

export default Dashboard;
