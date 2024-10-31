import { House } from "lucide-react";
import Link from "next/link";
import FontToggle from "./FontToggle";

export default function MainNav() {
  return (
    <div className="hidden md:flex">
      <Link href="/">
        <House
          aria-label="home button"
          className="text-primary hover:scale-110 hover:text-primary transition-all duration-300"
        />
      </Link>
      <nav className="flex items-center gap-0 lg:gap-4 ml-8">
        <Link
          href="/play/1"
          aria-label="Play Page"
          className="px-2 hover:scale-110 hover:text-primary transition-all duration-300"
        >
          Play
        </Link>
        <Link
          href="/play"
          aria-label="Prompts Page"
          className="px-2 hover:scale-110 hover:text-primary transition-all duration-300"
        >
          Prompts
        </Link>
        <Link
          href="/aboutus"
          aria-label="About Page"
          className="px-2 hover:scale-110 hover:text-primary transition-all duration-300"
        >
          About Us
        </Link>
        <FontToggle />
      </nav>
    </div>
  );
}
