# Changelog

## [Unreleased]

### Added

- `hebstr-book` is now a standalone Quarto book theme extension — no dependency on `hebstr-doc`.
- Self-contained fonts: Luciole, Fira Code, Font Awesome (copied into `_extensions/hebstr-book/fonts/`).
- Embedded `mcanouil/code-window` filter (`_extensions/hebstr-book/_extensions/mcanouil/code-window/`) for code block window chrome.
- Demo content: cover page, three numbered chapters, one appendix.

### Changed

- `_extension.yml` now contributes the full `hebstr-book-html` format via `contributes.formats.html` (typography, grid, TOC, knitr defaults, code-fold, callouts, code-window).
- SCSS consolidated from six files to three: `theme-light.scss` (light palette), `theme-dark.scss` (dark palette), `theme-base.scss` (all rules, including book-specific sidebar and search styles).
### Removed

- `theme-extras-base.scss`, `theme-extras-light.scss`, `theme-extras-dark.scss` — merged into the three consolidated theme files.
- `restore-toggle.html` — no longer needed; the colour-scheme toggle stays in the sidebar by default without the `hebstr-doc` toggle-position script.
- Dependency on `hebstr-doc`: the format and visual identity are fully embedded in `hebstr-book`.
- `_format.yml` — project-level format overrides now go directly under `format.hebstr-book-html:` in `_quarto.yml`.
- `references.bib` — demo content no longer includes a bibliography chapter.
