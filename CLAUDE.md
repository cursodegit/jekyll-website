# CLAUDE.md

Jekyll site for **cursodegit.com**, an advanced git course in Spanish. It contains the marketing pages, the reveal.js slides, and the hands-on workshops ("talleres"). All content is in **Spanish**. Write new content in Spanish and keep the existing tone.

## Development

- **Nix (preferred locally):** `.envrc` runs `use flake`, and `flake.nix` provides Ruby 4.0.9 pinned via `nixpkgs-ruby`, plus imagemagick and pkg-config for `rmagick`/`jekyll-responsive-image`, git and jujutsu.
  ```bash
  bundle install
  bundle exec jekyll serve --watch   # http://localhost:4000
  bundle exec jekyll build           # output in _site/
  ```
- **Docker (alternative):** `compose.yaml` and `Dockerfile` use Ruby 3.4.7. See `README.md` (`bin/build-development.fish`, `docker-compose up`).
- `_config.yml` is not hot-reloaded, so restart the server after you edit it.
- There are no tests. A clean `jekyll build` is the check.

## Version control

If a `.jj` directory is present (it is here, colocated with git), prefer `jj` commands over git (`jj st`, `jj diff`, `jj describe`, `jj new`). Commit messages are in Spanish, imperative mood (e.g. "Versión go del taller 4.4", "Corrige diapositivas y typos").

## Layout

- `index.html`, `curso-de-git-avanzado-*.html`, `sobre-nosotros.html`, `contacto.html`, `politica-*.html`: marketing/legal pages (layout `home`/`page`).
- `_layouts/`: `default`, `home`, `page`, `post`, `lab` (workshops), `documentation-page`, `revealjs` (slides).
- `_includes/`: shared partials. `alert_box.html` (`content=`) and `video.html` (`video=` path without extension) are used inside workshops.
  - `_includes/talleres/`: reusable workshop snippets (Java/Eclipse).
  - `_includes/talleres/go/`: reusable workshop snippets (Go/VS Code).
- `docs/talleres/`: workshops. Each one comes in two variants:
  - `taller-X-Y-java-eclipse.md`: the original Java + Eclipse version.
  - `taller-X-Y-go-vscode.md`: the newer Go + VS Code version. Recent work ports the Java workshops to Go.
  - `docs/talleres/go/PLAN.md`: the commit-by-commit plan for the Go "github-client" project the workshops build.
  - `docs/talleres/img/`: images. `docs/talleres/video/*` is stored in **git LFS**.
- `assets/zipfiles/talleres/go/github-client-taller-X-Y.zip`: starting/ending project snapshots linked from the workshops.
- `assets/video/talleres/...`: workshop videos.
- `docs/diapositivas/NNNN-modulo/`: reveal.js slide decks. Each `index.md` (layout `revealjs`) contains `<section data-markdown="file.md" data-separator="^------" data-separator-vertical="^\^\^\^\^\^\^">` blocks. Slide files use `------` for horizontal splits, `^^^^^^` for vertical splits, and `Notes:` for speaker notes. reveal.js itself lives in `docs/diapositivas/{dist,plugin}`; don't edit vendored files.
- `docs/instalacion-*`: installation guides.

## Workshop conventions

- Front matter: `layout: lab`, `title: "Taller X.Y: ..."`.
- Structure: H1 title with the variant, e.g. `(version go con Visual Studio Code)`, then `## Índice` with a kramdown `{:toc}`, followed by `## Descarga`, `## Requisitos` and `## Objetivos`, then the steps.
- Internal links always use `{% link path/to/file %}` so the build fails on broken links.
- When porting Java to Go, mirror the structure of the Java version and swap Eclipse/Java specifics for VS Code/Go. Keep the git content identical.

## Deployment

Production is an nginx image (`Dockerfile_production`, multi-stage: jekyll build, then `nginx:alpine`) running on Google Cloud Run (project `web-cursodegit-com`, region `europe-west1`). The steps are `bin/build.sh`, then `bin/push.sh`, then `bin/deploy-latest.sh` (podman + gcloud).

- `default.conf`: nginx config. `/docs/diapositivas` and `/docs/talleres` are protected with basic auth using `htpasswd`.
- `htpasswd` holds the basic-auth credentials for the course material.
- To keep files out of the Jekyll build, add them to `exclude:` in `_config.yml`.
