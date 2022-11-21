import { characterData } from "./data.js";
import { getDiceRollArray, getDicePlaceholderHtml } from "./util.js";
import { Character } from "./charachter.js";
let monstersArray = ["orc", "demon", "goblin"];
function getNewMonster() {
  // monstersArray.shift()
  const nextMonsterData = characterData[monstersArray.shift()];
  console.log(nextMonsterData);
  return nextMonsterData ? new Character(nextMonsterData) : {};
}

const wizard = new Character(characterData.hero);
// const orc = new Character(characterData.orc);
let monster = getNewMonster();

function render() {
  document.getElementById("hero").innerHTML = wizard.getCharacterHtml();
  document.getElementById("monster").innerHTML = monster.getCharacterHtml();
}
render();

document.getElementById("attack-button").addEventListener("click", attack);
function attack() {
  wizard.getDiceHtml();
  monster.getDiceHtml();
  wizard.takeDamage(monster.currentDiceScore);
  monster.takeDamage(wizard.currentDiceScore);
  render();

  if (wizard.dead) {
    endGame();
  } else if (monster.dead) {
    if (monstersArray.length > 0) {
      document.getElementById("attack-button").disabled = true;
      setTimeout(() => {
        monster = getNewMonster();
        document.getElementById("attack-button").disabled = false;

        render();
      }, 1500);
    } else {
      endGame();
    }
  }
}
function endGame() {
  const endMessage =
    wizard.health === 0 && orc.health === 0
      ? "No victors - all creatures are dead"
      : wizard.health > 0
      ? "The Wizard Wins"
      : "The monsters are Victorious";

  console.log(endMessage);
  const endEmoji = wizard.health > 0 ? "🔮" : "☠️";
  document.getElementById("attack-button").disabled = true;

  setTimeout(() => {
    document.body.innerHTML = `<div class="end-game">
  <h2>Game Over</h2>
  <h3>${endMessage}</h3>
  <p class="end-emoji">${endEmoji}</p>
</div>`;
  }, 1500);
}
