import { getAuthSession } from '@/lib/auth'
import { getUserProfile } from '@/src/query/user.query'
import React from 'react'
import Profile from './Profile'
import { notFound, redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { followUser } from './follow.action'
import Post from '@/src/feature/post/Post'
import { Metadata } from 'next'

// export const revalidate = 0;
// export const dynamic = "force-dynamic";
// export const fetchCache = "force-no-store";

export const generateMetadata = async ({ params }: PageParams): Promise<Metadata> => {
  const user = await getUserProfile("params.userId");
  if (!user) {
    throw new Error("User not found");
  }
  return {
    title: `${user.name}(${user.username})`,
  };
};

type PageParams = { params: { userId: string } };
export default async function UserPage({params}: {params: {userId: string}}) {
    const session = await getAuthSession()
    const user = await getUserProfile(params.userId)

    if (!user) {
        notFound()
    }
    const isFollowing = await prisma.follow.findFirst({
      where: {
        followerId: session?.user?.id,
        followingId: user.id,
      },
      select: {
        id: true,
      },
    });
    const isCurrentUser = session?.user?.id === params.userId;
    if (isCurrentUser) {
      redirect("/profile")
    }
  return (
    <div className="mt-4 container">
      <Profile user={user} />
      <form className="mt-4">
        <Button
          variant="outline"
          formAction={async () => {
            "use server";
            if (!session?.user?.id) {
              return;
            }
            await followUser(params.userId);
          }}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </form>
      <div className="divide-y divide-muted">
        {user.posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
}
