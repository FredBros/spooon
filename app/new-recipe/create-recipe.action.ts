'use server'
import  UniqueAlertDialog  from '@/src/feature/recipe/UniqueAlertDialog';
import { getUser } from "@/src/query/user.query";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { CreateRecipeFormValues } from "./CreateRecipeForm";
import { getYTVideoDetails } from "@/src/utils/youtubeUtils";
import { Prisma } from "@prisma/client";
import { getRecipeIdWithUrl } from '@/src/query/recipe.query';
import { checkIfChannelIdExists } from '@/src/query/channel.query';
import { createChannel } from './create.channel.action';

export type ResponseCreateRecipeType = {
  recipeId: string;
  ytChannelId: string;
  status: "success" | "notUnique" | "error" | "";
};

export const createRecipe = async (values: CreateRecipeFormValues) => {
  const response: ResponseCreateRecipeType = {
    recipeId: "",
    ytChannelId: "",
    status: "",
  };
  const user = await getUser();
  const videoValues = await getYTVideoDetails(values.url);
  if (!videoValues?.ytId) {
    throw new Error("Invalid YouTube URL");
  }
  const datadebug = {
    userId: user.id,
    ...values,
    ...videoValues,
  };
  console.log(datadebug);

  //verifier si videoValues.ytChannelId existe dans la base de donnée Channel
  if (!videoValues.ytChannelId) {
    throw new Error("Probleme avec l'ID de la chaine youtube");
  }
  const isExists = await checkIfChannelIdExists(videoValues.ytChannelId);
  if (!isExists) {
  await createChannel(videoValues.ytChannelId);  }
  try {
    const recipe = await prisma.recipe.create({
      data: {
        userId: user.id,
        ...values,
        ...videoValues,
        ytChannelId: videoValues.ytChannelId || "", // Ensure ytChannelId is always a string
        ytChannelTitle: videoValues.ytChannelTitle || "", // Ensure ytChannelTitle is always a string
        ytThumbnail: videoValues.ytThumbnail || "", // Ensure ytThumbnail is always a string
        ytPublishedAt: videoValues.ytPublishedAt || "", // Ensure ytPublishedAt is always a string or Date
        ytChannelThumbnail: videoValues.ytChannelThumbnail || "", // Ensure ytChannelThumbnail is always a string
      },
    });
    revalidatePath("/");
    response.recipeId = recipe.id;
    response.status = "success";
    return response;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        console.error(e);
        response.status = "notUnique";
        console.log(response.status);
        const recipeId = await getRecipeIdWithUrl(values.url);
        if (!recipeId) {
          response.recipeId = "error";
          response.status = "error";
          return response;
        }
        response.recipeId = recipeId.id;
        return response;
      } else {
        response.recipeId = "error";
        response.status = "error";
        return response;
      }
    }
    throw e;
  }
}



