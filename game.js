// Set up canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800; // Set canvas width
canvas.height = 600; // Set canvas height

// Game variables
let player = {
    x: canvas.width / 2,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    speed: 5,
    dx: 0,
    dy: 0,
    color: "blue",
    bullets: []
};

let enemies = [];
let score = 0;
let gameOver = false;

// Event listeners for player movement
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
    if (e.key === "ArrowRight" || e.key === "d") {
        player.dx = player.speed;
    } else if (e.key === "ArrowLeft" || e.key === "a") {
        player.dx = -player.speed;
    } else if (e.key === "ArrowUp" || e.key === "w") {
        player.dy = -player.speed;
    } else if (e.key === "ArrowDown" || e.key === "s") {
        player.dy = player.speed;
    } else if (e.key === " ") {
        shootBullet();
    }
}

function keyUpHandler(e) {
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "ArrowLeft" || e.key === "a") {
        player.dx = 0;
    }
    if (e.key === "ArrowUp" || e.key === "w" || e.key === "ArrowDown" || e.key === "s") {
        player.dy = 0;
    }
}

// Bullet object
function shootBullet() {
    const bullet = {
        x: player.x + player.width / 2 - 5,
        y: player.y,
        width: 10,
        height: 20,
        speed: 7,
        color: "red"
    };
    player.bullets.push(bullet);
}

// Create enemies
function createEnemy() {
    const enemy = {
        x: Math.random() * (canvas.width - 50),
        y: -50,
        width: 50,
        height: 50,
        speed: 2,
        color: "green"
    };
    enemies.push(enemy);
}

// Move player
function movePlayer() {
    player.x += player.dx;
    player.y += player.dy;

    // Prevent player from going out of bounds
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

// Move bullets
function moveBullets() {
    player.bullets.forEach((bullet, index) => {
        bullet.y -= bullet.speed;
        if (bullet.y < 0) {
            player.bullets.splice(index, 1); // Remove bullets that go off-screen
        }
    });
}

// Move enemies
function moveEnemies() {
    enemies.forEach((enemy, index) => {
        enemy.y += enemy.speed;
        if (enemy.y > canvas.height) {
            enemies.splice(index, 1); // Remove enemy if it goes off the screen
        }
    });
}

// Detect collisions between bullets and enemies
function detectCollisions() {
    player.bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ) {
                // Collision detected, remove both bullet and enemy
                player.bullets.splice(bulletIndex, 1);
                enemies.splice(enemyIndex, 1);
                score += 10;
            }
        });
    });
}

// Draw everything on the canvas
function draw() {
    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
        return;
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw bullets
    player.bullets.forEach(bullet => {
        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });

    // Draw enemies
    enemies.forEach(enemy => {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });

    // Draw score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);

    // Move game objects
    movePlayer();
    moveBullets();
    moveEnemies();
    detectCollisions();
}

// Spawn enemies periodically
setInterval(() => {
    if (!gameOver) {
        createEnemy();
    }
}, 1000); // New enemy every second

// Game loop
function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
