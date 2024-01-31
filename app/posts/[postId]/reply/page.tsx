import WritePostForm from '@/app/write/WritePostForm'
import { createPost } from '@/app/write/write-post.action'
import Post from '@/src/feature/post/Post'
import { getPost } from '@/src/query/post.query'
import { getUser } from '@/src/query/user.query'
import { notFound } from 'next/navigation'
import React from 'react'
import { createReply } from './write-reply.action'

export default async function PostReply({params}: {params: {postId: string}}) {
    const user= await getUser()
    const post = await getPost(params.postId, user.id)
    if (!post) { 
      return notFound();
    }
    return (
      <div>
        <Post post={post} />
        <WritePostForm user={user} onSubmit={async (values) =>{
            'use server'
            return createReply(post.id, values)
        }} />
      </div>
    );}
