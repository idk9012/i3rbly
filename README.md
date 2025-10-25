# i3rbly – Static HTML/CSS/JS Frontend

A lightweight, fully static version of the i3rbly site (no React/Vite). It keeps the same look-and-feel, animations, pages, and AdSense integration using plain HTML, CSS, and JavaScript.

## Tech
- HTML pages in the repo root (e.g. `index.html`, `blog.html`, `tool.html`, …)
- Global styles: `assets/styles.css`
- Global JS: `assets/app.js` (nav/mobile, parallax, API helpers for demo data, AdSense init, blog + tool logic)
- SEO/static files: `public/` (robots, sitemap, manifest, sw.js, etc.)

## Project structure
```
.
├─ assets/
│  ├─ app.js          # site JS (nav, parallax, blog/tool logic, AdSense, SW register)
│  └─ styles.css      # site CSS (layout, components, animations)
├─ public/
│  ├─ _redirects      # extra Netlify redirects (kept for reference)
│  ├─ logo.png        # app icon
│  ├─ manifest.json   # PWA manifest
│  └─ sw.js           # service worker (optional)
├─ _redirects         # root redirects (used by Netlify when publish=.)
├─ netlify.toml       # Netlify configuration (publish=.)
├─ index.html         # home
├─ tool.html          # parsing tool UI
├─ blog.html          # blog list (mock data)
├─ blog-post.html     # blog post page (via ?id= or /blog/:id on Netlify)
├─ about.html         # about us
├─ contact.html       # contact
├─ privacy.html       # privacy policy
└─ terms.html         # terms
```

## Getting started (local)
- Quick open: double‑click `index.html` in a browser.
- Or serve with a tiny HTTP server (recommended for clean routing):
  - Node: `npx serve .` or `npx http-server .`
  - Python: `python -m http.server 8080`

## Configuration
- AdSense: update the slot ID in the inline blocks on each page:
  - Look for `<ins class="adsbygoogle" ... data-ad-slot="9023456789" ...>` and replace the value with your real slot.
  - The AdSense script is injected once by `assets/app.js` and will auto‑push all slots.
- API endpoints: `assets/app.js` has a tiny mock for blog posts and a configurable base URL if you later connect a backend.

## Deployment
### Netlify (recommended)
This repo already includes settings for pretty URLs and blog post routes:
- `netlify.toml` → `publish = "."` (repo root)
- Root `_redirects`:
  - `/about  /about.html 200`, `/tool /tool.html 200`, `/blog /blog.html 200`, `/blog/:id /blog-post.html 200`, etc.

Steps
1) Push to GitHub and create a Netlify site from the repo.
2) In Site settings → Build & deploy:
   - Publish directory: `/` (i.e. the repository root)
   - Build command: empty (static)
3) Deploy. Visit `/`, `/about`, `/tool`, `/blog`, `/blog/1` …

If you ever see a blank page, hard refresh twice (Ctrl+Shift+R). The service worker caches pages for offline; you can disable SW by removing its registration code in `assets/app.js` or deleting `public/sw.js`.

### GitHub Pages
- GitHub Pages doesn’t read Netlify‑style redirects. Use direct `.html` links (e.g. `/about.html`) or add a custom 404‑based router if you need pretty URLs.

### Vercel
- Add rewrites in `vercel.json` similar to `_redirects` rules to map pretty URLs to `.html` files.

## Editing notes
- All navigation links are relative. The highlighted CTA in the nav (“أعربلي”) uses class `nav-cta` with a glow animation.
- Ads blocks use class `ad-placeholder` with a responsive style and auto‑init via `assets/app.js`.

## License
MIT