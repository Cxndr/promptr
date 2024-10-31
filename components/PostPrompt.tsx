"use client";

import { Prompt } from "@/lib/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PostPromptProps = {
  prompt: Prompt;
  promptsUpperBound: number;
  promptsLowerBound: number;
  nextPrompt: () => void;
  prevPrompt: () => void;
};

export default function PostPrompt({
  prompt,
  promptsLowerBound,
  promptsUpperBound,
  nextPrompt,
  prevPrompt,
}: PostPromptProps) {
  const leftButtonClassName =
    prompt.id <= promptsLowerBound
      ? "disabled text-background/10 cursor-auto"
      : "text-background/75 hover:scale-100 hover:text-background/95 transition-all duration-300";
  const rightButtonClassName =
    prompt.id >= promptsUpperBound
      ? "disabled text-background/10 cursor-auto"
      : "text-background/75 hover:scale-100 hover:text-background/95 transition-all duration-300";

  function handleNextNav() {
    nextPrompt();
  }
  function handlePrevNav() {
    prevPrompt();
  }

  return (
    <>
      <h3 className="text-md font-medium italic text-faded-dark">
        Prompt #{prompt.id}
      </h3>
      <div className="bg-foreground-raised/70 rounded-2xl shadow-md shadow-black">
        <div className="w-full flex justify-center items-center gap-8">
          <button className={leftButtonClassName} onClick={handlePrevNav}>
            <ChevronLeft size={96} className="" />
          </button>
          <div className="max-w-4xl mx-auto">
            {prompt && (
              <p className="text-2xl font-bold text-left text-background">
                {prompt.content}
              </p>
            )}
          </div>
          <button className={rightButtonClassName} onClick={handleNextNav}>
            <ChevronRight size={96} className="" />
          </button>
        </div>
      </div>
    </>
  );
}
