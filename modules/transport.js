// Getting around — subway, bus, taxi, directions, airport.
// Line format:  Level | English | 한국어 | optional note
KT.module({
  id: "transport",
  area: "daily",
  title: "Getting Around",
  ko: "교통",
  added: "2026-10-11",
  keys: `
T-money | A 티머니 card works on subways, buses and taxis. Top it up (충전) at any convenience store.
Subway lines | 호선 = line. 2호선 is the green circle line. 환승 = transfer.
Tap off too | On buses, tap your card again when you get off, or you lose the transfer discount.
Taxis | Say the place + 가 주세요. If unsure, show the address in Korean on your phone.
Exits matter | Stations have many exits. 3번 출구 = Exit 3. People meet "at exit N".
Directions | 오른쪽 right · 왼쪽 left · 직진 straight · 건너편 across the road · 옆 next to · 앞 in front · 뒤 behind
`,
  phrases: `
# Subway & bus | 지하철과 버스 | 🚇
E | Where do I buy a ticket? | 표 어디서 사요?
E | Does this go to Myeongdong? | 이거 명동 가요?
M | Which line goes to Gangnam? | 강남은 몇 호선이에요?
M | Where do I transfer? | 어디서 갈아타요?
M | How many stops is it? | 몇 정거장이에요?
M | What's the next station? | 다음 역이 어디예요?
M | Which exit do I take? | 몇 번 출구로 나가요?
M | I get off here. | 여기서 내려요.
M | Excuse me, I'm getting off! | 잠시만요, 내릴게요!
M | Which bus goes to Hongdae? | 홍대 가는 버스가 몇 번이에요?
M | Where is the bus stop? | 버스 정류장이 어디예요?
H | What time is the last train? | 막차가 몇 시예요?

# Taxi | 택시 | 🚕
E | To this address, please. | 이 주소로 가 주세요.
E | To Seoul Station, please. | 서울역으로 가 주세요.
E | Please stop here. | 여기서 세워 주세요.
M | How long does it take? | 얼마나 걸려요?
M | About how much will it be? | 요금이 얼마나 나와요?
M | A bit faster, please. | 좀 빨리 가 주세요.
M | Please open the boot. | 트렁크 좀 열어 주세요.
M | Please turn on the air-con. | 에어컨 좀 켜 주세요.
M | Stop by the pedestrian crossing, please. | 횡단보도 앞에서 세워 주세요.

# Directions | 길 찾기 | 🧭
E | Go straight. | 직진하세요. |  | hear
E | Go right. | 오른쪽으로 가세요. |  | hear
E | Go left. | 왼쪽으로 가세요. |  | hear
E | It's right there. | 바로 저기예요. |  | hear
M | It's across the road. | 길 건너편에 있어요. |  | hear
M | It's next to the bank. | 은행 옆에 있어요. |  | hear
M | How long is it on foot? | 걸어서 얼마나 걸려요?
M | It takes about ten minutes. | 십 분쯤 걸려요. |  | hear
M | Can I walk there? | 걸어갈 수 있어요?
M | Please show me on the map. | 지도에서 보여 주세요.

# Airport & trains | 공항과 기차 | ✈️
E | Where do I catch the airport bus? | 공항버스 어디서 타요?
M | I'd like to check in. | 체크인하려고요.
M | Can I leave my luggage here? | 짐 좀 맡길 수 있어요?
M | Where can I change money? | 환전 어디서 해요?
M | One ticket to Busan, please. | 부산 가는 표 한 장 주세요.
M | What time does it leave? | 몇 시에 출발해요?
M | What time does it arrive? | 몇 시에 도착해요?
`
});
