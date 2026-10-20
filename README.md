# chwicklund.com

Portfolio of Charles Wicklund, built with React + Vite and deployed to GitHub Pages.

## Editing the site

**Every word on the site lives in [`src/content/site.json`](src/content/site.json).** Change it, save, and the dev server updates.

- `hero.frames` — the photographs the first screen picks from (a random one each visit). Captions come from `captions`.
- `projects.items` — one entry per project. `stage` is what shows in the fixed half beside it:
  - `{ "kind": "shot", "src": "/img/projects/…webp", "width", "height", "alt", "caption" }` for a screenshot
  - `{ "kind": "code", "code": "…", "caption" }` for a code fragment
  - `{ "kind": "table", "rows": [["label", "value"], …], "caption" }` for a settings table
  - `{ "kind": "self", "caption" }` shows this site's own JSON
- `photos.items` — the drag row, in order. Portrait photos become tall frames; landscapes pair up or run wide.
- `stages` — the photographs beside About and Contact.

## Colours

The palette (Rose) is set in [`scripts/build-palettes.py`](scripts/build-palettes.py). Change a colour there and run `python3 scripts/build-palettes.py`: it checks that the cream text still reads on every ground and rewrites `src/palettes.css`.

## Adding a photograph

1. Put the full-size original in `photos/` (keep the file name: it is how the JSON refers to it).
2. Run `npm run images`. This writes web-sized copies to `public/img/` and their sizes to `src/content/images.json`.
3. Add `{ "file": "<name without extension>", "alt": "…" }` to `photos.items` in `site.json`.

## Commands

- `npm install`, then `npm run dev` for local development
- `npm run build` outputs to `dist/` (with a `404.html` copy, so old links like `/photos.html` still land on the right section)
- `npm run images` after adding or replacing a photo (also rebuilds the link-preview image `public/og.jpg`)

## Deploying

Pushing to `master` builds and publishes the site through [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

One-time switch: the repo's Pages used to publish the `master` branch as-is. In **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions** (or run `gh api -X PUT repos/chwicklund/chwicklund/pages -f build_type=workflow`). The custom domain and HTTPS certificate stay as they are.
