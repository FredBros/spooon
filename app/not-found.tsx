import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { buttonVariants } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export default function NotFound() {
  return (
    <Alert className="my-8">
      <AlertTriangle />
      <AlertTitle>Not found</AlertTitle>
      <AlertDescription>
        Post not found
      </AlertDescription>
      <Link className={buttonVariants({variant : "link"})} href="/">
        Home
      </Link>
    </Alert>
  );
}
