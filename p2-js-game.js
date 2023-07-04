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
const lblWinnerName = document.getElementById("lbl-winner-name");
//arrow buttons
const arrowButtonsContainer = document.getElementById("btn-control-container");
const ctx = canvas.getContext("2d");

//global
let isRunning = false;
let score = 0;
const goal = 2;
lifeVal.textContent = goal;
let state = true; //toggle intruction() function

canvas.width = innerWidth;
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
  intro.style.display = "none";
  labelsContainer.style.display = "flex";
  canvas.style.display = "block";
  sideButtons.style.display = "block";
  let inputVal = input.value;
  playerName.textContent = inputVal;
  hidePopUpContainers();
  animate();
}

function quit() {
  popUp.style.display = "flex";
  restartContainer.style.display = "none";
  gameOverContainer.style.display = "none";
  quitContainer.style.display = "block";
  isRunning = false;
  clickSoundMini.play();
  gameSound.pause();
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

function restart() {
  gameSound.pause();
  clickSoundMini.play();
  canvas.style.display = "block";
  itemContainer.style.display = "none";
  labelsContainer.style.display = "flex";
  popUp.style.display = "flex";
  quitContainer.style.display = "none";
  gameOverContainer.style.display = "none";
  winnerContainer.style.display = "none";
  restartContainer.style.display = "block";
  isRunning = false;
}

//This is just a temporary restart. It works almost the same in restartQuitNo() function. I'm still trying to find solution for this.
//It restarts the score and timer.
function restartYes() {
  sideButtons.style.display = "block";
  restartGameTimer();
  textArray();
  score = 0;
  scoreVal.textContent = score;
  hidePopUpContainers();
  animate();
}

function restartAndQuitNo() {
  hidePopUpContainers();
  animate();
}

function hidePopUpContainers() {
  gameSound.play();
  clickSoundMini.play();
  popUp.style.display = "none";
  isRunning = true;
}

function gameOver() {
  clickSoundMini.play();
  canvas.style.display = "block";
  intro.style.display = "none";
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
  gameSound.pause();
}

function gameOverYes() {
  clickSoundMini.play();
}

function winner() {
  if (lblWinnerName.textContent == null) {
    clickSoundMini.play();
    winnerSound.play();
    gameSound.pause();
    canvas.style.display = "block";
    itemContainer.style.display = "none";
    labelsContainer.style.display = "flex";
    popUp.style.display = "flex";
    quitContainer.style.display = "none";
    restartContainer.style.display = "none";
    gameOverContainer.style.display = "none";
    winnerContainer.style.display = "block";
    sideButtons.style.display = "none";
    lblWinnerName.style.display = "none";
    isRunning = false;
  } else {
    clickSoundMini.play();
    winnerSound.play();
    gameSound.pause();
    canvas.style.display = "block";
    itemContainer.style.display = "none";
    labelsContainer.style.display = "flex";
    popUp.style.display = "flex";
    quitContainer.style.display = "none";
    restartContainer.style.display = "none";
    gameOverContainer.style.display = "none";
    winnerContainer.style.display = "block";
    sideButtons.style.display = "none";
    lblWinnerName.style.display = "block";
    isRunning = false;
    lblWinnerName.textContent = input.value;
  }
}

function gameToggleSpeaker() {
  if (state === true) {
    const speakerOff = document.getElementById("btn-speakerOff");
    const speakerOn = document.getElementById("btn-speakerOn");
    speakerOff.style.display = "none";
    speakerOn.style.display = "block";
    gameSound.play();
    state = false;
  } else {
    const speakerOff = document.getElementById("btn-speakerOff");
    const speakerOn = document.getElementById("btn-speakerOn");
    speakerOff.style.display = "block";
    speakerOn.style.display = "none";
    gameSound.pause();
    state = true;
  }
}

function instruction() {
  if (state === true) {
    itemContainer.style.display = "flex";
    mainContainer.style.borderTopRightRadius = 0;
    mainContainer.style.borderBottomRightRadius = 0;
    clickSoundMini.play();
    state = false;
  } else {
    btnBackHome();
    state = true;
  }
}

function btnBackHome() {
  itemContainer.style.display = "none";
  mainContainer.style.borderTopRightRadius = 30 + "px";
  mainContainer.style.borderBottomRightRadius = 30 + "px";
  clickSoundMini.play();
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

//classes on sounds
const openingSound = new Audio("Assets/Sounds/audio-opening.wav");
const clickSoundMini = new Audio("Assets/Sounds/audio-miniClick.wav");
const catchSound = new Audio("Assets/Sounds/audio-catch.wav");
const errorSound = new Audio("Assets/Sounds/audio-error.wav");
const gameSound = new Audio("Assets/Sounds/audio-game.mp3");
const btnplaySound = new Audio("Assets/Sounds/audio-play.mp3");
const winnerSound = new Audio("Assets/Sounds/audio-winner.wav");

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

function successfullyCollided() {
  score++;
  scoreVal.textContent = score;
  catchSound.play();
  textArray();
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
      //preserved for additional changes in the future
      // character.position.y + character.height >= blocks.position.y &&
      // character.position.y + character.height + character.speed.y >=
      //   blocks.position.y &&
      // character.position.y <= blocks.position.y + blocks.height &&
      // character.position.x + character.width >= blocks.position.x &&
      // character.position.x <= blocks.position.x + blocks.width
    ) {
      if (blocks.img == imgBoy && wordVal.textContent == "girl") {
        successfullyCollided();
      } else if (blocks.img == imgGirl && wordVal.textContent == "boy") {
        successfullyCollided();
      } else if (blocks.img == imgSun && wordVal.textContent == "moon") {
        successfullyCollided();
      } else if (blocks.img == imgMoon && wordVal.textContent == "sun") {
        successfullyCollided();
      } else {
        console.log("Game Over");
        gameOver();
      }
    } else {
      console.log("Not Colliding");
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

//Temporary Controls for mobile phones
function arrowLeftControl() {
  character.speed.x = -35;
}

function arrowRightControl() {
  character.speed.x = 35;
}

//Methods for the updates of the arrays.
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

//Events
window.addEventListener("keydown", function ({ key }) {
  switch (key) {
    case "ArrowLeft":
      keys.left.pressed = true;
      character.currentSprite = character.sprite.run.left;
      break;
    case "ArrowRight":
      keys.right.pressed = true;
      character.currentSprite = character.sprite.run.right;
      break;
  }
});

window.addEventListener("keyup", function ({ key }) {
  switch (key) {
    case "ArrowLeft":
      keys.left.pressed = false;
      character.currentSprite = character.sprite.idle.right;
      break;
    case "ArrowRight":
      keys.right.pressed = false;
      character.currentSprite = character.sprite.idle.right;
      break;
  }
});

//This is where I load my code.
function animate() {
  if (isRunning) {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    character.update();
    blocksUpdate();
    collision();
    keyPressed();
    blocksArray();
  }
}
animate();
textArray();
// openingSound.play();
