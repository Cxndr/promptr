"use client";

import * as React from "react";
import { Moon, Sun, EyeOff, Eye, Palette } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Theme =
  | "light"
  | "dark"
  | "system"
  | "colorblind-deuteranopia"
  | "colorblind-protanopia"
  | "colorblind-tritanopia";

export function ModeToggle() {
  const { theme, setTheme } = useTheme(); 
  const [currentTheme, setCurrentTheme] = React.useState<Theme>("light"); 

  React.useEffect(() => {
    if (theme) {
      setCurrentTheme(theme as Theme); 
    }
  }, [theme]);

  const applyCustomTheme = (themeName: string) => {
    document.body.className = ""; 

    if (themeName) {
      document.body.classList.add(themeName);
    }
  };

  const handleThemeChange = (selectedTheme: Theme) => {
    console.log("Selected theme:", selectedTheme);
    if (["light", "dark", "system"].includes(selectedTheme)) {
      setTheme(selectedTheme);
      applyCustomTheme(""); 
    } else {
      setTheme("light");
      applyCustomTheme(selectedTheme); 
    }
    setCurrentTheme(selectedTheme); 
    console.log("Applied theme:", selectedTheme);
  };

  const renderIcon = (theme: Theme) => {
    switch (theme) {
      case "light":
        return <Sun className="h-5 w-5" />;
      case "dark":
        return <Moon className="h-5 w-5" />;
      case "colorblind-deuteranopia":
        return <EyeOff className="h-5 w-5" />;
      case "colorblind-protanopia":
        return <Eye className="h-5 w-5" />;
      case "colorblind-tritanopia":
        return <Palette className="h-5 w-5" />;
      default:
        return <Sun className="h-5 w-5" />; 
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {renderIcon(currentTheme)} 
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeChange("light")}>
          {renderIcon("light")} Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
          {renderIcon("dark")} Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("colorblind-deuteranopia")}>
          {renderIcon("colorblind-deuteranopia")} Deuteranopia
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("colorblind-protanopia")}>
          {renderIcon("colorblind-protanopia")} Protanopia
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("colorblind-tritanopia")}>
          {renderIcon("colorblind-tritanopia")} Tritanopia
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
