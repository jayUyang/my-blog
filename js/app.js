import { POSTS } from "./posts.js";

// ── Theme ────────────────────────────────────────────────────────────────────

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  updateToggleIcon(theme);
}

function initTheme() {
  const saved = localStorage.getItem("theme");
  applyTheme(saved ?? getSystemTheme());
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
}

function updateToggleIcon(theme) {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  btn.setAttribute("aria-label", theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환");
  btn.innerHTML = theme === "dark" ? ICON_SUN : ICON_MOON;
}

const ICON_MOON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
const ICON_SUN  = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;

// ── Frontmatter parser ────────────────────────────────────────────────────────

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };

  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const val = line.slice(colon + 1).trim().replace(/^["']|["']$/g, "");
    meta[key] = val;
  }
  return { meta, body: match[2] };
}

// ── Date formatting ───────────────────────────────────────────────────────────

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });
}

// ── Home page: post list ──────────────────────────────────────────────────────

function renderPostList() {
  const container = document.getElementById("post-list");
  if (!container) return;

  if (POSTS.length === 0) {
    container.innerHTML = `<p class="loading">아직 포스트가 없습니다.</p>`;
    return;
  }

  const items = POSTS.map((p) => `
    <a href="post.html?post=${encodeURIComponent(p.slug)}" class="post-card">
      <div class="post-card__meta">${formatDate(p.date)}</div>
      <div class="post-card__title">${escapeHtml(p.title)}</div>
      ${p.description ? `<div class="post-card__desc">${escapeHtml(p.description)}</div>` : ""}
    </a>
  `).join("");

  container.innerHTML = `<div class="post-list">${items}</div>`;
}

// ── Post page: single post ────────────────────────────────────────────────────

async function renderPost() {
  const content = document.getElementById("content");
  const postHeader = document.getElementById("post-header");
  if (!content) return;

  const slug = new URLSearchParams(location.search).get("post");

  if (!slug) {
    showError(content, "포스트 슬러그가 없습니다.");
    return;
  }

  content.innerHTML = `<p class="loading">불러오는 중…</p>`;

  let raw;
  try {
    const res = await fetch(`posts/${encodeURIComponent(slug)}.md`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    raw = await res.text();
  } catch {
    showError(content, "포스트를 찾을 수 없습니다.");
    return;
  }

  const { meta, body } = parseFrontmatter(raw);

  // Update page title
  if (meta.title) document.title = `${meta.title} — My Blog`;

  // Render header
  if (postHeader) {
    postHeader.innerHTML = `
      ${meta.date ? `<div class="post-header__meta">${formatDate(meta.date)}</div>` : ""}
      ${meta.title ? `<h1 class="post-header__title">${escapeHtml(meta.title)}</h1>` : ""}
      ${meta.description ? `<p class="post-header__desc">${escapeHtml(meta.description)}</p>` : ""}
    `;
  }

  // Render Markdown body
  content.innerHTML = marked.parse(body);
}

function showError(el, msg) {
  el.innerHTML = `<div class="error-msg">${escapeHtml(msg)}</div>`;
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// ── Bootstrap ─────────────────────────────────────────────────────────────────

initTheme();

document.getElementById("theme-toggle")?.addEventListener("click", toggleTheme);

if (document.getElementById("post-list")) {
  renderPostList();
} else if (document.getElementById("content")) {
  renderPost();
}
