import AniTitle from "@/components/AniTitle";
import Gravity from "@/components/Gravity";
import { fetchUserProfile } from "@/lib/fetch";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchRandomWords } from "@/lib/fetch";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const { userId } = await auth();
  const profile = await fetchUserProfile(userId);

  if (profile.rowCount === 0) {
    redirect("/profile");
  }

  const wordsArr = await fetchRandomWords(30);

  return (
    <>
      <Gravity wordsArr={wordsArr} />
      <div className="z-20">
        <div className="relative max-w-5xl bg-background/80 px-8 py-5 mx-4 flex flex-col justify-center items-center rounded-3xl shadow-md shadow-black z-10">
          
          <div className="absolute -rotate-[18deg] text-2xl top-7 left-6 sm:left-28 sm:top-5 sm:-rotate-[13deg]">
            🏭
          </div>

          <AniTitle />

          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold text-center">How To Play</h2>

            <p className="font-bold text-center pb-2">
              Create responses to prompts based on a random selection of words.
            </p>

            <p className="">
              When you create a response you will be given two types of words:
            </p>

            <div className="flex gap-4 justify-center p-2">
              <Button className="bg-blue-500 hover:bg-blue-500 cursor-default text-white shadow-sm shadow-themeshadow">Unique words</Button>
              <Button className="bg-orange-500 hover:bg-orange-500 cursor-default text-white shadow-sm shadow-themeshadow">Filler words</Button>
            </div>

            <p>
              Unique words can only be used once. Filler words can be used multiple times.
            </p>

            <p >
              Try and come up with the best answer to the prompt with the words you are given.
              <br/>
              <span className="text-faded-light">If you come up with something good submit it for other user&apos;s to see!</span>
            </p>

            <p>
              You can vote on responses by leaving reactions. ❤️😂🤮🙄
              <br/>
              <span className="text-faded-light">The best voted respones are displayed at the top of each prompt page.</span>
            </p>

            <p className="text-center">Good luck!</p>

          </div>
        </div>
      </div>
    </>
  );
}
