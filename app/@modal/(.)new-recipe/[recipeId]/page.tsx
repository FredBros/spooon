import { getUser } from "@/src/query/user.query";
import React from "react";
import CreateRecipeModal from "../CreateRecipeModal";

export default async function Page({ params }: { params: { recipeId: string } }) {
  const user = await getUser();
    const videoUrl = `https://www.youtube.com/watch?v=${params.recipeId}`;

  return (
    <div>
      <CreateRecipeModal user={user} path={"new-recipe"} videoUrl={videoUrl} />
    </div>
  );
}
