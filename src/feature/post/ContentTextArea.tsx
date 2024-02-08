"use client";

import clsx from "clsx";
import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  forwardRef,
  useRef,
} from "react";

export const ContentTextArea = forwardRef<
  HTMLTextAreaElement,
  ComponentPropsWithoutRef<"textarea">
>(({ onChange, className, rows = 1, ...props }, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight + 2}px`;
    }
  };

  return (
    <textarea
      ref={ref}
      onChange={(e) => {
        handleChange(e);
        onChange?.(e);
      }}
      rows={rows}
      className={clsx(
        className,
        "resize-none w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50e"
      )}
      {...props}
    />
  );
});

ContentTextArea.displayName = "ContentTextArea";
