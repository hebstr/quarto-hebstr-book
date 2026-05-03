# hebstr-book

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE.md)

A Quarto **project template** that scaffolds a book using the [`hebstr-doc`](https://github.com/hebstr/quarto-hebstr-doc) visual identity (HTML + Typst). Layers SCSS theme overrides on top of the shared theme for book-specific chrome (sidebar, chapter numbering, cover).

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

This copies the template files into the current directory: `_quarto.yml`, `index.qmd`, `chapters/`, `references.bib`, plus the `hebstr-book` extension at `_extensions/hebstr/hebstr-book/`. Render with:

```bash
quarto render
```

## What's in the box

- `_quarto.yml`: book project config — `project.type: book`, chapter list, bibliography, and `metadata-files: [_format.yml]` pointer.
- `_format.yml`: all format-level configuration — `format.hebstr-doc-html` (theme layering, `page-layout`, `embed-resources`, `grid`, `include-after-body`). See "Why format config is not in `_extension.yml`" below.
- `_extensions/hebstr/hebstr-book/_extension.yml`: declares `project.type: book` so `quarto use template` scaffolds the right project type. Nothing else — see below.
- `_extensions/hebstr/hebstr-book/theme-extras-base.scss`: book-specific SCSS overrides shared across light and dark themes (sidebar background, H1 chapter alignment, search bar base styles).
- `_extensions/hebstr/hebstr-book/theme-extras-light.scss` / `theme-extras-dark.scss`: theme-specific overrides (e.g. `color-mix` tints for search bar border differ between light and dark).
- `_extensions/hebstr/hebstr-book/restore-toggle.html`: counter-script that moves the colour-scheme toggle back to the sidebar after `hebstr-doc`'s `toggle-position.html` displaces it into the chapter H1.
- `index.qmd` + `chapters/*.qmd` + `references.bib`: minimal demo content. Replace with your own.

## Why format config is not in `_extension.yml`

A Quarto project template extension declares defaults under `contributes.project` in its `_extension.yml`. In theory, format-level options placed there merge into the consumer's `_quarto.yml` at render time, so structural updates can flow in via `quarto update` without touching the consumer's editable files.

In practice (validated 2026-04-30 against Quarto 1.9.37), most format-level keys do **not** propagate from a project template extension. Only `project.type` and the top-level `grid:` keys `body-width` / `margin-width` / `gutter-width` reach the rendered output. The following do **not** propagate from `contributes.project.format.<name>:` and must live in the consumer's `_quarto.yml`:

- `theme:` (SCSS layering)
- `page-layout:`
- `embed-resources:`
- `grid.sidebar-width`
- `include-after-body:`

For consistency we keep all format-level configuration in `_format.yml` (a `metadata-files` split of `_quarto.yml`), including the keys that would propagate. The `_extension.yml` is therefore minimal.

## hebstr-doc → hebstr-book overrides

`hebstr-doc` is calibrated for single-document HTML. A book consumer must override the following (in `_format.yml`) to get a working multi-page book:

- `page-layout: article` — `hebstr-doc` defaults to `full`, which puts main content in `.column-page-right` and lets it spill into the right margin. A book needs main content confined to `body-content`.
- `embed-resources: false` — `hebstr-doc` defaults to `true` for self-contained single-document output. In a book, `embed-resources: true` triggers Pandoc to inline sibling chapter HTMLs (Previous/Next nav), producing `Could not fetch ../chapters/X.html` warnings on every render and bloating each chapter HTML to multi-MB.
- `grid.sidebar-width: 350px` (or any non-zero value) — `hebstr-doc` defaults to `0` because single-doc has no chapter sidebar. A book needs a visible chapter navigation sidebar.
- `include-after-body: [_extensions/hebstr/hebstr-book/restore-toggle.html]` — `hebstr-doc` ships `toggle-position.html` which JS-moves the colour-scheme toggle from the sidebar into the chapter H1. Quarto cannot disable `include-after-body` from the consumer (append-merge), so the book template adds a counter-script that runs after and restores the toggle to the sidebar.

The template ships these four overrides (in `_format.yml`) with comments explaining each. Tweak the grid widths, theme paths, or `theme-extras-*.scss` content to taste; do not remove the overrides without understanding the consequences.

## Layering pattern

The SCSS theme layering in `_format.yml`:

```yaml
format:
  hebstr-doc-html:
    theme:
      light:
        - _extensions/hebstr/hebstr-doc/theme-base.scss
        - _extensions/hebstr/hebstr-doc/theme-light.scss
        - _extensions/hebstr/hebstr-book/theme-extras-base.scss
        - _extensions/hebstr/hebstr-book/theme-extras-light.scss
      dark:
        - _extensions/hebstr/hebstr-doc/theme-base.scss
        - _extensions/hebstr/hebstr-doc/theme-dark.scss
        - _extensions/hebstr/hebstr-book/theme-extras-base.scss
        - _extensions/hebstr/hebstr-book/theme-extras-dark.scss
```

Both halves of `theme:` must be redeclared — overriding only one drops the other variant. The `theme-extras-*` files go **last** so their `scss:defaults` win over the preceding files (opposite of the standard Bootstrap convention; cf. [hebstr-doc README → Deeper SCSS overrides](https://github.com/hebstr/quarto-hebstr-doc#deeper-scss-overrides)).

Base SCSS files are referenced by **explicit path** under `_extensions/hebstr/hebstr-doc/` because Quarto resolves bare file names against the consumer's project root, not the extension directory.

## Layout knobs

All four `grid:` keys live under `format.hebstr-doc-html.grid:` in `_format.yml`:

- `sidebar-width: 350px` — chapter navigation sidebar zone (Quarto distributes across 3 sub-columns 20/60/20, so the chapter-link area is roughly 60% of this value).
- `body-width: 1100px` — main content width.
- `margin-width: 350px` — right-margin column (TOC, margin figures, asides).
- `gutter-width: 1rem` — space between columns.

## Versioning

Follows [Semantic Versioning 2.0.0](https://semver.org). Until `v1.0.0`, MINOR bumps may include breaking changes (flagged in the changelog).

## Licence

Code ships under the MIT Licence (see [LICENSE.md](LICENSE.md)).
