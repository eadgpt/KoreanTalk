// Line icons in the style of Apple's SF Symbols (drawn here, not copied): one stroke weight, round ends.
//   SF.i("mic")          → an <svg> string, 20 px
//   SF.i("mic", 28)      → the same at 28 px
//   SF.ui("🎧")          → swaps an emoji that was used as a button picture for its line icon; anything else is returned as it was
(function () {
"use strict";
const P = {
  bubble: '<path d="M20 11.5c0 4.1-3.6 7.5-8 7.5-1.2 0-2.3-.2-3.3-.6L4 20l1.2-3.6C4.4 15 4 13.3 4 11.5 4 7.4 7.6 4 12 4s8 3.4 8 7.5z"/>',
  bubbles: '<path d="M15 9.5c0 3-2.7 5.5-6 5.5-.8 0-1.6-.1-2.3-.4L3.5 16l.9-2.7C3.5 12.3 3 11 3 9.5 3 6.5 5.7 4 9 4s6 2.5 6 5.5z"/><path d="M17.6 9.2C19.6 10 21 11.8 21 13.9c0 1.2-.5 2.3-1.2 3.2l.7 2.4-2.8-1c-.8.3-1.6.5-2.5.5-1.9 0-3.6-.8-4.6-2"/>',
  blocks: '<rect x="3.5" y="13" width="7.5" height="7" rx="1.8"/><rect x="13" y="13" width="7.5" height="7" rx="1.8"/><rect x="8.2" y="4" width="7.5" height="7" rx="1.8"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M9 21h6"/>',
  wave: '<path d="M4 10v4M8 7v10M12 4v16M16 8v8M20 10.5v3"/>',
  headphones: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3.5" y="14" width="4.5" height="6.5" rx="1.8"/><rect x="16" y="14" width="4.5" height="6.5" rx="1.8"/>',
  playrect: '<rect x="3" y="5" width="18" height="14" rx="3.5"/><path d="M10.3 9.2v5.6l4.7-2.8z" fill="currentColor"/>',
  numbers: '<path d="M4.5 8.5 6.5 7v10M10 9.2a2 2 0 0 1 4 .1c0 1.9-4 3.5-4 7.7h4.3M17.2 7.6a2 2 0 0 1 3.3 1.5c0 1.2-1 1.9-2.2 1.9 1.3 0 2.4.8 2.4 2.1a2.2 2.2 0 0 1-3.9 1.4"/>',
  bow: '<circle cx="12" cy="5.5" r="2.3"/><path d="M7 21v-5.5l3-4.3h4l3 4.3V21M9.5 15.5h5"/>',
  people: '<circle cx="9" cy="8" r="3.2"/><path d="M3 19.5c.8-3.2 3.1-5 6-5s5.2 1.8 6 5"/><circle cx="17" cy="9" r="2.5"/><path d="M16.5 14.6c2.3.2 3.9 1.8 4.5 4.4"/>',
  book: '<path d="M12 6.5C10.3 5 8 4.5 4 4.5v13.5c4 0 6.3.5 8 2 1.7-1.5 4-2 8-2V4.5c-4 0-6.3.5-8 2zM12 6.5V20"/>',
  flask: '<path d="M9.5 3.5h5M10.5 3.5V9L5 18.6A1.6 1.6 0 0 0 6.4 21h11.2a1.6 1.6 0 0 0 1.4-2.4L13.5 9V3.5M7.6 15h8.8"/>',
  flame: '<path d="M12 21c-3.6 0-6-2.4-6-5.6 0-3.4 2.6-5.3 3.6-8.4.4 1.5 1.3 2.6 2.4 3.2C12.6 7.5 13.5 5 15.6 3c-.3 2.8.8 4.6 1.9 6.3 1 1.5 1.5 2.9 1.5 4.6C19 18.3 16 21 12 21z"/>',
  repeat: '<path d="M17 3.5 20 6.5l-3 3"/><path d="M4 12v-1.5a4 4 0 0 1 4-4h12M7 20.5l-3-3 3-3"/><path d="M20 12v1.5a4 4 0 0 1-4 4H4"/>',
  speaker: '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>',
  stop: '<rect x="6" y="6" width="12" height="12" rx="2.5" fill="currentColor"/>',
  question: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9.3a2.5 2.5 0 0 1 4.8 1c0 1.7-2.4 2.2-2.4 3.7M12 17.2v.01"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"/>',
  moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  auto: '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v17a8.5 8.5 0 0 0 0-17z" fill="currentColor"/>',
  sparkles: '<path d="M10 3.5 11.6 8 16 9.6l-4.4 1.6L10 15.7l-1.6-4.5L4 9.6 8.4 8zM17.5 14l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  chevron: '<path d="M9 6l6 6-6 6"/>',
  arrowup: '<path d="M12 19V6M6 11l6-6 6 6"/>',
  play: '<path d="M7 5v14l12-7z" fill="currentColor" stroke="none"/>',
  house: '<path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z"/>',
  star: '<path d="M12 3.5l2.7 5.5 6 .9-4.4 4.2 1 6-5.3-2.8-5.3 2.8 1-6L3.3 9.9l6-.9z"/>',
  person: '<circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  gamepad: '<rect x="2.5" y="7" width="19" height="11" rx="5"/><path d="M7.5 10.5v4M5.5 12.5h4M15.5 11.5h.01M17.5 13.5h.01"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  hand: '<path d="M7 11.5V6a1.5 1.5 0 0 1 3 0v4.5M10 10V4.5a1.5 1.5 0 0 1 3 0V10M13 10V5.5a1.5 1.5 0 0 1 3 0V11M16 9a1.5 1.5 0 0 1 3 0v5a7 7 0 0 1-7 7h-.6a6 6 0 0 1-4.6-2.2L3.6 15a1.6 1.6 0 0 1 2.5-2l.9 1"/>'
};
// emoji the app used as pictures on buttons and links → the line icon that replaces it
const MAP = { "💬": "bubbles", "🧩": "blocks", "🎙️": "mic", "🎙": "mic", "🎧": "headphones", "▶️": "playrect", "🔢": "numbers", "🙇": "bow",
  "📖": "book", "🧪": "flask", "🔥": "flame", "🔁": "repeat", "🔊": "speaker", "⏹": "stop", "⏹️": "stop" };
function i(name, size) {
  const s = size || 20, p = P[name];
  return p ? `<svg class="sf" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>` : "";
}
function ui(e, size) { return MAP[e] ? i(MAP[e], size) : e; }
window.SF = { i, ui, has: n => !!P[n] };
})();
