import { db } from "./db";

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
    [postId]);
  return post;
}