// Point & Ask — this/that, where, can I, and the question words.
// Line format:  Level | English | 한국어 | optional note
KT.module({
  id: "survival",
  area: "start",
  title: "Point & Ask",
  ko: "이거 주세요",
  added: "2026-10-11",
  keys: `
이거 / 그거 / 저거 | this (by me) / that (by you) / that over there. Point and say 이거 주세요.
주세요 = please give me | Put anything in front: 물 주세요 (water, please), 이거 주세요 (this, please).
어디예요? = where is it? | Put the place in front: 화장실 어디예요?
있어요? = do you have…? | 와이파이 있어요? A rising tone makes it a question.
돼요? = is it okay? | The shortest way to ask permission: 카드 돼요? 사진 돼요?
Question words | 뭐 what · 어디 where · 언제 when · 누구 who · 왜 why · 어떻게 how · 얼마 how much · 몇 how many
`,
  phrases: `
# This & that | 이거, 그거 | 👉
E | This one, please. | 이거 주세요.
E | That one, please. | 그거 주세요.
E | What is this? | 이게 뭐예요?
E | How much is this? | 이거 얼마예요?
E | One of these, please. | 이거 하나 주세요.
E | Two of these, please. | 이거 두 개 주세요.
E | Water, please. | 물 주세요.
M | The same, please. | 같은 걸로 주세요.
M | One more, please. | 하나 더 주세요.
M | A little more, please. | 조금 더 주세요.
M | Do you have this? (showing a photo) | 이거 있어요?
M | Please show me that one. | 저거 좀 보여 주세요.

# Where? | 어디? | 📍
E | Where is the toilet? | 화장실이 어디예요?
E | Where is it? | 어디예요?
E | Is it here? | 여기예요?
E | It's over there. | 저기예요.
E | I'm lost. | 길을 잃었어요.
M | Where is the subway station? | 지하철역이 어디예요?
M | Is there a convenience store nearby? | 근처에 편의점 있어요?
M | Where is the exit? | 출구가 어디예요?
M | How do I get here? (showing a map) | 여기 어떻게 가요?
M | Is it far from here? | 여기서 멀어요?
M | Is it close? | 가까워요?

# Can I…? | 돼요? | 🙆
E | Is it okay? / Can I? | 돼요?
E | Yes, you can. | 네, 돼요.
E | No, you can't. | 안 돼요.
M | Can I take a photo? | 사진 찍어도 돼요?
M | Can I sit here? | 여기 앉아도 돼요?
M | Can I pay by card? | 카드 돼요?
M | Is there Wi-Fi? | 와이파이 있어요?
M | What's the Wi-Fi password? | 와이파이 비밀번호가 뭐예요?
M | Can I charge my phone? | 휴대폰 충전할 수 있어요?
H | Could you take a photo for me? | 사진 좀 찍어 주시겠어요?

# Question words | 질문 | ❓
E | What is it? | 뭐예요?
E | Who is it? | 누구예요?
E | When is it? | 언제예요?
E | Why? | 왜요?
E | How? | 어떻게요?
M | Which one? | 어느 거예요?
M | How many? | 몇 개예요?
M | What time is it now? | 지금 몇 시예요?
`
});
