// HANGUL LESSONS — the alphabet in eight short steps.
// letters:  [letter, sound, memory hook]            (tap a letter to hear it in a syllable)
// words:    [Korean, English, picture]              (readable with the letters learned so far)
// quiz: "words" = quiz on reading whole words only (no single-letter questions)
KT.hangul = [
  { id: "v1", title: "First vowels", ko: "모음", intro: "Vowels are built from long lines. A vowel never stands alone: with no consonant in front, the silent circle ㅇ fills the gap — so “a” is written 아.",
    letters: [
      ["ㅏ", "a", "“ah”, as in father. The small stroke points right"],
      ["ㅓ", "eo", "“uh”, as in son. The stroke points left"],
      ["ㅗ", "o", "“oh”, as in go. The stroke points up"],
      ["ㅜ", "u", "“oo”, as in moon. The stroke points down"],
      ["ㅡ", "eu", "“oo” with a flat smile — don't round your lips"],
      ["ㅣ", "i", "“ee”, as in see. One tall line, like the letter i"]
    ],
    words: [["아이", "child", "🧒"], ["오이", "cucumber", "🥒"], ["아우", "younger sibling", "👦"], ["이", "two / tooth", "🦷"], ["오", "five", "🖐️"]] },

  { id: "c1", title: "First consonants", ko: "자음", intro: "Each consonant is a little picture of the mouth making that sound. A syllable is a block: consonant first, vowel beside or beneath it. 나 = n + a.",
    letters: [
      ["ㄱ", "g", "🔫 Shaped like a gun. Soft g, close to k"],
      ["ㄴ", "n", "👃 Shaped like a nose seen from the side"],
      ["ㄷ", "d", "🚪 A door frame. Soft d, close to t"],
      ["ㄹ", "r", "🛣️ A winding road. Between r and l — one quick tap of the tongue"],
      ["ㅁ", "m", "👄 A square mouth, lips closed"],
      ["ㅂ", "b", "🪣 A bucket. Soft b, close to p"],
      ["ㅅ", "s", "🧍 A person standing — or a ski slope. Before ㅣ it sounds “sh”"],
      ["ㅈ", "j", "ㅅ with a roof on. Soft j"],
      ["ㅇ", "–", "⭕ A zero: silent at the start of a syllable"]
    ],
    words: [["나무", "tree", "🌳"], ["바나나", "banana", "🍌"], ["고기", "meat", "🥩"], ["버스", "bus", "🚌"], ["주스", "juice", "🧃"], ["라디오", "radio", "📻"], ["모자", "hat", "🧢"], ["다리", "leg / bridge", "🌉"],
      ["나라", "country", "🌏"], ["소주", "soju", "🍶"], ["가수", "singer", "🎤"], ["도시", "city", "🏙️"], ["지도", "map", "🗺️"], ["어머니", "mother", "👩"], ["아버지", "father", "👨"], ["바다", "sea", "🌊"]] },

  { id: "v2", title: "Y vowels", ko: "야 여 요 유", intro: "Add a second small stroke to a vowel and it gains a “y” in front. ㅏ a → ㅑ ya. That's the whole rule.",
    letters: [
      ["ㅑ", "ya", "ㅏ a + one more stroke = ya"],
      ["ㅕ", "yeo", "ㅓ eo + one more stroke = yeo, “yuh”"],
      ["ㅛ", "yo", "ㅗ o + one more stroke = yo"],
      ["ㅠ", "yu", "ㅜ u + one more stroke = yu, “you”"]
    ],
    words: [["여자", "woman", "👩"], ["요리", "cooking", "🍳"], ["우유", "milk", "🥛"], ["야구", "baseball", "⚾"], ["여기", "here", "📍"], ["이야기", "story", "📖"], ["유리", "glass", "🪟"], ["교수", "professor", "🧑‍🏫"], ["뉴스", "news", "📰"], ["여우", "fox", "🦊"]] },

  { id: "c2", title: "Puff-of-air consonants", ko: "거센소리", intro: "Add a stroke to a consonant and it gets a strong puff of air. Hold a hand before your mouth: you should feel it. ㄱ g → ㅋ k.",
    letters: [
      ["ㅋ", "k", "ㄱ + a stroke. Strong k, as in kite"],
      ["ㅌ", "t", "ㄷ + a stroke. Strong t, as in top"],
      ["ㅍ", "p", "ㅂ turned on its side. Strong p, as in pie"],
      ["ㅊ", "ch", "ㅈ + a hat. ch, as in cheese"],
      ["ㅎ", "h", "🎩 A man in a hat, breathing out. h"]
    ],
    words: [["커피", "coffee", "☕"], ["피자", "pizza", "🍕"], ["토마토", "tomato", "🍅"], ["치즈", "cheese", "🧀"], ["하나", "one", "☝️"], ["카드", "card", "💳"], ["코", "nose", "👃"], ["포도", "grape", "🍇"],
      ["휴지", "tissue", "🧻"], ["차", "tea / car", "🚗"], ["치마", "skirt", "👗"], ["기차", "train", "🚆"], ["아파트", "apartment", "🏢"], ["티셔츠", "T-shirt", "👕"], ["스키", "ski", "⛷️"], ["호수", "lake", "🏞️"]] },

  { id: "v3", title: "Combined vowels", ko: "이중 모음", intro: "Two vowels squeezed into one. Say them fast and they merge: ㅗ o + ㅏ a = ㅘ wa. Today ㅐ and ㅔ sound the same — “e” as in bed.",
    letters: [
      ["ㅐ", "ae", "ㅏ + ㅣ. “e”, as in bed"],
      ["ㅔ", "e", "ㅓ + ㅣ. Also “e”, as in bed"],
      ["ㅘ", "wa", "ㅗ + ㅏ said quickly: wa"],
      ["ㅝ", "wo", "ㅜ + ㅓ said quickly: wo"],
      ["ㅟ", "wi", "ㅜ + ㅣ: “we”"],
      ["ㅚ", "oe", "ㅗ + ㅣ: sounds like “we” in wet"],
      ["ㅢ", "ui", "ㅡ + ㅣ: “eu-ee”, said fast"],
      ["ㅙ", "wae", "ㅗ + ㅐ: “we” in wet"],
      ["ㅞ", "we", "ㅜ + ㅔ: “we” in wet"],
      ["ㅖ", "ye", "ㅕ + ㅣ: “ye” as in yes"],
      ["ㅒ", "yae", "ㅑ + ㅣ: “ye” as in yes — rare"]
    ],
    words: [["개", "dog", "🐕"], ["네", "yes", "⭕"], ["메뉴", "menu", "📋"], ["카메라", "camera", "📷"], ["사과", "apple", "🍎"], ["뭐", "what", "❓"], ["회사", "company", "🏢"], ["귀", "ear", "👂"],
      ["의사", "doctor", "🧑‍⚕️"], ["돼지", "pig", "🐖"], ["시계", "clock", "🕒"], ["노래", "song", "🎵"], ["가게", "shop", "🏪"], ["과자", "snack", "🍪"], ["샤워", "shower", "🚿"], ["웨이터", "waiter", "🤵"], ["세계", "world", "🌍"], ["해", "sun", "☀️"]] },

  { id: "c3", title: "Tight consonants", ko: "된소리", intro: "A doubled letter is said tight and sharp, with no air at all — like the p in “spy”, not the p in “pie”.",
    letters: [
      ["ㄲ", "kk", "Tight k, as in sky"],
      ["ㄸ", "tt", "Tight t, as in stop"],
      ["ㅃ", "pp", "Tight p, as in spy"],
      ["ㅆ", "ss", "A strong, hissing s"],
      ["ㅉ", "jj", "Tight j, almost “ts”"]
    ],
    words: [["아빠", "dad", "👨"], ["오빠", "older brother", "👦"], ["비싸요", "expensive", "💸"], ["찌개", "stew", "🍲"], ["토끼", "rabbit", "🐇"], ["또", "again", "🔁"], ["가짜", "fake", "🎭"], ["예뻐요", "pretty", "🌸"],
      ["바빠요", "busy", "🏃"], ["꼬리", "tail", "🐒"], ["쓰레기", "rubbish", "🗑️"], ["아저씨", "mister", "🧔"], ["어깨", "shoulder", "💪"], ["짜요", "salty", "🧂"], ["뽀뽀", "kiss", "💋"]] },

  { id: "b1", title: "Final consonants", ko: "받침", quiz: "words", intro: "A third letter can sit at the bottom of the block: 하 + ㄴ = 한. At the end of a syllable only seven sounds exist — k, n, t, l, m, p, ng — so ㅅ, ㅈ, ㅊ, ㅌ and ㅎ all end up sounding like t.",
    letters: [
      ["ㄱ", "k", "At the bottom ㄱ, ㅋ and ㄲ all sound k", "악"],
      ["ㄴ", "n", "n, as always", "안"],
      ["ㄷ", "t", "ㄷ, ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ all sound t at the bottom", "앋"],
      ["ㄹ", "l", "At the bottom ㄹ is l, not r", "알"],
      ["ㅁ", "m", "m, as always", "암"],
      ["ㅂ", "p", "At the bottom ㅂ and ㅍ sound p", "압"],
      ["ㅇ", "ng", "Silent on top, “ng” at the bottom", "앙"]
    ],
    words: [["한국", "Korea", "🇰🇷"], ["김치", "kimchi", "🥬"], ["밥", "rice / meal", "🍚"], ["물", "water", "💧"], ["빵", "bread", "🍞"], ["서울", "Seoul", "🏙️"], ["사람", "person", "🧍"], ["선생님", "teacher", "🧑‍🏫"],
      ["맛", "taste", "👅"], ["옷", "clothes", "👕"], ["택시", "taxi", "🚕"], ["지하철", "subway", "🚇"], ["편의점", "convenience store", "🏪"], ["비빔밥", "bibimbap", "🥗"], ["불고기", "bulgogi", "🥩"],
      ["삼겹살", "pork belly", "🥓"], ["안녕", "hi", "👋"], ["화장실", "toilet", "🚻"], ["핸드폰", "mobile phone", "📱"], ["컴퓨터", "computer", "💻"], ["집", "home", "🏠"], ["돈", "money", "💰"], ["꽃", "flower", "🌸"]] },

  { id: "r1", title: "Read real signs", ko: "간판 읽기", quiz: "words", intro: "You can read Korean now. Half the words on a Seoul street are English in disguise — sound them out and they pop.",
    letters: [],
    words: [["아이스크림", "ice cream", "🍦"], ["햄버거", "hamburger", "🍔"], ["인터넷", "internet", "🌐"], ["호텔", "hotel", "🏨"], ["레스토랑", "restaurant", "🍽️"], ["슈퍼마켓", "supermarket", "🛒"],
      ["초콜릿", "chocolate", "🍫"], ["샌드위치", "sandwich", "🥪"], ["아메리카노", "americano", "☕"], ["콜라", "cola", "🥤"], ["엘리베이터", "lift", "🛗"], ["에스컬레이터", "escalator", "↗️"],
      ["출구", "exit", "🚪"], ["입구", "entrance", "🚪"], ["약국", "pharmacy", "💊"], ["은행", "bank", "🏦"], ["역", "station", "🚉"], ["금연", "no smoking", "🚭"], ["주의", "caution", "⚠️"],
      ["미세요", "push", "👉"], ["당기세요", "pull", "👈"], ["영업중", "open for business", "🟢"], ["남", "men", "🚹"], ["여", "women", "🚺"]] }
];

// Block lab challenges: syllables to build, easy first.
KT.blocks = ["가", "나", "도", "미", "수", "하", "커", "피", "한", "국", "김", "밥", "물", "집", "강", "남", "산", "돈", "빵", "꿀", "서", "울", "역", "원"];
