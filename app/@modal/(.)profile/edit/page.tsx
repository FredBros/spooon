import { editProfile } from "@/app/profile/edit/edit-profile.action";
import { getUserEdit } from "@/src/query/user.query";
import React from "react";
import EditProfileModal from "./EditProfileModal";

export default async function editPage() {
  const user = await getUserEdit();

  return (
    // <div className="h-full container flex items-center">
    //   <div className="bg-card border rounded-md border-border p-4 flex-1">
    //     <ProfileForm user={user} onSubmit={editProfile} />
    //   </div>
    // </div>
    <EditProfileModal user={user} editProfile={editProfile} />
  );
}
