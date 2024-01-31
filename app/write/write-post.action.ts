"use server";
import { getUser } from "@/src/query/user.query";
import { WritePostFormValues } from "./WritePostForm";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createPost = async (value: WritePostFormValues) => {
  const user = await getUser();
  const post = await prisma.post.create({
    data: {
      userId: user.id,
      content: value.content,
    },
  })
  revalidatePath("/");
  return post.id;
};
