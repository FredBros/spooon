import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/formatDate";
import { PostHome } from "@/src/query/post.query";
import clsx from "clsx";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import React, { PropsWithChildren } from "react";
import CommentFooter from "./CommentFooter";
import { CommentType } from "@/src/query/recipe.query";

type PostLayoutProps = PropsWithChildren<{
  user: PostHome["user"];
  postId?: string;
  createdAt?: Date;
  className?: string;
  recipeId: string;
  comment: CommentType;
}>;

const CommentLayout = ({
  className,
  user,
  createdAt,
  postId,
  children,
  recipeId,
  comment,
}: PostLayoutProps) => {
  return (
    <div className={clsx("flex w-full flex-row items-start p-4", className)}>
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
                {formatDate(createdAt)}
              </p>
            ) : null}
          </div>
        </Link>
        {children}
        <CommentFooter recipeId={recipeId} comment={comment} />
      </div>
    </div>
  );
};

export default CommentLayout;
