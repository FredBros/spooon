import React from "react";
import clsx from "clsx";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {PlaySquare } from "lucide-react";
import { Button } from "@/components/ui/button";

type WatchOnYTProps = {
  className?: string;
  videoId: string;
  size?: number;
};
export default function WatchOnYT({ className, videoId, size }: WatchOnYTProps) {
  return (
    <div className={clsx(className)}>
      <HoverCard openDelay={0}>
        <HoverCardTrigger>
          <a
            target="_blank"
            href={`http://www.youtube.com/watch?v=${videoId}`}
            className="ml-auto"
          >
            <Button variant="ghost" size="icon" className="rounded-md">
              <PlaySquare size={size || 20} />
            </Button>
          </a>
        </HoverCardTrigger>
        <HoverCardContent>Regarder sur Youtube</HoverCardContent>
      </HoverCard>
    </div>
  );
}
