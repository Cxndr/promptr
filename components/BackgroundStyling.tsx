"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { baseWordList, generateBg } from "@/lib/generateBg";

export default function BackGroundStyling({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { theme } = useTheme();
  const [bgSvgDataUri, setBgSvgDataUri] = useState("");

  useEffect(() => {
    const bgSvg = generateBg(baseWordList, theme);
    const dataUri = `data:image/svg+xml;base64,${btoa(bgSvg.svgContent)}`;
    setBgSvgDataUri(dataUri);
  }, [theme]);

  return (
    <div
      className="flex-grow flex flex-col items-center"
      style={{
        backgroundImage: `url(${bgSvgDataUri})`,
        backgroundRepeat: "repeat",
        backgroundSize: bgSvgDataUri
          ? `${generateBg(baseWordList, theme).svgWidth}px ${
              generateBg(baseWordList, theme).svgHeight
            }px`
          : "initial",
      }}
    >
      {children}
    </div>
  );
}
