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
  | "colorblind-deuteranopia"
  | "colorblind-protanopia"
  | "colorblind-tritanopia";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = React.useState<Theme>("light");

  React.useEffect(() => {
    const applyColorblindClass = (themeName: Theme) => {
      document.body.classList.remove(
        "colorblind-deuteranopia",
        "colorblind-protanopia",
        "colorblind-tritanopia"
      );

      if (themeName.startsWith("colorblind")) {
        document.body.classList.add(themeName);
      }
    };

    applyColorblindClass(currentTheme);
  }, [currentTheme]);

  const handleThemeChange = (selectedTheme: Theme) => {
    if (currentTheme === selectedTheme) return;

    console.log("Selected theme:", selectedTheme);
    setCurrentTheme(selectedTheme);

    if (selectedTheme === "light" || selectedTheme === "dark") {
      setTheme(selectedTheme);
    } else {
      setTheme("light");
    }

    console.log("Applied theme:", selectedTheme);
  };

  const renderIcon = (theme: Theme) => {
    switch (theme) {
      case "light":
        return <Sun className="h-7 w-7" />;
      case "dark":
        return <Moon className="h-7 w-7" />;
      case "colorblind-deuteranopia":
        return <EyeOff className="h-7 w-7" />;
      case "colorblind-protanopia":
        return <Eye className="h-7 w-7" />;
      case "colorblind-tritanopia":
        return <Palette className="h-7 w-7" />;
      default:
        return <Sun className="h-7 w-7" />;
    }
  };

  return (
    <DropdownMenu modal={false}>
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
