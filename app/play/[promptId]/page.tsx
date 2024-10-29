import PostInput from "@/components/PostInput";
import PostPrompt from "@/components/PostPrompt";
import PostTile from "@/components/PostTile";

import { db } from "@/lib/db";
import { Word } from "@/lib/types";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Prompt } from "@/lib/types";
import { Post } from "@/lib/types";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { timeAgo } from "@/lib/timeAgo";

type PromptPageProps = {
  params: {
    promptId: string;
  }
}

export default async function PromptPage({params}: PromptPageProps) {

  const { userId } = await auth();
  const currUser = currentUser();

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
    LIMIT 15
  `);

  const {rows: allPrompts} : {rows: Prompt[]} = await db.query(
    "SELECT * FROM wg_prompts"
  )

  const {rows: promptRes} : {rows: Prompt[]} = await db.query(
    "SELECT * FROM wg_prompts WHERE id = ($1)",
    [params.promptId]
  )

  const promptPostsData = await db.query(
    `
      SELECT wg_posts.*, wg_users.clerk_id , wg_users.id as user_id, wg_users.username, wg_users.image_url 
      FROM wg_posts
      JOIN wg_users ON wg_posts.clerk_id = wg_users.clerk_id
      WHERE prompt_id = ($1) 
      ORDER BY created_at DESC
    `,
    [params.promptId]
  );

  const promptPosts: Post[] = [];
  promptPostsData.rows.forEach((row) => {
    promptPosts.push(
      {
        id: row.id,
        user: {
          userId: row.user_id,
          clerkId: row.clerk_id,
          username: row.username,
          imageUrl: row.image_url
        },
        promptId: row.prompt_id,
        content: row.content,
        words: row.words,
        upvotes: row.upvotes,
        createdAt: row.created_at
      }
    );
  });

  const prompt = promptRes[0];
  const promptCount = allPrompts.length;
  const promptsLowerBound = allPrompts[0].id;
  const promptsUpperBound = promptsLowerBound + promptCount-1;


  async function nextPrompt() {
    "use server";
    if (prompt.id < promptsUpperBound) {
      redirect(`/play/${prompt.id + 1}`);
    }
  }

  async function prevPrompt() {
    "use server";
    if (prompt.id > promptsLowerBound) {
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
    } finally {
      revalidatePath(`/play/${prompt.id}`)
    }
  };

  async function deletePost(postId : number) {
    "use server";
    try {
      await db.query(`DELETE FROM wg_posts WHERE (id, clerk_id) = ($1, $2)`,[postId, userId])
      console.log("Post deleted")
    } catch(error) {
      console.error("deleting post failed", error)
    } finally {
      revalidatePath(`/play/${prompt.id}`)
    }
  }

  async function editPost(postId : number) {
    "use server";
    // edit function
  }


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
      
      {
        promptPosts.length > 0 && (
          <div className="max-w-5xl flex flex-col gap-8">
            {promptPosts.map((post) => (
              <PostTile 
                key={post.id} 
                post={post}
                deletePost={deletePost}
                editPost={editPost}
                ownedByUser={post.user.clerkId === userId}
                timeAgoCreated={timeAgo(post.createdAt)}
              />
            ))}
          </div>
        )
      }
      
      
    </div>
  )
}