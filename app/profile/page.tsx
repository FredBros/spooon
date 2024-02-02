import { getAuthSession } from '@/lib/auth'
import { getUserProfile } from '@/src/query/user.query'
import { notFound } from 'next/navigation'
import React from 'react'
import Profile from '../users/[userId]/Profile'
import { Button, buttonVariants } from '@/components/ui/button'
import { followUser } from '../users/[userId]/follow.action'
import Post from '@/src/feature/post/Post'
import Link from 'next/link'

export default async function ProfilePage() {
    const session = await getAuthSession()
    if (!session?.user.id) {
        notFound()
    }
    const user = await getUserProfile(session.user.id)
    if (!user) {
        notFound()
    }
  return (
    <div className="mt-4 container">
      <Profile user={user} />
      <form className="mt-4">
        <Link
          href="/profile/edit"
          className={buttonVariants({ variant: "outline" })}
        >
          Edit Profile
        </Link>
      </form>
      <div className="divide-y divide-muted">
        {user.posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
}
