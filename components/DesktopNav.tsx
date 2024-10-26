import { House } from "lucide-react";
import Link from "next/link";

export default function MainNav() {
  return (
    <div className="hidden md:flex">
      <Link href="/">
        <House className="text-red-500" />
      </Link>
      <nav className="flex items-center gap-3 lg:gap-4 ml-8">
        <Link href="/play/1">Prompt 1</Link>
        <Link href="/play/2">Prompt 2</Link>
        <Link href="/play/3">Prompt 3</Link>
        <Link href="/AboutUs">About Us</Link>
      </nav>
    </div>
  );
}
