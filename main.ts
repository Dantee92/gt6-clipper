// gta6-clipper-01 entry program (Node 22, standard library only).
//
// The entry is the video itself: a GTA 6 clip on YouTube, pitched at make.fun.
// This program does exactly one thing — it hands the video's address to the
// house. It copies VIDEO.json from the repository root to /output/VIDEO.json,
// where the gate reads it and looks the video up through the YouTube Data API.
// Nothing this program writes about the video is scored; the house reads the
// video's views itself and writes /output/video.counts.json after this runs.
//
// The VIDEO.json this repository ships holds a placeholder address until the
// clip is uploaded and its real YouTube address is written in. The gate
// refuses a placeholder, so replace it with the uploaded video's address
// (the Share button's URL) before you submit. This program copies whatever
// VIDEO.json says, placeholder included — the gate, not this program, decides
// whether the address names a real public video.
//
// Run it the way the grader does, from the repository root:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
// It prints nothing on success and exits non-zero when VIDEO.json cannot be
// read, is not a JSON object with a url string, or is over the gate's size cap.

import { copyFileSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const VIDEO_FILE = 'VIDEO.json';
// The gate refuses a VIDEO.json over 16 KiB.
const MAX_VIDEO_JSON_BYTES = 16384;

function readVideoAddress(): string {
  const path = join(BOT_DIR, VIDEO_FILE);
  if (statSync(path).size > MAX_VIDEO_JSON_BYTES) {
    throw new Error(`${VIDEO_FILE} is over ${MAX_VIDEO_JSON_BYTES} bytes`);
  }
  const parsed: unknown = JSON.parse(readFileSync(path, 'utf8'));
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new Error(`${VIDEO_FILE} is not a JSON object`);
  }
  const url = (parsed as Record<string, unknown>).url;
  if (typeof url !== 'string' || url.length === 0) {
    throw new Error(`${VIDEO_FILE} has no url string`);
  }
  return url;
}

const address = readVideoAddress();
mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, VIDEO_FILE), join(OUTPUT_DIR, VIDEO_FILE));
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
