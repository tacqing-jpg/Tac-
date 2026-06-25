"use client";

import profile from "@/data/profile";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Sparkles, Zap, Gauge } from "lucide-react";

const icons = [Sparkles, Zap, Gauge];

export function StudyCabin() {
  return (
    <div className="space-y-8">
      <SectionTitle title="学习舱" subtitle="学术背景 · 专业能力 · 工作理念" />

      {/* Bio */}
      <div className="space-y-4">
        {profile.about.bio.map((paragraph, i) => (
          <p key={i} className="text-text-secondary leading-relaxed text-lg">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Work style tags */}
      <div className="flex flex-wrap gap-2">
        {profile.about.workStyle.map((style) => (
          <span
            key={style}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-text-tertiary"
          >
            {style}
          </span>
        ))}
      </div>

      {/* Strengths */}
      <div className="grid gap-4 sm:grid-cols-3">
        {profile.about.strengths.map((strength, i) => {
          const Icon = icons[i] || Sparkles;
          return (
            <GlassCard key={strength.label} hover={false}>
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-purple/10">
                  <Icon className="h-4 w-4 text-accent-purple" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-text-primary">
                    {strength.label}
                  </h3>
                  <p className="mt-1 text-xs text-text-tertiary leading-relaxed">
                    {strength.description}
                  </p>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
