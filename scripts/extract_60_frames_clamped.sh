#!/bin/sh
set -eu

# Safer extraction that clamps timestamps slightly before the end
mkdir -p public/seedance_frames
INPUT="public/seedance_assets/Seedance2.0_t2v_00001_.mp4"
if [ ! -f "$INPUT" ]; then
  echo "Input file not found: $INPUT" >&2
  exit 1
fi

DURATION=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$INPUT")
printf "Video duration: %s\n" "$DURATION"
N=60
EPS=0.05
MAX_START=$(awk -v D="$DURATION" -v E="$EPS" 'BEGIN{printf "%.6f", (D>E)? D-E:0}')
i=0
while [ $i -lt $N ]; do
  # sample at midpoints and clamp if too close to end
  t=$(awk -v i="$i" -v N="$N" -v D="$DURATION" 'BEGIN{printf "%.6f", (i+0.5)/N * D}')
  # clamp to MAX_START
  t_clamped=$(awk -v t="$t" -v m="$MAX_START" 'BEGIN{if (t>m) print m; else print t}')
  idx=$(printf "%02d" $((i+1)))
  printf "Extracting frame %s at %s (clamped %s)\n" "$idx" "$t" "$t_clamped"
  ffmpeg -hide_banner -loglevel error -y -ss "$t_clamped" -i "$INPUT" -frames:v 1 -q:v 1 "public/seedance_frames/frame_$idx.png"
  i=$((i+1))
done
printf "Clamped extraction complete: %d frames in public/seedance_frames\n" "$N"
