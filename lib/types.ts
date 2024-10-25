export type Word = {
  word: string;
  type: "base" | "filler";
  used: number;
};

export type Prompt = {
  id: number;
  content: string;
}