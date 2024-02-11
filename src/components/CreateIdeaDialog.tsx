"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Loader2, Plus } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type Props = {};

const CreateIdeaDialog = (props: Props) => {
  const router = useRouter();
  const [input, setInput] = useState("");

  const createIdeaBook = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/createIdeaBook", {
        name: input,
      });
      return response.data;
    },
  });

  const handleSubmit = (error: React.FormEvent<HTMLFormElement>) => {
    error.preventDefault();
    if (!input) {
      window.alert("Please Enter a name for your Idea Book");
      return;
    }
    createIdeaBook.mutate(undefined, {
      onSuccess: ({ idea_id }) => {
        console.log("Idea Book created", { idea_id });
        router.push(`/ideabook/${idea_id}`);
      },
      onError: (error) => {
        console.error(error);
        window.alert("Idea Book creation failed");
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="border-dashed border-2 flex border-orange-500 h-full rounded-lg items-center justify-center sm:flex-col hover:shadow-xl transition hover:-translate-y-1 flex-row p-4">
          <Plus className="w-6 h-6 text-orange-500" strokeWidth={2} />
          <h2 className="font-semibold text-orange-500 sm:mt-2 tracking-wider">
            New Idea Book
          </h2>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Idea Book</DialogTitle>
          <DialogDescription>
            You can write down new ideas by clicking the button below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Name your Idea Book"
          />
          <div className="flex items-center justify-between mt-5">
            <Button type="reset" variant={"secondary"}>
              Cancel
            </Button>
            <Button 
            
            type="submit" variant={"secondary"}>
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateIdeaDialog;
