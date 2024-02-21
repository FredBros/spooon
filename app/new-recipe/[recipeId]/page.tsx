import { getUser } from "@/src/query/user.query";
import React from "react";
import CreateRecipeForm from "../CreateRecipeForm";



export default async function NewRecipeWithId({params}: {params: {recipeId: string}}) {
  const user = await getUser();
  const videoUrl= `https://www.youtube.com/watch?v=${params.recipeId}`
  return (
    <div>
      <CreateRecipeForm user={user} videoUrl={videoUrl}/>
    </div>
  );
}
