import PostInput from "@/components/PostInput";
import PostPrompt from "@/components/PostPrompt";
import PostTile from "@/components/PostTile";

import { db } from "@/lib/db";
import { PublicUser, Word, Post, PromptPostsData } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { Prompt } from "@/lib/types";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { timeAgo } from "@/lib/timeAgo";
import { RawPost } from "@/lib/types";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PromptPageProps = {
  params: {
    promptId: string;
  };
  searchParams: {
    page?: string;
  };
};

export default async function PromptPage({
  params,
  searchParams,
}: PromptPageProps) {
  const { userId } = await auth();
  // pageination related
  const itemsPerPage = 8; // posts per page
  const currentPage = parseInt(searchParams.page || "1", 8);
  const offset = (currentPage - 1) * itemsPerPage;

  const generatePaginationItems = () => {
    const items = [];

    // First page
    if (currentPage > 2) {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink href={`?page=1`}>1</PaginationLink>
        </PaginationItem>
      );
      if (currentPage > 3) {
        items.push(<PaginationEllipsis key="start-ellipsis" />);
      }
    }

    // Pages around the current page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink href={`?page=${i}`} isActive={i === currentPage}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Ellipsis and last page
    if (currentPage < totalPages - 2) {
      items.push(<PaginationEllipsis key="end-ellipsis" />);
    }
    if (currentPage < totalPages - 1) {
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink href={`?page=${totalPages}`}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  const mergedData = await db.query(
    `
    WITH
      base_words AS (
        SELECT word
        FROM wg_words
        ORDER BY RANDOM()
        LIMIT 20
      ),
      filler_words AS (
        SELECT word
        FROM wg_filler_words
        ORDER BY RANDOM()
        LIMIT 15
      ),
      all_prompts AS (
        SELECT *
        FROM wg_prompts
      ),
      prompt_details AS (
        SELECT *
        FROM wg_prompts
        WHERE id = $1
      ),
      post_count AS (
        SELECT COUNT(*) AS total_posts
        FROM wg_posts
        WHERE prompt_id = $1
      ),
      prompt_posts AS (
        SELECT wg_posts.*, wg_users.clerk_id, wg_users.id AS user_id, 
              wg_users.username, wg_users.image_url
        FROM wg_posts
        JOIN wg_users ON wg_posts.clerk_id = wg_users.clerk_id
        WHERE prompt_id = $1
        ORDER BY created_at DESC
        LIMIT $2 OFFSET $3
      )
    SELECT 
      (SELECT json_agg(base_words.*) FROM base_words) AS base_words,
      (SELECT json_agg(filler_words.*) FROM filler_words) AS filler_words,
      (SELECT json_agg(all_prompts.*) FROM all_prompts) AS all_prompts,
      (SELECT json_agg(prompt_details.*) FROM prompt_details) AS prompt_details,
      (SELECT total_posts FROM post_count) AS total_posts,
      (SELECT json_agg(prompt_posts.*) FROM prompt_posts) AS prompt_posts
    `,
    [params.promptId, itemsPerPage, offset]
  );

  const baseWords: Word[] = mergedData.rows[0].base_words;
  const fillerWords: Word[] = mergedData.rows[0].filler_words;
  const allPrompts: Prompt[] = mergedData.rows[0].all_prompts;
  const promptRes: Prompt[] = mergedData.rows[0].prompt_details;
  const totalPosts: number = parseInt(mergedData.rows[0].total_posts);
  const promptPostsData: { prompt_posts: RawPost[] } | null =
    mergedData.rows[0];
  const totalPages: number = Math.ceil(totalPosts / itemsPerPage);

  const promptPosts: Post[] = promptPostsData?.prompt_posts?.length
    ? promptPostsData.prompt_posts.map((prompt_post: RawPost) => ({
        id: prompt_post.id,
        user: {
          userId: prompt_post.user_id,
          clerkId: prompt_post.clerk_id,
          username: prompt_post.username,
          imageUrl: prompt_post.image_url,
        },
        promptId: prompt_post.prompt_id,
        content: prompt_post.content,
        words: prompt_post.words,
        upvotes: prompt_post.upvotes,
        createdAt: new Date(prompt_post.created_at),
      }))
    : [];

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
      revalidatePath(`/play/${prompt.id}`);
    }
  };

  async function deletePost(postId: number) {
    "use server";
    try {
      await db.query(`DELETE FROM wg_posts WHERE (id, clerk_id) = ($1, $2)`, [
        postId,
        userId,
      ]);
      console.log("Post deleted");
    } catch (error) {
      console.error("deleting post failed", error);
    } finally {
      revalidatePath(`/play/${prompt.id}`);
    }
  }

  async function getExistingReactions(
    postId: number,
    userId: string | undefined
  ) {
    "use server";
    if (!userId) {
      return {
        heart: false,
        laugh: false,
        sick: false,
        eyeroll: false,
      };
    }
    const existingReactionsResponse = await db.query(
      `SELECT * FROM wg_reactions WHERE (post_id, clerk_id) = ($1, $2)`,
      [postId, userId]
    );
    if (existingReactionsResponse.rows.length === 0) {
      return {
        heart: false,
        laugh: false,
        sick: false,
        eyeroll: false,
      };
    }
    const existingReactions = {
      heart: existingReactionsResponse.rows[0].heart as boolean,
      laugh: existingReactionsResponse.rows[0].laugh as boolean,
      sick: existingReactionsResponse.rows[0].sick as boolean,
      eyeroll: existingReactionsResponse.rows[0].eyeroll as boolean,
    };
    return existingReactions;
  }
  // If no reaction, create new:
  async function makeReactions(
    post_id: number,
    userId: string,
    newReaction: boolean,
    reactionType: "heart" | "laugh" | "sick" | "eyeroll"
  ) {
    "use server";

    const validReactions = ["heart", "laugh", "sick", "eyeroll"];
    if (!validReactions.includes(reactionType)) {
      throw new Error("Invalid reaction type");
    }
    try {
      await db.query(
        `
        INSERT INTO wg_reactions (clerk_id, post_id, ${reactionType})
        VALUES ($1, $2, $3)
        ON CONFLICT (clerk_id, post_id) 
        DO UPDATE SET
        ${reactionType} = EXCLUDED.${reactionType};
        `,
        [userId, post_id, newReaction]
      );
    } catch (err) {
      console.error(err);
    }
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
      console.error(err);
    }

    return {
      heart: 0,
      laugh: 0,
      sick: 0,
      eyeroll: 0,
    };
  }

  async function editPost(postId: number, content: string) {
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
      revalidatePath(`/play/${prompt.id}`);
    }
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

      {promptPosts.length > 0 ? (
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
      ) : (
        <p>
          No posts available for this prompt yet. Be the first to contribute!
        </p>
      )}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`?page=${currentPage - 1}`}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {generatePaginationItems()}
          <PaginationItem>
            <PaginationNext
              href={`?page=${currentPage + 1}`}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
