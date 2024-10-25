import { Prompt } from "@/lib/types"


type PostPromptProps = {
  prompt: Prompt;
}

export default function PostPrompt( {prompt} : PostPromptProps ) {

  return (
    <div className="max-w-4xl mx-auto">
      { prompt &&
        <p className="text-2xl font-bold text-left">{prompt.content}</p>
      }
    </div>
  )
}