import { readdir } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const photosDir = join(process.cwd(), "public", "photos");
  try {
    const files = await readdir(photosDir);
    const images = files
      .filter((f) => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
      .map((name) => ({
        src: `/photos/${name}`,
        caption: name.replace(/\.[^.]+$/, ""),
      }));
    return NextResponse.json(images);
  } catch {
    return NextResponse.json([]);
  }
}
