# My Blog — CLAUDE.md

## Project Overview

A static blog that renders Markdown files into a clean, readable website.
No frameworks — pure HTML, CSS, and JavaScript only.

## Goals

- Parse and render local Markdown (`.md`) files as blog posts
- Clean, readable typography optimized for long-form reading
- Dark mode support (respects `prefers-color-scheme`, toggleable by user)
- Fully responsive — mobile-first layout
- Fast: no build step, no bundler, no dependencies except a Markdown parser

## Architecture

```
my_blog/
├── index.html          # Home page — lists all posts
├── post.html           # Single post view — renders a Markdown file
├── css/
│   ├── base.css        # Reset, CSS variables, typography scale
│   ├── layout.css      # Header, nav, main, footer, grid
│   ├── post.css        # Prose styles for rendered Markdown content
│   └── dark.css        # Dark mode overrides (prefers-color-scheme + .dark class)
├── js/
│   ├── marked.min.js   # Markdown parser (CDN-downloaded local copy of marked.js)
│   ├── posts.js        # Post manifest — list of posts with metadata
│   └── app.js          # Core logic: routing, Markdown fetch/render, dark mode toggle
└── posts/
    └── *.md            # Blog post files (frontmatter: title, date, description)
```

## Post Format

Each `.md` file in `posts/` starts with YAML-style frontmatter:

```markdown
---
title: Post Title
date: 2026-06-07
description: One-sentence summary shown on the home page.
---

Post body in Markdown...
```

The manifest file `js/posts.js` exports an array of post entries:

```js
const POSTS = [
  { slug: "hello-world", title: "Hello World", date: "2026-06-07", description: "..." },
];
```

Posts are loaded in order (newest first on the home page).

## Design Principles

- **Typography first**: comfortable line-length (~65–70ch), generous line-height (1.7), system font stack
- **Minimal chrome**: no sidebars, no ads, no clutter — just header + content + footer
- **Color palette via CSS custom properties** so dark/light swap is a one-liner
- **No layout shift**: skeleton or smooth fade-in when Markdown loads asynchronously

## CSS Custom Properties (Light / Dark)

```css
:root {
  --bg:        #ffffff;
  --bg-subtle: #f5f5f5;
  --text:      #1a1a1a;
  --text-muted:#6b7280;
  --accent:    #2563eb;
  --border:    #e5e7eb;
  --code-bg:   #f3f4f6;
}

[data-theme="dark"] {
  --bg:        #0f172a;
  --bg-subtle: #1e293b;
  --text:      #e2e8f0;
  --text-muted:#94a3b8;
  --accent:    #60a5fa;
  --border:    #334155;
  --code-bg:   #1e293b;
}
```

## JavaScript Conventions

- Vanilla ES modules (`type="module"`) — no transpilation needed
- URL-based routing: home page is `/`, post page is `?post=<slug>`
- `app.js` reads `?post=` param, fetches `posts/<slug>.md`, strips frontmatter, passes body to `marked.parse()`
- Dark mode: saved to `localStorage` as `"theme"` key (`"dark"` | `"light"`)

## Constraints

- **No frameworks** — no React, Vue, Svelte, etc.
- **No build step** — files are served as-is (can use `python3 -m http.server` or any static server)
- **Markdown parser**: use `marked.js` (local copy in `js/`). No other runtime dependencies.
- **No CSS preprocessors** — plain CSS with custom properties
- **Browser support**: modern evergreen browsers only (no IE)

## Running Locally

```bash
cd /Users/jayyang/Claude/my_blog
python3 -m http.server 8080
# open http://localhost:8080
```

## Common Tasks

| Task | Where to edit |
|------|---------------|
| Add a new post | Create `posts/<slug>.md`, add entry to `js/posts.js` |
| Change color scheme | Edit CSS custom properties in `css/base.css` |
| Change typography | Edit `--font-*` vars and prose rules in `css/post.css` |
| Change layout width | Edit `--max-width` in `css/layout.css` |
| Modify dark mode logic | `js/app.js` → `initTheme()` and `toggleTheme()` |
