"use client";

import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef, type ElementType, type ReactNode } from "react";

type GlassCardProps<T extends ElementType = "div"> = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  as?: T;
} & ComponentPropsWithoutRef<T>;

export function GlassCard<T extends ElementType = "div">({
  children,
  className,
  hover = true,
  as,
  ...rest
}: GlassCardProps<T>) {
  const Tag = as ?? "div";

  return (
    <Tag
      className={cn(
        "glass rounded-2xl p-6 transition-all duration-300",
        hover &&
          "hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:border-white/20",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
