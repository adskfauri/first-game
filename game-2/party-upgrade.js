(() => {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const cards = ["hideMission","shuffleMission","fakeMission","fakeTarget","runButton"];
  const FAKE_MISSIONS = [
    "{target}에게 가장 좋아하는 여행지를 물어보세요.",
    "{target}에게 최근 재미있게 본 영화를 물어보세요.",
    "{target}에게 건배를 먼저 제안하게 만드세요.",
    "{target}에게 오늘 가장 맛있었던 음식을 물어보세요.",
    "{target}에게 어릴 때 꿈이 무엇이었는지 물어보세요."
  ];

  function createFakeMission(targetName) {
    const template =
      FAKE_MISSIONS[Math.floor(Math.random() * FAKE_MISSIONS.length)];

    return template.replace("{target}", targetName);
  }
  let lastEffectId="", lastMiniId="", tapCount=0, targetTimer=null, targetValue=0;

  function api(){ return window.PARTY_GAME_API; }
  function playerEntries(state){ return Object.entries(state.room?.players || {}); }

  async function useSabotage(){
    const {state, roomRef, showToast}=api();
    const me=state.player;
    if(!me?.isSaboteur) return;
    if(Date.now()<Number(me.sabotageReadyAt||0)){ showToast("방해 카드가 아직 충전 중입니다."); return; }
    const targetId=$("#sabotageTargetSelect")?.value;
    if(!targetId) return;
    const type = cards[Math.floor(Math.random() * cards.length)];
    const now = Date.now();

    const targetPlayer = state.room?.players?.[targetId];

    const fakeMissionText =
      type === "fakeMission"
        ? createFakeMission(targetPlayer?.nickname || "누군가")
        : "";

    await roomRef().update({
    [`players/${targetId}/sabotageEffect`]: {
      id: `${state.playerId}-${now}`,
      type,
      fromName: state.nickname,
      fakeMissionText,
      startedAt: now,
      endsAt: now + 15000
    },
    [`players/${state.playerId}/sabotageReadyAt`]: now + 30000
  });
    showToast("방해 카드 사용 완료! 👻");
  }

  function render(state){
    const panel=$("#saboteurPanel"); if(!panel) return;
    const sab=Boolean(state.player?.isSaboteur);
    panel.classList.toggle("hidden",!sab);
    if(sab){
      $("#completeMissionButton")?.classList.add("hidden");
      if($("#missionStatusBadge")) $("#missionStatusBadge").textContent="👻 방해자";
      if($("#missionText")) $("#missionText").textContent="당신의 지령은 발각되었습니다";
      if($("#missionHintText")) $("#missionHintText").textContent="다른 사람을 방해하고 돌발게임에 참여하세요.";
      const targets=playerEntries(state).filter(([id,p])=>id!==state.playerId&&!p.isSaboteur);
      if($("#sabotageTargetSelect")) $("#sabotageTargetSelect").innerHTML=targets.map(([id,p])=>`<option value="${id}">${p.nickname}</option>`).join("");
      const wait=Math.max(0,Math.ceil((Number(state.player.sabotageReadyAt||0)-Date.now())/1000));
      if($("#useSabotageButton")) $("#useSabotageButton").disabled=wait>0||!targets.length;
      if($("#sabotageCooldownText")) $("#sabotageCooldownText").textContent=wait?`다음 방해까지 ${wait}초`:"방해 카드 준비 완료";
    }else $("#completeMissionButton")?.classList.remove("hidden");
    applyEffect(state);
    setupMini(state);
  }

  function applyEffect(state) {
    const e = state.player?.sabotageEffect;
    const body = document.body;
    const banner = $("#sabotageEffectBanner");

    body.classList.remove(
      "party-mission-hidden",
      "party-mission-shuffled",
      "party-run-button",
      "party-fake-mission"
    );

    if (
      !e ||
      Date.now() > Number(e.endsAt || 0) ||
      state.player?.isSaboteur
    ) {
      banner?.classList.add("hidden");
      return;
    }

    const labels = {
      hideMission: "15초 동안 지령 가리기",
      shuffleMission: "지령 문장 뒤섞기",
      fakeMission: "가짜 지령 표시",
      fakeTarget: "가짜 대상 표시",
      runButton: "완료 버튼 도망가기"
    };

    if (banner) {
      if (e.type === "fakeMission") {
        banner.classList.add("hidden");
      } else {
        banner.textContent = `👻 ${e.fromName}의 방해: ${labels[e.type]}`;
        banner.classList.remove("hidden");
      }
    }

    if (e.type === "hideMission") {
      body.classList.add("party-mission-hidden");
    }

    if (e.type === "shuffleMission") {
      body.classList.add("party-mission-shuffled");

      if (e.id !== lastEffectId && $("#missionText")) {
        $("#missionText").textContent =
          String(state.player.mission?.text || "")
            .split(" ")
            .sort(() => Math.random() - 0.5)
            .join(" / ");
      }
    }

    if (e.type === "runButton") {
      body.classList.add("party-run-button");
    }

    if (e.type === "fakeMission" && $("#missionText")) {
      $("#missionText").textContent =
        e.fakeMissionText ||
        "누군가에게 최근 재미있게 본 영화를 물어보세요.";
    }

    if (e.type === "fakeTarget" && $("#missionText")) {
      $("#missionText").textContent =
        "누군가에게 원래 지령을 수행하세요.";
    }

    lastEffectId = e.id;
  }

  function setupMini(state){
    const ev=state.room?.surpriseEvent;
    if(!ev?.id||Date.now()<Number(ev.triggerAt||0)||Date.now()>Number(ev.endsAt||0)) return;
    if(lastMiniId===ev.id) return;
    lastMiniId=ev.id; tapCount=0;
    const body=$("#surpriseGameBody"), btn=$("#surpriseActionButton"), status=$("#surpriseMiniStatus");
    if(!body||!btn) return;
    body.innerHTML=""; status.textContent=""; btn.classList.remove("hidden"); btn.disabled=false;
    if(ev.type==="tap"){
      body.innerHTML='<div id="tapScore" class="tap-score">0회</div>'; btn.textContent="다다다다!";
      btn.onclick=async()=>{tapCount++;$("#tapScore").textContent=`${tapCount}회`;await api().roomRef(`surpriseEvent/responses/${state.playerId}`).set({nickname:state.nickname,count:tapCount,respondedAt:firebase.database.ServerValue.TIMESTAMP});};
    }else if(ev.type==="target"){
      body.innerHTML='<div id="targetNumber" class="target-number">0</div>';btn.textContent="멈춰!";
      clearInterval(targetTimer);targetTimer=setInterval(()=>{targetValue=(targetValue+7)%101;$("#targetNumber").textContent=targetValue;},60);
      btn.onclick=async()=>{clearInterval(targetTimer);btn.disabled=true;status.textContent=`${targetValue}에 멈춤!`;await api().roomRef(`surpriseEvent/responses/${state.playerId}`).set({nickname:state.nickname,value:targetValue,respondedAt:firebase.database.ServerValue.TIMESTAMP});};
    }else if(ev.type==="fake"){
      btn.classList.add("hidden");body.innerHTML='<div class="mini-grid">'+Array.from({length:6},(_,i)=>`<button class="button ghost" data-i="${i}">${["여기!","진짜?","눌러!","정답","버튼","나야"][i]}</button>`).join("")+"</div>";
      body.querySelectorAll("button").forEach(b=>b.onclick=async()=>{const ok=Number(b.dataset.i)===Number(ev.correctIndex);if(!ok){b.disabled=true;status.textContent="가짜! 다시 찾아!";return;}body.querySelectorAll("button").forEach(x=>x.disabled=true);status.textContent="정답 발견!";await api().roomRef(`surpriseEvent/responses/${state.playerId}`).set({nickname:state.nickname,correct:true,respondedAt:firebase.database.ServerValue.TIMESTAMP});});
    }else{
      btn.textContent=ev.type==="bomb"?"💣 폭탄 넘기기!":"지금 누르기!";
    }
  }

  function start(){
    $("#useSabotageButton")?.addEventListener("click",useSabotage);
    setInterval(()=>{const a=api();if(a?.state?.room) render(a.state);},500);
  }
  window.PARTY_UPGRADE={render};
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();
