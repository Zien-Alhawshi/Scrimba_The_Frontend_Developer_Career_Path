import {
  getDiceRollArray,
  getDicePlaceholderHtml,
  getPercentage,
} from "./util.js";
class Character {
  constructor(data) {
    Object.assign(this, data);
    this.maxHealth = this.health;
    this.diceArray = getDicePlaceholderHtml(this.diceCount);
  }
  getHealthBarHtml() {
    const percent = getPercentage(this.health, this.maxHealth);
    return `<div class="health-bar-outer">
            <div class="health-bar-inner ${percent < 26 ? "danger" : ""} " 
                style="width: ${percent}%;">
            </div>
        </div>`;
  }
  takeDamage(attackScoreArray) {
    const totalAttackScore = attackScoreArray.reduce(
      (total, currentEl) => total + currentEl
    );
    this.health -= totalAttackScore;
    if (this.health <= 0) {
      this.dead = true;

      this.health = 0;
    }
    console.log(getPercentage(this.health, this.maxHealth));
  }
  getDiceHtml(diceCount) {
    this.currentDiceScore = getDiceRollArray(this.diceCount);
    this.diceArray = this.currentDiceScore
      .map((num) => `<div class="dice">${num}</div>`)
      .join("");
  }
  getCharacterHtml() {
    const { id, name, avatar, health, diceCount, diceArray } = this;
    const healthBar = this.getHealthBarHtml();
    const diceHtml = this.getDiceHtml(diceCount);
    return `<div class="character-card">
     <h4 class="name"> ${name} </h4>
     <img class="avatar" src="${avatar}" />
     <div class="health">health: <b> ${health} </b></div>
     ${healthBar}
     <div class="dice-container">
     ${diceArray}
     </div>
  </div>`;
  }
}
// function Character(data) {
//   //   Object.assign(this, data);
//   //   this.getHealthBarHtml = () => {
//   //     const percent = getPercentage(this.health, this.maxHealth);
//   //     return `<div class="health-bar-outer">
//   //     <div class="health-bar-inner ${percent < 26 ? "danger" : ""} "
//   //         style="width: ${percent}%;">
//   //     </div>
//   // </div>`;
//   //   };

//   this.takeDamage = function (attackScoreArray) {
//     const totalAttackScore = attackScoreArray.reduce(
//       (total, currentEl) => total + currentEl
//     );
//     this.health -= totalAttackScore;
//     if (this.health <= 0) {
//       this.dead = true;

//       this.health = 0;
//     }
//     console.log(getPercentage(this.health, this.maxHealth));
//   };
//   //   this.maxHealth = this.health;

//   this.getDiceHtml = function (diceCount) {
//     this.currentDiceScore = getDiceRollArray(this.diceCount);
//     this.diceArray = this.currentDiceScore
//       .map((num) => `<div class="dice">${num}</div>`)
//       .join("");
//   };
//   //   this.diceArray = getDicePlaceholderHtml(this.diceCount);
//   this.getCharacterHtml = function () {
//     const { id, name, avatar, health, diceCount, diceArray } = this;
//     const healthBar = this.getHealthBarHtml();
//     const diceHtml = this.getDiceHtml(diceCount);
//     return `<div class="character-card">
//      <h4 class="name"> ${name} </h4>
//      <img class="avatar" src="${avatar}" />
//      <div class="health">health: <b> ${health} </b></div>
//      ${healthBar}
//      <div class="dice-container">
//      ${diceArray}
//      </div>
//   </div>`;
//   };
// }
export { Character };
