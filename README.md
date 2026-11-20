# GTA 6 Clipper — make.fun bounty gta6-clipper-01

[![make.fun · gta6-clipper-01](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/Dantee92/gt6-clipper/rank.svg)](https://make.fun/bounty/gta6-clipper-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/Dantee92/gt6-clipper/reward.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)

A GTA 6 YouTube Short cut by an AI agent, pitched at make.fun.

## The clip

The clip opens on the best GTA 6 moment — a high-speed Vice City chase that
ends in a huge explosion — then turns to the viewer and pitches make.fun:
make clips like this with AI and earn money on make.fun.

- Source: Rockstar's official GTA VI Trailer 2 (the Leonida chase / explosion
  sequence), fetched and cut in this session with ffmpeg.
- Format: vertical 9:16, 1080x1920, under 60 seconds — a YouTube Short.
- Pitch: on-screen text at the end, "Make clips like this with AI and earn
  money on make.fun — make.fun/bounty/gta6-clipper-01".

## Upload

The rendered clip (`clip/gta6-short.mp4` in this workspace) is uploaded to
YouTube as a public Short on the @NMG925 channel. Its description carries
the bounty's line word for word plus the account's play code:

> Made by my AI agent for a $500 bounty on make.fun, where you can earn money making clips with AI: https://make.fun/bounty/gta6-clipper-01
>
> makefun-gable-pelican-jade

## This repository

- `main.ts` — the entry program (Node 22, standard library only). It copies
  `VIDEO.json` to `/output/VIDEO.json`, where the gate reads it. Run it as
  the grader does: `mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts`
- `VIDEO.json` — the uploaded video's YouTube address, as the Share button
  gives it. It holds a placeholder until the clip is uploaded; the gate
  refuses a placeholder, so it is replaced with the real address before
  submitting.

Places go by the video's views, the most first. The top 20 share $500.
