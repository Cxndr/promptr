import Gravity from "@/components/Gravity";
import Image from "next/image";
import tslogo from "@/public/img/tslogo.webp";
import githublogo from "@/public/img/githublogo.webp";
import nextlogo from "@/public/img/nextlogo.webp";
import pglogo from "@/public/img/pglogo.webp";
import twlogo from "@/public/img/twlogo.webp";
import supabaselogo from "@/public/img/supabaselogo.webp";
import lucidelogo from "@/public/img/lucidelogo.webp";
import shadcnlogo from "@/public/img/shadcnlogo.webp";
import { fetchRandomWords } from "@/lib/fetch";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The team members info | About Us",
};

export default async function AboutUsPage() {
  const wordsArr = await fetchRandomWords(40);

  return (
    <>
      <Gravity wordsArr={wordsArr} />
      <div className="z-20">
        <div className="max-w-5xl bg-background/80 px-8 py-5 mx-4 flex flex-col gap-12 justify-center items-center rounded-3xl shadow-md shadow-black z-10">
          
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-bold">About Us</h2>
            <p className="">
              Thank you for visiting our final week group project, with the Tech
              Educators!
            </p>
          </div>

          <div className="flex flex-col gap-4">

            <h3 className="text-xl font-bold text-foreground-raised">
              👥 Our Team 👥
            </h3>

            <ul className="flex flex-row flex-wrap gap-8 sm:gap-12 justify-center">

              <li className="flex flex-col gap-1">
                <span className="text-3xl">🦥</span><span className="font-normal text-sm">Matt</span>
              </li>

              <li className="flex flex-col gap-1">
                <span className="text-3xl">🦏</span><span className="font-normal text-sm">Scott</span>
              </li>

              <li className="flex flex-col gap-1">
                <span className="text-3xl">🦇</span><span className="font-normal text-sm">Nitej</span>
              </li>

              <li className="flex flex-col gap-1">
                <span className="text-3xl">🐕</span><span className="font-normal text-sm">Joe</span>
              </li>

            </ul>
            
          </div>

          <div className="flex flex-col gap-4">

            <h3 className="text-xl font-bold text-foreground-raised">
              🐱‍💻 Our Tech Stack 🐱‍💻
            </h3>

            <div className="flex-wrap flex gap-8 justify-center items-center font-normal">

              <div className="flex flex-col gap-2 justify-center items-center text-sm">
                <div className="h-[74px] w-auto flex justify-center items-center">
                  <Image
                    className="rounded-xl "
                    src={tslogo}
                    alt="TypeScript logo"
                    aria-label="TypeScript logo"
                    width={74}
                    height={74}
                    priority
                  />
                </div>
                TypeScript
              </div>

              <div className="flex flex-col gap-2 justify-center items-center text-sm">
                <div className="h-[74px] w-auto flex justify-center items-center">
                  <Image
                    className="rounded-xl "
                    src={nextlogo}
                    alt="Next.js logo"
                    aria-label="Next logo"
                    width={74}
                    height={74}
                    priority
                  />
                </div>
                NextJS
              </div>

              <div className="flex flex-col gap-2 justify-center items-center text-sm">
                <div className="h-[74px] w-auto flex justify-center items-center">
                  <Image
                    className="rounded-xl "
                    src={pglogo}
                    alt="PostgreSQL logo"
                    aria-label="postgresql logo"
                    width={74}
                    height={74}
                    priority
                  />
                </div>
                Postgres
              </div>

              <div className="flex flex-col gap-2 justify-center items-center text-sm">
                <div className="h-[74px] w-auto flex justify-center items-center">
                  <Image
                    className="rounded-xl "
                    src={supabaselogo}
                    alt="Supabase logo"
                    aria-label="supabase logo"
                    width={74}
                    height={74}
                    priority
                  />
                </div>
                Supabase
              </div>

              <div className="flex flex-col gap-2 justify-center items-center text-sm">
                <div className="h-[74px] w-auto flex justify-center items-center">
                  <Image
                    className="rounded-xl "
                    src={githublogo}
                    alt="Github logo"
                    aria-label="github logo"
                    width={74}
                    height={74}
                    priority
                  />
                </div>
                Github
              </div>

              <div className="flex flex-col gap-2 justify-center items-center text-sm">
                <div className="h-[74px] w-auto flex justify-center items-center">
                  <Image
                    className="rounded-xl "
                    src={twlogo}
                    alt="Tailwind logo"
                    aria-label="tailwind logo"
                    width={74}
                    height={74}
                    priority
                  />
                </div>
                Tailwind
              </div>

              <div className="flex flex-col gap-2 justify-center items-center text-sm">
                <div className="h-[74px] w-auto flex justify-center items-center">
                  <Image
                    className="rounded-xl "
                    src={lucidelogo}
                    alt="Lucide logo"
                    aria-label="lucide logo"
                    width={74}
                    height={74}
                    priority
                  />
                </div>
                Lucide
              </div>

              <div className="flex flex-col gap-2 justify-center items-center text-sm">
                <div className="h-[74px] w-auto flex justify-center items-center">
                  <Image
                    className="rounded-xl "
                    src={shadcnlogo}
                    alt="Shadcn logo"
                    aria-label="Shadcn logo"
                    width={74}
                    height={74}
                    priority
                  />
                </div>
                shadcn/ui
              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}
