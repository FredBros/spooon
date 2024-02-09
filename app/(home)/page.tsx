import { getAuthSession } from "@/lib/auth";
import Post from "@/src/feature/post/Post";
import { getLatestPosts } from "@/src/query/post.query";
import { getLatestRecipes } from "@/src/query/recipe.query";

import RecipeCard from "@/src/feature/recipe/RecipeCard";

export default async function Home() {
  const session = await getAuthSession();
  const latestRecipes = await getLatestRecipes(session?.user.id);

  
  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {latestRecipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
