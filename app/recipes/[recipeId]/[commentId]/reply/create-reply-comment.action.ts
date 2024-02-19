'use server'
import { getUser } from "@/src/query/user.query";
import { WritePostFormValues } from "@/app/write/WritePostForm";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function createCommentReply(
  recipeId: string,
  commentId: string,
  value: WritePostFormValues,
) {
  const user = await getUser();
  const comment = await prisma.comment.create({
    data: {
      userId: user.id,
      content: value.content,
      parentId: commentId,
      recipeId: recipeId,
    },
  });
  revalidatePath(`/recipes/${recipeId}`);
  return recipeId;
}