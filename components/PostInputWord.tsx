import { Button } from "@/components/ui/button";
import { Word } from "@/lib/types";
import { useEffect, useState } from "react";

type PostInputWordProps = {
  word: Word;
  insertWord: (word: Word) => void;
};

export default function PostInputWord({
  word,
  insertWord,
}: PostInputWordProps) {
  const [className, setClassName] = useState<string>("");
  const [used, setUsed] = useState<number>(word.used);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    setUsed(word.used);
    let newClassName = "";
    if (word.type === "base") {
      if (used > 0) {
        newClassName += "disabled opacity-50 bg-grey-500 text-white";
        setIsDisabled(true);
      } else {
        newClassName += "bg-blue-500 hover:bg-blue-600 text-white";
        setIsDisabled(false);
      }
    } else if (word.type === "filler") {
      newClassName += "bg-orange-500 hover:bg-orange-600 text-white";
    }
    setClassName(newClassName);
  }, [used, word]);

  function handleClick() {
    setUsed(used + 1);
    word.used = used + 1;
    insertWord(word);
    setClassName((prevClassName) => prevClassName + "");
  }

  return (
    <Button
      type="button"
      className={className}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {word.word}
    </Button>
  );
}
