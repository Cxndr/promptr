import AniTitle from "@/components/AniTitle"
import Gravity from "@/components/Gravity";
// import Image from "next/image";
// import wordGameLogo from "@/public/img/wordGameLogo.webp";
import { fetchUserProfile } from "@/lib/fetch";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();
  const profile = await fetchUserProfile(userId);

  if (profile.rowCount === 0) {
    redirect("/profile");
  }
  return (
    <>
      {/* <div className="flex absolute w-full justify-center items-start pt-8 top-8">
        <Image
        src={wordGameLogo}
        alt="Black & white Art-deco logo of a person holding a card"
        width={100}
        height={38}
        priority
        className="h-auto w-100" 
      />
      </div> */}

      <div className="left-40 w-10 sm:top-40 absolute">
        <AniTitle />
      </div >

      <div className="absolute h-28 top-60 sm:top-80 w-3/5">
        {/* ^^ESLint issue, ignore */}
        <h2 className="text-2xl p-8">How OnlyWords Works...</h2>
        <p>In OnlyWords, you choose a question (we call them prompts).</p> <p className="p-4">To respond,
          you can only choose from a select range of words. <br />There are two types:</p>
        <ul>
          <li className="text-blue-500">- Unique words</li>
          <li className="text-amber-500">- Filler words</li>
        </ul>
        <p className="p-4">It&#39;s then down to you to come up with the best answer to the prompt.
          Your response is then viewed by other users, where they can upvote your answer.
          Likewise, you can upvote other users&#39; answers.</p>
        <p className="p-4">Also, if you select the icon on the top right of the website you can toggle between dark mode and light mode.
          Furthermore, there are filters for people <br></br>who experience green, red and blue colorblind.</p>
        <p className="p-4">Ultimately, the aim of the game is to create the most popular response to the prompt.</p>
        <p className="p-4">Good luck!</p>
      </div>
      <Gravity />
    </>
  );
}
