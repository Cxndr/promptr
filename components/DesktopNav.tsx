import Link from "next/link";
import FontToggle from "./FontToggle";

export default function DesktopNav() {
  return (
    <div className="hidden md:flex">
      <nav className="flex items-center gap-3.5 font-medium">
        <Link
          href="/play/1"
          aria-label="Play Page"
          className="mx-0.5 px-1.5 py-0.5 hover:scale-105 text-white hover:bg-primary transition-all duration-300 bg-green-500 rounded-lg shadow-sm shadow-themeshadow"
        >
          Play
        </Link>
        <Link
          href="/play"
          aria-label="Prompts List Page"
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
