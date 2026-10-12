// PLACES — the stops on the home page route. Each one groups the phrases, conversations and games that belong there.
//   scene: three or four emoji that make its picture (first = biggest)     hue: colour of its backdrop, 0–360
//   tip: the short explanation shown on hover (or when ⓘ is tapped)     guide: the longer one shown inside, as [heading, text]
//   mods: phrase modules     scenes: conversations     games: hangul | numbers | polite | build (gamesFirst lists them before the phrases)
KT.places = [
  { id: "start",
    tip: "Start here. Korean packs politeness into the verb ending and leaves out words like “I” and “you” — so a handful of short phrases goes a very long way.",
    guide: [
      ["Why start here", "These three sets are the skeleton of everything else: greetings and thanks, pointing and asking, and numbers. With them alone you can buy things, find places and be polite."],
      ["The Korean you'll meet", "A Korean sentence ends in its verb, and the verb's ending carries the politeness. The ending 요 is the safe, polite one — almost every phrase here ends in it. Subjects are usually left out: 있어요? can mean “do you have it?” or “is there any?” The situation fills in the rest."],
      ["One frame, hundreds of uses", "Thing + 주세요 = “… please”. 물 주세요, 이거 주세요, 영수증 주세요. Learn the frame once, then swap the noun."],
      ["How to use this stop", "Do Hangul first if you can: reading the real letters fixes your pronunciation faster than romanization does. Then First Words, then Point & Ask."]],
    title: "First steps", ko: "첫걸음", scene: ["🇰🇷", "👋", "🌸", "🔤"], hue: 150, about: "The words you need before anything else: hello, thanks, this one, how much.",
    mods: ["basics", "survival", "time"], scenes: [], games: ["hangul", "numbers"], gamesFirst: true },
  { id: "cafe",
    tip: "The most scripted conversation in Korea: the same few questions, in the same order, every time. Ideal for training your ear to catch set questions.",
    guide: [
      ["What happens here", "You order at the counter, answer a short run of questions — size, hot or iced, here or to go, receipt — pay, take a buzzer, and collect your drink when it vibrates."],
      ["The Korean you'll meet", "Staff use extra-polite endings that you only need to recognise, not produce: 주문하시겠어요? 드시고 가세요? The 시 in the middle is politeness aimed at you. Your side stays simple: a noun + 주세요, or 아니요, 괜찮아요."],
      ["Counting drinks", "Drinks take native numbers and the counter 잔 (cup): 한 잔, 두 잔. The order is thing, number, counter: 아메리카노 두 잔."],
      ["A free reading lesson", "Menus are full of English written in Hangul — 아메리카노, 라떼, 케이크. Sounding them out is the best Hangul practice there is."]],
    title: "Café", ko: "카페", scene: ["☕", "🧋", "🍰", "🪴"], hue: 28, about: "Order, answer the barista's questions, find a seat.",
    mods: ["cafe"], scenes: ["cafe"], games: [] },
  { id: "restaurant",
    tip: "Calling out to staff, counting portions, saying what you can't eat — and the two ways Korean says “not”.",
    guide: [
      ["What happens here", "Say how many you are, sit down, call the staff or press the table bell, order by dish and portion, ask for refills, then pay at the counter by the door."],
      ["The Korean you'll meet", "Two small words make a sentence negative. 안 means don't, a choice: 고기 안 먹어요, I don't eat meat. 못 means can't: 매운 거 못 먹어요, I can't eat spicy food. Both go right before the verb."],
      ["More, less, without", "더 주세요 = more, please. 덜 맵게 = less spicy. 빼 주세요 = leave it out. Three tools that cover most special requests."],
      ["Culture to know", "Calling 저기요! across the room is normal, not rude. Side dishes (반찬) are free and refilled. Before eating people say 잘 먹겠습니다, afterwards 잘 먹었습니다. There is no tipping."]],
    title: "Restaurant", ko: "식당", scene: ["🍲", "🥩", "🍚", "🥢"], hue: 8, about: "Get a table, order, ask for more side dishes, pay at the counter.",
    mods: ["food"], scenes: ["bbq"], games: [] },
  { id: "shops",
    tip: "Prices use the second number system, and Korean describing words behave like verbs: “it's big” is one word, 커요.",
    guide: [
      ["What happens here", "Browsing, asking for a size or a colour, checking the price, and the quick-fire questions at the till: bag? card? receipt?"],
      ["The Korean you'll meet", "Describing words are verbs in Korean, so there is no separate “is”: 비싸요 = it's expensive, 커요 = it's big, 예뻐요 = it's pretty. One word is a whole sentence."],
      ["Prices", "Money always uses Sino numbers + 원. The building blocks are 천 (1,000) and 만 (10,000): 삼만 오천 원 = 35,000 won. Korean counts in ten-thousands, not thousands — that is the part to get used to."],
      ["Asking permission", "돼요? means “is it okay?” or “does it work?”: 카드 돼요? 입어 봐도 돼요? The answer is 네, 돼요 or 안 돼요."]],
    title: "Shops", ko: "가게", scene: ["🛍️", "🏪", "👕", "💳"], hue: 320, about: "Convenience stores, clothes shops and markets.",
    mods: ["shopping"], scenes: ["store", "clothes"], games: [] },
  { id: "street",
    tip: "Where, which, how far — plus the little endings that mean to, at and by. Here you will mostly be listening.",
    guide: [
      ["What happens here", "Topping up a card, finding the right line and exit, telling a taxi driver where to go, and asking strangers the way."],
      ["The Korean you'll meet", "Small endings stuck on a noun say how it fits in. 에 = to or at: 서울에 가요. 에서 = at or from: 여기서 내려요. 으로 = towards or by: 서울역으로, 카드로. English puts these words in front; Korean sticks them on the end."],
      ["Listening for directions", "Ask the way and the answer comes back fast, often ending in 세요, a polite instruction: 직진하세요, 오른쪽으로 가세요. The lines marked “Said to you” are the ones to learn by ear."],
      ["Numbers on the move", "Lines, exits and bus numbers use Sino numbers: 2호선, 3번 출구. Stops are counted with native numbers: 세 정거장."]],
    title: "On the move", ko: "길 위에서", scene: ["🚇", "🚕", "🗺️", "🚌"], hue: 210, about: "Subway, bus, taxi — and asking the way.",
    mods: ["transport"], scenes: ["taxi", "subway"], games: [] },
  { id: "friends",
    tip: "Korean changes with who you are talking to. Age, names and reactions matter more here than grammar.",
    guide: [
      ["What happens here", "Introductions, small talk, reacting while someone else speaks, swapping KakaoTalk and fixing a time to meet."],
      ["The Korean you'll meet", "Every sentence ending shows your relationship to the listener. With new people, stay on the 요 ending. Koreans ask your age early so they know which level to use — a practical question, not a nosy one."],
      ["No “you”", "Korean avoids the word “you”. Use the person's name + 씨, a title, or nothing at all: 어디 살아요? = “where do (you) live?”"],
      ["Reactions are half the conversation", "Listeners keep up a stream of 네, 진짜요? 아, 그래요? Staying silent can seem cold. The Reactions set gives you those sounds."]],
    title: "With people", ko: "사람들과", scene: ["🧑‍🤝‍🧑", "🍻", "💬", "🎤"], hue: 265, about: "Introduce yourself, react, make plans — and pick the right politeness.",
    mods: ["people", "feelings"], scenes: ["meet"], games: ["polite", "build"] },
  { id: "trouble",
    tip: "One sentence frame covers most problems: the thing + 가 or 이 + what is wrong. Plus the past tense, for what you have lost.",
    guide: [
      ["What happens here", "Describing what hurts at a pharmacy, reporting something lost, getting help quickly."],
      ["The Korean you'll meet", "Body part + 가 or 이 + 아파요: 머리가 아파요, 배가 아파요, 목이 아파요. The little 가 / 이 marks the thing that hurts — 가 after a vowel, 이 after a consonant."],
      ["Talking about the past", "Lost property needs the past tense, made by adding 았 or 었 before 어요: 잃어버렸어요 (I lost it), 두고 내렸어요 (I left it behind), 다쳤어요 (I hurt it)."],
      ["Numbers to know", "112 police, 119 ambulance and fire, 1330 tourist helpline in English. A pharmacy (약국) sells most everyday medicine without a prescription."]],
    title: "When things go wrong", ko: "문제가 생기면", scene: ["💊", "🏥", "🩹", "🆘"], hue: 350, about: "The pharmacy, lost things, emergencies.",
    mods: ["help"], scenes: ["pharmacy"], games: [] },
  { id: "phone",
    tip: "Casual, clipped, fast-moving Korean. It shows how words are built — and how quickly they date.",
    guide: [
      ["What this is", "The words of group chats, comments and captions. Topped up every week, each with the year it took off."],
      ["How slang is built", "Mostly by clipping: take the first syllable of each word. 아이스 아메리카노 becomes 아아. 내 돈 내 산 becomes 내돈내산. Each Hangul block is one syllable, so this works neatly — and once you see it you can decode new ones yourself."],
      ["Texting in consonants", "Messages are often just the first consonant of each syllable: ㄱㅅ for 감사, ㅇㅋ for 오케이. ㅋㅋㅋ is the sound of laughing."],
      ["Who you can say it to", "Nearly all slang is casual speech (반말). Fine with friends and online; with staff, elders or at work, understand it but don't say it. Watch the “Friends only” and “Dated” labels."]],
    title: "On your phone", ko: "폰 속에서", scene: ["📱", "💬", "😂", "🔥"], hue: 185, about: "What people actually type and say. Topped up weekly.",
    mods: ["slang"], scenes: [], games: [] }
];

// GUIDES — the same two levels of explanation for each game: tip on hover, guide inside.
KT.guides = {
  hangul: { label: "About Hangul", tip: "Korea's alphabet: 24 letters that stack into syllable blocks. Reading it fixes your pronunciation — romanization can't show the real sounds.", guide: [
    ["Why bother", "Romanization is a crutch that bends: “eo”, “eu” and “ae” don't sound the way English eyes expect. Hangul writes each sound one way only, and it can be learned in a few hours."],
    ["How it works", "Letters are grouped into square blocks, one block per syllable: ㅎ + ㅏ + ㄴ = 한. Read each block left to right, then top to bottom."],
    ["What it unlocks", "Menus, subway signs, shop names — and all the English words hiding in plain sight, like 커피 and 버스."]] },
  scenes: { label: "About conversations", tip: "Role-plays that put phrases in the order they really happen, so you learn what comes next — and what you will be asked.", guide: [
    ["Why conversations", "A phrase list tells you what to say. A conversation tells you when — and what comes back at you. Each scene follows the real order of events."],
    ["How to play", "Read or listen to the other person, then pick your line. A wrong choice tells you what it actually means, which is often the best lesson. Tap any bubble to hear it again."],
    ["Make it harder", "Play once with romanization on. Then switch it off in Settings and play again by ear."]] },
  build: { label: "About word order", tip: "Korean puts the verb last and tags each noun with a particle. Building sentences by hand makes that order feel natural.", guide: [
    ["The big difference", "English says “I drink coffee”. Korean says “I coffee drink”: 저는 커피를 마셔요. The verb always comes last."],
    ["Particles", "Each noun carries a small tag that says what job it does: 는 marks the topic, 를 the object, 에 a place. Because the tags do that work, the nouns can move around. Only the verb is fixed."],
    ["What gets dropped", "Anything obvious is left out, most often “I” and “you”. 커피를 마셔요 on its own is a complete sentence."]] },
  listen: { label: "About listening", tip: "Spoken Korean runs its sounds together. Ten-question rounds train you to catch whole phrases at real speed.", guide: [
    ["Why it's a separate skill", "Sounds slide from one syllable into the next when Koreans speak: 맛있어요 is said ma-si-sseo-yo, not mat-iss-eo-yo. You can know a phrase on paper and still miss it by ear."],
    ["How to use it", "Pick a place you have already studied. Too fast? Turn on Slow voice in Settings. Too easy? Turn romanization off."]] },
  numbers: { label: "About the two number systems", tip: "Korean has two sets of numbers. Which one you use depends on what you are counting.", guide: [
    ["Two systems", "Sino numbers (일, 이, 삼) came from Chinese: money, dates, minutes, phone numbers, floors. Native numbers (하나, 둘, 셋) are for counting things and people, for hours, and for age."],
    ["Counters", "You can't just say “three coffees”. It is thing + number + counter: 커피 세 잔. 개 for things, 명 for people, 잔 for cups, 병 for bottles."],
    ["The clock uses both", "세 시 이십 분 = 3:20 — a native hour followed by Sino minutes."]] },
  shadow: { label: "About shadowing", tip: "Hear a phrase, say it straight back, then hear the model and your own voice one after the other. The fastest way to fix pronunciation.", guide: [
    ["Why speak out loud", "Recognising a phrase and being able to say it are different skills. Your mouth has to learn the shapes — the tight ㄲ, the flat ㅡ, the way sounds run together — and that only happens by saying them."],
    ["Why hear yourself", "While you speak you can't judge how you sound. Played back right after the model, the differences are obvious: a vowel that's too English, a syllable you swallowed, a rhythm that's too flat."],
    ["How to do it", "Listen once. Say it at the same speed, copying the tune as well as the words. Compare, then try again until the two sound alike. Three good repeats beat ten careless ones."],
    ["Good to know", "The recording never leaves your device and is thrown away when you move on. Your browser will ask to use the microphone the first time."]] },
  watch: { label: "About the videos", tip: "Short videos by Korean teachers on YouTube, one set per stop. See the faces, gestures and real speed that a phrase list can't show.", guide: [
    ["Why watch", "Korean is more than its words: a small bow with 감사합니다, both hands when passing a card, the rising tune of a question. Video shows what audio alone leaves out."],
    ["How to use them", "Learn a stop's phrases first, then watch. You are not trying to understand everything — you are listening for the phrases you already know, said by real people at real speed."],
    ["Then say it", "After a video, open Speak for the same stop and copy what you just heard while it is fresh."],
    ["Good to know", "These videos belong to their makers and play from YouTube, so they need internet. They were chosen by title and channel and have not been checked word for word against this app's phrases."]] },
  polite: { label: "About speech levels", tip: "The same sentence changes its ending depending on who is listening. Flip between friend, stranger and formal to see the pattern.", guide: [
    ["Why it matters", "In Korean you can't say anything without choosing a level. The wrong one doesn't just sound odd: casual speech to a stranger is rude."],
    ["The three you need", "Casual (반말) drops the ending: 가. Polite (해요체) adds 요: 가요. Formal (합니다체) ends in ㅂ니다: 갑니다."],
    ["What to do", "Use the 요 form with everyone until a Korean friend suggests dropping it. Learn to recognise the formal one — you will hear it in announcements and from staff."]] }
};

// TIPS — short explanations for the small things on screen. "Title|Text".
KT.tips = {
  goal: "Daily goal|A card counts when you tick a phrase, press “Got it” in practice, or answer correctly in a game. Reach the goal each day to keep your streak.",
  phrases: "Phrases|What to say here — and the lines you will hear — each with a picture, audio and romanization. Tick the ones you know.",
  talk: "Conversation|A role-play of this place, in the order things really happen. You pick what to say.",
  listenBtn: "Listen|Ten phrases from this set, by ear: you hear it, you pick the meaning.",
  practise: "Practise|Flashcards. A phrase you get right comes back after 1, 3, 7, 14, 30 and 60 days — just before you would forget it.",
  pic: "Picture cue|A quick visual hook for the situation, so the phrase sticks to a scene instead of to its English translation.",
  hear: "Said to you|You will hear this rather than say it. Learn to recognise it by ear — you don't have to produce it.",
  shadowBtn: "Say it|Hear the phrase, record yourself saying it, then hear the model and your own voice back to back.",
  watch: "Watch|Short videos by Korean teachers showing this place for real — faces, gestures and natural speed.",
  hearWord: "🔊 Click to hear it",
  rom: "Romanization|How the word sounds, in Latin letters. It follows pronunciation, not spelling. Switch it off in Settings once you can read Hangul.",
  remember: "Remember these|The few ideas that make the rest of this set make sense: a grammar pattern, a habit, a bit of culture. Tap any Korean to hear it.",
  friends: "Friends only|Casual speech. Fine with friends and online; rude to strangers, staff or anyone older.",
  safe: "Anyone|Safe to use with all ages.",
  text: "Text only|Written in messages, not said aloud.",
  dated: "Dated|Understand it, but don't say it — it marks you as behind the times.",
  check: "Unconfirmed|Found in one source only. It may not last.",
  era: "When it took off|Slang ages fast. The older the year, the more likely a term is either a classic or stale.",
  level: "Difficulty|Easy = short and essential. Medium = everyday. Hard = longer, or with trickier grammar."
};
