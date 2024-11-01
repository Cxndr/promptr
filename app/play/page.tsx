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
      <div className="w-full max-w-7xl bg-background/80 px-8 py-8 my-auto mx-4 flex flex-col gap-6 justify-center items-center rounded-3xl shadow-md shadow-black z-10">
        
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Available Prompts</h1>
            <p className="text-faded-light text-sm">Click a prompt link to visit it&apos;s play page</p>
        </div>

        <div className="flex flex-col gap-4">
          {prompts.rows.map((prompt) => (
            <p key={prompt.id} className="text-faded-light">
              {`#${prompt.id} ~ `}
              <Link
                href={`/play/${prompt.id}`}
                aria-label={`Prompt ${prompt.id}`}
                className="text-link hover:text-link-hover visited:text-link-visited transition-all duration-300"
              >
                {prompt.content}
              </Link>
            </p>
          ))}
        </div>

      </div>
    </>
  );
}
