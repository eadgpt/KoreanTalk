// Hangul helpers — no dictionary, everything is worked out from the letters.
//   KHangul.rom("감사합니다")        → "gamsahamnida"   (Revised Romanization, following the usual sound changes)
//   KHangul.compose("ㅎ", "ㅏ", "ㄴ") → "한"
//   KHangul.split("한")              → ["ㅎ", "ㅏ", "ㄴ"]
//   KHangul.sino(3500)               → "삼천오백"       (Chinese-origin numbers: prices, minutes, dates)
//   KHangul.native(3)                → "셋",  native(3, true) → "세" (the short form used before a counter)
(function (root) {
"use strict";
const LEAD = [..."ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ"];
const VOWEL = [..."ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ"];
const TAIL = ["", ..."ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ"];
const R_LEAD = { ㄱ: "g", ㄲ: "kk", ㄴ: "n", ㄷ: "d", ㄸ: "tt", ㄹ: "r", ㅁ: "m", ㅂ: "b", ㅃ: "pp", ㅅ: "s", ㅆ: "ss", ㅇ: "", ㅈ: "j", ㅉ: "jj", ㅊ: "ch", ㅋ: "k", ㅌ: "t", ㅍ: "p", ㅎ: "h" };
const R_VOWEL = { ㅏ: "a", ㅐ: "ae", ㅑ: "ya", ㅒ: "yae", ㅓ: "eo", ㅔ: "e", ㅕ: "yeo", ㅖ: "ye", ㅗ: "o", ㅘ: "wa", ㅙ: "wae", ㅚ: "oe", ㅛ: "yo", ㅜ: "u", ㅝ: "wo", ㅞ: "we", ㅟ: "wi", ㅠ: "yu", ㅡ: "eu", ㅢ: "ui", ㅣ: "i" };
// How a final consonant actually sounds when nothing follows it: only seven sounds are possible.
const REP = { "": "", ㄱ: "k", ㄲ: "k", ㅋ: "k", ㄳ: "k", ㄺ: "k", ㄴ: "n", ㄵ: "n", ㄶ: "n", ㄷ: "t", ㅅ: "t", ㅆ: "t", ㅈ: "t", ㅊ: "t", ㅌ: "t", ㅎ: "t",
  ㄹ: "l", ㄼ: "l", ㄽ: "l", ㄾ: "l", ㅀ: "l", ㅁ: "m", ㄻ: "m", ㅂ: "p", ㅍ: "p", ㅄ: "p", ㄿ: "p", ㅇ: "ng" };
// Double finals split when a vowel follows: the first letter stays, the second moves over.
const SPLIT = { ㄳ: "ㄱㅅ", ㄵ: "ㄴㅈ", ㄺ: "ㄹㄱ", ㄻ: "ㄹㅁ", ㄼ: "ㄹㅂ", ㄽ: "ㄹㅅ", ㄾ: "ㄹㅌ", ㄿ: "ㄹㅍ", ㅄ: "ㅂㅅ" };
// Words whose sound does not follow from the spelling (an extra n/l slips in). Written the way they sound.
const SOUND = [["십육", "심뉵"], ["백육", "뱅뉵"], ["천육", "천뉵"], ["맛없", "마덦"], ["깻잎", "깬닙"], ["서울역", "서울력"], ["지하철역", "지하철력"],
  ["강남역", "강남녁"], ["명동역", "명동녁"], ["볼일", "볼릴"], ["무슨일", "무슨닐"]];

const isSyl = ch => ch >= "가" && ch <= "힣";
function split(ch) {
  if (!isSyl(ch)) return null;
  const n = ch.charCodeAt(0) - 0xAC00;
  return [LEAD[Math.floor(n / 588)], VOWEL[Math.floor(n % 588 / 28)], TAIL[n % 28]];
}
function compose(l, v, t) {
  const a = LEAD.indexOf(l), b = VOWEL.indexOf(v), c = TAIL.indexOf(t || "");
  return a < 0 || b < 0 || c < 0 ? "" : String.fromCharCode(0xAC00 + a * 588 + b * 28 + c);
}

// Sound changes where one syllable meets the next. T = final of the first, L = initial of the second.
// Returns [what is left of the final (a letter, or "" for none), the new initial].
function meet(T, L, V) {
  const Y = "ㅣㅑㅕㅛㅠㅒㅖ".includes(V);
  if (!T) return ["", L];
  if (L === "ㅇ") {                                   // a vowel follows: the final slides over
    if (T === "ㅇ") return [T, L];
    if (Y && T === "ㄷ") return ["", "ㅈ"];            // 굳이 → guji
    if (Y && T === "ㅌ") return ["", "ㅊ"];            // 같이 → gachi
    if (Y && T === "ㄾ") return ["ㄹ", "ㅊ"];
    if (T === "ㅎ") return ["", "ㅇ"];                 // 좋아요 → joayo
    if (T === "ㄶ") return ["", "ㄴ"];                 // 많아요 → manayo
    if (T === "ㅀ") return ["", "ㄹ"];                 // 싫어요 → sireoyo
    if (SPLIT[T]) return [SPLIT[T][0], SPLIT[T][1]];  // 읽어요 → ilgeoyo
    return ["", T];
  }
  if (L === "ㅎ") {                                   // k/t/p + h → one strong puff of air
    const r = REP[T];
    if (T === "ㄵ") return ["ㄴ", "ㅊ"];
    if (T === "ㄺ") return ["ㄹ", "ㅋ"];
    if (T === "ㄼ") return ["ㄹ", "ㅍ"];
    if (r === "k") return ["", "ㅋ"];                 // 축하 → chuka
    if (r === "p") return ["", "ㅍ"];                 // 입학 → ipak
    if (T === "ㅈ" || (T === "ㄷ" && Y)) return ["", "ㅊ"];
    if (r === "t") return ["", "ㅌ"];                 // 못해요 → motaeyo
    return [T, L];
  }
  if (T === "ㅎ" || T === "ㄶ" || T === "ㅀ") {        // h + g/d/j → k/t/ch;  otherwise the h just disappears
    const rest = T === "ㅎ" ? "" : T === "ㄶ" ? "ㄴ" : "ㄹ";
    const strong = { ㄱ: "ㅋ", ㄷ: "ㅌ", ㅈ: "ㅊ" }[L];
    if (strong) return [rest, strong];                // 좋다 → jota, 괜찮다 → gwaenchanta
    if (T === "ㅎ" && L === "ㄴ") return ["ㄴ", L];    // 좋네요 → jonneyo
    return [rest, L];
  }
  return [T, L];
}

// One run of Hangul → romanization.
function romWord(word) {
  SOUND.forEach(([a, b]) => { word = word.split(a).join(b); });
  const S = [...word].map(split);
  for (let i = 0; i + 1 < S.length; i++) {
    const [t, l] = meet(S[i][2], S[i + 1][0], S[i + 1][1]);
    S[i][2] = t; S[i + 1][0] = l;
  }
  let out = "";
  for (let i = 0; i < S.length; i++) {
    let fin = REP[S[i][2]];
    const nx = S[i + 1];
    if (nx) {                                          // nasal and l/r changes between consonants
      const L = nx[0];
      if (L === "ㄴ" || L === "ㅁ") fin = { k: "ng", t: "n", p: "m" }[fin] || fin;          // 합니다 → hamnida
      if (L === "ㄹ") {
        if (fin === "k" || fin === "t" || fin === "p") { fin = { k: "ng", t: "n", p: "m" }[fin]; nx[0] = "ㄴ"; }   // 독립 → dongnip
        else if (fin === "m" || fin === "ng") nx[0] = "ㄴ";                                 // 음료 → eumnyo
        else if (fin === "n") fin = "l";                                                    // 연락 → yeollak
      }
      if (fin === "l" && L === "ㄴ") nx[0] = "ㄹ";                                           // 설날 → seollal
    }
    const prevL = i > 0 && out.endsWith("l");
    out += (S[i][0] === "ㄹ" && prevL ? "l" : R_LEAD[S[i][0]]) + R_VOWEL[S[i][1]] + fin;
  }
  return out;
}
// Any text: Hangul runs are romanized, everything else is kept as it is.
const rom = text => String(text).replace(/[가-힣]+/g, romWord);

/* ── numbers ── */
const SINO = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
function sino(n) {
  n = Math.floor(n);
  if (n === 0) return "영";
  let out = "";
  const man = Math.floor(n / 10000), rest = n % 10000;
  if (man) out += (man === 1 ? "" : sino(man)) + "만";
  const part = (d, unit) => d ? (d === 1 ? "" : SINO[d]) + unit : "";
  let r = part(Math.floor(rest / 1000), "천") + part(Math.floor(rest % 1000 / 100), "백") + part(Math.floor(rest % 100 / 10), "십") + SINO[rest % 10];
  return out + (out && r ? " " : "") + r;
}
const N_ONE = ["", "하나", "둘", "셋", "넷", "다섯", "여섯", "일곱", "여덟", "아홉"];
const N_ONE_C = ["", "한", "두", "세", "네", "다섯", "여섯", "일곱", "여덟", "아홉"];
const N_TEN = ["", "열", "스물", "서른", "마흔", "쉰", "예순", "일흔", "여든", "아흔"];
// Native Korean numbers, 1–99. counter = true gives the form used before 개, 명, 시, 살 …
function native(n, counter) {
  n = Math.floor(n);
  if (n < 1 || n > 99) return sino(n);
  const t = Math.floor(n / 10), o = n % 10;
  if (counter && n === 20) return "스무";
  return N_TEN[t] + (counter ? N_ONE_C[o] : N_ONE[o]);
}

const api = { LEAD, VOWEL, TAIL, R_LEAD, R_VOWEL, REP, isSyl, split, compose, rom, romWord, sino, native };
if (typeof module !== "undefined" && module.exports) module.exports = api; else root.KHangul = api;
})(typeof window !== "undefined" ? window : globalThis);
