const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const restartButton = document.getElementById("restartButton");

const keys = {
    left: false,
    right: false
};

const player = {
    width: 60,
    height: 30,
    x: 0,
    y: 0,
    speed: 7
};

const images = {
    player: new Image(),
    bug: new Image(),
    background: new Image(),
    coffee: new Image()
};

images.player.src = "./assets/developer.png";
images.bug.src = "./assets/bug.png";
images.background.src = "./assets/office-bg.png";
images.coffee.src = "./assets/coffee.png";

let obstacles = [];
let score = 0;
let gameOver = false;
let lastObstacleCreatedAt = 0;
let animationFrameId = null;

function initializeGame() {
    player.x = canvas.width / 2 - player.width / 2;
    player.y = canvas.height - player.height - 30;

    obstacles = [];
    score = 0;
    gameOver = false;
    lastObstacleCreatedAt = 0;

    cancelAnimationFrame(animationFrameId);
    gameLoop(0);
}

function createObstacle() {
    const width = 50;
    const height = 30;

    const obstacle = {
        width,
        height,
        x: Math.random() * (canvas.width - width),
        y: -height,
        speed: 3 + Math.random() * 2
    };

    obstacles.push(obstacle);
}

function updatePlayer() {
    if (keys.left) {
        player.x -= player.speed;
    }

    if (keys.right) {
        player.x += player.speed;
    }

    if (player.x < 0) {
        player.x = 0;
    }

    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }
}

function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obstacle = obstacles[i];

        obstacle.y += obstacle.speed;

        if (isColliding(player, obstacle)) {
            gameOver = true;
        }

        if (obstacle.y > canvas.height) {
            obstacles.splice(i, 1);
            score++;
        }
    }
}

function isColliding(first, second) {
    return (
        first.x < second.x + second.width &&
        first.x + first.width > second.x &&
        first.y < second.y + second.height &&
        first.y + first.height > second.y
    );
}

function drawPlayer() {
    context.drawImage(
        images.player,
        player.x,
        player.y,
        player.width,
        player.height
    );
}

function drawBackground() {
    context.drawImage(
        images.background,
        0,
        0,
        canvas.width,
        canvas.height
    );
}

function drawBackground() {
    context.fillStyle = "#111827";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer() {
    context.fillStyle = "#3b82f6";
    context.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );

    context.fillStyle = "#ffffff";
    context.font = "14px Arial";
    context.textAlign = "center";
    context.fillText(
        "개발자",
        player.x + player.width / 2,
        player.y + 20
    );
}

function drawObstacles() {
    context.fillStyle = "#ef4444";

    for (const obstacle of obstacles) {
        context.fillRect(
            obstacle.x,
            obstacle.y,
            obstacle.width,
            obstacle.height
        );

        context.fillStyle = "#ffffff";
        context.font = "14px Arial";
        context.textAlign = "center";

        context.fillText(
            "버그",
            obstacle.x + obstacle.width / 2,
            obstacle.y + 20
        );

        context.fillStyle = "#ef4444";
    }
}

function drawScore() {
    context.fillStyle = "#ffffff";
    context.font = "20px Arial";
    context.textAlign = "left";
    context.fillText(`점수: ${score}`, 20, 35);
}

function drawGameOver() {
    context.fillStyle = "rgba(0, 0, 0, 0.7)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "#ffffff";
    context.font = "36px Arial";
    context.textAlign = "center";
    context.fillText(
        "게임 오버",
        canvas.width / 2,
        canvas.height / 2
    );

    context.font = "22px Arial";
    context.fillText(
        `최종 점수: ${score}`,
        canvas.width / 2,
        canvas.height / 2 + 50
    );
}

function gameLoop(timestamp) {
    drawBackground();

    if (!gameOver) {
        updatePlayer();

        if (timestamp - lastObstacleCreatedAt > 800) {
            createObstacle();
            lastObstacleCreatedAt = timestamp;
        }

        updateObstacles();

        drawPlayer();
        drawObstacles();
        drawScore();

        animationFrameId = requestAnimationFrame(gameLoop);
        return;
    }

    drawPlayer();
    drawObstacles();
    drawScore();
    drawGameOver();
}

function drawPlayer() {
    const centerX = player.x + player.width / 2;

    // 몸 그림자
    context.fillStyle = "rgba(0, 0, 0, 0.25)";
    context.beginPath();
    context.ellipse(
        centerX,
        player.y + player.height + 8,
        28,
        7,
        0,
        0,
        Math.PI * 2
    );
    context.fill();

    // 몸
    context.fillStyle = "#2563eb";
    context.fillRect(player.x + 10, player.y + 24, 40, 30);

    // 얼굴
    context.fillStyle = "#f5cfa0";
    context.beginPath();
    context.arc(centerX, player.y + 18, 17, 0, Math.PI * 2);
    context.fill();

    // 머리카락
    context.fillStyle = "#252525";
    context.beginPath();
    context.arc(centerX, player.y + 13, 18, Math.PI, Math.PI * 2);
    context.fill();

    // 눈
    context.fillStyle = "#252525";
    context.beginPath();
    context.arc(centerX - 6, player.y + 19, 2, 0, Math.PI * 2);
    context.arc(centerX + 6, player.y + 19, 2, 0, Math.PI * 2);
    context.fill();

    // 노트북
    context.fillStyle = "#94a3b8";
    context.fillRect(player.x + 15, player.y + 38, 30, 17);
}

function drawBugObstacle(obstacle) {
    context.save();

    // 그림자
    context.fillStyle = "rgba(0, 0, 0, 0.25)";
    context.fillRect(
        obstacle.x + 4,
        obstacle.y + 5,
        obstacle.width,
        obstacle.height
    );

    // 메시지 박스
    context.fillStyle = "#ef4444";
    context.beginPath();
    context.roundRect(
        obstacle.x,
        obstacle.y,
        obstacle.width,
        obstacle.height,
        10
    );
    context.fill();

    // 말풍선 꼬리
    context.beginPath();
    context.moveTo(obstacle.x + 12, obstacle.y + obstacle.height);
    context.lineTo(obstacle.x + 20, obstacle.y + obstacle.height + 9);
    context.lineTo(obstacle.x + 26, obstacle.y + obstacle.height);
    context.fill();

    context.fillStyle = "#ffffff";
    context.font = "bold 13px Arial";
    context.textAlign = "center";
    context.fillText(
        "BUG!",
        obstacle.x + obstacle.width / 2,
        obstacle.y + 21
    );

    context.restore();
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        keys.left = true;
    }

    if (event.key === "ArrowRight") {
        keys.right = true;
    }
});

document.addEventListener("keyup", function (event) {
    if (event.key === "ArrowLeft") {
        keys.left = false;
    }

    if (event.key === "ArrowRight") {
        keys.right = false;
    }
});

restartButton.addEventListener("click", function () {
    initializeGame();
});

initializeGame();