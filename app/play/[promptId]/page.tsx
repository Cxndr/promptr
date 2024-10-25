import PostInput from "@/components/PostInput";
import PostPrompt from "@/components/PostPrompt";

import { db } from "@/lib/db";
import { Word } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { Prompt } from "@/lib/types";

import { ChevronLeft, ChevronRight } from "lucide-react";

type PromptPageProps = {
  params: {
    promptId: string;
  }
}

export default async function PromptPage({params}: PromptPageProps) {

  const { userId } = await auth();

  const { rows: baseWords }: { rows: Word[] } = await db.query(
    "SELECT word FROM wg_words"
  );
  const { rows: fillerWords }: { rows: Word[] } = await db.query(
    "SELECT word FROM wg_filler_words"
  );

  const {rows: promptRes} : {rows: Prompt[]} = await db.query(
    "SELECT * FROM wg_prompts WHERE id = ($1)",
    [params.promptId]
  )
  const prompt = promptRes[0];
    

  const { rows: promptId }: { rows: Prompt[] } = await db.query(
    "SELECT id, content FROM wg_prompts"
  );

  const handleSubmit = async (data: { words: string[]; content: string }) => {
    "use server";

    try {
      await db.query(
        `INSERT INTO wg_posts (clerk_id, prompt_id, content, words) VALUES ($1, $2, $3, $4)`,
        [userId, promptId, data.content, data.words]
      );
      console.log("Success. content:", data.content, "and words:", data.words);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl flex flex-col gap-6 justify-center items-center">
      
      <div className="flex justify-center items-center gap-8">
        <ChevronLeft size={96} className="text-zinc-200" />
        <PostPrompt prompt={prompt}/>
        <ChevronRight size={96} className="text-zinc-200"/>
      </div>

      <div className="max-w-5xl">
        <PostInput
          baseWords={baseWords}
          fillerWords={fillerWords}
          handleSubmit={handleSubmit}
        />
      </div>
      
    </div>
  )
}