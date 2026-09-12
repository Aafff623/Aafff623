"""Prepare the generated sword sheets for the Tech Stack mascot loop.

The image generator returns a presentation sheet with a neutral checkerboard
matte. This script turns the 4x4 cells into registered, opaque 320px frames so
the published GIF can keep its full-canvas frame contract.
"""

from __future__ import annotations

import sys
from collections import deque
from pathlib import Path
from typing import Iterable

from PIL import Image


TARGET_SIZE = 320
TARGET_HEAD = (132, 115)
BASE_SCALE = 0.90
ALPHA_THRESHOLD = 18
GRID_SIZE = 4
BACKGROUND_DISTANCE = 32
BACKGROUND_MIN = 130


def sheet_cells(path: Path) -> list[Image.Image]:
    source = Image.open(path).convert("RGBA")
    width, height = source.size
    cells: list[Image.Image] = []
    for row in range(GRID_SIZE):
        for column in range(GRID_SIZE):
            x0 = round(column * width / GRID_SIZE)
            x1 = round((column + 1) * width / GRID_SIZE)
            y0 = round(row * height / GRID_SIZE)
            y1 = round((row + 1) * height / GRID_SIZE)
            cells.append(source.crop((x0, y0, x1, y1)))
    return cells


def is_neutral(pixel: tuple[int, int, int, int]) -> bool:
    red, green, blue, _ = pixel
    return max(red, green, blue) - min(red, green, blue) <= BACKGROUND_DISTANCE and min(red, green, blue) >= BACKGROUND_MIN


def neighbours(x: int, y: int, width: int, height: int) -> Iterable[tuple[int, int]]:
    for delta_y in (-1, 0, 1):
        for delta_x in (-1, 0, 1):
            if not delta_x and not delta_y:
                continue
            next_x = x + delta_x
            next_y = y + delta_y
            if 0 <= next_x < width and 0 <= next_y < height:
                yield next_x, next_y


def strip_boundary_matte(image: Image.Image) -> Image.Image:
    image = image.convert("RGBA")
    width, height = image.size
    pixels = image.load()
    neutral = [[is_neutral(pixels[x, y]) for x in range(width)] for y in range(height)]
    visited = [[False] * width for _ in range(height)]
    queue: deque[tuple[int, int]] = deque()

    for x in range(width):
        if neutral[0][x]:
            queue.append((x, 0))
        if neutral[height - 1][x]:
            queue.append((x, height - 1))
    for y in range(height):
        if neutral[y][0]:
            queue.append((0, y))
        if neutral[y][width - 1]:
            queue.append((width - 1, y))

    while queue:
        x, y = queue.popleft()
        if visited[y][x] or not neutral[y][x]:
            continue
        visited[y][x] = True
        pixels[x, y] = (pixels[x, y][0], pixels[x, y][1], pixels[x, y][2], 0)
        queue.extend(neighbours(x, y, width, height))

    for y in range(height):
        for x in range(width):
            if pixels[x, y][3] < ALPHA_THRESHOLD:
                pixels[x, y] = (pixels[x, y][0], pixels[x, y][1], pixels[x, y][2], 0)

    remove_edge_specks(image)
    return image


def visible_components(image: Image.Image) -> list[list[tuple[int, int]]]:
    width, height = image.size
    pixels = image.load()
    seen = [[False] * width for _ in range(height)]
    components: list[list[tuple[int, int]]] = []

    for y in range(height):
        for x in range(width):
            if seen[y][x] or pixels[x, y][3] < ALPHA_THRESHOLD:
                continue
            seen[y][x] = True
            queue: deque[tuple[int, int]] = deque([(x, y)])
            component: list[tuple[int, int]] = []
            while queue:
                current_x, current_y = queue.popleft()
                component.append((current_x, current_y))
                for next_x, next_y in neighbours(current_x, current_y, width, height):
                    if seen[next_y][next_x] or pixels[next_x, next_y][3] < ALPHA_THRESHOLD:
                        continue
                    seen[next_y][next_x] = True
                    queue.append((next_x, next_y))
            components.append(component)

    return sorted(components, key=len, reverse=True)


def component_box(component: list[tuple[int, int]]) -> tuple[int, int, int, int]:
    xs = [point[0] for point in component]
    ys = [point[1] for point in component]
    return min(xs), min(ys), max(xs), max(ys)


def remove_edge_specks(image: Image.Image) -> None:
    width, height = image.size
    pixels = image.load()
    for component in visible_components(image):
        min_x, min_y, max_x, max_y = component_box(component)
        touches_edge = min_x <= 5 or min_y <= 5 or max_x >= width - 6 or max_y >= height - 6
        if len(component) >= 120 and not (len(component) < 900 and touches_edge):
            continue
        for x, y in component:
            pixels[x, y] = (pixels[x, y][0], pixels[x, y][1], pixels[x, y][2], 0)


def full_box(image: Image.Image) -> tuple[int, int, int, int]:
    pixels = image.load()
    visible = [
        (x, y)
        for y in range(image.height)
        for x in range(image.width)
        if pixels[x, y][3] >= ALPHA_THRESHOLD
    ]
    if not visible:
        raise ValueError("sword frame has no visible pixels after matte removal")
    return component_box(visible)


def head_anchor(image: Image.Image, main_component: list[tuple[int, int]]) -> tuple[float, float]:
    pixels = image.load()
    min_x, min_y, max_x, max_y = component_box(main_component)
    head_limit = min_y + round((max_y - min_y + 1) * 0.55)
    warm: list[tuple[int, int]] = []
    for x, y in main_component:
        red, green, blue, alpha = pixels[x, y]
        if y > head_limit or alpha < ALPHA_THRESHOLD:
            continue
        if red >= 125 and green >= 65 and red - green >= 8 and red - blue >= 35:
            warm.append((x, y))
    if not warm:
        raise ValueError("sword frame has no warm head pixels for registration")
    return (
        sum(point[0] for point in warm) / len(warm),
        sum(point[1] for point in warm) / len(warm),
    )


def fit_scale(box: tuple[int, int, int, int], anchor: tuple[float, float]) -> float:
    min_x, min_y, max_x, max_y = box
    width = max_x - min_x + 1
    height = max_y - min_y + 1
    anchor_x = anchor[0] - min_x
    anchor_y = anchor[1] - min_y
    limits = [BASE_SCALE]
    if anchor_x > 0:
        limits.append(TARGET_HEAD[0] / anchor_x)
    if width - anchor_x > 0:
        limits.append((TARGET_SIZE - TARGET_HEAD[0]) / (width - anchor_x))
    if anchor_y > 0:
        limits.append(TARGET_HEAD[1] / anchor_y)
    if height - anchor_y > 0:
        limits.append((TARGET_SIZE - TARGET_HEAD[1]) / (height - anchor_y))
    return max(0.45, min(limits) * 0.985)


def registered_frame(image: Image.Image) -> Image.Image:
    components = visible_components(image)
    if not components:
        raise ValueError("sword frame has no visible components")
    main = components[0]
    box = full_box(image)
    anchor = head_anchor(image, main)
    scale = fit_scale(box, anchor)
    crop = image.crop((box[0], box[1], box[2] + 1, box[3] + 1))
    scaled_size = (
        max(1, round(crop.width * scale)),
        max(1, round(crop.height * scale)),
    )
    crop = crop.resize(scaled_size, Image.Resampling.LANCZOS)
    relative_anchor = (
        (anchor[0] - box[0]) * scale,
        (anchor[1] - box[1]) * scale,
    )
    target_x = round(TARGET_HEAD[0] - relative_anchor[0])
    target_y = round(TARGET_HEAD[1] - relative_anchor[1])
    canvas = Image.new("RGBA", (TARGET_SIZE, TARGET_SIZE), (0, 0, 0, 0))
    canvas.alpha_composite(crop, (target_x, target_y))
    return canvas


def effect_overlay(image: Image.Image) -> Image.Image:
    box = full_box(image)
    crop = image.crop((box[0], box[1], box[2] + 1, box[3] + 1))
    scale = min(0.92, 270 / max(crop.width, crop.height))
    crop = crop.resize((max(1, round(crop.width * scale)), max(1, round(crop.height * scale))), Image.Resampling.LANCZOS)
    alpha = crop.getchannel("A").point(lambda value: round(value * 0.24))
    crop.putalpha(alpha)
    canvas = Image.new("RGBA", (TARGET_SIZE, TARGET_SIZE), (0, 0, 0, 0))
    canvas.alpha_composite(crop, (TARGET_HEAD[0] - crop.width // 2, 165 - crop.height // 2))
    return canvas


def prepare(
    character_sheets: list[Path],
    effects_sheet: Path,
    output_dir: Path,
    theme: str,
) -> None:
    character_cells = [cell for sheet in character_sheets for cell in sheet_cells(sheet)]
    effects = [strip_boundary_matte(cell) for cell in sheet_cells(effects_sheet)]
    background = (255, 255, 255, 255) if theme == "light" else (13, 17, 23, 255)
    output_dir.mkdir(parents=True, exist_ok=True)
    frame_count = len(character_cells)

    # Effects are deliberately restrained: the character sheets already carry
    # the core blue slash language, while this atlas adds a soft impact glow
    # on the attack/recovery beats without making every frame noisy.
    effect_map = {
        4: 0, 5: 1, 6: 2, 7: 3, 8: 4, 9: 5, 10: 6, 11: 7,
        12: 8, 13: 9, 14: 10, 15: 11, 16: 4, 17: 6, 18: 8,
        19: 9, 20: 10, 21: 11, 22: 4,
    }
    for index, raw_cell in enumerate(character_cells):
        character = registered_frame(strip_boundary_matte(raw_cell))
        overlay_index = effect_map.get(index)
        if overlay_index is not None:
            character = Image.alpha_composite(character, effect_overlay(effects[overlay_index]))
        frame = Image.new("RGBA", (TARGET_SIZE, TARGET_SIZE), background)
        frame.alpha_composite(character)
        frame.convert("RGB").save(output_dir / f"frame-{index + 1:03d}.png", optimize=True)

    print(f"[sword-frames] {theme}: wrote {frame_count} frames to {output_dir}")


def main() -> None:
    if len(sys.argv) != 6:
        raise SystemExit(
            "usage: python scripts/prepare-tech-stack-sword-frames.py "
            "<keyframes.png> <followthrough.png> <effects.png> <output-dir> <light|dark>"
        )
    keyframes, followthrough, effects, output_dir, theme = map(Path, sys.argv[1:])
    if theme.name not in {"light", "dark"}:
        raise SystemExit("theme must be light or dark")
    prepare([keyframes, followthrough], effects, output_dir, theme.name)


if __name__ == "__main__":
    main()
