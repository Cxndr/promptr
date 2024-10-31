import AniTitle from "@/components/AniTitle";
import Gravity from "@/components/Gravity";
import Image from "next/image";
import tslogo from "@/public/img/tslogo.webp";
import githublogo from "@/public/img/githublogo.webp";
import nextlogo from "@/public/img/nextlogo.webp";
import pglogo from "@/public/img/pglogo.webp";
import twlogo from "@/public/img/twlogo.webp";
import supabaselogo from "@/public/img/supabaselogo.webp";
import { fetchRandomWords } from "@/lib/fetch";

export default async function AboutUsPage() {
  const wordsArr = await fetchRandomWords(40);

  return (
    <>
      <Gravity wordsArr={wordsArr} />

      <div className="max-w-3xl bg-background/80 py-8 my-auto m-4 flex flex-col gap-8 justify-center items-center rounded-3xl shadow-md shadow-black z-10">
        <div>
          <AniTitle />
        </div>
        <h2 className="text-2xl">About us...</h2>
        <p className="">
          Thank you for visiting our final week group project, with the Tech
          Educators!
        </p>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl">👥 Credits 👥</h3>
          <ul className="flex flex-col gap-4">
            <li>🦥 Matt</li>
            <li>🦏 Scott</li>
            <li>🦇 Nitej</li>
            <li>🐕 Joe</li>
          </ul>
        </div>

        <div className="flex-wrap flex gap-8 justify-center items-center">
          <div className="flex flex-col gap-2 justify-center items-center font-semibold text-sm">
            <div className="h-[74px] w-auto flex justify-center items-center">
              <Image
                className="rounded-xl "
                src={tslogo}
                alt="TypeScript logo"
                width={74}
                height={74}
                priority
              />
            </div>
            TypeScript
          </div>

          <div className="flex flex-col gap-2 justify-center items-center font-semibold text-sm">
            <div className="h-[74px] w-auto flex justify-center items-center">
              <Image
                className="rounded-xl "
                src={nextlogo}
                alt="Next.js logo"
                width={74}
                height={74}
                priority
              />
            </div>
            NextJS
          </div>

          <div className="flex flex-col gap-2 justify-center items-center font-semibold text-sm">
            <div className="h-[74px] w-auto flex justify-center items-center">
              <Image
                className="rounded-xl "
                src={pglogo}
                alt="PostgreSQL logo"
                width={74}
                height={74}
                priority
              />
            </div>
            Postgres
          </div>

          <div className="flex flex-col gap-2 justify-center items-center font-semibold text-sm">
            <div className="h-[74px] w-auto flex justify-center items-center">
              <Image
                className="rounded-xl "
                src={supabaselogo}
                alt="Supabase logo"
                width={74}
                height={74}
                priority
              />
            </div>
            Supabase
          </div>

          <div className="flex flex-col gap-2 justify-center items-center font-semibold text-sm">
            <div className="h-[74px] w-auto flex justify-center items-center">
              <Image
                className="rounded-xl "
                src={githublogo}
                alt="Github logo"
                width={74}
                height={74}
                priority
              />
            </div>
            Github
          </div>

          <div className="flex flex-col gap-2 justify-center items-center font-semibold text-sm">
            <div className="h-[74px] w-auto flex justify-center items-center">
              <Image
                className="rounded-xl "
                src={twlogo}
                alt="Tailwind logo"
                width={74}
                height={74}
                priority
              />
            </div>
            Tailwind
          </div>
        </div>
      </div>
    </>
  );
}
