// CONVERSATION SCENES — short role-plays. You are always "y".
//   ["t", Korean, English]                      the other person speaks
//   ["y", what you want to say, [options]]      your turn; each option is [Korean, English, 1 if right, why it's wrong]
// More than one option can be right.
// face = the other person's picture, set = one line that sets the scene.
KT.scenes = [
  { id: "cafe", face: "🧑‍🍳", set: "A café in Hongdae, mid-morning. You reach the front of the queue.", title: "Order a coffee", ko: "카페에서", icon: "☕", art: "cafe", who: "Barista", steps: [
    ["t", "어서 오세요. 주문하시겠어요?", "Welcome. Are you ready to order?"],
    ["y", "Order one iced americano.", [
      ["아이스 아메리카노 한 잔 주세요.", "One iced americano, please.", 1],
      ["따뜻한 라떼 두 잔 주세요.", "Two hot lattes, please.", 0, "That's two hot lattes."],
      ["아이스 아메리카노 얼마예요?", "How much is an iced americano?", 0, "That asks the price — it doesn't order."]]],
    ["t", "사이즈는 어떻게 해 드릴까요?", "What size would you like?"],
    ["y", "Ask for a large.", [
      ["큰 걸로 주세요.", "A large one, please.", 1],
      ["작은 걸로 주세요.", "A small one, please.", 0, "작은 = small."],
      ["따뜻한 걸로 주세요.", "A hot one, please.", 0, "따뜻한 = hot. They asked about size."]]],
    ["t", "드시고 가세요?", "Having it here?"],
    ["y", "No — you want it to go.", [
      ["아니요, 포장해 주세요.", "No, to go please.", 1],
      ["네, 먹고 갈게요.", "Yes, I'll have it here.", 0, "That means you're staying."],
      ["네, 감사합니다.", "Yes, thank you.", 0, "네 = yes: you'd be staying."]]],
    ["t", "사천오백 원입니다.", "That's 4,500 won."],
    ["y", "Say you'll pay by card.", [
      ["카드로 할게요.", "I'll pay by card.", 1],
      ["현금으로 할게요.", "I'll pay cash.", 0, "현금 = cash."],
      ["영수증 주세요.", "Receipt, please.", 0, "영수증 = receipt."]]],
    ["t", "영수증 드릴까요?", "Would you like a receipt?"],
    ["y", "Politely say no.", [
      ["아니요, 괜찮아요.", "No, I'm fine.", 1],
      ["네, 주세요.", "Yes, please.", 0, "That says yes."],
      ["몰라요.", "I don't know.", 0, "A bit odd here!"]]],
    ["t", "진동벨로 알려 드릴게요.", "We'll buzz you when it's ready."],
    ["y", "Thank them.", [
      ["감사합니다.", "Thank you.", 1],
      ["죄송합니다.", "I'm sorry.", 0, "죄송합니다 = sorry."],
      ["안녕하세요.", "Hello.", 0, "That's hello."]]]
  ] },

  { id: "store", face: "🧑‍💼", set: "A CU convenience store, late evening. You have a lunch box in your hand.", title: "At the convenience store", ko: "편의점에서", icon: "🏪", art: "lanterns", who: "Cashier", steps: [
    ["t", "어서 오세요.", "Welcome."],
    ["y", "Ask if they have chopsticks.", [
      ["젓가락 있어요?", "Do you have chopsticks?", 1],
      ["젓가락 얼마예요?", "How much are chopsticks?", 0, "얼마예요 asks the price."],
      ["화장실 있어요?", "Do you have a toilet?", 0, "화장실 = toilet."]]],
    ["t", "네, 여기 있어요. 봉투 필요하세요?", "Yes, here you are. Do you need a bag?"],
    ["y", "No bag needed.", [
      ["아니요, 괜찮아요.", "No, I'm fine.", 1],
      ["네, 주세요.", "Yes, please.", 0, "That asks for a bag."],
      ["봉투 주세요.", "A bag, please.", 0, "That asks for a bag."]]],
    ["y", "Ask them to heat up your lunch box.", [
      ["이거 데워 주세요.", "Please heat this up.", 1],
      ["이거 포장해 주세요.", "Please wrap this.", 0, "포장 = wrap / to go."],
      ["이거 뭐예요?", "What is this?", 0, "That asks what it is."]]],
    ["t", "네. 삼천팔백 원입니다.", "Sure. That's 3,800 won."],
    ["y", "Ask if you can pay by card.", [
      ["카드 돼요?", "Is card okay?", 1],
      ["카드 있어요?", "Do you have a card?", 0, "That asks whether THEY have a card."],
      ["현금 돼요?", "Is cash okay?", 0, "현금 = cash."]]],
    ["t", "네, 여기 꽂아 주세요.", "Yes, insert it here please."],
    ["t", "감사합니다. 안녕히 가세요.", "Thank you. Goodbye."],
    ["y", "You are leaving, they are staying. Say goodbye.", [
      ["안녕히 계세요.", "Goodbye. (stay well)", 1],
      ["안녕히 가세요.", "Goodbye. (go well)", 0, "가세요 is for the person who is leaving. You're the one leaving, so say 계세요."],
      ["어서 오세요.", "Welcome.", 0, "That's the shop greeting."]]]
  ] },

  { id: "bbq", face: "🧑‍🍳", set: "A busy barbecue place in Mapo. Smoke, sizzling, a table bell.", title: "Korean barbecue", ko: "고깃집에서", icon: "🥩", art: "noodles", who: "Server", steps: [
    ["t", "어서 오세요. 몇 분이세요?", "Welcome. How many people?"],
    ["y", "Two of you.", [
      ["두 명이요.", "Two people.", 1],
      ["한 명이요.", "One person.", 0, "한 = one."],
      ["두 개요.", "Two things.", 0, "개 counts things. People are 명."]]],
    ["t", "이쪽으로 앉으세요.", "Please sit over here."],
    ["y", "Call the server over.", [
      ["여기요!", "Over here!", 1],
      ["저는요!", "As for me!", 0, "Not a way to call staff."],
      ["안녕!", "Hi!", 0, "Too casual — and it doesn't call anyone."]]],
    ["t", "네, 주문하시겠어요?", "Yes, ready to order?"],
    ["y", "Order two portions of pork belly.", [
      ["삼겹살 이 인분 주세요.", "Two portions of pork belly, please.", 1],
      ["삼겹살 두 병 주세요.", "Two bottles of pork belly, please.", 0, "병 = bottles!"],
      ["비빔밥 하나 주세요.", "One bibimbap, please.", 0, "That's bibimbap."]]],
    ["t", "음료는요?", "And to drink?"],
    ["y", "One beer, please.", [
      ["맥주 한 병 주세요.", "One bottle of beer, please.", 1],
      ["소주 한 병 주세요.", "One bottle of soju, please.", 0, "소주 = soju."],
      ["물 한 병 주세요.", "One bottle of water, please.", 0, "물 = water."]]],
    ["t", "맛있게 드세요.", "Enjoy your meal."],
    ["y", "Later: ask for more side dishes.", [
      ["반찬 더 주세요.", "More side dishes, please.", 1],
      ["반찬 얼마예요?", "How much are the side dishes?", 0, "They're free — no need to ask!"],
      ["반찬 빼 주세요.", "Leave out the side dishes.", 0, "빼 주세요 = leave it out."]]],
    ["y", "You've finished. Ask for the bill.", [
      ["계산해 주세요.", "The bill, please.", 1],
      ["주문할게요.", "I'd like to order.", 0, "That starts a new order."],
      ["포장해 주세요.", "To go, please.", 0, "That asks for takeaway."]]],
    ["t", "삼만 이천 원입니다.", "That's 32,000 won."]
  ] },

  { id: "taxi", face: "🧑‍✈️", set: "You flag down an orange taxi outside your hotel.", title: "Take a taxi", ko: "택시에서", icon: "🚕", art: "seoul", who: "Driver", steps: [
    ["t", "어서 오세요. 어디로 가세요?", "Welcome. Where to?"],
    ["y", "Ask to go to Seoul Station.", [
      ["서울역으로 가 주세요.", "To Seoul Station, please.", 1],
      ["서울역이 어디예요?", "Where is Seoul Station?", 0, "That asks where it is."],
      ["서울역에서 왔어요.", "I came from Seoul Station.", 0, "에서 = from."]]],
    ["t", "네, 알겠습니다.", "Yes, understood."],
    ["y", "Ask how long it takes.", [
      ["얼마나 걸려요?", "How long does it take?", 1],
      ["얼마예요?", "How much is it?", 0, "That asks the price."],
      ["몇 시예요?", "What time is it?", 0, "That asks the time now."]]],
    ["t", "이십 분쯤 걸려요.", "About twenty minutes."],
    ["y", "It's hot. Ask for the air-con.", [
      ["에어컨 좀 켜 주세요.", "Please turn on the air-con.", 1],
      ["창문 좀 열어 주세요.", "Please open the window.", 0, "창문 = window."],
      ["좀 빨리 가 주세요.", "A bit faster, please.", 0, "That asks to speed up."]]],
    ["t", "다 왔습니다.", "We're here."],
    ["y", "Ask to stop right here.", [
      ["여기서 세워 주세요.", "Please stop here.", 1],
      ["여기서 기다려 주세요.", "Please wait here.", 0, "기다려 = wait."],
      ["직진하세요.", "Go straight.", 0, "That keeps going!"]]],
    ["t", "만 이천 원입니다.", "That's 12,000 won."],
    ["y", "Pay by card and ask for the receipt.", [
      ["카드로 할게요. 영수증 주세요.", "By card. A receipt, please.", 1],
      ["현금으로 할게요. 봉투 주세요.", "Cash. A bag, please.", 0, "현금 = cash, 봉투 = bag."],
      ["카드 없어요.", "I don't have a card.", 0, "없어요 = don't have."]]],
    ["y", "Thank the driver as you get out.", [
      ["감사합니다. 수고하세요.", "Thank you. Keep up the good work.", 1],
      ["잘 먹겠습니다.", "Thanks for the meal.", 0, "That's said before eating."],
      ["어서 오세요.", "Welcome.", 0, "That's what shops say to you."]]]
  ] },

  { id: "subway", face: "🧑", set: "City Hall station. Four lines, eleven exits, and you are lost.", title: "Lost in the subway", ko: "지하철에서", icon: "🚇", art: "train", who: "Passer-by", steps: [
    ["y", "Get a stranger's attention.", [
      ["저기요, 잠시만요.", "Excuse me, one moment.", 1],
      ["여기요, 주문할게요.", "Over here, I'd like to order.", 0, "That's for restaurants."],
      ["안녕히 가세요.", "Goodbye.", 0, "That's goodbye."]]],
    ["t", "네?", "Yes?"],
    ["y", "Ask which line goes to Myeongdong.", [
      ["명동은 몇 호선이에요?", "Which line is Myeongdong on?", 1],
      ["명동은 몇 시예요?", "What time is Myeongdong?", 0, "몇 시 = what time."],
      ["명동은 얼마예요?", "How much is Myeongdong?", 0, "얼마 = how much."]]],
    ["t", "사 호선이에요. 여기서 갈아타세요.", "Line 4. Transfer here."],
    ["y", "You missed that. Ask them to say it slowly.", [
      ["천천히 말해 주세요.", "Please speak slowly.", 1],
      ["빨리 말해 주세요.", "Please speak quickly.", 0, "빨리 = quickly!"],
      ["써 주세요.", "Please write it down.", 1]]],
    ["t", "사 호선. 여기서 갈아타요.", "Line 4. Transfer here."],
    ["y", "Ask how many stops it is.", [
      ["몇 정거장이에요?", "How many stops?", 1],
      ["몇 번 출구예요?", "Which exit number?", 0, "출구 = exit."],
      ["몇 명이에요?", "How many people?", 0, "명 counts people."]]],
    ["t", "세 정거장이에요.", "Three stops."],
    ["y", "Thank them warmly.", [
      ["감사합니다!", "Thank you!", 1],
      ["괜찮아요.", "It's okay.", 0, "That isn't thanks."],
      ["미안해요.", "Sorry.", 0, "That's an apology."]]]
  ] },

  { id: "clothes", face: "💁", set: "A clothes shop in Myeongdong. A jacket has caught your eye.", title: "Buy a jacket", ko: "옷 가게에서", icon: "🧥", art: "city", who: "Shop assistant", steps: [
    ["t", "어서 오세요. 뭐 찾으세요?", "Welcome. Looking for something?"],
    ["y", "You're just browsing.", [
      ["그냥 구경할게요.", "I'm just looking.", 1],
      ["그냥 갈게요.", "I'll just leave.", 0, "갈게요 = I'll go."],
      ["선물을 찾고 있어요.", "I'm looking for a gift.", 0, "That says you want a gift."]]],
    ["t", "네, 천천히 보세요.", "Sure, take your time."],
    ["y", "You found one. Ask to try it on.", [
      ["이거 입어 봐도 돼요?", "Can I try this on?", 1],
      ["이거 먹어도 돼요?", "Can I eat this?", 0, "먹어도 = eat!"],
      ["이거 찍어도 돼요?", "Can I photograph this?", 0, "찍어도 = take a photo."]]],
    ["t", "네, 피팅룸은 저쪽이에요.", "Yes, the fitting room is over there."],
    ["y", "It's too small. Ask for a bigger size.", [
      ["더 큰 사이즈 있어요?", "Do you have a bigger size?", 1],
      ["더 작은 사이즈 있어요?", "Do you have a smaller size?", 0, "작은 = small."],
      ["다른 색 있어요?", "Do you have another colour?", 0, "색 = colour."]]],
    ["t", "네, 여기 있어요.", "Yes, here you are."],
    ["y", "It fits. Ask the price.", [
      ["이거 얼마예요?", "How much is this?", 1],
      ["이거 뭐예요?", "What is this?", 0, "뭐 = what."],
      ["이거 어디예요?", "Where is this?", 0, "어디 = where."]]],
    ["t", "육만 원이에요.", "It's 60,000 won."],
    ["y", "Ask about a tax refund.", [
      ["택스 리펀 돼요?", "Can I get a tax refund?", 1],
      ["교환 돼요?", "Can I exchange it?", 0, "교환 = exchange."],
      ["좀 깎아 주세요.", "A little cheaper, please.", 0, "That's haggling — fine at markets, not in shops."]]],
    ["t", "네, 여권 주세요.", "Yes — your passport, please."],
    ["y", "Say you'll take it.", [
      ["이걸로 주세요.", "I'll take this one.", 1],
      ["좀 더 생각해 볼게요.", "I'll think about it.", 0, "That's the polite way to walk away."],
      ["환불하고 싶어요.", "I'd like a refund.", 0, "환불 = refund."]]]
  ] },

  { id: "meet", face: "🙋", set: "A friend of a friend sits down next to you.", title: "Meet someone new", ko: "처음 만났을 때", icon: "👋", art: "chat", who: "Jiwoo", steps: [
    ["t", "안녕하세요! 저는 지우예요.", "Hello! I'm Jiwoo."],
    ["y", "Greet them and say it's nice to meet you.", [
      ["안녕하세요. 만나서 반가워요.", "Hello. Nice to meet you.", 1],
      ["안녕. 오랜만이에요.", "Hi. Long time no see.", 0, "오랜만 = long time no see — you've only just met."],
      ["안녕히 계세요.", "Goodbye.", 0, "That's goodbye."]]],
    ["t", "어느 나라 사람이에요?", "Where are you from?"],
    ["y", "Say you're from Singapore.", [
      ["저는 싱가포르 사람이에요.", "I'm from Singapore.", 1],
      ["저는 싱가포르에 가요.", "I'm going to Singapore.", 0, "가요 = go."],
      ["싱가포르 좋아해요?", "Do you like Singapore?", 0, "That asks them a question."]]],
    ["t", "와, 한국말 잘하시네요!", "Wow, your Korean is good!"],
    ["y", "Be modest.", [
      ["아니에요, 아직 멀었어요.", "Not at all, I've a long way to go.", 1],
      ["네, 알아요.", "Yes, I know.", 0, "Ha — a bit too confident for Korean manners."],
      ["네, 한국어 쉬워요.", "Yes, Korean is easy.", 0, "쉬워요 = easy. Modesty wins here."]]],
    ["t", "한국 음식 좋아해요?", "Do you like Korean food?"],
    ["y", "Yes — you really like it.", [
      ["네, 진짜 좋아해요.", "Yes, I really like it.", 1],
      ["아니요, 별로예요.", "No, not really.", 0, "별로예요 = it's not great."],
      ["네, 진짜 싫어해요.", "Yes, I really hate it.", 0, "싫어해요 = dislike."]]],
    ["t", "그럼 같이 밥 먹어요!", "Then let's eat together!"],
    ["y", "Great idea! Ask when.", [
      ["좋아요! 언제요?", "Great! When?", 1],
      ["좋아요! 누구요?", "Great! Who?", 0, "누구 = who."],
      ["싫어요.", "I don't want to.", 0, "Ouch."]]],
    ["t", "내일 저녁 어때요?", "How about tomorrow evening?"],
    ["y", "Agree, and ask for their KakaoTalk.", [
      ["좋아요. 카톡 있어요?", "Good. Do you have KakaoTalk?", 1],
      ["좋아요. 카드 있어요?", "Good. Do you have a card?", 0, "카드 = card."],
      ["내일은 바빠요.", "I'm busy tomorrow.", 0, "That turns them down."]]]
  ] },

  { id: "pharmacy", face: "🧑‍⚕️", set: "A small pharmacy with a green 약 sign. Your head is pounding.", title: "At the pharmacy", ko: "약국에서", icon: "💊", art: "hanok", who: "Pharmacist", steps: [
    ["t", "어서 오세요. 어디가 아프세요?", "Welcome. Where does it hurt?"],
    ["y", "You have a headache.", [
      ["머리가 아파요.", "I have a headache.", 1],
      ["배가 아파요.", "I have a stomach ache.", 0, "배 = stomach."],
      ["목이 아파요.", "I have a sore throat.", 0, "목 = throat."]]],
    ["t", "열도 있어요?", "Do you have a fever too?"],
    ["y", "No fever.", [
      ["아니요, 없어요.", "No, I don't.", 1],
      ["네, 있어요.", "Yes, I do.", 0, "That says you have one."],
      ["네, 좋아요.", "Yes, good.", 0, "Not quite an answer."]]],
    ["t", "이 약 드세요.", "Take this medicine."],
    ["y", "Ask how many times a day to take it.", [
      ["하루에 몇 번 먹어요?", "How many times a day?", 1],
      ["하루에 얼마예요?", "How much per day?", 0, "얼마 = how much (money)."],
      ["몇 시에 먹어요?", "What time do I take it?", 0, "Close — but that asks for a clock time."]]],
    ["t", "하루에 세 번, 식후에 드세요.", "Three times a day, after meals."],
    ["y", "Check: three times?", [
      ["세 번이요?", "Three times?", 1],
      ["두 번이요?", "Twice?", 0, "두 = two."],
      ["세 시요?", "Three o'clock?", 0, "시 = o'clock, 번 = times."]]],
    ["t", "네, 맞아요. 사천 원입니다.", "Yes, that's right. 4,000 won."],
    ["y", "Thank them and say goodbye (you're leaving).", [
      ["감사합니다. 안녕히 계세요.", "Thank you. Goodbye.", 1],
      ["감사합니다. 안녕히 가세요.", "Thank you. Goodbye. (go well)", 0, "You're the one leaving — say 계세요."],
      ["죄송합니다. 또 봐요.", "I'm sorry. See you again.", 0, "No need to apologise!"]]]
  ] }
];
