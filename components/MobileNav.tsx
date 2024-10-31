'use client'

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AlignJustify, House } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import FontToggle from "./FontToggle";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle, DialogDescription } from "@radix-ui/react-dialog";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const closeSheet = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger onClick={() => setIsOpen(true)}>
          <AlignJustify />
        </SheetTrigger>
        <SheetContent side="left">
          <VisuallyHidden>
            <DialogTitle>Mobile Navigation</DialogTitle>
          </VisuallyHidden>
          <DialogDescription className="mt-4">
            Use the navigation links to browse different pages and toggle dyslexic font.
          </DialogDescription>
          <Link href="/" onClick={closeSheet}>
            <House className="text-primary" />
          </Link>
          <nav className="flex flex-col gap-3 lg:gap-4 mt-6 items-start pl-0">
            <Link href="/play/1" aria-label="Play Page" onClick={closeSheet}>
              Play
            </Link>
            <Link href="/play" aria-label="Prompts Page" onClick={closeSheet}>
              Prompts
            </Link>
            <Link href="/aboutus" aria-label="About Page" onClick={closeSheet}>
              About Us
            </Link>
            <div aria-label="Close" onClick={closeSheet}>
              <FontToggle  />
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
