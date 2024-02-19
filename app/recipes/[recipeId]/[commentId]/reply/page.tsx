
'use client'
import React from "react";
import { getComment } from "@/src/query/recipe.query";
import { getUser } from "@/src/query/user.query";
import { notFound, usePathname } from "next/navigation";
import WritePostForm from "@/app/write/WritePostForm";
import createCommentReply from "./create-reply-comment.action";


export default async function ReplyComment({ params }: { params: { recipeId: string, commentId: string }}) {
  const user = await getUser();
  const comment = await getComment(params.commentId, user.id);
  const pathname = usePathname();
  if (!comment) {
    return notFound();
  }  

  return <div>reply comment
    <WritePostForm
          user={user}
          pathname={pathname}
          onSubmit={async (values) => {
            "use server";
            return createCommentReply(
              params.recipeId,
              params.commentId,
              values,
            );
          }}
        />
      </div>
  
}
