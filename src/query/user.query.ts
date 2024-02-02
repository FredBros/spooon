import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { postSelectQuery } from "./post.query"
import { cache } from "react"

const userQuery = {
    id: true,
    name: true,
    username: true,
    image: true,
    createdAt: true,
    bio: true,
    link: true,
    email: true,
}satisfies Prisma.UserSelect

// export const revalidate = 0;
// export const dynamic = "force-dynamic";
// export const fetchCache = "force-no-store";

export const getUser=async()=>{
    const session = await getAuthSession()

    if (!session?.user.id){
throw new Error("User not found")
    }

    const user= await prisma.user.findUniqueOrThrow({
        where:{
            id:session.user.id
        },
    })
    return user
}

export const getUserProfile = cache(async (userId: string) => {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
            {
                username: userId,
            },
            {
                id: userId,
            },
        ]
      },
      select: {
        ...userQuery,
        _count: {
          select: {
            followers: true,
            likes: true,
            followings: true,
            posts: true,
          },
        },
        posts: {
          select:
            postSelectQuery(userId),
            take: 10,
            orderBy: {
              createdAt: "desc",
            },
        },
        followers: {
            select: {
                follower: {
                    select: {
                        id: true,
                        image: true,
                        username: true,
                    },
                },
            },
            take: 3,
            orderBy: {
                createdAt: "desc",
            },
        },
        followings: {
            select: {
                following: {
                    select: {
                        id: true,
                        image: true,
                        username: true,
                    },
                },
            },
            take: 3,
            orderBy: {
                createdAt: "desc",
            },
        },
      },
    });
    return user})

export const getUserEdit = async () => {
    const session= await getAuthSession()
    if (!session?.user.id){
        throw new Error("User not found")
    }
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: session.user.id,
        },
        select: userQuery,
    });
    return user
}
export type UserEdit = NonNullable<Prisma.PromiseReturnType<typeof getUserEdit>>
export type UserProfile=NonNullable<Prisma.PromiseReturnType<typeof getUserProfile>>