# proposeX

A Valentine's Day proposal website (HTML, CSS, vanilla JS). Works on desktop and mobile browsers.

## Sharing as a link in email

1. **Host the site** so it has a public URL (recipients open the link; don't attach the file).
   - **GitHub Pages:** Push this repo, enable Pages in repo Settings → Pages → source: main branch. Your link will be `https://<username>.github.io/proposeX/`.
   - **Netlify / Vercel:** Drag the project folder (or the single file) into [netlify.com/drop](https://app.netlify.com/drop) or [vercel.com](https://vercel.com) and use the URL they give you.
   - **Single file:** Use `valentine-standalone.html` (everything in one file). Upload it to any static host or paste into a [GitHub Gist](https://gist.github.com) and share the "Raw" link.

2. **Put the URL in the email body**, e.g. "Click here: https://your-link.com". It will open in the recipient's browser (including on phones).

## Mobile

The site is built to work in mobile browsers:

- Responsive layout and touch-friendly buttons
- No external dependencies (except optional images)
- Safe area and viewport meta for notched phones
- Use `valentine-standalone.html` when you need one file to upload

Customize the name and messages in `script.js` (or in the `<script>` block inside `valentine-standalone.html`).
