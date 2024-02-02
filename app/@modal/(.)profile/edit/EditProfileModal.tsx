"use client";
import { ProfileForm, ProfileFormType } from "@/app/profile/edit/ProfileForm";
import WritePostForm from "@/app/write/WritePostForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UserEdit } from "@/src/query/user.query";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { editProfile } from "@/app/profile/edit/edit-profile.action";

export default function EditProfileModal({
  user,
  editProfile,
}: {
  user: UserEdit;
  editProfile: (values: ProfileFormType) => Promise<string>;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Dialog
      open={pathname === "/profile/edit"}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent>
        <ProfileForm user={user} onSubmit={editProfile} />
      </DialogContent>
    </Dialog>
  );
}
