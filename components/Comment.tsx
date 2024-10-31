import { Comment } from "@/lib/types";

type commentProps = {
  comment: Comment;
};

export default function CommentTile({ comment }: commentProps) {
  return (
    <div>
      <p>User: {comment.userClerkId}</p>
      <p>Comment: {comment.content}</p>
      <p>Upvotes: {comment.upvotes}</p>
    </div>
  );
}
