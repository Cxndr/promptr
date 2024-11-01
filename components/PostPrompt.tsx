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
    <div className="w-auto sm:w-[38rem] xl:w-[50rem] max-w-full bg-background-raised/70 px-3 pb-3 rounded-2xl shadow-md shadow-themeshadow">
      <h3 className="text-md font-medium italic text-faded-dark p-2">
        Prompt #{prompt.id} / {promptsUpperBound}
      </h3>
      <div className="w-full flex justify-center items-center gap-0 sm:gap-6 bg-foreground-raised/70 rounded-2xl shadow-md shadow-black/80">
        <button className={leftButtonClassName} onClick={handlePrevNav}>
          <ChevronLeft size={96} className="w-20 sm:w-24" />
        </button>
        <div className="mx-auto">
          {prompt && (
            <p className="text-2xl font-bold text-center sm:text-left text-background-pure">
              {prompt.content}
            </p>
          )}
        </div>
        <button className={rightButtonClassName} onClick={handleNextNav}>
          <ChevronRight size={96} className="w-20 sm:w-24" />
        </button>
      </div>
    </div>
  );
}
