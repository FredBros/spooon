import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

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
  } satisfies Prisma.CommentSelect<DefaultArgs>);

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


export const getLatestRecipes = (page: number, limit: number, userId?: string) =>
  prisma.recipe.findMany({
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      createdAt: "desc",
    },
    select: recipeSelectQuery(userId),
  });

  export const getComments = (recipeId: string, userId?: string) =>
  prisma.comment.findMany({
    where: { recipeId },
    select: commentSelectQuery(userId),
  });

  export const getComment = (commentId: string, userId?: string) =>
  prisma.comment.findUnique({
    where: { id: commentId },
    select: commentSelectQuery(userId),
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

export const getChannelLastRecipes = (
  channelId: string,
  page: number,
  limit: number,
  userId?: string
) =>
  prisma.recipe.findMany({
    where: { ytChannelId: channelId },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      createdAt: "desc",
    },
    select: recipeSelectQuery(userId),
  });

export const getChannelMostLikedRecipes = (
  channelId: string,
  page: number,
  limit: number,
  userId?: string
) =>
  prisma.recipe.findMany({
    where: { ytChannelId: channelId },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      likesRecipe: {
        _count: "desc",
      },
    },
    select: recipeSelectQuery(userId),
  });

export const getChannelLikedRecipes = (
  channelId: string,
  page: number,
  limit: number,
  userId?: string
) =>
  prisma.recipe.findMany({
    where: { ytChannelId: channelId,
      OR: [{
      likesRecipe: {
        some: {
          userId: userId ?? "error",
        },
      }},
      {
        user: {
          id: userId ?? "error",
      }}
    ]},
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      likesRecipe: {
        _count: "desc",
      },
    },
    select: recipeSelectQuery(userId),
  });


export const getAllChannelRecipes = (channelId:string) =>{
  return prisma.recipe.findMany({
    where: { ytChannelId: channelId },
    select: {
      id: true,
      ytId: true,
    },
  });

}





export type RecipeHome = Prisma.PromiseReturnType<
  typeof getLatestRecipes
>[number];
export type RecipeView = Prisma.PromiseReturnType<typeof getRecipeView>;
export type CommentType = Prisma.PromiseReturnType<typeof getComments>[number];
