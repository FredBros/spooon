"use client"; // Error components must be Client Components

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Alert className="my-8">
      <AlertTriangle />
      <AlertTitle>Problème serveur</AlertTitle>
      <AlertDescription>
        Oooops, désolé, il y a eu un problème lors de l'enregistrement de la recette
      </AlertDescription>
      <Link className={buttonVariants({ variant: "link" })} href="/">
        Home
      </Link>
    </Alert>
  );
}
