import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import React from "react";
import { CommentType } from "@/src/query/recipe.query";
import { getAuthSession } from "@/lib/auth";
import LikeButton from "../components/likes/LikeButton";
import { likeCommentAction } from "../components/likes/likeComment.action";
import HovercardSignIn from "@/components/ui/featured/HovercardSignIn";
import { Button, buttonVariants } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import CommentLayout from "./CommentLayout";

type CommentProps = {
  recipeId: string;
  comment: CommentType;
};

export default async function Comment({ comment, recipeId }: CommentProps) {
  const session = await getAuthSession();
  return (
    <CommentLayout
      user={comment.user}
      createdAt={comment.createdAt}
      postId={comment.id}
      recipeId={recipeId}
      comment={comment}
    >
      <div className="text-sm text-foreground">{comment.content}</div>
    </CommentLayout>
  );
}
