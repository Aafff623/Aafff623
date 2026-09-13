"""Generate crisp pixel-art sprites for the non-sword mascot chapters."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw


CELL = 64
CANVAS = (CELL * 4, CELL * 2)
OUTPUT = Path(__file__).with_name("art") / "tech-stack-impact-atlas.png"

CYAN = "#22d3ee"
BLUE = "#2563eb"
WHITE = "#f8fafc"
GOLD = "#fbbf24"
AMBER = "#f59e0b"
MAGENTA = "#ec4899"


def box(draw: ImageDraw.ImageDraw, left: int, top: int, right: int, bottom: int, fill: str):
    draw.rectangle((left, top, right, bottom), fill=fill)


def burst(draw: ImageDraw.ImageDraw, center: tuple[int, int], color: str, scale: int = 1):
    cx, cy = center
    box(draw, cx - 3 * scale, cy - 3 * scale, cx + 3 * scale, cy + 3 * scale, WHITE)
    box(draw, cx - scale, cy - 8 * scale, cx + scale, cy + 8 * scale, color)
    box(draw, cx - 8 * scale, cy - scale, cx + 8 * scale, cy + scale, color)
    box(draw, cx - 5 * scale, cy - 5 * scale, cx + 5 * scale, cy + 5 * scale, color)
    box(draw, cx - 12 * scale, cy - scale, cx - 9 * scale, cy + scale, BLUE)
    box(draw, cx + 9 * scale, cy - scale, cx + 12 * scale, cy + scale, BLUE)
    box(draw, cx - scale, cy - 12 * scale, cx + scale, cy - 9 * scale, BLUE)
    box(draw, cx - scale, cy + 9 * scale, cx + scale, cy + 12 * scale, BLUE)


def small_burst(draw: ImageDraw.ImageDraw, center: tuple[int, int]):
    cx, cy = center
    box(draw, cx - 2, cy - 2, cx + 2, cy + 2, WHITE)
    box(draw, cx - 1, cy - 8, cx + 1, cy + 8, CYAN)
    box(draw, cx - 8, cy - 1, cx + 8, cy + 1, CYAN)


def trail(draw: ImageDraw.ImageDraw):
    box(draw, 11, 28, 48, 33, BLUE)
    box(draw, 18, 25, 48, 36, CYAN)
    box(draw, 25, 27, 53, 34, WHITE)
    box(draw, 35, 29, 55, 32, CYAN)
    box(draw, 8, 30, 17, 31, BLUE)
    box(draw, 15, 24, 20, 25, BLUE)
    box(draw, 15, 36, 24, 37, BLUE)


def sparks(draw: ImageDraw.ImageDraw):
    for left, top, size, color in (
        (11, 14, 4, CYAN),
        (25, 8, 3, WHITE),
        (45, 17, 4, BLUE),
        (16, 43, 3, WHITE),
        (39, 47, 4, CYAN),
        (50, 37, 3, BLUE),
    ):
        box(draw, left, top, left + size, top + size, color)


def celebration_burst(draw: ImageDraw.ImageDraw):
    burst(draw, (32, 31), GOLD, 1)
    box(draw, 15, 10, 18, 13, AMBER)
    box(draw, 46, 12, 49, 17, GOLD)
    box(draw, 9, 44, 14, 47, GOLD)
    box(draw, 48, 44, 53, 47, AMBER)


def celebration_sparkles(draw: ImageDraw.ImageDraw):
    for center, color, scale in (
        ((18, 22), GOLD, 1),
        ((42, 18), AMBER, 1),
        ((29, 42), WHITE, 1),
        ((49, 43), GOLD, 1),
    ):
        small_burst(draw, center)
        box(draw, center[0] - scale, center[1] - scale, center[0] + scale, center[1] + scale, color)


def confetti(draw: ImageDraw.ImageDraw):
    for left, top, width, height, color in (
        (10, 12, 4, 8, GOLD),
        (21, 23, 5, 3, AMBER),
        (34, 10, 3, 7, MAGENTA),
        (48, 24, 6, 3, CYAN),
        (14, 44, 5, 3, MAGENTA),
        (29, 51, 3, 7, GOLD),
        (45, 45, 4, 5, AMBER),
    ):
        box(draw, left, top, left + width, top + height, color)


def landing_ring(draw: ImageDraw.ImageDraw):
    box(draw, 12, 39, 18, 41, AMBER)
    box(draw, 46, 39, 52, 41, AMBER)
    box(draw, 18, 34, 23, 36, GOLD)
    box(draw, 41, 34, 46, 36, GOLD)
    box(draw, 23, 30, 41, 32, WHITE)
    box(draw, 18, 31, 23, 33, CYAN)
    box(draw, 41, 31, 46, 33, CYAN)
    box(draw, 28, 27, 36, 29, BLUE)
    box(draw, 7, 47, 14, 49, CYAN)
    box(draw, 50, 47, 57, 49, CYAN)


def render_tile(index: int) -> Image.Image:
    tile = Image.new("RGBA", (CELL, CELL), (0, 0, 0, 0))
    draw = ImageDraw.Draw(tile)
    if index == 0:
        burst(draw, (32, 32), CYAN, 1)
    elif index == 1:
        small_burst(draw, (32, 32))
        sparks(draw)
    elif index == 2:
        trail(draw)
    elif index == 3:
        sparks(draw)
        small_burst(draw, (35, 32))
    elif index == 4:
        celebration_burst(draw)
    elif index == 5:
        celebration_sparkles(draw)
    elif index == 6:
        confetti(draw)
    elif index == 7:
        landing_ring(draw)
    return tile


def main():
    atlas = Image.new("RGBA", CANVAS, (0, 0, 0, 0))
    for index in range(8):
        x = (index % 4) * CELL
        y = (index // 4) * CELL
        atlas.alpha_composite(render_tile(index), (x, y))
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    atlas.save(OUTPUT, format="PNG", optimize=True)
    print(f"[impact-atlas] {OUTPUT}: {CANVAS[0]}x{CANVAS[1]}, 8 tiles")


if __name__ == "__main__":
    main()
