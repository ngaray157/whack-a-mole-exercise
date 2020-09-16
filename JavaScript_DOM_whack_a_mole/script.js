//step 1 select objects on screen & define globals//
// .................................................//
const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const countdownBoard = document.querySelector(".countdown");
const startButton = document.querySelector(".startButton");

let lastHole;
let timeUp = false;
let score = 0;
let countdown;
let timeLimit = 20000;

function pickRandomHole(holes) {
  const randomHole = Math.floor(Math.random() * holes.length);
  const hole = holes[randomHole];
  if (hole === lastHole) {
    return pickRandomHole(holes);
  }
  lastHole = hole;
  return hole;
}

// .................................................//
//step 2 add class 'up'//
// .................................................//
function popOut() {
  const time = Math.random() * 1300 + 400;
  const hole = pickRandomHole(holes);
  hole.classList.add("up");
  setTimeout(function () {
    1;
    hole.classList.remove("up");
    if (!timeUp) popOut(); //if timeUp does not pop up, run popOut function
  }, time);
}

// .................................................//
//STEP 3 dynamically change text content to countdown//
// .................................................//

function startGame() {
  countdown = timeLimit / 20;
  scoreBoard.textContent = 0; //score will be at 0 when game is started
  scoreBoard.style.display = "block"; //scoreboard is set to block style display
  countdownBoard.textContent = countdown;
  timeUp = false; //we dont want time to be up right away, so its false
  score = 0;
  popOut();

  //changing timeUp property to true, after a little time the game will end
  setTimeout(function () {
    timeUp = true;
  }, timeLimit);
  // ^ after timeLimt reaches 0, timeUp will be set to true and the end of game will happen
  //
  let startCountdown = setInterval(function () {
    //takes countdown variable and subtracts one every second
    countdown -= 1;

    //makes countdownBoard text whatever the countdown is at the time
    countdownBoard.textContent = countdown;

    if (countdown < 0) {
      countdown = 0;
      clearInterval(startCountdown);
      //implements text after countdown hits 0
      countdownBoard.textContent =
        "Time is up!! Thank you for protecting our planet. This is the way!";
    }
  }, 1000);
}

// .................................................//
//STEP 4 adding event listeners//
// .................................................//

//1st paramater is what its listening for, 2nd parameter is function
startButton.addEventListener("click", startGame);

//letter 3 is dynamic value that listens for onclicks, etc
function whack(e) {
  //adds 1 to score variable
  score++;
  //changes png backgroundImage to the yoda2 picture when yoda is whacked
  //"this" is whatever element or object is being clicked on
  this.style.backgroundImage = 'url("yoda2.png")';
  this.style.pointerEvents = "none";

  //arrow function syntax
  setTimeout(() => {
    this.style.backgroundImage = 'url("yoda1.png")';
    this.style.pointerEvents = "all";
  }, 800);
  //changes text content of scoreBoard to the value of score and keep displaying it as it goes up
  scoreBoard.textContent = score;
}

// .................................................//
//STEP 5 keep track of score with forEach//
// .................................................//

moles.forEach((mole) => mole.addEventListener("click", whack));
