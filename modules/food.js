// Restaurants — getting a table, ordering, during the meal, paying.
// Line format:  Level | English | 한국어 | optional note
KT.module({
  id: "food",
  area: "daily",
  title: "Eating Out",
  ko: "식당",
  added: "2026-10-11",
  keys: `
Calling the staff | Press the bell on the table, or call 저기요! To the owner: 사장님! To an older lady, warmly: 이모!
Side dishes are free | 반찬 are free and refillable. Just ask: 반찬 더 주세요.
Water is self-service | Look for the sign 물은 셀프 and help yourself from the dispenser.
Portions | 인분 = portion: 1인분, 2인분. Barbecue usually needs at least 2인분.
Pay at the counter | You usually pay at the till on the way out, not at the table. No tipping.
Spice check | 안 매워요 not spicy · 조금 매워요 a bit spicy · 많이 매워요 very spicy.
`,
  phrases: `
# Getting a table | 자리 | 🪑
E | Two people. | 두 명이요. | Staff ask 몇 분이세요? (how many?)
E | Just one. | 한 명이요.
M | Do you have a table? | 자리 있어요?
M | How long is the wait? | 얼마나 기다려야 돼요?
M | Do you have an English menu? | 영어 메뉴판 있어요?
M | I have a reservation. | 예약했어요.

# Ordering | 주문 | 🧾
E | Excuse me! (calling staff) | 여기요!
E | I'd like to order. | 주문할게요.
E | One bibimbap, please. | 비빔밥 하나 주세요.
M | Two portions of pork belly, please. | 삼겹살 2인분[i-inbun] 주세요.
M | What's the most popular dish? | 뭐가 제일 인기 있어요?
M | Is this spicy? | 이거 매워요?
M | Not spicy, please. | 안 맵게 해 주세요.
M | A little less spicy, please. | 덜 맵게 해 주세요.
M | I can't eat spicy food. | 매운 거 못 먹어요.
M | I don't eat meat. | 고기 안 먹어요.
M | No onions, please. | 양파 빼 주세요. | 빼 주세요 = "leave it out"
M | I'm allergic to peanuts. | 땅콩 알레르기가 있어요.
M | Is there pork in this? | 여기 돼지고기 들어가요?
M | One beer and one soju, please. | 맥주 한 병하고 소주 한 병 주세요.
E | Cheers! | 건배! | Also 짠!

# During the meal | 식사 중 | 🍲
E | More side dishes, please. | 반찬 더 주세요.
E | More water, please. | 물 좀 더 주세요.
E | It's really delicious. | 진짜 맛있어요.
M | One more bowl of rice, please. | 공깃밥 하나 추가요. | 공깃밥 = a bowl of plain rice
M | Scissors and tongs, please. | 가위랑 집게 주세요. | For cutting barbecue meat
M | Please change the grill. | 불판 좀 갈아 주세요.
M | A small plate, please. | 앞접시 하나 주세요.
M | I'm full. | 배불러요.
M | It's too spicy! | 너무 매워요!
M | Can I take this away? | 이거 포장돼요?

# Paying | 계산 | 💰
E | The bill, please. | 계산해 주세요.
E | How much is it? | 얼마예요?
M | Separately, please. | 따로따로 계산해 주세요.
M | All together, please. | 같이 계산해 주세요.
M | It's on me. | 제가 살게요.
M | I'll pay by card. | 카드로 할게요.
M | I'll pay cash. | 현금으로 할게요.
M | That was delicious. Goodbye! | 맛있게 먹었어요. 안녕히 계세요!
`
});
