const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const playerImage = new Image();
playerImage.src = "https://i.imgur.com/7PlGvla.png"; // Pharaoh Tut sprite

let player = {
  x: 50,
  y: 300,
  width: 80,
  height: 100,
  speed: 5
};

let obstacles = [
  { x: 800, y: 320, width: 40, height: 80 }
];

let score = 0;

function drawPlayer() {
  ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
}

function drawObstacles() {
  ctx.fillStyle = "red";
  obstacles.forEach(obs => {
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
  });
}

function moveObstacles() {
  obstacles.forEach(obs => {
    obs.x -= 6;
    if (obs.x + obs.width < 0) {
      obs.x = 800 + Math.random() * 300;
      score++;
    }
  });
}

function checkCollision() {
  for (let obs of obstacles) {
    if (
      player.x < obs.x + obs.width &&
      player.x + player.width > obs.x &&
      player.y < obs.y + obs.height &&
      player.y + player.height > obs.y
    ) {
      alert("Game Over! Score: " + score);
      document.location.reload();
    }
  }
}

function drawScore() {
  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 600, 50);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawObstacles();
  moveObstacles();
  drawScore();
  checkCollision();
  requestAnimationFrame(update);
}

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowUp") player.y -= 50;
  if (e.key === "ArrowDown") player.y += 50;
});

playerImage.onload = update;
