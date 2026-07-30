const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const restartButton = document.getElementById("restartButton");
const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");

const keys = { left: false, right: false, up: false, down: false };

const touchControl = {
    active: false,
    pointerId: null,
    targetX: 0,
    targetY: 0
};

const player = {
    x: 270,
    y: 650,
    width: 58,
    height: 76,
    speed: 7,
    baseSpeed: 7,
    shield: 0,
    boostUntil: 0,
    invincibleUntil: 0,
    tilt: 0
};

const state = {
    obstacles: [],
    items: [],
    particles: [],
    stars: [],
    score: 0,
    survived: 0,
    gameOver: false,
    victory: false,
    victoryStartedAt: 0,
    startedAt: 0,
    lastTime: 0,
    lastObstacleAt: 0,
    lastItemAt: 0,
    shake: 0,
    flash: 0,
    animationFrameId: null,
    message: "",
    messageUntil: 0,
    bestScore: Number(localStorage.getItem("officeEscapeBest") || 0)
};

const obstacleTypes = [
    { type: "bug", label: "BUG", emoji: "🐞", color: "#ef4444", minW: 52, maxW: 74, minSpeed: 3.1, maxSpeed: 4.4, damage: 1 },
    { type: "meeting", label: "긴급회의", emoji: "📢", color: "#f59e0b", minW: 72, maxW: 96, minSpeed: 2.6, maxSpeed: 3.7, sway: true, damage: 1 },
    { type: "server", label: "서버장애", emoji: "🔥", color: "#dc2626", minW: 66, maxW: 86, minSpeed: 3.5, maxSpeed: 5.1, damage: 1 },
    { type: "message", label: "잠깐 볼까요?", emoji: "💬", color: "#8b5cf6", minW: 90, maxW: 116, minSpeed: 2.7, maxSpeed: 3.6, homing: true, damage: 1 }
];

const itemTypes = [
    { type: "coffee", emoji: "☕", label: "커피 부스트", color: "#38bdf8" },
    { type: "shield", emoji: "🛡️", label: "방패 획득", color: "#22c55e" },
    { type: "bomb", emoji: "💣", label: "긴급 배포!", color: "#facc15" }
];

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function roundedRect(x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + width, y, x + width, y + height, r);
    ctx.arcTo(x + width, y + height, x, y + height, r);
    ctx.arcTo(x, y + height, x, y, r);
    ctx.arcTo(x, y, x + width, y, r);
    ctx.closePath();
}

function resetGame() {
    cancelAnimationFrame(state.animationFrameId);

    player.x = canvas.width / 2 - player.width / 2;
    player.y = canvas.height - player.height - 28;

    touchControl.active = false;
    touchControl.pointerId = null;
    touchControl.targetX = player.x + player.width / 2;
    touchControl.targetY = player.y + player.height / 2;
    player.speed = player.baseSpeed;
    player.shield = 0;
    player.boostUntil = 0;
    player.invincibleUntil = 0;
    player.tilt = 0;

    state.obstacles = [];
    state.items = [];
    state.particles = [];
    state.score = 0;
    state.survived = 0;
    state.gameOver = false;
    state.victory = false;
    state.victoryStartedAt = 0;
    state.startedAt = performance.now();
    state.lastTime = state.startedAt;
    state.lastObstacleAt = state.startedAt;
    state.lastItemAt = state.startedAt;
    state.shake = 0;
    state.flash = 0;
    state.message = "칼퇴까지 살아남으세요!";
    state.messageUntil = state.startedAt + 1600;

    createStars();
    state.animationFrameId = requestAnimationFrame(gameLoop);
}

function createStars() {
    state.stars = Array.from({ length: 34 }, () => ({
        x: rand(0, canvas.width),
        y: rand(0, 250),
        size: rand(0.8, 2.2),
        alpha: rand(0.25, 0.9)
    }));
}

function createObstacle(now) {
    const base = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
    const width = rand(base.minW, base.maxW);
    const height = base.type === "message" ? 54 : rand(50, 74);
    const difficulty = 1 + state.survived / 45;

    state.obstacles.push({
        ...base,
        x: rand(18, canvas.width - width - 18),
        y: -height - 20,
        width,
        height,
        speed: rand(base.minSpeed, base.maxSpeed) * difficulty,
        angle: rand(-0.08, 0.08),
        phase: rand(0, Math.PI * 2),
        bornAt: now
    });
}

function createItem(now) {
    const type = itemTypes[Math.floor(Math.random() * itemTypes.length)];

    state.items.push({
        ...type,
        x: rand(36, canvas.width - 74),
        y: -60,
        width: 48,
        height: 48,
        speed: rand(2.2, 3.1),
        pulse: rand(0, Math.PI * 2),
        bornAt: now
    });
}

function isColliding(a, b, padding = 7) {
    return (
        a.x + padding < b.x + b.width - padding &&
        a.x + a.width - padding > b.x + padding &&
        a.y + padding < b.y + b.height - padding &&
        a.y + a.height - padding > b.y + padding
    );
}

function spawnParticles(x, y, color, count = 18) {
    for (let i = 0; i < count; i++) {
        state.particles.push({
            x,
            y,
            vx: rand(-3.8, 3.8),
            vy: rand(-4.8, 1.5),
            size: rand(2, 6),
            life: rand(24, 46),
            maxLife: 46,
            color
        });
    }
}

function showMessage(text, duration = 1200) {
    state.message = text;
    state.messageUntil = performance.now() + duration;
}

function updatePlayer(now) {
    player.speed = now < player.boostUntil ? 11 : player.baseSpeed;

    let directionX = 0;
    let directionY = 0;

    if (keys.left) directionX -= 1;
    if (keys.right) directionX += 1;
    if (keys.up) directionY -= 1;
    if (keys.down) directionY += 1;

    if (touchControl.active) {
        const desiredX = touchControl.targetX - player.width / 2;
        const desiredY = touchControl.targetY - player.height / 2;

        player.x += (desiredX - player.x) * 0.28;
        player.y += (desiredY - player.y) * 0.28;

        directionX = Math.sign(desiredX - player.x);
    } else {
        if (directionX !== 0 && directionY !== 0) {
            directionX *= 0.7071;
            directionY *= 0.7071;
        }

        player.x += directionX * player.speed;
        player.y += directionY * player.speed;
    }

    player.x = clamp(player.x, 16, canvas.width - player.width - 16);
    player.y = clamp(player.y, 165, canvas.height - player.height - 18);
    player.tilt += (directionX * 0.08 - player.tilt) * 0.18;
}

function hitObstacle(obstacle, now) {
    if (now < player.invincibleUntil) return;

    spawnParticles(player.x + player.width / 2, player.y + player.height / 2, obstacle.color, 26);
    state.shake = 14;
    state.flash = 1;

    if (player.shield > 0) {
        player.shield--;
        player.invincibleUntil = now + 1300;
        showMessage("🛡️ 방패가 야근을 막았습니다!", 1500);
        return;
    }

    state.gameOver = true;
    state.bestScore = Math.max(state.bestScore, Math.floor(state.score));
    localStorage.setItem("officeEscapeBest", String(state.bestScore));
}

function collectItem(item, now) {
    spawnParticles(item.x + item.width / 2, item.y + item.height / 2, item.color, 22);

    if (item.type === "coffee") {
        player.boostUntil = now + 6000;
        showMessage("☕ 카페인 폭주! 6초간 이동속도 증가", 1600);
    } else if (item.type === "shield") {
        player.shield = Math.min(2, player.shield + 1);
        showMessage("🛡️ 방패 획득! 장애물 1회 방어", 1600);
    } else {
        for (const obstacle of state.obstacles) {
            spawnParticles(obstacle.x + obstacle.width / 2, obstacle.y + obstacle.height / 2, obstacle.color, 12);
        }
        state.score += state.obstacles.length * 3;
        state.obstacles = [];
        state.shake = 8;
        showMessage("💣 긴급 배포 성공! 장애물 전부 제거", 1600);
    }
}


function startVictory(now) {
    if (state.victory || state.gameOver) return;

    state.victory = true;
    state.victoryStartedAt = now;
    state.obstacles = [];
    state.items = [];
    state.message = "";
    state.messageUntil = 0;
    player.invincibleUntil = Number.POSITIVE_INFINITY;

    const confettiColors = [
        "#facc15", "#22c55e", "#38bdf8",
        "#f472b6", "#a78bfa", "#fb7185"
    ];

    for (let i = 0; i < 180; i++) {
        state.particles.push({
            x: rand(0, canvas.width),
            y: rand(-260, -20),
            vx: rand(-2.6, 2.6),
            vy: rand(2.2, 7.2),
            size: rand(4, 10),
            life: rand(110, 220),
            maxLife: 220,
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            confetti: true,
            rotation: rand(0, Math.PI * 2),
            rotationSpeed: rand(-0.18, 0.18)
        });
    }

    state.shake = 10;
    state.flash = 0;
    state.bestScore = Math.max(state.bestScore, Math.floor(state.score));
    localStorage.setItem("officeEscapeBest", String(state.bestScore));
}

function updateObjects(delta, now) {
    for (let i = state.obstacles.length - 1; i >= 0; i--) {
        const obstacle = state.obstacles[i];

        if (obstacle.sway) {
            obstacle.x += Math.sin(now / 260 + obstacle.phase) * 1.45;
        }

        if (obstacle.homing) {
            const target = player.x + player.width / 2 - obstacle.width / 2;
            obstacle.x += clamp((target - obstacle.x) * 0.008, -1.2, 1.2);
        }

        obstacle.y += obstacle.speed * delta * 0.06;

        if (isColliding(player, obstacle)) {
            hitObstacle(obstacle, now);
            state.obstacles.splice(i, 1);
            continue;
        }

        if (obstacle.y > canvas.height + 40) {
            state.obstacles.splice(i, 1);
            state.score += 1.4;
        }
    }

    for (let i = state.items.length - 1; i >= 0; i--) {
        const item = state.items[i];
        item.y += item.speed * delta * 0.06;

        if (isColliding(player, item, 2)) {
            collectItem(item, now);
            state.items.splice(i, 1);
            continue;
        }

        if (item.y > canvas.height + 50) {
            state.items.splice(i, 1);
        }
    }

    for (let i = state.particles.length - 1; i >= 0; i--) {
        const particle = state.particles[i];
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.confetti) {
            particle.vy += 0.025;
            particle.rotation += particle.rotationSpeed;
            if (particle.y > canvas.height + 20) {
                particle.y = rand(-100, -20);
            }
        } else {
            particle.vy += 0.1;
        }

        particle.life--;

        if (particle.life <= 0) {
            state.particles.splice(i, 1);
        }
    }
}

function drawBackground(now) {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#091426");
    gradient.addColorStop(0.55, "#13213c");
    gradient.addColorStop(1, "#090e18");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const star of state.stars) {
        ctx.globalAlpha = star.alpha + Math.sin(now / 700 + star.x) * 0.14;
        ctx.fillStyle = "#dbeafe";
        ctx.fillRect(star.x, star.y, star.size, star.size);
    }
    ctx.globalAlpha = 1;

    ctx.fillStyle = "#16233d";
    ctx.fillRect(0, 230, canvas.width, 530);

    ctx.fillStyle = "#0b1220";
    for (let x = 18; x < canvas.width; x += 86) {
        const height = 90 + ((x * 17) % 150);
        ctx.fillRect(x, 230 - height, 58, height);
        ctx.fillStyle = "#facc15";
        for (let y = 150 - height; y < 220; y += 22) {
            if ((x + y) % 3 !== 0) ctx.fillRect(x + 10, y + height, 7, 9);
        }
        ctx.fillStyle = "#0b1220";
    }

    ctx.fillStyle = "#27364f";
    ctx.fillRect(0, 520, canvas.width, 240);

    ctx.fillStyle = "#334155";
    for (let y = 548; y < canvas.height; y += 58) {
        ctx.fillRect(0, y, canvas.width, 4);
    }

    for (let x = 80; x < canvas.width; x += 145) {
        ctx.fillStyle = "#182235";
        ctx.fillRect(x, 525, 82, 44);
        ctx.fillStyle = "#60a5fa";
        ctx.fillRect(x + 13, 534, 56, 24);
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(x + 38, 569, 8, 22);
    }

    const glow = ctx.createRadialGradient(canvas.width / 2, 630, 20, canvas.width / 2, 630, 250);
    glow.addColorStop(0, "rgba(59, 130, 246, 0.11)");
    glow.addColorStop(1, "rgba(59, 130, 246, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 420, canvas.width, 340);
}

function drawPlayer(now) {
    const centerX = player.x + player.width / 2;
    const centerY = player.y + player.height / 2;
    const boosted = now < player.boostUntil;
    const invincible = now < player.invincibleUntil;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(player.tilt);
    ctx.translate(-centerX, -centerY);

    ctx.globalAlpha = invincible && Math.floor(now / 100) % 2 === 0 ? 0.45 : 1;

    ctx.fillStyle = "rgba(0, 0, 0, 0.32)";
    ctx.beginPath();
    ctx.ellipse(centerX, player.y + player.height + 4, 27, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    if (boosted) {
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 4;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 46 + Math.sin(now / 80) * 4, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
    }

    ctx.fillStyle = "#2563eb";
    roundedRect(player.x + 10, player.y + 31, 38, 39, 11);
    ctx.fill();

    ctx.fillStyle = "#f3c89a";
    ctx.beginPath();
    ctx.arc(centerX, player.y + 21, 18, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#1f2937";
    ctx.beginPath();
    ctx.arc(centerX, player.y + 15, 19, Math.PI, Math.PI * 2);
    ctx.lineTo(centerX + 18, player.y + 19);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#111827";
    ctx.beginPath();
    ctx.arc(centerX - 6, player.y + 22, 2, 0, Math.PI * 2);
    ctx.arc(centerX + 6, player.y + 22, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, player.y + 28, 6, 0.2, Math.PI - 0.2);
    ctx.stroke();

    ctx.fillStyle = "#94a3b8";
    roundedRect(player.x + 8, player.y + 50, 42, 23, 4);
    ctx.fill();
    ctx.fillStyle = "#e2e8f0";
    ctx.fillRect(player.x + 26, player.y + 57, 7, 5);

    if (player.shield > 0) {
        ctx.strokeStyle = "#4ade80";
        ctx.lineWidth = 4;
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 43, 0, Math.PI * 2);
        ctx.stroke();
    }

    ctx.restore();
    ctx.globalAlpha = 1;
}

function drawObstacle(obstacle, now) {
    ctx.save();
    ctx.translate(obstacle.x + obstacle.width / 2, obstacle.y + obstacle.height / 2);
    ctx.rotate(obstacle.angle + Math.sin(now / 230 + obstacle.phase) * 0.025);
    ctx.translate(-obstacle.width / 2, -obstacle.height / 2);

    ctx.fillStyle = "rgba(0, 0, 0, 0.28)";
    roundedRect(4, 7, obstacle.width, obstacle.height, 14);
    ctx.fill();

    ctx.fillStyle = obstacle.color;
    roundedRect(0, 0, obstacle.width, obstacle.height, 14);
    ctx.fill();

    ctx.fillStyle = "rgba(255,255,255,0.17)";
    roundedRect(6, 6, obstacle.width - 12, 10, 5);
    ctx.fill();

    ctx.font = `${Math.floor(obstacle.height * 0.4)}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(obstacle.emoji, obstacle.width / 2, obstacle.height * 0.43);

    ctx.font = `700 ${Math.max(10, Math.floor(obstacle.width / 8))}px Arial`;
    ctx.fillText(obstacle.label, obstacle.width / 2, obstacle.height * 0.78);

    ctx.restore();
}

function drawItem(item, now) {
    const pulse = 1 + Math.sin(now / 150 + item.pulse) * 0.08;
    const cx = item.x + item.width / 2;
    const cy = item.y + item.height / 2;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(pulse, pulse);
    ctx.translate(-cx, -cy);

    ctx.shadowColor = item.color;
    ctx.shadowBlur = 18;
    ctx.fillStyle = "rgba(15, 23, 42, 0.92)";
    ctx.beginPath();
    ctx.arc(cx, cy, 25, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = item.color;
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.font = "28px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(item.emoji, cx, cy + 1);
    ctx.restore();
}

function drawParticles() {
    for (const p of state.particles) {
        ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
        ctx.fillStyle = p.color;

        if (p.confetti) {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
            ctx.restore();
        } else {
            ctx.fillRect(p.x, p.y, p.size, p.size);
        }
    }
    ctx.globalAlpha = 1;
}

function drawHud(now) {
    ctx.fillStyle = "rgba(2, 6, 23, 0.66)";
    roundedRect(16, 16, 568, 78, 18);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "left";
    ctx.font = "800 24px Arial";
    ctx.fillText(`점수 ${Math.floor(state.score)}`, 34, 48);

    ctx.font = "14px Arial";
    ctx.fillStyle = "#94a3b8";
    ctx.fillText(`생존 ${state.survived.toFixed(1)}초`, 34, 74);

    ctx.textAlign = "right";
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "700 15px Arial";
    ctx.fillText(`최고 ${state.bestScore}`, 564, 47);

    const status = [];
    if (player.shield > 0) status.push(`🛡️ ${player.shield}`);
    if (now < player.boostUntil) status.push(`☕ ${Math.ceil((player.boostUntil - now) / 1000)}초`);
    ctx.fillStyle = "#7dd3fc";
    ctx.font = "700 14px Arial";
    ctx.fillText(status.join("  ") || "상태 정상", 564, 73);

    if (now < state.messageUntil) {
        ctx.textAlign = "center";
        ctx.font = "800 18px Arial";
        ctx.fillStyle = "#ffffff";
        roundedRect(92, 108, 416, 44, 14);
        ctx.fillStyle = "rgba(15, 23, 42, 0.84)";
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.fillText(state.message, canvas.width / 2, 136);
    }
}


function drawVictory(now) {
    const elapsed = now - state.victoryStartedAt;
    const titleScale = 1 + Math.sin(now / 120) * 0.035;

    ctx.fillStyle = "rgba(2, 6, 23, 0.38)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2, 264);
    ctx.scale(titleScale, titleScale);

    ctx.textAlign = "center";
    ctx.shadowColor = "#facc15";
    ctx.shadowBlur = 24;
    ctx.fillStyle = "#fef08a";
    ctx.font = "900 58px Arial";
    ctx.fillText("퇴근!", 0, 0);

    ctx.shadowBlur = 0;
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 32px Arial";
    ctx.fillText("🎉 칼퇴 성공 🎉", 0, 55);
    ctx.restore();

    ctx.textAlign = "center";
    ctx.fillStyle = "#dbeafe";
    ctx.font = "700 20px Arial";
    ctx.fillText("100점을 달성하고 버그 지옥에서 탈출했습니다!", canvas.width / 2, 366);

    ctx.fillStyle = "rgba(15, 23, 42, 0.88)";
    roundedRect(108, 399, 384, 92, 18);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "800 23px Arial";
    ctx.fillText(`최종 점수 ${Math.floor(state.score)}점`, canvas.width / 2, 438);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "16px Arial";
    ctx.fillText(`생존 시간 ${state.survived.toFixed(1)}초`, canvas.width / 2, 469);

    // Exit door
    ctx.fillStyle = "#1e293b";
    roundedRect(487, 546, 92, 170, 8);
    ctx.fill();
    ctx.strokeStyle = "#facc15";
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.arc(559, 633, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#fef3c7";
    ctx.font = "800 18px Arial";
    ctx.fillText("EXIT", 533, 578);

    // Character walks toward the exit during first 2.2 seconds
    const progress = clamp(elapsed / 2200, 0, 1);
    const walkX = 170 + progress * 330;
    const bob = Math.sin(elapsed / 85) * 4;

    ctx.save();
    ctx.translate(walkX, 646 + bob);
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.beginPath();
    ctx.ellipse(0, 44, 25, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#2563eb";
    roundedRect(-18, 0, 36, 42, 10);
    ctx.fill();

    ctx.fillStyle = "#f3c89a";
    ctx.beginPath();
    ctx.arc(0, -12, 17, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#1f2937";
    ctx.beginPath();
    ctx.arc(0, -17, 18, Math.PI, Math.PI * 2);
    ctx.fill();

    // Briefcase
    ctx.fillStyle = "#92400e";
    roundedRect(20, 14, 26, 22, 4);
    ctx.fill();
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 3;
    ctx.strokeRect(27, 8, 12, 8);

    ctx.restore();

    if (elapsed > 2400) {
        ctx.fillStyle = "#bbf7d0";
        ctx.font = "800 18px Arial";
        ctx.fillText("오늘 업무 종료! 이제 진짜 집에 갑니다 🏠", canvas.width / 2, 526);
    }
}

function drawGameOver() {
    ctx.fillStyle = "rgba(2, 6, 23, 0.78)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 45px Arial";
    ctx.fillText("오늘도 퇴근 실패", canvas.width / 2, 322);

    ctx.fillStyle = "#fca5a5";
    ctx.font = "700 20px Arial";
    ctx.fillText("팀장님이 잠깐 보자고 합니다.", canvas.width / 2, 365);

    ctx.fillStyle = "#e2e8f0";
    ctx.font = "700 22px Arial";
    ctx.fillText(`최종 점수 ${Math.floor(state.score)}`, canvas.width / 2, 421);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "16px Arial";
    ctx.fillText("아래 버튼을 눌러 다시 출근하세요.", canvas.width / 2, 460);
}

function gameLoop(now) {
    const delta = Math.min(34, now - state.lastTime || 16.67);
    state.lastTime = now;

    if (!state.gameOver && !state.victory) {
        state.survived = (now - state.startedAt) / 1000;
        state.score += delta * 0.008;

        if (state.score >= 100) {
            state.score = Math.max(100, state.score);
            startVictory(now);
        }

        const obstacleInterval = Math.max(320, 880 - state.survived * 9);
        if (now - state.lastObstacleAt > obstacleInterval) {
            createObstacle(now);
            state.lastObstacleAt = now;
        }

        if (now - state.lastItemAt > 6800) {
            createItem(now);
            state.lastItemAt = now;
        }

        if (!state.victory) {
            updatePlayer(now);
            updateObjects(delta, now);

            if (state.score >= 100) {
                state.score = Math.max(100, state.score);
                startVictory(now);
            }
        }
    }

    if (state.victory) {
        updateObjects(delta, now);
    }

    const shakeX = state.shake > 0 ? rand(-state.shake, state.shake) : 0;
    const shakeY = state.shake > 0 ? rand(-state.shake, state.shake) : 0;
    state.shake *= 0.86;

    ctx.save();
    ctx.translate(shakeX, shakeY);

    drawBackground(now);
    for (const item of state.items) drawItem(item, now);
    for (const obstacle of state.obstacles) drawObstacle(obstacle, now);

    if (!state.victory) {
        drawPlayer(now);
        drawHud(now);
    }

    drawParticles();

    if (state.gameOver) drawGameOver();
    if (state.victory) drawVictory(now);

    if (state.flash > 0.01) {
        ctx.fillStyle = `rgba(239, 68, 68, ${state.flash * 0.24})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        state.flash *= 0.82;
    }

    ctx.restore();

    state.animationFrameId = requestAnimationFrame(gameLoop);
}

function setKey(key, pressed) {
    const normalizedKey = key.toLowerCase();

    if (key === "ArrowLeft" || normalizedKey === "a") keys.left = pressed;
    if (key === "ArrowRight" || normalizedKey === "d") keys.right = pressed;
    if (key === "ArrowUp" || normalizedKey === "w") keys.up = pressed;
    if (key === "ArrowDown" || normalizedKey === "s") keys.down = pressed;
}

document.addEventListener("keydown", (event) => {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "a", "A", "d", "D", "w", "W", "s", "S"].includes(event.key)) {
        event.preventDefault();
        setKey(event.key, true);
    }
});

document.addEventListener("keyup", (event) => {
    setKey(event.key, false);
});

function bindHoldButton(button, direction) {
    const press = (event) => {
        event.preventDefault();
        keys[direction] = true;
    };

    const release = (event) => {
        event.preventDefault();
        keys[direction] = false;
    };

    button.addEventListener("pointerdown", press);
    button.addEventListener("pointerup", release);
    button.addEventListener("pointercancel", release);
    button.addEventListener("pointerleave", release);
}

function getCanvasPointerPosition(event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    };
}

function updateTouchTarget(event) {
    const position = getCanvasPointerPosition(event);

    touchControl.targetX = clamp(
        position.x,
        player.width / 2 + 16,
        canvas.width - player.width / 2 - 16
    );

    touchControl.targetY = clamp(
        position.y,
        165 + player.height / 2,
        canvas.height - player.height / 2 - 18
    );
}

canvas.addEventListener("pointerdown", (event) => {
    if (state.gameOver || state.victory) return;

    event.preventDefault();

    touchControl.active = true;
    touchControl.pointerId = event.pointerId;
    updateTouchTarget(event);

    canvas.setPointerCapture(event.pointerId);
});

canvas.addEventListener("pointermove", (event) => {
    if (!touchControl.active || event.pointerId !== touchControl.pointerId) return;

    event.preventDefault();
    updateTouchTarget(event);
});

function releaseCanvasPointer(event) {
    if (event.pointerId !== touchControl.pointerId) return;

    touchControl.active = false;
    touchControl.pointerId = null;

    if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
    }
}

canvas.addEventListener("pointerup", releaseCanvasPointer);
canvas.addEventListener("pointercancel", releaseCanvasPointer);
canvas.addEventListener("lostpointercapture", () => {
    touchControl.active = false;
    touchControl.pointerId = null;
});

bindHoldButton(leftButton, "left");
bindHoldButton(rightButton, "right");

restartButton.addEventListener("click", resetGame);

resetGame();
