import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RecipeHeader from "@/src/feature/recipe/recipeHeader";
import Image from "next/image";
import { RecipeHome } from "@/src/query/recipe.query";
import RecipeFooter from "./RecipeFooter";
import Link from "next/link";

type RecipeCardProps = {
  recipe: RecipeHome;
};


export default function RecipeCard({recipe}: RecipeCardProps) {
  return (
    <Card className="max-w-80">
      <CardHeader className="p-2">
        <RecipeHeader
          channelId={recipe.ytChannelId}
          channelTitle={recipe.ytChannelTitle}
          channelThumbnail={recipe.ytChannelThumbnail}
          title={recipe.title}
          ytPublishedAt={recipe.ytPublishedAt}
          recipeId={recipe.id}
        />
      </CardHeader>
      <CardContent className="pt-6">
        <Link href={`/recipes/${recipe.id}`}>
          <CardTitle className="mb-3">{recipe.title}</CardTitle>
          <Image
            className="rounded-lg border border-accent"
            src={recipe.ytThumbnail ?? "https://via.placeholder.com/500"}
            width={500}
            height={500}
            alt={`Vignette ${recipe.title}`}
          />
        </Link>
      </CardContent>
      <CardFooter>
        <RecipeFooter recipe={recipe} />
      </CardFooter>
    </Card>
  );
}
