import type { FontFaceKey, Theme } from "../config/types";
import { fontFaces } from "./fonts";

/**
 * Generates the selected theme's tokens and only the font faces it needs.
 * Config values are trusted source values, not user-generated HTML.
 */
export function themeCss(theme: Theme): string {
  const faces = [
    ...new Set<FontFaceKey>([
      theme.fonts.display,
      theme.fonts.body,
      theme.fonts.emphasis,
    ]),
  ];

  const fontRules = faces
    .map((key) => {
      const face = fontFaces[key];
      return `@font-face{font-family:"${face.family}";src:url("${face.src}") format("woff2");font-style:${face.style};font-weight:${face.weight};font-display:swap}`;
    })
    .join("\n");

  const display = fontFaces[theme.fonts.display];
  const body = fontFaces[theme.fonts.body];
  const emphasis = fontFaces[theme.fonts.emphasis];

  return `${fontRules}
:root{
  color-scheme:${theme.mode};
  --c-canvas:${theme.colors.canvas};
  --c-surface:${theme.colors.surface};
  --c-ink:${theme.colors.ink};
  --c-muted:${theme.colors.muted};
  --c-accent:${theme.colors.accent};
  --c-accent-ink:${theme.colors.accentInk};
  --c-line:${theme.colors.line};
  --c-tint:${theme.colors.tint};
  --c-on-image:${theme.colors.onImage};
  --c-footer-bg:${theme.colors.footerBg};
  --c-footer-ink:${theme.colors.footerInk};
  --type-display:${display.stack};
  --type-body:${body.stack};
  --type-emphasis:${emphasis.stack};
  --emphasis-style:${emphasis.style === "italic" ? "italic" : "normal"};
  --emphasis-weight:${emphasis.style === "italic" ? "inherit" : "500"};
  --shape-media:${theme.shape.media};
  --shape-button:${theme.shape.button};
  --content-width:${theme.layout.contentWidth};
  --gutter:${theme.layout.gutter};
  --section-space:${theme.layout.sectionSpace};
}`;
}

/** The fonts that should be preloaded for the selected theme. */
export function themeFontFaces(theme: Theme) {
  const keys = [
    ...new Set<FontFaceKey>([
      theme.fonts.display,
      theme.fonts.body,
      theme.fonts.emphasis,
    ]),
  ];
  return keys.map((key) => fontFaces[key]);
}

