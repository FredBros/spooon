"use client";

import WritePostForm, { WritePostFormValues } from "@/app/write/WritePostForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { User } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";

const ReplyModal = ({
  user,
  createReply,
}: {
  user: User;
  createReply: (values: WritePostFormValues) => Promise<string>;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Dialog
      open={pathname === "/write"}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent>
        <WritePostForm user={user} onSubmit={createReply} pathname={"/reply"}/>
      </DialogContent>
    </Dialog>
  );
};

export default ReplyModal;
