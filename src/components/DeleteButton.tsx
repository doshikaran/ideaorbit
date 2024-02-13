"use client";
import React from "react";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {
  ideaId: number;
};

const DeleteButton = ({ ideaId }: Props) => {
  const router = useRouter();
  const deleteIdea = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/deleteIdea", {
        ideaId,
      });
      return response.data;
    },
  });

  const deletehandle = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirm) return;
    deleteIdea.mutate(undefined, {
      onSuccess: () => {
        router.push("/dashboard");
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };
  
  return (
    <Button
      variant={"destructive"}
      size="sm"
      disabled={deleteIdea.isPending}
      onClick={deletehandle}
    >
      <Trash />
    </Button>
  );
};

export default DeleteButton;
