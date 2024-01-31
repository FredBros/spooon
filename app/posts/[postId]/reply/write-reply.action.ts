"use server";
import { getUser } from "@/src/query/user.query";

import { prisma } from "@/lib/prisma";
import { WritePostFormValues } from "@/app/write/WritePostForm";
import { revalidatePath } from "next/cache";

export const createReply = async (postId: string, value: WritePostFormValues) => {
  const user = await getUser();
  const post = await prisma.post.create({
    data: {
      userId: user.id,
      content: value.content,
      parentId: postId,
    },
  });
  revalidatePath(`/posts/${postId}`);
  return postId;
};
