// import { fetchWords } from "./fetch";

// export async function generateBg() {
//   const words = await fetchWords();
// }

export function generateBg(words: string[]) {
  const svgWidth = 500;
  const svgHeight = 500;
  const textRotation = -45;
  const textFontSize = 20;
  const fillColor = "#555";

  let svgContent = 
  `
    <svg 
      width="${svgWidth}"
      height="${svgHeight}"
      xmlns="http://www.w3.org/2000/svg"
    >
    <defs>
      <pattern 
        id="textPattern"
        width="${svgWidth}"
        height="${svgHeight}"
        patternUnits="userSpaceOnUse"
      >
  `;

  words.forEach((word, index) => {
    const x = (index * 30) % svgWidth;
    const y = (index * 30) % svgHeight  + textFontSize;

    svgContent += 
    `
      <text 
        x="${x}" 
        y="${y}" 
        font-family="Arial" 
        font-size="${textFontSize}" 
        fill="${fillColor}" 
        transform="rotate(${textRotation}, ${x}, ${y})"
      >
        ${word}
      </text>
    `;

  });

  svgContent += 
  `
    </pattern>
    </defs>
    <rect 
      width="100%"
      height="100%"
      fill="url(#textPattern)"
    />
    </svg>
  `;

  return svgContent;

}


