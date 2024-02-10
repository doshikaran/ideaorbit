import TypewriterTitle from "@/components/ui/TypewriterTitle";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gradient-to-r min-h-screen from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className=" font-semibold text-5xl text-center uppercase tracking-wider mb-10">
          Welcome to <span className=" text-orange-500"> Idea-Orbit !</span>
        </h1>
        <h1 className="font-semibold text-2xl text-center  text-gray-500 tracking-wider">
          Ideas Penned, Pathways Opened, Projects Born.
        </h1>
        <div className="mt-4"></div>
        <h2 className="font-semibold text-3xl text-center text-slate-700">
          <TypewriterTitle />
        </h2>
        <div className="mt-8"></div>

        <div className="flex justify-center">
          <Link href="/dashboard">
            <Button className=" bg-orange-500 text-white tracking-wider uppercase">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" strokeWidth={2} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
