import PostInput from "@/components/PostInput";
import { db } from "@/lib/db";
import { Word } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";

export default async function PostTest() {
  const { userId } = await auth();
  const promptId = null; // modify this later when handling specific prompts from db

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
    <div className="max-w-4xl">
      
      <PostInput
        baseWords={baseWords}
        fillerWords={fillerWords}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
