"use client";

import { type LucideIcon } from "lucide-react";

interface DesktopIconProps {
  id: string;
  label: string;
  icon: LucideIcon;
  onClick: (id: string) => void;
}

export function DesktopIcon({ id, label, icon: Icon, onClick }: DesktopIconProps) {
  return (
    <button
      onClick={() => onClick(id)}
      className="flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-200 hover:bg-white/5 group"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl glass group-hover:glow-purple transition-all duration-300">
        <Icon className="h-7 w-7 text-text-secondary group-hover:text-accent-purple transition-colors" />
      </div>
      <span className="text-xs text-text-tertiary group-hover:text-text-secondary transition-colors text-center leading-tight max-w-[80px]">
        {label}
      </span>
    </button>
  );
}
