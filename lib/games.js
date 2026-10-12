// Play pages: Hangul trainer, conversation scenes, sentence builder, politeness switch, numbers, listening.
// Everything here draws into #app (or the quiz overlay) and uses window.KTApp for speech, storage and points.
(function () {
"use strict";
const A = () => window.KTApp, H = window.KHangul;
const app = document.getElementById("app");
const $ = s => document.querySelector(s);
// Progress on this device: hangul {lesson: best score 0–1}, scenes {id: stars}, build / lab = how many solved, quiz {key: best score}.
let P = null;
function prog() { if (!P) P = Object.assign({ hangul: {}, scenes: {}, build: 0, lab: 0, quiz: {} }, A().store.get("kt_play_v1", {})); return P; }
const save = () => A().store.set("kt_play_v1", P);
const esc = s => A().esc(s);
const rnd = n => Math.floor(Math.random() * n);
const shuffle = a => A().shuffle(a.slice());
const lines = text => String(text || "").split("\n").map(l => l.trim()).filter(l => l && !l.startsWith("//")).map(l => l.split("|").map(s => s.trim()));
const ko = text => A().koHTML({ ko: text });   // Korean with romanization under each word
const head = (title, koT, back, backLabel) => `<div class="mhead"><a class="back" href="${back}">${A().ICON.back} ${esc(backLabel)}</a>
  <div class="mtitle"><div><div class="koT">${esc(koT)}</div><h1>${esc(title)}</h1></div></div></div>`;
const guide = id => { const g = (KT.guides || {})[id]; return g ? A().guideHTML("g-" + id, g.label, g.guide) : ""; };
const gtip = id => { const g = (KT.guides || {})[id], x = GAMES.find(y => y[0] === id); return g && x ? A().tipAttr(x[2] + " · " + x[3], g.tip) : ""; };
const burst = (el, n) => { if (window.KTMotion) KTMotion.burst(el, n); };
const PASS = 0.8;   // share of quiz answers needed to tick a Hangul lesson off

/* ───────────── quiz: one question at a time, four answers ─────────────
   startQuiz({ title, key, qs, again, done })
   q = { top, big, en, say, listen, one, opts: [{ h, ok, kr }], after }
     say + listen: the question is the audio.  say alone: the answer is read out afterwards. */
const qz = document.createElement("div");
qz.className = "pr"; qz.id = "qz"; qz.setAttribute("role", "dialog"); qz.setAttribute("aria-label", "Quiz");
qz.innerHTML = `<div class="pr-top">
    <button class="icon-btn" data-q="close" aria-label="Close quiz"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
    <span class="count" id="qzCount"></span><span class="grow"></span><span class="count" id="qzScore"></span></div>
  <div class="pr-prog"><i id="qzBar"></i></div>
  <div class="pr-body"><div class="flash" id="qzCard"></div></div>
  <div class="pr-btns" id="qzBtns"></div>`;
document.body.appendChild(qz);
let Q = null;
function startQuiz(o) {
  if (!o.qs.length) return;
  Q = Object.assign({ i: 0, score: 0 }, o);
  qz.classList.add("open"); document.body.style.overflow = "hidden";
  drawQ();
}
function closeQuiz() { qz.classList.remove("open"); document.body.style.overflow = ""; A().stopAudio(); A().route(); }
function drawQ() {
  const n = Q.qs.length, card = $("#qzCard"), btns = $("#qzBtns");
  $("#qzBar").style.width = (Q.i / n * 100) + "%";
  $("#qzScore").textContent = Q.score ? "✓ " + Q.score : "";
  if (Q.i >= n) {
    const pts = Q.score * 2, r = Q.score / n;
    prog().quiz[Q.key] = Math.max(P.quiz[Q.key] || 0, r); save();
    if (Q.done) Q.done(r);
    A().award(pts, Q.score);
    $("#qzCount").textContent = Q.title;
    card.className = "flash done";
    card.innerHTML = `<h2>${r >= PASS ? "Well done 🎉" : "Round done"}</h2><p>${Q.score} of ${n} correct · +${pts} pts</p>${Q.note ? `<p>${esc(Q.note(r))}</p>` : ""}`;
    if (r >= PASS) A().confetti();
    btns.innerHTML = `<button class="btn ghost" data-q="close">Close</button><button class="btn primary" data-q="again">Another round</button>`;
    return;
  }
  const q = Q.qs[Q.i];
  Q.answered = false;
  $("#qzCount").textContent = `${Q.i + 1} / ${n}`;
  card.className = "flash";
  card.innerHTML = `${q.top ? `<div class="q-top">${esc(q.top)}</div>` : ""}
    ${q.listen ? `<button class="q-say" data-q="say" aria-label="Play again">${A().ICON.say}</button>` : ""}
    ${q.big ? `<div class="q-big${q.en ? " en" : ""}">${q.big}</div>` : ""}
    <div class="q-opts${q.one ? " one" : ""}">${q.opts.map((o, j) => `<button class="q-opt${o.kr ? " kr" : ""}" data-opt="${j}">${o.h}</button>`).join("")}</div>
    <div class="q-after" id="qzAfter"></div>`;
  btns.innerHTML = "";
  if (q.listen) A().speak(q.say, card.querySelector(".q-say"));
}
function answer(j) {
  const q = Q && Q.qs[Q.i];
  if (!q || Q.answered || !q.opts[j]) return;
  Q.answered = true;
  if (q.opts[j].ok) { Q.score++; burst(document.querySelectorAll("#qzCard .q-opt")[j]); }
  document.querySelectorAll("#qzCard .q-opt").forEach((b, k) => { b.disabled = true; if (q.opts[k].ok) b.classList.add("right"); else if (k === j) b.classList.add("wrong"); });
  $("#qzAfter").innerHTML = q.after || "";
  $("#qzScore").textContent = Q.score ? "✓ " + Q.score : "";
  $("#qzBtns").innerHTML = `<button class="btn primary" data-q="next">${Q.i + 1 < Q.qs.length ? "Next" : "Finish"}</button>`;
  if (q.say && !q.listen) A().speak(q.say);
}
qz.addEventListener("click", e => {
  const o = e.target.closest("[data-opt]"), b = e.target.closest("[data-q]");
  if (o) return answer(+o.dataset.opt);
  if (!b) return;
  const a = b.dataset.q;
  if (a === "close") closeQuiz();
  else if (a === "next") { Q.i++; drawQ(); }
  else if (a === "again") startQuiz(Q.again());
  else if (a === "say") A().speak(Q.qs[Q.i].say, b);
});
document.addEventListener("keydown", e => {
  if (!qz.classList.contains("open")) return;
  if (e.key === "Escape") closeQuiz();
  else if (/^[1-4]$/.test(e.key)) answer(+e.key - 1);
  else if ((e.key === "Enter" || e.key === " ") && Q.answered) { e.preventDefault(); Q.i++; drawQ(); }
});
// The right answer plus up to three different wrong ones from the pool, shuffled.
function choices(right, pool, render, n = 4) {
  const seen = new Set([right]), out = [{ v: right, ok: 1 }];
  for (const v of shuffle(pool)) { if (out.length >= n) break; if (!seen.has(v)) { seen.add(v); out.push({ v }); } }
  return shuffle(out).map(o => Object.assign(render(o.v), { ok: o.ok }));
}
const plain = v => ({ h: esc(v) }), hangul = v => ({ h: esc(v), kr: 1 });

/* ───────────── play hub + home strip ───────────── */
const GAMES = [
  ["hangul", "한", "Hangul", "한글", "Learn to read the alphabet in eight short lessons"],
  ["scenes", "💬", "Conversations", "대화", "Role-play a café, a taxi, a shop — you choose what to say"],
  ["build", "🧩", "Sentence builder", "문장 만들기", "Put the word tiles in Korean order"],
  ["shadow", "🎙️", "Shadowing", "따라 말하기", "Hear it, say it, compare your voice with the model"],
  ["listen", "🎧", "Listening", "듣기", "Hear a phrase, pick what it means"],
  ["watch", "▶️", "Watch", "영상", "Short videos of real cafés, taxis and shops, by Korean teachers"],
  ["numbers", "🔢", "Numbers", "숫자", "Prices, counting and the clock — both number systems"],
  ["polite", "🙇", "Politeness switch", "존댓말", "The same phrase for a friend, a stranger, a boardroom"]
];
function status(id) {
  prog();
  if (id === "hangul") { const n = KT.hangul.filter(l => (P.hangul[l.id] || 0) >= PASS).length; return n ? `${n} of ${KT.hangul.length}` : ""; }
  if (id === "scenes") { const n = Object.keys(P.scenes).length; return n ? `${n} of ${KT.scenes.length}` : ""; }
  if (id === "build") { const n = lines(KT.builder).length; return P.build ? `${Math.min(P.build, n)} of ${n}` : ""; }
  return "";
}
function renderPlay() {
  app.innerHTML = `<h1 class="hello">Play your way in. <span>놀면서 배워요.</span></h1>
    <p class="lead">Short games that count towards your daily goal. New to Korean? Start with Hangul.</p>
    <div class="gcards">${GAMES.map(g => `<a class="gcard" href="#/${g[0]}"${gtip(g[0])}><span${g[0] === "hangul" ? ' style="font-family:var(--ko);font-weight:700;color:var(--accent)"' : ""}>${g[1]}</span>
      <div><b>${g[2]}</b><i>${g[3]}</i><small>${g[4]}</small></div>${status(g[0]) ? `<em>${status(g[0])}</em>` : ""}</a>`).join("")}</div>`;
}
// Shown on the home page under the goal banner: the Hangul course until it is finished…
function starterHTML() {
  prog();
  const done = KT.hangul.filter(l => (P.hangul[l.id] || 0) >= PASS).length, next = KT.hangul.find(l => (P.hangul[l.id] || 0) < PASS);
  return !next ? "" : `<a class="starter"${gtip("hangul")} href="#/hangul/${next.id}"><div class="big">한</div><div>
      <b>${done ? "Keep going with Hangul" : "Start here: learn to read Hangul"}</b>
      <small>${done ? `Next: ${esc(next.title)}` : "24 letters, eight short lessons. No more guessing from romanization."}</small>
      <div class="bar"><i style="width:${done / KT.hangul.length * 100}%"></i></div></div></a>`;
}
// …and the row of games.
function playRowHTML() {
  prog();
  return `<section class="area" data-sec><h2>Play <span>놀이</span></h2><div class="hscroll">${GAMES.map(g =>
    `<a class="gmini" href="#/${g[0]}"${gtip(g[0])}><span${g[0] === "hangul" ? ' style="font-family:var(--ko);font-weight:700;color:var(--accent)"' : ""}>${g[1]}</span><b>${g[2]}</b><small>${status(g[0]) || g[3]}</small></a>`).join("")}</div></section>`;
}
const homeHTML = () => starterHTML() + playRowHTML();

/* ───────────── Hangul ───────────── */
const isVowel = ch => H.VOWEL.includes(ch);
const sayLetter = l => l[3] || (isVowel(l[0]) ? H.compose("ㅇ", l[0]) : H.compose(l[0], "ㅏ"));
function renderHangul(arg) {
  prog();
  if (arg === "lab") return renderLab();
  const L = KT.hangul.find(l => l.id === arg);
  if (L) return renderLesson(L);
  app.innerHTML = head("Hangul", "한글", "#/play", "Play")
    + `<p class="lead">Hangul was designed to be learned in a morning: 24 letters, stacked into blocks of one syllable each. Do the lessons in order — each ends with a short quiz.</p>${guide("hangul")}
    <div class="list" style="margin-top:16px">${KT.hangul.map((l, i) => { const r = P.hangul[l.id] || 0;
      return `<a class="lrow${r >= PASS ? " done" : ""}" href="#/hangul/${l.id}"><span>${r >= PASS ? "✓" : i + 1}</span><div><b>${esc(l.title)}</b><small>${esc(l.letters.length ? l.letters.map(x => x[0]).join(" ") : l.ko)}</small></div><em>${r ? Math.round(r * 100) + "%" : ""}</em></a>`; }).join("")}</div>
    <a class="gcard" href="#/hangul/lab" style="margin-top:16px"><span>🧪</span><div><b>Block lab</b><i>글자 만들기</i><small>Snap letters together and hear the syllable you made</small></div>${P.lab ? `<em>${P.lab} built</em>` : ""}</a>`;
}
function renderLesson(L) {
  const i = KT.hangul.indexOf(L), next = KT.hangul[i + 1], r = P.hangul[L.id] || 0;
  app.innerHTML = head(L.title, L.ko, "#/hangul", "Hangul")
    + `<p class="lead">${esc(L.intro)}</p>
    ${L.letters.length ? `<div class="letters">${L.letters.map(l => `<button class="letter" data-g="say" data-say="${esc(sayLetter(l))}"><b>${esc(l[0])}</b><div><span>${esc(l[1])}</span><small>${esc(l[2])}</small></div></button>`).join("")}</div>` : ""}
    <section class="area"><h2>Read these <span>읽어 보기</span><em>tap to hear</em></h2>
      <div class="words">${L.words.map(w => `<button class="word" data-g="say" data-say="${esc(w[0])}">${w[2] ? `<span class="wp" aria-hidden="true">${w[2]}</span>` : ""}<b>${esc(w[0])}</b><i>${esc(H.rom(w[0]))}</i><small>${esc(w[1])}</small></button>`).join("")}</div></section>
    <div class="pager"><button class="btn primary" data-g="hquiz" data-id="${L.id}">${A().ICON.play} ${r >= PASS ? "Quiz again" : "Take the quiz"}</button>
      ${next ? `<a class="btn ghost" href="#/hangul/${next.id}">Next: ${esc(next.title)} →</a>` : `<a class="btn ghost" href="#/m/basics">Next: First Words →</a>`}</div>
    <p class="section-note">${r ? `Best score ${Math.round(r * 100)}%. ` : ""}Score ${PASS * 100}% or more to tick this lesson off.</p>`;
}
function hangulQuiz(L) {
  const idx = KT.hangul.indexOf(L), qs = [];
  // wrong answers come from this lesson and the earlier ones, vowels against vowels, consonants against consonants
  const pool = KT.hangul.slice(0, idx + 1).filter(x => x.quiz !== "words").flatMap(x => x.letters).filter(l => l[1] !== "–");
  if (L.quiz !== "words") shuffle(L.letters.filter(l => l[1] !== "–")).slice(0, 6).forEach((l, i) => {
    const same = pool.filter(x => isVowel(x[0]) === isVowel(l[0]));
    if (i % 2 === 0) qs.push({ top: "What sound is this?", big: esc(l[0]), say: sayLetter(l), opts: choices(l[1], same.map(x => x[1]), plain) });
    else qs.push({ top: "Which letter makes this sound?", big: `“${esc(l[1])}”`, en: 1, say: sayLetter(l), listen: 1, opts: choices(l[0], same.map(x => x[0]), hangul) });
  });
  const pic = {};
  L.words.forEach(w => { pic[w[1]] = w[2] || ""; });
  shuffle(L.words).slice(0, L.quiz === "words" ? 10 : 6).forEach((w, i) => {
    const rom = H.rom(w[0]);
    if (i % 2 === 0) qs.push({ top: "How do you read this?", big: esc(w[0]), say: w[0], opts: choices(rom, L.words.map(x => H.rom(x[0])), plain), after: `${w[2] || ""} ${esc(w[0])} = ${esc(w[1])}` });
    else qs.push({ top: "What does this say?", big: esc(w[0]), say: w[0], opts: choices(w[1], L.words.map(x => x[1]), v => ({ h: `<span class="op">${pic[v]}</span>${esc(v)}` })), after: `${esc(w[0])} · ${esc(rom)}` });
  });
  return { title: L.title, key: "h-" + L.id, qs: shuffle(qs), again: () => hangulQuiz(L),
    done: r => { P.hangul[L.id] = Math.max(P.hangul[L.id] || 0, r); save(); },
    note: r => r >= PASS ? "Lesson ticked off." : `Score ${PASS * 100}% to tick this lesson off — have another go.` };
}

// Block lab: pick a first consonant, a vowel and (optionally) a final consonant; see and hear the block.
const lab = { l: "", v: "", t: "", goal: "", mode: "free" };
const LAB_L = [..."ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㄲㄸㅃㅆㅉ"], LAB_V = [..."ㅏㅓㅗㅜㅡㅣㅑㅕㅛㅠㅐㅔㅘㅝㅟㅚㅢ"], LAB_T = [..."ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ"];
function renderLab() {
  app.innerHTML = head("Block lab", "글자 만들기", "#/hangul", "Hangul")
    + `<p class="lead">Every Korean syllable is one block: a consonant, a vowel, and sometimes a final consonant underneath.</p><div class="panel" id="lab"></div>`;
  if (lab.mode === "goal" && !lab.goal) newGoal();
  drawLab();
}
function newGoal() { lab.goal = KT.blocks[prog().lab % KT.blocks.length]; lab.l = lab.v = lab.t = ""; }
function drawLab(pop) {
  const out = lab.l && lab.v ? H.compose(lab.l, lab.v, lab.t) : "";
  const row = (title, part, list, none) => `<div class="picker"><h4>${title}</h4><div class="keys-row">${none ? `<button class="kbtn wide" data-g="lab" data-part="t" data-ch="" aria-pressed="${!lab.t}">none</button>` : ""}${list.map(ch =>
    `<button class="kbtn" data-g="lab" data-part="${part}" data-ch="${ch}" aria-pressed="${lab[part] === ch}">${ch}</button>`).join("")}</div></div>`;
  $("#lab").innerHTML = `<div class="seg"><button data-g="labmode" data-mode="free" aria-pressed="${lab.mode === "free"}">Free play</button><button data-g="labmode" data-mode="goal" aria-pressed="${lab.mode === "goal"}">Challenge</button></div>
    ${lab.mode === "goal" ? `<div class="lab-goal">Build the block that sounds like <b>${esc(H.rom(lab.goal))}</b> <button class="btn small" data-g="say" data-say="${lab.goal}">${A().ICON.say} Hear it</button></div>` : ""}
    <div class="lab-eq"><span class="jamo${lab.l ? " l" : ""}">${lab.l || "?"}</span><u>+</u><span class="jamo${lab.v ? " v" : ""}">${lab.v || "?"}</span><u>+</u><span class="jamo${lab.t ? " t" : ""}">${lab.t || "–"}</span><u>=</u>
      <button class="lab-out${pop ? " pop" : ""}" data-g="say" data-say="${out}" aria-label="Hear it">${out || "·"}</button></div>
    <div class="lab-rom">${out ? esc(H.rom(out)) : ""}</div>
    ${row("1 · First consonant", "l", LAB_L)}${row("2 · Vowel", "v", LAB_V)}${row("3 · Final consonant (optional)", "t", LAB_T, true)}`;
  if (pop && out) {
    A().speak(out);
    if (lab.mode === "goal" && out === lab.goal) {
      P.lab++; save(); A().award(1, 1); A().toast(`✓ ${out} — ${H.rom(out)}`);
      setTimeout(() => { if (location.hash === "#/hangul/lab") { newGoal(); drawLab(); } }, 1100);
    }
  }
}

/* ───────────── conversation scenes ───────────── */
let sc = null;
const STAR = n => [1, 2, 3].map(i => i <= n ? "⭐" : "<u>⭐</u>").join("");
function renderScenes(arg) {
  prog();
  const s = KT.scenes.find(x => x.id === arg);
  if (s) return playScene(s);
  sc = null;
  app.innerHTML = head("Conversations", "대화", "#/play", "Play")
    + `<p class="lead">You're in Seoul. Someone speaks; you pick what to say. Three stars if you get every line right first time.</p>${guide("scenes")}
    <div class="gcards">${KT.scenes.map(x => `<a class="gcard" href="#/scenes/${x.id}"><span>${x.icon}</span><div><b>${esc(x.title)}</b><i>${esc(x.ko)}</i><small>${x.steps.filter(t => t[0] === "y").length} lines to say</small></div>${P.scenes[x.id] ? `<em>${STAR(P.scenes[x.id])}</em>` : ""}</a>`).join("")}</div>`;
}
function playScene(s) {
  sc = { s, i: 0, miss: 0, turns: 0, clean: 0, missed: false };
  const pl = (KT.places || []).find(x => (x.scenes || []).includes(s.id)), turns = s.steps.filter(t => t[0] === "y").length;
  app.innerHTML = head(s.title, s.ko, "#/scenes", "Conversations")
    + (pl ? A().dioHTML(pl, "banner") : "")
    + `<p class="setting">${s.face ? `<span aria-hidden="true">${s.face}</span>` : ""}${esc(s.set || "")}</p>
    <div class="dots" id="dots" aria-hidden="true">${"<i></i>".repeat(turns)}</div>
    <div class="chat" id="chat"></div><div id="turn"></div>`;
  stepScene(sc);
}
const toBottom = () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
// One line of the conversation, with the speaker's face beside it. A line that names a price gets a little receipt.
function bubble(run, who, text, en) {
  const row = document.createElement("div"), price = who === "t" && /([\d,]+) won/.exec(en);
  row.className = "brow " + who;
  row.innerHTML = `<span class="av" aria-hidden="true">${who === "t" ? run.s.face || "🧑" : "🙂"}</span>
    <button class="bub ${who}" data-g="say" data-say="${esc(text)}"><div class="who">${who === "t" ? esc(run.s.who) : "You"}</div><div class="ko">${ko(text)}</div><div class="en">${esc(en)}</div>${price ? `<div class="rcpt">🧾 ₩${price[1]}</div>` : ""}</button>`;
  $("#chat").appendChild(row);
  if (A().S.autoplay) A().speak(text, row.querySelector(".bub"));
  toBottom();
}
function stepScene(run) {
  if (sc !== run || !$("#chat")) return;   // the reader has moved on
  const st = run.s.steps[run.i];
  if (!st) return endScene(run);
  if (st[0] === "t") {
    // three dots first, as if they are about to speak, then the line itself
    const wait = document.createElement("div");
    wait.className = "brow t typing";
    wait.innerHTML = `<span class="av" aria-hidden="true">${run.s.face || "🧑"}</span><div class="bub t"><i></i><i></i><i></i></div>`;
    $("#chat").appendChild(wait); toBottom();
    setTimeout(() => {
      wait.remove();
      if (sc !== run || !$("#chat")) return;
      bubble(run, "t", st[1], st[2]);
      run.i++;
      const nx = run.s.steps[run.i];
      setTimeout(() => stepScene(run), nx && nx[0] === "y" ? 700 : 1700);
    }, A().S.motion === false ? 150 : 750);
    return;
  }
  run.missed = false; run.opts = shuffle(st[2]);
  const cue = window.KTIcon ? KTIcon(st[1]) : "";
  $("#turn").innerHTML = `<div class="say-turn"><h4><small>Your turn</small>${cue ? `<span class="pi" aria-hidden="true">${cue}</span>` : ""}${esc(st[1])}</h4>${run.opts.map((o, j) =>
    `<button class="sopt" data-g="pick" data-i="${j}"><div class="ko">${ko(o[0])}</div></button>`).join("")}</div>`;
  toBottom();
}
function pickLine(b) {
  const run = sc, o = run && run.opts && run.opts[+b.dataset.i];
  if (!o) return;
  if (!o[2]) {
    if (!b.classList.contains("wrong")) { b.classList.add("wrong"); b.insertAdjacentHTML("beforeend", `<span class="why">“${esc(o[1])}” — ${esc(o[3] || "not this one.")}</span>`); run.miss++; run.missed = true; }
    return;
  }
  run.turns++; if (!run.missed) run.clean++;
  burst(b, run.missed ? 4 : 9);
  const dot = document.querySelectorAll("#dots i")[run.turns - 1];
  if (dot) dot.className = run.missed ? "miss" : "ok";
  run.opts = null; $("#turn").innerHTML = "";
  bubble(run, "y", o[0], o[1]);
  run.i++;
  setTimeout(() => stepScene(run), 1700);
}
function endScene(run) {
  const stars = run.miss === 0 ? 3 : run.miss <= 2 ? 2 : 1, s = run.s, nx = KT.scenes[KT.scenes.indexOf(s) + 1];
  const pts = run.clean * 2 + 5;
  P.scenes[s.id] = Math.max(P.scenes[s.id] || 0, stars); save();
  A().award(pts, run.turns);
  if (stars === 3) A().confetti();
  $("#turn").innerHTML = `<div class="scene-done"><div class="stars">${STAR(stars)}</div><h3>${stars === 3 ? "Perfect!" : stars === 2 ? "Nicely done" : "You got through it"}</h3>
    <p>${run.clean} of ${run.turns} lines right first time · +${pts} pts. Tap any bubble to hear it again.</p>
    <div class="flash-acts"><button class="btn ghost" data-g="replay">Play again</button>${nx ? `<a class="btn primary" href="#/scenes/${nx.id}">Next: ${esc(nx.title)} →</a>` : `<a class="btn primary" href="#/scenes">All conversations</a>`}</div></div>`;
  toBottom();
}

/* ───────────── sentence builder ───────────── */
let bd = null;
// "저+는 커피+를 안_먹어요." → tiles [{ base: "저", part: "는" }, …]
function parseBuild() {
  return lines(KT.builder).map(([en, k, tip]) => ({ en, tip: tip || "", tiles: k.split(/\s+/).map((t, id) => {
    const [base, part] = t.replace(/_/g, " ").split("+");
    return { id, base, part: part || "", text: base + (part || "") };
  }) }));
}
function renderBuild() {
  prog();
  const all = parseBuild();
  if (!bd || bd.all.length !== all.length) bd = { all, i: P.build % all.length };
  loadBuild();
  app.innerHTML = head("Sentence builder", "문장 만들기", "#/play", "Play")
    + guide("build") + `<div class="panel" id="build"></div>
    <section class="area"><h2>Particles <span>조사</span></h2><p class="lead" style="margin-top:0">Small tags stuck on the end of a word that say what job it does. They are the coloured bits on the tiles.</p>
      <div class="legend">${KT.particles.map(p => `<div><b>${esc(p[0])}</b>${esc(p[1])} — ${esc(p[2])}</div>`).join("")}</div></section>`;
  drawBuild();
}
function loadBuild() { const s = bd.all[bd.i]; bd.s = s; bd.bank = shuffle(s.tiles); bd.placed = []; bd.state = ""; bd.msg = ""; }
function drawBuild() {
  const s = bd.s, tile = (t, used) => `<button class="tile${used ? " used" : ""}" data-g="tile" data-id="${t.id}"><b>${esc(t.base)}${t.part ? `<u>${esc(t.part)}</u>` : ""}</b><i>${esc(H.rom(t.text))}</i></button>`;
  $("#build").innerHTML = `<div class="q-top">Sentence ${bd.i + 1} of ${bd.all.length}</div><p class="b-en">${esc(s.en)}</p>
    <div class="b-line ${bd.state}">${bd.placed.map(t => tile(t)).join("")}</div>
    <div class="b-bank">${bd.bank.map(t => tile(t, bd.placed.includes(t))).join("")}</div>
    <div class="b-msg">${bd.msg}</div>
    <div class="flash-acts">${bd.state === "right" ? `<button class="btn primary" data-g="bnext">Next sentence →</button>` : `<button class="btn ghost small" data-g="bskip">Skip</button><button class="btn ghost small" data-g="bshow">Show answer</button>`}</div>`;
}
function tapTile(id) {
  if (bd.state === "right") return;
  const t = bd.s.tiles[id], at = bd.placed.indexOf(t);
  if (at >= 0) bd.placed.splice(at, 1); else bd.placed.push(t);
  bd.state = ""; bd.msg = "";
  if (bd.placed.length === bd.s.tiles.length) {
    const n = bd.s.tiles.length, exact = bd.placed.every((p, i) => p.id === i), verbLast = bd.placed[n - 1].id === n - 1;
    const full = bd.s.tiles.map(x => x.text).join(" ");
    if (exact || verbLast) {
      bd.state = "right";
      bd.msg = `<b>✓ Correct.</b> ${exact ? "" : `Korean word order is loose, so that works too. Most natural: ${esc(full)} `}${esc(bd.s.tip)}`;
      A().speak(full);
      setTimeout(() => burst($(".b-line")), 60);
      if (bd.i >= P.build) { P.build = bd.i + 1; save(); }
      A().award(3, 1);
    } else { bd.state = "wrong"; bd.msg = "Not quite — the verb goes at the very end. Tap a tile to take it back."; }
  }
  drawBuild();
}

/* ───────────── politeness switch ───────────── */
let pol = "p";
const polRows = () => lines(KT.polite).map(([en, c, p, f, note]) => ({ en, c, p, f, note: note || "" }));
function renderPolite() {
  const lv = KT.politeLevels.find(l => l.id === pol), others = KT.politeLevels.filter(l => l.id !== pol);
  app.innerHTML = head("Politeness switch", "존댓말", "#/play", "Play")
    + `<p class="lead">Korean changes its verb endings depending on who you're talking to. Flip the switch and watch every phrase change.</p>${guide("polite")}
    <div class="tools"><div class="seg">${KT.politeLevels.map(l => `<button data-g="pol" data-lv="${l.id}" aria-pressed="${l.id === pol}">${l.face} ${esc(l.title)}</button>`).join("")}</div>
      <span class="grow"></span><button class="btn small" data-g="polquiz">${A().ICON.play} Quiz</button></div>
    <div class="whofor"><span class="face" aria-hidden="true">${lv.face}</span><div><b>${esc(lv.title)} · ${esc(lv.ko)}</b> — ${esc(lv.who)}</div></div>
    <div class="list" style="margin-top:14px">${polRows().map(r => `<button class="prow" data-g="say" data-say="${esc(r[pol])}">
      <div><p class="en-t">${esc(r.en)}</p>${r.note ? `<div class="note">${esc(r.note)}</div>` : ""}</div>
      <div><div class="ko">${ko(r[pol])}</div><span class="alt">${others.map(o => `${esc(o.title)}: ${esc(r[o.id])}`).join(" · ")}</span></div></button>`).join("")}</div>`;
}
function politeQuiz() {
  const who = { c: "👫 A close friend", p: "🧑‍💼 A stranger, staff or a colleague", f: "🎤 A formal speech or announcement" };
  const qs = shuffle(polRows()).slice(0, 10).map(r => {
    const lv = "cpf"[rnd(3)];
    return { top: `“${r.en}” — who is this for?`, big: ko(r[lv]), say: r[lv], one: 1, opts: shuffle(["c", "p", "f"]).map(k => ({ h: who[k], ok: k === lv })),
      after: KT.politeLevels.map(l => `${esc(l.title)}: ${esc(r[l.id])}`).join(" · ") };
  });
  return { title: "Politeness", key: "polite", qs, again: politeQuiz };
}

/* ───────────── numbers ───────────── */
const COUNTERS = [["개", "thing", "things", "🍎"], ["명", "person", "people", "🧍"], ["잔", "cup", "cups", "☕"], ["병", "bottle", "bottles", "🍾"]];
function clockSVG(h, m) {
  const ticks = Array.from({ length: 12 }, (_, i) => `<line x1="50" y1="7" x2="50" y2="${i % 3 ? 11 : 15}" transform="rotate(${i * 30} 50 50)"/>`).join("");
  return `<svg class="clock" viewBox="0 0 100 100" aria-hidden="true"><circle class="face" cx="50" cy="50" r="46"/><g class="ticks">${ticks}</g>
    <line class="hh" x1="50" y1="52" x2="50" y2="27" style="--a:${(h % 12 + m / 60) * 30}deg"/><line class="mh" x1="50" y1="52" x2="50" y2="14" style="--a:${m * 6}deg"/><circle class="pin" cx="50" cy="50" r="3.5"/></svg>`;
}
const won = n => "₩" + n.toLocaleString("en");
const clock = (h, m) => h + ":" + String(m).padStart(2, "0");
const clockKo = (h, m) => H.native(h, true) + " 시" + (m === 30 ? " 반" : m ? " " + H.sino(m) + " 분" : "");
function numberQuiz(kind) {
  const qs = [];
  for (let i = 0; i < 10; i++) {
    const toKo = i % 2 === 0;   // odd questions go the other way: Korean (heard) → number
    let right, wrong, show, read, top, pic;
    if (kind === "price") {
      const make = () => [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 8000, 9000, 10000, 12000, 15000, 18000, 20000, 25000, 30000, 35000, 50000][rnd(23)];
      right = make(); wrong = Array.from({ length: 12 }, make); show = won; read = n => H.sino(n) + " 원"; top = toKo ? "How do you say this price?" : "How much is it?";
      pic = n => `<span class="ptag">${won(n)}</span>`;
    } else if (kind === "count") {
      const c = COUNTERS[rnd(COUNTERS.length)];
      right = 1 + rnd(10); wrong = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; show = n => `${c[3]} × ${n}`; read = n => H.native(n, true) + " " + c[0]; top = toKo ? "How do you say it?" : "How many?";
      pic = n => `<div class="cnt">${Array.from({ length: n }, (_, k) => `<span style="--i:${k}">${c[3]}</span>`).join("")}</div><div class="q-sub">${n} ${n === 1 ? c[1] : c[2]}</div>`;
    } else {
      const make = () => (1 + rnd(12)) * 100 + [0, 5, 10, 15, 20, 30, 40, 45, 50][rnd(9)];
      right = make(); wrong = Array.from({ length: 12 }, make); show = n => clock(Math.floor(n / 100), n % 100); read = n => clockKo(Math.floor(n / 100), n % 100); top = toKo ? "How do you say this time?" : "What time is it?";
      pic = n => clockSVG(Math.floor(n / 100), n % 100) + `<div class="q-sub">${show(n)}</div>`;
    }
    const k = read(right);
    if (toKo) qs.push({ top, big: pic(right), en: 1, say: k, one: 1, opts: choices(right, wrong, n => ({ h: ko(read(n)) })), after: esc(H.rom(k)) });
    else qs.push({ top, say: k, listen: 1, opts: choices(right, wrong, n => ({ h: esc(show(n)) })), after: ko(k) });
  }
  return { title: { price: "Prices", count: "Counting", time: "The clock" }[kind], key: "n-" + kind, qs, again: () => numberQuiz(kind) };
}
function renderNumbers() {
  prog();
  const best = k => P.quiz["n-" + k] ? `<em>best ${Math.round(P.quiz["n-" + k] * 100)}%</em>` : "";
  app.innerHTML = head("Numbers", "숫자", "#/play", "Play")
    + `<p class="lead">Korean has two sets of numbers. Sino numbers are for money, minutes and dates. Native numbers are for counting things, hours and age.</p>${guide("numbers")}
    <div class="gcards">
      <button class="gcard" data-g="nquiz" data-kind="price"><span>💰</span><div><b>Prices</b><i>얼마예요?</i><small>Sino numbers + 원</small></div>${best("price")}</button>
      <button class="gcard" data-g="nquiz" data-kind="count"><span>🍺</span><div><b>Counting</b><i>몇 개?</i><small>Native numbers + a counter word</small></div>${best("count")}</button>
      <button class="gcard" data-g="nquiz" data-kind="time"><span>🕒</span><div><b>The clock</b><i>몇 시예요?</i><small>Native hours, Sino minutes</small></div>${best("time")}</button>
    </div>
    <div class="panel"><h3>1 to 10, both ways</h3><p>Tap a number to hear it.</p>
      <table class="numtab"><tr><th></th><th>Sino — money, minutes</th><th>Native — things, hours</th></tr>
      ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => `<tr><td>${n}</td>${[H.sino(n), H.native(n)].map(k => `<td><button data-g="say" data-say="${k}"><b>${k}</b><small>${H.rom(k)}</small></button></td>`).join("")}</tr>`).join("")}
      </table></div>`;
}

/* ───────────── listening ───────────── */
function listenQuiz(m) {
  const items = m.items.filter(p => /[가-힣]/.test(p.ko));
  const qs = shuffle(items).slice(0, 10).map(p => ({ top: "What did you hear?", say: p.say || p.ko, listen: 1, one: 1,
    opts: choices(p.en, items.map(x => x.en), plain), after: `${p.icon ? `<div class="q-pic">${p.icon}</div>` : ""}<div class="ko">${ko(p.ko)}</div>` }));
  return { title: m.title, key: "l-" + m.id, qs, again: () => listenQuiz(m) };
}
function renderListen(arg) {
  prog();
  const direct = arg && A().mods.find(m => m.id === arg);
  if (direct) { history.replaceState(null, "", "#/listen"); setTimeout(() => startQuiz(listenQuiz(direct)), 0); }
  app.innerHTML = head("Listening", "듣기", "#/play", "Play")
    + `<p class="lead">You hear a phrase; pick what it means. Ten per round. Turn on “Slow voice” in settings if it's too quick.</p>${guide("listen")}
    <div class="gcards">${A().mods.map(m => `<button class="gcard" data-g="lquiz" data-id="${m.id}"><span class="art" style="overflow:hidden;--paper:var(--surface-2)">${A().art(m)}</span><div><b>${esc(m.title)}</b><i>${esc(m.ko)}</i><small>${m.items.length} phrases</small></div>
      ${P.quiz["l-" + m.id] ? `<em>best ${Math.round(P.quiz["l-" + m.id] * 100)}%</em>` : ""}</button>`).join("")}</div>`;
}

/* ───────────── shadowing: hear it, say it, then hear the model and yourself back to back ─────────────
   Nothing is uploaded: the recording stays in the page and is dropped when you move on. */
const sh = document.createElement("div");
sh.className = "pr"; sh.id = "sh"; sh.setAttribute("role", "dialog"); sh.setAttribute("aria-label", "Shadowing");
sh.innerHTML = `<div class="pr-top">
    <button class="icon-btn" data-s="close" aria-label="Close"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
    <span class="count" id="shCount"></span><span class="grow"></span><span class="count" id="shDone"></span></div>
  <div class="pr-prog"><i id="shBar"></i></div>
  <div class="pr-body"><div class="flash" id="shCard"></div></div>
  <div class="pr-btns" id="shBtns"></div>`;
document.body.appendChild(sh);
let SH = null;
const mic = { stream: null, rec: null, chunks: [], ctx: null, meter: 0, stop: 0, url: "", mine: new Audio() };
const SH_MSG = { listen: "Listen to the model…", say: "Your turn — tap the microphone and say it.", rec: "Recording… tap to stop.", compare: "", ask: "How close was it? Try again, or move on." };
const SH_ICON = { listen: "🔊", say: "🎙️", rec: "⏹", compare: "🔁", ask: "🔁" };
const audioMode = type => { try { if (navigator.audioSession) navigator.audioSession.type = type; } catch (e) {} };   // an iPhone needs to be told it will record as well as play
// The easiest phrases first; lines you only ever hear (staff questions) are left out unless nothing else is there.
function shadowSet(m) {
  const ok = m.items.filter(p => /[가-힣]/.test(p.ko)), mineToSay = ok.filter(p => !p.heard);
  return shuffle(mineToSay.length >= 4 ? mineToSay : ok).slice(0, 8).sort((a, b) => a.ko.length - b.ko.length);
}
function startShadow(items, title, again) {
  if (!items.length) return;
  SH = { items, title, again, i: 0, done: 0, state: "", no: 0, tried: false };
  audioMode("play-and-record");
  sh.classList.add("open"); document.body.style.overflow = "hidden";
  drawShadow();
}
function closeShadow() {
  if (SH) SH.no++;
  stopRec(true); A().stopAudio(); mic.mine.pause();
  if (mic.stream) { mic.stream.getTracks().forEach(t => t.stop()); mic.stream = null; }
  if (mic.ctx) { try { mic.ctx.close(); } catch (e) {} mic.ctx = null; }
  if (mic.url) { URL.revokeObjectURL(mic.url); mic.url = ""; }
  audioMode("playback");
  sh.classList.remove("open"); document.body.style.overflow = ""; SH = null; A().route();
}
function shState(st, msg) {
  SH.state = st;
  const card = $("#shCard"), b = card.querySelector(".sh-mic");
  if (!b) return;
  card.dataset.state = st;
  card.querySelectorAll(".sh-steps span").forEach(x => x.classList.toggle("on", x.dataset.st === (st === "rec" ? "say" : st === "ask" ? "compare" : st)));
  b.querySelector("span").textContent = SH_ICON[st];
  b.setAttribute("aria-label", st === "say" ? "Start recording" : st === "rec" ? "Stop recording" : st === "listen" ? "Play the model again" : "Hear both again");
  $("#shMsg").textContent = msg || SH_MSG[st];
  $("#shBtns").innerHTML = st === "compare" || st === "ask"
    ? `<button class="btn ghost" data-s="retry">Try again</button><button class="btn primary" data-s="next">${SH.i + 1 < SH.items.length ? "Next" : "Finish"} →</button>`
    : `<button class="btn ghost" data-s="model">${A().ICON.say} Listen again</button><button class="btn ghost" data-s="next">Skip</button>`;
}
function drawShadow() {
  const n = SH.items.length, card = $("#shCard");
  SH.no++; SH.tried = false;
  $("#shBar").style.width = (SH.i / n * 100) + "%";
  $("#shDone").textContent = SH.done ? "🎙️ " + SH.done : "";
  if (SH.i >= n) {
    const pts = SH.done * 3;
    if (SH.done) A().award(pts, SH.done);
    $("#shCount").textContent = SH.title;
    card.className = "flash done"; delete card.dataset.state;
    card.innerHTML = `<h2>${SH.done ? "Nicely spoken 🎉" : "Round done"}</h2><p>${SH.done} of ${n} said out loud · +${pts} pts</p>`;
    if (SH.done === n && n > 1) A().confetti();
    $("#shBtns").innerHTML = `<button class="btn ghost" data-s="close">Close</button>${SH.again ? `<button class="btn primary" data-s="again">Another round</button>` : ""}`;
    return;
  }
  const p = SH.items[SH.i];
  $("#shCount").textContent = n > 1 ? `${SH.i + 1} / ${n}` : "Say it";
  card.className = "flash";
  card.innerHTML = `${p.icon ? `<div class="q-pic" aria-hidden="true">${p.icon}</div>` : ""}
    <div class="q-big"><div class="ko">${ko(p.ko)}</div></div><div class="q-sub">${esc(p.en)}</div>
    <div class="sh-steps"><span data-st="listen">① Listen</span><span data-st="say">② Say it</span><span data-st="compare">③ Compare</span></div>
    <button class="sh-mic" data-s="mic"><span></span></button>
    <div class="sh-meter" aria-hidden="true">${"<i></i>".repeat(9)}</div>
    <div class="q-after" id="shMsg"></div>`;
  playModel();
}
function playModel() {
  const no = ++SH.no, p = SH.items[SH.i];
  stopRec(true); mic.mine.pause();
  shState("listen");
  A().speak(p.say, $("#shCard .sh-mic"), () => { if (SH && no === SH.no) shState("say"); });
}
async function startRec() {
  const no = ++SH.no, p = SH.items[SH.i];
  A().stopAudio(); mic.mine.pause();
  if (!mic.stream) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder) return shState("say", "This browser can't record. Say it out loud anyway, then tap Listen again to compare by ear.");
    try { mic.stream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
    catch (e) { return shState("say", "The microphone is blocked. Allow it for this site in your browser's settings, then tap the microphone again."); }
    if (!SH || no !== SH.no) return;
  }
  const type = ["audio/mp4", "audio/webm;codecs=opus", "audio/webm"].find(t => MediaRecorder.isTypeSupported(t));
  mic.chunks = [];
  mic.rec = new MediaRecorder(mic.stream, type ? { mimeType: type } : undefined);
  mic.rec.ondataavailable = e => { if (e.data && e.data.size) mic.chunks.push(e.data); };
  mic.rec.onstop = () => {
    const kept = mic.rec && mic.rec._keep, blob = new Blob(mic.chunks, { type: (mic.rec && mic.rec.mimeType) || type || "" });
    mic.rec = null;
    if (!kept || !SH || !blob.size) return;
    if (mic.url) URL.revokeObjectURL(mic.url);
    mic.url = URL.createObjectURL(blob); SH.tried = true;
    playBoth();
  };
  mic.rec.start();
  shState("rec");
  meterOn();
  // stops by itself after a pause long enough for the phrase, in case the button is forgotten
  mic.stop = setTimeout(() => stopRec(), Math.max(3500, Math.min(9000, 2500 + p.ko.length * 260)));
}
function stopRec(discard) {
  clearTimeout(mic.stop); clearInterval(mic.meter);
  const m = $("#shCard .sh-meter"); if (m) m.style.setProperty("--lv", 0);
  if (mic.rec && mic.rec.state !== "inactive") { mic.rec._keep = !discard; mic.rec.stop(); }
}
// A row of bars that jump with your voice, so you can see the microphone is hearing you.
function meterOn() {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!mic.ctx) { mic.ctx = new AC(); mic.an = mic.ctx.createAnalyser(); mic.an.fftSize = 256; mic.ctx.createMediaStreamSource(mic.stream).connect(mic.an); }
    if (mic.ctx.state === "suspended") mic.ctx.resume();
    const buf = new Uint8Array(mic.an.fftSize);
    mic.meter = setInterval(() => {
      mic.an.getByteTimeDomainData(buf);
      let sum = 0; for (let i = 0; i < buf.length; i++) { const v = (buf[i] - 128) / 128; sum += v * v; }
      const m = $("#shCard .sh-meter"); if (m) m.style.setProperty("--lv", Math.min(1, Math.sqrt(sum / buf.length) * 4).toFixed(2));
    }, 70);
  } catch (e) {}
}
function playBoth() {
  const no = ++SH.no, p = SH.items[SH.i], b = $("#shCard .sh-mic");
  shState("compare", "First the model…");
  A().speak(p.say, b, () => {
    if (!SH || no !== SH.no) return;
    $("#shMsg").textContent = "…now you.";
    b.classList.add("playing");
    const end = () => { b.classList.remove("playing"); if (SH && no === SH.no) shState("ask"); };
    mic.mine.onended = end; mic.mine.onerror = end;
    mic.mine.src = mic.url;
    mic.mine.play().catch(end);
  });
}
sh.addEventListener("click", e => {
  const b = e.target.closest("[data-s]");
  if (!b || !SH) return;
  const a = b.dataset.s;
  if (a === "close") closeShadow();
  else if (a === "again") startShadow(SH.again(), SH.title, SH.again);
  else if (a === "model" || a === "retry") playModel();
  else if (a === "next") { if (SH.tried) { SH.done++; burst(b, 8); } stopRec(true); A().stopAudio(); mic.mine.pause(); SH.i++; drawShadow(); }
  else if (a === "mic") { if (SH.state === "say") startRec(); else if (SH.state === "rec") stopRec(); else if (SH.state === "listen") playModel(); else playBoth(); }
});
document.addEventListener("keydown", e => { if (sh.classList.contains("open") && e.key === "Escape") closeShadow(); });
function renderShadow(arg) {
  prog();
  const direct = arg && A().mods.find(m => m.id === arg);
  if (direct) { history.replaceState(null, "", "#/shadow"); setTimeout(() => startShadow(shadowSet(direct), direct.title, () => shadowSet(direct)), 0); }
  app.innerHTML = head("Shadowing", "따라 말하기", "#/play", "Play")
    + `<p class="lead">Hear a phrase, say it straight back, then hear the model and your own voice one after the other. Eight phrases a round, shortest first.</p>${guide("shadow")}
    <div class="gcards">${A().mods.map(m => `<button class="gcard" data-g="squiz" data-id="${m.id}"><span class="art" style="overflow:hidden;--paper:var(--surface-2)">${A().art(m)}</span><div><b>${esc(m.title)}</b><i>${esc(m.ko)}</i><small>${m.items.length} phrases</small></div></button>`).join("")}</div>`;
}

/* ───────────── videos: real clips from YouTube, loaded only when one is tapped ───────────── */
function clipsHTML(pl, max) {
  return `<div class="clips">${((KT.clips || {})[pl.id] || []).slice(0, max || 99).map(c => `<div class="clip">
      <button class="clip-thumb" data-g="clip" data-id="${esc(c.id)}" aria-label="Play: ${esc(c.title)}"><img loading="lazy" src="https://i.ytimg.com/vi/${esc(c.id)}/hqdefault.jpg" alt=""><span aria-hidden="true">▶</span></button>
      <div class="clip-txt"><b>${esc(c.title)}</b><small>${esc(c.by)} · ${esc(c.level)}</small><p>${esc(c.why)}</p>
        <a href="https://www.youtube.com/watch?v=${esc(c.id)}" target="_blank" rel="noopener">Open in YouTube ↗</a></div></div>`).join("")}</div>`;
}
// Plays a video in place. YouTube only allows that when it is told which site is asking, which a page opened
// straight from a file (file://) cannot do — so there, and whenever the player reports an error, it opens on YouTube instead.
const YT = id => "https://www.youtube.com/watch?v=" + encodeURIComponent(id);
function clipFallback(box, id) {
  box.outerHTML = `<a class="clip-thumb" href="${YT(id)}" target="_blank" rel="noopener"><img src="https://i.ytimg.com/vi/${encodeURIComponent(id)}/hqdefault.jpg" alt=""><span class="clip-out">Play on YouTube ↗</span></a>`;
}
function playClip(b) {
  const id = b.dataset.id;
  A().stopAudio();
  if (location.protocol === "file:") { window.open(YT(id), "_blank", "noopener"); return clipFallback(b, id); }
  const box = document.createElement("div");
  box.className = "clip-thumb playing";
  box.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0&cc_load_policy=1&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(location.origin)}" title="YouTube video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
  b.replaceWith(box);
  const f = box.querySelector("iframe");
  // ask the player to report back, so an error can be caught and replaced with a plain link
  const ping = setInterval(() => { try { f.contentWindow.postMessage(JSON.stringify({ event: "listening", id, channel: "widget" }), "*"); } catch (e) {} }, 500);
  const hear = e => {
    if (e.source !== f.contentWindow) return;
    let d; try { d = JSON.parse(e.data); } catch (x) { return; }
    if (d.event === "onError") { stop(); if (box.isConnected) clipFallback(box, id); }
  };
  const stop = () => { clearInterval(ping); window.removeEventListener("message", hear); };
  window.addEventListener("message", hear);
  setTimeout(stop, 20000);
}
// The block shown on a stop's phrase pages.
function clipsSection(pl) {
  const n = ((KT.clips || {})[pl.id] || []).length;   // the first three here; the Watch page has them all
  return n ? `<section class="area" data-sec><h2>Watch it happen <span>영상</span><em>from YouTube</em></h2>${clipsHTML(pl, 3)}
    ${n > 3 ? `<div class="pager"><a class="btn ghost" href="#/watch/${pl.id}">▶️ All ${n} videos for this stop</a></div>` : ""}</section>` : "";
}
function renderWatch(arg) {
  app.innerHTML = head("Watch", "영상", "#/play", "Play")
    + `<p class="lead">Short videos by Korean teachers, one set for each stop on your route. Learn the phrases first, then watch for them.</p>${guide("watch")}`
    + KT.places.filter(pl => (KT.clips || {})[pl.id]).map(pl => `<section class="area" data-sec id="w-${pl.id}"><h2>${esc(pl.title)} <span>${esc(pl.ko)}</span></h2>${clipsHTML(pl)}</section>`).join("");
  const at = arg && document.getElementById("w-" + arg);
  if (at) setTimeout(() => window.scrollTo(0, at.getBoundingClientRect().top + window.scrollY - 76), 0);
}

/* ───────────── clicks ───────────── */
app.addEventListener("click", e => {
  const b = e.target.closest("[data-g]");
  if (!b) return;
  const g = b.dataset.g;
  if (g === "pick") return pickLine(b);
  if (g === "say") { if (b.dataset.say) A().speak(b.dataset.say, b); }
  else if (g === "hquiz") startQuiz(hangulQuiz(KT.hangul.find(l => l.id === b.dataset.id)));
  else if (g === "lab") { lab[b.dataset.part] = b.dataset.ch; drawLab(true); }
  else if (g === "labmode") { lab.mode = b.dataset.mode; lab.goal = ""; if (lab.mode === "goal") newGoal(); drawLab(); }
  else if (g === "replay") playScene(sc.s);
  else if (g === "tile") tapTile(+b.dataset.id);
  else if (g === "bnext" || g === "bskip") { bd.i = (bd.i + 1) % bd.all.length; loadBuild(); drawBuild(); }
  else if (g === "bshow") { bd.msg = "Answer: " + esc(bd.s.tiles.map(t => t.text).join(" ")); drawBuild(); }
  else if (g === "pol") { pol = b.dataset.lv; renderPolite(); }
  else if (g === "polquiz") startQuiz(politeQuiz());
  else if (g === "nquiz") startQuiz(numberQuiz(b.dataset.kind));
  else if (g === "lquiz") startQuiz(listenQuiz(A().mods.find(m => m.id === b.dataset.id)));
  else if (g === "clip") playClip(b);
  else if (g === "squiz") { const m = A().mods.find(x => x.id === b.dataset.id); startShadow(shadowSet(m), m.title, () => shadowSet(m)); }
});

const PAGES = { play: [renderPlay, "Play"], hangul: [renderHangul, "Hangul"], scenes: [renderScenes, "Conversations"], build: [renderBuild, "Sentence builder"],
  polite: [renderPolite, "Politeness"], numbers: [renderNumbers, "Numbers"], listen: [renderListen, "Listening"], shadow: [renderShadow, "Shadowing"], watch: [renderWatch, "Watch"] };
window.KTGames = {
  pages: Object.keys(PAGES),
  render(page, arg) { const p = PAGES[page] || PAGES.play; document.title = p[1] + " · Korean Talk"; p[0](arg); },
  homeHTML, starterHTML, playRowHTML,
  shadow: (items, title) => startShadow(items, title),
  clipsSection,
  progress: () => prog(),
  // One game, for a link elsewhere: its picture, name, one-line description and how far along it is.
  game(id) { const g = GAMES.find(x => x[0] === id); return g && { icon: g[1], title: g[2], ko: g[3], about: g[4], status: status(id), tip: ((KT.guides || {})[id] || {}).tip || "" }; },
  reset() { P = null; bd = null; sc = null; }
};
})();
