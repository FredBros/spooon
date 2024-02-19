import React from 'react'
import { CommentType } from "@/src/query/recipe.query";
import Comment from './Comment';
type CommentsProps = {
  recipeId: string;
  comments: CommentType[];
};

export default function CommentsSection({ comments, recipeId }: CommentsProps) {
  return (
    <div className="divide-y divide-accent">
      {comments.map((comment) => (
        <>
        <div key={comment.id}>
          {!comment.parentId ? (
            <Comment comment={comment} recipeId={recipeId} />
          )
          : null}
        </div>
          {comment._count?.replies ? (<div className='ml-10'>
            {comments.map((reply)=> (
              reply.parentId === comment.id && (
                <Comment comment={reply} recipeId={recipeId} key={reply.id} />
              )
            ))}
            </div>
          ): null}
          </>
      ))}
    </div>
  );
}
