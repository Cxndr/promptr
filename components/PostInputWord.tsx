import { Button } from "@/components/ui/button";

type PostInputWordProps = {
  word: string;
}

export default function PostInputWord( {word} : PostInputWordProps) {


  return (
    <Button
      type="button"
      className=""
    >
      {word}
    </Button>
  )
}