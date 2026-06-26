"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion, AnimatePresence } from "framer-motion";
import { photosData, Photo } from "@/data/photos";

interface PhotoAlbumProps {
  onBack: () => void;
}

export function PhotoAlbum({ onBack }: PhotoAlbumProps) {
  const [photos] = useState<Photo[]>(photosData);
  const [selected, setSelected] = useState<Photo | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openPhoto = (photo: Photo, index: number) => {
    setSelected(photo);
    setSelectedIndex(index);
  };

  const closePhoto = () => setSelected(null);

  const prevPhoto = () => {
    const i = (selectedIndex - 1 + photos.length) % photos.length;
    setSelectedIndex(i);
    setSelected(photos[i]);
  };

  const nextPhoto = () => {
    const i = (selectedIndex + 1) % photos.length;
    setSelectedIndex(i);
    setSelected(photos[i]);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!selected) return;
      if (e.key === "Escape") closePhoto();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected, selectedIndex, photos]);

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-text-tertiary hover:text-text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        返回生活舱
      </button>

      <h2 className="text-2xl font-bold text-text-primary">📷 拍照</h2>

      {photos.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, i) => (
            <button key={i} onClick={() => openPhoto(photo, i)} className="text-left">
              <GlassCard hover={true} className="overflow-hidden p-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full aspect-square object-cover"
                />
                <p className="p-3 text-xs text-text-tertiary">{photo.caption}</p>
              </GlassCard>
            </button>
          ))}
        </div>
      ) : (
        <GlassCard hover={false}>
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <span className="text-5xl">📷</span>
            <p className="text-text-secondary text-sm">还没有照片</p>
            <p className="text-text-tertiary text-xs max-w-xs">
              将照片放入 public/photos/ 文件夹即可自动展示
            </p>
          </div>
        </GlassCard>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center"
            onClick={closePhoto}
          >
            {/* Close */}
            <button
              onClick={closePhoto}
              className="absolute top-4 right-4 z-10 glass rounded-full p-2 text-text-primary hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Prev */}
            {photos.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                className="absolute left-4 z-10 glass rounded-full p-3 text-text-primary hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}

            {/* Image */}
            <motion.img
              key={selected.src}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={selected.src}
              alt={selected.caption}
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            {photos.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                className="absolute right-4 z-10 glass rounded-full p-3 text-text-primary hover:bg-white/10 transition-colors rotate-180"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}

            {/* Caption + counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <p className="text-text-primary text-sm">{selected.caption}</p>
              <p className="text-text-tertiary text-xs mt-1">
                {selectedIndex + 1} / {photos.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
