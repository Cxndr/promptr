import { db } from "./db";

export async function fetchUserProfile(userId: string | null) {
  const profile = await db.query(`SELECT * FROM wg_users WHERE clerk_id = $1`, [
    userId,
  ]);
  return profile;
}
