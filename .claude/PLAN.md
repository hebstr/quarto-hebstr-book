# PLAN.md : hebstr-book Quarto project template

## Contexte

`hebstr-book` est un **project template Quarto** (pas une format extension) qui scaffolde un projet `book` (`_quarto.yml` + `index.qmd` + structure de chapitres) en référant `hebstr-doc-html` et `hebstr-doc-typst` comme formats. Il consomme l'identité visuelle de `hebstr-doc` par layering SCSS, sans embed.

Repo cible : `git@github.com:hebstr/quarto-hebstr-book` (à créer).

## Dépendance amont : `hebstr-doc`

- Pin minimum : `hebstr/quarto-hebstr-doc@v1.0.0` (release du 2026-04-29).
- API publique consommée : variables SCSS layout-chrome (`$navbar-bg`, `$sidebar-bg`, `$footer-bg`, etc.) + palette brand (`$primary`, etc.). Liste complète dans [hebstr-doc CONTRIBUTING.md](../../quarto-hebstr-doc/CONTRIBUTING.md) et [hebstr-doc README "Composing on top"](../../quarto-hebstr-doc/README.md).
- Pas d'`--embed` : `hebstr-doc` reste installé séparément par le consumer (`quarto add hebstr/quarto-hebstr-doc` puis `quarto use template hebstr/quarto-hebstr-book`). Permet à chaque extension d'évoluer indépendamment ; coût = double install pour le consumer (acceptable, public visé technique).

## Décisions d'architecture héritées

Ne pas dupliquer ici. Les décisions de la famille `hebstr-*` (un repo par cible, pas de mono-repo, pas d'embed croisé, naming `quarto-hebstr-{doc,book,website}`, layering SCSS plutôt que format custom propre, pas de `hebstr-core` séparé tant qu'il n'y a que `hebstr-doc` comme consommateur d'identité) sont actées dans :

- [`~/Documents/pro/packages/quarto-hebstr-doc/.claude/PLAN.md`](../../quarto-hebstr-doc/.claude/PLAN.md), section **"Famille hebstr-* : extension à `hebstr-book` et `hebstr-website`"**.

Si une décision change ici, mettre à jour les deux PLAN.

## État actuel

Repo local créé : `~/Documents/pro/packages/quarto-hebstr-book/`. Rien d'autre encore.

## Roadmap vers v0.1.0 (premier release fonctionnel)

### P0 : scaffolding minimal

- [ ] `git init` (si pas déjà fait) + `.gitignore` (calque sur `hebstr-doc` : `.quarto/`, `_book/`, `_site/`, `*.html`, `*.pdf`, `*.typ`, `*_files/`, R session)
- [ ] `_extensions/hebstr-book/_extension.yml` déclarant `contributes: project` selon [Quarto Project Templates](https://quarto.org/docs/extensions/project.html). Champs minimum : `title`, `author`, `version: 0.1.0`, `quarto-required: ">=1.9.36"` (aligné sur `hebstr-doc`).
- [ ] Template `_quarto.yml` du livre (project type: `book`) référant :
  - `format: hebstr-doc-html` avec layering `theme: { light: [hebstr-doc-html, book-extras.scss], dark: [hebstr-doc-html, book-extras.scss] }`
  - `format: hebstr-doc-typst`
  - book metadata : `title`, `author`, `chapters`, `bibliography` (vers `references.bib`)
- [ ] `index.qmd` : page d'accueil du livre (preface)
- [ ] `chapters/01-introduction.qmd`, `chapters/02-method.qmd`, `chapters/03-conclusion.qmd` : structure démo minimale
- [ ] `references.bib` : placeholder vide ou 2-3 entrées d'exemple
- [ ] `book-extras.scss` : overrides spécifiques livre. Cibles a priori :
  - `#quarto-sidebar` (sidebar de navigation chapitres : largeur, padding, espacement)
  - numérotation chapitres (`.chapter-number` ou Quarto natif)
  - page de couverture si `cover-image:`
  - `.toc-active` du sidebar
- [ ] README minimal calqué sur `hebstr-doc/README.md` (badges CI à venir, install via `quarto use template`, prérequis `hebstr-doc` installé séparément)
- [ ] LICENSE.md (MIT, idem `hebstr-doc`)
- [ ] CHANGELOG.md avec section `[Unreleased]` + `[0.1.0] - <date>`

### P1 : qualité extension publique

- [ ] CI GitHub Actions calquée sur `hebstr-doc` :
  - `render.yml` : push/PR → render le book exemple en HTML + upload artefact
  - `pages.yml` : push main → deploy le book exemple sur `hebstr.github.io/quarto-hebstr-book/`
  - `release.yml` : tag `v*` → GitHub Release auto
- [ ] Tester un install à blanc dans un scratch dir (`mkdir /tmp/scratch && cd /tmp/scratch && quarto add hebstr/quarto-hebstr-doc && quarto use template hebstr/quarto-hebstr-book && quarto render`) pour valider la chaîne complète
- [ ] CONTRIBUTING.md : surface API publique (variables SCSS spécifiques `book-extras.scss`, structure `_quarto.yml` exposée), SemVer, procédure release. Calque sur `hebstr-doc/CONTRIBUTING.md`

### P2 : raffinements

- [ ] `.github/ISSUE_TEMPLATE/` et `pull_request_template.md`
- [ ] Audit accessibilité (focus visible sur navigation chapitres, contraste sidebar, labels ARIA si custom nav)
- [ ] Tests de non-régression visuels (snapshots HTML ou Playwright)
- [ ] Validation render Typst (PDF) du book exemple : vérifier que `hebstr-doc-typst` se compose bien avec le mode `book` Quarto. Si non opérationnel (Typst book mode encore expérimental côté Quarto), documenter limitation dans README.

## Ouvertures (post-v0.1.0)

- **`hebstr-website`** : repo séparé, project template `website` consommant `hebstr-doc-html` (pas de Typst pertinent ici sauf cas spécifique). Scope listé dans le PLAN.md de `hebstr-doc`.
- **Embed `hebstr-doc` dans `hebstr-book`** : changerait le modèle (install one-shot pour le consumer, mais re-release du book à chaque update de doc). À envisager seulement si retour utilisateur indique que la double install est un blocage.

## Pré-requis à valider en cours de scaffolding

L'API SCSS layout-chrome ajoutée à `hebstr-doc` v1.0.0 (`$navbar-{bg,fg,hl}`, `$sidebar-{bg,fg,hl}`, `$footer-{bg,fg}`) n'a pas encore été testée sur un layout projet réel (cf. `hebstr-doc/.claude/PLAN.md` ligne "Tester un consumer minimal" : reportée à ce scaffolding). À cette étape :

- [ ] Vérifier que les valeurs par défaut de `hebstr-doc` produisent un sidebar livre lisible et cohérent visuellement.
- [ ] Lister les variables manquantes (probables : couleur de lien actif dans sidebar, séparateur de section, hover state spécifique). Remonter en MINOR bump dans `hebstr-doc` (pas en local dans `book-extras.scss`) si la variable est générique.
- [ ] Distinguer ce qui est "manque dans `hebstr-doc`" vs "spécifique au book" : si la variable n'aurait pas de sens pour `hebstr-website`, elle reste locale.

## Références

- [Quarto : Project Templates](https://quarto.org/docs/extensions/project.html)
- [Quarto : Books](https://quarto.org/docs/books/)
- [Quarto : Custom Format Extensions](https://quarto.org/docs/extensions/formats.html) (pour rappel du modèle de composition)
- `~/Documents/pro/packages/quarto-hebstr-doc/` : source de l'identité visuelle, surface API publique, conventions de release
- Exemples de project templates Quarto à étudier : [quarto-ext/manuscript-template-rstudio](https://github.com/quarto-ext/manuscript-template-rstudio), [quarto-journals](https://github.com/quarto-journals)
