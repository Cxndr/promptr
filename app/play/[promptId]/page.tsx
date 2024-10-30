import PostInput from "@/components/PostInput";
import PostPrompt from "@/components/PostPrompt";
import PostTile from "@/components/PostTile";

import { db } from "@/lib/db";
import { Word } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { Prompt } from "@/lib/types";
import { Post } from "@/lib/types";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { timeAgo } from "@/lib/timeAgo";
// import { queryObjects } from "v8";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type PromptPageProps = {
  params: {
    promptId: string;
  }
  searchParams: {
    page?: string; 
  };
};


export default async function PromptPage({params, searchParams}: PromptPageProps) {

  const { userId } = await auth();
  // pageination related
  const itemsPerPage = 10; // ten posts per page, might change later
  const currentPage = parseInt(searchParams.page || "1", 8);// Default to page 1 if not specified
  const offset = (currentPage - 1) * itemsPerPage;

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

  const { rows: allPrompts }: { rows: Prompt[] } = await db.query(
    "SELECT * FROM wg_prompts"
  )

  const { rows: promptRes }: { rows: Prompt[] } = await db.query(
    "SELECT * FROM wg_prompts WHERE id = ($1)",
    [params.promptId]
  )

  //total pages for pageination
  const totalPostsData = await db.query(
    "SELECT COUNT(*) FROM wg_posts WHERE prompt_id = ($1)",
    [params.promptId]
  );
  const totalPosts = parseInt(totalPostsData.rows[0].count);
  const totalPages = Math.ceil(totalPosts / itemsPerPage);

  const promptPostsData = await db.query(
    `
      SELECT wg_posts.*, wg_users.clerk_id , wg_users.id as user_id, wg_users.username, wg_users.image_url 
      FROM wg_posts
      JOIN wg_users ON wg_posts.clerk_id = wg_users.clerk_id
      WHERE prompt_id = ($1) 
      ORDER BY created_at DESC
      LIMIT ($2) OFFSET ($3)
    `,
    [params.promptId, itemsPerPage, offset]
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
  const promptsUpperBound = promptsLowerBound + promptCount - 1;


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

  async function deletePost(postId: number) {
    "use server";
    try {
      await db.query(`DELETE FROM wg_posts WHERE (id, clerk_id) = ($1, $2)`, [postId, userId])
      console.log("Post deleted")
    } catch (error) {
      console.error("deleting post failed", error)
    } finally {
      revalidatePath(`/play/${prompt.id}`)
    }
  }

  async function getExistingReactions(postId: number, userId: string | undefined) {
    'use server'
    if (!userId) {
      return {
        heart: false,
        laugh: false,
        sick: false,
        eyeroll: false,
      }
    }
    const existingReactionsResponse = await db.query(
      `SELECT * FROM wg_reactions WHERE (post_id, clerk_id) = ($1, $2)`, [postId, userId]
    )
    if (existingReactionsResponse.rows.length === 0) {
      return {
        heart: false,
        laugh: false,
        sick: false,
        eyeroll: false,
      }
    }
    const existingReactions = {
      heart: existingReactionsResponse.rows[0].heart as boolean,
      laugh: existingReactionsResponse.rows[0].laugh as boolean,
      sick: existingReactionsResponse.rows[0].sick as boolean,
      eyeroll: existingReactionsResponse.rows[0].eyeroll as boolean,
    }
    return existingReactions
  }
  // If no reaction, create new:
  async function makeReactions
    (post_id: number, userId: string, newReaction: boolean, reactionType: "heart" | "laugh" | "sick" | "eyeroll") {

    'use server'

    const validReactions = ["heart", "laugh", "sick", "eyeroll"];
    if (!validReactions.includes(reactionType)) {
      throw new Error("Invalid reaction type");
    }
    try {
      await db.query(`
        INSERT INTO wg_reactions (clerk_id, post_id, ${reactionType})
        VALUES ($1, $2, $3)
        ON CONFLICT (clerk_id, post_id) 
        DO UPDATE SET
        ${reactionType} = EXCLUDED.${reactionType};
        `, [userId, post_id, newReaction])
    } catch (err) {
      console.error(err)
    }

    // revalidatePath(`/play/${prompt.id}`) // don't need to do this with optimistic ui updating, and having it here causes background to re-render on click.
  }

  async function getReactionCount(postId: number) {
    "use server";
    try {
      const reactionCountsRes = await db.query(
        `SELECT 
          COALESCE(SUM(CASE WHEN heart = true THEN 1 ELSE 0 END), 0) as heart,
          COALESCE(SUM(CASE WHEN laugh = true THEN 1 ELSE 0 END), 0) as laugh,
          COALESCE(SUM(CASE WHEN sick = true THEN 1 ELSE 0 END), 0) as sick,
          COALESCE(SUM(CASE WHEN eyeroll = true THEN 1 ELSE 0 END), 0) as eyeroll
        FROM wg_reactions 
        WHERE post_id = $1`,
        [postId]
      );

      const reactionCounts = {
        heart: parseInt(reactionCountsRes.rows[0].heart, 10),
        laugh: parseInt(reactionCountsRes.rows[0].laugh, 10),
        sick: parseInt(reactionCountsRes.rows[0].sick, 10),
        eyeroll: parseInt(reactionCountsRes.rows[0].eyeroll, 10),
      };
      return reactionCounts;

    } catch (err) {
      console.error(err)
    }

    return {
      heart: 0,
      laugh: 0,
      sick: 0,
      eyeroll: 0,
    }


  }

  async function editPost(postId: number,content: string ) {
    "use server";
    try {
      await db.query(
        `UPDATE wg_posts
        SET content =$2
        WHERE id = $1`,
        [postId, content]
      );
      console.log("Success. content:", content);
    } catch (err) {
      console.error(err);
    } finally {
      revalidatePath(`/play/${prompt.id}`)
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
  
      {promptPosts.length > 0 && (
        <div className="max-w-5xl flex flex-col gap-8">
          {promptPosts.map((post) => (
            <PostTile 
              key={post.id} 
              post={post}
              getExistingReactions={getExistingReactions}
              makeReactions={makeReactions}
              getReactionCount={getReactionCount}
              deletePost={deletePost}
              editPost={editPost}
              ownedByUser={post.user.clerkId === userId}
              timeAgoCreated={timeAgo(post.createdAt)}
            />
          ))}
        </div>
      )}
  
      {/* Pagination Controls */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={`?page=${currentPage - 1}`} disabled={currentPage === 1} />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index + 1}>
              <PaginationLink href={`?page=${index + 1}`} active={index + 1 === currentPage}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext href={`?page=${currentPage + 1}`} disabled={currentPage === totalPages} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
  
