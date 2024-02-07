'use server'
import { getUser } from "@/src/query/user.query";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { CreateRecipeFormValues } from "./CreateRecipeForm";

export const createRecipe = async (values: CreateRecipeFormValues) => {
  const user = await getUser();
  const recipe = await prisma.recipe.create({
    data: {
      userId: user.id,
      ...values,
    },
  });
  revalidatePath("/");
  return recipe.id;
};