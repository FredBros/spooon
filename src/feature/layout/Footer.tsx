import { Button, buttonVariants } from "@/components/ui/button";
import HovercardSignIn from "@/components/ui/featured/HovercardSignIn";
import { getAuthSession } from "@/lib/auth";
import clsx from "clsx";
import { Home, PenSquare, User } from "lucide-react";
import Link from "next/link";

export const Footer = async() => {
  const session = await getAuthSession();
  return (
    <div className="py-2 container  fixed bottom-0 left-0 right-0 bg-background max-w-5xl m-auto border-t border-accent">
      <div className="flex justify-between container gap-1 max-w-lg m-auto">
        <Link
          href="/"
          className={clsx(buttonVariants({ variant: "outline" }), "flex-1")}
        >
          <Home size={16} />
        </Link>

        {session ? (
          <Link
            href="/write"
            className={clsx(buttonVariants({ variant: "outline" }), "flex-1")}
          >
            <PenSquare size={16} />
          </Link>
        ) : (
          <div className="flex-1">
            <HovercardSignIn message="Please log in to post">
              <Button
                variant="outline"
                disabled
                className="rounded-md hover:bg-accent flex gap-1 items-center w-full"
              >
                <PenSquare size={16} />
              </Button>
            </HovercardSignIn>
          </div>
        )}

        {session ? (
          <Link
            href="/profile"
            className={clsx(buttonVariants({ variant: "outline" }), "flex-1")}
          >
            <User size={16} />
          </Link>
        ) : (
          <div className="flex-1">
            <HovercardSignIn message="Please log in to edit your profile">
              <Button variant="outline" disabled className="w-full">
                <User size={16} />
              </Button>
            </HovercardSignIn>
          </div>
        )}
      </div>
    </div>
  );
};
