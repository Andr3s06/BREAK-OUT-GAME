const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const wallWidth = 560;
const wallHeight = 600;
const userStart = [230, 10];
const ballStart = [270, 40];

let xDirection = -2;
let yDirection = 2;
let score = 0;

let userCurrentPosition = userStart;
let ballCurrentPosition = ballStart;

ballSpeed = setInterval(moveBall, 12);

//create block
class Brick {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

//all my blocks
const blocks = [
  new Brick(10, 270),
  new Brick(120, 270),
  new Brick(230, 270),
  new Brick(340, 270),
  new Brick(450, 270),
  new Brick(10, 240),
  new Brick(120, 240),
  new Brick(230, 240),
  new Brick(340, 240),
  new Brick(450, 240),
  new Brick(10, 210),
  new Brick(120, 210),
  new Brick(230, 210),
  new Brick(340, 210),
  new Brick(450, 210),
  new Brick(10, 300),
  new Brick(120, 300),
  new Brick(230, 300),
  new Brick(340, 300),
  new Brick(450, 300),
  new Brick(10, 330),
  new Brick(120, 330),
  new Brick(230, 330),
  new Brick(340, 330),
  new Brick(450, 330),
  new Brick(10, 360),
  new Brick(120, 360),
  new Brick(230, 360),
  new Brick(340, 360),
  new Brick(450, 360),
  new Brick(10, 390),
  new Brick(120, 390),
  new Brick(230, 390),
  new Brick(340, 390),
  new Brick(450, 390),
  new Brick(10, 420),
  new Brick(120, 420),
  new Brick(230, 420),
  new Brick(340, 420),
  new Brick(450, 420),
  new Brick(10, 450),
  new Brick(120, 450),
  new Brick(230, 450),
  new Brick(340, 450),
  new Brick(450, 450),
];

// draw all my blocks
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);
  }
}
addBlocks();

//USER IMG
var img = new Image();
img.src = "userTwo.svg";
grid.appendChild(img);
img.classList.add("userTwo");
drawUser();

//draw the user
function drawUser() {
  img.style.left = userCurrentPosition[0] + "px";
  img.style.bottom = userCurrentPosition[1] + "px";
}

//draw the ball
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}

//move user
function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (userCurrentPosition[0] > 0) {
        userCurrentPosition[0] -= 40;
        drawUser();
      }
      break;
    case "ArrowRight":
      if (userCurrentPosition[0] < wallWidth - blockWidth) {
        userCurrentPosition[0] += 40;
        drawUser();
      }
      break;
  }
}

document.addEventListener("keydown", moveUser);

//add ball
const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);

//move ball
function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}

//check for collisions
function checkForCollisions() {
  //check for block collisions
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] < blocks[i].bottomRight[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      changeDirection();
      score++;
      scoreDisplay.innerHTML = score;

      //check for win
      if (blocks.length === 0) {
        clearInterval(ballSpeed);
        scoreDisplay.innerHTML = "YOU WIN!";
        document.removeEventListener("keydown", moveUser);
      }
    }
  }

  //check for wall collisions
  if (
    ballCurrentPosition[0] >= wallWidth - ballDiameter ||
    ballCurrentPosition[1] >= wallHeight - ballDiameter ||
    ballCurrentPosition[0] <= 0
  ) {
    changeDirection();
  }

  //check for user collisions
  if (
    ballCurrentPosition[0] > userCurrentPosition[0] &&
    ballCurrentPosition[0] < userCurrentPosition[0] + blockWidth &&
    ballCurrentPosition[1] > userCurrentPosition[1] &&
    ballCurrentPosition[1] < userCurrentPosition[1] + blockHeight
  ) {
    changeDirection();
  }

  //   check for game over
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(ballSpeed);
    scoreDisplay.innerHTML = "YOU LOSE!";
    document.removeEventListener("keydown", moveUser);
  }
}

function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
}

