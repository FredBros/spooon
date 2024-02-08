import { getAuthSession } from '@/lib/auth'
import UniqueAlertDialog from '@/src/feature/recipe/UniqueAlertDialog'
import { getRecipeView } from '@/src/query/recipe.query'
import { notFound } from 'next/navigation'
import React from 'react'

export default async function RecipeView({params}: {params: {recipeId: string}}) {
    const session= await getAuthSession()
    const recipe = await getRecipeView(params.recipeId, session?.user.id)

    if (!recipe) {
        notFound()
    }
  return <div>RecipeView</div>;
}
