'use server'
import { getChannelLastRecipes, getChannelLikedRecipes, getChannelMostLikedRecipes } from "@/src/query/recipe.query";

export async function fetchLastTabData({channelId, userId, page=1, limit=20}:
    {channelId: string, userId?: string, page?: number, limit?: number}) {
  const recipes = await getChannelLastRecipes(channelId, page, limit, userId);
  return recipes;
}

export async function fetchMostLikedTabData({channelId, userId, page=1, limit=20}:
    {channelId: string, userId?: string, page?: number, limit?: number}) {
  const recipes = await getChannelMostLikedRecipes(
    channelId,
    page,
    limit,
    userId
  );
  return recipes;
}
export async function fetchLikedTabData({channelId, userId, page=1, limit=20}:
    {channelId: string, userId?: string, page?: number, limit?: number}) {
  const recipes = await getChannelLikedRecipes(channelId, page, limit, userId);
  return recipes;
}


