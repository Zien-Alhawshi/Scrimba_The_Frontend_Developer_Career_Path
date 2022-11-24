import { dogs } from "./data.js";

class Dog {
  constructor(data) {
    Object.assign(this, data);
  }
  getCharacterHtml() {
    const { name, avatar, age, bio, hasBeenSwipe, hasBeenLikedd } = this;
    return `
    <div class="dog-card">
    <img class="dog-img" src="${avatar}">
    <div class="dog-intro">
        <h1>${name}, ${age}</h1>
        <p>${bio}</p>
    </div>
    </div>
    `;
  }
  swiped() {
    {
      this.hasBeenSwipe = true;
      document.querySelector(".dog-card").innerHTML += `
      <img class="badge" src="./images/badge-nope.png">
  `;
    }
  }
  liked() {
    this.hasBeenLikedd = true;
    this.hasBeenSwipe = true;

    document.querySelector(".dog-card").innerHTML += `
      <img class="badge" src="./images/badge-like.png">
  `;
  }
  noMatch() {
    document.querySelector(".dog-card").innerHTML = `
     <img class="match" src="./images/no_match.jpg">
     `;
  }
  reset() {
    this.hasBeenLikedd = false;
    this.hasBeenSwipe = false;
  }
}
export { Dog };
