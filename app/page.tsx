"use client";

import { useNavStore } from "@/store/navStore";
import { DesktopIcon } from "@/components/ui/DesktopIcon";
import { CabinWindow } from "@/components/ui/CabinWindow";
import { StudyCabin } from "@/components/cabins/StudyCabin";
import { MemoryCabin } from "@/components/cabins/MemoryCabin";
import { CreateCabin } from "@/components/cabins/CreateCabin";
import { LifeCabin } from "@/components/cabins/LifeCabin";
import { BookOpen, Brain, Palette, Heart } from "lucide-react";

const CABINS = [
  { id: "study", label: "学习舱", icon: BookOpen, emoji: "📚" },
  { id: "memory", label: "记忆舱", icon: Brain, emoji: "🧠" },
  { id: "create", label: "创造舱", icon: Palette, emoji: "🎨" },
  { id: "life", label: "生活舱", icon: Heart, emoji: "💛" },
] as const;

const CABIN_CONTENT: Record<string, React.ComponentType> = {
  study: StudyCabin,
  memory: MemoryCabin,
  create: CreateCabin,
  life: LifeCabin,
};

export default function Page() {
  const { activeSection, setActiveSection } = useNavStore();

  return (
    <div className="min-h-[calc(100vh-3rem)]">
      {/* Desktop area — shortcut icons */}
      <div className="flex flex-wrap gap-2 p-8 pt-6">
        {CABINS.map((cabin) => (
          <DesktopIcon
            key={cabin.id}
            id={cabin.id}
            label={cabin.label}
            icon={cabin.icon}
            onClick={setActiveSection}
          />
        ))}
      </div>

      {/* Cabin windows */}
      {CABINS.map((cabin) => {
        const Content = CABIN_CONTENT[cabin.id];
        return (
          <CabinWindow
            key={cabin.id}
            open={activeSection === cabin.id}
            onClose={() => setActiveSection(cabin.id)}
            title={cabin.label}
            emoji={cabin.emoji}
          >
            <Content />
          </CabinWindow>
        );
      })}

      {/* Empty state — when no cabin is open */}
      {!activeSection && (
        <div className="flex flex-col items-center justify-center pt-32 text-center">
          <p className="text-6xl mb-6">🚀</p>
          <h1 className="text-2xl font-semibold text-text-primary mb-2">
            Space OS
          </h1>
          <p className="text-text-tertiary text-sm max-w-sm">
            点击桌面图标或底部 Dock 打开一个舱位
          </p>
        </div>
      )}
    </div>
  );
}
