"use client";

import { Post } from "@/lib/types";
// import { User } from "@clerk/nextjs/server";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Heart, Trash2, Pencil } from 'lucide-react';
import { Button } from "./ui/button";

type PromptPostProps = {
  post: Post;
  deletePost: (postId : number) => void
  editPost: (postId : number) => void
  ownedByUser: boolean
  timeAgoCreated: string
}

export default function PostTile({post, deletePost, editPost, ownedByUser, timeAgoCreated}:PromptPostProps) {

  function handleDelete() {
    if (post && post.id) {
      deletePost(post.id); 
    }
  }

  function handleEdit() {
    if (post && post.id) {
      editPost(post.id);
    }
  }

  return (
    <div className="flex bg-zinc-800 bg-opacity-70 rounded-2xl p-0 overflow-hidden">``
      
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
            { post.user.username ? 
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
          { post.createdAt &&
            <div className="text-zinc-500 py-2 px-3">
              {timeAgoCreated}
            </div>
          }
          { ownedByUser &&
            <div className="flex">
              <Button
                onClick={handleEdit} 
                className="bg-zinc-50 bg-opacity-0 hover:bg-zinc-700"
              >
                <Pencil color={"white"}/>
              </Button>
              <Button
                onClick={handleDelete}
                className="bg-zinc-50 bg-opacity-0 hover:bg-red-800"
              >
                <Trash2 color={"white"}/>
              </Button>
            </div>
          }
        </div>

        <p className="text-3xl p-8">
          {post.content}
        </p>

          
        <div className="flex justify-center items-center gap-4 text-lg absolute right-6 bottom-2">

          <span className="flex gap-1 items-center">
            <Heart fill="red" strokeWidth={0} size={24} />
            <span>{post.upvotes}</span>
          </span>

          <span className="flex gap-1 items-center">
            <span>😂</span>
            <span>0</span>
          </span>

          <span className="flex gap-1 items-center">
            <span>🤮</span>
            <span>0</span>
          </span>
          
          <span className="flex gap-1 items-center">
            <span>🙄</span>
            <span>0</span>
          </span>

        </div>

      </div>

    </div>
  )
}