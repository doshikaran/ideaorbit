"use client";
import React, { useEffect, useState, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import Text from "@tiptap/extension-text";
import Placeholder from "@tiptap/extension-placeholder";

import EditorMenuBar from "./EditorMenuBar";
import { Button } from "./ui/button";
import { useDebounce } from "@/lib/useDebounce";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useCompletion } from "ai/react";
import { IdeaType } from "@/lib/db/schema";

interface Props {
  idea: IdeaType;
}

const Editor = ({ idea }: Props) => {
  const [editorState, setEditorState] = useState(idea.editorState || "");
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  const { complete, completion } = useCompletion({
    api: "/api/completion",
  });
  const savedIdea = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/savedIdea", {
        ideaId: idea.id,
        editorState,
      });
      return response.data;
    },
  });
  const customedText = Text.extend({
    addKeyboardShortcuts() {
      return {
        "Shift-a": () => {
          const prompt = this.editor.getText().split(" ").slice(-30).join(" ");
          console.log(prompt);
          complete(prompt);
          console.log("Activate AI");
          return true;
        },
      };
    },
  });
  // const editor = useEditor({
  //   autofocus: true,
  //   extensions: [StarterKit, customedText],
  //   content: editorState,
  //   onUpdate: ({ editor }) => {
  //     setEditorState(editor.getHTML());
  //   },
  // });

  const editor = useEditor({
    extensions: [
      StarterKit,
      customedText,
      Placeholder.configure({
        placeholder: "start typing here",
        showOnlyWhenEditable: true,
        showOnlyCurrent: true,
        includeChildren: false,
      }),
    ],
    autofocus: true,
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
      if (!hasStartedTyping) {
        setHasStartedTyping(true);
      }
    },
  });

  const debouncedEditorState = useDebounce(editorState, 1000);
  useEffect(() => {
    // save to db
    if (debouncedEditorState === "") return;
    savedIdea.mutate(undefined, {
      onSuccess: (data) => {
        console.log("Successfully updated", data);
      },
      onError: (err) => {
        console.error(err);
      },
    });
  }, [debouncedEditorState]);

  const lastCompletion = useRef("");
  useEffect(() => {
    if (!completion || !editor) return;
    const difference = completion.slice(lastCompletion.current.length);
    lastCompletion.current = completion;
    editor.commands.insertContent(difference);
  }, [completion, editor]);
  return (
    <>
      {/* menu bar */}
      <div className=" flex items-center justify-between">
        {editor && <EditorMenuBar editor={editor} />}
        <Button
          disabled
          variant={"outline"}
          className=" uppercase tracking-widest text-xs h-8 w-14"
        >
          {savedIdea.isPending ? "Saving" : "Saved  "}
        </Button>
      </div>

      {/* editor */}
      <div className=" prose mt-5 prose-sm w-full">
        <EditorContent editor={editor} />
      </div>

      {/* tips */}
      <div className=" mt-5 flex flex-col space-y-5">
        {!hasStartedTyping && ( 
          <h1 className="text-[12px] tracking-widest font-medium">
            Click above and start typing....
          </h1>
        )}
        <span className="text-sm text-gray-500 tracking-widest">
          Tip: Press{" "}
          <kbd className="px-2 py-2 tracking-widest text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
            Shift + A
          </kbd>{" "}
          for AI autocomplete
        </span>
      </div>
    </>
  );
};

export default Editor;
