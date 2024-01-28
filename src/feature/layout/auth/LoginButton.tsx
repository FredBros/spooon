'use client'
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';
import { LogIn } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useTransition } from 'react';

const LoginButton = () => {
    const handleLogin: () => void = () => {
        startTransition(() => signIn())
    };
    const[isPending, startTransition] = useTransition()

    return (
      <Button onClick={handleLogin}>
        {isPending ? (
          <Loader className="m-2 h-4 w-4"/>
        ) : (
          <LogIn className="m-2 h-4 w-4" />
          )}
        Login
     </Button>
    );
};

export default LoginButton
