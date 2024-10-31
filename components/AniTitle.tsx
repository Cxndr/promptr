"use client";
import aniStyle from "@/styles/aniTxtStyle.module.css";
import { motion } from "framer-motion";
import { useState } from "react";

const words = ["Welcome", "to", "Phrase Factory!"];

export default function AnimatedSubtitle() {
  const [toHide, setToHide] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const currentWord = Array.from(words[currentWordIndex]);
  const letterDuration = 0.07;
  const letterStagger = letterDuration * 1.5;
  const wordVariants = {
    hidden: (length: number) => {
      return {
        x: "calc(100% - 10px)",
        transition: {
          staggerChildren: letterStagger,
          duration: length * letterStagger + letterDuration,
          staggerDirection: -1,
          ease: "linear",
          delay: 0.2,
          delayChildren: 0.4,
        },
      };
    },
    visible: (length: number) => ({
      x: "0%",
      transition: {
        staggerChildren: letterStagger,
        duration: length * letterStagger + letterDuration,
        ease: "linear",
      },
    }),
  };
  const letterVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      transition: {
        duration: letterDuration,
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: letterDuration,
      },
    },
  };
  return (
    <div className={aniStyle["AniTitle"]}>
      <motion.div className={aniStyle["word-wrapper"]}>
        <motion.div
          className={aniStyle["word"]}
          initial="hidden"
          animate={toHide ? "hidden" : "visible"}
          custom={words[currentWordIndex].length}
          variants={wordVariants}
          onAnimationComplete={(definition) => {
            setToHide(!toHide);
            if (definition === "hidden") {
              const nextIndex = (currentWordIndex + 1) % words.length;
              setCurrentWordIndex(nextIndex);
            }
          }}
        >
          {currentWord.map((letter, i) => (
            <motion.span
              className={aniStyle["span"]}
              key={i}
              variants={letterVariants}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
        <motion.div className={aniStyle["circle"]}></motion.div>
      </motion.div>
    </div>
  );
}
