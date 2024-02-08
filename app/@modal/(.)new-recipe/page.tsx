import { getUser } from '@/src/query/user.query';
import React from 'react'
import CreateRecipeModal from './CreateRecipeModal';

export default async function Page() {
    const user = await getUser();
  return (
    <div><CreateRecipeModal user={user} path={"new-recipe"}/></div>
  )
}
