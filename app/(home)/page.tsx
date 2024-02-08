import { getAuthSession } from "@/lib/auth";
import Post from "@/src/feature/post/Post";
import UniqueAlertDialog from "@/src/feature/recipe/UniqueAlertDialog";
import { getLatestPosts } from "@/src/query/post.query";


export default async function Home() {
  const session = await getAuthSession();
  const posts = await getLatestPosts(session?.user.id)
  const latestRecipes = await getLatestPosts(session?.user.id);


console.log("latest recipes:", latestRecipes)
  return (
    <div className="divide-y divide-muted">
      <UniqueAlertDialog recipeId={"test"} />
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}
