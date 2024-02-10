import React from 'react'
import { CommentType } from "@/src/query/recipe.query";
import Comment from './Comment';
type CommentsProps = {
  recipeId: string
    comments: CommentType[];
}

export default function CommentsSection({ comments, recipeId }: CommentsProps) {
  return (
    <div className="divide-y divide-accent">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} recipeId={recipeId} />
      ))}
    </div>
  );
}
