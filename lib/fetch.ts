import { db } from "./db";
import { getXRandomWords } from "./generateBg";

export async function fetchUserProfile(userId: string | null) {
	const profile = await db.query(`SELECT * FROM wg_users WHERE clerk_id = $1`, [
		userId,
	]);
	return profile;
}

export async function fetchPost(postId: number | null) {
	const post = await db.query(
		`
      SELECT wg_posts.*, wg_users.*
      FROM wg_posts,
      JOIN wg_users ON wg_posts.clerk_id = wg_users.cler
      WHERE id = $1
    `,
		[postId]
	);
	return post;
}

export async function fetchWords() {
	const words = await db.query(`SELECT word FROM wg_words`);
	return words;
}

export async function fetchRandomWords(amount: number) {
	const wordsArr: string[] = [];
	const res = (await fetchWords()).rows;
	res.map((item) => {
		wordsArr.push(item.word);
	});
	return getXRandomWords(wordsArr, amount);
}

export const mergedDataQuery: string = `
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
`;
