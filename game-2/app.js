(() => {
  "use strict";

  const MISSION_LEVELS = {
  "easy": {
    "name": "순한맛",
    "stars": 1,
    "emoji": "🙂"
  },
  "normal": {
    "name": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  "hard": {
    "name": "고난도",
    "stars": 3,
    "emoji": "🔥"
  },
  "crazy": {
    "name": "광기",
    "stars": 5,
    "emoji": "🤪"
  }
};

  const MISSIONS = [
  {
    "text": "{target}에게 휴지를 건네세요.",
    "hint": "상대가 직접 받으면 성공",
    "level": "easy",
    "levelName": "순한맛",
    "stars": 1,
    "emoji": "🙂"
  },
  {
    "text": "{target}이 물을 한 모금 마시게 만드세요.",
    "hint": "직접 권하거나 자연스럽게 유도하기",
    "level": "easy",
    "levelName": "순한맛",
    "stars": 1,
    "emoji": "🙂"
  },
  {
    "text": "{target}에게 오늘 몇 시에 왔는지 물어보세요.",
    "hint": "정확한 시간을 들으면 성공",
    "level": "easy",
    "levelName": "순한맛",
    "stars": 1,
    "emoji": "🙂"
  },
  {
    "text": "{target}의 이름을 대화 중 두 번 부르세요.",
    "hint": "연속일 필요는 없음",
    "level": "easy",
    "levelName": "순한맛",
    "stars": 1,
    "emoji": "🙂"
  },
  {
    "text": "{target}과 자연스럽게 건배하세요.",
    "hint": "단체 건배 말고 둘이 잔을 부딪혀야 성공",
    "level": "easy",
    "levelName": "순한맛",
    "stars": 1,
    "emoji": "🙂"
  },
  {
    "text": "{target}에게 사진을 찍어달라고 부탁하세요.",
    "hint": "실제로 사진을 찍어야 성공",
    "level": "easy",
    "levelName": "순한맛",
    "stars": 1,
    "emoji": "🙂"
  },
  {
    "text": "{target}이 휴대폰 화면을 확인하게 만드세요.",
    "hint": "직접 화면을 보면 성공",
    "level": "easy",
    "levelName": "순한맛",
    "stars": 1,
    "emoji": "🙂"
  },
  {
    "text": "{target}에게 음식을 하나 추천받으세요.",
    "hint": "음식 이름을 들으면 성공",
    "level": "easy",
    "levelName": "순한맛",
    "stars": 1,
    "emoji": "🙂"
  },
  {
    "text": "{target}에게 요즘 가장 사고 싶은 것을 물어보세요.",
    "hint": "물건 이름을 들으면 성공",
    "level": "easy",
    "levelName": "순한맛",
    "stars": 1,
    "emoji": "🙂"
  },
  {
    "text": "{target}이 웃게 만드세요.",
    "hint": "간지럽히기 금지",
    "level": "easy",
    "levelName": "순한맛",
    "stars": 1,
    "emoji": "🙂"
  },
  {
    "text": "{target}에게 자리에서 한 번 일어나게 만드세요.",
    "hint": "물건 부탁이나 자리 이동도 가능",
    "level": "easy",
    "levelName": "순한맛",
    "stars": 1,
    "emoji": "🙂"
  },
  {
    "text": "{target}에게 음식이나 술을 한 번 받으세요.",
    "hint": "상대가 직접 건네야 성공",
    "level": "easy",
    "levelName": "순한맛",
    "stars": 1,
    "emoji": "🙂"
  },
  {
    "text": "{target}과 하이파이브하세요.",
    "hint": "손바닥이 실제로 닿아야 성공",
    "level": "easy",
    "levelName": "순한맛",
    "stars": 1,
    "emoji": "🙂"
  },
  {
    "text": "{target}에게 내일 일정이 있는지 물어보세요.",
    "hint": "대답까지 들어야 성공",
    "level": "easy",
    "levelName": "순한맛",
    "stars": 1,
    "emoji": "🙂"
  },
  {
    "text": "{target}이 다른 사람 이름을 부르게 만드세요.",
    "hint": "누구의 이름이든 가능",
    "level": "easy",
    "levelName": "순한맛",
    "stars": 1,
    "emoji": "🙂"
  },
  {
    "text": "{target}이 고개를 끄덕이게 만드세요.",
    "hint": "질문을 이용해도 됨",
    "level": "easy",
    "levelName": "순한맛",
    "stars": 1,
    "emoji": "🙂"
  },
  {
    "text": "{target}에게 손바닥을 보여 달라고 하세요.",
    "hint": "손금을 본다고 해도 됨",
    "level": "easy",
    "levelName": "순한맛",
    "stars": 1,
    "emoji": "🙂"
  },
  {
    "text": "{target}이 특정 음식을 한입 먹게 만드세요.",
    "hint": "어떤 음식이든 가능",
    "level": "easy",
    "levelName": "순한맛",
    "stars": 1,
    "emoji": "🙂"
  },
  {
    "text": "{target}에게 최근 본 영화나 드라마를 물어보세요.",
    "hint": "작품 제목을 들으면 성공",
    "level": "easy",
    "levelName": "순한맛",
    "stars": 1,
    "emoji": "🙂"
  },
  {
    "text": "{target}에게 가장 좋아하는 계절을 물어보세요.",
    "hint": "계절 이름을 들으면 성공",
    "level": "easy",
    "levelName": "순한맛",
    "stars": 1,
    "emoji": "🙂"
  },
  {
    "text": "{target}에게 오늘 먹은 첫 음식을 물어보세요.",
    "hint": "음식명을 들으면 성공",
    "level": "easy",
    "levelName": "순한맛",
    "stars": 1,
    "emoji": "🙂"
  },
  {
    "text": "{target}에게 지금 시간을 확인하게 만드세요.",
    "hint": "휴대폰이나 시계를 직접 봐야 성공",
    "level": "easy",
    "levelName": "순한맛",
    "stars": 1,
    "emoji": "🙂"
  },
  {
    "text": "{target}이 자신의 잔을 들어 보이게 하세요.",
    "hint": "잔을 손에 들면 성공",
    "level": "easy",
    "levelName": "순한맛",
    "stars": 1,
    "emoji": "🙂"
  },
  {
    "text": "{target}에게 집에서 가장 마음에 드는 곳을 물어보세요.",
    "hint": "공간 이름을 들으면 성공",
    "level": "easy",
    "levelName": "순한맛",
    "stars": 1,
    "emoji": "🙂"
  },
  {
    "text": "{target}에게 '진짜?'라는 말을 듣게 만드세요.",
    "hint": "정확한 표현이 나와야 성공",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}에게 '왜?'라는 말을 듣게 만드세요.",
    "hint": "정확히 왜라는 반응을 끌어내기",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}에게 '뭐라고?'라는 말을 듣게 만드세요.",
    "hint": "못 들은 척하게 만들어도 됨",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}에게 '몰라'라는 말을 듣게 만드세요.",
    "hint": "질문을 잘 골라야 함",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}에게 '대박'이라는 말을 듣게 만드세요.",
    "hint": "놀라운 이야기를 자연스럽게 꺼내기",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}에게 '설마'라는 말을 듣게 만드세요.",
    "hint": "너무 티 나는 거짓말은 금지",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}에게 '맞아'라는 말을 두 번 듣게 만드세요.",
    "hint": "연속일 필요는 없음",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}에게 '아니'라는 말을 세 번 듣게 만드세요.",
    "hint": "서로 다른 질문도 가능",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}에게 '잠깐만'이라는 말을 듣게 만드세요.",
    "hint": "상대가 행동을 멈추게 해도 됨",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}에게 '미쳤다'라는 말을 듣게 만드세요.",
    "hint": "좋은 의미든 나쁜 의미든 가능",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}이 자신의 머리카락을 만지게 만드세요.",
    "hint": "헤어스타일 이야기를 활용",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}이 양손을 동시에 들게 만드세요.",
    "hint": "만세나 스트레칭 유도 가능",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}이 박수를 한 번 치게 만드세요.",
    "hint": "축하 분위기를 만들어도 됨",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}이 손가락으로 숫자를 표현하게 만드세요.",
    "hint": "나이·점수·인원 질문 활용",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}에게 테이블 위 물건 하나를 옮기게 하세요.",
    "hint": "컵·접시·휴지 모두 가능",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}이 휴대폰을 뒤집어 놓게 만드세요.",
    "hint": "화면이 아래로 향해야 성공",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}이 자신의 잔 위치를 바꾸게 만드세요.",
    "hint": "앞뒤·좌우 이동 모두 인정",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}이 냅킨이나 휴지를 접게 만드세요.",
    "hint": "모양은 상관없음",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}이 냉장고를 열게 만드세요.",
    "hint": "음료나 음식 요청 활용",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}이 자신의 나이를 말하게 만드세요.",
    "hint": "만 나이든 한국식 나이든 가능",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}이 숫자 7을 말하게 만드세요.",
    "hint": "시간·날짜·점수 질문 활용",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}이 영어 단어를 하나 말하게 만드세요.",
    "hint": "브랜드명도 인정",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}이 누군가를 칭찬하게 만드세요.",
    "hint": "외모·성격·음식 모두 가능",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}이 누군가에게 고맙다고 말하게 만드세요.",
    "hint": "감사 표현이 나와야 성공",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}이 자신의 흑역사 하나를 말하게 만드세요.",
    "hint": "짧은 이야기라도 인정",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}이 술 취한 경험을 이야기하게 만드세요.",
    "hint": "구체적 사건이 나오면 성공",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}이 첫인상 이야기를 하게 만드세요.",
    "hint": "누구에 대한 첫인상이든 가능",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}이 가장 술이 센 사람을 고르게 만드세요.",
    "hint": "이름을 말하면 성공",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}이 집주인을 칭찬하게 만드세요.",
    "hint": "집·음식·준비 중 하나면 성공",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}이 다른 사람에게 물을 따라주게 만드세요.",
    "hint": "본인이 아닌 다른 사람이어야 함",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}이 다른 사람과 건배하게 만드세요.",
    "hint": "당신과 건배하면 실패",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}이 다른 사람에게 질문하게 만드세요.",
    "hint": "질문 내용은 무엇이든 가능",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}이 다른 사람과 자리를 바꾸게 만드세요.",
    "hint": "완전히 자리를 교체해야 성공",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}이 집들이 선물 이야기를 꺼내게 만드세요.",
    "hint": "직접 먼저 언급하면 실패",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}이 오늘 음식 중 최고를 고르게 만드세요.",
    "hint": "음식 이름을 말하면 성공",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}이 자신의 휴대폰 배터리를 확인하게 만드세요.",
    "hint": "퍼센트까지 말하면 완벽 성공",
    "level": "normal",
    "levelName": "눈치싸움",
    "stars": 2,
    "emoji": "👀"
  },
  {
    "text": "{target}에게 결혼 또는 연애 이야기를 먼저 꺼내게 만드세요.",
    "hint": "직접 먼저 주제를 말하면 실패",
    "level": "hard",
    "levelName": "고난도",
    "stars": 3,
    "emoji": "🔥"
  },
  {
    "text": "{target}이 음식 사진을 찍게 만드세요.",
    "hint": "실제로 촬영해야 성공",
    "level": "hard",
    "levelName": "고난도",
    "stars": 3,
    "emoji": "🔥"
  },
  {
    "text": "{target}과 가위바위보를 하세요.",
    "hint": "자연스러운 이유를 만들어야 함",
    "level": "hard",
    "levelName": "고난도",
    "stars": 3,
    "emoji": "🔥"
  },
  {
    "text": "{target}이 자리에서 몸을 한 바퀴 돌게 만드세요.",
    "hint": "옷이나 뒷모습을 보여달라고 해도 됨",
    "level": "hard",
    "levelName": "고난도",
    "stars": 3,
    "emoji": "🔥"
  },
  {
    "text": "{target}이 자신의 휴대폰을 다른 사람에게 건네게 만드세요.",
    "hint": "잠깐 건네는 것도 가능",
    "level": "hard",
    "levelName": "고난도",
    "stars": 3,
    "emoji": "🔥"
  },
  {
    "text": "{target}에게 동물 울음소리를 내게 하세요.",
    "hint": "개·고양이·닭 모두 가능",
    "level": "hard",
    "levelName": "고난도",
    "stars": 3,
    "emoji": "🔥"
  },
  {
    "text": "{target}에게 갑자기 손하트를 하게 만드세요.",
    "hint": "사진 포즈 활용 가능",
    "level": "hard",
    "levelName": "고난도",
    "stars": 3,
    "emoji": "🔥"
  },
  {
    "text": "{target}이 혀를 한 번 내밀게 만드세요.",
    "hint": "표정 따라 하기를 활용",
    "level": "hard",
    "levelName": "고난도",
    "stars": 3,
    "emoji": "🔥"
  },
  {
    "text": "{target}이 이상한 표정을 3초 이상 짓게 만드세요.",
    "hint": "실제로 유지해야 성공",
    "level": "hard",
    "levelName": "고난도",
    "stars": 3,
    "emoji": "🔥"
  },
  {
    "text": "{target}이 갑자기 춤을 3초 이상 추게 만드세요.",
    "hint": "노래나 따라 하기를 활용",
    "level": "hard",
    "levelName": "고난도",
    "stars": 3,
    "emoji": "🔥"
  },
  {
    "text": "{target}이 윙크하게 만드세요.",
    "hint": "사진 포즈 활용 가능",
    "level": "hard",
    "levelName": "고난도",
    "stars": 3,
    "emoji": "🔥"
  },
  {
    "text": "{target}이 손가락 총 포즈를 하게 만드세요.",
    "hint": "영화·게임 흉내 활용",
    "level": "hard",
    "levelName": "고난도",
    "stars": 3,
    "emoji": "🔥"
  },
  {
    "text": "{target}이 제자리에서 스쿼트를 한 번 하게 만드세요.",
    "hint": "운동 자세 이야기 활용",
    "level": "hard",
    "levelName": "고난도",
    "stars": 3,
    "emoji": "🔥"
  },
  {
    "text": "{target}이 아무 노래나 한 소절 부르게 만드세요.",
    "hint": "5초 이상 부르면 성공",
    "level": "hard",
    "levelName": "고난도",
    "stars": 3,
    "emoji": "🔥"
  },
  {
    "text": "{target}이 갑자기 경례하게 만드세요.",
    "hint": "군대 이야기나 신고식 활용",
    "level": "hard",
    "levelName": "고난도",
    "stars": 3,
    "emoji": "🔥"
  },
  {
    "text": "{target}이 자신의 이름을 크게 외치게 만드세요.",
    "hint": "본인이 직접 외쳐야 성공",
    "level": "hard",
    "levelName": "고난도",
    "stars": 3,
    "emoji": "🔥"
  },
  {
    "text": "{target}이 머리 위로 하트를 만들게 하세요.",
    "hint": "두 팔을 사용해야 인정",
    "level": "hard",
    "levelName": "고난도",
    "stars": 3,
    "emoji": "🔥"
  },
  {
    "text": "{target}이 다른 사람에게 충전기가 있는지 물어보게 만드세요.",
    "hint": "실제로 질문해야 성공",
    "level": "hard",
    "levelName": "고난도",
    "stars": 3,
    "emoji": "🔥"
  },
  {
    "text": "{target}이 먼저 음악을 바꾸자고 말하게 만드세요.",
    "hint": "노래·분위기 변경 모두 인정",
    "level": "hard",
    "levelName": "고난도",
    "stars": 3,
    "emoji": "🔥"
  },
  {
    "text": "{target}이 먼저 사진을 찍자고 제안하게 만드세요.",
    "hint": "셀카든 단체사진이든 가능",
    "level": "hard",
    "levelName": "고난도",
    "stars": 3,
    "emoji": "🔥"
  },
  {
    "text": "{target}이 먼저 단체 건배를 제안하게 만드세요.",
    "hint": "당신이 먼저 말하면 실패",
    "level": "hard",
    "levelName": "고난도",
    "stars": 3,
    "emoji": "🔥"
  },
  {
    "text": "{target}이 다른 사람과 동시에 같은 말을 하게 만드세요.",
    "hint": "한 단어만 겹쳐도 성공",
    "level": "hard",
    "levelName": "고난도",
    "stars": 3,
    "emoji": "🔥"
  },
  {
    "text": "{target}이 자신의 휴대폰을 찾게 만드세요.",
    "hint": "손에 들고 찾으면 대성공",
    "level": "hard",
    "levelName": "고난도",
    "stars": 3,
    "emoji": "🔥"
  },
  {
    "text": "{target}이 한쪽 눈을 감고 무언가를 보게 만드세요.",
    "hint": "사진이나 시력 테스트 활용",
    "level": "hard",
    "levelName": "고난도",
    "stars": 3,
    "emoji": "🔥"
  },
  {
    "text": "{target}이 자신의 엉덩이를 한 번 털게 만드세요.",
    "hint": "춤이나 장난으로 유도 가능",
    "level": "crazy",
    "levelName": "광기",
    "stars": 5,
    "emoji": "🤪"
  },
  {
    "text": "{target}이 5초 동안 로봇처럼 말하게 만드세요.",
    "hint": "로봇 목소리가 확실해야 성공",
    "level": "crazy",
    "levelName": "광기",
    "stars": 5,
    "emoji": "🤪"
  },
  {
    "text": "{target}이 자신의 이름으로 삼행시를 하게 만드세요.",
    "hint": "완성하면 성공",
    "level": "crazy",
    "levelName": "광기",
    "stars": 5,
    "emoji": "🤪"
  },
  {
    "text": "{target}이 외계인 흉내를 내게 만드세요.",
    "hint": "소리나 행동 둘 중 하나면 가능",
    "level": "crazy",
    "levelName": "광기",
    "stars": 5,
    "emoji": "🤪"
  },
  {
    "text": "{target}이 3초 동안 모델 워킹을 하게 만드세요.",
    "hint": "최소 세 걸음 이상",
    "level": "crazy",
    "levelName": "광기",
    "stars": 5,
    "emoji": "🤪"
  },
  {
    "text": "{target}이 음식 하나를 광고하듯 소개하게 만드세요.",
    "hint": "홈쇼핑 말투면 성공",
    "level": "crazy",
    "levelName": "광기",
    "stars": 5,
    "emoji": "🤪"
  },
  {
    "text": "{target}이 뉴스 앵커처럼 한 문장 말하게 만드세요.",
    "hint": "앵커 말투가 나와야 성공",
    "level": "crazy",
    "levelName": "광기",
    "stars": 5,
    "emoji": "🤪"
  },
  {
    "text": "{target}이 누군가에게 왕이나 여왕처럼 명령하게 만드세요.",
    "hint": "명령형 문장을 말해야 성공",
    "level": "crazy",
    "levelName": "광기",
    "stars": 5,
    "emoji": "🤪"
  },
  {
    "text": "{target}이 갑자기 손으로 망원경을 만들게 하세요.",
    "hint": "두 손을 눈 앞에 대면 성공",
    "level": "crazy",
    "levelName": "광기",
    "stars": 5,
    "emoji": "🤪"
  },
  {
    "text": "{target}이 만화 캐릭터 말투를 따라 하게 만드세요.",
    "hint": "한 문장 이상 말해야 성공",
    "level": "crazy",
    "levelName": "광기",
    "stars": 5,
    "emoji": "🤪"
  },
  {
    "text": "{target}이 5초 동안 슬로모션으로 움직이게 만드세요.",
    "hint": "움직임이 확실히 느려야 성공",
    "level": "crazy",
    "levelName": "광기",
    "stars": 5,
    "emoji": "🤪"
  },
  {
    "text": "{target}이 자신의 잔에게 말을 걸게 만드세요.",
    "hint": "잔을 바라보고 한 문장 말해야 성공",
    "level": "crazy",
    "levelName": "광기",
    "stars": 5,
    "emoji": "🤪"
  },
  {
    "text": "{target}이 음식에게 사과하게 만드세요.",
    "hint": "음식을 바라보고 미안하다고 해야 성공",
    "level": "crazy",
    "levelName": "광기",
    "stars": 5,
    "emoji": "🤪"
  },
  {
    "text": "{target}이 의자에게 고맙다고 말하게 만드세요.",
    "hint": "의자를 보고 말해야 인정",
    "level": "crazy",
    "levelName": "광기",
    "stars": 5,
    "emoji": "🤪"
  },
  {
    "text": "{target}이 아무 물건 하나를 마이크처럼 사용하게 만드세요.",
    "hint": "말하거나 노래해야 성공",
    "level": "crazy",
    "levelName": "광기",
    "stars": 5,
    "emoji": "🤪"
  },
  {
    "text": "{target}이 자신을 동물에 비유하게 만드세요.",
    "hint": "동물 이름과 이유까지 말해야 성공",
    "level": "crazy",
    "levelName": "광기",
    "stars": 5,
    "emoji": "🤪"
  },
  {
    "text": "{target}이 5초 동안 대통령 연설처럼 말하게 만드세요.",
    "hint": "손동작까지 하면 완벽 성공",
    "level": "crazy",
    "levelName": "광기",
    "stars": 5,
    "emoji": "🤪"
  },
  {
    "text": "{target}이 갑자기 누군가를 인터뷰하게 만드세요.",
    "hint": "질문을 두 개 이상 해야 성공",
    "level": "crazy",
    "levelName": "광기",
    "stars": 5,
    "emoji": "🤪"
  },
  {
    "text": "{target}이 영화 명대사를 갑자기 외치게 만드세요.",
    "hint": "실제 명대사든 즉흥이든 인정",
    "level": "crazy",
    "levelName": "광기",
    "stars": 5,
    "emoji": "🤪"
  },
  {
    "text": "{target}이 허공에 키스를 날리게 만드세요.",
    "hint": "사진이나 장난 상황에서 유도",
    "level": "crazy",
    "levelName": "광기",
    "stars": 5,
    "emoji": "🤪"
  }
];

  const state = {
    db: null,
    roomCode: "",
    playerId: "",
    nickname: "",
    isHost: false,
    room: null,
    player: null,
    timerId: null,
    confirmResolve: null,
    lastSeenReportCount: 0,
    currentRoundForReports: 0
  };

  const $ = (selector) => document.querySelector(selector);
  const screens = [...document.querySelectorAll(".screen")];

  function showScreen(id) {
    screens.forEach((screen) => screen.classList.toggle("active", screen.id === id));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  function randomCode(length = 6) {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let value = "";
    for (let i = 0; i < length; i += 1) {
      value += chars[Math.floor(Math.random() * chars.length)];
    }
    return value;
  }

  function randomId() {
    if (crypto.randomUUID) return crypto.randomUUID();
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function validateFirebaseConfig() {
    const config = window.FIREBASE_CONFIG || {};
    return config.apiKey && !String(config.apiKey).includes("YOUR_");
  }

  function initializeFirebase() {
    if (!validateFirebaseConfig()) {
      alert("firebase-config.js에 Firebase 설정값을 먼저 입력해 주세요.");
      return false;
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(window.FIREBASE_CONFIG);
    }

    state.db = firebase.database();
    $("#connectionBadge").textContent = "연결됨";
    return true;
  }

  function roomRef(path = "") {
    const suffix = path ? `/${path}` : "";
    return state.db.ref(`rooms/${state.roomCode}${suffix}`);
  }

  function playerRef(playerId = state.playerId) {
    return roomRef(`players/${playerId}`);
  }

  function normalizeNickname(value) {
    return String(value || "").trim().slice(0, 10);
  }

  async function createRoom() {
    const nickname = normalizeNickname($("#nicknameInput").value) || "방장";

    if (!initializeFirebase()) return;

    state.roomCode = randomCode();
    state.playerId = randomId();
    state.nickname = nickname;
    state.isHost = true;

    const createdAt = firebase.database.ServerValue.TIMESTAMP;

    await roomRef().set({
      status: "lobby",
      hostId: state.playerId,
      round: 0,
      duration: 180,
      createdAt,
      result: null
    });

    await playerRef().set({
      nickname,
      isHost: true,
      joinedAt: createdAt,
      score: 0,
      completed: false,
      reportedBy: {},
      reportStats: { sent: 0, received: 0 },
      mission: null
    });

    setupDisconnectCleanup();
    startRoomListener();
    showScreen("lobbyScreen");
  }

  async function joinRoom() {
    const code = $("#roomCodeInput").value.trim().toUpperCase();
    const nickname = normalizeNickname($("#nicknameInput").value);

    if (!code || !nickname) {
      showToast("방 코드와 닉네임을 입력해 주세요.");
      return;
    }

    if (!initializeFirebase()) return;

    const snapshot = await state.db.ref(`rooms/${code}`).once("value");
    if (!snapshot.exists()) {
      showToast("존재하지 않는 방입니다.");
      return;
    }

    const room = snapshot.val();
    if (room.status !== "lobby") {
      showToast("이미 게임이 시작된 방입니다.");
      return;
    }

    const players = room.players || {};
    const duplicated = Object.values(players).some((p) => p.nickname === nickname);
    if (duplicated) {
      showToast("이미 사용 중인 닉네임입니다.");
      return;
    }

    if (Object.keys(players).length >= 10) {
      showToast("최대 10명까지 참가할 수 있습니다.");
      return;
    }

    state.roomCode = code;
    state.playerId = randomId();
    state.nickname = nickname;
    state.isHost = false;

    await playerRef().set({
      nickname,
      isHost: false,
      joinedAt: firebase.database.ServerValue.TIMESTAMP,
      score: 0,
      completed: false,
      reportedBy: {},
      reportStats: { sent: 0, received: 0 },
      mission: null
    });

    setupDisconnectCleanup();
    startRoomListener();
    showScreen("lobbyScreen");
  }

  function setupDisconnectCleanup() {
    playerRef().onDisconnect().remove();
  }

  function startRoomListener() {
    roomRef().on("value", (snapshot) => {
      if (!snapshot.exists()) {
        showToast("방이 종료되었습니다.");
        resetLocalState();
        showScreen("homeScreen");
        return;
      }

      state.room = snapshot.val();
      state.player = state.room.players?.[state.playerId] || null;
      renderFromRoomState();
    });
  }

  function renderFromRoomState() {
    const room = state.room;
    if (!room) return;

    state.isHost = room.hostId === state.playerId;

    if (room.status === "lobby") {
      renderLobby();
      showScreen("lobbyScreen");
      stopTimer();
      return;
    }

    if (room.status === "playing") {
      renderMission();
      showScreen("missionScreen");
      startTimer();
      return;
    }

    if (room.status === "result") {
      renderResult();
      showScreen("resultScreen");
      stopTimer();
      return;
    }

    if (room.status === "finished") {
      renderFinal();
      showScreen("finalScreen");
      stopTimer();
    }
  }

  function renderLobby() {
    const room = state.room;
    const players = Object.entries(room.players || {})
      .sort(([, a], [, b]) => (a.joinedAt || 0) - (b.joinedAt || 0));

    $("#roomCodeText").textContent = state.roomCode;
    $("#playerCountText").textContent = `${players.length}명`;
    $("#playerList").innerHTML = players.map(([id, player], index) => `
      <li class="player-item">
        <div class="player-name">
          <span class="player-avatar">${index + 1}</span>
          <span>${escapeHtml(player.nickname)}</span>
        </div>
        <span class="player-meta">${player.isHost ? "방장 👑" : "참가 완료"}</span>
      </li>
    `).join("");

    $("#hostControls").classList.toggle("hidden", !state.isHost);
    $("#guestWaiting").classList.toggle("hidden", state.isHost);

    if (state.isHost) {
      $("#startGameButton").disabled = players.length < 3;
      $("#startGameButton").textContent = players.length < 3
        ? "3명 이상 모여야 시작 가능"
        : "게임 시작";
    }
  }

  function chooseTarget(playerIds, currentId) {
    const candidates = playerIds.filter((id) => id !== currentId);
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  function shuffled(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  async function startRound() {
    if (!state.isHost) return;

    const players = state.room.players || {};
    const playerIds = Object.keys(players);

    if (playerIds.length < 3) {
      showToast("최소 3명이 필요합니다.");
      return;
    }

    const duration = Number($("#roundDurationSelect").value || state.room.duration || 180);
    const missionPool = shuffled(MISSIONS);
    const updates = {};
    const nextRound = Number(state.room.round || 0) + 1;
    const startedAt = Date.now();

    playerIds.forEach((playerId, index) => {
      const targetId = chooseTarget(playerIds, playerId);
      const target = players[targetId];
      const mission = missionPool[index % missionPool.length];

      updates[`players/${playerId}/mission`] = {
        text: mission.text.replace("{target}", target.nickname),
        hint: mission.hint,
        targetId,
        targetName: target.nickname,
        level: mission.level || "normal",
        levelName: mission.levelName || MISSION_LEVELS.normal.name,
        stars: mission.stars || MISSION_LEVELS.normal.stars,
        emoji: mission.emoji || MISSION_LEVELS.normal.emoji
      };
      updates[`players/${playerId}/completed`] = false;
      updates[`players/${playerId}/reportedBy`] = null;
    });

    updates.status = "playing";
    updates.round = nextRound;
    updates.duration = duration;
    updates.startedAt = startedAt;
    updates.result = null;

    state.lastSeenReportCount = 0;
    state.currentRoundForReports = nextRound;
    await roomRef().update(updates);
  }

  function renderMission() {
    const player = state.player;
    if (!player?.mission) return;

    $("#roundNumberText").textContent = state.room.round;
    $("#missionText").textContent = player.mission.text;
    $("#missionHintText").textContent = player.mission.hint || "";
    $("#completeMissionButton").disabled = Boolean(player.completed);
    $("#completeMissionButton").textContent = player.completed ? "성공 접수 완료 ✓" : "미션 성공!";
    $("#hostRoundControls").classList.toggle("hidden", !state.isHost);

    const reportCount = player.reportedBy ? Object.keys(player.reportedBy).length : 0;
    if (state.currentRoundForReports !== Number(state.room.round || 0)) {
      state.currentRoundForReports = Number(state.room.round || 0);
      state.lastSeenReportCount = reportCount;
    } else if (reportCount > state.lastSeenReportCount) {
      showAnonymousReportAlert(reportCount - state.lastSeenReportCount);
      state.lastSeenReportCount = reportCount;
    } else {
      state.lastSeenReportCount = reportCount;
    }
  }

  function showAnonymousReportAlert(count) {
    const message = count > 1
      ? `익명의 ${count}명이 당신을 신고했습니다`
      : "익명의 누군가가 당신을 신고했습니다";

    $("#anonymousReportTitle").textContent = message;
    $("#anonymousReportModal").classList.remove("hidden");

    if (navigator.vibrate) {
      navigator.vibrate([180, 80, 180]);
    }
  }

  function closeAnonymousReportAlert() {
    $("#anonymousReportModal").classList.add("hidden");
  }

  function startTimer() {
    stopTimer();
    updateTimer();

    state.timerId = setInterval(() => {
      updateTimer();
    }, 1000);
  }

  function stopTimer() {
    clearInterval(state.timerId);
    state.timerId = null;
  }

  function updateTimer() {
    if (!state.room || state.room.status !== "playing") return;

    const endAt = Number(state.room.startedAt || 0) + Number(state.room.duration || 180) * 1000;
    const remaining = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
    const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
    const seconds = String(remaining % 60).padStart(2, "0");
    $("#timerText").textContent = `${minutes}:${seconds}`;

    if (remaining <= 0 && state.isHost) {
      finishRound();
    }
  }

  async function completeMission() {
    const confirmed = await confirmAction(
      "미션 성공 처리",
      "정말 미션을 성공했나요? 거짓 성공은 술자리 재판 대상입니다 😈"
    );

    if (!confirmed) return;
    await playerRef().update({ completed: true });
    showToast("미션 성공이 접수됐습니다!");
  }

  function openReportScreen() {
    const players = Object.entries(state.room.players || {})
      .filter(([id]) => id !== state.playerId);

    $("#reportPlayerList").innerHTML = players.map(([id, player]) => `
      <button class="select-player-button" data-player-id="${id}" type="button">
        <span>${escapeHtml(player.nickname)}</span>
        <span>신고하기 →</span>
      </button>
    `).join("");

    document.querySelectorAll(".select-player-button").forEach((button) => {
      button.addEventListener("click", () => submitReport(button.dataset.playerId));
    });

    showScreen("reportScreen");
  }

  async function submitReport(targetPlayerId) {
    const target = state.room.players?.[targetPlayerId];
    if (!target) return;

    const confirmed = await confirmAction(
      `${target.nickname} 신고`,
      `정말 ${target.nickname}님이 미션을 수행 중이라고 생각하나요?`
    );

    if (!confirmed) return;

    const existingReport = await roomRef(
      `players/${targetPlayerId}/reportedBy/${state.playerId}`
    ).once("value");

    if (existingReport.exists()) {
      showToast("이미 이 사람을 신고했습니다.");
      showScreen("missionScreen");
      return;
    }

    const reporterSent = Number(state.room.players?.[state.playerId]?.reportStats?.sent || 0);
    const targetReceived = Number(target.reportStats?.received || 0);
    const reportUpdates = {};

    reportUpdates[`players/${targetPlayerId}/reportedBy/${state.playerId}`] = {
      nickname: state.nickname,
      createdAt: firebase.database.ServerValue.TIMESTAMP
    };
    reportUpdates[`players/${state.playerId}/reportStats/sent`] = reporterSent + 1;
    reportUpdates[`players/${targetPlayerId}/reportStats/received`] = targetReceived + 1;

    await roomRef().update(reportUpdates);

    showToast(`${target.nickname}님을 익명 신고했습니다.`);
    showScreen("missionScreen");
  }

  async function finishRound() {
    if (!state.isHost || state.room.status !== "playing") return;

    const players = state.room.players || {};
    const entries = Object.entries(players);
    const penalties = [];
    const details = [];
    const missionResults = [];
    const reportRelations = [];

    entries.forEach(([playerId, player]) => {
      const reports = player.reportedBy ? Object.keys(player.reportedBy) : [];
      const reportCount = reports.length;

      reports.forEach((reporterId) => {
        if (players[reporterId]) {
          reportRelations.push({
            reporterId,
            reporterName: players[reporterId].nickname,
            targetId: playerId,
            targetName: player.nickname
          });
        }
      });

      if (player.completed && reportCount === 0) {
        const targetId = player.mission?.targetId;
        if (targetId && players[targetId]) {
          penalties.push(targetId);
          details.push(`${player.nickname} 완전범죄 성공 → ${players[targetId].nickname} 한 모금`);
        }
      } else if (player.completed && reportCount > 0) {
        penalties.push(playerId);
        details.push(`${player.nickname} 미션 성공했지만 들킴 → 본인 한 모금`);
      } else if (!player.completed && reportCount > 0) {
        reports.forEach((reporterId) => {
          if (players[reporterId]) {
            penalties.push(reporterId);
            details.push(`${players[reporterId].nickname} 오신고 → 신고자 한 모금`);
          }
        });
      }
      missionResults.push({
        playerId,
        nickname: player.nickname,
        missionText: player.mission?.text || "",
        level: player.mission?.level || "normal",
        levelName: player.mission?.levelName || MISSION_LEVELS.normal.name,
        stars: Number(player.mission?.stars || MISSION_LEVELS.normal.stars),
        emoji: player.mission?.emoji || MISSION_LEVELS.normal.emoji,
        completed: Boolean(player.completed),
        reportCount
      });
    });

    if (penalties.length === 0) {
      const randomPlayerId = entries[Math.floor(Math.random() * entries.length)][0];
      penalties.push(randomPlayerId);
      details.push(`아무도 걸리지 않아 랜덤 벌칙 → ${players[randomPlayerId].nickname} 한 모금`);
    }

    const penaltyCounts = penalties.reduce((acc, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {});

    const updates = {};
    Object.entries(penaltyCounts).forEach(([playerId, count]) => {
      const currentScore = Number(players[playerId]?.score || 0);
      updates[`players/${playerId}/score`] = currentScore + count;
    });

    const penaltyNames = Object.entries(penaltyCounts).map(([id, count]) => ({
      playerId: id,
      nickname: players[id]?.nickname || "알 수 없음",
      count
    }));

    updates.status = "result";
    updates.result = {
      round: state.room.round,
      penaltyNames,
      details,
      missionResults,
      reportRelations,
      createdAt: Date.now()
    };

    await roomRef().update(updates);
  }

  function renderResult() {
    const result = state.room.result || {};
    const penalties = result.penaltyNames || [];

    if (penalties.length === 1) {
      $("#resultEmoji").textContent = "🍺";
      $("#resultTitle").textContent = `${penalties[0].nickname} 한 모금!`;
      $("#resultDescription").textContent = "완전범죄는 실패했다.";
    } else {
      $("#resultEmoji").textContent = "🍻";
      $("#resultTitle").textContent = "여러 명 적발!";
      $("#resultDescription").textContent = penalties
        .map((item) => `${item.nickname} ${item.count}모금`)
        .join(" · ");
    }

    $("#roundSummary").innerHTML = (result.details || [])
      .map((detail) => `<div class="summary-item">${escapeHtml(detail)}</div>`)
      .join("");

    renderDifficultyReveal(result.missionResults || []);
    renderReportStatistics(result.reportRelations || []);

    $("#hostResultControls").classList.toggle("hidden", !state.isHost);
    $("#guestResultWaiting").classList.toggle("hidden", state.isHost);
  }

  function renderDifficultyReveal(missionResults) {
    $("#difficultyResultList").innerHTML = missionResults.map((mission) => {
      const count = Math.min(5, Number(mission.stars || 0));
      const stars = "★".repeat(count) + "☆".repeat(5 - count);

      let statusText = "미션 실패";
      let statusClass = "mission-failed";

      if (mission.completed && mission.reportCount === 0) {
        statusText = "완전범죄 성공";
        statusClass = "mission-perfect";
      } else if (mission.completed && mission.reportCount > 0) {
        statusText = "성공했지만 발각";
        statusClass = "mission-caught";
      } else if (!mission.completed && mission.reportCount > 0) {
        statusText = "신고받았지만 실패";
        statusClass = "mission-innocent";
      }

      return `
        <article class="difficulty-result-card ${escapeHtml(mission.level)}">
          <div class="difficulty-result-header">
            <strong>${escapeHtml(mission.nickname)}</strong>
            <span class="${statusClass}">${statusText}</span>
          </div>
          <p class="revealed-mission">${escapeHtml(mission.missionText)}</p>
          <div class="difficulty-bottom">
            <span class="difficulty-name">${escapeHtml(mission.emoji)} ${escapeHtml(mission.levelName)}</span>
            <span class="difficulty-stars">${stars}</span>
          </div>
        </article>
      `;
    }).join("");
  }

  function renderReportStatistics(reportRelations) {
    const players = state.room.players || {};

    $("#reportRelationsList").innerHTML = reportRelations.length
      ? reportRelations.map((item) => `
          <div class="report-relation-item">
            <strong>${escapeHtml(item.reporterName)}</strong>
            <span>→ 신고 →</span>
            <strong>${escapeHtml(item.targetName)}</strong>
          </div>
        `).join("")
      : `<div class="empty-report">이번 라운드에는 신고가 없었습니다.</div>`;

    const stats = Object.entries(players).map(([playerId, player]) => ({
      playerId,
      nickname: player.nickname,
      sent: reportRelations.filter((item) => item.reporterId === playerId).length,
      received: reportRelations.filter((item) => item.targetId === playerId).length
    }));

    $("#reportStatsList").innerHTML = stats
      .sort((a, b) => (b.received + b.sent) - (a.received + a.sent))
      .map((item) => `
        <div class="report-stat-item ${item.playerId === state.playerId ? "my-stat" : ""}">
          <strong>${escapeHtml(item.nickname)}${item.playerId === state.playerId ? " (나)" : ""}</strong>
          <span>신고 ${item.sent}회 · 피신고 ${item.received}회</span>
        </div>
      `).join("");
  }

  async function nextRound() {
    await startRound();
  }

  async function endGame() {
    if (!state.isHost) return;
    await roomRef().update({ status: "finished" });
  }

  function renderFinal() {
    const players = Object.values(state.room.players || {})
      .sort((a, b) => Number(b.score || 0) - Number(a.score || 0));

    $("#rankingList").innerHTML = players.map((player, index) => `
      <li class="ranking-item">
        <span>${index + 1}. ${escapeHtml(player.nickname)}</span>
        <strong>${Number(player.score || 0)}모금</strong>
      </li>
    `).join("");
  }

  function confirmAction(title, message) {
    $("#confirmTitle").textContent = title;
    $("#confirmMessage").textContent = message;
    $("#confirmModal").classList.remove("hidden");

    return new Promise((resolve) => {
      state.confirmResolve = resolve;
    });
  }

  function resolveConfirm(value) {
    $("#confirmModal").classList.add("hidden");
    if (state.confirmResolve) {
      state.confirmResolve(value);
      state.confirmResolve = null;
    }
  }

  function resetLocalState() {
    stopTimer();
    state.roomCode = "";
    state.playerId = "";
    state.nickname = "";
    state.isHost = false;
    state.room = null;
    state.player = null;
    state.lastSeenReportCount = 0;
    state.currentRoundForReports = 0;
  }

  function restartSession() {
    if (state.db && state.roomCode) {
      roomRef().off();
    }
    resetLocalState();
    location.href = "./index.html";
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  $("#createRoomButton").addEventListener("click", createRoom);
  $("#joinRoomButton").addEventListener("click", joinRoom);
  $("#startGameButton").addEventListener("click", startRound);
  $("#completeMissionButton").addEventListener("click", completeMission);
  $("#reportPlayerButton").addEventListener("click", openReportScreen);
  $("#cancelReportButton").addEventListener("click", () => showScreen("missionScreen"));
  $("#finishRoundButton").addEventListener("click", finishRound);
  $("#nextRoundButton").addEventListener("click", nextRound);
  $("#endGameButton").addEventListener("click", endGame);
  $("#restartSessionButton").addEventListener("click", restartSession);
  $("#confirmCancelButton").addEventListener("click", () => resolveConfirm(false));
  $("#confirmOkButton").addEventListener("click", () => resolveConfirm(true));
  $("#anonymousReportCloseButton").addEventListener("click", closeAnonymousReportAlert);

  $("#copyRoomCodeButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(state.roomCode);
      showToast("방 코드가 복사됐습니다.");
    } catch {
      showToast(`방 코드: ${state.roomCode}`);
    }
  });

  $("#roomCodeInput").addEventListener("input", (event) => {
    event.target.value = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
  });
})();
