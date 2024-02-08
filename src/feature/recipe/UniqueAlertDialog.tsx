'use client'
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

export default function UniqueAlertDialog({ recipeId }: { recipeId: string}) {
  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Recette déja existante</AlertDialogTitle>
          <AlertDialogDescription>
            Cette recette est déja dans notre base de donnée. Voulez-vous la
            consulter ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <Link href={`recipes/${recipeId}`}>Oui</Link>
          </AlertDialogAction>
          <AlertDialogCancel asChild>
            <Link href={"/"}>Non</Link>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
