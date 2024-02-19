import { getAuthSession } from "@/lib/auth";
import RecipeFooter from "@/src/feature/recipe/RecipeFooter";
import RecipeHeader from "@/src/feature/recipe/recipeHeader";
import { getRecipeView } from "@/src/query/recipe.query";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import YoutubeEmbed from "@/src/feature/components/YoutubeEmbed";
import Comment from "@/src/feature/comments/Comment";
import { RecipeView } from "@/src/query/recipe.query";
import CommentsSection from "@/src/feature/comments/CommentsSection";

export default async function RecipeView({
  params,
}: {
  params: { recipeId: string };
}) {
  const session = await getAuthSession();
  const recipe: RecipeView = await getRecipeView(
    params.recipeId,
    session?.user.id
  );
  if (!recipe) {
    notFound();
  }
  console.log("---------------------")
  console.log(recipe.id)
  console.log(recipe.comments)
  return (
    <div className="max-w-lg mx-auto mt-4 px-2 flex flex-col gap-4">
      <RecipeHeader
        channelId={recipe.id}
        channelTitle={recipe.ytChannelTitle}
        channelThumbnail={recipe.ytChannelThumbnail}
        title={recipe.title}
        ytPublishedAt={recipe.ytPublishedAt}
        recipeId={recipe.id}
      />
      <div>
        <YoutubeEmbed id={recipe.ytId} title={recipe.title} />
      </div>
      <RecipeFooter recipe={recipe} />
      {recipe.description && (
        <div className="mt-4 w-full">
          <h2 className="text-xl font-bold">Description</h2>
          <div className="mt-2 whitespace-pre-line">{recipe.description}</div>
        </div>
      )}
      <ScrollArea className="h-72 rounded-md border w-4/5 whitespace-pre-line mx-auto">
        <div className="p-4">{recipe.ytDescription}</div>
      </ScrollArea>
      <div>
<CommentsSection comments={recipe.comments} recipeId={recipe.id}/>
      </div>
    </div>
  );
}
