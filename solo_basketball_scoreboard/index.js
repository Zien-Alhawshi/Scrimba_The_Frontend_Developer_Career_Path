// The main result

let homeRes = document.getElementById("home-result");
let gestRes = document.getElementById("guest-result");
let home = document.getElementById("home");
let guest = document.getElementById("guest");
let homeResult = 0;
let guestResult = 0;

function home1() {
  homeResult += 1;
  homeRes.textContent = homeResult;
  if (homeResult > guestResult) {
    homeRes.style.color = "green";

    home.style.color = "green";
    guest.style.color = "#eee";

    gestRes.style.color = "#f94f6d";
  } else if (homeResult === guestResult) {
    gestRes.style.color = "#f94f6d";
    homeRes.style.color = "#f94f6d";

    home.style.color = "#eee";
    guest.style.color = "#eee";
  } else {
    homeRes.style.color = "#f94f6d";
    gestRes.style.color = "#green";

    home.style.color = "#eee";
    guest.style.color = "green";
  }
}

function home2() {
  homeResult += 2;
  homeRes.textContent = homeResult;
  if (homeResult > guestResult) {
    homeRes.style.color = "green";
    gestRes.style.color = "#f94f6d";
    home.style.color = "green";
    guest.style.color = "#eee";
  } else if (homeResult === guestResult) {
    gestRes.style.color = "#f94f6d";
    homeRes.style.color = "#f94f6d";
    home.style.color = "#eee";
    guest.style.color = "#eee";
  } else {
    homeRes.style.color = "#f94f6d";
    gestRes.style.color = "#green";
    home.style.color = "#eee";
    guest.style.color = "green";
  }
}
function home3() {
  homeResult += 3;
  homeRes.textContent = homeResult;
  if (homeResult > guestResult) {
    homeRes.style.color = "green";
    gestRes.style.color = "#f94f6d";
  } else if (homeResult === guestResult) {
    gestRes.style.color = "#f94f6d";
    homeRes.style.color = "#f94f6d";
  } else {
    homeRes.style.color = "#f94f6d";
    gestRes.style.color = "#green";
  }
}
function guest1() {
  guestResult += 1;
  gestRes.textContent = guestResult;
  if (guestResult > homeResult) {
    gestRes.style.color = "green";
    homeRes.style.color = "#f94f6d";
    guest.style.color = "green";
    home.style.color = "#eee";
  } else if (homeResult === guestResult) {
    gestRes.style.color = "#f94f6d";
    homeRes.style.color = "#f94f6d";
    home.style.color = "#eee";
    guest.style.color = "#eee";
  } else {
    gestRes.style.color = "#f94f6d";
    homeRes.style.color = "green";
    guest.style.color = "#eee";
    home.style.color = "green";
  }
}
function guest2() {
  guestResult += 2;
  gestRes.textContent = guestResult;
  if (guestResult > homeResult) {
    gestRes.style.color = "green";
    homeRes.style.color = "#f94f6d";
    guest.style.color = "green";
    home.style.color = "#eee";
  } else if (homeResult === guestResult) {
    gestRes.style.color = "#f94f6d";
    homeRes.style.color = "#f94f6d";
    home.style.color = "#eee";
    guest.style.color = "#eee";
  } else {
    gestRes.style.color = "#f94f6d";
    homeRes.style.color = "green";
    guest.style.color = "#eee";
    home.style.color = "green";
  }
}
function guest3() {
  guestResult += 3;
  gestRes.textContent = guestResult;
  if (guestResult > homeResult) {
    gestRes.style.color = "green";
    homeRes.style.color = "#f94f6d";
    guest.style.color = "green";
    home.style.color = "#eee";
  } else if (homeResult === guestResult) {
    gestRes.style.color = "#f94f6d";
    homeRes.style.color = "#f94f6d";
    home.style.color = "#eee";
    guest.style.color = "#eee";
  } else {
    gestRes.style.color = "#f94f6d";
    homeRes.style.color = "green";
    guest.style.color = "#eee";
    home.style.color = "green";
  }
}
function reset() {
  homeResult = 0;
  guestResult = 0;
  gestRes.textContent = guestResult;
  homeRes.textContent = homeResult;

  homeRes.style.color = "#f94f6d";
  gestRes.style.color = "#f94f6d";
  home.style.color = "#eee";
  guest.style.color = "#eee";
}
