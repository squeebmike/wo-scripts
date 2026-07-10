#!/usr/bin/env python3
"""
Auto-edit a stop-motion drawing video: drop every frame where a hand or
pencil covers the shot, keeping only the frames where the drawing (the
"lead") is unobstructed. Built for top-down, locked-camera drawing videos
where a hand periodically enters frame to draw, then pulls fully away to
let the paper sit still for a moment.

Detection combines two signals:
  1. skin ratio (HSV) - fraction of the frame that is skin-toned. Catches
     the hand whenever it's in shot.
  2. motion ratio - each frame is compared to the one right before it;
     the pixel differences are morphologically opened to erase thin
     changes (sensor noise, a new pencil stroke) while leaving thick
     changes intact (a hand or pencil actually moving through frame).
     What survives the opening, as a fraction of the frame, is the
     "motion ratio" - near zero when nothing is moving, high while a
     hand is entering, drawing, or leaving.
A frame is flagged "not clean" if either ratio crosses its threshold.
Isolated clean-looking frames don't count on their own: --pad-seconds
drops a buffer around every flagged region (catching blurry in-between
frames right at a transition) and --min-keep-seconds discards any clean
stretch shorter than that, so only genuinely held-still pauses survive.

Note: this treats "not moving" as clean, which matches a workflow where
the hand (and pencil) leave the frame entirely during a pause. If an
object is ever set down and left resting *in* frame instead, it will
also read as motionless once it stops moving and can slip through -
there's no way to tell "nothing is here" from "something is here but
holding still" using motion alone.

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


def skin_ratio(hsv):
    mask1 = cv2.inRange(hsv, (0, 30, 60), (25, 180, 255))
    mask2 = cv2.inRange(hsv, (160, 30, 60), (180, 180, 255))
    mask = cv2.bitwise_or(mask1, mask2)
    return float(mask.mean()) / 255.0


def diff_ratio(gray, other_gray, diff_thresh=25):
    d = cv2.absdiff(gray, other_gray)
    mask = (d > diff_thresh).astype(np.uint8) * 255
    opened = cv2.morphologyEx(mask, cv2.MORPH_OPEN, OPEN_KERNEL)
    return float(opened.mean()) / 255.0


def scan_video(path, sample_width, skin_thresh, motion_thresh, progress=True):
    cap = cv2.VideoCapture(path)
    if not cap.isOpened():
        raise SystemExit(f"Could not open video: {path}")
    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    skin_ratios = []
    motion_ratios = []
    not_clean = []
    prev_gray = None
    idx = 0
    while True:
        ok, frame = cap.read()
        if not ok:
            break
        small = downscale(frame, sample_width)
        hsv = cv2.cvtColor(small, cv2.COLOR_BGR2HSV)
        gray = cv2.GaussianBlur(cv2.cvtColor(small, cv2.COLOR_BGR2GRAY), (5, 5), 0)

        skin = skin_ratio(hsv)
        motion = diff_ratio(gray, prev_gray) if prev_gray is not None else 0.0
        flagged = (skin > skin_thresh) or (motion > motion_thresh)
        prev_gray = gray

        skin_ratios.append(skin)
        motion_ratios.append(motion)
        not_clean.append(flagged)

        idx += 1
        if progress and idx % 200 == 0:
            print(f"  scanned {idx}/{total} frames", file=sys.stderr)
    cap.release()
    return np.array(skin_ratios), np.array(motion_ratios), np.array(not_clean), fps


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
    ap.add_argument("--motion-threshold", type=float, default=0.015,
                     help="motion-ratio (0-1) above which a frame counts as changed from the previous frame (default: 0.015)")
    ap.add_argument("--pad-seconds", type=float, default=0.15,
                     help="extra time dropped around each detected moving/hand region, to catch blurry entering/leaving transitions (default: 0.15)")
    ap.add_argument("--min-keep-seconds", type=float, default=0.3,
                     help="drop still segments shorter than this, so only genuinely held-still pauses count (default: 0.3)")
    ap.add_argument("--sample-width", type=int, default=320,
                     help="width frames are downscaled to before analysis (default: 320)")
    ap.add_argument("--no-audio", action="store_true", help="drop audio / input has no audio track")
    ap.add_argument("--analyze-only", action="store_true", help="scan and report segments, but do not write an output video")
    ap.add_argument("--timeline-csv", help="write per-frame ratio/decision timeline to this CSV, for tuning thresholds")
    args = ap.parse_args()

    if not args.analyze_only and not args.output:
        ap.error("output is required unless --analyze-only is set")

    print(f"Scanning {args.input} for hand/pencil frames...", file=sys.stderr)
    skin_ratios, motion_ratios, not_clean_raw, fps = scan_video(
        args.input, args.sample_width, args.skin_threshold, args.motion_threshold
    )
    print(f"  {not_clean_raw.sum()}/{len(not_clean_raw)} frames flagged pre-smoothing", file=sys.stderr)

    pad_frames = max(0, round(args.pad_seconds * fps))
    not_clean = smooth_and_pad(not_clean_raw, pad_frames)
    segments = find_keep_segments(not_clean, fps, args.min_keep_seconds)
    kept_seconds = sum(e - s for s, e in segments)
    total_seconds = len(skin_ratios) / fps
    print(f"  keeping {len(segments)} still segments, {kept_seconds:.1f}s of {total_seconds:.1f}s", file=sys.stderr)

    if args.timeline_csv:
        with open(args.timeline_csv, "w", newline="") as f:
            w = csv.writer(f)
            w.writerow(["frame", "time_s", "skin_ratio", "motion_ratio", "not_clean"])
            for i in range(len(skin_ratios)):
                w.writerow([i, f"{i / fps:.3f}", f"{skin_ratios[i]:.4f}", f"{motion_ratios[i]:.4f}", bool(not_clean[i])])
        print(f"  wrote timeline to {args.timeline_csv}", file=sys.stderr)

    if not segments:
        raise SystemExit("No still segments detected — try raising --skin-threshold/--motion-threshold.")

    if args.analyze_only:
        for s, e in segments:
            print(f"KEEP {s:.3f} - {e:.3f}")
        return

    has_audio = not args.no_audio and has_audio_stream(args.input)
    run_ffmpeg(args.input, args.output, segments, has_audio)
    print(f"Wrote {args.output}", file=sys.stderr)


if __name__ == "__main__":
    main()
