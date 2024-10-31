import PostInput from "@/components/PostInput";
import PostTile from "@/components/PostTile";
import PaginationComponent from "@/components/PaginationComponent";
import PromptNavigation from "@/components/PromptNav";
import { db } from "@/lib/db";
import { Word, Post, RawPost, Prompt } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { timeAgo } from "@/lib/timeAgo";
import { mergedDataQuery } from "@/lib/fetch";

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
  const itemsPerPage = 8; // posts per page
  const currentPage = parseInt(searchParams.page || "1", 8);
  const offset = (currentPage - 1) * itemsPerPage;

  const mergedData = await db.query(mergedDataQuery, [
    params.promptId,
    itemsPerPage,
    offset,
  ]);

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

  const handleSubmit = async (data: { words: string[]; content: string }) => {
    "use server";

    try {
      await db.query(
        `INSERT INTO wg_posts (clerk_id, prompt_id, content, words) VALUES ($1, $2, $3, $4)`,
        [userId, promptRes[0].id, data.content, data.words]
      );
      console.log("Success. content:", data.content, "and words:", data.words);
    } catch (err) {
      console.error(err);
    } finally {
      revalidatePath(`/play/${promptRes[0].id}`);
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
      revalidatePath(`/play/${promptRes[0].id}`);
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
      revalidatePath(`/play/${promptRes[0].id}`);
    }
  }

  return (
    <div className="max-w-6xl flex flex-col gap-4 justify-center items-center">
      <PromptNavigation allPrompts={allPrompts} promptRes={promptRes} />

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
      <PaginationComponent currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
