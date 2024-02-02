import { PostHome } from '@/src/query/post.query'
import React from 'react'
import PostLayout from './PostLayout'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { Heart, MessageCircle } from 'lucide-react'

type PostProps = {
  post:PostHome}

const Post = ({post}: PostProps) => {
  return (
    <PostLayout user={post.user} postId={post.id} createdAt={post.createdAt}>
      <Link href={`/posts/${post.id}`} className="text-sm text-foreground">
        {post.content}
      </Link>
      <div className="flex gap-2 items-center">
        <Button size="icon" variant="ghost">
          <Heart size={20} />
        </Button>
        <Link
          className={buttonVariants({ variant: "ghost", size: "icon" })}
          href={`/posts/${post.id}/reply`}
        >
          <MessageCircle size={20} />
        </Link>
      </div>
      <div className="flex gap-2 items-center">
        <Link
          href={`/posts/${post.id}`}
          className="text-muted-foreground text-sm"
        >
          {post._count.likes} likes
        </Link>
        <p className="text-muted-foreground"> · </p>
        <Link
          href={`/posts/${post.id}`}
          className="text-muted-foreground text-sm"
        >
          {post._count.replies} comments
        </Link>
      </div>
    </PostLayout>
  );
}

export default Post