# Changelog

## [Unreleased]

### Added

- Initial release of `hebstr-book`: a Quarto project template that scaffolds a multi-page book using the `hebstr-doc` visual identity (HTML + Typst).
- Split SCSS theme into base, light, and dark layers (`theme-extras-base.scss`, `theme-extras-light.scss`, `theme-extras-dark.scss`) so light and dark variants can each be overridden independently.
- `_format.yml` (loaded via `metadata-files`) holds all format-level configuration, keeping `_quarto.yml` minimal and focused on book structure.
- Demo content: cover page, three numbered chapters, one appendix, and a bibliography.
