// CLIPS — real videos by independent Korean teachers on YouTube, grouped by stop (the ids match data/places.js).
//   id: the part of the YouTube address after "v="     title / by: as shown on YouTube
//   why: one line on what to watch it for              level: Beginner | Harder
// To check that every clip still exists:  node tools/check.js --clips
KT.clips = {
  start: [
    { id: "85qJXvyFrIc", title: "Learn Hangeul (Korean Alphabet) in 30 minutes", by: "Korean with Miss Vicky", level: "Beginner", why: "The whole alphabet in one sitting. Watch a teacher's mouth make each sound, then do the Hangul lessons here." },
    { id: "s5aobqyEaMQ", title: "Learn Hangul in 90 Minutes — Start to Finish", by: "GO! Billy Korean", level: "Beginner", why: "The long, thorough version, explained in English. Good when a letter in the lessons won't stick." },
    { id: "d40Xnzwk2R8", title: "Basic Korean Greetings: Hello, Goodbye, Thank you, I'm sorry", by: "Learn Korean Daily", level: "Beginner", why: "The four phrases you will use most, said slowly. Pairs with First Words." },
    { id: "TyO5hts_xmM", title: "10 Must-Know Korean Expressions", by: "Hailey — Your Korean Friend", level: "Beginner", why: "Ten everyday expressions from a Korean speaker. See how many you already know from First Words." },
    { id: "926I_QKyIsk", title: "When to Use Pure Korean or Sino Korean Numbers", by: "GO! Billy Korean", level: "Beginner", why: "The two number systems and when each one is used, explained in English. Watch before the Numbers game." },
    { id: "35Bx_g9AlbQ", title: "How to Count in Korean (Sino Numbers 1–100): Months, Dates, Telling Time, and More!", by: "Korean with Ina", level: "Beginner", why: "Sino numbers put to work on dates and the clock." },
    { id: "pT4k7LC91Cw", title: "Learn Hangul in 20 Minutes", by: "Korean Lesson 101", level: "Beginner", why: "A quick run through the alphabet — useful as revision after the Hangul lessons." }],
  cafe: [
    { id: "UlE6VCQztck", title: "Real Korean Talk Ep.1 — How to Order Coffee in Korean", by: "Real Korean Talk", level: "Beginner", why: "A café order from start to finish. Listen for the questions from the “What the staff ask” set." },
    { id: "UKzWwYLGT00", title: "How to order coffee in Korean at Starbucks — real conversation at the café", by: "Koreansunflower", level: "Beginner", why: "The same exchange at a chain café. Notice how fast the set questions come." },
    { id: "p3f8I1Sdzds", title: "How to Order Coffee in Korean — Cafe Conversation A–Z", by: "Real Korean with Morning", level: "Beginner", why: "A role-play of the whole café visit. Try answering before the customer does." },
    { id: "F5EkLezeFd4", title: "Ordering Coffee in Korea? Korean Cafe Phrases", by: "Easy Korean with Cherry", level: "Beginner", why: "Café phrases with examples — a second voice saying the lines you have learned." },
    { id: "JQKAzqsIX6k", title: "Korean Conversation at a Café — Ordering Drinks in Korean", by: "Santoverse 산토버스", level: "Harder", why: "Marked intermediate by its maker: a café conversation at natural speed. Listen for 주세요 and 드릴까요." }],
  restaurant: [
    { id: "May-YkBzjTU", title: "Real Korean Conversation — Ordering at a Korean Restaurant", by: "Talk To Me In Korean", level: "Beginner", why: "A full restaurant visit as a conversation: being seated, ordering, asking for more." },
    { id: "WtIATJYV7ec", title: "Essential Korean Phrases for Ordering at Restaurants (with Role-Play)", by: "INSSA KOREA — Korean with Sohee", level: "Beginner", why: "Phrases first, then a role-play to hear them in order — food, side dishes and drinks." },
    { id: "tqBmlcaml3w", title: "Korean Restaurant 101 — How to Order in Korean!", by: "Grace's Sooda", level: "Beginner", why: "How ordering works in a Korean restaurant, start to finish." },
    { id: "-11--LSPNB0", title: "10 Real Korean Conversations at Restaurants & Cafes — For Korean Beginners (TOPIK 1)", by: "Small Talk in Korean", level: "Beginner", why: "Ten short beginner conversations. Good for hearing the same phrases in slightly different situations." },
    { id: "t-8Gbe-wvyo", title: "Everyday real Korean conversation at restaurants — 8 dialogues", by: "Korean Share", level: "Harder", why: "Eight restaurant dialogues. Don't aim to catch everything — pick out 주세요, 여기요 and the numbers." }],
  shops: [
    { id: "3N5mMyRSptY", title: "Learn Korean at a Korean Convenience Store (with Food Picks!)", by: "Hayden Kim", level: "Beginner", why: "Inside a real convenience store: what the shelves, signs and till look like." },
    { id: "y9M-y1EsMCk", title: "Easy Korean Shopping for Beginners — 12 Must-Know Store Phrases", by: "TokTok Gentle Korean", level: "Beginner", why: "Twelve shop phrases, said slowly. Compare them with the ones in Shopping." },
    { id: "spefOKPkJgc", title: "Korean Convenience Store Phrases (20) — Must-Know Korean for Shopping", by: "Love Korean with Jinie", level: "Beginner", why: "Twenty convenience-store phrases: finding things, the till, simple questions." },
    { id: "meHBKkq7CPo", title: "Korean phrases for shopping, speak like a local!", by: "아루싸 — your Korean speaking partner", level: "Beginner", why: "Basic shopping words and phrases, as a first lesson." }],
  street: [
    { id: "5Svz00IMwd4", title: "Taking a Taxi in Korea? Learn These 6 Phrases", by: "JEI TV Korean", level: "Beginner", why: "Six taxi phrases, including place + 으로 가 주세요." },
    { id: "SJpJW7ILfiQ", title: "Day 16 — Getting directions in the subway: 5 Korean phrases you must know", by: "Native Korean Tutor", level: "Beginner", why: "Asking your way around a subway station, five phrases at a time." },
    { id: "tH-SVkI3U0E", title: "Taking a Taxi in Korea — Korean Conversation for Traveling", by: "Cake Korean", level: "Beginner", why: "A taxi ride as a conversation: saying where to go and where to get off." },
    { id: "26D-MAncX6A", title: "Easy Korean Taxi Phrases for Beginners — 10 Must-Know Expressions", by: "TokTok Gentle Korean", level: "Beginner", why: "Ten taxi expressions, said gently and slowly." }],
  friends: [
    { id: "Hg6kGtjNa4Q", title: "Meeting Someone New in Korean — Greetings, Introduction & Small Talk", by: "한시 Time for Korean", level: "Beginner", why: "A first meeting from hello to small talk. Watch the bowing and the reactions as well as the words." },
    { id: "VE8ggFil1L0", title: "Easiest Self Introduction in Korean", by: "Hailey — Your Korean Friend", level: "Beginner", why: "A five-sentence self-introduction you can copy and make your own." },
    { id: "N2ORX3VrirQ", title: "How to Introduce Yourself in Korean (First Meeting Expressions)", by: "Focus Korean with Prof. Jung", level: "Beginner", why: "First-meeting expressions with subtitles — the polite forms used with someone new." },
    { id: "-4ZspanXcB4", title: "Learn Korean — First Meeting Conversation — Self Introduction", by: "LKI School of Korean Language", level: "Beginner", why: "A first-meeting conversation: asking a name and introducing yourself." },
    { id: "1syCoWshciM", title: "35 Real Korean Reactions (That Textbooks Never Teach)", by: "Hailey — Your Korean Friend", level: "Beginner", why: "The little reaction sounds — 헐, 대박, 진짜? — that keep a conversation alive. Pairs with Reactions & Feelings." }],
  trouble: [
    { id: "bhpk6DkCOsI", title: "Korean at the Pharmacy — Useful Korean Phrases for Travelers", by: "Korean at Your Own Pace", level: "Beginner", why: "What to say across a pharmacy counter." },
    { id: "aoJXA2O2hoM", title: "When a Cold Patient goes to the Doctor & Pharmacy — Natural Korean Conversation", by: "몰입한국어 Immersion in Korean", level: "Harder", why: "Doctor and pharmacist at natural speed. Don't expect to follow it all — listen for 아파요, 약 and 식후." },
    { id: "PWIeJksAhiM", title: "Don't Go to Hospitals or Convenience Stores in Korea Without These 20 Phrases!", by: "JEI TV Korean", level: "Beginner", why: "Twenty phrases for when you feel ill, starting from 아파요." }],
  phone: [
    { id: "dLvaMrS7K8g", title: "Learn These Korean Slang Words Before It's Too Late! (추구미, 럭키비키, 억텐, 찐텐, 느좋 & More)", by: "Minji Teaches Korean", level: "Beginner", why: "A Korean explains several of the newer words in this list, and how they sound said aloud." },
    { id: "t2JvIA0NnGY", title: "Korean Slang: Then vs Now — From “Dae-bak” to What's Hot in 2025", by: "Minji Teaches Korean", level: "Beginner", why: "Which slang has lasted and which has dated — the idea behind the “Dated” label here." },
    { id: "C81kMaVExPY", title: "50 Korean Slang Words Natives Actually Use (2025/2026)", by: "Daily Korean with Sona", level: "Beginner", why: "A long list to browse. Tick off the ones already in this app's slang list." }]
};
