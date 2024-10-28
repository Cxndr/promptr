"use client";

import {
    Sheet,
    SheetContent,
    // SheetDescription,
    // SheetHeader,
    // SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify, House } from "lucide-react";
import Link from "next/link";
import { useState } from 'react';

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
                    <Link href="/" onClick={closeSheet}>
                        <House className="text-red-500" />
                    </Link>
                    <nav className="flex flex-col gap-3 lg:gap-4 mt-6 items-start pl-0">
                        <Link href="/play/1" onClick={closeSheet}>
                            Prompt 1
                        </Link>
                        <Link href="/play/2" onClick={closeSheet}>
                            Prompt 2
                        </Link>
                        <Link href="/play/3" onClick={closeSheet}>
                            Prompt 3
                        </Link>
                        <Link href="/AboutUs" onClick={closeSheet}>
                            About Us
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    );
}
