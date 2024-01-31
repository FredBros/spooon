import React from "react";
import { createPost } from "@/app/write/write-post.action";
import { getUser } from "@/src/query/user.query";
import WriteModal from "@/app/@modal/(.)write/WriteModal";
import { createReply } from "@/app/posts/[postId]/reply/write-reply.action";

const Page = async ({params} :{params :{postId: string}}) => {
  const user = await getUser();
  return (
    <div>
      <WriteModal user={user} path={"reply"} createPost={async(values) => {
        'use server'
        const reply = await createReply(params.postId, values)
        return reply
      }} />
    </div>
  );
};

export default Page;
