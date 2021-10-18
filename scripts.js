const imageArray = [
  { name: "hamburguer", src: "/assets/images/hamburguer.jpg" },
  { name: "pizza", src: "/assets/images/pizza.jpg" },
  { name: "hotdog", src: "/assets/images/hotdog.jpg" },
  { name: "salad", src: "/assets/images/salad.jpg" },
  { name: "sushi", src: "/assets/images/sushi.jpg" },
  { name: "doughnut", src: "/assets/images/doughnut.jpg" },
];

let cardsDiv = document.querySelector(".cards");
let cardsChosenIds = [];
let cardsChosen = [];
let cardsWon = [];
let moves = 0;
let time = "";

const movesDisplay = document.querySelector("#moves");
const result = document.querySelector("#result");

const copyArray = [...imageArray];
const board = imageArray.concat(copyArray);
const shuffleBoard = board.sort(() => Math.random() - 0.5);

const gradientBackground =
  "linear-gradient( to bottom right, rebeccapurple, mediumpurple, skyblue )";

function createCardBoard() {
  shuffleBoard.forEach((fig, index) => {
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.style.backgroundImage = gradientBackground;
    cardDiv.setAttribute("data-id", index);

    cardDiv.addEventListener("click", flipCard);

    cardsDiv.append(cardDiv);

    showInfo();
  });
}

function showInfo() {
  movesDisplay.textContent = "0";
  result.textContent = "0";
}

function resetCardBoard() {
  cardsDiv.innerHTML = "";
  cardsChosen = [];
  cardsChosenIds = [];
  moves = 0;
  cardsWon = [];
}

function flipCard() {
  let cardId = this.getAttribute("data-id");
  cardsChosen.push(shuffleBoard[cardId].name);
  cardsChosenIds.push(cardId);
  this.removeEventListener("click", flipCard);
  this.classList.toggle("flip");
  this.style.backgroundImage = `url(${shuffleBoard[cardId].src})`;
  if (cardsChosen.length == 2) {
    setTimeout(checkForMatch, 500);
  }
}

function checkForMatch() {
  const cards = document.querySelectorAll(".card");
  const firstChosen = cardsChosenIds[0];
  const secondChosen = cardsChosenIds[1];

  if (cardsChosen[0] === cardsChosen[1]) {
    cards[firstChosen].style.opacity = "0.5";
    cards[firstChosen].removeEventListener("click", flipCard);
    cards[secondChosen].style.opacity = "0.5";
    cards[secondChosen].removeEventListener("click", flipCard);
    cardsWon.push(cardsChosen);
  } else {
    cards[firstChosen].classList.remove("flip");
    cards[firstChosen].style.backgroundImage = gradientBackground;
    cards[firstChosen].addEventListener("click", flipCard);
    cards[secondChosen].classList.remove("flip");
    cards[secondChosen].style.backgroundImage = gradientBackground;
    cards[secondChosen].addEventListener("click", flipCard);
  }

  cardsChosen = [];
  cardsChosenIds = [];
  moves++;
  movesDisplay.textContent = moves;

  result.textContent = cardsWon.length;
  if (cardsWon.length === shuffleBoard.length / 2) {
    // result.textContent = "Você achou todos os pares!";
    reset();
    const message = `Parabéns, você achou todos os pares em ${moves} movimentos e ${time}. Jogar novamente?`;
    confirmation = confirm(message);
    if (confirmation) {
      resetCardBoard();
      startGame();
    }
  }
}

let minute = 0;
let second = 0;
let milisecond = 0;

let count;

function start() {
  pause();
  count = setInterval(() => {
    timer();
  }, 10);
}

function pause() {
  clearInterval(count);
}

function reset() {
  minute = 0;
  second = 0;
  milisecond = 0;
  document.getElementById("second").innerText = "00";
  document.getElementById("minute").innerText = "00";
}

function timer() {
  if ((milisecond += 10) == 1000) {
    milisecond = 0;
    second++;
  }

  if (second == 60) {
    second = 0;
    minute++;
  }

  document.getElementById("second").innerText = returnData(second);
  document.getElementById("minute").innerText = returnData(minute);
  time = `${returnData(minute)}:${returnData(second)}`;
}

function returnData(input) {
  return input > 10 ? input : `0${input}`;
}

function startGame() {
  const confirmation = confirm("Iniciar jogo?");
  if (confirmation) {
    start();
    createCardBoard();
  } else {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.removeEventListener("click", flipCard);
    });
  }
}

window.onload = startGame();
