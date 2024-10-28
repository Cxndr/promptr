import { ModeToggle } from "@/components/ModeToggle";
import AniTitle from "@/components/ui/AniTitle"
import Image from "next/image";
import wordGameLogo from "@/public/img/wordGameLogo.webp";
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
      <div className="flex absolute w-full h-40 justify-center items-start pt-8 top-8">
        <Image
        src={wordGameLogo}
        alt="Black & white Art-deco logo of a person holding a card"
        width={100}
        height={38}
        priority
      />
      </div>
      
      <div className="flex absolute w-full h-40 justify-center items-start pt-8 top-32 left-20">
        <AniTitle/>
      </div >

      <div className="absolute top-4 right-4 z-10">
        <ModeToggle />
      </div>
    </>
  );
}
