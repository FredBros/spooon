"use server";
import { getLatestRecipes } from "@/src/query/recipe.query";

type fetchLastRecipesHomeDataProps = {
  userId?: string,
  page?: number,
  limit?: number
}
export async function fetchLastRecipesHomeData(
  userId?: string,
  page=1,
  limit=50
){
  const recipes = await getLatestRecipes(page, limit, userId);
  return recipes;
}
