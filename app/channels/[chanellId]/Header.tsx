import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { countLikesRecipesForChannel, getChannelDetails } from "@/src/query/channel.query";
import { getYTChannelDetails } from '@/src/utils/youtubeUtils'
import clsx from 'clsx'
import React from 'react'
import { likeChannelAction } from '@/src/feature/components/likes/like.channel.action';
import LikeButton from '@/src/feature/components/likes/LikeButton';
import HovercardSignIn from '@/components/ui/featured/HovercardSignIn';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

export default async function Header({ channelId, className, userId }: { channelId: string, className?: string, userId?: string}) {
  const ytChannelDetails = await getYTChannelDetails(channelId);
  const channelDetails = await getChannelDetails(channelId, userId);
  const totalLikes = await countLikesRecipesForChannel(channelId);
  console.log(totalLikes)

  return (
    <div
      className={clsx(
        className,
        "flex w-full flex-col items-center content-center align-baseline justify-center gap-4 my-4"
      )}
    >
      <a
        href={`https://www.youtube.com/${ytChannelDetails?.customUrl}`}
        target="_blank"
      >
        <div className="flex w-full flex-row items-center content-center align-baseline justify-center gap-4 my-4">
          <Avatar size="lg">
            {ytChannelDetails?.thumbnails?.default?.url ? (
              <AvatarImage
                src={ytChannelDetails.thumbnails.default.url}
                alt={
                  ytChannelDetails.title ?? "pas de titre de channel disponible"
                }
              />
            ) : null}
            <AvatarFallback>
              {ytChannelDetails?.title?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p className="text-xl text-card-foreground sm:text-3xl">
            {ytChannelDetails?.title}
          </p>
        </div>
      </a>
      <div className="flex items-center justify-center w-full gap-2">
        {userId ? (
          <LikeButton
            itemId={channelDetails.id}
            isLiked={channelDetails.likesChannel.length > 0}
            likeAction={likeChannelAction}
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

        <p className="text-muted-foreground text-sm">
          {channelDetails._count.likesChannel} likes
        </p>
        <p className="text-muted-foreground"> · </p>
        <p className="text-muted-foreground text-sm">
          {channelDetails._count.recipes} recettes
        </p>
        <p className="text-muted-foreground"> · </p>
        <p className="text-muted-foreground text-sm">
          {totalLikes} likes recettes
        </p>
      </div>
    </div>
  );
}
