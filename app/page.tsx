import { ModeToggle } from "@/components/ModeToggle";
import AniTitle from "@/components/ui/landingtxtani/AniTitle"
import Image from "next/image";
import wordGameLogo from "@/app/images/wordGameLogo.webp"


export default function Home() {
  return (
    <>
      <main>

        <div className="flex justify-center mt-16">
          <Image 
            src={wordGameLogo}
            alt="Black & white Art-deco logo of a person holding a card"
            width={100}
            height={38}
            priority
          />
        </div>
          <AniTitle/>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        
      </footer>
    </>
  );
}
