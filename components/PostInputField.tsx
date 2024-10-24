// import Button from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Tag, TagInput } from "emblor";

type PostInputFieldProps = {
  wordList: string[];
}

export default function PostInputField( {wordList} : PostInputFieldProps) {

  const [tags, setTags] = useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const [tagOptions, setTagOptions] = useState<Tag[]>([]);

  useEffect(() => {
    function makeTagOptions() {
      const tags: Tag[] = wordList.map((word, index) => {
        return {
          id: index.toString(),
          text: word,
        }
      });
      setTagOptions(tags);
    }
    makeTagOptions();
  }, [wordList]);

  return (
    <TagInput
      className="p-2"
      tags={tags}
      setTags={(newTags) => {
        setTags(newTags);
        // setValue('topics', newTags as [Tag, ...Tag[]]); 
      }}
      enableAutocomplete={true}
      autocompleteOptions={tagOptions}
      restrictTagsToAutocompleteOptions={true}
      draggable={true}
      activeTagIndex={activeTagIndex}
      setActiveTagIndex={setActiveTagIndex}
      clearAll={true}
      // readOnly={true}
      showCounter={true}
    />
  )
}