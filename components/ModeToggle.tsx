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

const themeClasses: Record<Theme, React.ReactNode> = {
	light: <Sun className="h-7 w-7" />,
	dark: <Moon className="h-7 w-7" />,
	"colorblind-deuteranopia": <EyeOff className="h-7 w-7" />,
	"colorblind-protanopia": <Eye className="h-7 w-7" />,
	"colorblind-tritanopia": <Palette className="h-7 w-7" />,
};

export function ModeToggle() {
	const { setTheme, theme } = useTheme();
	const [currentTheme, setCurrentTheme] = React.useState<Theme>("light");

	const manageColorblindClass = (themeName: Theme) => {
		const colorblindClasses = [
			"colorblind-deuteranopia",
			"colorblind-protanopia",
			"colorblind-tritanopia",
		];

		document.body.classList.remove(...colorblindClasses);
		if (themeName.startsWith("colorblind")) {
			document.body.classList.add(themeName);
		}
	};

	React.useEffect(() => {
		const initialTheme = (theme as Theme) || "light";
		setCurrentTheme(initialTheme);
		manageColorblindClass(initialTheme);
	}, [theme]);

	React.useEffect(() => {
		manageColorblindClass(currentTheme);
	}, [currentTheme]);

	const handleThemeChange = (selectedTheme: Theme) => {
		if (currentTheme !== selectedTheme) {
			setCurrentTheme(selectedTheme);
			setTheme(selectedTheme);
			manageColorblindClass(selectedTheme);
		}
	};

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon" aria-label="Toggle theme">
					{themeClasses[currentTheme]}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{Object.keys(themeClasses).map((themeName) => (
					<DropdownMenuItem
						key={themeName}
						onClick={() => handleThemeChange(themeName as Theme)}
					>
						{themeClasses[themeName as Theme]}{" "}
						{themeName
							.replace("colorblind-", "")
							.replace("-", " ")
							.replace(/^\w/, (c) => c.toUpperCase())}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
