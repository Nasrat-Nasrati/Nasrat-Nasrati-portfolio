# Nasrat Nasrati Portfolio (Single Page Application)

This repository contains a professional single-page React portfolio (CDN-based, no build step).

## New project behavior

- In the Projects section, each card has **Open Project Details** button.
- On click, a **popup modal** opens and shows:
  - project summary
  - about project
  - technologies
  - challenges
  - solutions
  - screenshot gallery

## How to add your real screenshots and project info

Edit the `projects` array in `app.jsx` and update fields like:

- `summary`
- `about`
- `technologies`
- `challenges`
- `solutions`
- `screenshots`

Example:

```js
screenshots: [
  { title: "Dashboard", src: "./assets/project1/dashboard.png" },
  { title: "Reports", src: "./assets/project1/reports.png" }
]
```

## Run locally

```bash
python3 -m http.server 8080
```

Open: `http://localhost:8080`
