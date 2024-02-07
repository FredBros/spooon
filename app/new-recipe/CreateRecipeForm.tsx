"use client";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { ContentTextArea } from "@/src/feature/post/ContentTextArea";
import { User } from "@prisma/client";
import { createRecipe } from "./create-recipe.action";
import { useRouter } from "next/navigation";

const Schema = z.object({
  url: z
    .string()
    .url()
    .includes("youtube.com", { message: "Must be a YouTube URL" }),
  description: z.string(),
});

export type CreateRecipeFormValues = z.infer<typeof Schema>;

type CreateRecipeFormProps = {
  user: User}

export default function CreateRecipeForm({ user }: CreateRecipeFormProps) {
  const form = useZodForm({ schema: Schema });
  const router = useRouter();
  return (<div>
    <Form form={form} onSubmit={async (values) => {
      const recipeId = await createRecipe({ ...values });
      router.push(`/recipes/${recipeId}`);
      router.refresh();
    }}>
      <FormField control={form.control} name="url" render={({ field }) => (<FormItem>
          <input {...field} />
          <FormMessage />
        </FormItem>)} />
      <FormField control={form.control} name="description" render={({ field }) => (<FormItem>
          <ContentTextArea {...field} />
          <FormMessage />
        </FormItem>)} />
      <div className="flex w-full justify-end">
        <Button size="sm">Post</Button>
      </div>
    </Form>
  </div>);
}
