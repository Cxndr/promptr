import AniTitle from "@/components/AniTitle"
import Gravity from "@/components/Gravity";
// import Image from "next/image";
// import wordGameLogo from "@/public/img/wordGameLogo.webp";
import { fetchUserProfile } from "@/lib/fetch";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchRandomWords } from "@/lib/fetch";

export default async function Home() {
  const { userId } = await auth();
  const profile = await fetchUserProfile(userId);

  if (profile.rowCount === 0) {
    redirect("/profile");
  }

  const wordsArr = await fetchRandomWords(30);

  return (
    <>
      <Gravity wordsArr={wordsArr}/>
      <div className="z-20">
        <div className="max-w-7xl bg-background/75 py-4 px-8 my-auto mx-4 flex flex-col justify-center items-center rounded-3xl shadow-md shadow-black">
          <div className="pt-4">
            <AniTitle />
          </div >

          <div className="">
            
            <h2 className="text-2xl p-8">How Phrase Factory Works...</h2>
            <p>In Phrase Factory, you choose a question (we call them prompts).</p> <p className="p-4">To respond,
              you can only choose from a select range of words. <br />There are two types:</p>
            <ul>
              <li className="text-blue-500">- Unique words</li>
              <li className="text-amber-500">- Filler words</li>
            </ul>
            <p className="p-4">It&#39;s then down to you to come up with the best answer to the prompt.
              Your response is then viewed by other users, where they can react to your answer.
              Likewise, you can react to other users&#39; answers.</p>
            <p className="p-4">Also, if you select the icon on the top right of the website you can toggle between dark mode and light mode.
              Furthermore, there are filters for people <br></br>who experience green, red and blue colorblind.</p>
            <p className="p-4">Ultimately, the aim of the game is to create the most popular response to the prompt.</p>
            <p className="p-4">Good luck!</p>
          </div>

        </div>
      </div>
    </>
  );
}
