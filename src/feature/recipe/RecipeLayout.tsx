import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import React, { PropsWithChildren } from "react";


type RecipeLayoutProps = PropsWithChildren<{
    user: User;
    recipeId?: string;
    createdAt?: Date;
    className?: string;
}>

export default function RecipeLayout({ className, user, createdAt, recipeId, children }: RecipeLayoutProps) {
  return (
    <div
      className={clsx("flex w-full flex-row items-start p-4", className)}
    >
        <Avatar>
            {user.image ? (
                <AvatarImage src={user.image} alt={user.username} />
            ) : null}
            <AvatarFallback>
                {user.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
        </Avatar>
        <div className="ml-4 flex w-full flex-col gap-2">
            <Link href={`/users/${user.id}`}>
                <div className="flex flex-row items-center gap-2">
                    <p className="text-sm text-card-foreground mr-auto">
                        {user.username}
                    </p>
                    {createdAt ? (
                        <p className="text-sm text-muted-foreground">
                            {createdAt.toLocaleString()}
                        </p>
                    ) : null}
                </div>
            </Link>
            {children}
    </div>
    </div>
  );
}
