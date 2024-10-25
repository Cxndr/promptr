import { ModeToggle } from "@/components/ModeToggle";
import Image from "next/image";
import wordGameLogo from "@/app/images/wordGameLogo.webp";

export default function Home() {
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
