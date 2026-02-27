# Garg Jewellers – Assets

Add your brand assets from **garg- colour,typo,logo.pdf** here:

| File          | Use |
|---------------|-----|
| `logo.png`    | Main logo in the header (transparent PNG recommended). If missing, "Garg Jewellers" text is shown. |
| `hero-banner.jpg` | Hero banner background (e.g. 1920×800px). If missing, a gradient is used. |

**Font (Exodus)**  
The PDF specifies **Exodus** as the font. To use it:

1. Export or obtain Exodus in web format (e.g. `.woff2`).
2. Save as `assets/Exodus.woff2` (or `.woff`).
3. In `styles.css`, uncomment the `@font-face` block at the top and set `--font-heading` to `'Exodus', serif`.

Until then, the site uses Cormorant Garamond as a similar premium serif for headings.
