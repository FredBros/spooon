'use client'
import CreateRecipeForm from '@/app/new-recipe/CreateRecipeForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { User } from '@prisma/client'
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

export default function CreateRecipeModal({user, path}:{user:User, path:string}) {
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
        <CreateRecipeForm user={user} />
      </DialogContent>
    </Dialog>
  );
}
