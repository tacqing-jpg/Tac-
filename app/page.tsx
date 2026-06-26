"use client";

import { useNavStore } from "@/store/navStore";
import { CabinWindow } from "@/components/ui/CabinWindow";
import { StudyCabin } from "@/components/cabins/StudyCabin";
import { MemoryCabin } from "@/components/cabins/MemoryCabin";
import { LifeCabin } from "@/components/cabins/LifeCabin";
import { AboutMeCabin } from "@/components/cabins/AboutMeCabin";
const CABINS = [
  { id: "study", label: "学习舱", emoji: "📚" },
  { id: "memory", label: "记忆舱", emoji: "🧠" },
  { id: "life", label: "生活舱", emoji: "💛" },
  { id: "aboutme", label: "关于我", emoji: "🪪" },
] as const;

const CABIN_CONTENT: Record<string, React.ComponentType> = {
  study: StudyCabin,
  memory: MemoryCabin,
  life: LifeCabin,
  aboutme: AboutMeCabin,
};

export default function Page() {
  const { activeSection, setActiveSection } = useNavStore();

  return (
    <div className="min-h-[calc(100vh-3rem)]">
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
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center">
          <h1 className="text-7xl font-bold text-text-primary mb-2">
            个人简历
          </h1>
        </div>
      )}
    </div>
  );
}
