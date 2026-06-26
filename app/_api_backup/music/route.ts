import { readdir } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const musicDir = join(process.cwd(), "public", "music");
  try {
    const files = await readdir(musicDir);
    const tracks = files
      .filter((f) => /\.(mp3|wav|ogg|flac|m4a)$/i.test(f))
      .map((name) => ({
        src: `/music/${name}`,
        title: name.replace(/\.[^.]+$/, ""),
      }));
    return NextResponse.json(tracks);
  } catch {
    return NextResponse.json([]);
  }
}
