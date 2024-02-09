'use server'
import  UniqueAlertDialog  from '@/src/feature/recipe/UniqueAlertDialog';
import { getUser } from "@/src/query/user.query";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { CreateRecipeFormValues } from "./CreateRecipeForm";
import { getVideoDetails } from "@/src/utils/youtubeUtils";
import { Prisma } from "@prisma/client";
import { get } from 'http';
import { getRecipeIdWithUrl } from '@/src/query/recipe.query';
import { th } from '@faker-js/faker';

export type ResponseCreateRecipeType = {
  recipeId: string;
  status: "success" | "notUnique" | "error" |'';
};

export const createRecipe = async (values: CreateRecipeFormValues) => {
  const response: ResponseCreateRecipeType = {
    recipeId: "",
    status: "",
  };

  const user = await getUser();
  const ytvalues = await getVideoDetails(values.url);
  if (!ytvalues?.ytId) {
    throw new Error("Invalid YouTube URL");
  }
  const datadebug = {
    userId: user.id,
    ...values,
    ...ytvalues,
  };
  console.log(datadebug);
  try {
    const recipe = await prisma.recipe.create({
      data: {
        userId: user.id,
        ...values,
        ...ytvalues,
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
        console.log(response);
        return response;
      } else {
        response.recipeId = "error";
        response.status = "error";
        return response;
      }
    }
    throw e;
  }
  // throw new Error("Error creating recipe");
}
