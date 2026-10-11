// Numbers, Time & Dates — both number systems, telling time, days, counters.
// Line format:  Level | English | 한국어 | optional note
KT.module({
  id: "time",
  area: "start",
  title: "Numbers & Time",
  ko: "숫자와 시간",
  added: "2026-10-11",
  keys: `
Two number systems | Sino (일, 이, 삼…) for money, dates, minutes and phone numbers. Native (하나, 둘, 셋…) for counting things, hours and age.
Telling time | Hours are native, minutes are Sino: 세 시 이십 분 = 3:20. 반 = half past: 세 시 반.
Short forms | Before a counter 하나→한, 둘→두, 셋→세, 넷→네, 스물→스무: 한 개, 두 시, 스무 살.
오전 / 오후 | AM / PM. They go in front of the time: 오후 세 시 = 3 PM.
Days of the week | 월 화 수 목 금 토 일 + 요일: 월요일 Monday … 일요일 Sunday.
Money | No "one" in front of 백, 천, 만: 천 원 = 1,000 won, 만 원 = 10,000 won, 만 오천 원 = 15,000 won.
`,
  phrases: `
# Native numbers | 하나, 둘, 셋 | 🔢
E | one | 하나
E | two | 둘
E | three | 셋
E | four | 넷
E | five | 다섯
E | six | 여섯
E | seven | 일곱
E | eight | 여덟
E | nine | 아홉
E | ten | 열
M | twenty | 스물

# Sino numbers | 일, 이, 삼 | 🔢
E | one (Sino) | 일
E | two (Sino) | 이
E | three (Sino) | 삼
E | four (Sino) | 사
E | five (Sino) | 오
E | six (Sino) | 육
E | seven (Sino) | 칠
E | eight (Sino) | 팔
E | nine (Sino) | 구
E | ten (Sino) | 십
E | hundred | 백
E | thousand | 천
E | ten thousand | 만
M | zero | 영 | In phone numbers people say 공

# Time | 시간 | 🕒
E | It's three o'clock. | 세 시예요.
E | It's half past three. | 세 시 반이에요.
M | It's 7:20. | 일곱 시 이십 분이에요.
M | 10 AM | 오전 열 시
M | 6 PM | 오후 여섯 시
E | now | 지금
E | today | 오늘
E | tomorrow | 내일
E | yesterday | 어제
M | this morning | 오늘 아침
M | tonight | 오늘 밤
M | later | 나중에
M | soon | 곧
M | a little while ago | 아까
M | every day | 매일
M | What time does it open? | 몇 시에 열어요?
M | What time does it close? | 몇 시에 닫아요?

# Days & dates | 요일과 날짜 | 📅
E | Monday | 월요일
E | Tuesday | 화요일
E | Wednesday | 수요일
E | Thursday | 목요일
E | Friday | 금요일
E | Saturday | 토요일
E | Sunday | 일요일
M | weekend | 주말
M | this week | 이번 주
M | next week | 다음 주
M | last week | 지난주
M | What day is it today? | 오늘 무슨 요일이에요?
M | What's the date today? | 오늘 며칠이에요?
M | When is your birthday? | 생일이 언제예요?
H | It's October 11th. | 시월 십일 일이에요. | 10월 is 시월 and 6월 is 유월 — both irregular

# Counters | 세는 말 | 🧮
E | one (thing) | 한 개
E | two people | 두 명
E | three cups / glasses | 세 잔
E | four bottles | 네 병
M | five tickets (flat things) | 다섯 장
M | once / one time | 한 번
M | one hour | 한 시간
M | thirty minutes | 삼십 분
M | one day | 하루
M | two days | 이틀 | Irregular: 하루 one day · 이틀 two days · 사흘 three days
M | one month | 한 달
M | one year | 일 년
`
});
