# Google Ultron

Live site: https://google-ultron.netlify.app

Used by NASA, powered by Adobe Reader.

Google Ultron is a parody of Google's Chrome landing page, born from the greentext in [`ultron-origins.jpg`](src/assets/images/masters/ultron-origins.jpg): the IT guy who told a coworker his favourite browser was "Google Ultron", shook the mouse, opened Task Manager, and declared it installed.

The first Google Ultron site, ultronbrowser.info, was a copy of the 2015 Chrome page with the words changed. It went offline years ago and survives only as an [Internet Archive capture](https://web.archive.org/web/20150309053142/http://ultronbrowser.info/). This site is its successor: built in the same spirit, with the same jokes and the original artwork, but as a new site of its own. It mirrors the layout of today's Chrome page, the way the original mirrored the Chrome page of its day, and everything here is written from scratch and served from this repo.

## What's here

- A layout that mirrors the current Chrome landing page, so the parody lands on sight again: big cycling hero word, rounded feature cards, Fast / AI / Ask / Safe / Yours / By NASA / FAQ sections
- Features that actually work: Download more RAM (auto-plays), Pink mode, Bypass mode, Safety Check, and Ask, the built-in AI that types out "It's what NASA uses"
- The Download Ultron button runs the greentext install: the cursor shakes, Task Manager flashes, "There. You go. All done."
- The original greentext on the page at last, in "Our story"
- Ultron for Chromecast, because of course
- Responsive layouts for phones and tablets
- The original artwork, enlarged with EDSR super-resolution and served as responsive AVIF/WebP with PNG fallbacks, so every device gets a sharp image at the right size
- No third-party scripts, fonts, trackers or widgets: everything is served from this repo
- Alt text, keyboard-friendly controls and support for reduced-motion settings

## Stack

- [Bun](https://bun.sh) for scripts and packages
- [Vite](https://vite.dev) for the dev server and build
- [Biome](https://biomejs.dev) for formatting and linting
- [sharp](https://sharp.pixelplumbing.com) to generate the responsive image set
- Plain HTML, CSS and JavaScript; no framework

## Develop

```sh
bun install
bun run dev       # generates images, then serves src/ with live reload
bun run build     # generates images, then builds to dist/
bun run preview   # serves the built dist/
bun run lint      # Biome check
bun run format    # Biome format --write
bun run images    # regenerate public/img from the masters (also runs before dev and build)
```

Netlify runs `bun run build` and publishes `dist/` (see `netlify.toml`).

## Project layout

- `src/index.html` and `src/chromecast.html`: the pages
- `src/styles/site.css`: layout, themes and modes; `src/styles/hero.css`: the hero animation
- `src/scripts/site.js`: hero word cycling and sizing, the menu, and all the interactive features
- `src/assets/images/masters/`: the full-size source images; everything in `public/img/` is generated from these
- `src/assets/fonts/`: self-hosted Open Sans, under the SIL Open Font License (see the LICENSE file there)
- `scripts/images.mjs`: the image pipeline (sizes, formats, and a `manifest.json` of what it produced)
- `archive/`: the original site's HTML as captured in 2015, saved as text so it can't run, and a record of where its files came from. Kept for reference; nothing on the live site loads from it.

## Credits

Google Ultron is a parody and is not affiliated with or endorsed by Google, NASA or Adobe. The jokes and artwork carried over from ultronbrowser.info belong to whoever made them; the greentext belongs to its anonymous author. Open Sans is used under the SIL Open Font License.
