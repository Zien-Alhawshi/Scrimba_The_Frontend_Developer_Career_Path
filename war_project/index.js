const cardsContainer = document.getElementById("cards");
const newDeckBtn = document.getElementById("new-deck");
const drawBtn = document.getElementById("draw-cards");
const winner = document.getElementById("winner");
const remainingText = document.getElementById("remaining");
const computerScoreText = document.getElementById("computer-score");
const playerScoreText = document.getElementById("player-score");

let deckId;
let computerScore = 0;
let playerScore = 0;
// let remaining;

async function handleClick() {
  const response = await fetch(
    "https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/"
  );
  const data = await response.json();
  deckId = data.deck_id;
  remainingText.textContent = `Remaining cards: ${data.remaining}`;
  computerScoreText.textContent = `Computer score: ${computerScore}`;
  playerScoreText.textContent = `Player score: ${playerScore}`;
}

newDeckBtn.addEventListener("click", handleClick);

drawBtn.addEventListener("click", async () => {
  const response = await fetch(
    `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
  );
  const data = await response.json();
  console.log(data.cards);
  cardsContainer.children[0].innerHTML = `
            <img src=${data.cards[0].image} class="card" />
        `;
  cardsContainer.children[1].innerHTML = `
        <img src=${data.cards[1].image} class="card" />
    `;
  const winnerText = detectingWinner(data.cards[0], data.cards[1]);
  console.log(winner);
  winner.textContent = winnerText;
  remainingText.textContent = `Remaining cards: ${data.remaining}`;
  if (data.remaining === 0) {
    drawBtn.disabled = true;
    if (computerScore > playerScore) {
      winner.textContent = "Computer is the winner!";
    } else if (computerScore < playerScore) {
      winner.textContent = "player is the winner!";
    } else {
      winner.textContent = "It's a tie game!";
    }
  }
});

function detectingWinner(card1, card2) {
  const valueOptions = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];
  const card1ValueIndex = valueOptions.indexOf(card1.value);
  const card2ValueIndex = valueOptions.indexOf(card2.value);
  console.log("card 1:", card1ValueIndex);
  console.log("card 2:", card2ValueIndex);
  if (card1ValueIndex > card2ValueIndex) {
    computerScore += 1;
    computerScoreText.textContent = `Computer score: ${computerScore}`;
    playerScoreText.textContent = `Player score: ${playerScore}`;
    return "Card 1 wins!";
  } else if (card1ValueIndex < card2ValueIndex) {
    playerScore += 1;
    computerScoreText.textContent = `Computer score: ${computerScore}`;
    playerScoreText.textContent = `Player score: ${playerScore}`;
    return "Card 2 wins!";
  } else {
    return "War!";
  }
}
