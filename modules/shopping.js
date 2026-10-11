// Shops & convenience stores — browsing, prices, at the till.
// Line format:  Level | English | 한국어 | optional note
KT.module({
  id: "shopping",
  area: "daily",
  title: "Shopping",
  ko: "쇼핑",
  added: "2026-10-11",
  keys: `
Convenience stores | 편의점: CU, GS25, 세븐일레븐. 1+1 means buy one get one free; 2+1 means buy two get one.
Need a bag? | 봉투 필요하세요? Bags cost a little. Answer 네, 주세요 or 아니요, 괜찮아요.
Counting things | Native number + 개: 한 개, 두 개, 세 개, 네 개, 다섯 개.
Prices | Sino numbers + 원: 천 원 = 1,000 · 오천 원 = 5,000 · 만 원 = 10,000.
Tax refund | 택스 리펀 돼요? Many shops refund tax on the spot if you show your 여권 (passport).
Trying on | 입어 봐도 돼요? for clothes, 신어 봐도 돼요? for shoes. 피팅룸 = fitting room.
`,
  phrases: `
# Looking | 구경 | 👀
E | I'm just looking. | 그냥 구경할게요.
M | Do you have another colour? | 다른 색 있어요?
M | Do you have a bigger size? | 더 큰 사이즈 있어요?
M | Do you have a smaller size? | 더 작은 사이즈 있어요?
M | Can I try this on? | 이거 입어 봐도 돼요?
M | Where is the fitting room? | 피팅룸이[pitingrumi] 어디예요?
M | It's too big. | 너무 커요.
M | It's too small. | 너무 작아요.
M | It fits well. | 잘 맞아요.
M | It's pretty. | 예뻐요.
M | Which one sells best? | 어떤 게 제일 잘 나가요?
H | I'm looking for a gift. | 선물을 찾고 있어요.

# Price | 가격 | 🏷️
E | How much is it altogether? | 전부 얼마예요?
E | It's expensive. | 비싸요.
E | It's cheap. | 싸요.
M | A little cheaper, please. | 좀 깎아 주세요. | For markets — not shops with price tags
M | Is this on sale? | 이거 세일해요?
M | Is this one-plus-one? | 이거 원 플러스 원이에요?
M | Can I get a tax refund? | 택스 리펀 돼요?
M | I'll take this one. | 이걸로 주세요.
M | I'll think about it. | 좀 더 생각해 볼게요.

# At the till | 계산대 | 🧾
E | Do you need a bag? | 봉투 필요하세요? |  | hear
E | A bag, please. | 봉투 주세요.
E | No bag, thanks. | 봉투는 괜찮아요.
M | Please heat this up. | 이거 데워 주세요. | For convenience-store meals
M | Do you have chopsticks? | 젓가락 있어요?
M | Please insert your card. | 카드 꽂아 주세요. | What the cashier says | hear
M | Pay in one go? | 일시불로 해 드릴까요? | Say 네. 일시불 = one payment, not instalments | hear
M | Can I use Apple Pay? | 애플페이 돼요?
M | Can I exchange this? | 이거 교환할 수 있어요?
M | I'd like a refund. | 환불하고 싶어요.
M | Please gift-wrap it. | 선물 포장해 주세요.
M | Please top up my transport card with 10,000 won. | 교통카드 만 원 충전해 주세요.
`
});
