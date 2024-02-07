import { getUser } from '@/src/query/user.query';
import React from 'react'
import CreateRecipeForm from './CreateRecipeForm';

export default async function NewRecipe() {
    const user= await getUser();
  return (
    <div>
      <CreateRecipeForm user={user} />
    </div>
  );
}
