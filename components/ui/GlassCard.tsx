"use client";

import { cn } from "@/lib/utils";
import { type ElementType, type ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  as?: ElementType;
}

export function GlassCard({
  children,
  className,
  hover = true,
  as: Tag = "div",
}: GlassCardProps) {
  return (
    <Tag
      className={cn(
        "glass rounded-2xl p-6 transition-all duration-300",
        hover &&
          "hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:border-white/20",
        className
      )}
    >
      {children}
    </Tag>
  );
}
