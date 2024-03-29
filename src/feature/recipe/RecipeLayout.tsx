import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import React, { PropsWithChildren } from "react";

type RecipeLayoutProps = PropsWithChildren<{
  channelTitle?: string | null;
  channelthumbnail?: string;
  channelId: string;
  title: string;
  recipeId?: string;
  ytCreatedAt?: Date;
  createdAt?: Date;
  className?: string;
}>;

export default function RecipeLayout({
  className,
  channelTitle,
  channelId,
  channelthumbnail,
  title,
  ytCreatedAt,
  recipeId,
  children,
}: RecipeLayoutProps) {
  return (
    <div className={clsx("flex w-full flex-row items-start p-4", className)}>
      <Avatar>
        {channelthumbnail ? (
          <AvatarImage src={channelthumbnail} alt={channelTitle??"pas de titre de channel disponible"} />
        ) : null}
        <AvatarFallback>
          {channelTitle?.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="ml-4 flex w-full flex-col gap-2">
        <Link href={`/channels/${channelId}`}>
          <div className="flex flex-row items-center gap-2">
            <p className="text-sm text-card-foreground mr-auto">
              {channelTitle}
            </p>
            {ytCreatedAt ? (
              <p className="text-sm text-muted-foreground">
                {ytCreatedAt.toLocaleString()}
              </p>
            ) : null}
          </div>
        </Link>
        {children}
      </div>
    </div>
  );
}
