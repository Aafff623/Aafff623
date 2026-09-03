"""Render light/dark typewriter GIFs from the tracked wordmark SVGs.

Source of truth remains assets/brand-threetwoa.svg and brand-threetwoa-dark.svg.
Generated candidate GIFs are placed under ignored temp/scripts/wordmark-typewriter/;
copy approved GIFs into assets/.
"""
from __future__ import annotations

import io
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

REPO = Path(__file__).resolve().parent.parent
OUT = REPO / "temp" / "scripts" / "wordmark-typewriter"
WORD = "threetwoa"
WIDTH, HEIGHT = 760, 150
SCALE = 2

THEMES = {
    "light": {
        "svg": REPO / "assets" / "brand-threetwoa.svg",
        "bg": "#ffffff",
        "caret": "#2563EB",
        "gif": OUT / "brand-threetwoa.candidate.gif",
    },
    "dark": {
        "svg": REPO / "assets" / "brand-threetwoa-dark.svg",
        "bg": "#0d1117",
        "caret": "#93C5FD",
        "gif": OUT / "brand-threetwoa-dark.candidate.gif",
    },
}


def prepare_svg(raw: str, bg: str, caret: str) -> str:
    svg = raw.replace(
        '<!-- Main wordmark -->\n  <text x="380" y="92"',
        '<!-- Main wordmark -->\n  <text id="word" x="380" y="92"',
        1,
    )
    caret_el = (
        f'<rect id="caret" x="0" y="48" width="2.4" height="52" rx="1" '
        f'fill="{caret}" opacity="0"/>'
    )
    svg = svg.replace(">threetwoa</text>", f">threetwoa</text>\n  {caret_el}", 1)
    bg_el = f'<rect id="bg" width="760" height="150" fill="{bg}"/>'
    svg = svg.replace("</defs>", f"</defs>\n  {bg_el}", 1)
    return svg


def html_page(svg: str, bg: str) -> str:
    return f"""<!doctype html>
<html><head>
<meta charset="utf-8"/>
<style>
  html, body {{ margin: 0; background: {bg}; }}
  svg {{ display: block; }}
</style>
</head>
<body>{svg}</body></html>"""


def timeline() -> list[tuple[str, bool, int]]:
    frames: list[tuple[str, bool, int]] = [
        ("", True, 420),
        ("", False, 280),
        ("", True, 420),
    ]
    for i in range(1, len(WORD) + 1):
        frames.append((WORD[:i], True, 160))
    frames.extend(
        [
            (WORD, True, 400),
            (WORD, False, 280),
            (WORD, True, 400),
            (WORD, False, 280),
            (WORD, False, 2600),
        ]
    )
    return frames


def render_theme(page, theme: dict) -> None:
    raw = theme["svg"].read_text(encoding="utf-8")
    page.set_content(html_page(prepare_svg(raw, theme["bg"], theme["caret"]), theme["bg"]))
    page.wait_for_function("document.fonts.status === 'loaded'")
    page.evaluate(
        """() => {
          const word = document.getElementById('word');
          const box = word.getBBox();
          window.__startX = box.x;
          window.__caretY = box.y + 4;
          window.__caretH = Math.max(box.height - 8, 48);
          word.setAttribute('text-anchor', 'start');
          word.setAttribute('x', String(window.__startX));
          const caret = document.getElementById('caret');
          caret.setAttribute('y', String(window.__caretY));
          caret.setAttribute('height', String(window.__caretH));
        }"""
    )

    images: list[Image.Image] = []
    durations: list[int] = []
    svg = page.locator("svg")
    for text, caret_on, delay in timeline():
        page.evaluate(
            """([text, caretOn]) => {
              const word = document.getElementById('word');
              const caret = document.getElementById('caret');
              word.textContent = text;
              const box = word.getBBox();
              const x = text ? (box.x + box.width + 5) : window.__startX;
              caret.setAttribute('x', String(x));
              caret.setAttribute('opacity', caretOn ? '1' : '0');
            }""",
            [text, caret_on],
        )
        png = svg.screenshot(type="png")
        images.append(Image.open(io.BytesIO(png)).convert("RGB"))
        durations.append(delay)

    first, rest = images[0], images[1:]
    first.save(
        theme["gif"],
        save_all=True,
        append_images=rest,
        duration=durations,
        loop=0,
        disposal=2,
        optimize=True,
    )
    kb = theme["gif"].stat().st_size / 1024
    print(f"{theme['gif'].name}: {kb:.1f} KB, {len(images)} frames")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(
            viewport={"width": WIDTH, "height": HEIGHT},
            device_scale_factor=SCALE,
        )
        for theme in THEMES.values():
            render_theme(page, theme)
        browser.close()


if __name__ == "__main__":
    main()
