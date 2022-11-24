import { dogs } from "./data.js";
import { Dog } from "./dogs.js";
let dogsArray = ["Rex", "Bella", "Teddy"];

let dog = getNewDog();
render();

function getNewDog() {
  const nextDogData = dogs.filter((e) => e.name == dogsArray[0])[0];
  dogsArray.shift();
  return nextDogData ? new Dog(nextDogData) : "hello";
}
document.getElementById("cross").addEventListener("click", () => {
  if (dogsArray.length == 0) {
    console.log("Dog!");
    dog.swiped();
    setTimeout(() => {
      console.log(dog);
      dog.noMatch();
      document.getElementById("cross").disabled = true;
      document.getElementById("heart").disabled = true;
    }, 1500);
  } else {
    dog.swiped();
    setTimeout(() => {
      dog = getNewDog();
      render();
    }, 1500);
  }
});
document.getElementById("heart").addEventListener("click", () => {
  if (dogsArray.length == 0) {
    console.log("Dog!");
    dog.liked();
    setTimeout(() => {
      console.log(dog);
      dog.noMatch();
      document.getElementById("cross").disabled = true;
      document.getElementById("heart").disabled = true;

      // nomatches()
    }, 1500);
  } else {
    dog.liked();
    setTimeout(() => {
      dog = getNewDog();
      render();
    }, 1500);
  }
});
document.getElementById("reset").addEventListener("click", reset);
function render() {
  document.getElementById("dog").innerHTML = dog.getCharacterHtml();
}

function reset() {
  dogsArray = ["Rex", "Bella", "Teddy"];
  dog = getNewDog();
  document.getElementById("cross").disabled = false;
  document.getElementById("heart").disabled = false;
  render();
}

function renderCards() {
  let html = "";
  dogs.forEach(function (dogItem) {
    html += `
        <div class="sidebar">
        <img class="side-image" src="${dogItem.avatar}">
            <div>
                <h3>${dogItem.name}</h3>
                <p>New match, Say hello 👋</p>

            </div>
        </div>
        `;
  });
  console.log(html);
  return html;
}
document.querySelector("aside").innerHTML = renderCards();
