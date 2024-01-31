import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Post from "@/src/feature/post/Post";
import { getLatestPosts } from "@/src/query/post.query";
import React from "react";

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Home() {
  // const session = await getAuthSession();
  const posts = await getLatestPosts()

  return <div className="divide-y divide-muted">
    {posts.map((post) => 
      (
      <Post post={post} key={post.id}/>
      )
    )} 
  </div>;
}
