export type Word = {
  word: string;
  type: "base" | "filler";
  used: number;
};

export type Prompt = {
  id: number;
  content: string;
};

export type Comment = {
  id: number;
  content: string;
  promptId: number;
  userClerkId: number;
  upvotes: number;
};

export type PublicUser = {
  userId: number;
  clerkId: string;
  username: string;
  imageUrl: string;
  // todo: add stats fiels eg. total posts, total upvoted etc.
};

export type Post = {
  id: number;
  user: PublicUser;
  promptId: number;
  content: string;
  words: Word[];
  upvotes: number;
  createdAt: Date;
};

export type Reaction = {
  postId: number;
  userId: number;
  heart: boolean;
  laugh: boolean;
  sick: boolean;
  eyeroll: boolean;
};

export type RawPost = {
  id: number;
  prompt_id: number;
  content: string;
  words: string[];
  upvotes: number;
  created_at: string;
  clerk_id: string;
  user_id: number;
  username: string;
  image_url: string;
};

