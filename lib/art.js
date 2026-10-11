// Ink-wash (수묵화) scenery drawn in code — no image files.
//   KTArt.scene(name, { brush })  → SVG string for a banner or card
//   KTArt.backdrop()              → faint mountains for the page background
// A module picks its picture with  art: "pagoda"  in its file; otherwise the default below is used.
// Colours come from CSS: --wash (ink), --paper (background behind the art), --accent (red sun seal).
// CSS classes: w = ink fill, st = ink line, pp = paper fill, sp = paper line, seal = red.
(function () {
"use strict";
const W = 800, H = 300;
let uid = 0, brushId = null;   // set while drawing a banner: roughens mountain edges only

const DEFAULT = {
  home: "seoul", basics: "hanok", survival: "seoul", cafe: "cafe", food: "noodles", shopping: "lanterns",
  transport: "train", people: "chat", feelings: "dawn", time: "dawn", help: "city", slang: "phone", mine: "bamboo"
};
const AREA = { start: "hanok", daily: "seoul", culture: "chat" };

function rng(seed) {
  let a = 0;
  for (const c of String(seed)) a = (a * 31 + c.charCodeAt(0)) >>> 0;
  return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const f = n => Math.round(n * 10) / 10;

/* ── mountains: pointed peaks that fade into mist ── */
function ridge(r, base, amp, peaks, x0 = 0, x1 = W, bottom = H) {
  const P = [];
  for (let i = 0; i < peaks; i++) P.push({ x: x0 + r() * (x1 - x0), h: amp * (0.35 + 0.65 * r()), s: (x1 - x0) * (0.04 + 0.1 * r()) });
  let d = `M${x0 - 20},${bottom}`;
  for (let x = x0 - 20; x <= x1 + 20; x += 6) {
    let y = 0;
    for (const p of P) { const k = Math.abs(x - p.x) / p.s; y = Math.max(y, p.h * Math.exp(-Math.pow(k, 1.25))); }
    y += amp * 0.05 * (r() - 0.5) + amp * 0.04 * Math.sin(x * 0.09);
    d += ` L${x},${f(base - y)}`;
  }
  return d + ` L${x1 + 20},${bottom}Z`;
}
function grad(top, bottom, op, cls = "ws") {
  const id = "kt-g" + (++uid);
  return { id, def: `<linearGradient id="${id}" x1="0" y1="${top}" x2="0" y2="${bottom}" gradientUnits="userSpaceOnUse"><stop offset="0" class="${cls}" stop-opacity="${op}"/><stop offset="1" class="${cls}" stop-opacity="0"/></linearGradient>` };
}
// Three layers: far (pale, tall), middle, near (dark, low).
function mountains(r, o = {}) {
  const k = o.scale || 1, defs = [], out = [];
  [[o.far ?? 200, 130 * k, 6, 0.15], [o.mid ?? 238, 95 * k, 5, 0.24], [o.near ?? 285, 70 * k, 4, 0.4]].forEach(([base, amp, n, op], i) => {
    if (o.layers && !o.layers.includes(i)) return;
    const g = grad(base - amp, base + 50, op * (o.strength || 1));
    defs.push(g.def);
    out.push(`<path d="${ridge(r, base, amp, n)}" fill="url(#${g.id})"/>`);
  });
  return { defs: defs.join(""), body: brushId ? `<g filter="url(#${brushId})">${out.join("")}</g>` : out.join("") };
}
const mist = (y, h, op = 0.9) => { const g = grad(y + h, y, op, "pps"); return { defs: g.def, body: `<rect x="-20" y="${y}" width="${W + 40}" height="${h}" fill="url(#${g.id})"/>` }; };
const sun = (x, y, rad, op = 0.78) => `<circle cx="${x}" cy="${y}" r="${rad}" class="seal" opacity="${op}"/>`;
const birds = (x, y, s = 1) => `<g class="st" stroke-width="1.6" stroke-linecap="round" opacity=".55" transform="translate(${x},${y}) scale(${s})"><path d="M0,0 q5,-5 10,0 q5,-5 10,0"/><path d="M26,-10 q4,-4 8,0 q4,-4 8,0"/><path d="M14,-20 q3,-3 6,0 q3,-3 6,0"/></g>`;
const obj = (x, y, s, inner, op = 0.82, rot = 0) => `<g class="w" opacity="${op}" transform="translate(${x},${y}) rotate(${rot}) scale(${s})">${inner}</g>`;

/* ── objects (drawn around 0,0) ── */
const PLANE = `<path d="M52,0 C52,-3 46,-4.5 40,-4.5 L9,-4.5 L-9,-46 L-18,-46 L-8,-4.5 L-37,-4.5 L-49,-18 L-55,-18 L-49,-3 L-53,-1 L-53,1 L-49,3 L-55,18 L-49,18 L-37,4.5 L-8,4.5 L-18,46 L-9,46 L9,4.5 L40,4.5 C46,4.5 52,3 52,0Z"/><rect x="-6" y="-26" width="12" height="5" rx="2.5"/><rect x="-6" y="21" width="12" height="5" rx="2.5"/>`;
function tower() {
  return `<rect x="-5" y="-110" width="10" height="110"/><path d="M-17,-110 L17,-110 L22,-126 L-22,-126Z"/><rect class="pp" x="-15" y="-123" width="30" height="7"/><path d="M-15,-126 L15,-126 L10,-133 L-10,-133Z"/><rect x="-1" y="-150" width="2" height="18"/>`;
}
function terminal() {
  let w = "";
  for (let x = -150; x <= 140; x += 20) w += `<rect class="pp" x="${x}" y="-16" width="12" height="9" rx="1"/>`;
  return `<path d="M-165,0 L-165,-24 Q0,-58 165,-24 L165,0Z"/>${w}`;
}
function pagoda() {
  let g = "", y = 0;
  for (let i = 0; i < 5; i++) {
    const w = 46 - i * 7, bh = 15 - i;
    g += `<rect x="${f(-w * 0.55)}" y="${y - bh}" width="${f(w * 1.1)}" height="${bh}"/><rect class="pp" x="-3" y="${y - bh + 3}" width="6" height="${bh - 5}"/>`;
    y -= bh;
    g += `<path d="M${-w - 6},${y - 4} Q${-w},${y + 1} ${f(-w * 0.82)},${y} L${f(w * 0.82)},${y} Q${w},${y + 1} ${w + 6},${y - 4} L${f(w * 0.45)},${y - 12} L${f(-w * 0.45)},${y - 12}Z"/>`;
    y -= 12;
  }
  return g + `<rect x="-1.5" y="${y - 26}" width="3" height="26"/><circle cx="0" cy="${y - 10}" r="3.5"/><circle cx="0" cy="${y - 18}" r="2.5"/>`;
}
function lantern(op = 0.85) {
  return `<rect x="-0.8" y="-90" width="1.6" height="70"/><rect x="-9" y="-24" width="18" height="5" rx="1"/>`
    + `<ellipse cx="0" cy="0" rx="20" ry="20" class="seal" opacity="${op}"/>`
    + `<g class="st" stroke-width="1.3" opacity=".45"><ellipse cx="0" cy="0" rx="10" ry="20"/><line x1="0" y1="-20" x2="0" y2="20"/></g>`
    + `<rect x="-9" y="19" width="18" height="5" rx="1"/><rect x="-1" y="24" width="2" height="16"/><path d="M-4,40 L4,40 L2,48 L-2,48Z"/>`;
}
function teapot() {
  return `<path d="M-30,0 C-41,-6 -43,-30 -25,-40 L25,-40 C43,-30 41,-6 30,0Z"/><path d="M-14,-40 C-12,-50 12,-50 14,-40Z"/><circle cx="0" cy="-52" r="4"/>`
    + `<path d="M28,-28 C45,-30 50,-46 58,-53 L62,-50 C55,-38 48,-18 32,-12Z"/><path class="st" stroke-width="5" d="M-28,-34 C-53,-37 -53,-6 -31,-10"/>`
    + `<path class="pp" d="M-26,-22 L26,-22 L26,-18 L-26,-18Z" opacity=".5"/>`;
}
const cup = `<path d="M-13,0 C-16,-4 -17,-12 -17,-17 L17,-17 C17,-12 16,-4 13,0Z"/>`;
const steam = (x, y, s = 1) => `<g class="st" stroke-width="2" stroke-linecap="round" opacity=".32" transform="translate(${x},${y}) scale(${s})"><path d="M0,0 c-7,-8 7,-14 0,-22 c-7,-8 7,-14 0,-22"/><path d="M12,-6 c-6,-7 6,-12 0,-19 c-6,-7 6,-12 0,-19"/></g>`;
function shanghai() {
  return `<rect x="-200" y="-40" width="34" height="40"/><rect x="-162" y="-62" width="26" height="62"/><rect x="-132" y="-48" width="30" height="48"/>`
    + `<g><rect x="-98" y="-150" width="3" height="150"/><circle cx="-96.5" cy="-48" r="15"/><circle cx="-96.5" cy="-104" r="11"/><circle cx="-96.5" cy="-136" r="5"/>`
    + `<path d="M-97,-48 L-118,0 L-112,0 L-97,-40 L-82,0 L-76,0Z"/><rect x="-97.8" y="-175" width="2.6" height="26"/></g>`
    + `<rect x="-70" y="-72" width="24" height="72"/><rect x="-42" y="-95" width="20" height="95"/>`
    + `<path d="M-14,0 L-14,-100 L-10,-100 L-10,-128 L-6,-128 L-6,-148 L-3,-148 L-3,-170 L-1,-185 L1,-185 L3,-170 L3,-148 L6,-148 L6,-128 L10,-128 L10,-100 L14,-100 L14,0Z"/>`
    + `<path d="M22,0 C22,-90 26,-170 38,-215 L44,-215 C50,-170 56,-90 56,0Z"/>`
    + `<path d="M64,0 L67,-178 L89,-178 L92,0Z"/><path class="pp" d="M71,-168 L85,-168 L83,-156 L73,-156Z"/>`
    + `<rect x="100" y="-82" width="26" height="82"/><rect x="130" y="-58" width="22" height="58"/><rect x="156" y="-36" width="40" height="36"/>`;
}
function city(r) {
  let g = "", x = -210;
  while (x < 200) {
    const w = 18 + r() * 26, h = 40 + r() * 140;
    g += `<rect x="${f(x)}" y="${f(-h)}" width="${f(w)}" height="${f(h)}"/>`;
    for (let wy = -h + 8; wy < -10; wy += 14) for (let wx = x + 4; wx < x + w - 6; wx += 9) if (r() < 0.22) g += `<rect class="pp" x="${f(wx)}" y="${f(wy)}" width="4" height="6" opacity=".8"/>`;
    if (r() < 0.25) g += `<rect x="${f(x + w / 2 - 1)}" y="${f(-h - 18)}" width="2" height="18"/>`;
    x += w + 3;
  }
  return g;
}
function train() {
  let g = `<path d="M-230,0 L150,0 C190,0 214,-9 226,-22 C212,-32 188,-34 150,-34 L-230,-34Z"/><rect class="pp" x="-220" y="-25" width="360" height="8" rx="3"/>`;
  for (let x = -140; x < 150; x += 95) g += `<rect class="pp" x="${x}" y="-34" width="2" height="34"/>`;
  return g;
}
function viaduct() {
  let g = `<rect x="-420" y="0" width="840" height="8"/>`;
  for (let x = -400; x <= 400; x += 80) g += `<path d="M${x - 5},8 L${x + 5},8 L${x + 8},110 L${x - 8},110Z"/>`;
  return g;
}
function bowl() {
  return `<path d="M-55,0 C-55,34 55,34 55,0Z"/><rect x="-22" y="28" width="44" height="6" rx="2"/><ellipse cx="0" cy="0" rx="55" ry="7" class="pp" opacity=".55"/>`
    + `<g class="st" stroke-width="3" stroke-linecap="round" opacity=".9"><line x1="8" y1="-6" x2="70" y2="-68"/><line x1="20" y1="-2" x2="84" y2="-58"/></g>`;
}
function bamboo(r) {
  let g = "";
  [[-40, 230], [0, 270], [36, 210]].forEach(([x, h]) => {
    g += `<rect x="${x - 4}" y="${-h}" width="8" height="${h}" rx="3"/>`;
    for (let y = -30; y > -h; y -= 42) g += `<rect class="pp" x="${x - 5}" y="${y}" width="10" height="2" opacity=".7"/>`;
  });
  const leaf = `M0,0 C12,-4 34,-4 48,0 C34,4 12,4 0,0Z`;
  [[-36, -190, -20], [-36, -190, 15], [4, -230, -35], [4, -230, 10], [4, -150, 30], [40, -170, -150], [40, -170, 170], [-36, -110, 160]].forEach(([x, y, a]) =>
    g += `<path d="${leaf}" transform="translate(${x},${y}) rotate(${a + (r() - 0.5) * 20})"/>`);
  return g;
}

// Jewel: a glass dome that dips in the middle, with the waterfall falling through the gap.
function dome() {
  let g = `<path d="M-175,0 C-180,-72 -112,-112 -42,-106 C-22,-104 -9,-96 0,-84 C9,-96 22,-104 42,-106 C112,-112 180,-72 175,0Z"/>`;
  [-140, -100, -60, 60, 100, 140].forEach(x => g += `<path class="sp" stroke-width="2" opacity=".5" d="M${x},0 Q${f(x * 0.95)},-62 ${f(x * 0.6)},-102"/>`);
  g += `<path class="sp" stroke-width="2" opacity=".4" d="M-170,-42 Q0,-66 170,-42"/>`;
  return g + `<path class="pp" opacity=".92" d="M-6,-86 L6,-86 L11,0 L-11,0Z"/><ellipse class="pp" cx="0" cy="-1" rx="36" ry="7" opacity=".6"/>`;
}

/* ── scenes ── */
const SCENES = {
  home(r) {
    const m = mountains(r), mi = mist(240, 60);
    return { defs: m.defs + mi.defs, body: sun(610, 112, 30) + m.body + mi.body + obj(470, 140, 0.7, PLANE, 0.72, -12) + birds(300, 105, 1) };
  },
  airport(r) {
    const m = mountains(r, { scale: 0.7, layers: [0, 1] }), mi = mist(200, 70);
    return { defs: m.defs + mi.defs, body: sun(250, 70, 26) + m.body + mi.body + obj(580, 266, 1, terminal(), 0.7) + obj(720, 266, 0.95, tower(), 0.75)
      + obj(430, 110, 0.75, PLANE, 0.8, -20) + `<rect x="0" y="266" width="${W}" height="3" class="w" opacity=".35"/>` };
  },
  jewel(r) {
    const m = mountains(r, { layers: [0, 1], strength: 0.75 }), mi = mist(205, 70);
    return { defs: m.defs + mi.defs, body: sun(270, 72, 26) + m.body + mi.body + obj(590, 268, 1, dome(), 0.74) + obj(400, 100, 0.6, PLANE, 0.7, -14)
      + `<rect x="0" y="268" width="${W}" height="2" class="w" opacity=".3"/>` };
  },
  window(r) {
    const m = mountains(r, { layers: [0, 1], strength: 0.8 });
    const id = "mt-c" + (++uid), inner = mountains(r, { far: 210, mid: 235, near: 270, scale: 0.6 });
    return { defs: m.defs + inner.defs + `<clipPath id="${id}"><rect x="540" y="45" width="150" height="210" rx="70"/></clipPath>`,
      body: m.body + `<g clip-path="url(#${id})"><rect class="pp" x="540" y="45" width="150" height="210"/>${sun(640, 120, 18)}${inner.body}<rect class="w" x="540" y="45" width="150" height="36" opacity=".14"/></g>`
        + `<rect class="st" x="540" y="45" width="150" height="210" rx="70" stroke-width="9" opacity=".6"/><rect class="st" x="526" y="31" width="178" height="238" rx="84" stroke-width="2.5" opacity=".3"/>` };
  },
  clouds(r) {
    const m = mountains(r, { far: 190, mid: 215, near: 250 }), mi = mist(150, 150, 1);
    return { defs: m.defs + mi.defs, body: sun(330, 80, 30) + m.body + mi.body + obj(560, 120, 0.75, PLANE, 0.8, -8) + obj(660, 160, 0.55, PLANE, 0.6, -8) + birds(150, 120, 0.8) };
  },
  skyline(r) {
    const m = mountains(r, { layers: [0], strength: 0.9 }), mi = mist(230, 70);
    return { defs: m.defs + mi.defs, body: sun(290, 90, 28) + m.body + obj(590, 262, 1, shanghai(), 0.72) + mi.body + `<rect x="0" y="268" width="${W}" height="2" class="w" opacity=".3"/>` };
  },
  tea(r) {
    const m = mountains(r, { layers: [0, 1], strength: 0.8 }), mi = mist(200, 60);
    return { defs: m.defs + mi.defs, body: sun(700, 70, 26) + m.body + mi.body
      + `<rect class="w" x="440" y="252" width="340" height="7" rx="2" opacity=".7"/><rect class="w" x="460" y="259" width="7" height="40" opacity=".6"/><rect class="w" x="752" y="259" width="7" height="40" opacity=".6"/>`
      + obj(590, 252, 1.2, teapot(), 0.8) + obj(690, 252, 1, cup, 0.8) + obj(740, 252, 1, cup, 0.8) + steam(690, 225, 0.8) + steam(560, 180, 0.9) };
  },
  city(r) {
    const m = mountains(r, { layers: [0], strength: 0.8 }), mi = mist(225, 75);
    return { defs: m.defs + mi.defs, body: sun(330, 80, 26) + m.body + obj(590, 268, 1, city(r), 0.66) + mi.body + birds(230, 130, 0.9) };
  },
  lanterns(r) {
    const m = mountains(r, { layers: [0, 1], strength: 0.75 }), mi = mist(200, 100);
    return { defs: m.defs + mi.defs, body: m.body + mi.body + `<path class="st" d="M420,6 Q600,40 790,6" stroke-width="1.5" opacity=".4"/>`
      + obj(500, 110, 1, lantern(), 1) + obj(610, 128, 1.15, lantern(), 1) + obj(720, 106, 0.95, lantern(), 1) + obj(640, 248, 0.75, bowl(), 0.75) };
  },
  pagoda(r) {
    const m = mountains(r, { near: 290 }), mi = mist(235, 65);
    const hill = grad(150, 300, 0.45);
    return { defs: m.defs + mi.defs + hill.def, body: sun(450, 70, 30) + m.body + `<path d="M520,300 C560,220 600,196 640,194 C690,194 730,230 780,300Z" fill="url(#${hill.id})"/>`
      + obj(640, 198, 0.95, pagoda(), 0.8) + mi.body + birds(330, 110, 1) };
  },
  train(r) {
    const m = mountains(r, { far: 190, mid: 220, near: 300 }), mi = mist(220, 80);
    return { defs: m.defs + mi.defs, body: sun(250, 70, 28) + m.body + obj(560, 205, 1, viaduct(), 0.55) + obj(530, 203, 1, train(), 0.82) + mi.body };
  },
  noodles(r) {
    const m = mountains(r, { layers: [0, 1], strength: 0.75 }), mi = mist(190, 110);
    return { defs: m.defs + mi.defs, body: sun(330, 80, 24) + m.body + mi.body + obj(620, 230, 1.15, bowl(), 0.8) + steam(600, 200, 1.1)
      + obj(720, 80, 0.75, lantern(), 1) + obj(520, 70, 0.6, lantern(), 1) };
  },
  bamboo(r) {
    const m = mountains(r, { layers: [0, 1], strength: 0.8 }), mi = mist(210, 90);
    return { defs: m.defs + mi.defs, body: sun(420, 80, 26) + m.body + mi.body + obj(650, 300, 1, bamboo(r), 0.7) };
  }
};

/* ── Korean scenes ── */
// N Seoul Tower: slim shaft, round deck, long mast.
function nTower() {
  return `<path d="M-9,0 L-5,-46 L5,-46 L9,0Z"/><rect x="-3.5" y="-112" width="7" height="70"/><path d="M-15,-112 L15,-112 L19,-124 L-19,-124Z"/><rect x="-13" y="-134" width="26" height="10" rx="3"/><rect class="pp" x="-11" y="-121" width="22" height="3"/><rect x="-1.5" y="-190" width="3" height="58"/>`;
}
// Hanok hall: tiled roof with upturned eaves, paper doors.
function hanok() {
  let d = "";
  for (let x = -44; x <= 20; x += 32) d += `<rect class="pp" x="${x}" y="-40" width="24" height="40"/><rect x="${x + 11}" y="-40" width="2" height="40"/>`;
  return `<path d="M-96,-60 Q-74,-50 -62,-52 L62,-52 Q74,-50 96,-60 L54,-86 L-54,-86Z"/><rect x="-52" y="-92" width="104" height="8" rx="3"/><rect x="-58" y="-52" width="116" height="52"/>${d}<rect x="-72" y="0" width="144" height="7"/>`;
}
const bubble = (w = 110) => `<path d="M${-w / 2},-26 h${w} a12,12 0 0 1 12,12 v26 a12,12 0 0 1 -12,12 h${-(w - 34)} l-16,16 v-16 h-18 a12,12 0 0 1 -12,-12 v-26 a12,12 0 0 1 12,-12z"/>`;
const dots = `<circle class="pp" cx="-22" cy="-1" r="6"/><circle class="pp" cx="0" cy="-1" r="6"/><circle class="pp" cx="22" cy="-1" r="6"/>`;
Object.assign(SCENES, {
  seoul(r) {
    const m = mountains(r, { near: 292 }), mi = mist(238, 62), hill = grad(140, 300, 0.42);
    return { defs: m.defs + mi.defs + hill.def, body: sun(420, 78, 28) + m.body + `<path d="M500,300 C545,215 590,190 630,188 C680,188 725,225 790,300Z" fill="url(#${hill.id})"/>`
      + obj(630, 192, 0.9, nTower(), 0.82) + mi.body + birds(300, 112, 1) };
  },
  hanok(r) {
    const m = mountains(r, { layers: [0, 1], strength: 0.85 }), mi = mist(215, 70);
    return { defs: m.defs + mi.defs, body: sun(330, 76, 26) + m.body + mi.body + obj(610, 262, 1.15, hanok(), 0.78) + `<rect x="0" y="268" width="${W}" height="2" class="w" opacity=".3"/>` + birds(180, 120, 0.9) };
  },
  cafe(r) {
    const m = mountains(r, { layers: [0, 1], strength: 0.8 }), mi = mist(200, 60);
    return { defs: m.defs + mi.defs, body: sun(700, 70, 26) + m.body + mi.body
      + `<rect class="w" x="440" y="252" width="340" height="7" rx="2" opacity=".7"/><rect class="w" x="460" y="259" width="7" height="40" opacity=".6"/><rect class="w" x="752" y="259" width="7" height="40" opacity=".6"/>`
      + obj(600, 252, 2.4, cup, 0.8) + steam(588, 185, 1.1) + obj(700, 252, 1.3, cup, 0.7) };
  },
  chat(r) {
    const m = mountains(r, { layers: [0, 1], strength: 0.75 }), mi = mist(200, 100);
    return { defs: m.defs + mi.defs, body: sun(300, 80, 24) + m.body + mi.body + obj(560, 120, 1.05, bubble(120) + dots, 0.72)
      + `<g transform="translate(680,215) scale(-1,1)">${obj(0, 0, 0.95, bubble(100), 0.5)}</g>` };
  },
  phone(r) {
    const m = mountains(r, { layers: [0, 1], strength: 0.75 }), mi = mist(200, 100);
    return { defs: m.defs + mi.defs, body: sun(320, 80, 24) + m.body + mi.body
      + `<rect class="st" x="560" y="40" width="130" height="236" rx="20" stroke-width="7" opacity=".6"/>`
      + obj(612, 105, 0.5, bubble(110) + dots, 0.7) + `<g transform="translate(640,165) scale(-1,1)">${obj(0, 0, 0.5, bubble(100), 0.45)}</g>` + obj(612, 225, 0.5, bubble(110), 0.7) };
  },
  dawn(r) {
    const m = mountains(r, { far: 195, mid: 232, near: 284 }), mi = mist(236, 64);
    return { defs: m.defs + mi.defs, body: sun(590, 120, 44, 0.7) + m.body + mi.body + birds(320, 100, 1.1) + birds(470, 70, 0.7) };
  }
});

function brushFilter() {
  const id = "kt-b" + (++uid);
  return { id, def: `<filter id="${id}" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="3"/><feDisplacementMap in="SourceGraphic" scale="7"/></filter>` };
}

window.KTArt = {
  pick(mod) { return (mod && (mod.art || DEFAULT[mod.id] || AREA[mod.area])) || "home"; },
  scene(name, opt = {}) {
    const make = SCENES[name] || SCENES.home;
    const b = opt.brush ? brushFilter() : null;
    brushId = b && b.id;
    const s = make(rng(name + (opt.seed || "")));
    brushId = null;
    const defs = s.defs + (b ? b.def : ""), body = s.body;
    return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="${opt.align || "xMidYMid"} slice" aria-hidden="true" focusable="false"><defs>${defs}</defs>${body}</svg>`;
  },
  backdrop() {
    const r = rng("backdrop"), defs = [], out = [];
    [[300, 170, 7, 0.07], [360, 120, 6, 0.1]].forEach(([base, amp, n, op]) => {
      const g = grad(base - amp, base + 40, op); defs.push(g.def);
      out.push(`<path d="${ridge(r, base, amp, n, 0, 1200, 400)}" fill="url(#${g.id})"/>`);
    });
    return `<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false"><defs>${defs.join("")}</defs>${out.join("")}</svg>`;
  },
  names: Object.keys(SCENES)
};
})();
