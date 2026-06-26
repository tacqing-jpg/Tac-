"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowLeft, Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { musicData, Track } from "@/data/music";

interface MusicAlbumProps {
  onBack: () => void;
}

export function MusicAlbum({ onBack }: MusicAlbumProps) {
  const [tracks] = useState<Track[]>(musicData);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const indexRef = useRef(-1);
  const tracksRef = useRef<Track[]>([]);

  // Keep refs in sync
  useEffect(() => { indexRef.current = currentIndex; }, [currentIndex]);
  useEffect(() => { tracksRef.current = tracks; }, [tracks]);

  // Create audio element once
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    audio.addEventListener("ended", () => {
      const idx = indexRef.current;
      const all = tracksRef.current;
      if (idx < all.length - 1) {
        const next = all[idx + 1];
        audio.src = next.src;
        audio.play().then(() => {
          setCurrentIndex(idx + 1);
          setIsPlaying(true);
        }).catch(() => {});
      } else {
        setIsPlaying(false);
      }
    });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const playTrack = (index: number) => {
    const audio = audioRef.current;
    const track = tracks[index];
    if (!audio || !track) return;
    audio.src = track.src;
    audio.play().then(() => {
      setCurrentIndex(index);
      setIsPlaying(true);
    }).catch(() => {});
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (currentIndex < 0 && tracks.length > 0) {
        playTrack(0);
        return;
      }
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const prevTrack = () => {
    if (currentIndex > 0) playTrack(currentIndex - 1);
  };

  const nextTrack = () => {
    if (currentIndex < tracks.length - 1) playTrack(currentIndex + 1);
  };

  const currentTrack = tracks[currentIndex];

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-text-tertiary hover:text-text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        返回生活舱
      </button>

      <h2 className="text-2xl font-bold text-text-primary">🎵 音乐</h2>

      {tracks.length > 0 ? (
        <>
          {currentTrack && (
            <GlassCard hover={false}>
              <div className="flex flex-col items-center gap-4 py-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-accent-pink/10">
                  <span className="text-4xl">🎵</span>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-text-primary">
                    {currentTrack.title}
                  </h3>
                  <p className="text-xs text-text-tertiary mt-1">
                    {currentIndex + 1} / {tracks.length}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={prevTrack}
                    disabled={currentIndex === 0}
                    className="text-text-tertiary hover:text-text-primary disabled:opacity-30 transition-colors"
                  >
                    <SkipBack className="h-5 w-5" />
                  </button>
                  <button
                    onClick={togglePlay}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-pink text-white hover:bg-accent-pink/80 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5 ml-0.5" />
                    )}
                  </button>
                  <button
                    onClick={nextTrack}
                    disabled={currentIndex >= tracks.length - 1}
                    className="text-text-tertiary hover:text-text-primary disabled:opacity-30 transition-colors"
                  >
                    <SkipForward className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </GlassCard>
          )}

          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-3">播放列表</h3>
            <GlassCard hover={false} className="divide-y divide-white/5 p-0">
              {tracks.map((track, i) => (
                <button
                  key={i}
                  onClick={() => playTrack(i)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    i === currentIndex ? "bg-white/5" : "hover:bg-white/5"
                  }`}
                >
                  <span className="text-xs text-text-tertiary w-5 tabular-nums text-right">
                    {i + 1}
                  </span>
                  <span className="text-sm text-text-secondary">
                    {track.title}
                  </span>
                  {i === currentIndex && isPlaying && (
                    <span className="ml-auto text-[10px] text-accent-pink">♫</span>
                  )}
                </button>
              ))}
            </GlassCard>
          </div>
        </>
      ) : (
        <GlassCard hover={false}>
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <span className="text-5xl">🎵</span>
            <p className="text-text-secondary text-sm">还没有音乐</p>
            <p className="text-text-tertiary text-xs max-w-xs">
              将 MP3/WAV/OGG 文件放入 public/music/ 文件夹
            </p>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
