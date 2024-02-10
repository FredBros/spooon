"use server"
import { getUser } from "@/src/query/user.query";
import { prisma } from "@/lib/prisma";
import { WritePostFormValues } from "@/app/write/WritePostForm";
import { revalidatePath } from "next/cache";

export const createComment = async (recipeId: string, value: WritePostFormValues) => {
const user= await getUser()
const comment = await prisma.comment.create({
data: {
userId: user.id,
content: value.content,
recipeId: recipeId
}
})
revalidatePath(`/recipes/${recipeId}`)
return recipeId
}
