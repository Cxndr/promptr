"use client"

import * as React from "react";
import { Moon, Sun,} from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  const applyCustomTheme = (themeName: string) => {
    document.body.className = ""; 
    if (themeName) {
      document.body.classList.add(themeName); 
    }
  };
  

  const handleThemeChange = (selectedTheme) => {
    if (["light", "dark", "system"].includes(selectedTheme)) {
      setTheme(selectedTheme);
      applyCustomTheme(""); 
    } else {
      setTheme("light"); 
      applyCustomTheme(selectedTheme); 
    }
  };



  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeChange("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("system")}>
          System
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("colorblind-deuteranopia")}>
          Deuteranopia
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("colorblind-protanopia")}>
          Protanopia
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("colorblind-tritanopia")}>
          Tritanopia
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
