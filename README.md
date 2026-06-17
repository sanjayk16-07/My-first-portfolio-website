# Sanjay.K | Portfolio

A single-page, editable personal portfolio (Home, About, Education, Skills & Certs, Extracurricular, Dashboard) built with plain HTML/CSS/JS. Content is editable in-browser ("Edit" pencil button, bottom-right) and persisted to `localStorage`.

## Files
- `index.html` — markup for all sections
- `styles.css` — theme variables (light/dark) + layout
- `script.js` — state management, routing, edit mode
- `profile_placeholder.png` — default avatar shown until you upload your own photo

## Run locally
Just open `index.html` in a browser, or serve it:

```bash
npx serve .
# or
python3 -m http.server 8080
```

## VS Code
1. Open this folder in VS Code (`File > Open Folder`)
2. Install the "Live Server" extension (optional) and click "Go Live", or use the run commands above

## Push to GitHub
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```
