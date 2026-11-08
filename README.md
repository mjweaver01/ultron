# Google Ultron

Live site: https://google-ultron.netlify.app

Used by NASA, powered by Adobe Reader.

A new and improved version of ultronbrowser.info, the parody of Google's Chrome page inspired by the greentext in [`ultron-origins.jpg`](ultron-origins.jpg). It started from the [Internet Archive capture of 2015-03-09](https://web.archive.org/web/20150309053142/http://ultronbrowser.info/) and is now maintained as a living site.

## What's new

- Responsive layouts for phones and tablets
- A hero logo that scales and centers to fit the screen
- A mobile menu that opens reliably with one tap
- 49 images the original site never had, restored from Internet Archive captures of www.google.com

## Project layout

- `index.html`: the site
- `responsive.css` and `responsive.js`: the phone and tablet layer, loaded on top of the original styles and scripts
- `intl/`: the original Chrome-derived CSS, JS and images
- `index.original.html`: the HTML exactly as captured in 2015
- `manifest.json`: where each archived file came from

## Run it locally

From this folder, run `python3 -m http.server 8000`, then open http://localhost:8000/.

## Credits

This is a parody and is not affiliated with or endorsed by Google, NASA or Adobe. The original site's text and images, and the Chrome-derived CSS, JS and images, belong to their original owners.
