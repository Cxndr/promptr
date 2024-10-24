"use client";
import { useEffect, useState } from "react";
import PostInputWord from "./PostInputWord";

export default function PostInput() {


  const [wordList, setWordList] = useState<string[]>([]);
  const [fillerWordList, setFillerWordList] = useState<string[]>([]);

  useEffect(() => {

    function getWordList() {
      setWordList(["apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew", "kiwi", "lemon", "mango", "nectarine", "orange", "pear", "quince", "raspberry", "strawberry", "tangerine", "ugli", "watermelon"]);
      setFillerWordList(["a", "an", "the", "this", "that", "these", "those", "my", "your", "its", "our", "their"])
    }

    getWordList();

  }, []);


  return (
    <div>

      <div id="post-input">

      </div>

      <div id="post-selections">
        {wordList.map((word, index) => {
          return (
            <PostInputWord key={index} word={word}/>
          )
        })}
      </div>

    </div>
  )
}