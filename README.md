# Korean Talk · 말해요

Everyday Korean for a complete beginner: learn to read Hangul, role-play short conversations, and build up about 490 practical phrases — with tap-to-hear audio, games, daily goals and a slang list that is topped up every week.

Built on the same shell as Mandarin Talk (static HTML, no build step).

## Open it

- **On this Mac:** double-click `index.html`. Works offline (the online voice needs internet).
- **In the Claude app:** preview config `koreantalk` (port 8767).

## What's inside

| Where | What |
|---|---|
| **Home** | Today's goal ring, the "Start here: Hangul" card, then **your route**: eight places (First steps → Café → Restaurant → Shops → On the move → With people → When things go wrong → On your phone), each with its picture, phrases, conversations and games. Settings → Home page → **Cards** brings back the plain module grid |
| **Play → Hangul** | Eight lessons (vowels → consonants → final consonants → real signs), each with a quiz. Plus the **Block lab**: snap letters into a syllable and hear it |
| **Play → Conversations** | Eight role-plays (café, convenience store, barbecue, taxi, subway, clothes shop, meeting someone, pharmacy). You pick what to say; wrong picks explain why |
| **Play → Sentence builder** | Word tiles to put in Korean order. Particles (는, 를, 에…) are coloured |
| **Play → Listening** | Hear a phrase, pick its meaning. Per module |
| **Play → Numbers** | Prices (Sino numbers), counting (native numbers + counters), the clock (both) |
| **Play → Politeness switch** | 24 phrases in casual / polite / formal, with a quiz |
| **Practise** (red button) | Flashcards. Phrases you got right come back after 1, 3, 7, 14, 30, 60 days; "Again" brings one back today |
| **Slang & Texting** | Each term shows the year it took off, who it's safe with, and "Dated" / "Unconfirmed" where that applies |

Points: 10 per phrase known, 2 per practice card or right answer in a game. Everything is saved on that device only.

## Pictures and context

- **Places** (`data/places.js`): each stop on the route has a picture made of emoji (`scene`), a backdrop colour (`hue`, 0–360), and the modules, conversations and games that belong there. The same picture heads its module pages and conversations.
- **Every phrase has a small picture.** It is chosen from the English text by `lib/icons.js` (first matching word wins). To set one by hand, add the tag `i=🚻` to the phrase. A phrase with no match uses its group's picture — the third part of the `# Group | 그룹 | 🙂` line.
- **"Said to you"**: the tag `hear` marks lines you will hear rather than say (the barista's questions, a stranger's directions). They get a blue edge and a 👂 label.
- **Conversations** open with one line that sets the scene (`set`) and show the other person's face (`face`). A line that names a price shows a receipt.
- **Hangul words** each carry a picture (third item in `[Korean, English, picture]`).
- **Numbers**: counting shows the things to count, the clock shows a clock face.

## Explanations: hover tips and "About…" panels

Everything explains itself at two depths.

- **Tip** — hover over a stop, a link, a game, a phrase's picture or a tag and a short explanation appears. On a phone there is no hover, so each stop has a small ⓘ to tap.
- **About… panel** — inside each section, a longer explanation of what happens there and what it teaches about how Korean works. It is open the first time you visit and remembers if you close it. On a phone its cards swipe sideways.

Where the words live, all in `data/places.js`:

| What | Where |
|---|---|
| A stop's tip and panel | `tip` and `guide` (a list of `[heading, text]`) on each place |
| A game's tip and panel | `KT.guides` |
| Small things (pictures, tags, buttons, the goal ring) | `KT.tips`, written as `"Title|Text"` |

Korean words inside a panel get romanization underneath automatically. To give anything else a tip, add `data-tip="Title|Text"` to its HTML.

## Motion

Settings → **Motion** switches all of it on or off (on by default). It does not follow the Mac's or phone's "Reduce Motion" setting — the switch in the app is the control.

What moves: pictures pop in, float, and shift in depth with the cursor (with scrolling on a phone) · cards lean towards the cursor and catch a light · the route line fills in as you scroll · progress bars, the goal ring and percentages count up · pages and cards rise into place · in conversations the other person "types" before speaking and receipts print · clock hands sweep to the time and things to count arrive one by one · right answers throw sparks.

All of it is in `lib/motion.css` and `lib/motion.js`; removing those two files leaves a still but fully working app.

## Romanization

Worked out automatically from the Hangul in `lib/hangul.js` — Revised Romanization, following the usual sound changes (감사합니다 → gamsahamnida, 같이 → gachi). It shows how a word *sounds*, not letter-for-letter spelling. Turn it off in Settings once Hangul is comfortable.

If a reading is wrong, put the right one in brackets after the word: `피팅룸이[pitingrumi]`. Words where an extra sound slips in (서울역, 십육, 맛없어요) are listed in `SOUND` at the top of `lib/hangul.js`.

## Add or change phrases

Phrases live in `modules/`, one file per module. Each phrase is one line:

```
Level | English | 한국어 | optional tip | optional tags
```

- Level: `E` (Easy), `M` (Medium) or `H` (Hard)
- `# Group name | 그룹 이름` starts a new group
- Tags (used by slang), separated by `;`:
  `2024` or `classic` · `friends` / `safe` · `text` · `dated` · `check` (not confirmed) · `say=응응` (what the voice reads) · `src=https://…` · `new=2026-10-18` (shows a "New" tag for three weeks)

To add a module: copy `modules/_template.js`, rename it, and add its name to `KT.files` in `modules/list.js`.

## Add to the games

| File | Format |
|---|---|
| `data/places.js` | The stops on the home route: `scene`, `hue`, `about`, `mods`, `scenes`, `games` |
| `data/hangul.js` | Lessons: letters `[letter, sound, memory hook]` and words `[Korean, English, picture]` |
| `data/scenes.js` | Role-plays: `face` and `set` for who and where; `["t", Korean, English]` for the other person, `["y", goal, [[Korean, English, 1 or 0, why wrong], …]]` for your turn |
| `data/builder.js` | `English | Korean | tip` — a space starts a new tile, `_` keeps words on one tile, `+` marks a particle |
| `data/polite.js` | `English | casual | polite | formal | note` |

## Check your edits

```
node tools/check.js          # counts per module, bad lines, duplicates, unknown tags
node tools/check.js --rom    # also prints the romanization of every phrase, to read through
```

## Weekly slang update

A scheduled task ("Korean slang update", Sundays) searches for new slang, adds confirmed terms to the last group of `modules/slang.js` with a year, a source link and a `new=` date, marks fading terms `dated`, and adds a line to `KT.changelog`. It changes local files only and reports what it added — nothing is published until you say so.

## Earlier versions

`archive/v1-2026-10-11/` is the first version (plain module grid, no pictures). `archive/v2-2026-10-12/` has the route and pictures but no motion, tips or About panels. To go back, copy its `index.html`, `lib/`, `data/` and `modules/` over the current ones.

## Publish

```
./make_upload.sh
```

refreshes `upload/` with exactly the files a website needs. Not published anywhere yet.

---
Audio: Google Translate's online voice (plays even when an iPhone is on silent) or the device's built-in Korean voice. Art: ink-wash scenes drawn in code (`lib/art.js`).
