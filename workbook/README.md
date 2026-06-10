# Slumbor — 14-Night Sleep Reset workbook (PDF source)

Print-ready, pen-fillable 24-page workbook. The customer's first post-purchase
brand touch and the tangible "$29 value" bonus.

## Files
- `build.mjs` — generates `workbook.html` (all 24 pages, programmatic so the 14
  nightly pages share one template and prose keeps its exact line-break rhythm).
- `workbook.html` — the rendered HTML (build output, safe to hand to a designer).
- `fonts.css` + `fonts/` — Fraunces (headers) and Inter (body), localized from
  Google Fonts so they embed identically in the PDF.
- Final PDF lives at `../public/workbook/slumbor-14-night-reset.pdf`
  (served at `/workbook/slumbor-14-night-reset.pdf`).

## Brand system
- Colors: midnight `#0E1626`, cream `#F2EDE4`, amber `#D4A574`, ink `#2A2620`.
- Dark pages: cover + back cover. Light cream pages: everything else (printable,
  pen-fillable, low ink).
- US Letter portrait, `@page` margin 0, full-bleed backgrounds, `print-color-adjust:exact`.

## Rebuild
```
node workbook/build.mjs
# then render with headless Chrome:
"C:/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu \
  --no-pdf-header-footer \
  --print-to-pdf="<abs path>/public/workbook/slumbor-14-night-reset.pdf" \
  "file:///<abs path>/workbook/workbook.html"
```

## Verify a single page visually
Append `#only=N` (1-based) to the HTML URL and screenshot at 816x1056 to inspect
one page in isolation. Has no effect on the PDF render (no hash = all pages show).

## Notes
- Text is real/selectable, not images. Fonts are subset-embedded by Chrome.
- Interactive AcroForm fields are not included (hand-fill is the priority per the
  brief). If digital fill is wanted later, overlay form fields with `pdf-lib`.
