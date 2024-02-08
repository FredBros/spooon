import { getAuthSession } from "@/lib/auth";
import Post from "@/src/feature/post/Post";
import { getLatestPosts } from "@/src/query/post.query";
import { getLatestRecipes } from "@/src/query/recipe.query";


export default async function Home() {
  const session = await getAuthSession();
  // const posts = await getLatestPosts(session?.user.id)
  const latestRecipes = await getLatestRecipes(session?.user.id);


console.log("latest recipes:", latestRecipes)
  return (
    // <div className="divide-y divide-muted">
    //   {posts.map((post) => (
    //     <Post post={post} key={post.id} />
    //   ))}
    // </div>
    <div>Hello world</div>
  );
}
