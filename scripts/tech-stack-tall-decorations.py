"""Render animated pixel-art ornaments for the tall mascot GIF."""

from __future__ import annotations

import math
import sys
from pathlib import Path

from PIL import Image, ImageDraw


CANVAS = (320, 1100)
TOP_SIGNAL = "top-signal"
BOTTOM_LANDING_PAD = "bottom-landing-pad"
SPRITE_SHEET = Path(__file__).with_name("art") / "tech-stack-ornament-sprites.png"

THEMES = {
    "light": {
        "line": "#dbe4f0",
        "muted": "#9fb4cf",
        "blue": "#2563eb",
        "soft": "#bfdbfe",
        "gold": "#f59e0b",
        "dot": "#64748b",
    },
    "dark": {
        "line": "#263244",
        "muted": "#475569",
        "blue": "#60a5fa",
        "soft": "#93c5fd",
        "gold": "#fbbf24",
        "dot": "#64748b",
    },
}

SPRITE_BOXES = {
    "blue-star": (285, 183, 534, 437),
    "gold-star": (813, 237, 963, 389),
    "scan": (1230, 291, 1447, 337),
    "node": (309, 573, 519, 778),
    "landing-left": (753, 536, 1016, 778),
    "landing-right": (1201, 536, 1463, 778),
}


def draw_line(draw: ImageDraw.ImageDraw, points, fill, width=2):
    draw.line(points, fill=fill, width=width, joint="curve")


def load_sprites():
    if not SPRITE_SHEET.exists():
        raise SystemExit(f"missing generated sprite sheet: {SPRITE_SHEET}")
    sheet = Image.open(SPRITE_SHEET).convert("RGBA")
    sprites = {}
    for name, box in SPRITE_BOXES.items():
        sprite = sheet.crop(box)
        bbox = sprite.getchannel("A").getbbox()
        if bbox is None:
            raise SystemExit(f"generated sprite has no visible pixels: {name}")
        sprites[name] = sprite.crop(bbox)
    return sprites


def paste_sprite(image, sprites, name, center, size, opacity=255):
    sprite = sprites[name].resize(size, Image.Resampling.NEAREST)
    if opacity < 255:
        alpha = sprite.getchannel("A").point(lambda value: value * opacity // 255)
        sprite.putalpha(alpha)
    left = round(center[0] - size[0] / 2)
    top = round(center[1] - size[1] / 2)
    image.alpha_composite(sprite, (left, top))


def pulse(frame_index, frame_count, cycles, offset=0):
    return 0.5 + 0.5 * math.sin((2 * math.pi * cycles * (frame_index + offset)) / frame_count)


def pingpong(frame_index, frame_count, cycles):
    phase = ((frame_index * cycles) % frame_count) / frame_count
    return phase * 2 if phase <= 0.5 else (1 - phase) * 2


def draw_top_static(draw, colors):
    # data-role=top-signal
    draw_line(draw, [(160, 54), (160, 76)], colors["line"], 3)
    draw_line(draw, [(160, 112), (160, 132)], colors["line"], 3)
    draw_line(draw, [(160, 166), (160, 188)], colors["line"], 3)
    draw_line(draw, [(68, 88), (80, 88), (80, 76), (96, 76), (96, 64), (118, 64)], colors["line"], 3)
    draw_line(draw, [(252, 88), (240, 88), (240, 76), (224, 76), (224, 64), (202, 64)], colors["line"], 3)
    draw_line(draw, [(72, 122), (72, 150), (90, 150), (90, 168)], colors["muted"], 2)
    draw_line(draw, [(248, 122), (248, 150), (230, 150), (230, 168)], colors["muted"], 2)
    draw_line(draw, [(96, 228), (78, 228), (78, 252)], colors["muted"], 2)
    draw_line(draw, [(224, 228), (242, 228), (242, 252)], colors["muted"], 2)
    draw_line(draw, [(116, 198), (134, 198), (134, 188), (186, 188), (186, 198), (204, 198)], colors["soft"], 2)
    draw_line(draw, [(126, 208), (194, 208)], colors["soft"], 2)
    draw.rectangle((139, 176, 181, 184), outline=colors["soft"], width=2)
    for x, y in [(54, 206), (62, 222), (258, 206), (250, 222)]:
        draw.rectangle((x, y, x + 3, y + 3), fill=colors["dot"])


def draw_bottom_static(draw, colors):
    # data-role=bottom-landing-pad
    draw_line(draw, [(60, 922), (80, 922), (80, 910), (108, 910), (108, 900), (212, 900), (212, 910), (240, 910), (240, 922), (260, 922)], colors["line"], 3)
    draw_line(draw, [(60, 954), (80, 954), (80, 966), (108, 966), (108, 976), (212, 976), (212, 966), (240, 966), (240, 954), (260, 954)], colors["line"], 3)
    draw_line(draw, [(90, 868), (108, 868), (108, 850), (132, 850)], colors["muted"], 2)
    draw_line(draw, [(230, 868), (212, 868), (212, 850), (188, 850)], colors["muted"], 2)
    draw_line(draw, [(74, 888), (100, 888)], colors["muted"], 2)
    draw_line(draw, [(246, 888), (220, 888)], colors["muted"], 2)
    draw_line(draw, [(92, 944), (114, 944), (114, 936), (206, 936), (206, 944), (228, 944)], colors["blue"], 3)
    draw_line(draw, [(112, 974), (208, 974)], colors["blue"], 3)
    draw_line(draw, [(128, 994), (192, 994)], colors["blue"], 3)
    draw_line(draw, [(76, 1010), (98, 1010), (98, 1022), (128, 1022)], colors["line"], 3)
    draw_line(draw, [(244, 1010), (222, 1010), (222, 1022), (192, 1022)], colors["line"], 3)
    draw_line(draw, [(112, 1032), (112, 1050), (136, 1050)], colors["muted"], 2)
    draw_line(draw, [(208, 1032), (208, 1050), (184, 1050)], colors["muted"], 2)
    for x, y in [(54, 918), (64, 940), (266, 918), (256, 940)]:
        draw.rectangle((x, y, x + 3, y + 3), fill=colors["dot"])


def draw_top_motion(image, draw, colors, sprites, frame_index, frame_count):
    star_alpha = round(95 + 130 * pulse(frame_index, frame_count, 4))
    paste_sprite(image, sprites, "blue-star", (160, 100), (30, 30), star_alpha)
    for offset, center in ((0, (108, 128)), (15, (212, 128))):
        spark_alpha = round(55 + 170 * pulse(frame_index, frame_count, 5, offset))
        paste_sprite(image, sprites, "gold-star", center, (15, 15), spark_alpha)

    scan_x = 112 + 96 * pingpong(frame_index, frame_count, 3)
    paste_sprite(image, sprites, "scan", (scan_x, 208), (35, 8), 175)
    node_alpha = round(65 + 170 * pulse(frame_index, frame_count, 3, 9))
    paste_sprite(image, sprites, "node", (78, 157), (11, 11), node_alpha)
    paste_sprite(image, sprites, "node", (242, 157), (11, 11), round(235 - node_alpha / 2))
    draw.rectangle((110, 286, 114, 290), fill=colors["gold"] if frame_index % (frame_count // 6) < frame_count // 12 else colors["muted"])
    draw.rectangle((205, 286, 209, 290), fill=colors["gold"] if (frame_index + frame_count // 12) % (frame_count // 6) < frame_count // 12 else colors["muted"])


def draw_bottom_motion(image, draw, colors, sprites, frame_index, frame_count):
    pad_alpha = round(75 + 135 * pulse(frame_index, frame_count, 3, 7))
    paste_sprite(image, sprites, "landing-left", (102, 1010), (42, 39), pad_alpha)
    paste_sprite(image, sprites, "landing-right", (218, 1010), (42, 39), pad_alpha)

    scan_x = 112 + 96 * pingpong(frame_index + 12, frame_count, 3)
    paste_sprite(image, sprites, "scan", (scan_x, 944), (37, 8), 190)
    paste_sprite(image, sprites, "node", (86, 1011), (11, 11), round(70 + 170 * pulse(frame_index, frame_count, 4)))
    paste_sprite(image, sprites, "node", (234, 1011), (11, 11), round(70 + 170 * pulse(frame_index, frame_count, 4, 16)))
    for offset, center in ((0, (116, 870)), (18, (204, 870))):
        spark_alpha = round(45 + 175 * pulse(frame_index, frame_count, 5, offset))
        paste_sprite(image, sprites, "gold-star", center, (13, 13), spark_alpha)
    draw.rectangle((104, 1036, 108, 1040), fill=colors["gold"] if frame_index % (frame_count // 6) < frame_count // 12 else colors["muted"])
    draw.rectangle((211, 1036, 215, 1040), fill=colors["gold"] if (frame_index + frame_count // 12) % (frame_count // 6) < frame_count // 12 else colors["muted"])


def render(output: Path, theme: str, frame_index=0, frame_count=144, sprites=None):
    if theme not in THEMES:
        raise SystemExit(f"unknown theme: {theme}")
    if sprites is None:
        sprites = load_sprites()
    image = Image.new("RGBA", CANVAS, (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    colors = THEMES[theme]
    draw_top_static(draw, colors)
    draw_bottom_static(draw, colors)
    draw_top_motion(image, draw, colors, sprites, frame_index, frame_count)
    draw_bottom_motion(image, draw, colors, sprites, frame_index, frame_count)
    output.parent.mkdir(parents=True, exist_ok=True)
    image.save(output, format="PNG", optimize=True)


def render_frames(output_dir: Path, theme: str, frame_count: int):
    if frame_count <= 0:
        raise SystemExit("frame count must be positive")
    sprites = load_sprites()
    output_dir.mkdir(parents=True, exist_ok=True)
    for frame_index in range(frame_count):
        render(output_dir / f"frame-{frame_index + 1:03d}.png", theme, frame_index, frame_count, sprites)


if __name__ == "__main__":
    if len(sys.argv) != 4:
        raise SystemExit(
            "usage: python scripts/tech-stack-tall-decorations.py <output-dir> <light|dark> <frame-count>"
        )
    render_frames(Path(sys.argv[1]), sys.argv[2], int(sys.argv[3]))
