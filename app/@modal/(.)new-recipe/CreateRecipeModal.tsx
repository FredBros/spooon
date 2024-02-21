'use client'
import CreateRecipeForm from '@/app/new-recipe/CreateRecipeForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { User } from '@prisma/client'
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

type CreateRecipeModalProps = {
  user: User;
  path: string;
  videoUrl?: string;

}

export default function CreateRecipeModal({user, path, videoUrl}: CreateRecipeModalProps) {
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
        <CreateRecipeForm user={user} videoUrl={videoUrl} />
      </DialogContent>
    </Dialog>
  );
}
