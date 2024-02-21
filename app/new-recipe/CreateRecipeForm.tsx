"use client";
import Error from "next/error";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { ContentTextArea } from "@/src/feature/post/ContentTextArea";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import RecipeLayout from "@/src/feature/recipe/RecipeLayout";
import { Input } from "@/components/ui/input";
import { createRecipe } from "./create-recipe.action";
import UniqueAlertDialog from "@/src/feature/recipe/UniqueAlertDialog";
import { useState } from "react";
import PostLayout from "@/src/feature/post/PostLayout";

var recipeId = "";
const Schema = z.object({
  url: z
    .string()
    .url()
    .includes("youtube.com" ||"tiktok.com", { message: "Must be a YouTube or a TikTok URL" }),
  description: z.string().max(500, "Description is too long").optional(),
});

export type CreateRecipeFormValues = z.infer<typeof Schema>;

type CreateRecipeFormProps = {
  user: User;
  videoUrl? : string;
};

export default function CreateRecipeForm({ user, videoUrl }: CreateRecipeFormProps) {
  const form = useZodForm({ schema: Schema });
  const router = useRouter();
  const [isUnique, setIsUnique] = useState(true);


  const onSubmit = async (values: CreateRecipeFormValues) => {
    const response = await createRecipe({ ...values });
    recipeId = response.recipeId;
    if (!response || response.status === "error")
      return <Error statusCode={500} />;
    if (response.status === "notUnique") {
      setIsUnique(false);
      return;
    }

    router.push(`/recipes/${response.recipeId}`);
    router.refresh();
  };
  return (
    <PostLayout user={user}>
      <Form className="w-2/3 space-y-6 mt-8" form={form} onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="url"
          defaultValue={videoUrl}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Url de la vidéo</FormLabel>
              <FormControl>
                <Input placeholder="http://....." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <ContentTextArea {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full justify-end">
          <Button size="sm">Post</Button>
        </div>
      </Form>
      {!isUnique && <UniqueAlertDialog recipeId={recipeId} />}
    </PostLayout>
  );
}
