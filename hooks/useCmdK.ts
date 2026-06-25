"use client";

import { useEffect } from "react";
import { useNavStore } from "@/store/navStore";

export function useCmdK() {
  const { cmdKOpen, setCmdKOpen } = useNavStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdKOpen(!cmdKOpen);
      }
      if (e.key === "Escape" && cmdKOpen) {
        setCmdKOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [cmdKOpen, setCmdKOpen]);
}
