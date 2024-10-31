"use client";

import { Post } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PostInput from "./PostInput";
import { Word } from "@/lib/types";

type PromptPostProps = {
  post: Post;
  makeReactions: (
    post_id: number,
    clerk_id: string,
    newReaction: boolean,
    reactionType: "heart" | "laugh" | "sick" | "eyeroll"
  ) => void;
  getExistingReactions: (
    postId: number,
    userId: string | undefined
  ) => Promise<{
    heart: boolean;
    laugh: boolean;
    sick: boolean;
    eyeroll: boolean;
  }>;
  getReactionCount: (
    postId: number
  ) => Promise<{ heart: number; laugh: number; sick: number; eyeroll: number }>;
  deletePost: (postId: number) => void;
  editPost: (postId: number, content: string) => void;
  ownedByUser: boolean;
  timeAgoCreated: string;
};

export default function PostTile({
  post,
  deletePost,
  makeReactions,
  getExistingReactions,
  getReactionCount,
  editPost,
  ownedByUser,
  timeAgoCreated,
}: PromptPostProps) {
  const [existingReactions, setExistingReactions] = useState({
    heart: false,
    laugh: false,
    sick: false,
    eyeroll: false,
  });
  const [reactionCount, setReactionCount] = useState({
    heart: 0,
    laugh: 0,
    sick: 0,
    eyeroll: 0,
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const currentUser = useUser();

  const reactionButtonActiveClass = `reaction-button-active`;

  useEffect(() => {
    if (!currentUser.isLoaded) return;
    async function getCurrentUserReactions() {
      const incomingExistingReactions = await getExistingReactions(
        post.id,
        currentUser.user?.id
      );
      setExistingReactions(incomingExistingReactions);
    }
    getCurrentUserReactions();
  }, [currentUser.isLoaded, currentUser.user, getExistingReactions, post]);

  useEffect(() => {
    async function getAllReactionCount() {
      const incomingReactionCount = await getReactionCount(post.id);
      setReactionCount(incomingReactionCount);
    }
    getAllReactionCount();
  }, [getReactionCount, post]);

  const baseWords: Word[] = [];
  const fillerWords: Word[] = [];
  post.words.map((word) => {
    if (word.type === "base") {
      baseWords.push(word);
    } else {
      fillerWords.push(word);
    }
  });

  function handleDelete() {
    if (post && post.id) {
      deletePost(post.id);
    }
  }

  function handleReaction(
    reactionType: "heart" | "laugh" | "sick" | "eyeroll"
  ) {
    if (post && post.id) {
      let bool = false;

      const updatedReactions = { ...existingReactions };
      const updatedReactionCount = { ...reactionCount };

      if (reactionType === "heart") {
        bool = !existingReactions.heart;
        updatedReactions.heart = bool;
        updatedReactionCount.heart += bool ? 1 : -1;
      }
      if (reactionType === "laugh") {
        bool = !existingReactions.laugh;
        updatedReactions.laugh = bool;
        updatedReactionCount.laugh += bool ? 1 : -1;
      }
      if (reactionType === "sick") {
        bool = !existingReactions.sick;
        updatedReactions.sick = bool;
        updatedReactionCount.sick += bool ? 1 : -1;
      }
      if (reactionType === "eyeroll") {
        bool = !existingReactions.eyeroll;
        updatedReactions.eyeroll = bool;
        updatedReactionCount.eyeroll += bool ? 1 : -1;
      }

      // Optimistic UI update - this makes the ui update go way faster (2s without 0.03s with)
      setExistingReactions(updatedReactions);
      setReactionCount(updatedReactionCount);

      if (currentUser.isLoaded && currentUser.user) {
        try {
          makeReactions(post.id, currentUser.user.id, bool, reactionType);
        } catch (err) {
          console.error(err);
          // Revert Optimistic UI update if API call fails
          setExistingReactions(existingReactions);
          setReactionCount(reactionCount);
        }
      }
    }
  }

  const handleUpdate = (data: { words: string[]; content: string }) => {
    editPost(post.id, data.content);
    setDialogOpen(false);
  };

  return (
    <div className="w-[90svw] sm:w-[60svw] flex bg-background-raised/70 rounded-2xl p-0 overflow-hidden shadow-md shadow-black">
      <div className="flex flex-col justify-start items-center gap-4 relative">
        <Avatar className="w-40 h-40">
          <AvatarImage
            src={post.user.imageUrl || "/img/default-avatar.webp"}
            alt="User Profile Image"
            width={96}
            height={96}
            className="w-full h-full"
          />
          <AvatarFallback>
            {post.user.username
              ? post.user.username.charAt(0).toUpperCase()
              : "?"}
          </AvatarFallback>
          <h3 className="bg-zinc-800 bg-opacity-70 text-zinc-100 p-1 absolute bottom-0 w-full font-bold">
            {post.user.username || "Unknown User"}
          </h3>
        </Avatar>
      </div>

      <div className="relative h-full flex flex-col justify-center items-center flex-grow">
        <div className="absolute right-0 top-0 flex justify-center items-center">
          {post.createdAt && (
            <div className="text-zinc-500 py-2 px-3">{timeAgoCreated}</div>
          )}
          {ownedByUser && (
            <div className="flex h-full max-w-5xl">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-zinc-50 bg-opacity-0 hover:bg-zinc-700 shadow-none">
                    <Pencil color={"white"} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="">
                  <DialogHeader>
                    <DialogTitle>Edit post</DialogTitle>
                    <DialogDescription>
                      Make changes to your post here. Click save when
                      you&apos;re done.
                    </DialogDescription>
                  </DialogHeader>
                  <PostInput
                    baseWords={baseWords}
                    fillerWords={fillerWords}
                    handleSubmit={handleUpdate}
                  />
                </DialogContent>
              </Dialog>
              <Button
                onClick={handleDelete}
                className="bg-zinc-50 bg-opacity-0 hover:bg-destructive shadow-none"
              >
                <Trash2 color={"white"} />
              </Button>
            </div>
          )}
        </div>

        <p className="text-sm p-8 sm:text-3xl">{post.content}</p>

        <div className="flex justify-center items-center text-lg absolute right-4 bottom-1">
          <Button
            onClick={() => handleReaction("heart")}
            className={`reaction-button hover:bg-zinc-50 hover:bg-opacity-0 ${
              existingReactions.heart && reactionButtonActiveClass
            }`}
          >
            <span>❤️</span>
            <span className="opacity-85 text-sm">{reactionCount.heart}</span>
          </Button>

          <Button
            onClick={() => handleReaction("laugh")}
            className={`reaction-button hover:bg-zinc-50 hover:bg-opacity-0 ${
              existingReactions.laugh && reactionButtonActiveClass
            }`}
          >
            <span>😂</span>
            <span className="opacity-85 text-sm">{reactionCount.laugh}</span>
          </Button>

          <Button
            onClick={() => handleReaction("sick")}
            className={`reaction-button hover:bg-zinc-50 hover:bg-opacity-0 ${
              existingReactions.sick && reactionButtonActiveClass
            }`}
          >
            <span>🤮</span>
            <span className="opacity-85 text-sm">{reactionCount.sick}</span>
          </Button>

          <Button
            onClick={() => handleReaction("eyeroll")}
            className={`reaction-button hover:bg-zinc-50 hover:bg-opacity-0 ${
              existingReactions.eyeroll && reactionButtonActiveClass
            }`}
          >
            <span>🙄</span>
            <span className="opacity-85 text-sm">{reactionCount.eyeroll}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
