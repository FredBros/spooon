'use server'
import { prisma } from "@/lib/prisma";
import { getYTChannelDetails } from "@/src/utils/youtubeUtils";
import { Prisma } from "@prisma/client";


export const createChannel = async (ytChannelId: string) => {
const channelDetails = await getYTChannelDetails(ytChannelId);
if (!channelDetails) {
  throw new Error("Invalid YouTube Channel ID");
}
try {
    const channel = await prisma.channel.create({
      data: {
        ytId: ytChannelId,
        title: channelDetails.title || "Pas de titre disponible",
        url: `https://www.youtube.com/${channelDetails.customUrl}` || "",
      },
    });
    return channel;
} catch (error) {
    console.error(error);
    throw error;
}
}
