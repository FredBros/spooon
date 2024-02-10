"use server";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function likeCommentAction (commentId: string) {
  const session = await getAuthSession();
  if (!session?.user.id) {
    return;
  }
  const isLiked = await prisma.likeComment.findFirst({
    where: {
      commentId,
      userId: session.user.id,
    },
  });
  if (isLiked) {
    await prisma.likeComment.delete({
      where: {
        id: isLiked.id,
      },
    });
  } else {
    await prisma.likeComment.create({
      data: {
        userId: session.user.id,
        commentId,
      },
    });
  }
  revalidatePath('/recipes');
}