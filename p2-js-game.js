const canvas = document.getElementById("canvasOne");
//Intro
const intro = document.getElementById("introduction-container");
const mainContainer = document.getElementById("main-container");
const sideButtons = document.getElementById("side-buttons-container");
const labelsContainer = document.getElementById("labels-container");
const itemContainer = document.getElementById("item-container");
const headerContent = document.getElementById("header-content");
//labels
const playerName = document.getElementById("lbl-player-name");
const scoreVal = document.getElementById("lbl-score-value");
const lifeVal = document.getElementById("lbl-life-value");
const wordVal = document.getElementById("lbl-word-name");
const input = document.getElementById("name");
//buttons
const popUp = document.getElementById("popUp-container");
const quitContainer = document.getElementById("quit-container");
const restartContainer = document.getElementById("restart-container");
const gameOverContainer = document.getElementById("gameOver-container");
const lblGameOverScore = document.getElementById("lbl-gameOver-scoreValue");
const winnerContainer = document.getElementById("winner-container");
const ctx = canvas.getContext("2d");

//global
let isRunning = false;
let score = 0;
let goal = 5;
lifeVal.textContent = goal;

canvas.width = window.innerWidth;
canvas.height = innerHeight;

const pointX = canvas.width / 2 - 50;
const pointY = canvas.height - 100;

let minutesInGame = 1;
let total;
let interval;

function updateTimer() {
  let min = Math.floor(total / 60);
  let sec = total % 60;
  document.getElementById("timer").innerHTML = `${min < 10 ? "0" : ""}${min}:${
    sec < 10 ? "0" : ""
  }${sec}`;
  total--;
  if (total < 0) {
    clearInterval(interval);
    gameOver();
  } else if (score == goal) {
    clearInterval(interval);
    winner();
  }
}

function startGameTimer() {
  total = minutesInGame * 60;
  interval = setInterval(updateTimer, 1000);
}

function restartGameTimer() {
  clearInterval(interval);
  startGameTimer();
}

function playGame() {
  startGameTimer();
  openingSound.pause();
  btnplaySound.play();
  gameSound.play();

  intro.style.display = "none";

  labelsContainer.style.display = "flex";
  canvas.style.display = "block";
  sideButtons.style.display = "block";

  let inputVal = input.value;
  playerName.textContent = inputVal;

  isRunning = true;
  animate();
}

function quit() {
  popUp.style.display = "flex";
  restartContainer.style.display = "none";
  gameOverContainer.style.display = "none";
  quitContainer.style.display = "block";
  isRunning = false;
  clickSoundMini.play();
}

function quitYes() {
  clickSoundMini.play();
  popUp.style.display = "none";
  sideButtons.style.display = "none";
  canvas.style.display = "none";
  labelsContainer.style.display = "none";
  isRunning = false;
  location.reload();
}

function quitNo() {
  clickSoundMini.play();
  popUp.style.display = "none";
  isRunning = true;
  animate();
}

function restart() {
  clickSoundMini.play();
  canvas.style.display = "block";
  main.style.display = "none";
  itemContainer.style.display = "none";
  labelsContainer.style.display = "flex";
  popUp.style.display = "flex";
  quitContainer.style.display = "none";
  gameOverContainer.style.display = "none";
  winnerContainer.style.display = "none";
  restartContainer.style.display = "block";
  isRunning = false;
}

function restartYes() {
  clickSoundMini.play();
  popUp.style.display = "none";
  sideButtons.style.display = "block";
  restartGameTimer();
  textArray();
  // blocksArray();

  score = 0;
  scoreVal.textContent = score;

  isRunning = true;
  animate();
}

function restartNo() {
  clickSoundMini.play();
  popUp.style.display = "none";

  isRunning = true;
  animate();
}

function gameOver() {
  clickSoundMini.play();
  canvas.style.display = "block";
  main.style.display = "none";
  itemContainer.style.display = "none";
  labelsContainer.style.display = "flex";
  popUp.style.display = "flex";
  quitContainer.style.display = "none";
  restartContainer.style.display = "none";
  winnerContainer.style.display = "none";
  gameOverContainer.style.display = "block";
  sideButtons.style.display = "none";
  isRunning = false;
  lblGameOverScore.textContent = score;
  errorSound.play();
}

function gameOverYes() {
  clickSoundMini.play();
}

function gameOverNo() {
  clickSoundMini.play();
  popUp.style.display = "none";

  isRunning = true;
  animate();
}

function winner() {
  clickSoundMini.play();
  winnerSound.play();
  gameSound.pause();
  canvas.style.display = "block";
  main.style.display = "none";
  itemContainer.style.display = "none";
  labelsContainer.style.display = "flex";
  popUp.style.display = "flex";
  quitContainer.style.display = "none";
  restartContainer.style.display = "none";
  gameOverContainer.style.display = "none";
  winnerContainer.style.display = "block";
  sideButtons.style.display = "none";
  isRunning = false;
}

function speakerMuteGame() {
  const speakerOff = document.getElementById("btn-speakerOff");
  const speakerOn = document.getElementById("btn-speakerOn");
  speakerOff.style.display = "block";
  speakerOn.style.display = "none";
  gameSound.pause();
}

function speakerOnGame() {
  const speakerOff = document.getElementById("btn-speakerOff");
  const speakerOn = document.getElementById("btn-speakerOn");
  speakerOff.style.display = "none";
  speakerOn.style.display = "block";
  gameSound.play();
}

//This is the method to know the collision of the character and the falling blocks/images.
function collision() {
  blocks.forEach(function (blocks) {
    if (
      character.position.y + character.height <= blocks.position.y &&
      character.position.y + character.height + character.speed.y >=
        blocks.position.y &&
      character.position.x <= blocks.width + blocks.position.x &&
      character.position.x + character.width >= blocks.position.x
    ) {
      if (blocks.img == imgBoy && wordVal.textContent == "girl") {
        score++;
        scoreVal.textContent = score;
        console.log("boy");
        catchSound.play();
        console.log(score);
        textArray();
      } else if (blocks.img == imgGirl && wordVal.textContent == "boy") {
        score++;
        scoreVal.textContent = score;
        console.log("girl");
        catchSound.play();
        console.log(score);
        textArray();
      } else if (blocks.img == imgSun && wordVal.textContent == "moon") {
        score++;
        scoreVal.textContent = score;
        console.log("sun");
        catchSound.play();
        console.log(score);
        textArray();
      } else if (blocks.img == imgMoon && wordVal.textContent == "sun") {
        score++;
        scoreVal.textContent = score;
        console.log("moon");
        catchSound.play();
        console.log(score);
        textArray();
      } else {
        errorSound.play();
        gameOver();
      }
    }
  });
}

//This is the random word that I put at the top left of the game.
function textArray() {
  //Data can be expanded
  // const words = ["boy","girl", "water","fire","day","night","moon","sun","hard","soft",];
  const words = ["boy", "girl", "moon", "sun"];
  const randomWords = words[Math.floor(Math.random() * words.length)];
  wordVal.textContent = randomWords;
}

//This is where the fallingImages Array run.
function blocksArray() {
  if (blocks.length < 10) {
    const randomX = Math.floor(Math.random() * innerWidth);
    const randomY = -100;
    // const imgs = [imgBoy, imgGirl, imgSun, imgMoon, imgDay, imgNight];
    const imgs = [imgBoy, imgGirl, imgSun, imgMoon];
    const randomImg = imgs[Math.floor(Math.random() * imgs.length)];
    blocks.push(new fallingImages(randomX, randomY, randomImg));
  }

  blocks.forEach((block, index) => {
    if (block.position.y >= canvas.height) {
      blocks.splice(index, 1);
    }
  });
}

function instruction() {
  if (itemContainer.style.display == "flex") {
    itemContainer.style.display = "none";
    headerContent.style.fontSize = 3 + "rem";
    mainContainer.style.borderTopRightRadius = 30 + "px";
    mainContainer.style.borderBottomRightRadius = 30 + "px";
  } else {
    itemContainer.style.display = "flex";
    headerContent.style.fontSize = 2 + "rem";
    mainContainer.style.borderTopRightRadius = 0;
    mainContainer.style.borderBottomRightRadius = 0;
  }
}

//classes
const imgIdle = new Image();
imgIdle.src = "Assets/sprite-character-idle.png";
const imgRun = new Image();
imgRun.src = "Assets/sprite-character-run.png";
const imgRunLeft = new Image();
imgRunLeft.src = "Assets/sprite-character-run-left.png";

class Character {
  constructor() {
    this.position = {
      x: pointX,
      y: pointY,
    };

    this.speed = {
      x: 0,
      y: 1,
    };
    this.width = 80;
    this.height = 100;

    this.img = imgIdle;
    this.frames = 0;
    this.sprite = {
      idle: {
        right: imgIdle,
        left: imgIdle,
        cropWidth: 389,
        width: 100,
      },
      run: {
        right: imgRun,
        left: imgRunLeft,
        cropWidth: 389,
        width: 100,
      },
    };

    this.currentSprite = this.sprite.idle.right;
    this.currentCropWidth = 389;
  }

  draw() {
    ctx.drawImage(
      this.currentSprite,
      this.currentCropWidth * this.frames,
      0,
      this.currentCropWidth,
      662,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.frames++;
    if (
      this.frames > 20 &&
      (this.currentSprite === this.sprite.idle.right ||
        this.currentSprite === this.sprite.idle.left)
    ) {
      this.frames = 0;
    } else if (
      this.frames > 20 &&
      (this.currentSprite === this.sprite.run.right ||
        this.currentSprite === this.sprite.run.left)
    ) {
      this.frames = 0;
    }
    this.draw();
    this.position.x += this.speed.x;
  }
}

class Text {
  constructor(text, x, y) {
    this.position = {
      x: x,
      y: y,
    };
    this.text = text;
    this.width = 100;
    this.height = 150;
  }

  draw() {
    ctx.fillStyle = "yellow";
    ctx.font = "bold 24px Quantico";
    ctx.fillText(this.text, this.position.x, this.position.y);
  }
}

class fallingImages {
  constructor(x, y, img) {
    this.position = {
      x: x,
      y: y,
    };

    this.speed = {
      x: 0,
      // y: 5,
      y: Math.floor(Math.random() * 5),
    };

    this.img = img;
    this.width = img.width;
    this.height = img.height;
  }

  draw() {
    ctx.drawImage(this.img, this.position.x, this.position.y);
  }

  update() {
    this.draw();
    this.position.y += this.speed.y;
  }
}

//classes
const character = new Character();
let texts = [];
let blocks = [];

//classes on sounds
const openingSound = new Audio("Assets/Sounds/audio-opening.wav");
const clickSoundMini = new Audio("Assets/Sounds/audio-miniClick.wav");
const catchSound = new Audio("Assets/Sounds/audio-catch.wav");
const errorSound = new Audio("Assets/Sounds/audio-error.wav");
const gameSound = new Audio("Assets/Sounds/audio-game.mp3");
const btnplaySound = new Audio("Assets/Sounds/audio-play.mp3");
const winnerSound = new Audio("Assets/Sounds/audio-winner.wav");

//classes on Images
const imgBoy = new Image();
const imgGirl = new Image();
const imgSun = new Image();
const imgMoon = new Image();
const imgDay = new Image();
const imgNight = new Image();
imgBoy.src = "Assets/img-boy.png";
imgGirl.src = "Assets/img-girl.png";
imgSun.src = "Assets/img-sun.png";
imgMoon.src = "Assets/img-moon.png";

//obj move keys. Use to control my character to run left and right.
const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

function keyPressed() {
  if (keys.right.pressed) {
    character.speed.x = 5;
  } else if (keys.left.pressed) {
    character.speed.x = -5;
  } else {
    character.speed.x = 0;
  }
}

//Events
window.addEventListener("keydown", function ({ key }) {
  switch (key) {
    case "ArrowLeft":
      console.log("left");
      keys.left.pressed = true;
      character.currentSprite = character.sprite.run.left;
      break;
    case "ArrowRight":
      console.log("right");
      keys.right.pressed = true;
      character.currentSprite = character.sprite.run.right;
      break;
  }
});

window.addEventListener("keyup", function ({ key }) {
  switch (key) {
    case "ArrowLeft":
      console.log("left");
      keys.left.pressed = false;
      character.currentSprite = character.sprite.idle.right;
      break;
    case "ArrowRight":
      console.log("right");
      keys.right.pressed = false;
      character.currentSprite = character.sprite.idle.right;
      break;
  }
});

//Methods for the updates of the arrays. I put these two to the animate method.
function blocksUpdate() {
  blocks.forEach(function (blocks) {
    blocks.update();
  });
}

function textUpdate() {
  texts.forEach(function (text) {
    text.update();
  });
}

//This is where I load my code.
function animate() {
  if (isRunning) {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    character.update();
    blocksUpdate();
    keyPressed();
    collision();
    blocksArray();
  }
}
animate();
textArray();
// openingSound.play();
