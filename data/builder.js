// SENTENCE BUILDER — word tiles to put in Korean order.
// Each line:  English | Korean | optional tip
//   A space starts a new tile.  _ keeps words on one tile.  + marks a particle (shown in colour).
KT.particles = [
  ["은 는", "topic", "“as for…” — what the sentence is about"],
  ["이 가", "subject", "who or what does it"],
  ["을 를", "object", "the thing the verb acts on"],
  ["에", "to / at / on", "a place you go to, or a time"],
  ["에서", "at / from", "where an action happens"],
  ["도", "also", "replaces 은/는 or 을/를"],
  ["로", "by / with", "the means: by bus, by card"],
  ["하고", "and / with", "joins people or things"]
];
KT.builder = `
I drink coffee. | 저+는 커피+를 마셔요. | The verb always goes last.
I eat rice. | 저+는 밥+을 먹어요. | 을 after a consonant, 를 after a vowel.
I go to Seoul. | 저+는 서울+에 가요. | 에 marks where you're heading.
I like kimchi. | 저+는 김치+를 좋아해요.
My friend is coming. | 친구+가 와요. | 가 marks who is doing it.
It's raining. | 비+가 와요. | Literally "rain comes".
I study Korean. | 저+는 한국어+를 공부해요.
I work at a company. | 저+는 회사+에서 일해요. | 에서 marks where something happens.
I'm going home now. | 지금 집+에 가요. | "I" is usually dropped when it's obvious.
I met a friend yesterday. | 어제 친구+를 만났어요. | Time words come early.
I ate lunch at a restaurant. | 식당+에서 점심+을 먹었어요.
I like coffee too. | 저+도 커피+를 좋아해요. | 도 = also. It replaces 는.
I go by subway. | 지하철+로 가요.
I watch a film with a friend. | 친구+하고 영화+를 봐요.
The toilet is over there. | 화장실+은 저기+에 있어요.
I don't eat meat. | 저+는 고기+를 안_먹어요. | 안 goes right before the verb.
I can't speak Korean well. | 저+는 한국어+를 잘_못해요.
I want to drink water. | 물+을 마시고_싶어요. | Verb stem + 고 싶어요 = want to.
I bought this at the convenience store. | 이거 편의점+에서 샀어요.
What are you doing this weekend? | 이번_주말+에 뭐 해요?
The weather is really nice today. | 오늘 날씨+가 진짜 좋아요.
I'm learning Korean these days. | 요즘 한국어+를 배우고_있어요. | Verb stem + 고 있어요 = am doing.
My friend lives in Seoul. | 제_친구+는 서울+에 살아요.
I'm going to Korea next week. | 다음_주+에 한국+에 가요.
I'll go to Busan tomorrow. | 내일 부산+에 갈_거예요. | Verb stem + ㄹ 거예요 = will.
Let's meet at Gangnam Station at seven. | 일곱_시+에 강남역+에서 만나요.
One iced americano, please. | 아이스_아메리카노 한_잔 주세요. | Thing, then how many, then 주세요.
Two portions of pork belly, please. | 삼겹살 이_인분 주세요.
Where is the subway station? | 지하철역+이 어디+에 있어요?
I came to Korea by plane. | 비행기+로 한국+에 왔어요.
`;
