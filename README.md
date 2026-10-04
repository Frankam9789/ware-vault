# Ware Vault

Marketing website for **Ware Vault**, a fulfilment service that stores stock and manages shipping for online businesses.

It's a plain static site (HTML, CSS and a little JavaScript) with no build step.

## Run it locally

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Before going live

- The contact email is set in `index.html` and `script.js`. A phone number can be added to the contact section later.
- The quote form opens the visitor's email app. To collect submissions directly, point it at a form service (e.g. Formspree, Netlify Forms) instead.

## Deploy

Any static host works: GitHub Pages, Netlify, Vercel, Cloudflare Pages. For GitHub Pages, enable Pages in the repo settings and serve from the root of the main branch.
