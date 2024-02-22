import { PostHome } from "@/src/query/post.query";
import React from "react";
import PostLayout from "./PostLayout";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";
import LikeButton from "../components/likes/LikeButton";
import { getAuthSession } from "@/lib/auth";
import HovercardSignIn from "@/components/ui/featured/HovercardSignIn";
import { likeAction } from "../components/likes/like.action";

type PostProps = {
  post: PostHome;
};

const Post = async ({ post }: PostProps) => {
  const session = await getAuthSession();
  return (
    <PostLayout user={post.user} postId={post.id} createdAt={post.createdAt}>
      <Link href={`/posts/${post.id}`} className="text-sm text-foreground">
        {post.content}
      </Link>
      <div className="flex gap-2 items-center">
        {session ? (
          <LikeButton
            itemId={post.id}
            isLiked={post.likes.length > 0}
            likeAction={likeAction}
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
            href={`/posts/${post.id}/reply`}
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
};

export default Post;
