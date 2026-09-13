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
IMPACT_SPRITE_SHEET = Path(__file__).with_name("art") / "tech-stack-impact-atlas.png"
CHARACTER_TOP = 390
PUNCH_START = 28
PUNCH_END = 67
SWORD_START = 104
SWORD_END = 135
SWORD_BRIDGE = 136
CELEBRATION_START = 137

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

IMPACT_SPRITE_BOXES = {
    "punch-burst": (0, 0, 64, 64),
    "punch-spark": (64, 0, 128, 64),
    "punch-trail": (128, 0, 192, 64),
    "punch-sparks": (192, 0, 256, 64),
    "celebration-burst": (0, 64, 64, 128),
    "celebration-sparkles": (64, 64, 128, 128),
    "celebration-confetti": (128, 64, 192, 128),
    "landing-ring": (192, 64, 256, 128),
}


def draw_line(draw: ImageDraw.ImageDraw, points, fill, width=2):
    draw.line(points, fill=fill, width=width, joint="curve")


def load_sprite_group(sheet_path, boxes):
    if not sheet_path.exists():
        raise SystemExit(f"missing generated sprite sheet: {sheet_path}")
    sheet = Image.open(sheet_path).convert("RGBA")
    sprites = {}
    for name, box in boxes.items():
        sprite = sheet.crop(box)
        bbox = sprite.getchannel("A").getbbox()
        if bbox is None:
            raise SystemExit(f"generated sprite has no visible pixels: {name}")
        sprites[name] = sprite.crop(bbox)
    return sprites


def load_sprites():
    return {
        **load_sprite_group(SPRITE_SHEET, SPRITE_BOXES),
        **load_sprite_group(IMPACT_SPRITE_SHEET, IMPACT_SPRITE_BOXES),
    }


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


def draw_chapter_rail_response(draw, colors, frame_index):
    if PUNCH_START <= frame_index <= PUNCH_END:
        step = (frame_index - PUNCH_START) % 4
        if step == 0:
            draw.rectangle((136, 268, 184, 275), fill=colors["soft"])
            draw.rectangle((120, 282, 200, 288), fill=colors["blue"])
            draw.rectangle((112, 266, 118, 272), fill=colors["soft"])
            draw.rectangle((202, 266, 208, 272), fill=colors["soft"])
            draw.rectangle((124, 982, 196, 989), fill=colors["blue"])
            draw.rectangle((108, 996, 212, 1001), fill=colors["soft"])
            draw.rectangle((100, 980, 106, 986), fill=colors["blue"])
            draw.rectangle((214, 980, 220, 986), fill=colors["blue"])
        elif step == 1:
            draw.rectangle((148, 269, 172, 274), fill=colors["blue"])
            draw.rectangle((130, 282, 190, 286), fill=colors["soft"])
            draw.rectangle((128, 984, 192, 990), fill=colors["soft"])
            draw.rectangle((116, 998, 204, 1002), fill=colors["blue"])
    elif frame_index == SWORD_BRIDGE:
        draw.rectangle((146, 269, 174, 274), fill=colors["soft"])
        draw.rectangle((130, 984, 190, 990), fill=colors["blue"])
    elif frame_index >= CELEBRATION_START:
        phase = frame_index - CELEBRATION_START
        if phase < 12:
            draw.rectangle((132, 267, 188, 275), fill=colors["gold"])
            draw.rectangle((116, 282, 204, 288), fill=colors["gold"])
            draw.rectangle((104, 264, 112, 272), fill=colors["gold"])
            draw.rectangle((208, 264, 216, 272), fill=colors["gold"])
            draw.rectangle((120, 982, 200, 990), fill=colors["gold"])
            draw.rectangle((104, 996, 216, 1002), fill=colors["gold"])
            draw.rectangle((94, 980, 102, 988), fill=colors["gold"])
            draw.rectangle((218, 980, 226, 988), fill=colors["gold"])
        elif 24 <= phase < 36:
            draw.rectangle((116, 940, 204, 948), fill=colors["soft"])
            draw.rectangle((124, 970, 196, 979), fill=colors["gold"])
            draw.rectangle((108, 988, 116, 996), fill=colors["gold"])
            draw.rectangle((204, 988, 212, 996), fill=colors["gold"])


def character_center(local_y, local_x=160):
    return (local_x, CHARACTER_TOP + local_y)


def draw_punch_effects(image, sprites, frame_index):
    phase = frame_index - PUNCH_START
    step = phase % 4
    if step == 0:
        paste_sprite(image, sprites, "punch-burst", character_center(170, 236), (54, 54), 245)
        paste_sprite(image, sprites, "punch-trail", character_center(170, 216), (62, 20), 225)
        paste_sprite(image, sprites, "punch-sparks", character_center(146, 246), (36, 32), 200)
    elif step == 1:
        paste_sprite(image, sprites, "punch-trail", character_center(170, 220), (72, 22), 235)
        paste_sprite(image, sprites, "punch-burst", character_center(170, 240), (48, 48), 185)
        paste_sprite(image, sprites, "punch-spark", character_center(156, 254), (32, 30), 195)
    elif step == 2:
        paste_sprite(image, sprites, "punch-burst", character_center(170, 236), (52, 52), 232)
        paste_sprite(image, sprites, "punch-trail", character_center(170, 224), (58, 18), 205)
        paste_sprite(image, sprites, "punch-spark", character_center(144, 248), (36, 34), 220)
    else:
        paste_sprite(image, sprites, "punch-trail", character_center(170, 220), (66, 22), 225)
        paste_sprite(image, sprites, "punch-burst", character_center(170, 239), (46, 46), 205)
        paste_sprite(image, sprites, "punch-sparks", character_center(194, 242), (40, 34), 190)


def draw_sword_charge(image, sprites, frame_index):
    phase = frame_index - (SWORD_START - 8)
    opacity = round(70 + 80 * pulse(phase, 8, 1))
    paste_sprite(image, sprites, "punch-sparks", character_center(126), (24, 24), opacity)


def draw_sword_recovery(image, sprites):
    paste_sprite(image, sprites, "punch-spark", character_center(182, 238), (20, 20), 120)


def draw_celebration_effects(image, sprites, frame_index):
    phase = frame_index - CELEBRATION_START
    if phase < 8:
        paste_sprite(image, sprites, "celebration-burst", character_center(38, 154), (64, 64), round(245 - phase * 14))
        paste_sprite(image, sprites, "celebration-sparkles", character_center(46, 154), (52, 42), round(220 - phase * 8))
        paste_sprite(image, sprites, "celebration-confetti", character_center(82, 216), (48, 36), round(215 - phase * 8))
    elif phase < 16:
        paste_sprite(image, sprites, "celebration-burst", character_center(42, 154), (58, 58), round(170 - (phase - 8) * 10))
        paste_sprite(image, sprites, "celebration-sparkles", character_center(50, 154), (54, 42), 215)
        paste_sprite(image, sprites, "celebration-confetti", character_center(96, 218), (54, 40), 205)
    elif phase < 24:
        paste_sprite(image, sprites, "celebration-sparkles", character_center(56, 154), (52, 42), 210)
        paste_sprite(image, sprites, "celebration-confetti", character_center(110, 220), (52, 42), 185)
    elif phase < 36:
        paste_sprite(image, sprites, "landing-ring", character_center(250, 160), (112, 46), 235)
        paste_sprite(image, sprites, "celebration-sparkles", character_center(78, 154), (40, 34), 185)
        paste_sprite(image, sprites, "celebration-confetti", character_center(118, 218), (44, 36), 165)
    else:
        paste_sprite(image, sprites, "celebration-sparkles", character_center(58, 154), (40, 32), round(165 - (phase - 36) * 15))


def draw_character_effects(image, sprites, frame_index):
    # New effects stay outside the sword source chapter. The existing sword
    # artwork remains the only character-cell effect for frames 104-135.
    if PUNCH_START <= frame_index <= PUNCH_END:
        draw_punch_effects(image, sprites, frame_index)
    elif SWORD_START - 8 <= frame_index < SWORD_START:
        draw_sword_charge(image, sprites, frame_index)
    elif frame_index == SWORD_BRIDGE:
        draw_sword_recovery(image, sprites)
    elif frame_index >= CELEBRATION_START:
        draw_celebration_effects(image, sprites, frame_index)


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
    draw_chapter_rail_response(draw, colors, frame_index)
    draw_character_effects(image, sprites, frame_index)
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
