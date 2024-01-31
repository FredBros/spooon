import React from 'react'
import WritePostForm from './WritePostForm'
import { getUser } from '@/src/query/user.query'
import { createPost } from './write-post.action';


const Write = async() => {
  const user = await getUser();
  return <WritePostForm user={user} onSubmit={createPost}/>;
};

export default Write;