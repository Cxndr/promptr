import Image from "next/image";
import wordGameLogo from "@/app/images/wordGameLogo.webp"

export default function Home() {
  return (
    <>
      <header className="flex justify-center">
      <Image
          className="rounded-full flex m-4" 
          src={wordGameLogo}
          alt="Black & white Art-deco logo of a person holding a card"
          width={100}
          height={38}
          priority
        />
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        
      </footer>
    </>
  );
}
