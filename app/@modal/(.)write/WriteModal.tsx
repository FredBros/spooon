"use client";

import WritePostForm, { WritePostFormValues } from "@/app/write/WritePostForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { User } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";

const WriteModal = ({
  user,
  path,
  createPost,
}: {
  user: User;
  path: string;
  createPost: (values: WritePostFormValues) => Promise<string>;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Dialog
      open={pathname?.includes(path)}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent>
        <WritePostForm user={user} onSubmit={createPost} pathname={pathname} />
      </DialogContent>
    </Dialog>
  );
};

export default WriteModal;
