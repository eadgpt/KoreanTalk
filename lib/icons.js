// A small picture for a phrase, chosen from its English text. First match wins, so specific words come first.
// A phrase can also set its own with the tag  i=🚻 ; with no match it uses its group's picture (the third part of a "# Group" line).
(function () {
"use strict";
const N = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
const MAP = [
  // these would otherwise be caught by a broader word further down
  [/not at all|it's okay/, "😊"], [/you can't/, "🙅"], [/you can do it/, "💪"], [/no way/, "😱"], [/doesn't taste/, "😖"], [/police/, "👮"], [/take this away/, "🥡"],
  // places and things you point at
  [/toilet/, "🚻"], [/wi-?fi/, "📶"], [/password|code for|\bkey\b/, "🔑"], [/photo/, "📷"], [/charge my phone|power socket/, "🔌"], [/kakaotalk|message you|my phone|apple pay/, "📱"],
  [/convenience store/, "🏪"], [/subway|station|which line|transfer|stops is|last train/, "🚇"], [/\bbus\b/, "🚌"], [/airport/, "✈️"], [/luggage/, "🧳"], [/change money/, "💱"],
  [/ticket/, "🎫"], [/taxi|this address|stop here|stop by|the boot|faster/, "🚕"], [/air-con/, "❄️"], [/\bexit\b/, "🚪"], [/\bmap\b/, "🗺️"], [/i'm lost/, "🧭"],
  [/straight/, "⬆️"], [/go right/, "➡️"], [/go left/, "⬅️"], [/across the road/, "🚸"], [/on foot|walk/, "🚶"], [/\bbank\b/, "🏦"], [/hospital/, "🏥"],
  [/ambulance/, "🚑"], [/^fire/, "🔥"], [/wallet/, "👛"], [/passport/, "🛂"], [/embassy/, "🏛️"], [/stolen/, "🦹"], [/left my bag/, "👜"],
  // health
  [/headache/, "🤕"], [/stomach|diarrhoea|indigestion/, "🤢"], [/throat|cough|caught a cold/, "🤧"], [/fever/, "🤒"], [/dizzy/, "😵"], [/hurt my|it hurts/, "🩹"], [/allergy\b/, "🤧"],
  [/pharmacy|medicine|painkiller|plasters|digestion|hangover|how do i take|after meals|times a day/, "💊"], [/broken/, "🔧"], [/hot water/, "🚿"], [/the room/, "🛏️"],
  // food and drink
  [/less ice|iced/, "🧊"], [/cake/, "🍰"], [/straws?/, "🥤"], [/oat milk/, "🥛"], [/tissues?/, "🧻"], [/latte|americano|coffee|caffeine|extra shot/, "☕"],
  [/\bbeer\b|a drink|cheers/, "🍺"], [/water/, "💧"], [/bibimbap|bowl of rice/, "🍚"], [/pork|meat|grill|scissors/, "🥩"], [/spicy/, "🌶️"], [/onions?/, "🧅"], [/peanuts?/, "🥜"],
  [/side dishes/, "🥗"], [/chopsticks/, "🥢"], [/plate/, "🍽️"], [/menu|popular dish/, "📋"], [/heat this up/, "♨️"], [/korean food|eat together|want to eat|have you eaten/, "🍲"],
  [/thanks for the meal|delicious|what's good|taste good/, "😋"], [/i'm full/, "🫃"], [/^to go/, "🥡"], [/having it here|have it here/, "🪑"],
  // money and shopping
  [/receipt|tax refund/, "🧾"], [/\bcard\b|pay in one go/, "💳"], [/cash/, "💵"], [/the bill|separately|all together|on me|how much|altogether/, "💰"], [/expensive|cheap|cheaper|on sale|one-plus-one/, "🏷️"],
  [/\bbag\b/, "🛍️"], [/gift/, "🎁"], [/size|fits|try this on|fitting room|too big|too small/, "👕"], [/colour/, "🎨"], [/exchange|refund/, "🔄"], [/just looking|sells best/, "👀"],
  [/points/, "⭐"], [/ready to order|like to order|i'll have this|i'll take this|ordered/, "🧾"], [/your drinks|call you when/, "🛎️"],
  // people
  [/your name|i'm alex/, "📛"], [/where are you from|from singapore/, "🌏"], [/how old|your age|thirty-five/, "🎂"], [/for work|at a company|do for work/, "💼"], [/student/, "🎓"],
  [/travelling/, "🧳"], [/do you live|i live/, "🏠"], [/weather/, "⛅"], [/cold today|too cold/, "🥶"], [/hot today/, "🥵"], [/hobbies/, "🎨"], [/films?/, "🎬"], [/music/, "🎵"],
  [/first time|second time/, "✌️"], [/studied korean|learning korean|korean is good|speak korean|in korean/, "🇰🇷"], [/long way to go/, "😅"], [/are you free|what time shall|a bit late/, "⏰"],
  [/where shall|let's meet|i've arrived/, "📍"], [/on my way/, "🏃"], [/today was fun|so much fun|it's fun/, "🎉"],
  // getting by
  [/say it again/, "🔁"], [/slowly/, "🐢"], [/speak english|speaks english/, "🔤"], [/what does this mean|what is this|what is it|which one|how\?|why\?/, "❓"], [/write it down/, "✍️"],
  [/didn't catch/, "🙉"], [/help/, "🆘"], [/reservation/, "📅"], [/table|seat|sit here/, "🪑"], [/how long is the wait|wait a moment|one moment/, "⏳"], [/two people|just one|how many/, "👥"],
  [/where is|where do|where can|is it here|over there|right there|next to|nearby|far from|is it close|how do i get/, "📍"], [/how long|takes about/, "⏱️"],
  [/this one|that one|of these|the same|one more|a little more|do you have this|show me that/, "👉"], [/is it okay|you can\b|can i\b/, "🙆"],
  // greetings and manners
  [/good night|sleepy/, "😴"], [/nice to meet/, "🤝"], [/long time no see|how have you been|doing well/, "🤗"], [/^welcome/, "🛎️"], [/goodbye|see you|get home|hello|^hi\b/, "👋"],
  [/thank/, "🙏"], [/sorry/, "🙇"], [/excuse me/, "✋"], [/^yes\b/, "⭕"], [/^no\b/, "❌"], [/don't know/, "🤷"], [/i know|got it|understand/, "💡"],
  [/really\?|is that so|i see/, "😮"], [/of course|that's right|^good\./, "👍"], [/maybe/, "🤔"], [/don't want to/, "🙅"], [/i have it/, "✅"], [/i don't have it/, "🚫"],
  // feelings
  [/wow|amazing|excited|looking forward/, "🤩"], [/me too|think so too/, "🙋"], [/great news|congratulations/, "🎉"], [/birthday/, "🎂"], [/shame/, "😔"],
  [/funny/, "😂"], [/cute|pretty/, "🌸"], [/cool!/, "😎"], [/cheer up/, "💪"], [/worry/, "🫂"], [/hungry/, "🤤"], [/thirsty/, "🥤"], [/tired|tough/, "😩"],
  [/happy|good mood/, "😊"], [/bored|boring/, "😑"], [/sad/, "😢"], [/angry/, "😠"], [/nervous/, "😬"], [/embarrassed/, "😳"], [/busy/, "🏃"], [/miss you/, "🥺"],
  [/i like you|i like it/, "😊"], [/love you/, "❤️"], [/want to go/, "🚶"], [/the best/, "🏆"], [/not great|so-so/, "😐"], [/difficult/, "🧗"], [/easy/, "👌"], [/strange/, "🤨"],
  [/problem|urgent/, "⚠️"],
  // time
  [/o'clock|half past|7:20|\bam\b|\bpm\b|what time/, "🕒"], [/^now$/, "⏱️"], [/tomorrow/, "⏭️"], [/yesterday/, "⏮️"], [/morning/, "🌅"], [/tonight/, "🌙"],
  [/^later$|^soon$|while ago/, "⏳"], [/open\?/, "🔓"], [/close\?/, "🔒"], [/weekend|week|day|date|month|year/, "📅"],
  [/cups/, "☕"], [/bottles/, "🍾"], [/\(thing\)/, "🍎"], [/once|hour|minutes/, "⏱️"], [/hundred|thousand|^zero$/, "🔢"]
];
const KEYCAP = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
window.KTIcon = function (en) {
  const s = String(en || "").toLowerCase(), n = N.indexOf(s.replace(" (sino)", ""));
  if (n >= 0) return KEYCAP[n];
  for (const [re, e] of MAP) if (re.test(s)) return e;
  return "";
};
})();
