"use client";

import { Post } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Trash2, Pencil } from 'lucide-react';
import { Button } from "./ui/button";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Heart, Trash2, Pencil } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import PostInput from "./PostInput";
import { useEffect } from "react";
import { Word } from "@/lib/types";        

type PromptPostProps = {
  post: Post;
  makeReactions: (post_id : number, clerk_id : string, newReaction : boolean, reactionType: "heart" | "laugh" | "sick" | "eyeroll" ) => void
  getExistingReactions: (postId : number, userId : string | undefined) => { heart: boolean; laugh: boolean; sick: boolean; eyeroll: boolean; }
  deletePost: (postId : number) => void
  editPost: (postId : number) => void
  ownedByUser: boolean
  timeAgoCreated: string
}


export default function PostTile({post, deletePost, makeReactions, getExistingReactions, editPost, ownedByUser, timeAgoCreated}:PromptPostProps) {
  const currentUser = useUser()
  const [existingReactions, setExistingReactions] = useState({heart: false, laugh: false, sick: false, eyeroll: false})
  useEffect(() => {
    async function getReaction(){
      const incomingExistingReactions = await getExistingReactions(post.id, currentUser.user?.id)
      setExistingReactions(incomingExistingReactions)
    }
    getReaction()
  },[currentUser, getExistingReactions, post])

  useEffect(() => {

  })
  const baseWords: Word[] = []
  console.log('post.words',post.words)
  console.log('post.slice',post.words.slice(0,20))
  post.words.slice(0.20).map((baseWord) => {
    baseWords.push({
      word: baseWord,
      type: 'base',
      used: 0,
    })
  })
  console.log('baseWords:',baseWords)

  const fillerWords: Word[] = []
  post.words.slice(20, post.words.length).map((fillerWord) => {
    fillerWords.push({
      word: fillerWord,
      type: 'filler',
      used: 0,
    })
  })
  console.log('fillerwords:',fillerWords)


  function handleDelete() {
    if (post && post.id) {
      deletePost(post.id);
    }
  }

  function handleReaction(reactionType: "heart" | "laugh" | "sick" | "eyeroll") {
    if (post && post.id) {
      let bool = false;
      if (reactionType === "heart") bool = !existingReactions.heart
      if (reactionType === "laugh") bool = !existingReactions.laugh
      if (reactionType === "sick") bool = !existingReactions.sick
      if (reactionType === "eyeroll") bool = !existingReactions.eyeroll
      makeReactions(post.id, post.user.clerkId, bool, reactionType)

      
    }
  }

  function handleEdit() {
    if (post && post.id) {
      editPost(post.id);
    }
  }
  const handleUpdate = (data: { words: string[], content: string, }) => {

  }
  return (
    <div className="flex bg-zinc-800 bg-opacity-70 rounded-2xl p-0 overflow-hidden">

      <div className="flex flex-col justify-start items-center gap-4 relative">
        <Avatar className="w-40 h-40 relative">
          <AvatarImage
            src={post.user.imageUrl || "/img/default-avatar.webp"}
            alt="User Profile Image"
            width={96}
            height={96}
            className="w-full h-full"
          />
          <AvatarFallback>
            {post.user.username ?
              post.user.username.charAt(0).toUpperCase()
              : "?"
            }
          </AvatarFallback>
          <h3 className="bg-zinc-800 bg-opacity-70 p-1 absolute bottom-0 w-full font-bold">
            {post.user.username || "Unknown User"}
          </h3>
        </Avatar>
      </div>

      <div className="relative h-full flex flex-col justify-center items-center flex-grow">

        <div className="absolute right-0 top-0 flex justify-center items-center">
          {post.createdAt &&
            <div className="text-zinc-500 py-2 px-3">
              {timeAgoCreated}
            </div>
          }
          {ownedByUser &&
            <div className="flex">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    onClick={handleEdit}
                    className="bg-zinc-50 bg-opacity-0 hover:bg-zinc-700"
                  >
                    <Pencil color={"white"} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit post</DialogTitle>
                    <DialogDescription>
                      Make changes to your post here. Click save when you're done.
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
                className="bg-zinc-50 bg-opacity-0 hover:bg-red-800"
              >
                <Trash2 color={"white"} />
              </Button>
            </div>
          }
        </div>


        <p className="text-3xl p-8">
          {post.content}
        </p>


        <div className="flex justify-center items-center gap-4 text-lg absolute right-6 bottom-2">
          <Button onClick={() => handleReaction("heart")} className="flex gap-1 items-center">❤️
            <span>0</span>
          </Button>

          <Button onClick={() => handleReaction("laugh")} className="flex gap-1 items-center">
            <span>😂</span>
            <span>0</span>
          </Button>

          <Button  onClick={() => handleReaction("sick")} className="flex gap-1 items-center">
            <span>🤮</span>
            <span>0</span>

          </Button>
          <Button onClick={() => handleReaction("eyeroll")} className="flex gap-1 items-center">
            <span>🙄</span>
            <span>0</span>
          </Button>

        </div>

      </div>

    </div >
  )
}

