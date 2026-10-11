// Slang & texting — what people actually type and say. Updated weekly; newest group is at the bottom.
// Line format:  Level | English | 한국어 | note | tags
// Tags, separated by ";":  a year or "classic" (when it took off) · friends / safe (who you can say it to)
//   text (written only) · dated (understand it, don't say it) · check (not yet confirmed by a second source)
//   say=… (what the voice should read) · src=https://… (where it came from) · new=YYYY-MM-DD (when it was added here)
KT.module({
  id: "slang",
  area: "culture",
  title: "Slang & Texting",
  ko: "신조어",
  added: "2026-10-11",
  keys: `
Slang is for friends | Nearly all of this is casual speech — fine with friends and online, odd with staff, elders or at work.
Shortening is the game | Long phrases get clipped to their first syllables: 아이스 아메리카노 → 아아, 치킨 + 맥주 → 치맥.
Texting in consonants | ㅋㅋ = laughing, ㅎㅎ = soft laugh, ㅠㅠ = crying, ㅇㅇ = yes, ㄴㄴ = no, ㄱㅅ = thanks.
It dates fast | A word that was cool in 2021 can sound like "groovy" today. Each entry shows its year. "Dated" means: understand it, don't say it.
Safe starters | 대박, 헐, 진짜, 맛집, 화이팅 — all ages use these. Start here.
`,
  phrases: `
# Everyday classics | 기본 | 🔥
E | Awesome! / Wow! / No way! | 대박 | All ages, all the time | classic; safe
E | OMG. / Whoa. | 헐 | Shock or disbelief | classic; friends
E | A really good place to eat | 맛집 | 맛 taste + 집 house. 여기 맛집이에요! | classic; safe
E | Super fun | 꿀잼 | 꿀 honey + 잼, from 재미 (fun) | 2010s; friends
E | No fun, boring | 노잼 | "No" + 잼 | 2010s; friends
E | A great tip | 꿀팁 | 꿀 honey + tip | 2010s; safe
E | Fried chicken and beer | 치맥 | 치킨 + 맥주. 오늘 치맥 어때요? | classic; safe
E | Soju and beer, mixed | 소맥 | 소주 + 맥주 | classic; safe
E | Eating alone | 혼밥 | 혼자 alone + 밥. Drinking alone is 혼술 | 2010s; safe
E | Friday night out | 불금 | 불 fire + 금요일 Friday | 2010s; safe
E | Selfie | 셀카 | 셀프 + 카메라 | classic; safe
E | Value for money | 가성비 | 가성비 좋아요 = great value | classic; safe
M | "My brain just crashed" | 멘붕 | 멘탈 붕괴 — mental collapse | 2010s; friends
M | Heart-flutter | 심쿵 | 심장이 쿵 — the heart goes thump | 2010s; friends
M | The flirting stage before dating | 썸 | From "something". 썸 타다 = to be in that stage | classic; friends
M | A guy friend (not a boyfriend) | 남사친 | 남자 사람 친구. The girl version is 여사친 | 2010s; friends
M | Deal! / I'm in! | 콜 | From poker's "call". 치맥? 콜! | classic; friends
M | The real deal | 찐 | From 진짜. 찐친 = a true friend | 2020; friends

# Food & cafés | 먹는 말 | 🍗
E | Iced americano | 아아 | 아이스 아메리카노. 아아 한 잔 주세요 works at any counter | classic; safe
E | Hot americano | 뜨아 | 뜨거운 아메리카노 | classic; safe
M | "Iced coffee even if I freeze to death" | 얼죽아 | 얼어 죽어도 아이스 아메리카노 — people who drink iced in winter | 2019; safe
M | Really tasty | 존맛 | Crude origin, so friends only. Also written JMT | 2010s; friends
M | "Recommend me a lunch menu" | 점메추 | 점심 메뉴 추천. For dinner: 저메추 | 2022; friends
M | Something delicious | 맛도리 | A cute way to say 맛있는 것 | 2023; friends
M | Bought with my own money | 내돈내산 | 내 돈 주고 내가 산 — on every non-sponsored review | 2020; safe
M | A café with a nice atmosphere | 분좋카 | 분위기 좋은 카페 | 2022; friends

# Texting | 문자 | 💬
E | lol | ㅋㅋㅋ | More ㅋ = funnier. A single ㅋ can read as sarcastic | classic; text; say=크크크
E | haha (softer) | ㅎㅎ |  | classic; text; say=하하
E | crying | ㅠㅠ | It looks like tears. Also ㅜㅜ | classic; text; say=유유
E | yep | ㅇㅇ | From 응응. Rude to anyone older | classic; text; friends; say=응응
E | nope | ㄴㄴ | From 노노 | classic; text; friends; say=노노
E | thanks | ㄱㅅ | From 감사 | classic; text; friends; say=감사
E | OK | ㅇㅋ | From 오케이 | classic; text; friends; say=오케이
E | congrats | ㅊㅋ | From 축하 | classic; text; friends; say=축하
E | sorry | ㅈㅅ | From 죄송 | classic; text; friends; say=죄송
E | let's go | ㄱㄱ | From 고고 | classic; text; friends; say=고고
M | where are you? | ㅇㄷ | From 어디 | classic; text; friends; say=어디
M | Random extra detail | TMI | In Korean it means any trivial fact: TMI인데… = "random, but…" | 2018; safe; say=티엠아이

# People & vibes | 사람과 분위기 | ✨
M | A popular, sociable person | 인싸 | From "insider". The opposite is 아싸 | 2018; friends
M | Effortlessly stylish | 꾸안꾸 | 꾸민 듯 안 꾸민 듯 — dressed up as if not dressed up | 2019; safe
M | Living a productive, disciplined life | 갓생 | 갓 god + 생 life. 갓생 살자! | 2021; safe
M | Today's workout: done | 오운완 | 오늘 운동 완료 — the gym-selfie hashtag | 2022; safe
M | So annoying! (playful) | 킹받네 | King + 열받네. Mock-angry, not truly angry | 2021; friends
M | Totally my style | 완내스 | 완전 내 스타일 | 2021; friends
M | A splurge | 플렉스 | From "flex". 오늘 플렉스 했어 = I splurged today | 2019; friends
H | Forced enthusiasm | 억텐 | 억지 텐션. The real thing is 찐텐 | 2022; friends
H | A mess of my own making | 스불재 | 스스로 불러온 재앙 | 2021; friends
H | Sudden awkward silence | 갑분싸 | 갑자기 분위기 싸해짐 | 2018; friends; dated
H | "So what?" | 어쩔티비 | Playground slang from 2021 | 2021; friends; dated

# Newer | 요즘 말 | 🆕
M | "Actually, that's better" | 오히려 좋아 | Finding the upside when plans fall through | 2021; safe
M | Let's gooo! | 가보자고 | Hype before starting something | 2022; friends
M | "What matters is an unbroken spirit" | 중꺾마 | 중요한 건 꺾이지 않는 마음 — from the 2022 World Cup | 2022; safe
M | "You're on fire" | 폼 미쳤다 | Literally "your form is crazy". Praise for anyone doing well | 2023; friends
M | Lucky me! | 럭키비키 | Finding the bright side of anything. From IVE's Jang Wonyoung (Vicky) | 2024; safe; src=https://www.inews24.com/view/1826298
M | Good vibes | 느좋 | 느낌 좋다. 여기 느좋 카페네 | 2024; friends
M | The look I'm going for | 추구미 | 추구하는 미 — "the beauty I pursue" | 2024; safe
M | Hit a nerve | 긁혔다 | Literally "got scratched". 긁? = "touched a nerve?" | 2024; friends
H | Bold, direct "testosterone type" man | 테토남 | The personality meme after MBTI. Woman: 테토녀 | 2025; friends; src=https://v.daum.net/v/20250324104352907
H | Gentle, sensitive "estrogen type" woman | 에겐녀 | The opposite of 테토녀. Man: 에겐남 | 2025; friends; src=https://www.allurekorea.com/?p=292942
H | "What a commotion!" | 난리자베스 | 난리 났다 + "Elizabeth", tacked on the end of a sentence | 2026; friends; check; src=https://www.jobplanet.co.kr/contents/news-7958
`
});
