# Google Ultron

Live site: https://google-ultron.netlify.app

Used by NASA, powered by Adobe Reader.

A new and improved version of ultronbrowser.info, the parody of Google's Chrome page inspired by the greentext in [`ultron-origins.jpg`](ultron-origins.jpg). It started from the [Internet Archive capture of 2015-03-09](https://web.archive.org/web/20150309053142/http://ultronbrowser.info/) and is now maintained as a living site.

## What's new

- Features that actually work: Pink mode, Bypass mode and Download RAM
- Ultron for Chromecast, because of course
- Responsive layouts for phones and tablets
- Redrawn feature art that stays sharp at any size
- No third-party scripts, fonts, trackers or widgets: everything is served from this repo
- Alt text and support for reduced-motion settings

## Project layout

- `index.html` and `chromecast.html`: the pages
- `css/site.css`: layout, themes and modes
- `css/hero.css`: the hero animation
- `js/site.js`: hero sizing, the menu, and the interactive features
- `images/`: the logo, hero art and `features/` illustrations
- `fonts/`: self-hosted Open Sans, under the SIL Open Font License (see `fonts/LICENSE`)
- `archive/`: the HTML as captured in 2015, saved as text so it can't run, and a record of where the archived files came from

## Run it locally

From this folder, run `python3 -m http.server 8000`, then open http://localhost:8000/.

## Credits

This is a parody and is not affiliated with or endorsed by Google, NASA or Adobe. The original site's text and images belong to their original owners.
