"use client";
import { useEffect, useState } from "react";
import PostInputWord from "./PostInputWord";
import PostInputField from "./PostInputField";

export default function PostInput() {

  const [wordList, setWordList] = useState<string[]>([]);
  const [fillerWordList, setFillerWordList] = useState<string[]>([]);
  const [combinedWordList, setCombinedWordList] = useState<string[]>([]);

  useEffect(() => {
    function getWordList() {
      setWordList(["apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew", "kiwi", "lemon", "mango", "nectarine", "orange", "pear", "quince", "raspberry", "strawberry", "tangerine", "ugli", "watermelon"]);
      setFillerWordList(["a", "an", "the", "this", "that", "these", "those", "my", "your", "its", "our", "their"])
      setCombinedWordList([...wordList, ...fillerWordList]);
    }
    getWordList();
  }, []);

  useEffect(() => {
    function insertWord() {
      
    }
  }, []);




  return (
    <div>

      <div id="post-input" className="p-4">
        <PostInputField wordList={combinedWordList} />
      </div>

      <div id="post-selections" className="flex gap-1 flex-wrap p-4 pt-0">
        {wordList.map((word, index) => {
          return (
            <PostInputWord key={index} word={word}/>
          )
        })}
      </div>

    </div>
  )
}