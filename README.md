# hebstr-book

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE.md)

A standalone Quarto book extension. Provides the full hebstr visual identity for multi-page HTML books — typography, grid, TOC, callouts, code window — without any dependency on hebstr-doc.

> **Status (v0.2.0)**: stable extension. CI, accessibility audit, and visual regression tests planned for later releases.

## Use the template

```bash
quarto use template hebstr/quarto-hebstr-book
```

This copies the template files into the current directory: `_quarto.yml`, `index.qmd`, `chapters/`, plus the `hebstr-book` extension at `_extensions/hebstr-book/`. Render with:

```bash
quarto render
```

No other extension needs to be installed.

## What's in the box

- `_quarto.yml`: book project config — `project.type: book`, chapter list, and `format: hebstr-book-html: default`. Project-specific format overrides go here under `format.hebstr-book-html:`.
- `_extensions/hebstr-book/_extension.yml`: declares `project.type: book` and `contributes.formats.html` with the full `hebstr-book-html` format — typography, grid, TOC, knitr defaults, callouts, code-window filter.
- `_extensions/hebstr-book/theme-base.scss`: all structural rules plus book-specific chrome (sidebar, search bar, chapter numbering).
- `_extensions/hebstr-book/theme-light.scss`: light palette.
- `_extensions/hebstr-book/theme-dark.scss`: dark palette.
- `_extensions/hebstr-book/fonts/`: self-contained font files (Luciole, Fira Code, Font Awesome). No CDN calls.
- `_extensions/hebstr-book/_extensions/mcanouil/code-window/`: bundled code-window Lua filter.
- `index.qmd` + `chapters/*.qmd` + `references.bib`: minimal demo content. Replace with your own.

## Layout knobs

All `grid:` keys live under `format.hebstr-book-html.grid:` in `_quarto.yml`:

- `sidebar-width: 350px` — chapter navigation sidebar zone (Quarto distributes across 3 sub-columns 20/60/20, so the chapter-link area is roughly 60% of this value).
- `body-width: 1100px` — main content width.
- `margin-width: 350px` — right-margin column (TOC, margin figures, asides).
- `gutter-width: 1rem` — space between columns.

## Versioning

Follows [Semantic Versioning 2.0.0](https://semver.org). Until `v1.0.0`, MINOR bumps may include breaking changes (flagged in the changelog).

## Licence

Code ships under the MIT Licence (see [LICENSE.md](LICENSE.md)).
