"use client";
import { useEffect, useState } from "react";
import PostInputWord from "./PostInputWord";
import PostInputField from "./PostInputField";
import { Tag } from "emblor";
import { Form, FormControl, FormDescription, FormItem, FormLabel, FormMessage, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";

export type Word = {
  word: string;
  type: 'base' | 'filler';
  used: number;
}

export default function PostInput() {

  const [baseWordList, setBaseWordList] = useState<string[]>([]);
  const [fillerWordList, setFillerWordList] = useState<string[]>([]);
  const [wordList, setWordList] = useState<Word[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [responseSentence, setResponseSentence] = useState<string>("");

  useEffect(() => {
    function getWordLists() {
      setBaseWordList(["apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew", "kiwi", "lemon", "mango", "nectarine", "orange", "pear", "quince", "raspberry", "strawberry", "tangerine", "watermelon"]);
      setFillerWordList(["a", "an", "the", "this", "that", "these", "those", "my", "your", "its", "our", "their", "in", "is", "to", "more", "no", ". ", ", "])
    }
    getWordLists();
  }, []);

  useEffect(() => {
    const list: Word[] = [];
    baseWordList.forEach((word) => {
      list.push({
        word: word,
        type: 'base',
        used: 0,
      });
    });
    fillerWordList.forEach((word) => {
      list.push({
        word: word,
        type: 'filler',
        used: 0,
      });
    });
    setWordList(list);
  }, [baseWordList, fillerWordList]);

  function capitalizeAfterPeriod(text: string) {
    return text
      .split(/(\.\s*)/) // Split on period followed by any number of spaces
      .map((part, index) => {
        // Only capitalize sentences, skip the period itself
        if (index % 2 === 0) {
          return part.charAt(0).toUpperCase() + part.slice(1);
        }
        return part;
      })
      .join(''); // Rejoin the text
  }

  useEffect(() => {
    let sentence = tags.map(tag => tag.text).join(" ");
    if (sentence) {
      sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
      sentence = sentence.replaceAll(" .", ".");
      sentence = sentence.replaceAll(" ,", ",");
      sentence = capitalizeAfterPeriod(sentence);
    }
    setResponseSentence(sentence);
  }, [tags]);


  function insertWord(word: Word) {
    setTags([...tags, {id: tags.length.toString(), text: word.word}]);
  }

  function removeWord(tagString: string) {
    const updatedWordList = wordList.map((word) => {
      if (word.word === tagString) {
        return { ...word, used: 0 };
      }
      return word;
    });
    setWordList(updatedWordList);
    setTags(tags.filter(tag => tag.text !== tagString));
  }

  function clearAll() {
    const updatedWordList = wordList.map((word) => {
      return { ...word, used: 0 };
    });
    setWordList(updatedWordList);
    setTags([]);
  }

  const form = useForm();

  function handleSubmit() {
    // submit the post
  }

  return (
    <div>
      <h3 className="text-xl">
        {responseSentence ? responseSentence : 
          <span className="text-gray-400">Create a sentence using the words below.</span>
        }
      </h3>
      <Form {...form}>
        <form 
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center p-4"
        >
          <FormField
            control={form.control}
            name="submitPromtResponseForm"
            render={() => (
              <FormItem>
                <FormLabel/>

                <FormDescription>
                  
                </FormDescription>

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
                  
                <div id="post-selections" className="flex gap-2 flex-wrap px-4">
                  {wordList.map((word, index) => {
                    return (
                      <PostInputWord
                        key={index} 
                        word={word} 
                        insertWord={insertWord}
                      />
                    )
                  })}
                </div>
                </FormControl>

                
                <FormMessage/>
              </FormItem>
            )}
          />
          <button type="submit" className="mt-8 px-4 py-2 bg-green-600 hover:bg-green-700 font-bold rounded-lg shadow-sm shadow-black">Submit</button>
        </form>
      </Form>



    </div>
  )
}