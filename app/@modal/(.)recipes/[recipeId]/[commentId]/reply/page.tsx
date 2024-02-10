import React from 'react'
import { getUser } from "@/src/query/user.query";
import WriteModal from '@/app/@modal/(.)write/WriteModal';
import { createComment } from '@/app/recipes/[recipeId]/comment/write-comment.action';
import createCommentReply from '@/app/recipes/[recipeId]/[commentId]/reply/create-reply-comment.action';


export default async function pageCommentRecipe({params}: {params: {recipeId: string, commentId: string}}) {
  const user = await getUser();
  return (
    <div>
      <WriteModal
        user={user}
        path={"reply"}
        createPost={async (values) => {
          "use server";
          const reply = await createCommentReply(params.recipeId, params.commentId, values);
          return reply;
        }}
      />
    </div>
  );
}
