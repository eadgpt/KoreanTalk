// POLITENESS SWITCH — the same thing said three ways.
// Each line:  English | casual (반말) | polite (해요체) | formal (합니다체) | optional note
KT.politeLevels = [
  { id: "c", face: "👫", title: "Casual", ko: "반말", who: "Close friends your age or younger, children. Never to strangers." },
  { id: "p", face: "🧑‍💼", title: "Polite", ko: "해요체", who: "The safe default: strangers, staff, colleagues, anyone older. Use this." },
  { id: "f", face: "🎤", title: "Formal", ko: "합니다체", who: "Announcements, interviews, presentations, staff to customers, the army." }
];
KT.polite = `
Hello. | 안녕 | 안녕하세요 | 안녕하십니까
Thank you. | 고마워 | 고마워요 | 감사합니다
Sorry. | 미안해 | 미안해요 | 죄송합니다
Yes. | 응 | 네 | 예
No. | 아니 | 아니요 | 아닙니다
It's okay. | 괜찮아 | 괜찮아요 | 괜찮습니다
Nice to meet you. | 반가워 | 반가워요 | 반갑습니다
I'm Minsu. | 나는 민수야 | 저는 민수예요 | 저는 민수입니다 | "I" changes too: 나 is casual, 저 is polite
What is it? | 뭐야? | 뭐예요? | 무엇입니까?
I don't know. | 몰라 | 몰라요 | 모르겠습니다
Got it. | 알았어 | 알겠어요 | 알겠습니다
I like it. | 좋아 | 좋아요 | 좋습니다
It's delicious. | 맛있어 | 맛있어요 | 맛있습니다
I'm going. | 가 | 가요 | 갑니다
Where are you going? | 어디 가? | 어디 가요? | 어디 가십니까?
Did you eat? | 밥 먹었어? | 밥 먹었어요? | 식사하셨습니까? | With elders "eat" itself changes: 먹다 → 식사하다 / 드시다
Give me this, please. | 이거 줘 | 이거 주세요 | 이것 주십시오
Wait a moment. | 잠깐만 | 잠깐만요 | 잠시만 기다려 주십시오
Do you have time? | 시간 있어? | 시간 있어요? | 시간 있으십니까?
Let's go. | 가자 | 가요 | 가시죠 | 가요 means both "I go" and "let's go" — context decides
See you tomorrow. | 내일 봐 | 내일 봐요 | 내일 뵙겠습니다
Good night. | 잘 자 | 잘 자요 | 안녕히 주무십시오
Good work today. | 수고했어 | 수고하셨어요 | 수고하셨습니다
Congratulations. | 축하해 | 축하해요 | 축하드립니다
`;
