"use client";

import profile from "@/data/profile";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TimelineItem } from "@/components/ui/TimelineItem";

export function MemoryCabin() {
  return (
    <div className="space-y-8">
      <SectionTitle title="记忆舱" subtitle="成长轨迹 · 职业经历" />

      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 hidden w-px bg-white/8 lg:block" />
        <div className="space-y-10">
          {profile.experience.map((exp, i) => (
            <TimelineItem key={exp.id} experience={exp} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
