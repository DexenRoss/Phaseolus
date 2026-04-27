#!/bin/sh
set -eu

# Script to extract 60 evenly-spaced frames from the seedance video.
mkdir -p public/seedance_frames
INPUT="public/seedance_assets/Seedance2.0_t2v_00001_.mp4"
if [ ! -f "$INPUT" ]; then
  echo "Input file not found: $INPUT" >&2
  exit 1
fi

DURATION=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$INPUT")
printf "Video duration: %s\n" "$DURATION"
N=60
i=0
while [ $i -lt $N ]; do
  # sample at midpoints to avoid exact-frame boundary issues
  t=$(awk -v i="$i" -v N="$N" -v D="$DURATION" 'BEGIN{printf "%.6f", (i+0.5)/N * D}')
  idx=$(printf "%02d" $((i+1)))
  printf "Extracting frame %s at %s\n" "$idx" "$t"
  ffmpeg -hide_banner -loglevel error -y -ss "$t" -i "$INPUT" -frames:v 1 -q:v 1 "public/seedance_frames/frame_$idx.png"
  i=$((i+1))
done
printf "Extraction complete: %d frames in public/seedance_frames\n" "$N"
