// import Button from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Tag, TagInput } from "emblor";
import { Word } from "@/lib/types";

type PostInputFieldProps = {
  wordList: Word[];
  incomingTags: Tag[];
  removeWord: (tagString: string) => void;
  clearAll: () => void;
};

export default function PostInputField({
  wordList,
  incomingTags,
  clearAll,
  removeWord,
}: PostInputFieldProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const [tagOptions, setTagOptions] = useState<Tag[]>([]);

  useEffect(() => {
    function makeTagOptions() {
      const tags: Tag[] = wordList.map((word, index) => {
        return {
          id: index.toString(),
          text: word.word,
        };
      });
      setTagOptions(tags);
    }
    makeTagOptions();
  }, [wordList]);

  useEffect(() => {
    setTags(incomingTags);
  }, [incomingTags]);

  function handleRemoveTag(tag: string) {
    console.log("removing tag: ", tag);
    removeWord(tag);
  }

  function handleClearAll() {
    clearAll();
  }

  return (
    <TagInput
      tags={tags}
      setTags={(newTags) => {
        setTags(newTags);
      }}
      activeTagIndex={activeTagIndex}
      setActiveTagIndex={setActiveTagIndex}
      enableAutocomplete={true}
      autocompleteOptions={tagOptions}
      restrictTagsToAutocompleteOptions={true}
      draggable={false}
      clearAll={true}
      onClearAll={handleClearAll}
      readOnly={true}
      showCounter={true}
      onTagRemove={handleRemoveTag}
      inlineTags={true}
      usePopoverForTags={false}
      interaction={"clickable"}
      animation={"slideIn"}
      className="bg-red-500"
      styleClasses={{
        tag: {
          body: "bg-teal-500 text-white border-0 pl-2 pr-0 py-0 h-7 rounded-lg hover:bg-teal-600 shadow-sm shadow-themeshadow",
          closeButton: "bg-none text-white py-0 px-1",
        },
        tagList: {
          container: "bg-red-500 p-4",
          sortableList: "bg-blue-500 p-4",
        },
        inlineTagsContainer:
          "bg-zinc-200 text-white rounded-2xl p-2 w-full min-h-11 emblor-tag-container shadow-sm shadow-themeshadow m-2",
        clearAllButton:
          "bg-red-600 hover:bg-red-700 text-white w-auto self-center mt-3 shadow-sm shadow-themeshadow",
        input: "hidden",
        autoComplete: {
          popoverContent: "hidden",
          popoverTrigger: "hidden",
        },
      }}
    />
  );
}
