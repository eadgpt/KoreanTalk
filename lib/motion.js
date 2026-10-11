// Motion and hover tips. Both are extras: without this file the app still works, just stiller and quieter.
// Motion is switched by the class "motion" on <html> (Settings → Motion). It does not follow the system's
// "reduce motion" setting — the switch in Settings is the control.
//   KTMotion.burst(el)   a puff of sparks from an element (right answers)
(function () {
"use strict";
const root = document.documentElement, app = document.getElementById("app");
const on = () => root.classList.contains("motion");
const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

/* ───────────── reveal: things rise into place as they scroll into view ───────────── */
const REVEAL = ".stop, .gcard, .card, .mini, .gmini, .row, .key, .letter, .word, .lrow, .prow, .badge, .panel, .goal, .starter, .guide, .me-card, .stats3 > div, .mrow";
function countUp(el) {
  const to = +el.dataset.count, t0 = performance.now(), suffix = el.dataset.suffix || "";
  if (!to) return;
  const step = t => { const k = clamp((t - t0) / 800, 0, 1); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))) + suffix; if (k < 1) requestAnimationFrame(step); };
  el.textContent = "0" + suffix;
  requestAnimationFrame(step);
}
function show(el, i) {
  if (el.classList.contains("in")) return;
  el.style.setProperty("--d", Math.min(i, 7) * 55 + "ms");
  el.classList.add("in");
  el.querySelectorAll("[data-count]").forEach(countUp);
  // once it has landed, drop the helper classes so hover effects are not slowed by the stagger delay
  setTimeout(() => { el.classList.remove("rv", "in"); el.style.removeProperty("--d"); }, 1500 + Math.min(i, 7) * 55);
}
// Positions are checked directly (on every render, scroll and resize) rather than with an observer,
// so nothing can be left waiting, invisible, for a callback that is late.
function reveal() {
  const vh = window.innerHeight;
  const hits = [...app.querySelectorAll(".rv:not(.in)")].filter(el => {
    const r = el.getBoundingClientRect();
    if (r.bottom <= -40) { el.classList.remove("rv"); return false; }   // already scrolled past: just be there
    return r.top < vh * 0.95;
  });
  hits.sort((x, y) => x.getBoundingClientRect().top - y.getBoundingClientRect().top).forEach(show);
}
function scan() {
  if (!on()) return;
  app.querySelectorAll(REVEAL).forEach(el => { if (!el._rv) { el._rv = true; el.classList.add("rv"); } });
  onScroll();
}
let scanT = 0;
new MutationObserver(() => { clearTimeout(scanT); scanT = setTimeout(scan, 0); }).observe(app, { childList: true, subtree: true });

/* ───────────── page change: the new page slides in ───────────── */
window.addEventListener("hashchange", () => { if (!on()) return; app.classList.remove("page-in"); void app.offsetWidth; app.classList.add("page-in"); });

/* ───────────── cursor: cards tilt towards it, a soft light follows it, pictures shift in depth ───────────── */
const TILT = ".stop-card, .gcard, .card, .goal, .starter";   // not the About panels: those are for reading
let lit = null, spot = null;   // spot = an About panel: it gets the light but stays still
function unlight() { if (lit) { lit.classList.remove("lit"); lit.querySelectorAll(".dio").forEach(d => { d.style.removeProperty("--px"); d.style.removeProperty("--py"); }); lit = null; } }
app.addEventListener("pointermove", e => {
  if (!on() || !fine.matches) return;
  const card = e.target.closest(TILT), dio = e.target.closest(".dio.banner"), g = e.target.closest(".guide");
  if (g !== spot) { if (spot) spot.classList.remove("spot"); spot = g; if (g) g.classList.add("spot"); }
  if (g) { const q = g.getBoundingClientRect(); g.style.setProperty("--mx", e.clientX - q.left + "px"); g.style.setProperty("--my", e.clientY - q.top + "px"); }
  if (card !== lit) { unlight(); lit = card; if (card) card.classList.add("lit"); }
  const box = card || dio;
  if (!box) return;
  const r = box.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
  if (card) {
    const max = clamp(900 / r.width, 1.2, 5);   // big cards lean less
    card.style.setProperty("--mx", x * 100 + "%"); card.style.setProperty("--my", y * 100 + "%");
    card.style.setProperty("--ry", (x - 0.5) * 2 * max + "deg"); card.style.setProperty("--rx", (0.5 - y) * 2 * max + "deg");
  }
  (dio ? [dio] : [...card.querySelectorAll(".dio")]).forEach(d => { d.style.setProperty("--px", (x - 0.5) * 2); d.style.setProperty("--py", (y - 0.5) * 2); });
});
app.addEventListener("pointerleave", () => { unlight(); if (spot) { spot.classList.remove("spot"); spot = null; } });
app.addEventListener("pointerout", e => { const d = e.target.closest(".dio.banner"); if (d && !d.contains(e.relatedTarget)) { d.style.removeProperty("--px"); d.style.removeProperty("--py"); } });

/* ───────────── scroll: the route line fills in, and on touch screens pictures drift as they pass ───────────── */
let ticking = false;
function onScroll() {
  ticking = false;
  if (!on()) return;
  reveal();
  const vh = window.innerHeight, route = app.querySelector(".route");
  if (route) {
    const r = route.getBoundingClientRect(), mark = vh * 0.6;
    route.style.setProperty("--rp", clamp((mark - r.top - 24) / Math.max(1, r.height - 48), 0, 1));
    route.querySelectorAll(".stop").forEach(s => s.classList.toggle("passed", s.getBoundingClientRect().top + 52 < mark));
  }
  if (!fine.matches) app.querySelectorAll(".dio").forEach(d => {
    const r = d.getBoundingClientRect();
    if (r.bottom > 0 && r.top < vh) d.style.setProperty("--py", clamp((r.top + r.height / 2 - vh / 2) / (vh / 2), -1, 1));
  });
}
// a timer backs up the animation frame, which a browser may hold back while the page is not being drawn
const queue = () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); setTimeout(() => { if (ticking) onScroll(); }, 120); } };
window.addEventListener("scroll", queue, { passive: true });
window.addEventListener("resize", queue);

/* ───────────── burst: sparks from a right answer ───────────── */
function burst(el, n) {
  if (!on() || !el) return;
  const r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2, bits = ["✨", "⭐", "💫", "✨", "🎉"];
  for (let i = 0; i < (n || 10); i++) {
    const s = document.createElement("span"), a = Math.random() * Math.PI * 2, d = 50 + Math.random() * 70;
    s.className = "bst"; s.textContent = bits[i % bits.length];
    s.style.cssText = `left:${cx}px;top:${cy}px;--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d - 30}px;--r:${Math.random() * 240 - 120}deg;animation-delay:${Math.random() * 80}ms`;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1000);
  }
}

/* ───────────── tips: a short explanation on hover, on keyboard focus, or when ⓘ is tapped ─────────────
   Any element with  data-tip="Title|Text"  has one. On a touch screen there is no hover, so sections carry a small ⓘ button. */
const tip = document.createElement("div");
tip.className = "tipbox"; tip.setAttribute("role", "tooltip");
document.body.appendChild(tip);
let tipFor = null, tipT = 0, pinned = false;
function place(x, y, above) {
  const w = tip.offsetWidth, h = tip.offsetHeight;
  let top = y + 20;
  if (top + h > window.innerHeight - 8) top = (above == null ? y : above) - h - 12;
  tip.style.left = clamp(x - 24, 8, window.innerWidth - w - 8) + "px";
  tip.style.top = Math.max(8, top) + "px";
}
function showTip(el, x, y, above) {
  const [title, text] = String(el.dataset.tip).split("|");
  tip.innerHTML = "";
  const b = document.createElement("b"), s = document.createElement("span");
  b.textContent = text ? title : ""; s.textContent = text || title;
  if (text) tip.appendChild(b);
  tip.appendChild(s);
  tipFor = el; place(x, y, above); tip.classList.add("show");
}
function hideTip() { clearTimeout(tipT); tip.classList.remove("show"); tipFor = null; pinned = false; }
document.addEventListener("mouseover", e => {
  if (!fine.matches || pinned) return;
  const el = e.target.closest ? e.target.closest("[data-tip]") : null;
  if (el === tipFor) return;
  clearTimeout(tipT);
  if (!el) return hideTip();
  tip.classList.remove("show"); tipFor = el;
  const x = e.clientX, y = e.clientY;
  tipT = setTimeout(() => { if (tipFor === el) showTip(el, tip._x || x, tip._y || y); }, 260);
});
document.addEventListener("mousemove", e => { tip._x = e.clientX; tip._y = e.clientY; if (tipFor && !pinned && tip.classList.contains("show")) place(e.clientX, e.clientY); });
document.addEventListener("mouseleave", hideTip);
document.addEventListener("focusin", e => {
  const el = e.target.closest ? e.target.closest("[data-tip]") : null;
  if (!el || !e.target.matches(":focus-visible")) return;
  const r = el.getBoundingClientRect(); showTip(el, r.left + 24, r.bottom - 8, r.top);
});
document.addEventListener("focusout", () => { if (!pinned) hideTip(); });
// ⓘ buttons: tap to show the tip of the section they sit in; tap anywhere else to put it away
document.addEventListener("click", e => {
  const b = e.target.closest ? e.target.closest(".ib[data-tipbtn]") : null;
  if (!b) { if (pinned) hideTip(); return; }
  e.preventDefault(); e.stopPropagation();
  const el = b.closest("[data-tip]");
  if (!el) return;
  if (pinned && tipFor === el) return hideTip();
  const r = b.getBoundingClientRect(); showTip(el, r.left, r.bottom - 12, r.top); pinned = true;
}, true);
window.addEventListener("scroll", () => { if (tipFor) hideTip(); }, { passive: true });
window.addEventListener("hashchange", hideTip);

window.KTMotion = { burst, scan };
scan();
})();
