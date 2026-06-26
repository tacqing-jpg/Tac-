"use client";

import profile from "@/data/profile";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function AboutMeCabin() {
  return (
    <div className="space-y-8">
      <SectionTitle title="关于我" subtitle={profile.name} />

      <div className="flex flex-col items-center gap-6">
        {/* ID Photo */}
        <GlassCard hover={false} className="overflow-hidden p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/id-photo.jpg"
            alt="证件照"
            className="w-48 h-64 object-cover rounded-xl"
          />
        </GlassCard>

        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold text-text-primary">
            {profile.name}
          </h3>
          <p className="text-text-secondary text-sm">{profile.title}</p>
          <p className="text-text-tertiary text-xs">{profile.tagline}</p>
        </div>

        {/* Status */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-text-secondary">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          {profile.status}
        </div>
      </div>
    </div>
  );
}
