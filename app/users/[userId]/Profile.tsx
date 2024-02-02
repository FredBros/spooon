import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserProfile } from '@/src/query/user.query';
import Link from 'next/link';
import React, { PropsWithChildren } from 'react'

const removeHttp = (url: string) => {
  return url.replace(/(^\w+:|^)\/\//, '')
}
export default function Profile({ user, children }: PropsWithChildren<{ user: UserProfile }>) {

  return (
    <div >
      <div className="flex gap-2 items-start justify-between">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-2xl font-bold">{user.name}</h3>
          <p>{user.username}</p>
        </div>
        <Avatar size={'lg'}>
          {user.image ? (
            <AvatarImage src={user.image} alt={user.username} />
          ) : null}
          <AvatarFallback>
            {user.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      {user.bio ? (
          <p>{user.bio}</p>
      ) : (<p className='text-muted-foregground'>no bio</p>   ) }
      <div className='flex items-center gap-2 mt-4'>
        <div className='flex -space-x-2'>
            {user.followers.map((follower) => (
                <Avatar size="sm" className='border-2 border-background' key={follower.follower.id}>
                    {follower.follower.image ? (
                        <AvatarImage
                        src={follower.follower.image}
                        alt={follower.follower.username}
                        />
                    ) : null}
                    <AvatarFallback>
                        {follower.follower.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            ))}
        </div>
            <p className='text-muted-foreground'> · </p>
            <p className='text-muted-foreground'>{user._count.followers} followers</p>
            {user.link ? (
              <>
              <p className='text-muted-foreground'> · </p>
              <Link href={user.link} className='text-muted-foreground hover:underline'>
                {removeHttp(user.link)}
                </Link>
              </>
            ): null}
      </div>
      {children}
    </div>
  );
}
