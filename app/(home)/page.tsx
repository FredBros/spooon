import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Post from "@/src/feature/post/Post";
import { getLatestPosts } from "@/src/query/post.query";
import { late } from "zod";


export default async function Home() {
  const session = await getAuthSession();
  const posts = await getLatestPosts(session?.user.id)
  const latestRecipes = await getLatestPosts(session?.user.id);


console.log("latest recipes:", latestRecipes)
  return (
    <div className="divide-y divide-muted">
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}
