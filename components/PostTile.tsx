"use client";

import { Post } from "@/lib/types";
// import { User } from "@clerk/nextjs/server";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Heart } from 'lucide-react';

type PromptPostProps = {
  post: Post;
  deletePost: (postId : number) => void
}

export default function PostTile({post, deletePost}:PromptPostProps) {

  function handleDelete() {
    if (post && post.id) {
      deletePost(post.id)
      
    }
  }


  return (
    <div className="flex bg-zinc-800 bg-opacity-70 rounded-2xl p-0 overflow-hidden">
      
      <div className="flex flex-col justify-center items-center gap-4 relative">
        <Avatar className="w-36 h-36">
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
        </Avatar>
        <h3 className="bg-zinc-800 bg-opacity-70 p-1 absolute bottom-0 w-full font-bold">
          {post.user.username || "Unknown User"}
        </h3>
      </div>

      <div className="flex justify-center items-center p-12 text-3xl flex-grow">
        {/* <p>{post.createdAt}</p> */}
        <p>{post.content}</p>
      </div>

      <div className="flex flex-col justify-center items-center gap-1 text-2xl w-32 bg-zinc-800">
        <Heart fill="red" strokeWidth={0} size={64} />
        <p>{post.upvotes}</p>
      </div>

      <div>
        <button onClick={handleDelete}>Delete</button>
      </div>

    </div>
  )
}