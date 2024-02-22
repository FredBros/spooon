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


// export const getTotalLikesByChannel = async (channelId: string) => {
//   // totalLikes egale le total de tous les likes des recettes de la chaine
//   const totalLikes = await prisma.recipe.aggregate({
//     where: {
//       ytChannelId: channelId,
//     },
//     _sum:{
//       likesRecipe: true,
//     },
//   });
// }
export async function countLikesRecipesForChannel(channelId:string) {
  const recipesLikes = await prisma.recipe.findMany({
    where: {
      ytChannelId: channelId,
    },
    select: {
      _count: {
        select: {
          likesRecipe: true,
        },
      },
    },
  });
const totalLikes = recipesLikes.reduce(
  (acc, curr) => acc + curr._count.likesRecipe,
  0
);
  return totalLikes;
}





export type ChannelDetailsType = Prisma.ChannelSelect<DefaultArgs>[];
