import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import React from 'react'
import { CommentType } from '@/src/query/recipe.query'
import PostLayout from '../post/PostLayout';
import { getAuthSession } from '@/lib/auth';
import LikeButton from '../post/LikeButton';
import { likeCommentAction } from './likeComment.action';
import HovercardSignIn from '@/components/ui/featured/HovercardSignIn';
import { Button, buttonVariants } from '@/components/ui/button';
import { Heart, MessageCircle } from 'lucide-react';
import Link from 'next/link';


type CommentProps = {
  recipeId: string;
  comment: CommentType;
};


export default async function Comment({ comment, recipeId }: CommentProps) {
  const session = await getAuthSession();
  return (
    <PostLayout
      user={comment.user}
      createdAt={comment.createdAt}
      postId={comment.id}
    >
      <div className="text-sm text-foreground">{comment.content}</div>
      <div className="flex gap-2 items-center">
        {session ? (
          <LikeButton
            itemId={comment.id}
            isLiked={comment.likesComment.length > 0}
            likeAction={likeCommentAction}
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
            href={`/recipes/${recipeId}/${comment.id}/reply`}
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
      </div>
    </PostLayout>
  );
}
