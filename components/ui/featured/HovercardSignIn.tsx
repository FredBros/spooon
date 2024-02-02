import { ReactNode } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function HovercardSignIn({ children, message }: { children: ReactNode, message: string }) {
  return (
    <HoverCard openDelay={0} >
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent>{message}</HoverCardContent>
    </HoverCard>
  );
}
