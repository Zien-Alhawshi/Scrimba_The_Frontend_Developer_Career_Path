const toggle = document.querySelector(".toggle");
const content = document.querySelector(".content");
const header = document.querySelector(".head");
const par = document.querySelector(".par");
const line = document.querySelector(".line");
let passwordEl1 = document.getElementById("password1");
let passwordEl2 = document.getElementById("password2");
const lengthEl = document.getElementById("length");
let pass1 = "";
let pass2 = "";
let passwrdLength = 15;
let digi = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

let letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
let characters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

let char_copy = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];
//generating password
function gen() {
  let num = 0;
  for (let i = 0; i < passwrdLength; i++) {
    // console.log(Math.floor(Math.random() * characters.lenth));
    // // num = characters[];
    // // console.log(num);
    let creature1 = characters[Math.floor(Math.random() * characters.length)];
    let creature2 = characters[Math.floor(Math.random() * characters.length)];

    pass1 += creature1;
    pass2 += creature2;
  }

  passwordEl1.value = pass1;
  passwordEl2.value = pass2;

  pass1 = "";
  pass2 = "";
  characters = char_copy;
}

// change colors on UI on each click there is an element will change!
toggle.addEventListener("click", () => {
  content.classList.toggle("dark")
    ? (toggle.firstElementChild.className = "far fa-moon")
    : (toggle.firstElementChild.className = "far fa-sun");
});
toggle.addEventListener("click", () => {
  header.classList.toggle("dark");
});
toggle.addEventListener("click", () => {
  par.classList.toggle("dark");
});
toggle.addEventListener("click", () => {
  line.classList.toggle("dark");
});
function saveVal() {
  passwrdLength = lengthEl.value;

  console.log(passwrdLength);
}

//Click to copy
function copy1() {
  var copyText = document.getElementById("password1");

  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  navigator.clipboard.writeText(copyText.value);

  alert("Copied the text: " + copyText.value);
}
function copy2() {
  var copyText = document.getElementById("password2");

  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  navigator.clipboard.writeText(copyText.value);

  alert("Copied the text: " + copyText.value);
}

function digit() {
  characters = digi;
}
function lett() {
  characters = letters;
}
