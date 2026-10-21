// ─────────────────────────────────────────────────────────────
//  MODULE LIST — the app loads these files from the modules/ folder.
//  To add a module: copy _template.js, rename it, then add its
//  file name (without .js) to the right place below.
// ─────────────────────────────────────────────────────────────

KT.areas = [
  { id: "start",   title: "Start here",       ko: "시작" },     // shown first on the home page
  { id: "daily",   title: "Day to day",       ko: "일상" },
  { id: "culture", title: "Slang & texting",  ko: "요즘 말" }
];

KT.files = [
  "basics", "survival", "time",                                   // start
  "cafe", "food", "shopping", "transport", "people", "feelings", "help",   // daily
  "slang"                                                         // culture
];

// Newest first. The top entry shows on the home page.
KT.changelog = [
  { date: "2026-10-21", text: "Slang update: 책없쾌, 할렐야루, 엔믹스하다." },
  { date: "2026-10-11", text: "First release: Hangul trainer, 8 conversation scenes, sentence builder, numbers game, politeness switch, and 11 phrase modules including slang." }
];
