"use client";

import { useState } from "react";
import profile from "@/data/profile";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PhotoAlbum } from "@/components/cabins/PhotoAlbum";
import { ReadingAlbum } from "@/components/cabins/ReadingAlbum";
import { MusicAlbum } from "@/components/cabins/MusicAlbum";
import { Mail, Phone, MessageCircle, Heart, Sparkles } from "lucide-react";

export function LifeCabin() {
  const [subPage, setSubPage] = useState<string | null>(null);

  if (subPage === "拍照") {
    return <PhotoAlbum onBack={() => setSubPage(null)} />;
  }

  if (subPage === "阅读") {
    return <ReadingAlbum onBack={() => setSubPage(null)} />;
  }

  if (subPage === "音乐") {
    return <MusicAlbum onBack={() => setSubPage(null)} />;
  }

  return (
    <div className="space-y-8">
      <SectionTitle title="生活舱" subtitle="兴趣爱好 · 性格 · 联系" />

      {/* Hobbies — 运动 */}
      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-3">运动</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {profile.life.hobbies
            .filter((h) => ["羽毛球", "健身"].includes(h.name))
            .map((hobby) => (
              <GlassCard key={hobby.name} hover={true}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{hobby.emoji}</span>
                  <h3 className="font-semibold text-sm text-text-primary">
                    {hobby.name}
                  </h3>
                </div>
              </GlassCard>
            ))}
        </div>
      </div>

      {/* Hobbies — 文艺 */}
      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-3">文艺</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {profile.life.hobbies
            .filter((h) => ["拍照", "阅读", "音乐"].includes(h.name))
            .map((hobby) => (
              <button
                key={hobby.name}
                onClick={() => {
                  if (hobby.name === "拍照") setSubPage("拍照");
                  if (hobby.name === "阅读") setSubPage("阅读");
                  if (hobby.name === "音乐") setSubPage("音乐");
                }}
                className="text-left"
              >
                <GlassCard hover={true}>
                  <div className="flex flex-col items-center gap-2 text-center py-2">
                    <span className="text-3xl">{hobby.emoji}</span>
                    <h3 className="font-semibold text-sm text-text-primary">
                      {hobby.name}
                    </h3>
                  </div>
                </GlassCard>
              </button>
            ))}
        </div>
      </div>

      {/* Personality + Quote */}
      <div className="grid gap-4 sm:grid-cols-2">
        <GlassCard hover={false}>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-accent-pink" />
            <h3 className="text-sm font-semibold text-text-primary">
              性格标签
            </h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {profile.life.personality.map((trait) => (
              <span
                key={trait}
                className="rounded-full bg-accent-pink/10 px-3 py-1 text-xs text-accent-pink"
              >
                {trait}
              </span>
            ))}
          </div>
        </GlassCard>

        <GlassCard hover={false}>
          <div className="flex items-center gap-2 mb-3">
            <Heart className="h-4 w-4 text-accent-pink" />
            <h3 className="text-sm font-semibold text-text-primary">
              座右铭
            </h3>
          </div>
          <p className="text-text-secondary italic text-sm">
            &ldquo;{profile.life.quote}&rdquo;
          </p>
        </GlassCard>
      </div>

      {/* Contact */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          联系方式
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <GlassCard hover={false}>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-purple/10">
                <MessageCircle className="h-4 w-4 text-accent-purple" />
              </div>
              <span className="text-sm text-text-secondary">
                {profile.contact.wechat}
              </span>
            </div>
          </GlassCard>

          <GlassCard hover={false}>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-cyan/10">
                <Mail className="h-4 w-4 text-accent-cyan" />
              </div>
              <a
                href={`mailto:${profile.contact.email}`}
                className="text-sm text-text-secondary hover:text-accent-cyan transition-colors"
              >
                {profile.contact.email}
              </a>
            </div>
          </GlassCard>

          <GlassCard hover={false}>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-pink/10">
                <Phone className="h-4 w-4 text-accent-pink" />
              </div>
              <span className="text-sm text-text-secondary">
                {profile.contact.phone}
              </span>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
