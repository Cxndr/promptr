import { User } from "@clerk/nextjs/server";

export type Word = {
  word: string;
  type: "base" | "filler";
  used: number;
};

export type Prompt = {
  id: number;
  content: string;
}

export type Comment = {
  id: number;
  content: string;
  promptId: number;
  userClerkId: number;
  upvotes: number;
}

export type Post = {
  id: number;
  promptId: number;
  content: string;
  words: Word[];
  upvotes: number;
  clerkUser: User;
  // dateCreated: Date;
}