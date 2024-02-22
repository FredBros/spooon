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
import RecipeFooter from "@/src/feature/recipe/RecipeFooter";
import Link from "next/link";
import { YtRecipeType } from "./YtNewsTab";
import YoutubeEmbed from "@/src/feature/components/YoutubeEmbed";
import { ArrowRightSquare, Save } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import HovercardSignIn from "@/components/ui/featured/HovercardSignIn";
import { boolean } from "zod";

type YtRecipeCardProps = {
  recipe: YtRecipeType;
  isLogged: boolean;
  recipeIdInDb: string | null;
};

export default function YtRecipeCard({ recipe, isLogged, recipeIdInDb }: YtRecipeCardProps) {
  const id = recipe.id.split(":")[2];
  const publishedDate = new Date(parseInt(recipe.published));
  const formattedDate = publishedDate.toLocaleDateString();

  console.log("recipeIdInDb", recipeIdInDb);
  return (
    <Card className="max-w-80">
      <CardHeader className="p-2 pb-0 pl-6">
        <div className="flex w-full flex-row items-start justify-between ">
          {recipeIdInDb ? (
            <Button asChild variant="ghost" disabled size="icon">
              <Link href={`/recipes/${recipeIdInDb}`}>
              <ArrowRightSquare size={20} />
              </Link>
            </Button>
          ) : isLogged ? (
            <Button asChild variant="ghost" disabled size="icon">
              <Link href={`/new-recipe/${id}`}>
                <Save size={20} />
              </Link>
            </Button>
          ) : (
            <HovercardSignIn message="Please log in to save">
              <Button variant="ghost" disabled size="icon">
                <Save size={20} />
              </Button>
            </HovercardSignIn>
          )}

          <p className="text-sm text-muted-foreground mt-0">{formattedDate}</p>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <CardTitle className="mb-3">{recipe.title}</CardTitle>
        <YoutubeEmbed id={id} title={recipe.title} />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
