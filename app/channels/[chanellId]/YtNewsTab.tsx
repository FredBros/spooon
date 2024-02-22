import { rssToJson } from "@/src/utils/rssToJson";
import YtRecipeCard from "./YtRecipeCard";
import { getAllChannelRecipes } from "@/src/query/recipe.query";


type YtNewsTabProps = { 
  channelId: string
isLogged: boolean};
export type YtRecipeType = {
  id: string;
  title: string;
  description: string;
  link: string;
  published: string;
};

export default async function YtNewsTab({ channelId, isLogged }: YtNewsTabProps) {
  const data = await rssToJson(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
  );
  const allRecipesInDb= await getAllChannelRecipes(channelId);
  const recipes: YtRecipeType[] = data.items as YtRecipeType[];
  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {recipes.map((recipe) => {
        const recipeYtId = recipe.id.split(":")[2];
        // récupérer allRecipesInDb.id de l'objet qui correspond à allRecipesInDb.ytId= recipeYtId
        const recipeInDb = allRecipesInDb.find(
          (recipe) => recipe.ytId === recipeYtId
        );
        const recipeIdInDb = recipeInDb ? recipeInDb.id : null;

        const existsInDb = allRecipesInDb.some(
          (recipe) => recipe.ytId === recipeYtId
        );
        return (
          <YtRecipeCard
            key={recipe.id}
            recipe={recipe}
            isLogged={isLogged}
            recipeIdInDb={recipeIdInDb}
          />
        );
      })}
    </div>
  );
}
