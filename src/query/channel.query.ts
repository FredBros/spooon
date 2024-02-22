import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const getChannelDetails = async (channelId: string, userId?: string) => {
  const channelDetails = await prisma.channel.findUniqueOrThrow({
    where: {
      ytId  : channelId,
    },
    select: {
      id: true,
      title: true,
      ytId: true,
      rate: true,
      likesChannel: {
        select: {
          userId: true,
        },
        where: {
          userId: userId ?? "error",
        },
      },
      _count: {
        select: {
          likesChannel: true,
          recipes: true,
        },
      },
    },
  });
  return channelDetails;
};

export const checkIfChannelIdExists = async (channelId: string) => {
  const channel = await prisma.channel.findUnique({
    where: {
      ytId: channelId,
    },
  });
  return channel;
};
export type ChannelDetailsType = Prisma.ChannelSelect<DefaultArgs>[];
