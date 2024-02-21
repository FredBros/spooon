import { fetchLastTabData } from './actions'
import RecipeCard from '@/src/feature/recipe/RecipeCard'

export type TabProps = {
    channelId: string
    userId?: string
}

export default async function LastTab({ channelId, userId}: TabProps) {
  const recipes = await fetchLastTabData({ channelId, userId });
  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
