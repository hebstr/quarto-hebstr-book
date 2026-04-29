# hebstr-book

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE.md)

A Quarto **project template** that scaffolds a book using the [`hebstr-doc`](https://github.com/hebstr/quarto-hebstr-doc) visual identity (HTML + Typst). Layers a small `extras.scss` on top of the shared theme for book-specific chrome (sidebar, chapter numbering, cover).

> **Status (v0.1.0)**: scaffolding only. CI, accessibility audit, and visual regression tests planned for later releases.

## Prerequisites

`hebstr-book` references `hebstr-doc` as a format extension; both must be installed in the consumer's project.

```bash
quarto add hebstr/quarto-hebstr-doc
```

To pin:

```bash
quarto add hebstr/quarto-hebstr-doc@v1.0.0
```

## Use the template

```bash
quarto use template hebstr/quarto-hebstr-book
```

This copies the template files into the current directory: `_quarto.yml`, `index.qmd`, `chapters/`, `references.bib`, plus the `hebstr-book` extension at `_extensions/hebstr-book/`. Render with:

```bash
quarto render
```

## What's in the box

- `_quarto.yml`: book project. Holds **all** format-level configuration — book metadata, chapter list, `format.hebstr-doc-html` (theme layering, `page-layout`, `embed-resources`, `grid`, `include-after-body`), and `format.hebstr-doc-typst`. See "Why everything lives in `_quarto.yml`" below.
- `_extensions/hebstr-book/_extension.yml`: declares `project.type: book` so `quarto use template` scaffolds the right project type. Nothing else — see below.
- `_extensions/hebstr-book/extras.scss`: book-specific SCSS overrides on top of `hebstr-doc`. Currently fixes the chapter H1 alignment and is loaded last in the SCSS chain so its `scss:defaults` win.
- `_extensions/hebstr-book/restore-toggle.html`: counter-script that moves the colour-scheme toggle back to the sidebar after `hebstr-doc`'s `toggle-position.html` displaces it into the chapter H1.
- `index.qmd` + `chapters/01-03-*.qmd` + `references.bib`: minimal demo content. Replace with your own.

## Why everything lives in `_quarto.yml`

A Quarto project template extension declares defaults under `contributes.project` in its `_extension.yml`. In theory, format-level options placed there merge into the consumer's `_quarto.yml` at render time, so structural updates can flow in via `quarto update` without touching the consumer's editable files.

In practice (validated 2026-04-30 against Quarto 1.9.37), most format-level keys do **not** propagate from a project template extension. Only `project.type` and the top-level `grid:` keys `body-width` / `margin-width` / `gutter-width` reach the rendered output. The following do **not** propagate from `contributes.project.format.<name>:` and must live in the consumer's `_quarto.yml`:

- `theme:` (SCSS layering)
- `page-layout:`
- `embed-resources:`
- `grid.sidebar-width`
- `include-after-body:`

For consistency we keep all format-level configuration in `_quarto.yml`, including the keys that would propagate. The `_extension.yml` is therefore minimal.

## hebstr-doc → hebstr-book overrides

`hebstr-doc` is calibrated for single-document HTML. A book consumer must override the following in `_quarto.yml` to get a working multi-page book:

- `page-layout: article` — `hebstr-doc` defaults to `full`, which puts main content in `.column-page-right` and lets it spill into the right margin. A book needs main content confined to `body-content`.
- `embed-resources: false` — `hebstr-doc` defaults to `true` for self-contained single-document output. In a book, `embed-resources: true` triggers Pandoc to inline sibling chapter HTMLs (Previous/Next nav), producing `Could not fetch ../chapters/X.html` warnings on every render and bloating each chapter HTML to multi-MB.
- `grid.sidebar-width: 350px` (or any non-zero value) — `hebstr-doc` defaults to `0` because single-doc has no chapter sidebar. A book needs a visible chapter navigation sidebar.
- `include-after-body: [_extensions/hebstr-book/restore-toggle.html]` — `hebstr-doc` ships `toggle-position.html` which JS-moves the colour-scheme toggle from the sidebar into the chapter H1. Quarto cannot disable `include-after-body` from the consumer (append-merge), so the book template adds a counter-script that runs after and restores the toggle to the sidebar.

The template `_quarto.yml` ships these four overrides with comments explaining each. Tweak the grid widths, theme paths, or `extras.scss` content to taste; do not remove the overrides without understanding the consequences.

## Layering pattern

The SCSS theme layering in `_quarto.yml`:

```yaml
format:
  hebstr-doc-html:
    theme:
      light:
        - _extensions/hebstr-doc/theme-light.scss
        - _extensions/hebstr-doc/theme-base.scss
        - _extensions/hebstr-book/extras.scss
      dark:
        - _extensions/hebstr-doc/theme-dark.scss
        - _extensions/hebstr-doc/theme-base.scss
        - _extensions/hebstr-book/extras.scss
```

Both halves of `theme:` must be redeclared — overriding only one drops the other variant. `extras.scss` goes **last** so its `scss:defaults` win over the preceding files (opposite of the standard Bootstrap convention; cf. [hebstr-doc README → Deeper SCSS overrides](https://github.com/hebstr/quarto-hebstr-doc#deeper-scss-overrides)).

Base SCSS files are referenced by **explicit path** under `_extensions/hebstr-doc/` because Quarto resolves bare file names against the consumer's project root, not the extension directory.

## Layout knobs

All four `grid:` keys live under `format.hebstr-doc-html.grid:` in `_quarto.yml`:

- `sidebar-width: 350px` — chapter navigation sidebar zone (Quarto distributes across 3 sub-columns 20/60/20, so the chapter-link area is roughly 60% of this value).
- `body-width: 1100px` — main content width.
- `margin-width: 350px` — right-margin column (TOC, margin figures, asides).
- `gutter-width: 1rem` — space between columns.

## Versioning

Follows [Semantic Versioning 2.0.0](https://semver.org). Until `v1.0.0`, MINOR bumps may include breaking changes (flagged in the changelog).

## Licence

Code ships under the MIT Licence (see [LICENSE.md](LICENSE.md)).
