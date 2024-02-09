import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";

type RecipeHeaderProps = {
  channelTitle?: string | null;
  channelThumbnail?: string | null;
  channelId: string;
  title: string;
  recipeId?: string;
  ytPublishedAt?: Date|null
  className?: string;
};

export default function recipeHeader({
  className,
  channelTitle,
  channelId,
  channelThumbnail,
  title,
  ytPublishedAt,
  recipeId,
}: RecipeHeaderProps) {
  return (
    <div className={clsx("flex w-full flex-row items-start", className)}>
      <Avatar>
        {channelThumbnail ? (
          <AvatarImage
            src={channelThumbnail}
            alt={channelTitle ?? "pas de titre de channel disponible"}
          />
        ) : null}
        <AvatarFallback>
          {channelTitle?.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="ml-4  w-full ">
        <Link href={`/channels/${channelId}`}>
          <div className="flex flex-row items-center gap-2">
            <p className="text-sm text-card-foreground mr-auto">
              {channelTitle}
            </p>
            {ytPublishedAt ? (
              <p className="text-sm text-muted-foreground">
                {ytPublishedAt.toLocaleDateString()}
              </p>
            ) : null}
          </div>
        </Link>
      </div>
    </div>
  );
}
