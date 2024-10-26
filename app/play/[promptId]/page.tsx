import PostInput from "@/components/PostInput";
import PostPrompt from "@/components/PostPrompt";

import { db } from "@/lib/db";
import { Word } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { Prompt } from "@/lib/types";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

type PromptPageProps = {
  params: {
    promptId: string;
  }
}

export default async function PromptPage({params}: PromptPageProps) {

  const { userId } = await auth();

  const { rows: baseWords }: { rows: Word[] } = await db.query(`
    SELECT word 
    FROM wg_words 
    ORDER BY RANDOM() 
    LIMIT 20
  `);
  const { rows: fillerWords }: { rows: Word[] } = await db.query(`
    SELECT word 
    FROM wg_filler_words 
    ORDER BY RANDOM() 
    LIMIT 20
  `);

  const {rows: allPrompts} : {rows: Prompt[]} = await db.query(
    "SELECT * FROM wg_prompts"
  )

  const {rows: promptRes} : {rows: Prompt[]} = await db.query(
    "SELECT * FROM wg_prompts WHERE id = ($1)",
    [params.promptId]
  )

  const prompt = promptRes[0];
  const promptCount = allPrompts.length;
  const promptsLowerBound = allPrompts[0].id;
  const promptsUpperBound = promptsLowerBound + promptCount-1;


  async function nextPrompt() {
    "use server";
    if (prompt.id < promptsUpperBound) {
      revalidatePath('/play');
      redirect(`/play/${prompt.id + 1}`);
    }
  }

  async function prevPrompt() {
    "use server";
    if (prompt.id > promptsLowerBound) {
      revalidatePath('/play');
      redirect(`/play/${prompt.id - 1}`);
    }
  }

  const handleSubmit = async (data: { words: string[]; content: string }) => {
    "use server";

    try {
      await db.query(
        `INSERT INTO wg_posts (clerk_id, prompt_id, content, words) VALUES ($1, $2, $3, $4)`,
        [userId, prompt.id, data.content, data.words]
      );
      console.log("Success. content:", data.content, "and words:", data.words);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="max-w-6xl flex flex-col gap-4 justify-center items-center">

      <PostPrompt 
        prompt={prompt} 
        promptsUpperBound={promptsUpperBound} 
        promptsLowerBound={promptsLowerBound}
        nextPrompt={nextPrompt}
        prevPrompt={prevPrompt}
      />

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