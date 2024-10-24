import { db } from "@/lib/db";

const emptyAllTables = async () => {
  try {
    await db.query("BEGIN");

    await db.query("TRUNCATE TABLE wg_posts RESTART IDENTITY CASCADE");
    await db.query("TRUNCATE TABLE wg_users RESTART IDENTITY CASCADE");
    await db.query("TRUNCATE TABLE wg_words RESTART IDENTITY CASCADE");
    await db.query("TRUNCATE TABLE wg_prompts RESTART IDENTITY CASCADE");
    await db.query("TRUNCATE TABLE wg_filler_words RESTART IDENTITY CASCADE");

    await db.query("COMMIT");
    console.log("All tables have been emptied.");
  } catch (error) {
    await db.query("ROLLBACK");
    console.error("Error emptying tables:", error);
  }
};

emptyAllTables();
