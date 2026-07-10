#!/usr/bin/env python3
"""
Auto-edit a stop-motion drawing video: drop every frame that has motion
in it, or has something big blocking the paper, keeping only the frames
where the drawing is fully visible and nothing is happening. Built for
top-down, locked-camera drawing videos where a hand periodically enters
frame to draw, then pulls away.

Detection combines two signals:
  1. motion ratio - each frame is compared to the one right before it.
     Near zero when nothing is moving, high while a hand is entering,
     drawing, or leaving.
  2. block ratio - each frame is also compared to the last frame that
     was confirmed clean (not just the previous one). This catches a
     big object sitting in frame even once it's stopped moving - e.g. a
     pencil set down and left resting on the page - which motion alone
     can't see, since a stationary blocker and a stationary empty
     background look identical frame-to-frame. The "last confirmed
     clean" reference only advances a few times a second (never on
     every accepted frame), and force-resets if nothing looks clean for
     too long (--max-stale-seconds), so one long pause can't wedge the
     rest of the video shut.
Both signals go through the same morphological opening: pixel
differences are eroded then dilated, which erases thin changes (sensor
noise, a new pencil stroke a couple pixels wide) while leaving thick
changes intact (a hand, a pencil, anything sized like an actual
object). A frame is flagged "not clean" if either ratio crosses its
threshold.

Isolated clean-looking frames don't count on their own: --pad-seconds
drops a buffer around every flagged region (catching blurry in-between
frames right at a transition) and --min-keep-seconds discards any clean
stretch shorter than that, so only genuinely held-still, fully-visible
pauses survive.

The first --startup-seconds of the video are always treated as not
clean, no matter what. There's no confirmed-clean reference yet during
that window, so if something is already blocking the shot right from
frame one, motion alone can't see it (nothing's moved yet) and there's
no baseline yet for the block check either - the video would otherwise
have no way to ever notice.

Requires: opencv-python-headless (or opencv-python), numpy, and an
ffmpeg binary on PATH.

Usage:
    python3 remove_pencil_frames.py input.mp4 output.mp4
    python3 remove_pencil_frames.py input.mp4 output.mp4 --motion-threshold 0.02
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


def diff_ratio(gray, other_gray, diff_thresh=25):
    d = cv2.absdiff(gray, other_gray)
    mask = (d > diff_thresh).astype(np.uint8) * 255
    opened = cv2.morphologyEx(mask, cv2.MORPH_OPEN, OPEN_KERNEL)
    return float(opened.mean()) / 255.0


def scan_video(path, sample_width, motion_thresh, block_thresh, max_stale_seconds,
                ref_update_seconds=0.5, startup_seconds=1.0, progress=True):
    cap = cv2.VideoCapture(path)
    if not cap.isOpened():
        raise SystemExit(f"Could not open video: {path}")
    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    max_stale_frames = int(max_stale_seconds * fps)
    ref_update_frames = max(1, int(ref_update_seconds * fps))
    startup_frames = int(startup_seconds * fps)

    motion_ratios = []
    block_ratios = []
    not_clean = []
    prev_gray = None
    ref_gray = None
    frames_since_ref_update = 0
    stale_count = 0
    idx = 0
    while True:
        ok, frame = cap.read()
        if not ok:
            break
        small = downscale(frame, sample_width)
        gray = cv2.GaussianBlur(cv2.cvtColor(small, cv2.COLOR_BGR2GRAY), (5, 5), 0)

        if idx < startup_frames:
            # There's no reliable baseline yet during the first stretch of
            # the video (nothing confirmed clean to compare against), so a
            # blocker that's already sitting in frame at the very start
            # would otherwise go undetected forever - motion-to-previous
            # stays near zero if it never moves, and there's no clean
            # reference yet either. Treat the whole startup window as not
            # clean so a real baseline gets a chance to be established.
            motion, block, flagged = 1.0, 1.0, True
        else:
            motion = diff_ratio(gray, prev_gray) if prev_gray is not None else 0.0
            block = diff_ratio(gray, ref_gray) if ref_gray is not None else 0.0
            flagged = (motion > motion_thresh) or (block > block_thresh)
        prev_gray = gray

        if flagged:
            stale_count += 1
            if stale_count > max_stale_frames:
                # Stuck comparing against a stale reference (e.g. a big
                # legitimate change happened) - accept the current frame
                # as the new baseline rather than dropping the rest of
                # the video.
                flagged = False
                stale_count = 0
        else:
            stale_count = 0

        frames_since_ref_update += 1
        if not flagged and (ref_gray is None or frames_since_ref_update >= ref_update_frames):
            ref_gray = gray
            frames_since_ref_update = 0

        motion_ratios.append(motion)
        block_ratios.append(block)
        not_clean.append(flagged)

        idx += 1
        if progress and idx % 200 == 0:
            print(f"  scanned {idx}/{total} frames", file=sys.stderr)
    cap.release()
    return np.array(motion_ratios), np.array(block_ratios), np.array(not_clean), fps


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
    ap.add_argument("--motion-threshold", type=float, default=0.015,
                     help="motion-ratio (0-1) above which a frame counts as changed from the previous frame (default: 0.015)")
    ap.add_argument("--block-threshold", type=float, default=0.02,
                     help="block-ratio (0-1) above which a frame counts as blocked compared to the last confirmed-clean frame (default: 0.02)")
    ap.add_argument("--max-stale-seconds", type=float, default=6.0,
                     help="force the clean reference to reset if nothing looks clean for this long, so one long pause can't wedge the rest of the video (default: 6.0)")
    ap.add_argument("--startup-seconds", type=float, default=1.0,
                     help="always treat this much of the start of the video as not clean, since there's no confirmed-clean reference yet to check against (default: 1.0)")
    ap.add_argument("--pad-seconds", type=float, default=0.15,
                     help="extra time dropped around each flagged region, to catch blurry entering/leaving transitions (default: 0.15)")
    ap.add_argument("--min-keep-seconds", type=float, default=0.3,
                     help="drop clean segments shorter than this, so only genuinely held-still pauses count (default: 0.3)")
    ap.add_argument("--sample-width", type=int, default=320,
                     help="width frames are downscaled to before analysis (default: 320)")
    ap.add_argument("--no-audio", action="store_true", help="drop audio / input has no audio track")
    ap.add_argument("--analyze-only", action="store_true", help="scan and report segments, but do not write an output video")
    ap.add_argument("--timeline-csv", help="write per-frame ratio/decision timeline to this CSV, for tuning thresholds")
    args = ap.parse_args()

    if not args.analyze_only and not args.output:
        ap.error("output is required unless --analyze-only is set")

    print(f"Scanning {args.input} for moving/blocked frames...", file=sys.stderr)
    motion_ratios, block_ratios, not_clean_raw, fps = scan_video(
        args.input, args.sample_width, args.motion_threshold, args.block_threshold,
        args.max_stale_seconds, startup_seconds=args.startup_seconds,
    )
    print(f"  {not_clean_raw.sum()}/{len(not_clean_raw)} frames flagged pre-smoothing", file=sys.stderr)

    pad_frames = max(0, round(args.pad_seconds * fps))
    not_clean = smooth_and_pad(not_clean_raw, pad_frames)
    segments = find_keep_segments(not_clean, fps, args.min_keep_seconds)
    kept_seconds = sum(e - s for s, e in segments)
    total_seconds = len(motion_ratios) / fps
    print(f"  keeping {len(segments)} clean segments, {kept_seconds:.1f}s of {total_seconds:.1f}s", file=sys.stderr)

    if args.timeline_csv:
        with open(args.timeline_csv, "w", newline="") as f:
            w = csv.writer(f)
            w.writerow(["frame", "time_s", "motion_ratio", "block_ratio", "not_clean"])
            for i in range(len(motion_ratios)):
                w.writerow([i, f"{i / fps:.3f}", f"{motion_ratios[i]:.4f}", f"{block_ratios[i]:.4f}", bool(not_clean[i])])
        print(f"  wrote timeline to {args.timeline_csv}", file=sys.stderr)

    if not segments:
        raise SystemExit("No clean segments detected — try raising --motion-threshold/--block-threshold.")

    if args.analyze_only:
        for s, e in segments:
            print(f"KEEP {s:.3f} - {e:.3f}")
        return

    has_audio = not args.no_audio and has_audio_stream(args.input)
    run_ffmpeg(args.input, args.output, segments, has_audio)
    print(f"Wrote {args.output}", file=sys.stderr)


if __name__ == "__main__":
    main()
