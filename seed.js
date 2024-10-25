import pkg from "pg";
const { Pool } = pkg;

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const emptyAllTables = async () => {
  try {
    await db.query("BEGIN");

    await db.query("TRUNCATE TABLE wg_users RESTART IDENTITY CASCADE");
    await db.query("TRUNCATE TABLE wg_prompts RESTART IDENTITY CASCADE");
    await db.query("TRUNCATE wg_posts RESTART IDENTITY CASCADE");
    await db.query("TRUNCATE wg_words RESTART IDENTITY CASCADE");
    await db.query("TRUNCATE wg_filler_words RESTART IDENTITY CASCADE");

    await db.query("COMMIT");
    console.log("All tables have been emptied.");
  } catch (error) {
    await db.query("ROLLBACK");
    console.error("Error emptying tables:", error);
  }
};

const baseWordList = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "grape",
  "honeydew",
  "kiwi",
  "lemon",
  "mango",
  "nectarine",
  "orange",
  "pear",
  "quince",
  "raspberry",
  "strawberry",
  "tangerine",
  "watermelon",
];

const fillerWordList = [
  "a",
  "an",
  "the",
  "this",
  "that",
  "these",
  "those",
  "my",
  "your",
  "its",
  "our",
  "their",
  "in",
  "is",
  "to",
  "more",
  "no",
  ".",
  ",",
];

const fillWithWords = async () => {
  await db.query(`
  INSERT INTO wg_words (word) VALUES ${baseWordList
    .map((word) => `('${word}')`)
    .join(", ")}
  ON CONFLICT (word) DO NOTHING
`);

  await db.query(`
  INSERT INTO wg_filler_words (word) VALUES ${fillerWordList
    .map((word) => `('${word}')`)
    .join(", ")}
  ON CONFLICT (word) DO NOTHING
`);
};

emptyAllTables();
fillWithWords();
