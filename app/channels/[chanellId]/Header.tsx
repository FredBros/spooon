import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getChannelData } from '@/src/query/channel.query';
import { getYTChannelDetails } from '@/src/utils/youtubeUtils'
import clsx from 'clsx'
import React from 'react'

export default async function Header({ channelId, className, userId }: { channelId: string, className?: string, userId?: string}) {
  const ytChannelDetails = await getYTChannelDetails(channelId);
  const channelData = await getChannelData(channelId, userId);
  console.log(channelId, channelData);
  return (
    <div className={clsx(className)}>
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
    </div>
  );
}
