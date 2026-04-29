# Changelog

## [Unreleased]

### Added

- Initial scaffolding of `hebstr-book` as a Quarto project template extension:
  `_extensions/hebstr-book/_extension.yml` (`contributes.project.project.type: book`,
  `quarto-required: ">=1.9.36"`), `_quarto.yml` template, `index.qmd`,
  three demo chapters, `references.bib`, MIT licence, `.gitignore`,
  `.quartoignore`.
- `_extensions/hebstr-book/extras.scss`: book-specific SCSS overrides on
  top of `hebstr-doc`. Currently resets `#title-block-header .title` to
  `justify-content: flex-start` so the chapter number and title sit next
  to each other (hebstr-doc's `space-between` is correct for single-doc but
  pushes the two H1 spans to opposite ends in a book).
- `_extensions/hebstr-book/restore-toggle.html`: counter-script that runs
  after `hebstr-doc`'s `toggle-position.html` and moves the colour-scheme
  toggle back to the sidebar. Quarto cannot disable `include-after-body`
  from the consumer (append-merge), so the workaround is layered.
- `_quarto.yml` template ships the full set of overrides required to
  consume `hebstr-doc` from a book context: `page-layout: article`
  (vs `full`), `embed-resources: false` (vs `true`), `grid.sidebar-width`
  (vs `0`), `include-after-body: [restore-toggle.html]`. Each is documented
  inline with a comment explaining why.
- Theme layering on top of `hebstr-doc` declared in `_quarto.yml` with
  explicit paths under `_extensions/hebstr-doc/`. The reference pattern in
  `hebstr-doc/README.md` "Composing on top" uses bare file names that
  Quarto does not resolve against the extension directory; explicit paths
  are required.

### Notes

- Empirical finding (Quarto 1.9.37): a Quarto project template extension's
  `contributes.project.format.<name>` does not propagate `theme`,
  `page-layout`, `embed-resources`, `grid.sidebar-width`, or
  `include-after-body` to the consumer's `_quarto.yml` at render time.
  Only `project.type` and top-level `grid.body-width`/`margin-width`/
  `gutter-width` propagate. Consequence: all format-level configuration
  lives in the consumer's `_quarto.yml` rather than in `_extension.yml`,
  reducing the `_extension.yml` to its minimum (`project.type: book`).

## [0.1.0] - TBD
