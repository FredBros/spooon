import RecipeCard from "@/src/feature/recipe/RecipeCard";
import { fetchLastRecipesHomeData } from "./actions";
import { RecipeHome } from "@/src/query/recipe.query";
import { getAuthSession } from "@/lib/auth";

export default async function Home() {
 
const session = await getAuthSession();  const recipes = await fetchLastRecipesHomeData(session?.user.id);
  
  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
