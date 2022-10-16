//UI elements
const inputEl = document.getElementById("input-el");
const convertEl = document.getElementById("convert-el");
const meterEl = document.getElementById("meter-el");
const literEl = document.getElementById("liter-el");
const kiloEl = document.getElementById("kilo-el");
//button event
convertEl.addEventListener("click", function () {
  let inputVal = inputEl.value;
  if (inputVal > 99) {
    alert("Enter a number between 1 and 99.");
  } else {
    render(inputVal);
  }
});
//UI rendering
function render(val) {
  meterCalc(val);
  literCalc(val);
  kilogramCalc(val);
}
//meter calculation
function meterCalc(inputVal) {
  console.log(inputVal);
  let string = `${inputVal} meters = ${(inputVal * 3.281).toFixed(
    3
  )} feet | ${inputVal}  feet = ${(inputVal / 3.281).toFixed(3)} meters`;
  console.log(string);
  meterEl.textContent = string;
}
//liter calculation

function literCalc(inputVal) {
  let string = `${inputVal} liters = ${(inputVal * 0.264).toFixed(
    3
  )} gallons | ${inputVal}  gallons  = ${(inputVal / 0.264).toFixed(3)} liters`;
  literEl.textContent = string;
}
//kilogram calculation

function kilogramCalc(inputVal) {
  let string = `${inputVal} kilos  = ${(inputVal * 2.204).toFixed(
    3
  )} pounds  | ${inputVal}  pounds   = ${(inputVal / 2.204).toFixed(3)} kilos `;
  kiloEl.textContent = string;
}

function isLight() {
  return localStorage.getItem("light-mode");
}

function toggleRootClass() {
  document.querySelector(":root").classList.toggle("light");
}

function toggleLocalStorageItem() {
  if (isLight()) {
    localStorage.removeItem("light-mode");
  } else {
    localStorage.setItem("light-mode", "set");
  }
}

if (isLight()) {
  toggleRootClass();
}

document.querySelector(".theme-icon").addEventListener("click", () => {
  toggleLocalStorageItem();
  toggleRootClass();
});
