import React from 'react'
import WriteModal from './WriteModal';
import { createPost } from '@/app/write/write-post.action';
import { getUser } from '@/src/query/user.query';

const Page = async() => {
    const user= await getUser();
  return (
    <div>
        <WriteModal user={user} path={"write"}createPost={createPost}/>
    </div>
  )
}

export default Page