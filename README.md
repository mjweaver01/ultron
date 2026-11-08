# ultronbrowser.info archive

Live site: https://google-ultron.netlify.app

Local copy of the Internet Archive capture from 2015-03-09:
https://web.archive.org/web/20150309053142/http://ultronbrowser.info/

- `index.html`: the page with asset paths rewritten to work locally
- `index.original.html`: the HTML exactly as captured
- `manifest.json`: each file's source URL, capture timestamp and digest check, plus CSS references the archive never captured

View it with `python3 -m http.server 8000` from this folder, then open http://localhost:8000/.

Third-party copy kept for personal reference. Its text, images and Chrome-derived CSS/JS belong to their original owners.

49 images referenced by the CSS were never captured on ultronbrowser.info and were added from Internet Archive captures of www.google.com. `manifest.json` marks them with `sourcedFrom`.
