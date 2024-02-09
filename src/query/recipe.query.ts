import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const commentSelectQuery = (userId?: string) =>
  ({
    id: true,
    content: true,
    createdAt: true,
    parentId: true,
    user: {
      select: {
        username: true,
        id: true,
        image: true,
      },
    },
    likesComment: {
      select: {
        userId: true,
      },
      where: {
        userId: userId ?? "error",
      },
    },
    _count: {
      select: {
        likesComment: true,
        replies: true,
      },
    },
  } satisfies Prisma.CommentSelect);

export const recipeSelectQuery = (userId?: string) =>
  ({
    id: true,
    url: true,
    title: true,
    description: true,
    ytDescription: true,
    ytThumbnail: true,
    ytId: true,
    ytChannelId: true,
    ytChannelThumbnail: true,
    ytChannelTitle: true,
    ytPublishedAt: true,
    createdAt: true,
    user: {
      select: {
        username: true,
        id: true,
        image: true,
      },
    },
    rating: true,
    likesRecipe: {
      select: {
        userId: true,
      },
      where: {
        userId: userId ?? "error",
      },
    },
    _count: {
      select: {
        likesRecipe: true,
        ratings: true,
        comments: true,
      },
    },
  } satisfies Prisma.RecipeSelect);

export const getLatestRecipes = (userId?: string) =>
  prisma.recipe.findMany({
    take: 20,
    orderBy: {
      createdAt: "desc",
    },
    select: recipeSelectQuery(userId),
  });

export const getRecipeView = (id: string, userId?: string) =>
  prisma.recipe.findUnique({
    where: { id },
    select: {
      ...recipeSelectQuery(userId),
      comments: {
        orderBy: {
          createdAt: "desc",
        },
        select: commentSelectQuery(userId),
      },
    },
  });

export const getRecipeIdWithUrl = (url: string) =>
  prisma.recipe.findFirst({
    where: { url },
    select: {
      id: true,
    },
  });

  export type RecipeHome = Prisma.PromiseReturnType<typeof getLatestRecipes>[number];