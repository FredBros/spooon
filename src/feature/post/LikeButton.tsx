"use client";

import { Loader } from "@/components/ui/loader";
import clsx from "clsx";
import { Heart } from "lucide-react";
import { useTransition } from "react";


type LikeButtonProps = {
  itemId: string;
  isLiked: boolean;
  likeAction: (itemId: string) => Promise<void>;
};


export default function LikeButton({ itemId, isLiked, likeAction }: LikeButtonProps) {
  const [isPending, startTransition] = useTransition();
  return (
    <div>
      <button
        className={clsx("rounded-md hover:bg-accent flex gap-1 items-center", {
          "text-red-500": isLiked,
        })}
        onClick={() => startTransition(() => likeAction(itemId))}
      >
        {isPending ? <Loader size={20} /> : <Heart size={20} />}
      </button>
    </div>
  );
}
