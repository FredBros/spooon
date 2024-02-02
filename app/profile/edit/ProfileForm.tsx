"use client";
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
import { Input } from "@/components/ui/input";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import router from "next/router";
import { z } from "zod";
import { UserEdit } from "@/src/query/user.query";
import { Textarea } from "@/components/ui/textarea";

const Formschema = z.object({
  name: z
    .string()
    .min(1, "Please enter some content")
    .max(50, "Content is too long"),
  bio: z.string().max(500, "Content is too long"),
  username: z
    .string()
    .min(1, "Please enter some content")
    .max(50, "Content is too long"),
  link: z
    .string()
    .max(50, "Content is too long")
    .regex(/^(https?:\/\/)?([\w-]+\.)?\w{0,6}(\/[\w \.-]*)*\/?(\?\w+=\w+)?$/, {
      message: "Please enter a valid URL",
    }),
});

export type ProfileFormType = z.infer<typeof Formschema>;
type ProfileFormProps = {
  user: UserEdit;
  onSubmit: (values: ProfileFormType) => Promise<string>;
};

export const ProfileForm = ({ user, onSubmit }: ProfileFormProps) => {

  const form = useZodForm({
    schema: Formschema,
    defaultValues: {
      name: user.name ?? "",
      bio: user.bio ?? "",
      username: user.username,
      link: user.link ?? "",
    },
  });
  const router = useRouter();
  return (
    <Form
      className="space-y-4"
      form={form}
      onSubmit={async (values) => {
        const url = await onSubmit(values);
        if (url) {
          router.push(url);
          router.refresh();
        }
      }}
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="bio"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bio</FormLabel>
            <FormControl>
              <Textarea placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="link"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Link</FormLabel>
            <FormControl>
              <Input placeholder="http://..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex w-full justify-end">
        <Button size="sm">Post</Button>
      </div>
    </Form>
  );
};
