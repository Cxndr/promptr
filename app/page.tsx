import { ModeToggle } from "@/components/ModeToggle";
import Image from "next/image";
import wordGameLogo from "@/app/images/wordGameLogo.webp";
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
    <div>
      <Image
        className="rounded-full flex m-4"
        src={wordGameLogo}
        alt="Black & white Art-deco logo of a person holding a card"
        width={100}
        height={38}
        priority
      />
      <div className="absolute top-4 right-4 z-10">
        <ModeToggle />
      </div>
    </div>
  );
}
