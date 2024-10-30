import { House } from "lucide-react";
import Link from "next/link";
import FontToggle from "./FontToggle";

export default function MainNav() {
  return (
    <div className="hidden md:flex">
      <Link href="/">
        <House className="text-red-500" />
      </Link>
      <nav className="flex items-center gap-3 lg:gap-4 ml-8">
        <Link href="/play/1">Play</Link>
        <Link href="/play">Prompts</Link>
        <Link href="/aboutus">About Us</Link>
        <FontToggle/>
      </nav>
    </div>
  );
}
