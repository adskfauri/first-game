(() => {
  "use strict";

  const MISSION_LEVELS = {
    "easy": { "name": "순한맛", "stars": 1, "emoji": "🙂" },
    "normal": { "name": "눈치싸움", "stars": 2, "emoji": "👀" },
    "hard": { "name": "고난도", "stars": 3, "emoji": "🔥" },
    "crazy": { "name": "광기", "stars": 5, "emoji": "🤪" }
  };

  const MISSIONS = [
    // ================= [ 순한맛 (Easy) - 일상적인 대화 및 가벼운 행동 ] =================
    { "text": "{target}에게 최근 재미있게 본 영화나 드라마 제목 알아내기", "hint": "작품 제목을 들어야 성공", "level": "easy", "levelName": "순한맛", "stars": 1, "emoji": "🙂" },
    { "text": "{target}에게 요즘 자주 듣는 노래 제목 알아내기", "hint": "노래 제목을 들어야 성공", "level": "easy", "levelName": "순한맛", "stars": 1, "emoji": "🙂" },
    { "text": "{target}에게 가장 좋아하는 계절과 그 이유 알아내기", "hint": "이유까지 들어야 성공", "level": "easy", "levelName": "순한맛", "stars": 1, "emoji": "🙂" },
    { "text": "{target}에게 다음 여행으로 가고 싶은 곳 알아내기", "hint": "구체적인 지역명을 들어야 성공", "level": "easy", "levelName": "순한맛", "stars": 1, "emoji": "🙂" },
    { "text": "{target}에게 오늘 먹은 첫 음식 알아내기", "hint": "메뉴 이름을 들어야 성공", "level": "easy", "levelName": "순한맛", "stars": 1, "emoji": "🙂" },
    { "text": "{target}의 MBTI 알아내기", "hint": "알파벳 4개를 모두 들어야 성공", "level": "easy", "levelName": "순한맛", "stars": 1, "emoji": "🙂" },
    { "text": "{target}에게 휴지나 물티슈 건네받기", "hint": "상대가 직접 건네주어야 성공", "level": "easy", "levelName": "순한맛", "stars": 1, "emoji": "🙂" },
    { "text": "{target}이(가) 내 앞에서 물이나 음료수를 마시게 만들기", "hint": "실제로 마시는 것을 봐야 성공", "level": "easy", "levelName": "순한맛", "stars": 1, "emoji": "🙂" },
    { "text": "{target}이(가) 본인의 스마트폰 화면을 확인하게 만들기", "hint": "화면을 직접 켜서 봐야 성공", "level": "easy", "levelName": "순한맛", "stars": 1, "emoji": "🙂" },
    { "text": "{target}이(가) 내 말에 고개를 크게 끄덕이게 만들기", "hint": "확실한 긍정의 끄덕임이어야 성공", "level": "easy", "levelName": "순한맛", "stars": 1, "emoji": "🙂" },
    { "text": "{target}이(가) 내 머리카락이나 옷매무새를 만지거나 지적하게 만들기", "hint": "신체나 옷에 손이 닿거나 언급하면 성공", "level": "easy", "levelName": "순한맛", "stars": 1, "emoji": "🙂" },
    { "text": "{target}이(가) 웃으면서 박수 치게 만들기", "hint": "한 번 이상 박수를 쳐야 성공", "level": "easy", "levelName": "순한맛", "stars": 1, "emoji": "🙂" },
    { "text": "{target}에게 지금 당장 먹고 싶은 야식 메뉴 알아내기", "hint": "메뉴 이름을 들어야 성공", "level": "easy", "levelName": "순한맛", "stars": 1, "emoji": "🙂" },
    { "text": "{target}의 스마트폰 배경화면이 무엇인지 물어보고 확인하기", "hint": "말로 듣거나 직접 보면 성공", "level": "easy", "levelName": "순한맛", "stars": 1, "emoji": "🙂" },
    { "text": "{target}에게 '아 맞다' 또는 '아 깜빡했다'라는 말 듣기", "hint": "정확한 표현이 나와야 성공", "level": "easy", "levelName": "순한맛", "stars": 1, "emoji": "🙂" },
    { "text": "{target}에게 시계(스마트폰 포함)를 보며 현재 시간 물어보기", "hint": "정확한 시간을 대답하면 성공", "level": "easy", "levelName": "순한맛", "stars": 1, "emoji": "🙂" },
    { "text": "{target}이(가) 기지개를 켜게 만들기", "hint": "팔을 뻗어 기지개를 켜면 성공", "level": "easy", "levelName": "순한맛", "stars": 1, "emoji": "🙂" },
    { "text": "{target}에게 본인의 주량이나 좋아하는 술 종류 알아내기", "hint": "구체적인 대답을 들어야 성공", "level": "easy", "levelName": "순한맛", "stars": 1, "emoji": "🙂" },
    { "text": "{target}이(가) 나에게 질문을 되묻게 만들기", "hint": "'너는?', '넌 어떤데?' 등의 질문을 들으면 성공", "level": "easy", "levelName": "순한맛", "stars": 1, "emoji": "🙂" },
    { "text": "{target}에게 오늘 입고 온 옷이나 아이템 칭찬해서 고맙다는 말 듣기", "hint": "'고마워', '진짜?' 등의 긍정적 반응 성공", "level": "easy", "levelName": "순한맛", "stars": 1, "emoji": "🙂" },

    // ================= [ 눈치싸움 (Normal) - 특정 리액션 및 조금 까다로운 행동 유도 ] =================
    { "text": "{target}에게 '진짜?', '정말?' 이라는 반응 이끌어내기", "hint": "놀라는 뉘앙스로 들어야 성공", "level": "normal", "levelName": "눈치싸움", "stars": 2, "emoji": "👀" },
    { "text": "{target}에게 '왜?', '무슨 일 있어?' 라는 말 듣기", "hint": "궁금해하는 반응을 이끌어내면 성공", "level": "normal", "levelName": "눈치싸움", "stars": 2, "emoji": "👀" },
    { "text": "{target}에게 '대박', '미쳤다' 라는 리액션 이끌어내기", "hint": "둘 중 하나의 단어가 나오면 성공", "level": "normal", "levelName": "눈치싸움", "stars": 2, "emoji": "👀" },
    { "text": "{target}에게 '아니', '그게 아니라' 라며 내 말을 부정하게 만들기", "hint": "반박이나 부정을 이끌어내면 성공", "level": "normal", "levelName": "눈치싸움", "stars": 2, "emoji": "👀" },
    { "text": "{target}이(가) 자리에서 일어나 다른 곳으로 이동하게 만들기", "hint": "화장실, 물 마시기 등 완전히 일어서면 성공", "level": "normal", "levelName": "눈치싸움", "stars": 2, "emoji": "👀" },
    { "text": "{target}이(가) 나에게 질문을 하지 못하도록 3분 동안 내 말만 하기", "hint": "상대방이 끼어들지 못하게 성공", "level": "normal", "levelName": "눈치싸움", "stars": 2, "emoji": "👀" },
    { "text": "{target}과 하이파이브 하기", "hint": "손바닥이 제대로 부딪혀야 성공", "level": "normal", "levelName": "눈치싸움", "stars": 2, "emoji": "👀" },
    { "text": "{target}이(가) 내 앞에서 하품하게 만들기", "hint": "전염시키든 피곤하게 하든 하품을 봐야 성공", "level": "normal", "levelName": "눈치싸움", "stars": 2, "emoji": "👀" },
    { "text": "{target}이(가) 휴지나 종이를 접거나 찢게 만들기", "hint": "손으로 무언가 조물딱거리게 만들면 성공", "level": "normal", "levelName": "눈치싸움", "stars": 2, "emoji": "👀" },
    { "text": "{target}이(가) 허공이나 천장을 바라보게 만들기", "hint": "시선이 명확히 위를 향하면 성공", "level": "normal", "levelName": "눈치싸움", "stars": 2, "emoji": "👀" },
    { "text": "{target}이(가) 자기 입으로 본인 자랑을 하게 만들기", "hint": "스스로 칭찬하는 뉘앙스면 성공", "level": "normal", "levelName": "눈치싸움", "stars": 2, "emoji": "👀" },
    { "text": "{target}이(가) 다른 사람의 험담이나 가벼운 불만을 말하게 만들기", "hint": "장난스러운 투덜거림도 성공", "level": "normal", "levelName": "눈치싸움", "stars": 2, "emoji": "👀" },
    { "text": "{target}에게 '어디?', '누구?' 라는 질문 이끌어내기", "hint": "호기심을 자극해 육하원칙 질문을 받으면 성공", "level": "normal", "levelName": "눈치싸움", "stars": 2, "emoji": "👀" },
    { "text": "{target}이(가) 내 스마트폰 화면을 들여다보게 만들기", "hint": "내가 보여주는 것을 유심히 보면 성공", "level": "normal", "levelName": "눈치싸움", "stars": 2, "emoji": "👀" },
    { "text": "{target}과 눈을 5초 이상 마주치기", "hint": "눈싸움이나 대화 중 자연스럽게 마주치면 성공", "level": "normal", "levelName": "눈치싸움", "stars": 2, "emoji": "👀" },
    { "text": "{target}이(가) 내 빈 잔에 음료나 술을 따라주게 만들기", "hint": "상대방이 직접 병을 들어 따라주면 성공", "level": "normal", "levelName": "눈치싸움", "stars": 2, "emoji": "👀" },
    { "text": "{target}이(가) 음식 사진이나 풍경 사진을 찍게 만들기", "hint": "스마트폰 카메라 앱을 켜서 찍으면 성공", "level": "normal", "levelName": "눈치싸움", "stars": 2, "emoji": "👀" },
    { "text": "{target}이(가) 다리를 꼬거나 자세를 고쳐 앉게 만들기", "hint": "하체 자세에 변화가 생기면 성공", "level": "normal", "levelName": "눈치싸움", "stars": 2, "emoji": "👀" },
    { "text": "{target}에게 최근에 가장 당황했거나 부끄러웠던 썰 듣기", "hint": "구체적인 에피소드를 말하면 성공", "level": "normal", "levelName": "눈치싸움", "stars": 2, "emoji": "👀" },
    { "text": "{target}에게서 '귀찮아' 또는 '피곤해'라는 말 이끌어내기", "hint": "정확한 단어가 나오면 성공", "level": "normal", "levelName": "눈치싸움", "stars": 2, "emoji": "👀" },
    { "text": "{target}이(가) 테이블 아래나 바닥을 무언가 찾는 것처럼 보게 만들기", "hint": "시선이 테이블 밑으로 향하면 성공", "level": "normal", "levelName": "눈치싸움", "stars": 2, "emoji": "👀" },
    { "text": "{target}이(가) 본인의 코나 귀를 만지게 만들기", "hint": "손이 얼굴 주변으로 가면 성공", "level": "normal", "levelName": "눈치싸움", "stars": 2, "emoji": "👀" },
    { "text": "{target}이(가) 내 이름을 정확히 부르게 만들기", "hint": "대명사(너, 야)가 아닌 이름을 부르면 성공", "level": "normal", "levelName": "눈치싸움", "stars": 2, "emoji": "👀" },
    { "text": "{target}이(가) 내 어깨나 등을 가볍게 치게 만들기", "hint": "웃으면서 때리거나 스킨십이 발생하면 성공", "level": "normal", "levelName": "눈치싸움", "stars": 2, "emoji": "👀" },
    { "text": "{target}에게 무인도에 가져갈 물건 3가지 물어보기", "hint": "3가지를 모두 대답하면 성공", "level": "normal", "levelName": "눈치싸움", "stars": 2, "emoji": "👀" },

    // ================= [ 고난도 (Hard) - 의도적인 행동 및 복잡한 문장 유도 ] =================
    { "text": "{target}에게 '말도 안 돼', '거짓말 하지마' 라는 말 듣기", "hint": "강한 불신을 이끌어내면 성공", "level": "hard", "levelName": "고난도", "stars": 3, "emoji": "🔥" },
    { "text": "{target}에게 '네가?', '진짜 네가 그랬다고?' 라며 나를 의심하게 만들기", "hint": "나의 능력을 의심하는 뉘앙스면 성공", "level": "hard", "levelName": "고난도", "stars": 3, "emoji": "🔥" },
    { "text": "{target}에게 '사랑해' 또는 '고마워' 라는 말 직접적으로 듣기", "hint": "정확한 단어가 나와야 성공", "level": "hard", "levelName": "고난도", "stars": 3, "emoji": "🔥" },
    { "text": "{target}이(가) 나에게 먼저 건배(짠)를 제의하게 만들기", "hint": "상대방이 먼저 잔을 내밀면 성공", "level": "hard", "levelName": "고난도", "stars": 3, "emoji": "🔥" },
    { "text": "{target}이(가) 나와 함께 셀카(단체사진 포함)를 찍자고 먼저 제안하게 만들기", "hint": "상대방이 카메라를 들면 성공", "level": "hard", "levelName": "고난도", "stars": 3, "emoji": "🔥" },
    { "text": "{target}이(가) 손하트(어떤 모양이든)를 만들어서 나에게 보여주게 만들기", "hint": "손으로 하트를 만들면 성공", "level": "hard", "levelName": "고난도", "stars": 3, "emoji": "🔥" },
    { "text": "{target}이(가) 특정 노래의 한 소절을 직접 부르게 만들기", "hint": "음정이 들어가게 흥얼거리거나 부르면 성공", "level": "hard", "levelName": "고난도", "stars": 3, "emoji": "🔥" },
    { "text": "{target}이(가) 양손을 머리 위로 들어 올리게 만들기", "hint": "기지개, 항복 등 양손이 다 올라가면 성공", "level": "hard", "levelName": "고난도", "stars": 3, "emoji": "🔥" },
    { "text": "{target}이(가) 나를 대신해서 다른 사람에게 무언가 부탁하게 만들기", "hint": "나의 요청을 다른 사람에게 토스하면 성공", "level": "hard", "levelName": "고난도", "stars": 3, "emoji": "🔥" },
    { "text": "{target}이(가) 내 젓가락이나 숟가락을 대신 놔주게 만들기", "hint": "테이블 세팅을 도와주면 성공", "level": "hard", "levelName": "고난도", "stars": 3, "emoji": "🔥" },
    { "text": "{target}이(가) 나에게 '너 오늘 좀 이상해' 또는 '취했어?'라고 묻게 만들기", "hint": "나의 이상 행동을 지적하면 성공", "level": "hard", "levelName": "고난도", "stars": 3, "emoji": "🔥" },
    { "text": "{target}이(가) 현재 모임의 분위기나 장소에 대해 불평하게 만들기", "hint": "더워, 추워, 시끄러워 등의 불만이면 성공", "level": "hard", "levelName": "고난도", "stars": 3, "emoji": "🔥" },
    { "text": "{target}이(가) 나에게 자신의 물건(폰, 지갑, 립스틱 등)을 잠시 맡기게 만들기", "hint": "나에게 물건을 건네주며 들고 있어달라고 하면 성공", "level": "hard", "levelName": "고난도", "stars": 3, "emoji": "🔥" },
    { "text": "{target}이(가) 최근에 본인의 통장 잔고나 돈 쓴 이야기를 하게 만들기", "hint": "재정 상태나 소비에 대한 구체적 언급 성공", "level": "hard", "levelName": "고난도", "stars": 3, "emoji": "🔥" },
    { "text": "{target}이(가) 나에게 고민 상담을 하게 만들기", "hint": "진지한 뉘앙스의 고민을 털어놓으면 성공", "level": "hard", "levelName": "고난도", "stars": 3, "emoji": "🔥" },
    { "text": "{target}이(가) 나를 다른 사람과 엮어서 놀리거나 농담하게 만들기", "hint": "나를 향한 장난스러운 공격이 들어오면 성공", "level": "hard", "levelName": "고난도", "stars": 3, "emoji": "🔥" },
    { "text": "{target}에게 '나 오늘 어때?'라고 물어봐서 외모 칭찬 듣기", "hint": "'예쁘다', '멋있다' 등 긍정적 단어 성공", "level": "hard", "levelName": "고난도", "stars": 3, "emoji": "🔥" },
    { "text": "{target}이(가) 직접 나서서 모임의 다음 일정을 제안하게 만들기", "hint": "'2차 가자', '다음에 또 보자' 등 성공", "level": "hard", "levelName": "고난도", "stars": 3, "emoji": "🔥" },
    { "text": "{target}이(가) 나에게 직접 안주나 음식을 입에 넣어주게(먹여주게) 만들기", "hint": "실제로 음식을 먹여주면 성공", "level": "hard", "levelName": "고난도", "stars": 3, "emoji": "🔥" },
    { "text": "{target}이(가) 본인의 이상형을 3가지 이상 구체적으로 말하게 만들기", "hint": "외모나 성격 특징 3가지를 말하면 성공", "level": "hard", "levelName": "고난도", "stars": 3, "emoji": "🔥" },
    
    // ================= [ 광기 (Crazy) - 뻔뻔함이 필요한 기행 유도 ] =================
    { "text": "{target}이(가) 강아지나 고양이 등 동물 울음소리를 내게 만들기", "hint": "진짜 동물을 따라하면 성공", "level": "crazy", "levelName": "광기", "stars": 5, "emoji": "🤪" },
    { "text": "{target}이(가) 자리에서 일어나 3초 이상 춤을 추게 만들기", "hint": "가벼운 율동이어도 리듬을 타면 성공", "level": "crazy", "levelName": "광기", "stars": 5, "emoji": "🤪" },
    { "text": "{target}이(가) 감정을 듬뿍 담아 영화/드라마 명대사를 외치게 만들기", "hint": "연기를 하는 톤이 들어가야 성공", "level": "crazy", "levelName": "광기", "stars": 5, "emoji": "🤪" },
    { "text": "{target}이(가) 로봇이나 AI처럼 딱딱한 기계음 성대모사로 말하게 만들기", "hint": "한 문장 이상 기계톤으로 말하면 성공", "level": "crazy", "levelName": "광기", "stars": 5, "emoji": "🤪" },
    { "text": "{target}이(가) 방 한쪽 끝에서 다른 쪽 끝까지 모델처럼 워킹하게 만들기", "hint": "당당한 걸음걸이로 걸으면 성공", "level": "crazy", "levelName": "광기", "stars": 5, "emoji": "🤪" },
    { "text": "{target}이(가) 허공에 대고 손키스(플라잉 키스)를 날리게 만들기", "hint": "쪽 소리와 함께 손을 날리면 성공", "level": "crazy", "levelName": "광기", "stars": 5, "emoji": "🤪" },
    { "text": "{target}이(가) 눈 앞의 사물(의자, 컵 등)에게 진지하게 말을 걸게 만들기", "hint": "사물을 의인화해서 대화하면 성공", "level": "crazy", "levelName": "광기", "stars": 5, "emoji": "🤪" },
    { "text": "{target}이(가) 자기 이름으로 뻔뻔하게 삼행시를 짓게 만들기", "hint": "끝까지 완성하면 성공", "level": "crazy", "levelName": "광기", "stars": 5, "emoji": "🤪" },
    { "text": "{target}이(가) 얼굴을 잔뜩 구겨 가장 못생긴 표정을 3초간 유지하게 만들기", "hint": "망가짐을 두려워하지 않으면 성공", "level": "crazy", "levelName": "광기", "stars": 5, "emoji": "🤪" },
    { "text": "{target}이(가) 다른 사람의 행동이나 말투를 과장해서 따라하게(성대모사) 만들기", "hint": "모임 내의 누군가를 따라하면 성공", "level": "crazy", "levelName": "광기", "stars": 5, "emoji": "🤪" },
    { "text": "{target}이(가) 갑자기 홈쇼핑 쇼호스트처럼 눈 앞의 물건을 팔게 만들기", "hint": "물건의 장점을 과장해서 어필하면 성공", "level": "crazy", "levelName": "광기", "stars": 5, "emoji": "🤪" },
    { "text": "{target}이(가) 팔을 크게 휘저으며 슬로모션으로 행동하게 만들기", "hint": "최소 5초 이상 느리게 움직이면 성공", "level": "crazy", "levelName": "광기", "stars": 5, "emoji": "🤪" },
    { "text": "{target}이(가) 숟가락이나 빈 병을 마이크 삼아 노래 부르게 만들기", "hint": "마이크를 쥐는 시늉을 하면 성공", "level": "crazy", "levelName": "광기", "stars": 5, "emoji": "🤪" },
    { "text": "{target}과 러브샷(팔을 엇갈려 술이나 음료 마시기) 하기", "hint": "거절당하지 않고 러브샷을 완성하면 성공", "level": "crazy", "levelName": "광기", "stars": 5, "emoji": "🤪" },
    { "text": "{target}이(가) 전혀 쓰지 않는 지역 사투리나 과장된 억양으로 말하게 만들기", "hint": "어설프더라도 시도하면 성공", "level": "crazy", "levelName": "광기", "stars": 5, "emoji": "🤪" }
  ];

})();

  const IMPOSSIBLE_MISSION_KEYWORDS = [
    "단체방", "채팅방", "메시지를 보내", "문자를 보내", "전화하게",
    "통화하게", "SNS", "인스타", "카카오톡", "앱을 설치", "검색하게",
    "링크를 열", "사진을 올리", "업로드", "게시물", "스토리에 올리"
  ];

  function isPlayableMission(mission) {
    const text = `${mission?.text || ""} ${mission?.hint || ""}`;
    return !IMPOSSIBLE_MISSION_KEYWORDS.some((keyword) => text.includes(keyword));
  }

  const SURPRISE_EVENTS = [
    { type: "speed", emoji: "🚨", title: "긴급 버튼!", description: "가장 늦게 누른 사람은 한 모금!", buttonText: "지금 누르기!", duration: 8 },
    { type: "tap", emoji: "🔥", title: "다다다다 연타!", description: "5초 동안 가장 적게 누른 사람은 한 모금!", buttonText: "연타 시작!", duration: 5 },
    { type: "target", emoji: "🎯", title: "77에 멈춰라!", description: "움직이는 숫자를 77에 가장 가깝게 멈추세요.", buttonText: "멈춰!", duration: 8 },
    { type: "bomb", emoji: "💣", title: "폭탄 버튼!", description: "폭탄이 터지기 전에 버튼을 누르세요. 마지막 반응자가 한 모금!", buttonText: "폭탄 넘기기!", duration: 8 },
    { type: "fake", emoji: "🕵️", title: "진짜 버튼 찾기!", description: "여섯 개 중 진짜 버튼을 찾아 누르세요.", buttonText: "진짜 찾기", duration: 8 }
  ];

  const EMBARRASSING_PENALTIES = [
  "가상의 기자회견에서 허위 신고 이유 해명하기",
  "가상의 레드카펫을 걷고 인터뷰 포즈 취하기",
  "가상의 팬들에게 수상 소감 발표하기",
  "가장 못생긴 표정을 5초 유지하기",
  "가장 자신 있는 개인기 하나 하기",
  "경례 자세로 자신의 잘못을 크게 보고하기",
  "고양이처럼 기지개 켜고 야옹 세 번 하기",
  "공룡처럼 방 안을 세 걸음 걷기",
  "광고 음악 한 소절을 랩처럼 부르기",
  "광고 음악 한 소절을 속삭이듯 부르기",
  "광고 음악 한 소절을 아이돌처럼 부르기",
  "광고 음악 한 소절을 엄숙하게 부르기",
  "광고 음악 한 소절을 오페라처럼 부르기",
  "광고 음악 한 소절을 울먹이며 부르기",
  "냅킨에게 진지하게 감사 인사를 세 번 하기",
  "냅킨에게 진지하게 고민 상담하기",
  "냅킨에게 진지하게 사랑 고백하기",
  "냅킨에게 진지하게 자기소개하기",
  "냅킨에게 진지하게 정중하게 사과하기",
  "냅킨에게 진지하게 한쪽 무릎을 꿇고 프러포즈하기",
  "냉장고 방향을 바라보며 감사 편지 읽기",
  "뉴스 앵커처럼 오늘 음식을(를) 10초 동안 발표하기",
  "뉴스 앵커처럼 자기소개을(를) 10초 동안 발표하기",
  "뉴스 앵커처럼 자신의 장점을(를) 10초 동안 발표하기",
  "뉴스 앵커처럼 지금 기분을(를) 10초 동안 발표하기",
  "뉴스 앵커처럼 집들이 소감을(를) 10초 동안 발표하기",
  "뉴스 앵커처럼 허위 신고 사건을(를) 10초 동안 발표하기",
  "다음 라운드 첫 1분 동안 말하기 전에 반드시 ‘대장님!’를 붙이기",
  "다음 라운드 첫 1분 동안 말하기 전에 반드시 ‘멍!’를 붙이기",
  "다음 라운드 첫 1분 동안 말하기 전에 반드시 ‘반성합니다!’를 붙이기",
  "다음 라운드 첫 1분 동안 말하기 전에 반드시 ‘사랑합니다!’를 붙이기",
  "다음 라운드 첫 1분 동안 말하기 전에 반드시 ‘선생님!’를 붙이기",
  "다음 라운드 첫 1분 동안 말하기 전에 반드시 ‘야옹!’를 붙이기",
  "다음 라운드 첫 1분 동안 말하기 전에 반드시 ‘주인님!’를 붙이기",
  "다음 라운드 첫 1분 동안 말하기 전에 반드시 ‘충성!’를 붙이기",
  "다음 라운드 첫 1분 동안 모든 문장 끝에 ‘내가 왜 그랬을까’를 붙이기",
  "다음 라운드 첫 1분 동안 모든 문장 끝에 ‘라고 생각합니다’를 붙이기",
  "다음 라운드 첫 1분 동안 모든 문장 끝에 ‘반박은 받지 않겠습니다’를 붙이기",
  "다음 라운드 첫 1분 동안 모든 문장 끝에 ‘사랑과 평화’를 붙이기",
  "다음 라운드 첫 1분 동안 모든 문장 끝에 ‘이상입니다’를 붙이기",
  "다음 라운드 첫 1분 동안 모든 문장 끝에 ‘제 잘못입니다’를 붙이기",
  "다음 라운드가 끝날 때까지 말하기 전에 반드시 ‘대장님!’를 붙이기",
  "다음 라운드가 끝날 때까지 말하기 전에 반드시 ‘멍!’를 붙이기",
  "다음 라운드가 끝날 때까지 말하기 전에 반드시 ‘반성합니다!’를 붙이기",
  "다음 라운드가 끝날 때까지 말하기 전에 반드시 ‘사랑합니다!’를 붙이기",
  "다음 라운드가 끝날 때까지 말하기 전에 반드시 ‘선생님!’를 붙이기",
  "다음 라운드가 끝날 때까지 말하기 전에 반드시 ‘야옹!’를 붙이기",
  "다음 라운드가 끝날 때까지 말하기 전에 반드시 ‘주인님!’를 붙이기",
  "다음 라운드가 끝날 때까지 말하기 전에 반드시 ‘충성!’를 붙이기",
  "다음 라운드가 끝날 때까지 모든 문장 끝에 ‘내가 왜 그랬을까’를 붙이기",
  "다음 라운드가 끝날 때까지 모든 문장 끝에 ‘라고 생각합니다’를 붙이기",
  "다음 라운드가 끝날 때까지 모든 문장 끝에 ‘반박은 받지 않겠습니다’를 붙이기",
  "다음 라운드가 끝날 때까지 모든 문장 끝에 ‘사랑과 평화’를 붙이기",
  "다음 라운드가 끝날 때까지 모든 문장 끝에 ‘이상입니다’를 붙이기",
  "다음 라운드가 끝날 때까지 모든 문장 끝에 ‘제 잘못입니다’를 붙이기",
  "단체사진 중앙에서 이상한 표정 담당하기",
  "대통령처럼 오늘 음식을(를) 10초 동안 발표하기",
  "대통령처럼 자기소개을(를) 10초 동안 발표하기",
  "대통령처럼 자신의 장점을(를) 10초 동안 발표하기",
  "대통령처럼 지금 기분을(를) 10초 동안 발표하기",
  "대통령처럼 집들이 소감을(를) 10초 동안 발표하기",
  "대통령처럼 허위 신고 사건을(를) 10초 동안 발표하기",
  "동물 울음소리와 몸짓을 5초간 따라 하기",
  "동요 한 소절을 랩처럼 부르기",
  "동요 한 소절을 속삭이듯 부르기",
  "동요 한 소절을 아이돌처럼 부르기",
  "동요 한 소절을 엄숙하게 부르기",
  "동요 한 소절을 오페라처럼 부르기",
  "동요 한 소절을 울먹이며 부르기",
  "두 손 모으고 모두에게 용서 구하기",
  "랜덤 한 명의 장점을 세 가지 말하기",
  "로봇 춤 7초 후 ‘임무 실패’ 외치기",
  "로봇처럼 오늘 음식을(를) 10초 동안 발표하기",
  "로봇처럼 자기소개을(를) 10초 동안 발표하기",
  "로봇처럼 자신의 장점을(를) 10초 동안 발표하기",
  "로봇처럼 지금 기분을(를) 10초 동안 발표하기",
  "로봇처럼 집들이 소감을(를) 10초 동안 발표하기",
  "로봇처럼 허위 신고 사건을(를) 10초 동안 발표하기",
  "머리 위로 큰 하트를 만들고 사랑한다고 외치기",
  "모델 워킹 세 걸음 후 과한 포즈 취하기",
  "모두가 정한 별명으로 다음 라운드 동안 불리기",
  "모두에게 ‘오늘 만나서 영광입니다’라고 말하기",
  "물병에게 진지하게 감사 인사를 세 번 하기",
  "물병에게 진지하게 고민 상담하기",
  "물병에게 진지하게 사랑 고백하기",
  "물병에게 진지하게 자기소개하기",
  "물병에게 진지하게 정중하게 사과하기",
  "물병에게 진지하게 한쪽 무릎을 꿇고 프러포즈하기",
  "방바닥에게 오늘 하루 수고했다고 위로하기",
  "생일 축하 노래 한 소절을 랩처럼 부르기",
  "생일 축하 노래 한 소절을 속삭이듯 부르기",
  "생일 축하 노래 한 소절을 아이돌처럼 부르기",
  "생일 축하 노래 한 소절을 엄숙하게 부르기",
  "생일 축하 노래 한 소절을 오페라처럼 부르기",
  "생일 축하 노래 한 소절을 울먹이며 부르기",
  "세 사람에게 과장된 악수와 인사하기",
  "손으로 망원경을 만들고 방 안 수색하기",
  "숟가락에게 진지하게 감사 인사를 세 번 하기",
  "숟가락에게 진지하게 고민 상담하기",
  "숟가락에게 진지하게 사랑 고백하기",
  "숟가락에게 진지하게 자기소개하기",
  "숟가락에게 진지하게 정중하게 사과하기",
  "숟가락에게 진지하게 한쪽 무릎을 꿇고 프러포즈하기",
  "슬로모션으로 자리 한 바퀴 돌기",
  "신입사원처럼 오늘 음식을(를) 10초 동안 발표하기",
  "신입사원처럼 자기소개을(를) 10초 동안 발표하기",
  "신입사원처럼 자신의 장점을(를) 10초 동안 발표하기",
  "신입사원처럼 지금 기분을(를) 10초 동안 발표하기",
  "신입사원처럼 집들이 소감을(를) 10초 동안 발표하기",
  "신입사원처럼 허위 신고 사건을(를) 10초 동안 발표하기",
  "앞으로 세 문장 동안 말하기 전에 반드시 ‘대장님!’를 붙이기",
  "앞으로 세 문장 동안 말하기 전에 반드시 ‘멍!’를 붙이기",
  "앞으로 세 문장 동안 말하기 전에 반드시 ‘반성합니다!’를 붙이기",
  "앞으로 세 문장 동안 말하기 전에 반드시 ‘사랑합니다!’를 붙이기",
  "앞으로 세 문장 동안 말하기 전에 반드시 ‘선생님!’를 붙이기",
  "앞으로 세 문장 동안 말하기 전에 반드시 ‘야옹!’를 붙이기",
  "앞으로 세 문장 동안 말하기 전에 반드시 ‘주인님!’를 붙이기",
  "앞으로 세 문장 동안 말하기 전에 반드시 ‘충성!’를 붙이기",
  "앞으로 세 문장 동안 모든 문장 끝에 ‘내가 왜 그랬을까’를 붙이기",
  "앞으로 세 문장 동안 모든 문장 끝에 ‘라고 생각합니다’를 붙이기",
  "앞으로 세 문장 동안 모든 문장 끝에 ‘반박은 받지 않겠습니다’를 붙이기",
  "앞으로 세 문장 동안 모든 문장 끝에 ‘사랑과 평화’를 붙이기",
  "앞으로 세 문장 동안 모든 문장 끝에 ‘이상입니다’를 붙이기",
  "앞으로 세 문장 동안 모든 문장 끝에 ‘제 잘못입니다’를 붙이기",
  "애창곡 한 소절을 랩처럼 부르기",
  "애창곡 한 소절을 속삭이듯 부르기",
  "애창곡 한 소절을 아이돌처럼 부르기",
  "애창곡 한 소절을 엄숙하게 부르기",
  "애창곡 한 소절을 오페라처럼 부르기",
  "애창곡 한 소절을 울먹이며 부르기",
  "양손 꽃받침하고 귀여운 표정 5초 유지하기",
  "양옆 사람에게 서로 다른 동물 소리로 인사하기",
  "양옆 사람에게 손하트와 칭찬 보내기",
  "엉덩이로 자기 이름을 천천히 쓰기",
  "영화 악당처럼 오늘 음식을(를) 10초 동안 발표하기",
  "영화 악당처럼 자기소개을(를) 10초 동안 발표하기",
  "영화 악당처럼 자신의 장점을(를) 10초 동안 발표하기",
  "영화 악당처럼 지금 기분을(를) 10초 동안 발표하기",
  "영화 악당처럼 집들이 소감을(를) 10초 동안 발표하기",
  "영화 악당처럼 허위 신고 사건을(를) 10초 동안 발표하기",
  "영화 주인공처럼 절규 연기하기",
  "오늘 패션을 홈쇼핑처럼 15초 소개하기",
  "왕처럼 오늘 음식을(를) 10초 동안 발표하기",
  "왕처럼 자기소개을(를) 10초 동안 발표하기",
  "왕처럼 자신의 장점을(를) 10초 동안 발표하기",
  "왕처럼 지금 기분을(를) 10초 동안 발표하기",
  "왕처럼 집들이 소감을(를) 10초 동안 발표하기",
  "왕처럼 허위 신고 사건을(를) 10초 동안 발표하기",
  "외계인처럼 오늘 음식을(를) 10초 동안 발표하기",
  "외계인처럼 자기소개을(를) 10초 동안 발표하기",
  "외계인처럼 자신의 장점을(를) 10초 동안 발표하기",
  "외계인처럼 지금 기분을(를) 10초 동안 발표하기",
  "외계인처럼 집들이 소감을(를) 10초 동안 발표하기",
  "외계인처럼 허위 신고 사건을(를) 10초 동안 발표하기",
  "웃음을 참으며 진지한 반성문 읽기",
  "윙크를 좌우 번갈아 다섯 번 하기",
  "유치원생처럼 오늘 음식을(를) 10초 동안 발표하기",
  "유치원생처럼 자기소개을(를) 10초 동안 발표하기",
  "유치원생처럼 자신의 장점을(를) 10초 동안 발표하기",
  "유치원생처럼 지금 기분을(를) 10초 동안 발표하기",
  "유치원생처럼 집들이 소감을(를) 10초 동안 발표하기",
  "유치원생처럼 허위 신고 사건을(를) 10초 동안 발표하기",
  "음식 하나를 명품처럼 광고하기",
  "응원가 한 소절을 랩처럼 부르기",
  "응원가 한 소절을 속삭이듯 부르기",
  "응원가 한 소절을 아이돌처럼 부르기",
  "응원가 한 소절을 엄숙하게 부르기",
  "응원가 한 소절을 오페라처럼 부르기",
  "응원가 한 소절을 울먹이며 부르기",
  "의자에게 진지하게 감사 인사를 세 번 하기",
  "의자에게 진지하게 고민 상담하기",
  "의자에게 진지하게 사랑 고백하기",
  "의자에게 진지하게 자기소개하기",
  "의자에게 진지하게 정중하게 사과하기",
  "의자에게 진지하게 한쪽 무릎을 꿇고 프러포즈하기",
  "자신을 동물에 비유하고 이유 발표하기",
  "자신의 이름으로 삼행시 완성하기",
  "자신의 흑역사를 영화 제목처럼 공개하기",
  "접시에게 진지하게 감사 인사를 세 번 하기",
  "접시에게 진지하게 고민 상담하기",
  "접시에게 진지하게 사랑 고백하기",
  "접시에게 진지하게 자기소개하기",
  "접시에게 진지하게 정중하게 사과하기",
  "접시에게 진지하게 한쪽 무릎을 꿇고 프러포즈하기",
  "젓가락에게 진지하게 감사 인사를 세 번 하기",
  "젓가락에게 진지하게 고민 상담하기",
  "젓가락에게 진지하게 사랑 고백하기",
  "젓가락에게 진지하게 자기소개하기",
  "젓가락에게 진지하게 정중하게 사과하기",
  "젓가락에게 진지하게 한쪽 무릎을 꿇고 프러포즈하기",
  "제자리에서 패션쇼 턴 두 번 돌기",
  "컵에게 진지하게 감사 인사를 세 번 하기",
  "컵에게 진지하게 고민 상담하기",
  "컵에게 진지하게 사랑 고백하기",
  "컵에게 진지하게 자기소개하기",
  "컵에게 진지하게 정중하게 사과하기",
  "컵에게 진지하게 한쪽 무릎을 꿇고 프러포즈하기",
  "쿠션에게 진지하게 감사 인사를 세 번 하기",
  "쿠션에게 진지하게 고민 상담하기",
  "쿠션에게 진지하게 사랑 고백하기",
  "쿠션에게 진지하게 자기소개하기",
  "쿠션에게 진지하게 정중하게 사과하기",
  "쿠션에게 진지하게 한쪽 무릎을 꿇고 프러포즈하기",
  "탐정처럼 오늘 음식을(를) 10초 동안 발표하기",
  "탐정처럼 자기소개을(를) 10초 동안 발표하기",
  "탐정처럼 자신의 장점을(를) 10초 동안 발표하기",
  "탐정처럼 지금 기분을(를) 10초 동안 발표하기",
  "탐정처럼 집들이 소감을(를) 10초 동안 발표하기",
  "탐정처럼 허위 신고 사건을(를) 10초 동안 발표하기",
  "투명인간인 척 7초 동안 사람들을 피해 다니기",
  "트로트 한 소절을 랩처럼 부르기",
  "트로트 한 소절을 속삭이듯 부르기",
  "트로트 한 소절을 아이돌처럼 부르기",
  "트로트 한 소절을 엄숙하게 부르기",
  "트로트 한 소절을 오페라처럼 부르기",
  "트로트 한 소절을 울먹이며 부르기",
  "플라밍고 자세 5초 유지하기",
  "한 명을 왕으로 모시고 충성 맹세하기",
  "한 명을 인터뷰하며 질문 세 개 하기",
  "허공에 키스 세 번 날리기",
  "허위 신고 사과문을 진지하게 낭독하기",
  "현재 기분을 춤으로 7초 표현하기",
  "홈쇼핑 진행자처럼 오늘 음식을(를) 10초 동안 발표하기",
  "홈쇼핑 진행자처럼 자기소개을(를) 10초 동안 발표하기",
  "홈쇼핑 진행자처럼 자신의 장점을(를) 10초 동안 발표하기",
  "홈쇼핑 진행자처럼 지금 기분을(를) 10초 동안 발표하기",
  "홈쇼핑 진행자처럼 집들이 소감을(를) 10초 동안 발표하기",
  "홈쇼핑 진행자처럼 허위 신고 사건을(를) 10초 동안 발표하기",
  "휴대폰 배터리에게 응원 메시지 보내기",
  "휴대폰 카메라를 보며 아이돌 엔딩 포즈 세 번 하기",
  "휴대폰에게 진지하게 감사 인사를 세 번 하기",
  "휴대폰에게 진지하게 고민 상담하기",
  "휴대폰에게 진지하게 사랑 고백하기",
  "휴대폰에게 진지하게 자기소개하기",
  "휴대폰에게 진지하게 정중하게 사과하기",
  "휴대폰에게 진지하게 한쪽 무릎을 꿇고 프러포즈하기",
  "휴지에게 진지하게 감사 인사를 세 번 하기",
  "휴지에게 진지하게 고민 상담하기",
  "휴지에게 진지하게 사랑 고백하기",
  "휴지에게 진지하게 자기소개하기",
  "휴지에게 진지하게 정중하게 사과하기",
  "휴지에게 진지하게 한쪽 무릎을 꿇고 프러포즈하기"
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
    currentRoundForReports: 0,
    lastSeenEventId: "",
    surpriseTimerId: null,
    courtChatAlias: "",
    courtRenderKey: ""
  };

  const $ = (selector) => document.querySelector(selector);
  const screens = [...document.querySelectorAll(".screen")];

  const missionSecretArea = $("#missionSecretArea");
  const holdMissionRevealButton = $("#holdMissionRevealButton");

  function showMissionSecret() {
    missionSecretArea?.classList.remove("blurred");
  }

  function hideMissionSecret() {
    missionSecretArea?.classList.add("blurred");
  }

  holdMissionRevealButton?.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    showMissionSecret();
  });

  holdMissionRevealButton?.addEventListener("pointerup", hideMissionSecret);
  holdMissionRevealButton?.addEventListener("pointercancel", hideMissionSecret);
  holdMissionRevealButton?.addEventListener("pointerleave", hideMissionSecret);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      hideMissionSecret();
    }
  });

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
      checkAllMissionsCompleted();
      return;
    }

    if (room.status === "court") {
      renderCourt();
      showScreen("courtScreen");
      stopTimer();
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

    const duration = Number($("#roundDurationSelect").value || state.room.duration || 420);
    const missionPool = shuffled(MISSIONS.filter(isPlayableMission));
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
      updates[`players/${playerId}/completedAt`] = null;
      updates[`players/${playerId}/reportedBy`] = null;
      updates[`players/${playerId}/objectionUsed`] = false;
      updates[`players/${playerId}/courtCaught`] = false;
      updates[`players/${playerId}/isSaboteur`] = false;
      updates[`players/${playerId}/sabotageReadyAt`] = 0;
      updates[`players/${playerId}/sabotageEffect`] = null;
      updates[`players/${playerId}/embarrassmentPenalty`] = null;
    });

    const selectedEvent = SURPRISE_EVENTS[
      Math.floor(Math.random() * SURPRISE_EVENTS.length)
    ];
    const triggerAfterSeconds = Math.max(
      25,
      Math.min(duration - 20, Math.floor(duration * (0.35 + Math.random() * 0.25)))
    );

    updates.status = "playing";
    updates.round = nextRound;
    updates.duration = duration;
    updates.startedAt = startedAt;
    updates.result = null;
    updates.court = null;
    updates.courtHistory = null;
    updates.surpriseEvent = {
      id: `${nextRound}-${Date.now()}`,
      type: selectedEvent.type,
      emoji: selectedEvent.emoji,
      title: selectedEvent.title,
      description: selectedEvent.description,
      buttonText: selectedEvent.buttonText,
      duration: selectedEvent.duration,
      triggerAt: startedAt + triggerAfterSeconds * 1000,
      endsAt: startedAt + (triggerAfterSeconds + selectedEvent.duration) * 1000,
      responses: {},
      correctIndex: Math.floor(Math.random() * 6)
    };

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
    if (window.PARTY_UPGRADE?.render) window.PARTY_UPGRADE.render(state);

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

    handleSurpriseEvent(state.room.surpriseEvent || null);
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

  function handleSurpriseEvent(event) {
    if (!event || !event.id) return;

    const now = Date.now();
    const hasResponded = Boolean(event.responses?.[state.playerId]);

    if (
      now >= Number(event.triggerAt || 0) &&
      now <= Number(event.endsAt || 0) &&
      !hasResponded
    ) {
      if (state.lastSeenEventId !== event.id) {
        state.lastSeenEventId = event.id;
        showSurpriseEvent(event);
      }
      updateSurpriseCountdown(event);
      return;
    }

    if (now > Number(event.endsAt || 0)) {
      closeSurpriseEvent();
    }
  }

  function showSurpriseEvent(event) {
    $("#surpriseEmoji").textContent = event.emoji || "⚡";
    $("#surpriseTitle").textContent = event.title || "돌발!";
    $("#surpriseDescription").textContent = event.description || "";
    $("#surpriseActionButton").textContent = event.buttonText || "생존!";
    $("#surpriseActionButton").disabled = false;
    $("#surpriseEventModal").classList.remove("hidden");

    if (navigator.vibrate) {
      navigator.vibrate([220, 100, 220, 100, 300]);
    }
  }

  function updateSurpriseCountdown(event) {
    clearInterval(state.surpriseTimerId);

    const update = () => {
      const remaining = Math.max(
        0,
        Math.ceil((Number(event.endsAt || 0) - Date.now()) / 1000)
      );
      $("#surpriseCountdown").textContent = `${remaining}초`;

      if (remaining <= 0) {
        clearInterval(state.surpriseTimerId);
        state.surpriseTimerId = null;
        closeSurpriseEvent();
      }
    };

    update();
    state.surpriseTimerId = setInterval(update, 250);
  }

  async function respondToSurpriseEvent() {
    const event = state.room?.surpriseEvent;
    if (!event?.id) return;

    $("#surpriseActionButton").disabled = true;
    $("#surpriseActionButton").textContent = "생존 완료 ✓";

    await roomRef(
      `surpriseEvent/responses/${state.playerId}`
    ).set({
      nickname: state.nickname,
      respondedAt: firebase.database.ServerValue.TIMESTAMP
    });

    showToast("돌발 생존 성공!");
    setTimeout(closeSurpriseEvent, 450);
  }

  function closeSurpriseEvent() {
    $("#surpriseEventModal").classList.add("hidden");
    clearInterval(state.surpriseTimerId);
    state.surpriseTimerId = null;
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

    handleSurpriseEvent(state.room.surpriseEvent || null);

    const endAt = Number(state.room.startedAt || 0) + Number(state.room.duration || 420) * 1000;
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
    await playerRef().update({
      completed: true,
      completedAt: firebase.database.ServerValue.TIMESTAMP
    });
    showToast("미션 성공이 접수됐습니다!");
  }

  function openReportScreen() {
    const court = state.room.court;
    if (court && court.phase !== "closed") {
      showToast("이미 재판이 진행 중입니다.");
      return;
    }

    if (state.player?.objectionUsed) {
      showToast("이번 라운드 이의제기권은 이미 사용했습니다.");
      return;
    }

    const players = Object.entries(state.room.players || {})
      .filter(([id]) => id !== state.playerId);

    $("#accusedPlayerSelect").innerHTML = `
      <option value="">수상한 사람을 선택하세요</option>
      ${players.map(([id, player]) => `
        <option value="${id}">${escapeHtml(player.nickname)}</option>
      `).join("")}
    `;

    const guessedMissionInput = $("#guessedMissionInput");
    if (guessedMissionInput) {
      guessedMissionInput.value = "";
    }
    showScreen("reportScreen");
  }

  async function submitObjection() {
    const suspectId = $("#accusedPlayerSelect").value;
    const guessedMission = $("#guessedMissionInput").value.trim();
    const evidenceInput = $("#accusationReasonInput");
    const evidence = evidenceInput ? evidenceInput.value.trim() : "재판 채팅에서 설명";
    const suspect = state.room.players?.[suspectId];

    if (!suspect) {
      showToast("수상한 사람을 선택해 주세요.");
      return;
    }
    if (guessedMission.length < 8) {
      showToast("추측한 지령을 8자 이상 구체적으로 작성해 주세요.");
      return;
    }
    if (state.player?.objectionUsed) {
      showToast("이번 라운드 이의제기권은 이미 사용했습니다.");
      return;
    }

    const elapsed = Math.floor((Date.now() - Number(state.room.startedAt || 0)) / 1000);
    if (elapsed < 30) {
      showToast("라운드 시작 30초 후부터 이의제기할 수 있습니다.");
      return;
    }

    const confirmed = await confirmAction(
      "⚖️ 전원을 멈출까요?",
      `${suspect.nickname}님의 지령을 추리해 공개합니다. 틀리면 민망 벌칙을 받습니다.`
    );
    if (!confirmed) return;

    const remainingSeconds = Math.max(
      0,
      Number(state.room.duration || 420) - elapsed
    );

    await roomRef().update({
      status: "court",
      court: {
        id: `${state.room.round}-${Date.now()}`,
        phase: "discussion",
        accuserId: state.playerId,
        suspectId,
        guessedMission,
        evidence,
        remainingSeconds,
        openedAt: firebase.database.ServerValue.TIMESTAMP,
        messages: {},
        result: null,
        penaltyCompleted: false
      },
      [`players/${state.playerId}/objectionUsed`]: true
    });
  }

  function getAnonymousAlias(playerId, court) {
    if (playerId === court.accuserId) return "익명 제보자";
    if (playerId === court.suspectId) return "익명 용의자";
    const ids = Object.keys(state.room.players || {})
      .filter((id) => id !== court.accuserId && id !== court.suspectId)
      .sort();
    return `익명 참가자 ${ids.indexOf(playerId) + 1}`;
  }

  function renderCourt() {
    const court = state.room.court;
    if (!court) return;

    const players = state.room.players || {};
    const suspect = players[court.suspectId];
    const isAccuser = state.playerId === court.accuserId;
    const isSuspect = state.playerId === court.suspectId;

    $("#courtSuspectName").textContent = suspect?.nickname || "알 수 없음";
    $("#courtGuessText").textContent = court.guessedMission || "";
    if ($("#courtClaimText")) $("#courtClaimText").textContent = court.evidence || "";

    $("#courtChatArea").classList.toggle("hidden", court.phase !== "discussion");
    $("#courtVoteArea").classList.toggle("hidden", court.phase !== "judgment");
    $("#courtRevealArea").classList.toggle("hidden", court.phase !== "reveal");

    if (court.phase === "discussion") {
      $("#courtStepChip").textContent = "2 / 4 · 공개 제보";
      $("#courtMainTitle").textContent = "익명 제보 공개";
      $("#courtGuideText").textContent =
        "제보자의 추측을 읽고, 근거와 해명은 익명 채팅으로 이야기하세요.";
    } else if (court.phase === "judgment") {
      $("#courtStepChip").textContent = "3 / 4 · 본인 판정";
      $("#courtMainTitle").textContent = "지령 대조";
      $("#courtGuideText").textContent =
        "지목당한 사람이 실제 지령과 제보 내용을 직접 비교합니다.";
    } else {
      $("#courtStepChip").textContent = "4 / 4 · 결과";
      $("#courtMainTitle").textContent = "재판 결과";
      $("#courtGuideText").textContent =
        "결과와 벌칙을 확인한 뒤 게임을 재개합니다.";
    }

    $("#courtAccuserNotice").textContent = isAccuser
      ? "당신이 최초 제보자입니다. 결과가 나오기 전까지 신분은 익명입니다."
      : isSuspect
        ? "당신이 지목되었습니다. 실제 지령과 비교해 솔직하게 판정해 주세요."
        : "모든 의견은 재판 중 익명으로 표시됩니다.";

    const messages = Object.values(court.messages || {})
      .sort((a, b) => Number(a.createdAt || 0) - Number(b.createdAt || 0));

    $("#courtChatList").innerHTML = messages.length
      ? messages.map((message) => `
          <div class="court-chat-message ${message.playerId === court.accuserId ? "accuser-message" : ""}">
            <strong>${escapeHtml(message.alias)}</strong>
            <p>${escapeHtml(message.text)}</p>
          </div>
        `).join("")
      : `<div class="court-chat-empty">제보 내용에 대한 의견이나 해명을 익명으로 적어보세요.</div>`;

    $("#openVoteButton").classList.toggle(
      "hidden",
      !state.isHost || court.phase !== "discussion"
    );

    if (court.phase === "judgment") {
      $("#suspectJudgeCard").classList.toggle("hidden", !isSuspect);
      $("#judgeWaitingCard").classList.toggle("hidden", isSuspect);

      if (isSuspect) {
        $("#suspectActualMission").textContent =
          state.player?.mission?.text || "지령을 확인할 수 없습니다.";
        $("#suspectGuessMission").textContent = court.guessedMission || "";
      }
    }

    if (court.phase === "reveal") {
      renderCourtReveal(court);
    }
  }

  async function sendCourtChat() {
    const court = state.room.court;
    const input = $("#courtChatInput");
    const text = input.value.trim();

    if (!court || court.phase !== "discussion" || !text) return;

    await roomRef(`court/messages/${randomId()}`).set({
      playerId: state.playerId,
      alias: getAnonymousAlias(state.playerId, court),
      text: text.slice(0, 200),
      createdAt: firebase.database.ServerValue.TIMESTAMP
    });

    input.value = "";
  }

  async function openCourtVote() {
    if (!state.isHost || state.room.court?.phase !== "discussion") return;
    await roomRef("court/phase").set("judgment");
  }

  async function submitSuspectJudgment(isCorrect) {
    const court = state.room.court;
    if (!court || court.phase !== "judgment") return;
    if (state.playerId !== court.suspectId) {
      showToast("지목당한 사람만 판정할 수 있습니다.");
      return;
    }

    const penalty = isCorrect
      ? null
      : EMBARRASSING_PENALTIES[
          Math.floor(Math.random() * EMBARRASSING_PENALTIES.length)
        ];

    await roomRef().update({
      "court/phase": "reveal",
      "court/result": {
        correct: Boolean(isCorrect),
        accuserId: court.accuserId,
        accuserName: state.room.players?.[court.accuserId]?.nickname || "알 수 없음",
        suspectId: court.suspectId,
        suspectName: state.nickname,
        guessedMission: court.guessedMission,
        evidence: court.evidence,
        actualMission: isCorrect ? (state.player?.mission?.text || "") : "",
        penalty,
        judgedBy: state.playerId,
        judgedAt: firebase.database.ServerValue.TIMESTAMP
      },
      [`players/${court.accuserId}/embarrassmentPenalty`]:
        isCorrect ? null : penalty,
      [`players/${court.suspectId}/courtCaught`]: Boolean(isCorrect),
      [`players/${court.suspectId}/isSaboteur`]: Boolean(isCorrect),
      [`players/${court.suspectId}/sabotageReadyAt`]: isCorrect ? Date.now() + 30000 : 0
    });
  }

  function renderCourtReveal(court) {
    const result = court.result || {};
    const correct = Boolean(result.correct);
    const isAccuser = state.playerId === court.accuserId;

    $("#courtRevealEmoji").textContent = correct ? "🎯" : "🤡";
    $("#courtRevealTitle").textContent =
      correct ? "지령 적발 성공!" : "추리가 빗나갔습니다!";
    $("#courtRevealSummary").textContent = correct
      ? `${result.accuserName}님이 ${result.suspectName}님의 핵심 지령을 알아냈습니다.`
      : `${result.accuserName}님의 신원이 공개되었습니다. 실제 지령은 비공개로 유지됩니다.`;

    $("#courtMissionReveal").classList.toggle("hidden", !correct);
    if (correct) {
      $("#courtMissionReveal").innerHTML = `
        <span>제보자의 추측</span>
        <p>${escapeHtml(result.guessedMission)}</p>
        <span>실제 지령</span>
        <strong>${escapeHtml(result.actualMission)}</strong>
        <span>최초 제보자</span>
        <strong>${escapeHtml(result.accuserName)}</strong>
      `;
    }

    $("#courtPenaltyReveal").classList.toggle("hidden", correct);
    $("#penaltyActionArea").classList.toggle("hidden", correct);

    if (!correct) {
      $("#courtPenaltyReveal").innerHTML = `
        <span>허위 제보자</span>
        <strong>${escapeHtml(result.accuserName)}</strong>
        <span>추측한 지령</span>
        <p>${escapeHtml(result.guessedMission)}</p>
        <span>민망 벌칙</span>
        <strong>${escapeHtml(result.penalty)}</strong>
      `;

      $("#penaltyDoneButton").classList.toggle(
        "hidden",
        !isAccuser || Boolean(court.penaltyCompleted)
      );
      $("#penaltyWaitingText").classList.toggle(
        "hidden",
        isAccuser || Boolean(court.penaltyCompleted)
      );
    }

    $("#hostCourtReview").classList.toggle("hidden", !state.isHost);
    $("#resumeGameButton").classList.toggle(
      "hidden",
      !state.isHost || (!correct && !court.penaltyCompleted)
    );
  }

  async function completeEmbarrassmentPenalty() {
    const court = state.room.court;
    if (!court || court.phase !== "reveal") return;
    if (state.playerId !== court.accuserId) return;

    await roomRef("court/penaltyCompleted").set(true);
    showToast("벌칙 수행 완료! 이제 게임을 이어갑니다.");
  }

  async function overrideCourtResult() {
    if (!state.isHost) return;

    const court = state.room.court;
    if (!court || court.phase !== "reveal") return;

    const nextCorrect = !Boolean(court.result?.correct);
    const penalty = nextCorrect
      ? null
      : EMBARRASSING_PENALTIES[
          Math.floor(Math.random() * EMBARRASSING_PENALTIES.length)
        ];

    const suspect = state.room.players?.[court.suspectId];

    await roomRef().update({
      "court/result/correct": nextCorrect,
      "court/result/actualMission":
        nextCorrect ? (suspect?.mission?.text || "") : "",
      "court/result/penalty": penalty,
      "court/penaltyCompleted": nextCorrect,
      [`players/${court.accuserId}/embarrassmentPenalty`]: penalty,
      [`players/${court.suspectId}/courtCaught`]: nextCorrect
    });
  }

  async function resumeAfterCourt() {
    if (!state.isHost) return;

    const court = state.room.court;
    if (!court || court.phase !== "reveal") return;
    if (!court.result?.correct && !court.penaltyCompleted) {
      showToast("민망 벌칙 수행이 끝나야 게임을 재개할 수 있습니다.");
      return;
    }

    const remainingSeconds = Math.max(1, Number(court.remainingSeconds || 1));
    const duration = Number(state.room.duration || 420);
    const startedAt = Date.now() - (duration - remainingSeconds) * 1000;

    await roomRef().update({
      status: "playing",
      startedAt,
      [`courtHistory/${court.id}`]: court,
      court: null
    });
  }


  let autoFinishingAllCompleted = false;

  async function checkAllMissionsCompleted() {
    if (!state.isHost || autoFinishingAllCompleted) return;
    if (!state.room || state.room.status !== "playing") return;

    const activePlayers = Object.entries(state.room.players || {})
      .filter(([, player]) => !player.isSaboteur && player.mission);

    if (activePlayers.length === 0) return;
    if (!activePlayers.every(([, player]) => Boolean(player.completed))) return;

    autoFinishingAllCompleted = true;
    try {
      await finishRound("all-completed");
    } finally {
      autoFinishingAllCompleted = false;
    }
  }


  async function finishRound(finishReason = "manual") {
    if (!state.isHost || state.room.status !== "playing") return;

    const players = state.room.players || {};
    const entries = Object.entries(players);
    const penalties = [];
    const details = [];
    const missionResults = [];
    const reportRelations = [];
    const penaltyReasons = [];
    const embarrassmentResults = [];

    entries.forEach(([playerId, player]) => {
      const reports = player.reportedBy ? Object.keys(player.reportedBy) : [];
      const reportCount = reports.length;

      if (player.embarrassmentPenalty) {
        embarrassmentResults.push({
          playerId,
          nickname: player.nickname,
          penalty: player.embarrassmentPenalty
        });
      }

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
          const reason = `${player.nickname}의 완전범죄 성공 대상`;
          details.push(`${player.nickname} 완전범죄 성공 → ${players[targetId].nickname} 한 모금`);
          penaltyReasons.push({
            playerId: targetId,
            nickname: players[targetId].nickname,
            reason,
            count: 1,
            type: "mission-target"
          });
        }
      } else if (player.completed && reportCount > 0) {
        penalties.push(playerId);
        details.push(`${player.nickname} 미션 성공했지만 들킴 → 본인 한 모금`);
        penaltyReasons.push({
          playerId,
          nickname: player.nickname,
          reason: "미션은 성공했지만 신고로 발각됨",
          count: 1,
          type: "caught"
        });
      } else if (!player.completed && reportCount > 0) {
        reports.forEach((reporterId) => {
          if (players[reporterId]) {
            penalties.push(reporterId);
            details.push(`${players[reporterId].nickname} 오신고 → 신고자 한 모금`);
            penaltyReasons.push({
              playerId: reporterId,
              nickname: players[reporterId].nickname,
              reason: `${player.nickname}을 잘못 신고함`,
              count: 1,
              type: "false-report"
            });
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

    if (finishReason === "all-completed") {
      const completedActivePlayers = entries
        .filter(([, player]) => !player.isSaboteur && player.completed)
        .sort(([, a], [, b]) => Number(b.completedAt || 0) - Number(a.completedAt || 0));

      const lastCompletedEntry = completedActivePlayers[0];
      if (lastCompletedEntry) {
        const [lastPlayerId, lastPlayer] = lastCompletedEntry;
        penalties.push(lastPlayerId);
        details.push(`🏁 전원 미션 완료 → 마지막 완료자 ${lastPlayer.nickname} 한 모금`);
        penaltyReasons.push({
          playerId: lastPlayerId,
          nickname: lastPlayer.nickname,
          reason: "모든 생존자 중 마지막으로 미션을 완료함",
          count: 1,
          type: "last-completer"
        });
      }
    }

    const surpriseEvent = state.room.surpriseEvent || null;
    let surpriseResult = null;

    if (surpriseEvent?.id) {
      const responses = surpriseEvent.responses || {};
      const responseEntries = Object.entries(responses);

      let loserId = null;
      let loserReason = "";

      const missingPlayers = entries.filter(([playerId]) => !responses[playerId]);

      if (missingPlayers.length > 0) {
        const selectedMissing = missingPlayers[
          Math.floor(Math.random() * missingPlayers.length)
        ];
        loserId = selectedMissing[0];
        loserReason = "돌발 생존전에 응답하지 못함";
      } else if (responseEntries.length > 0) {
        responseEntries.sort(
          ([, a], [, b]) => Number(b.respondedAt || 0) - Number(a.respondedAt || 0)
        );
        loserId = responseEntries[0][0];
        loserReason = "돌발 생존전에서 가장 늦게 반응함";
      }

      if (loserId && players[loserId]) {
        penalties.push(loserId);
        details.push(
          `⚡ 돌발 벌칙 → ${players[loserId].nickname} 추가 한 모금`
        );
        penaltyReasons.push({
          playerId: loserId,
          nickname: players[loserId].nickname,
          reason: loserReason,
          count: 1,
          type: "surprise"
        });

        surpriseResult = {
          title: surpriseEvent.title,
          loserId,
          loserName: players[loserId].nickname,
          reason: loserReason,
          responses: responseEntries.map(([playerId, response]) => ({
            playerId,
            nickname: players[playerId]?.nickname || response.nickname || "알 수 없음",
            respondedAt: Number(response.respondedAt || 0)
          }))
        };
      }
    }

    if (penalties.length === 0) {
      const randomPlayerId = entries[Math.floor(Math.random() * entries.length)][0];
      penalties.push(randomPlayerId);
      details.push(`아무도 걸리지 않아 랜덤 벌칙 → ${players[randomPlayerId].nickname} 한 모금`);
      penaltyReasons.push({
        playerId: randomPlayerId,
        nickname: players[randomPlayerId].nickname,
        reason: "아무도 걸리지 않아 랜덤 지목",
        count: 1,
        type: "random"
      });
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
      penaltyReasons,
      surpriseResult,
      embarrassmentResults,
      courtHistory: state.room.courtHistory || {},
      finishReason,
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

    renderPenaltyBoard(
      result.penaltyNames || [],
      result.penaltyReasons || [],
      result.surpriseResult || null
    );
    renderDifficultyReveal(result.missionResults || []);
    renderReportStatistics(result.reportRelations || []);
    renderEmbarrassmentResults(result.embarrassmentResults || []);

    $("#hostResultControls").classList.toggle("hidden", !state.isHost);
    $("#guestResultWaiting").classList.toggle("hidden", state.isHost);
  }

  function renderPenaltyBoard(penaltyNames, penaltyReasons, surpriseResult) {
    if (!penaltyNames.length) {
      $("#penaltyBoard").innerHTML = `
        <div class="no-penalty-card">이번 라운드는 벌칙자가 없습니다 🎉</div>
      `;
      return;
    }

    $("#penaltyBoard").innerHTML = penaltyNames.map((penalty, index) => {
      const reasons = penaltyReasons
        .filter((item) => item.playerId === penalty.playerId)
        .map((item) => item.reason);

      return `
        <article class="penalty-person-card">
          <div class="penalty-rank">${index === 0 ? "🍺" : "🥃"}</div>
          <div class="penalty-person-main">
            <p>이번 라운드 벌칙자</p>
            <h2>${escapeHtml(penalty.nickname)}</h2>
            <strong>${Number(penalty.count || 1)}모금 마시기!</strong>
          </div>
          <ul class="penalty-reason-list">
            ${reasons.map((reason) => `<li>${escapeHtml(reason)}</li>`).join("")}
          </ul>
        </article>
      `;
    }).join("");

    if (surpriseResult) {
      $("#surpriseResultCard").classList.remove("hidden");
      $("#surpriseResultTitle").textContent = surpriseResult.title || "돌발 결과";
      $("#surpriseLoserText").textContent =
        `${surpriseResult.loserName} 추가 한 모금!`;
      $("#surpriseReasonText").textContent = surpriseResult.reason || "";
    } else {
      $("#surpriseResultCard").classList.add("hidden");
    }
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

  function renderEmbarrassmentResults(items) {
    $("#embarrassmentResultSection").classList.toggle("hidden", items.length === 0);
    $("#embarrassmentResultList").innerHTML = items.map((item) => `
      <article class="embarrassment-result-card">
        <strong>🤡 ${escapeHtml(item.nickname)}</strong>
        <p>${escapeHtml(item.penalty)}</p>
      </article>
    `).join("");
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
    state.lastSeenEventId = "";
    clearInterval(state.surpriseTimerId);
    state.surpriseTimerId = null;
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

  window.PARTY_GAME_API = { state, roomRef, playerRef, showToast, escapeHtml };

  $("#createRoomButton").addEventListener("click", createRoom);
  $("#joinRoomButton").addEventListener("click", joinRoom);
  $("#startGameButton").addEventListener("click", startRound);
  $("#completeMissionButton").addEventListener("click", completeMission);
  $("#reportPlayerButton").addEventListener("click", openReportScreen);
  $("#cancelReportButton").addEventListener("click", () => showScreen("missionScreen"));
  $("#submitObjectionButton").addEventListener("click", submitObjection);
  $("#courtChatSendButton").addEventListener("click", sendCourtChat);
  $("#courtChatInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") sendCourtChat();
  });
  $("#openVoteButton").addEventListener("click", openCourtVote);
  $("#suspectCorrectButton").addEventListener("click", () => submitSuspectJudgment(true));
  $("#suspectWrongButton").addEventListener("click", () => submitSuspectJudgment(false));
  $("#penaltyDoneButton").addEventListener("click", completeEmbarrassmentPenalty);
  $("#overrideCourtButton").addEventListener("click", overrideCourtResult);
  $("#resumeGameButton").addEventListener("click", resumeAfterCourt);
  $("#finishRoundButton").addEventListener("click", finishRound);
  $("#nextRoundButton").addEventListener("click", nextRound);
  $("#endGameButton").addEventListener("click", endGame);
  $("#restartSessionButton").addEventListener("click", restartSession);
  $("#confirmCancelButton").addEventListener("click", () => resolveConfirm(false));
  $("#confirmOkButton").addEventListener("click", () => resolveConfirm(true));
  $("#anonymousReportCloseButton").addEventListener("click", closeAnonymousReportAlert);
  $("#surpriseActionButton").addEventListener("click", respondToSurpriseEvent);

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
