"use client";

import { useState, useEffect } from "react";

export function StatusBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  const date = new Date().toLocaleDateString("zh-CN", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2.5">
        <div className="flex items-center gap-3 text-sm text-text-secondary">
          <span className="flex h-2.5 w-2.5 rounded-full bg-accent-purple animate-pulse" />
          <span className="font-medium text-text-primary">个人简历</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-text-tertiary">
          <span>{date}</span>
          <span className="text-text-secondary font-mono tabular-nums">{time}</span>
        </div>
      </div>
    </header>
  );
}
