// Help & health — emergencies, feeling ill, the pharmacy, small problems.
// Line format:  Level | English | 한국어 | optional note
KT.module({
  id: "help",
  area: "daily",
  title: "Help & Health",
  ko: "도움과 건강",
  added: "2026-10-11",
  keys: `
Emergency numbers | 112 police · 119 fire and ambulance · 1330 tourist helpline (English, 24 hours).
Pharmacies | 약국 — look for the sign 약. Pharmacists often manage basic English and can suggest medicine.
아파요 = it hurts | Body part + 아파요: 머리가 아파요 (head), 배가 아파요 (stomach), 목이 아파요 (throat).
Lost something? | Subway lost property is the 유실물 센터. For taxis, the card receipt shows the taxi's number.
Body words | 머리 head · 눈 eye · 코 nose · 입 mouth · 귀 ear · 목 throat · 배 belly · 허리 back · 다리 leg · 발 foot · 손 hand
`,
  phrases: `
# Emergencies | 긴급 | 🆘
E | Help! (emergency) | 살려 주세요!
E | Please call the police. | 경찰 좀 불러 주세요.
E | Please call an ambulance. | 구급차 좀 불러 주세요.
E | It's urgent. | 급해요.
E | Fire! | 불이야!
M | I lost my wallet. | 지갑을 잃어버렸어요.
M | I lost my passport. | 여권을 잃어버렸어요.
M | I lost my phone. | 휴대폰을 잃어버렸어요.
M | My bag was stolen. | 가방을 도둑맞았어요.
M | I left my bag in the taxi. | 택시에 가방을 두고 내렸어요.
M | Where is the police station? | 경찰서가 어디예요?
H | Please contact the embassy. | 대사관에 연락해 주세요.

# Feeling ill | 아플 때 | 🤒
E | It hurts. / I'm ill. | 아파요.
E | I have a headache. | 머리가 아파요.
E | I have a stomach ache. | 배가 아파요.
M | I have a sore throat. | 목이 아파요.
M | I have a fever. | 열이 나요.
M | I've caught a cold. | 감기에 걸렸어요.
M | I have a cough. | 기침이 나요.
M | I feel dizzy. | 어지러워요.
M | I have diarrhoea. | 설사를 해요.
M | I think I have indigestion. | 체한 것 같아요.
M | I've hurt my leg. | 다리를 다쳤어요.
M | I have an allergy. | 알레르기가 있어요.
M | Where is the hospital? | 병원이 어디예요?
M | Is there a pharmacy nearby? | 근처에 약국 있어요?

# At the pharmacy | 약국에서 | 💊
E | Cold medicine, please. | 감기약 주세요.
E | Painkillers, please. | 진통제 주세요.
M | Something for digestion, please. | 소화제 주세요.
M | Plasters, please. | 밴드 주세요.
M | How do I take this? | 이거 어떻게 먹어요?
M | How many times a day? | 하루에 몇 번 먹어요?
M | Take it after meals. (you'll hear this) | 식후에 드세요. |  | hear
M | Something for a hangover, please. | 숙취해소제 주세요. | Every convenience store sells these too

# Small problems | 문제 | 🔧
E | There's a problem. | 문제가 있어요.
M | It's broken. | 고장 났어요.
M | The room is too cold. | 방이 너무 추워요.
M | There's no hot water. | 뜨거운 물이 안 나와요.
M | I left my key in the room. | 키를 방에 두고 나왔어요.
M | Please wait a moment. | 잠깐만 기다려 주세요.
M | Could you help me? | 좀 도와주시겠어요?
M | Is there someone who speaks English? | 영어 하시는 분 계세요?
`
});
