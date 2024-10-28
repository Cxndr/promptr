"use client";
import { useEffect, useState } from "react";
import PostInputWord from "./PostInputWord";
import PostInputField from "./PostInputField";
import { Tag } from "emblor";
import {
  Form,
  FormControl,
  // FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Word } from "@/lib/types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function PostInput({
  baseWords,
  fillerWords,
  handleSubmit,
}: {
  baseWords: Word[];
  fillerWords: Word[];
  handleSubmit: (data: { words: string[]; content: string }) => void;
}) {
  const [baseWordList, setBaseWordList] = useState<string[]>([]);
  const [fillerWordList, setFillerWordList] = useState<string[]>([]);
  const [wordList, setWordList] = useState<Word[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [responseSentence, setResponseSentence] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const defaultFillerWords: Word[] = [
      { word: "my", type: "base", used: 0 },
      { word: "i", type: "base", used: 0 },
      { word: "you", type: "base", used: 0 },
      { word: "a", type: "base", used: 0 },
      { word: "the", type: "base", used: 0 },
      { word: "and", type: "base", used: 0 },
      { word: ", ", type: "filler", used: 0 },
      { word: ". ", type: "filler", used: 0 },
    ];
    const updatedFillerWords = [...fillerWords];
    defaultFillerWords.forEach((word) => {
      if (!updatedFillerWords.includes(word)) {
        updatedFillerWords.push(word);
      }
    });
    setBaseWordList(baseWords.map((wordObj) => wordObj.word));
    setFillerWordList(updatedFillerWords.map((wordObj) => wordObj.word));
  }, [baseWords, fillerWords]);

  useEffect(() => {
    const list: Word[] = [];
    baseWordList.forEach((word) => {
      list.push({
        word: word,
        type: "base",
        used: 0,
      });
    });
    fillerWordList.forEach((word) => {
      list.push({
        word: word,
        type: "filler",
        used: 0,
      });
    });
    setWordList(list);
  }, [baseWordList, fillerWordList]);

  function capitalizeAfterPeriod(text: string) {
    return text
      .split(/(\.\s*)/) // Split on period followed by any number of spaces
      .map((part, index) => {
        if (index % 2 === 0) {
          return part.charAt(0).toUpperCase() + part.slice(1);
        }
        return part;
      })
      .join("");
  }

  useEffect(() => {
    let sentence = tags.map((tag) => tag.text).join(" ");
    if (sentence) {
      sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
      sentence = sentence.replaceAll(" .", ".");
      sentence = sentence.replaceAll(" ,", ",");
      sentence = capitalizeAfterPeriod(sentence);
    }
    setResponseSentence(sentence);
  }, [tags]);

  function insertWord(word: Word) {
    setTags([...tags, { id: tags.length.toString(), text: word.word }]);
  }

  function removeWord(tagString: string) {
    const updatedWordList = wordList.map((word) => {
      if (word.word === tagString) {
        return { ...word, used: 0 };
      }
      return word;
    });
    setWordList(updatedWordList);
    setTags(tags.filter((tag) => tag.text !== tagString));
  }

  function clearAll() {
    const updatedWordList = wordList.map((word) => {
      return { ...word, used: 0 };
    });
    setWordList(updatedWordList);
    setTags([]);
  }

  const form = useForm();

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
    >

      <CollapsibleTrigger asChild className="mb-6">
        {isOpen 
          ? (
            <Button className="font-bold bg-pink-600 hover:bg-pink-700 text-zinc-50 rounded-lg">
              Hide
              <ChevronUp/>
            </Button>
          )
          : (
            <Button className="font-bold bg-pink-600 hover:bg-pink-700 text-zinc-50 rounded-lg">
              Create a Response
              <ChevronDown/>
            </Button>
          )
        }
        
      </CollapsibleTrigger>

      <CollapsibleContent className="CollapsibleContent">
        <h3 className="text-xl">
          {responseSentence ? (
            responseSentence
          ) : (
            <span className="text-gray-400">
              Create a response using the words below.
            </span>
          )}
        </h3>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const words = wordList.map((word) => word.word);
              const content = responseSentence;
              handleSubmit({ words, content });
            }}
            className="flex flex-col justify-center items-center p-4"
          >
            <FormField
              control={form.control}
              name="submitPromtResponseForm"
              render={() => (
                <FormItem>
                  <FormLabel />

                  {/* <FormDescription></FormDescription> */}

                  <div className="flex flex-col gap-6">
                    <FormControl>
                      <div className="">
                        <PostInputField
                          wordList={wordList}
                          incomingTags={tags}
                          removeWord={removeWord}
                          clearAll={clearAll}
                        />
                      </div>
                    </FormControl>

                    <FormControl>
                      <div
                        id="post-selections"
                        className="flex gap-2 flex-wrap px-4"
                      >
                        {wordList.map((word, index) => {
                          return (
                            <PostInputWord
                              key={index}
                              word={word}
                              insertWord={insertWord}
                            />
                          );
                        })}
                      </div>
                    </FormControl>
                  </div>
                  

                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 font-bold rounded-lg shadow-sm shadow-black"
            >
              Submit
            </button>
          </form>
        </Form>
      </CollapsibleContent>

    </Collapsible>
  );
}
