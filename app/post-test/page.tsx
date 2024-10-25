import PostInput from "@/components/PostInput";
import { db } from "@/lib/db";
import { Word } from "@/lib/types";

export default async function PostTest() {
  const { rows: baseWords }: { rows: Word[] } = await db.query(
    "SELECT word FROM wg_words"
  );
  const { rows: fillerWords }: { rows: Word[] } = await db.query(
    "SELECT word FROM wg_filler_words"
  );

  // console.log(baseWords);
  // console.log(fillerWords);

  return (
    <div className="max-w-4xl">
      <PostInput baseWords={baseWords} fillerWords={fillerWords} />
    </div>
  );
}
