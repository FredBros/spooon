import React from 'react'
import RecipeCard from "@/src/feature/recipe/RecipeCard";
import { TabProps } from './LastTab';
import { fetchLikedTabData } from './actions';

export default async function LikedTab({ channelId, userId }: TabProps) {

const recipes = await fetchLikedTabData({ channelId, userId });
return (
  <div className="flex gap-2 flex-wrap justify-center">
    {recipes.map((recipe) => (
      <RecipeCard key={recipe.id} recipe={recipe} />
    ))}
  </div>
);
}
