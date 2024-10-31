import Link from "next/link";
import { db } from "@/lib/db";
import Gravity from "@/components/Gravity";
import { fetchRandomWords } from "@/lib/fetch";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prompts",
  description:
    "Select a prompt to go to try and answer them | Prompts",
};

export default async function PlayPage() {
  const prompts = await db.query("SELECT id, content FROM wg_prompts");
  const wordsArr = await fetchRandomWords(40);
  return (
    <>
      <Gravity wordsArr={wordsArr} />
      <div className="max-w-7xl bg-background/80 py-8 my-auto m-4 flex flex-col gap-8 justify-center items-center rounded-3xl shadow-md shadow-black z-10">
        <h1 className="text-2xl">Available Prompts</h1>
        {prompts.rows.map((prompt) => (
          <p key={prompt.id}>
            <Link
              href={`/play/${prompt.id}`}
              aria-label={`Prompt ${prompt.id}`}
            >
              {prompt.content}
            </Link>
          </p>
        ))}
      </div>
    </>
  );
}
