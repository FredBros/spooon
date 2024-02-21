import { rssToJson } from "@/src/utils/rssToJson";
import YtRecipeCard from "./YtRecipeCard";


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
  const recipes: YtRecipeType[] = data.items as YtRecipeType[];

  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {recipes.map((recipe) => (
        <YtRecipeCard key={recipe.id} recipe={recipe} isLogged={isLogged}/>
      ))}
    </div>
  );
}
