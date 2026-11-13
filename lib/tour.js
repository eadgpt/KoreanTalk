// Help guide: the ? button in the top bar dims the screen, lights up one button at a time and points an arrow at it
// with a short note on what it does. It covers the bars that are always there, then whatever is on the current page.
// It never starts by itself; the first visit only gives the ? button a little wiggle so it gets noticed.
//   KTTour.start()
(function () {
"use strict";
const SEEN = "kt_tour_v1";
const on = () => document.documentElement.classList.contains("motion");
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const seen = () => { try { return localStorage.getItem(SEEN) === "1"; } catch (e) { return true; } };
const markSeen = () => { try { localStorage.setItem(SEEN, "1"); } catch (e) {} };

// [selector, title, text]  — the first match that is on screen is used; missing ones are skipped
const BARS = [
  [".top .search", "Search", "Type English or Korean to find any phrase in the app, wherever it lives."],
  ["#helpBtn", "Help", "Tap the ? any time to bring this guide back. It explains whatever screen you are on."],
  ["#themeBtn", "Light or dark", "Switch between light and dark in one tap. Settings also has Auto, which follows your device."],
  ["#gear", "Settings", "Theme (Light, Dark, Auto), the Animations switch, text size, romanization and the voice."],
  ['[data-nav="home"]', "Home", "Your route through Seoul: eight stops, each with phrases, a conversation and games."],
  ['[data-nav="play"]', "Play", "Short games — Hangul, conversations, sentence builder, listening, speaking, numbers."],
  ['[data-go="practice"]', "Practise", "Today's mix of flashcards: a few new phrases plus the ones due for review."],
  ['[data-nav="fav"]', "Saved", "Every phrase you starred, in one place. The number shows how many."],
  ['[data-nav="me"]', "Me", "Your level, streak, the week at a glance, badges and medals."]
];
const PAGES = {
  home: [
    [".goal", "Today's goal", "The ring fills as you practise. Reach the goal to keep your streak going."],
    [".goal [data-act=daily]", "Start practising", "One tap starts today's cards. You can stop any time — progress is saved."],
    [".starter", "Start here", "New to Korean? Learn to read Hangul first: eight short lessons."],
    [".stop .stop-card", "A stop on your route", "Each place shows how far you've got. Tap a line inside to open phrases, a conversation or a game."],
    [".chips", "Topics", "Filter the cards by topic."]
  ],
  module: [
    ['.mbtns [data-act="practice"]', "Practise these", "Flashcards made from this page only."],
    ['.mbtns a[href^="#/listen/"]', "Listen", "Ten of these phrases by ear: hear one, pick what it means."],
    ['.mbtns a[href^="#/shadow/"]', "Speak", "Hear a phrase, record yourself saying it, then compare the two."],
    ["#tabs", "Topics", "One topic at a time. Swipe sideways to see them all."],
    [".row .ko", "Tap the Korean", "Tap any Korean line to hear it. The small letters underneath show how it sounds."],
    [".row .ic.say", "Play", "Hear the phrase again."],
    [".row .ic.shadow", "Say it", "Record yourself and compare with the model voice."],
    [".row .ic.tick", "I know this", "Tick it when you can say it without looking. It counts towards your goal."],
    [".row .ic.star", "Save", "Star a phrase to keep it in Saved."]
  ],
  play: [[".gcard", "Games", "Pick any game. Each one counts towards today's goal."]],
  me: [[".me-card", "Your level", "Points come from phrases you know and cards you review."], [".week", "This week", "A green day means you hit your goal."]],
  other: [[".letter", "Letters", "Tap a letter to hear it."], [".word", "Words", "Tap a word to hear it read out."], [".sopt", "Your turn", "Pick what you would say. A wrong pick explains why."], [".tile", "Word tiles", "Tap the tiles in Korean word order."], [".gcard", "Choose one", "Tap a card to open it."]]
};
function pageKey() {
  const h = location.hash || "#/";
  if (h === "#/" || h === "#") return "home";
  if (h.startsWith("#/m/")) return "module";
  if (h === "#/play") return "play";
  if (h === "#/me") return "me";
  return "other";
}
const visible = el => { if (!el) return false; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 2 && r.height > 2 && cs.visibility !== "hidden" && cs.display !== "none"; };
function pick(sel) { return [...document.querySelectorAll(sel)].find(visible) || null; }
function buildSteps() {
  const out = [], used = new Set();
  const add = (list, kind) => list.forEach(([sel, title, text]) => { const el = pick(sel); if (el && !used.has(el)) { used.add(el); out.push({ el, title, text, kind }); } });
  add(BARS, "Always here");
  add(PAGES[pageKey()] || [], "On this screen");
  return out;
}

const NS = "http://www.w3.org/2000/svg";
let T = null;
function make() {
  const d = document.createElement("div");
  d.className = "tour"; d.setAttribute("role", "dialog"); d.setAttribute("aria-modal", "true"); d.setAttribute("aria-label", "Help guide");
  d.innerHTML = `<svg class="tour-veil" xmlns="${NS}"><defs><mask id="tourMask"><rect x="0" y="0" width="100%" height="100%" fill="#fff"/><rect class="hole" fill="#000" rx="14"/></mask>
      <marker id="tourHead" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path class="head" d="M0 0 10 5 0 10z"/></marker></defs>
      <rect class="veil" x="0" y="0" width="100%" height="100%" mask="url(#tourMask)"/><rect class="ring-hl" rx="14"/><path class="arrow" marker-end="url(#tourHead)"/></svg>
    <div class="tour-card" aria-live="polite"><button class="tour-x" data-t="end" aria-label="Close the guide"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button><div class="k"></div><h3></h3><p></p>
      <div class="tour-nav"><div class="tour-bar"><i></i></div><button class="btn" data-t="back">Back</button><button class="btn primary" data-t="next">Next</button></div></div>`;
  d.addEventListener("click", e => {
    const b = e.target.closest("[data-t]");
    if (b) { e.stopPropagation(); return act(b.dataset.t); }
    if (!e.target.closest(".tour-card")) act("next");   // tap the dimmed area to move on
  });
  d.addEventListener("wheel", e => e.preventDefault(), { passive: false });
  d.addEventListener("touchmove", e => e.preventDefault(), { passive: false });
  return d;
}
function act(a) {
  if (!T) return;
  if (a === "end") return end();
  if (a === "back") return go(T.i - 1);
  if (a === "next") return T.i + 1 >= T.steps.length ? end() : go(T.i + 1);
}
function key(e) {
  if (!T) return;
  if (e.key === "Escape") { e.preventDefault(); end(); }
  else if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") { e.preventDefault(); act("next"); }
  else if (e.key === "ArrowLeft") { e.preventDefault(); act("back"); }
}
function go(i) {
  if (!T || i < 0 || i >= T.steps.length) return;
  T.i = i;
  const s = T.steps[i];
  // page content may be off screen: bring it to the middle first (the bars are fixed and never need this)
  const fixed = s.el.closest(".top, .tabbar");
  if (!fixed) {
    const r = s.el.getBoundingClientRect(), top = (document.querySelector(".top") || {}).offsetHeight || 56;
    const tb = document.querySelector(".tabbar"), tr = tb ? tb.getBoundingClientRect() : null;
    const bottom = tr && tr.width < window.innerWidth * 0.5 ? 0 : (tr ? Math.max(0, window.innerHeight - tr.top) : 0);   // a side bar takes no height
    if (r.top < top + 20 || r.bottom > window.innerHeight - bottom - 20) {
      window.scrollTo({ top: Math.max(0, window.scrollY + r.top - (window.innerHeight - r.height) / 2), behavior: "auto" });
    }
  }
  const c = T.d.querySelector(".tour-card");
  c.querySelector(".k").textContent = s.kind + " · " + (i + 1) + " of " + T.steps.length;
  c.querySelector("h3").textContent = s.title;
  c.querySelector("p").textContent = s.text;
  c.querySelector(".tour-bar i").style.width = ((i + 1) / T.steps.length * 100) + "%";
  c.querySelector('[data-t="back"]').hidden = i === 0;
  c.querySelector('[data-t="next"]').textContent = i + 1 >= T.steps.length ? "Done" : "Next";
  c.classList.remove("pop"); void c.offsetWidth; c.classList.add("pop");
  requestAnimationFrame(() => layout(true));
  setTimeout(() => layout(false), 60);
}
// Place the spotlight, the card (wherever it fits best) and a curved arrow from the card to the button.
function layout(redraw) {
  if (!T) return;
  const s = T.steps[T.i], d = T.d, vw = window.innerWidth, vh = window.innerHeight;
  const r = s.el.getBoundingClientRect(), pad = 6;
  const h = { x: r.left - pad, y: r.top - pad, w: r.width + pad * 2, h: r.height + pad * 2 };
  const rad = Math.min(16, h.h / 2, h.w / 2);
  for (const el of d.querySelectorAll(".hole, .ring-hl")) { el.setAttribute("x", h.x); el.setAttribute("y", h.y); el.setAttribute("width", h.w); el.setAttribute("height", h.h); el.setAttribute("rx", rad); }
  const c = d.querySelector(".tour-card"), cw = c.offsetWidth, ch = c.offsetHeight, gap = 64, m = 12;
  const safeTop = 12;
  const fits = {
    below: vh - (h.y + h.h) - m >= ch + gap * 0.6,
    above: h.y - safeTop >= ch + gap * 0.6,
    right: vw - (h.x + h.w) - m >= cw + gap * 0.6,
    left: h.x - m >= cw + gap * 0.6
  };
  const tall = h.h > vh * 0.5, side = h.x + h.w < vw * 0.3 || h.x > vw * 0.7;
  const order = tall || (side && h.w < vw * 0.3) ? ["right", "left", "below", "above"] : (h.y + h.h / 2 > vh * 0.55 ? ["above", "below", "right", "left"] : ["below", "above", "right", "left"]);
  const where = order.find(k => fits[k]) || "center";
  const cx = h.x + h.w / 2, cy = h.y + h.h / 2;
  let x, y;
  if (where === "below") { x = cx - cw / 2; y = Math.min(h.y + h.h + gap, vh - ch - m); }
  else if (where === "above") { x = cx - cw / 2; y = Math.max(safeTop, h.y - gap - ch); }
  else if (where === "right") { x = Math.min(h.x + h.w + gap, vw - cw - m); y = cy - ch / 2; }
  else if (where === "left") { x = Math.max(m, h.x - gap - cw); y = cy - ch / 2; }
  else { x = (vw - cw) / 2; y = (vh - ch) / 2; }
  // nudge the card sideways so it doesn't sit squarely on top of the arrow's start
  x = clamp(x, m, vw - cw - m); y = clamp(y, safeTop, vh - ch - m);
  c.style.left = x + "px"; c.style.top = y + "px";
  // arrow: from the card edge facing the button, to just outside the spotlight
  const arrow = d.querySelector(".arrow");
  if (where === "center") { arrow.setAttribute("d", ""); return; }
  let sx, sy, ex, ey;
  if (where === "below") { sx = clamp(cx, x + 30, x + cw - 30); sy = y - 4; ex = cx; ey = h.y + h.h + 8; }
  else if (where === "above") { sx = clamp(cx, x + 30, x + cw - 30); sy = y + ch + 4; ex = cx; ey = h.y - 8; }
  else if (where === "right") { sx = x - 4; sy = clamp(cy, y + 30, y + ch - 30); ex = h.x + h.w + 8; ey = cy; }
  else { sx = x + cw + 4; sy = clamp(cy, y + 30, y + ch - 30); ex = h.x - 8; ey = cy; }
  // a gentle curve: the control point is pushed sideways from the straight line
  const mx = (sx + ex) / 2, my = (sy + ey) / 2, dx = ex - sx, dy = ey - sy, len = Math.hypot(dx, dy) || 1;
  const bend = Math.min(40, len * 0.35) * (sx < ex ? 1 : -1);
  const qx = mx - dy / len * bend, qy = my + dx / len * bend;
  arrow.setAttribute("d", `M${sx.toFixed(1)} ${sy.toFixed(1)} Q${qx.toFixed(1)} ${qy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`);
  if (redraw) {
    const L = arrow.getTotalLength ? arrow.getTotalLength() : len;
    arrow.style.setProperty("--len", L);
    arrow.classList.remove("draw"); void arrow.getBoundingClientRect(); if (on()) arrow.classList.add("draw");
  }
}
function start() {
  if (T) end();
  const steps = buildSteps();
  if (!steps.length) return;
  const d = make();
  document.body.appendChild(d);
  T = { d, steps, i: 0, prevFocus: document.activeElement };
  document.addEventListener("keydown", key, true);
  window.addEventListener("resize", onResize);
  markSeen();
  const hb = document.getElementById("helpBtn"); if (hb) hb.classList.remove("nudge");
  go(0);
  d.querySelector('[data-t="next"]').focus({ preventScroll: true });
}
function onResize() { if (T) layout(false); }
function end() {
  if (!T) return;
  const d = T.d, f = T.prevFocus;
  T = null;
  document.removeEventListener("keydown", key, true);
  window.removeEventListener("resize", onResize);
  if (on()) { d.style.transition = "opacity .25s"; d.style.opacity = "0"; setTimeout(() => d.remove(), 260); } else d.remove();
  if (f && f.focus) try { f.focus({ preventScroll: true }); } catch (e) {}
}
// first visit only: a small wiggle on the ? so it gets noticed — the guide itself never opens on its own
window.addEventListener("load", () => { if (!seen()) { const hb = document.getElementById("helpBtn"); if (hb) setTimeout(() => hb.classList.add("nudge"), 1500); } });
window.KTTour = { start, end, get open() { return !!T; } };
})();
