# Google Ultron

Live site: https://google-ultron.netlify.app

Used by NASA, powered by Adobe Reader.

A new and improved version of ultronbrowser.info, the parody of Google's Chrome page inspired by the greentext in [`ultron-origins.jpg`](ultron-origins.jpg). It started from the [Internet Archive capture of 2015-03-09](https://web.archive.org/web/20150309053142/http://ultronbrowser.info/) and is now maintained as a living site.

## What's new

- A layout that mirrors the current Chrome landing page, so the parody lands on sight again: big cycling hero word, rounded feature cards, Fast / AI / Ask / Safe / Yours / By NASA / FAQ sections
- Features that actually work: Download more RAM (auto-plays), Pink mode, Bypass mode, Safety Check, and Jitterbug, the AI assistant that types out "It's what NASA uses"
- The Download Ultron button runs the greentext install: the cursor shakes, Task Manager flashes, "There. You go. All done."
- The original greentext on the page at last, in "Our story"
- Ultron for Chromecast, because of course
- Responsive layouts for phones and tablets
- The original feature icons, kept at their native size
- No third-party scripts, fonts, trackers or widgets: everything is served from this repo
- Alt text, keyboard-friendly controls and support for reduced-motion settings

## Project layout

- `index.html` and `chromecast.html`: the pages
- `css/site.css`: layout, themes and modes
- `css/hero.css`: the hero animation
- `js/site.js`: hero word cycling and sizing, the menu, and all the interactive features
- `images/`: the logo, hero art, `features/` icons and the QR code
- `fonts/`: self-hosted Open Sans, under the SIL Open Font License (see `fonts/LICENSE`)
- `archive/`: the HTML as captured in 2015, saved as text so it can't run, and a record of where the archived files came from

## Run it locally

From this folder, run `python3 -m http.server 8000`, then open http://localhost:8000/.

## Credits

This is a parody and is not affiliated with or endorsed by Google, NASA or Adobe. The original site's text and images belong to their original owners.
