(() => {
  "use strict";

  const MISSIONS = [
    { text: "{target}에게 휴지를 건네세요.", hint: "상대가 직접 받으면 성공" },
    { text: "{target}이 물을 한 모금 마시게 만드세요.", hint: "직접 권하거나 자연스럽게 유도하기" },
    { text: "{target}에게 오늘 몇 시에 왔는지 물어보세요.", hint: "정확히 대답까지 들어야 성공" },
    { text: "{target}의 이름을 대화 중 두 번 부르세요.", hint: "연속으로 부르면 너무 티 날 수 있음" },
    { text: "{target}과 자연스럽게 건배하세요.", hint: "단체 건배 말고 둘이 잔을 부딪혀야 성공" },
    { text: "{target}에게 사진을 찍어달라고 부탁하세요.", hint: "실제로 사진을 찍어야 성공" },
    { text: "{target}이 휴대폰 화면을 확인하게 만드세요.", hint: "알림이 왔다고 속여도 됨" },
    { text: "{target}에게 음식을 하나 추천받으세요.", hint: "추천한 음식 이름까지 들어야 성공" },
    { text: "{target}에게 요즘 가장 사고 싶은 것을 물어보세요.", hint: "자연스러운 대화 속에서 시도" },
    { text: "{target}이 웃게 만드세요.", hint: "억지로 간지럽히기 금지" },
    { text: "{target}에게 자리에서 한 번 일어나게 만드세요.", hint: "물건을 부탁하거나 자리를 바꿔도 됨" },
    { text: "{target}에게 '진짜?'라는 말을 듣게 만드세요.", hint: "정확히 그 표현이 나와야 성공" },
    { text: "{target}에게 음식이나 술을 한 번 받으세요.", hint: "상대가 직접 건네야 성공" },
    { text: "{target}과 하이파이브하세요.", hint: "손바닥이 실제로 닿아야 성공" },
    { text: "{target}에게 내일 일정이 있는지 물어보세요.", hint: "대답까지 들어야 성공" },
    { text: "{target}이 다른 사람 이름을 부르게 만드세요.", hint: "누구의 이름이든 상관없음" },
    { text: "{target}에게 결혼 또는 연애 이야기를 꺼내게 만드세요.", hint: "직접 먼저 주제를 말하면 실패" },
    { text: "{target}이 음식 사진을 찍게 만드세요.", hint: "카메라만 켜는 것은 인정하지 않음" },
    { text: "{target}과 가위바위보를 하세요.", hint: "이유는 자연스럽게 만들어야 함" },
    { text: "{target}에게 '왜?'라는 말을 듣게 만드세요.", hint: "정확히 왜라는 반응을 끌어내기" },
    { text: "{target}에게 집들이 선물 이야기를 꺼내게 만드세요.", hint: "직접 선물부터 언급하면 실패" },
    { text: "{target}이 고개를 끄덕이게 만드세요.", hint: "질문을 이용하면 쉬울 수도 있음" },
    { text: "{target}에게 손바닥을 보여 달라고 하세요.", hint: "손금을 본다고 해도 됨" },
    { text: "{target}이 특정 음식을 한입 먹게 만드세요.", hint: "어떤 음식이든 가능" }
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
    confirmResolve: null
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
        targetName: target.nickname
      };
      updates[`players/${playerId}/completed`] = false;
      updates[`players/${playerId}/reportedBy`] = null;
    });

    updates.status = "playing";
    updates.round = nextRound;
    updates.duration = duration;
    updates.startedAt = startedAt;
    updates.result = null;

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

    await roomRef(`players/${targetPlayerId}/reportedBy/${state.playerId}`).set({
      nickname: state.nickname,
      createdAt: firebase.database.ServerValue.TIMESTAMP
    });

    showToast(`${target.nickname}님을 신고했습니다.`);
    showScreen("missionScreen");
  }

  async function finishRound() {
    if (!state.isHost || state.room.status !== "playing") return;

    const players = state.room.players || {};
    const entries = Object.entries(players);
    const penalties = [];
    const details = [];

    entries.forEach(([playerId, player]) => {
      const reports = player.reportedBy ? Object.keys(player.reportedBy) : [];
      const reportCount = reports.length;

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

    $("#hostResultControls").classList.toggle("hidden", !state.isHost);
    $("#guestResultWaiting").classList.toggle("hidden", state.isHost);
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
