"use server";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const likeChannelAction = async (channelId: string) => {
  const session = await getAuthSession();
  if (!session?.user.id) {
    return;
  }
  const isLiked = await prisma.likeChannel.findFirst({
    where: {
      channelId,
      userId: session.user.id,
    },
  });
  if (isLiked) {
    await prisma.likeChannel.delete({
      where: {
        id: isLiked.id,
      },
    });
  } else {
    await prisma.likeChannel.create({
      data: {
        userId: session.user.id,
        channelId,
      },
    });
  }
  revalidatePath("/channels/[channelId]");
}