// Café — ordering, what the staff ask, and at the table.
// Line format:  Level | English | 한국어 | optional note
KT.module({
  id: "cafe",
  area: "daily",
  title: "Café",
  ko: "카페",
  added: "2026-10-11",
  keys: `
아아 | Short for 아이스 아메리카노 (iced americano), Korea's default drink. The hot one is 뜨아.
For here or to go? | Staff ask 드시고 가세요? (having it here?). Answer 먹고 갈게요 (here) or 포장해 주세요 (to go).
Counting drinks | Native number + 잔 (cup): 한 잔, 두 잔, 세 잔.
The buzzer | You get a 진동벨 (buzzer). Collect your drink at the counter when it vibrates.
Sizes | 톨 tall · 그란데 grande · 벤티 venti — or simply 작은 거 small / 큰 거 large.
Kiosks | Many cafés take orders on a 키오스크 (screen). Look for the English button, or ask 도와주세요.
`,
  phrases: `
# Ordering | 주문 | ☕
E | One iced americano, please. | 아이스 아메리카노 한 잔 주세요.
E | One hot latte, please. | 따뜻한 라떼 한 잔 주세요.
E | Two americanos, please. | 아메리카노 두 잔 주세요.
E | I'll have this one. | 이걸로 할게요.
M | Iced, please. | 아이스로 주세요.
M | Hot, please. | 따뜻한 걸로 주세요.
M | Large, please. | 큰 사이즈로 주세요.
M | What's good here? | 뭐가 맛있어요? | "What's tasty?"
M | Do you have anything without caffeine? | 카페인 없는 거 있어요?
M | Less ice, please. | 얼음 적게 주세요.
M | Less sweet, please. | 덜 달게 해 주세요.
M | An extra shot, please. | 샷 추가해 주세요.
M | One of this cake too, please. | 이 케이크도 하나 주세요.
H | Can I change it to oat milk? | 오트 밀크로 바꿀 수 있어요?

# What the staff ask | 직원의 질문 | 🧑‍🍳
E | Are you ready to order? | 주문하시겠어요? |  | hear
E | Having it here? | 드시고 가세요? |  | hear
E | I'll have it here. | 먹고 갈게요.
E | To go, please. | 포장해 주세요.
M | Do you need a receipt? | 영수증 필요하세요? |  | hear
M | No receipt, thanks. | 영수증은 괜찮아요.
M | Receipt, please. | 영수증 주세요.
M | Are you collecting points? | 적립하세요? | Just say 아니요, 괜찮아요 | hear
M | We'll call you when it's ready. | 준비되면 불러 드릴게요. |  | hear
H | Your drinks are ready. | 주문하신 음료 나왔습니다. |  | hear

# At the table | 자리에서 | 🪑
E | It's delicious. | 맛있어요.
E | Is this seat taken? | 여기 자리 있어요? | Careful: the answer 있어요 means "taken", 없어요 means "free"
M | Where are the straws? | 빨대 어디 있어요?
M | Some tissues, please. | 휴지 좀 주세요.
M | Is there a power socket? | 콘센트 있어요?
M | What's the code for the toilet? | 화장실 비밀번호가 뭐예요? | Many cafés lock the toilet with a door code
M | This isn't what I ordered. | 이거 제가 주문한 거 아니에요.
`
});
