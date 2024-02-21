import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";


export const  getChannelData = async (channelId : string, userId?: string) =>{
    prisma.channel.findUniqueOrThrow({
      where: {
        id: channelId,
      },
      select: {
        id: true,
        title: true,
        ytDescription: true,
        ytId: true,
        ytChannelId: true,
        ytChannelTitle: true,
        ytChannelThumbnail: true,
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
          },
        },
      },
    });
    }
export type ChannelDetailsType = Prisma.ChannelSelect<DefaultArgs>[]