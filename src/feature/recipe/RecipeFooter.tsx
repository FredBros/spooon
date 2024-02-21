'use server'
import { RecipeHome } from "@/src/query/recipe.query";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Heart, MessageCircle, Watch, Youtube } from "lucide-react";
import LikeButton from "../post/LikeButton";
import { getAuthSession } from "@/lib/auth";
import HovercardSignIn from "@/components/ui/featured/HovercardSignIn";
import { likeRecipeAction } from "./LikeRecipe.action";
import { Rating } from "@smastrom/react-rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import WatchOnYT from "../components/WatchOnYT";

type RecipeProps = {
  recipe: RecipeHome;
};
export default async function RecipeFooter({ recipe }: RecipeProps) {
  const session = await getAuthSession();
  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-2 items-center">
            {session ? (
              <LikeButton
                itemId={recipe.id}
                isLiked={recipe.likesRecipe.length > 0}
                likeAction={likeRecipeAction}
              />
            ) : (
              <HovercardSignIn message="Please log in to like">
                <Button
                  variant="ghost"
                  disabled
                  className="rounded-md hover:bg-accent flex gap-1 items-center"
                  size="icon"
                >
                  <Heart size={20} />
                </Button>
              </HovercardSignIn>
            )}
            {session ? (
              <Link
                className={buttonVariants({ variant: "ghost", size: "icon" })}
                href={`/recipes/${recipe.id}/comment`}
              >
                <MessageCircle size={20} />
              </Link>
            ) : (
              <HovercardSignIn message="Please log in to reply">
                <Button
                  variant="ghost"
                  disabled
                  className="rounded-md hover:bg-accent flex gap-1 items-center"
                  size="icon"
                >
                  <MessageCircle size={20} />
                </Button>
              </HovercardSignIn>
            )}
            <Rating
              style={{ maxWidth: 100 }}
              value={recipe.rating || 0}
              readOnly={true}
            />
          </div>
          <WatchOnYT videoId={recipe.ytId} size={20} />
        </div>
        <div className="flex gap-2 items-center">
          <Link
            href={`/recipes/${recipe.id}`}
            className="text-muted-foreground text-sm"
          >
            {recipe._count.likesRecipe} likes
          </Link>
          <p className="text-muted-foreground"> · </p>
          <Link
            href={`/recipes/${recipe.id}`}
            className="text-muted-foreground text-sm"
          >
            {recipe._count.comments} comments
          </Link>
        </div>
        <Link href={`/profile/${recipe.user.id}`}>
          <div className="text-sm text-card-foreground mr-auto flex gap-2 items-center">
            <p> proposé par </p>
            <Avatar size="sm">
              {recipe.user.image ? (
                <AvatarImage
                  src={recipe.user.image}
                  alt={
                    recipe.user.username ?? "pas de titre de channel disponible"
                  }
                />
              ) : null}
              <AvatarFallback>
                {recipe.user.username?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>{" "}
            <p>{recipe.user.username}</p>
          </div>
        </Link>
      </div>
    </>
  );
}
