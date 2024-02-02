"use client"; // Error components must be Client Components

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

    //display a toast
    toast.error("You have to be logged in to access this page.", {
      duration: 2000,
    });
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return null
  ;
}
