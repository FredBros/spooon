"use server";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const likeRecipeAction = async (recipeId: string) => {
  const session = await getAuthSession();
  if (!session?.user.id) {
    return;
  }
  const isLiked = await prisma.likeRecipe.findFirst({
    where: {
      recipeId,
      userId: session.user.id,
    },
  });
  if (isLiked) {
    await prisma.likeRecipe.delete({
      where: {
        id: isLiked.id,
      },
    });
  } else {
    await prisma.likeRecipe.create({
      data: {
        userId: session.user.id,
        recipeId,
      },
    });
  }
revalidatePath("/");
};
