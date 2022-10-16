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
function singularPlural(num, name1, name2) {
  if (num > 1) {
    return name1;
  } else {
    return name2;
  }
}
function meterCalc(inputVal) {
  let meterVal = (inputVal * 3.281).toFixed(3);
  let meterVal2 = (inputVal / 3.281).toFixed(3);

  let string = `${inputVal} ${singularPlural(
    inputVal,
    "meters",
    "meter"
  )} =${meterVal} ${singularPlural(
    meterVal,
    "feet",
    "foot"
  )} | ${inputVal} ${singularPlural(
    inputVal,
    "feet",
    "foot"
  )} = ${meterVal2} ${singularPlural(meterVal2, "meters", "meter")} `;
  meterEl.textContent = string;
}
//liter calculation

function literCalc(inputVal) {
  let litreVal1 = (inputVal * 0.264).toFixed(3);
  let litreVal2 = (inputVal / 0.264).toFixed(3);
  let string = `${inputVal} ${singularPlural(
    inputVal,
    "liters",
    "liter"
  )} = ${litreVal1}  ${singularPlural(
    inputVal,
    "gallons",
    "gallon"
  )}  | ${inputVal}   ${singularPlural(
    litreVal1,
    "gallons",
    "gallon"
  )}  = ${litreVal2}  ${singularPlural(litreVal2, "liters", "liter")}`;
  literEl.textContent = string;
}
//kilogram calculation

function kilogramCalc(inputVal) {
  let kiloVal1 = (inputVal * 2.204).toFixed(3);
  let kiloVal2 = (inputVal / 2.204).toFixed(3);
  let string = `${inputVal} ${singularPlural(
    inputVal,
    "kilos",
    "kilo"
  )}= ${kiloVal1} ${singularPlural(
    kiloVal1,
    "pounds",
    "pound"
  )}    | ${inputVal} ${singularPlural(
    inputVal,
    "pounds",
    "pound"
  )}      = ${kiloVal2} ${singularPlural(kiloVal2, "kilos", "kilo")} `;
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
