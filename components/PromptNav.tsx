import { redirect } from "next/navigation";
import PostPrompt from "@/components/PostPrompt";
import { Prompt } from "@/lib/types";

type PromptNavigationProps = {
  allPrompts: Prompt[];
  promptRes: Prompt[];
};

const PromptNavigation: React.FC<PromptNavigationProps> = ({
  allPrompts,
  promptRes,
}) => {
  const prompt = promptRes[0];
  const promptCount = allPrompts.length;
  const promptsLowerBound = allPrompts[0].id;
  const promptsUpperBound = promptsLowerBound + promptCount - 1;

  async function nextPrompt() {
    "use server";
    if (prompt.id < promptsUpperBound) {
      redirect(`/play/${prompt.id + 1}`);
    }
  }

  async function prevPrompt() {
    "use server";
    if (prompt.id > promptsLowerBound) {
      redirect(`/play/${prompt.id - 1}`);
    }
  }

  return (
    <PostPrompt
      prompt={prompt}
      promptsUpperBound={promptsUpperBound}
      promptsLowerBound={promptsLowerBound}
      nextPrompt={nextPrompt}
      prevPrompt={prevPrompt}
    />
  );
};
export default PromptNavigation;
