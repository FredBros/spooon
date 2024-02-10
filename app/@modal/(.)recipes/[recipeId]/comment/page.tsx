import { getUser } from "@/src/query/user.query";
import WriteModal from "@/app/@modal/(.)write/WriteModal";
import { createComment } from "@/app/recipes/[recipeId]/comment/write-comment.action";


export default async function pageCommentRecipe({params}: {params: {recipeId: string}}) {
  const user = await getUser();

  return (
    <div>
      <WriteModal user={user} path={"comment"} createPost={async(values) => {
        'use server'
        const reply =  await createComment(params.recipeId, values);
        return reply;
      }} />
    </div>
  )
}
