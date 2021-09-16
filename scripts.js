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
const result = document.querySelector("#result");
result.textContent = "0";

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
  });
}

createCardBoard();

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
  result.textContent = cardsWon.length;
  if (cardsWon.length === shuffleBoard.length / 2) {
    result.textContent = "Você achou todos os pares!";
  }
}
