"use client"

import { useTheme } from "next-themes";
import { baseWordList, generateBg } from "@/lib/generateBg";

export default function BackGroundStyling({children}: Readonly<{children: React.ReactNode}>) {

  const { theme } = useTheme();
  console.log("THEME:::::::: ", theme);
  const bgSvg = generateBg(baseWordList, theme);
  const bgSvgDataUri = `data:image/svg+xml;base64,${btoa(bgSvg.svgContent)}`;

  return (
    <div 
      className={`flex-grow flex flex-col items-center`}
      style={{
        backgroundImage: `url(${bgSvgDataUri})`,
        backgroundRepeat: "repeat", 
        backgroundSize: `${bgSvg.svgWidth}px ${bgSvg.svgHeight}px`,
      }}
    >
      {children}
    </div>
  )
}