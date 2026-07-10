#!/usr/bin/env python3
"""
Auto-edit a stop-motion drawing video: drop every frame where a hand or
pencil covers the shot, keeping only the frames where the drawing (the
"lead") is unobstructed. Built for top-down, locked-camera drawing videos
where a hand periodically enters frame to draw, then pulls away.

Detection combines two signals:
  1. skin ratio (HSV) - fraction of the frame that is skin-toned. Catches
     the hand whenever it's in shot.
  2. reference diff - each frame is compared to the last accepted clean
     frame; the pixel differences are morphologically opened to erase
     thin changes (new pencil strokes are only a few pixels wide) while
     leaving thick changes intact (a hand or a pencil body is much
     wider). What survives the opening, as a fraction of the frame, is
     the "diff ratio". This catches objects like a pencil that's been
     set down on the paper but isn't being held (so has no skin in
     frame) without needing to hardcode what a pencil looks like.
A frame is flagged "not clean" if either ratio crosses its threshold.
The reference frame only re-anchors at most a few times a second (never
on every accepted frame) - otherwise a still object left in shot would
match the immediately preceding frame closely enough to be waved through
one frame at a time. If neither signal recovers for a long stretch
(--max-stale-seconds) the reference is force-reset anyway, so one long
pause can't wedge the rest of the video shut.

These defaults were tuned against real footage (paper on a wood table)
and lean toward over-cutting: a pencil resting quietly, at an angle
where it covers only a sliver of the frame, is a genuinely hard case to
tell apart from lighting noise, so --diff-threshold is set low enough to
catch most of those at the cost of occasionally trimming a fraction of
a second of otherwise-clean footage around the edges. Always skim the
output (or use --analyze-only/--timeline-csv first) and loosen
--diff-threshold if too much is being cut, or tighten it if stray
frames still slip through.

Requires: opencv-python-headless (or opencv-python), numpy, and an
ffmpeg binary on PATH.

Usage:
    python3 remove_pencil_frames.py input.mp4 output.mp4
    python3 remove_pencil_frames.py input.mp4 output.mp4 --diff-threshold 0.035
    python3 remove_pencil_frames.py input.mp4 --analyze-only --timeline-csv ratios.csv
"""
import argparse
import csv
import subprocess
import sys

import cv2
import numpy as np


OPEN_KERNEL = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))


def downscale(frame_bgr, sample_width):
    h, w = frame_bgr.shape[:2]
    scale = sample_width / w
    return cv2.resize(
        frame_bgr, (sample_width, max(1, int(h * scale))), interpolation=cv2.INTER_AREA
    )


def skin_ratio(hsv):
    mask1 = cv2.inRange(hsv, (0, 30, 60), (25, 180, 255))
    mask2 = cv2.inRange(hsv, (160, 30, 60), (180, 180, 255))
    mask = cv2.bitwise_or(mask1, mask2)
    return float(mask.mean()) / 255.0


def diff_ratio(gray, ref_gray, diff_thresh=25):
    d = cv2.absdiff(gray, ref_gray)
    mask = (d > diff_thresh).astype(np.uint8) * 255
    opened = cv2.morphologyEx(mask, cv2.MORPH_OPEN, OPEN_KERNEL)
    return float(opened.mean()) / 255.0


def scan_video(path, sample_width, skin_thresh, diff_thresh, max_stale_seconds,
               ref_update_seconds=0.5, progress=True):
    cap = cv2.VideoCapture(path)
    if not cap.isOpened():
        raise SystemExit(f"Could not open video: {path}")
    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    max_stale_frames = int(max_stale_seconds * fps)
    ref_update_frames = max(1, int(ref_update_seconds * fps))

    skin_ratios = []
    diff_ratios = []
    not_clean = []
    ref_gray = None
    frames_since_ref_update = 0
    stale_count = 0
    idx = 0
    while True:
        ok, frame = cap.read()
        if not ok:
            break
        small = downscale(frame, sample_width)
        hsv = cv2.cvtColor(small, cv2.COLOR_BGR2HSV)
        gray = cv2.GaussianBlur(cv2.cvtColor(small, cv2.COLOR_BGR2GRAY), (5, 5), 0)

        skin = skin_ratio(hsv)
        dratio = diff_ratio(gray, ref_gray) if ref_gray is not None else 0.0
        flagged = (skin > skin_thresh) or (ref_gray is not None and dratio > diff_thresh)

        if flagged:
            stale_count += 1
            if stale_count > max_stale_frames and skin <= skin_thresh:
                # Stuck comparing against a stale reference (e.g. a big
                # legitimate change happened while skin was low) - accept
                # the current frame as the new baseline rather than
                # dropping the rest of the video. Gated on skin being low
                # so this can't fire mid-drawing while a hand is visible.
                flagged = False
                stale_count = 0
        else:
            stale_count = 0

        # The reference only advances every ref_update_frames, not on
        # every accepted frame. Otherwise a still object (e.g. a pencil
        # set down and left in place) matches the immediately preceding
        # frame closely enough to keep getting accepted, "boiling the
        # frog" until the whole resting stretch reads as clean. Holding
        # the anchor back for a beat means it's always compared against
        # a moment before the object arrived.
        frames_since_ref_update += 1

        if not flagged and (ref_gray is None or frames_since_ref_update >= ref_update_frames):
            ref_gray = gray
            frames_since_ref_update = 0

        skin_ratios.append(skin)
        diff_ratios.append(dratio)
        not_clean.append(flagged)

        idx += 1
        if progress and idx % 200 == 0:
            print(f"  scanned {idx}/{total} frames", file=sys.stderr)
    cap.release()
    return np.array(skin_ratios), np.array(diff_ratios), np.array(not_clean), fps


def smooth_and_pad(hand_present, pad_frames):
    n = len(hand_present)
    smoothed = hand_present.copy()
    for i in range(n):
        lo, hi = max(0, i - 2), min(n, i + 3)
        smoothed[i] = np.median(hand_present[lo:hi]) >= 0.5
    padded = smoothed.copy()
    for i in np.where(smoothed)[0]:
        lo, hi = max(0, i - pad_frames), min(n, i + pad_frames + 1)
        padded[lo:hi] = True
    return padded


def find_keep_segments(hand_present, fps, min_keep_seconds):
    keep = ~hand_present
    n = len(keep)
    segments = []
    start = None
    for i in range(n):
        if keep[i] and start is None:
            start = i
        elif not keep[i] and start is not None:
            segments.append((start, i))
            start = None
    if start is not None:
        segments.append((start, n))
    min_frames = max(1, int(min_keep_seconds * fps))
    segments = [(s, e) for s, e in segments if (e - s) >= min_frames]
    return [(s / fps, e / fps) for s, e in segments]


def build_ffmpeg_filters(segments):
    conds = "+".join(f"between(t,{s:.3f},{e:.3f})" for s, e in segments)
    vfilter = f"select='{conds}',setpts=N/FRAME_RATE/TB"
    afilter = f"aselect='{conds}',asetpts=N/SR/TB"
    return vfilter, afilter


def run_ffmpeg(input_path, output_path, segments, has_audio):
    vfilter, afilter = build_ffmpeg_filters(segments)
    if has_audio:
        filter_complex = f"[0:v]{vfilter}[v];[0:a]{afilter}[a]"
        cmd = [
            "ffmpeg", "-y", "-i", input_path,
            "-filter_complex", filter_complex,
            "-map", "[v]", "-map", "[a]", output_path,
        ]
    else:
        cmd = ["ffmpeg", "-y", "-i", input_path, "-vf", vfilter, "-an", output_path]
    subprocess.run(cmd, check=True)


def has_audio_stream(path):
    result = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "a",
         "-show_entries", "stream=index", "-of", "csv=p=0", path],
        capture_output=True, text=True,
    )
    return bool(result.stdout.strip())


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("input")
    ap.add_argument("output", nargs="?", help="output video path (omit with --analyze-only)")
    ap.add_argument("--skin-threshold", type=float, default=0.10,
                     help="skin-ratio (0-1) above which a frame counts as a hand present (default: 0.10)")
    ap.add_argument("--diff-threshold", type=float, default=0.02,
                     help="diff-ratio (0-1) above which a frame counts as changed from the last clean frame by a thick (non-stroke) object (default: 0.02)")
    ap.add_argument("--max-stale-seconds", type=float, default=6.0,
                     help="force the reference frame to reset if no clean frame is found for this long, so one long pause can't wedge the rest of the video (default: 6.0)")
    ap.add_argument("--pad-frames", type=int, default=3,
                     help="extra frames dropped around each detected hand/object region, to catch entering/leaving transitions (default: 3)")
    ap.add_argument("--min-keep-seconds", type=float, default=0.3,
                     help="drop clean segments shorter than this, avoids single-frame flicker and marginal transition frames in the output (default: 0.3)")
    ap.add_argument("--sample-width", type=int, default=320,
                     help="width frames are downscaled to before analysis (default: 320)")
    ap.add_argument("--no-audio", action="store_true", help="drop audio / input has no audio track")
    ap.add_argument("--analyze-only", action="store_true", help="scan and report segments, but do not write an output video")
    ap.add_argument("--timeline-csv", help="write per-frame ratio/decision timeline to this CSV, for tuning thresholds")
    args = ap.parse_args()

    if not args.analyze_only and not args.output:
        ap.error("output is required unless --analyze-only is set")

    print(f"Scanning {args.input} for hand/pencil frames...", file=sys.stderr)
    skin_ratios, diff_ratios, not_clean_raw, fps = scan_video(
        args.input, args.sample_width, args.skin_threshold, args.diff_threshold, args.max_stale_seconds
    )
    print(f"  {not_clean_raw.sum()}/{len(not_clean_raw)} frames flagged pre-smoothing", file=sys.stderr)

    not_clean = smooth_and_pad(not_clean_raw, args.pad_frames)
    segments = find_keep_segments(not_clean, fps, args.min_keep_seconds)
    kept_seconds = sum(e - s for s, e in segments)
    total_seconds = len(skin_ratios) / fps
    print(f"  keeping {len(segments)} clean segments, {kept_seconds:.1f}s of {total_seconds:.1f}s", file=sys.stderr)

    if args.timeline_csv:
        with open(args.timeline_csv, "w", newline="") as f:
            w = csv.writer(f)
            w.writerow(["frame", "time_s", "skin_ratio", "diff_ratio", "not_clean"])
            for i in range(len(skin_ratios)):
                w.writerow([i, f"{i / fps:.3f}", f"{skin_ratios[i]:.4f}", f"{diff_ratios[i]:.4f}", bool(not_clean[i])])
        print(f"  wrote timeline to {args.timeline_csv}", file=sys.stderr)

    if not segments:
        raise SystemExit("No clean segments detected — try raising --skin-threshold/--diff-threshold.")

    if args.analyze_only:
        for s, e in segments:
            print(f"KEEP {s:.3f} - {e:.3f}")
        return

    has_audio = not args.no_audio and has_audio_stream(args.input)
    run_ffmpeg(args.input, args.output, segments, has_audio)
    print(f"Wrote {args.output}", file=sys.stderr)


if __name__ == "__main__":
    main()
