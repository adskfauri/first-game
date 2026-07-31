# 게임 2 - 완전범죄

집들이에서 여러 명이 각자 휴대폰으로 접속해 플레이하는 비밀 미션 게임입니다.

## 포함 기능

- 방 생성 및 6자리 방 코드
- 닉네임 참가
- 최대 10명
- 방장 시작/종료
- 참가자별 랜덤 비밀 미션
- 특정 참가자 타깃 지정
- 미션 성공 신고
- 수상한 참가자 신고
- 자동 벌칙 계산
- 누적 벌칙 랭킹
- 모바일 반응형 화면

## 1. Firebase 설정

1. Firebase Console에서 프로젝트 생성
2. `Realtime Database` 생성
3. 웹 앱 추가
4. Firebase 설정값을 `firebase-config.js`에 복사
5. Realtime Database 규칙을 아래처럼 임시 설정

```json
{
  "rules": {
    "rooms": {
      "$roomCode": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

집들이가 끝난 뒤에는 DB 규칙을 닫거나 프로젝트를 삭제하는 것을 권장합니다.

## 2. 기존 저장소에 넣기

현재 `first-game` 폴더 아래에 압축을 푼 `game-2` 폴더 전체를 넣습니다.

```text
first-game/
├─ index.html
├─ style.css
├─ game.js
└─ game-2/
   ├─ index.html
   ├─ style.css
   ├─ app.js
   ├─ firebase-config.js
   └─ README.md
```

## 3. Git 반영

```bash
git add game-2
git commit -m "Add complete crime party game"
git push origin main
```

GitHub Pages 주소:

```text
https://adskfauri.github.io/first-game/game-2/
```

## 테스트 방법

- PC 브라우저 1개: 방 생성
- 시크릿 창 또는 휴대폰: 방 코드로 참가
- 최소 3명 필요
- 테스트할 때는 브라우저 창 3개를 사용해도 됨

## 주의

Firebase 설정 전에는 멀티플레이가 작동하지 않습니다.
