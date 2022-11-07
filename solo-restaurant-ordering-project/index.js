import { menuArray } from "./data.js";
let orders = [];
let total = [];
let client = "";
let starsNum = 0;
const formEl = document.getElementById("formEl");
document.addEventListener("click", function (e) {
  if (e.target.dataset.addicon) {
    handleAddItem(e.target.dataset.addicon);
  } else if (e.target.dataset.remove) {
    handleRemoveItem(e.target.dataset.remove);
  } else if (e.target.id == "complete") {
    handleCompleteProcess();
  } else if (e.target.id == "submit") {
    submitForm();
  } else if (e.target.classList.contains("one")) {
    console.log("Heey!");
    e.target.classList.toggle("green");
    e.target.classList.toggle("checked");
    starsNum += 1;
  } else if (e.target.id == "addReview") {
    document.getElementById("review").classList.add("hidden");
    document.getElementById("main").innerHTML = renderCards();
    document.getElementById("outro").classList.remove("hidden");
  } else if (e.target.id == "closeBtn") {
    document.getElementById("discountPopUp").classList.add("hidden");
  } else if (e.target.id == "close") {
    document.getElementById("discountWindow").classList.add("hidden");
    document.getElementById("discount").classList.remove("hidden");
    document.getElementById("linzy").classList.remove("hidden");
  } else if (e.target.id == "modal-close-btn") {
    document.getElementById("formParent").classList.add("hidden");
  } else if (e.target.id == "close10") {
    document.getElementById("discountWindow10").classList.add("hidden");
    document.getElementById("discount").classList.remove("hidden");
    document.getElementById("linzy").classList.remove("hidden");
  }
  e.preventDefault();
});

function submitForm() {
  const formData = new FormData(formEl);
  let clientName = formData.get("clientName");
  client = clientName;
  if (clientName) {
    document.getElementById("formParent").classList.add("hidden");
    document.getElementById("modal-pop").classList.add("hidden");
    document.getElementById("res").classList.add("hidden");
    document.getElementById("happyClient").textContent = clientName;
    document.getElementById("review").classList.remove("hidden");
  }
}

function handleCompleteProcess() {
  console.log("Hell!");
  let form = "";
  let totalPricy = getTotal(total);

  document.getElementById("main").innerHTML = renderCards();
  document.getElementById("totalPrice").innerHTML = `$${totalPricy}`;
  document.getElementById("formParent").classList.remove("hidden");
  document.getElementById("modal-pop").classList.remove("hidden");
  document.getElementById("res").classList.remove("hidden");
}

function handleRemoveItem(itemId) {
  let priceAfterDiscount = 0;

  for (let i = 0; i < orders.length; i++) {
    if (orders[i].id == itemId) {
      let idx = orders.indexOf(orders[i]);
      orders.splice(idx, 1);
      total.splice(idx, 1);

      break;
    }
  }

  let totalPricy = getTotal(total);
  let finalPricy = discount(orders, totalPricy);
  console.log(finalPricy);
  if (finalPricy > 0) {
    priceAfterDiscount = totalPricy - finalPricy;
  }

  document.getElementById("main").innerHTML = renderCards();
  document.getElementById(
    "totalPriceDiscount"
  ).innerHTML = `$${priceAfterDiscount}`;
  document.getElementById("totalPrice").innerHTML = `$${totalPricy}`;
  document.getElementById("modal-pop").classList.remove("hidden");
  document.getElementById("res").classList.remove("hidden");
  if (orders.length == 0) {
    document.getElementById("modal-pop").classList.add("hidden");
    document.getElementById("res").classList.add("hidden");
  }
}
function handleAddItem(itemId) {
  let priceAfterDiscount = 0;
  let selectItem = menuArray.filter(function (ele) {
    if (ele.id == itemId) {
      total.push(ele.price);
      return ele;
    }
  })[0];
  orders.push(selectItem);

  let totalPricy = getTotal(total);

  let finalPricy = discount(orders, totalPricy);
  console.log(finalPricy);
  if (finalPricy > 0) {
    priceAfterDiscount = totalPricy - finalPricy;
  }

  document.getElementById("main").innerHTML = renderCards();
  document.getElementById(
    "totalPriceDiscount"
  ).innerHTML = `$${priceAfterDiscount}`;
  document.getElementById("totalPrice").innerHTML = `$${totalPricy}`;
  document.getElementById("modal-pop").classList.remove("hidden");
  document.getElementById("res").classList.remove("hidden");
}

function renderCards() {
  let cardsHTML = ``;
  let marg = "";
  let pic = "";
  let addIconHam = "";
  menuArray.forEach((element) => {
    if (element.name === "Pizza") {
      marg = "margin-lef";
      pic = "imgMargin";
      addIconHam = "addIconPizza";
    } else if (element.name == "Hamburger") {
      addIconHam = "addIconHamburger";
    } else if (element.name == "Beer") {
      addIconHam = "addIconBeer";
    } else {
      marg = "margin";
      pic = "";
      addIconHam = "";
    }

    cardsHTML += `
          <div class="card">
            <div class="firstTwo">
              <div><img class="iconImg ${pic}" src="./images/${element.emoji}.png" alt="" /></div>
              <div class="${marg}">
                <h3 class="marg">${element.name}</h3>
                <p >${element.ingredients}</p>
                <h3>$${element.price}</h3>
              </div>
            </div>
            <div class="icon"><i class="fa fa-plus-circle fa-2x ${addIconHam}"data-addicon="${element.id}" ></i></div>
          </div>
          <hr class="linz ">

          
      
          `;
  });
  let lists = renderOrder(orders);
  let starsRes = "";
  for (let index = 0; index < 5; index++) {
    if (index < starsNum) {
      starsRes += ` <span class="fa fa-star fa-2x checked"></span>`;
    } else {
      starsRes += ` <span class="fa fa-star fa-2x "></span>`;
    }
  }
  document.getElementById("stars-res").innerHTML = starsRes;

  console.log(starsRes);

  let discount = "";
  discount = `
    <hr   id ="linzy"class="linz hidden">
    <div  class="flexy hidden" id="discount">
    <div>Total price after discount:</div>
    <div id="totalPriceDiscount">$</div>
  </div>`;

  cardsHTML += `
      <br>

      <div class="hidden"  id="modal-pop">

        <h3 id="hidden">Your order</h3>
        ${lists}
      </div>
          `;
  cardsHTML += `

  <div id="res" class=" hidden">
    <hr   id ="line"class="linz ">
    <div  class="flexy " id="total">
      <div>Total price:</div>
      <div id="totalPrice">$</div>
    </div>
    ${discount}
  <button id="complete" class="complete">Complete order</button>

  </div>
  `;

  return cardsHTML;
}

function render() {
  document.getElementById("main").innerHTML += renderCards();
}
render();

function renderOrder(orders) {
  let lists = "";
  orders.forEach(function (orderEl) {
    lists += `
  
        <div class="flexy">
            <div>${orderEl.name} <span data-remove="${orderEl.id}" class ="remove">remove</span></div>
            <div>$${orderEl.price}</div>
        </div>
    
    `;
  });
  return lists;
}
function getTotal(orders) {
  let tot = 0;
  for (let index = 0; index < orders.length; index++) {
    tot += orders[index];
  }
  return tot;
}
function discount(orders, total) {
  if (orders.length >= 3) {
    console.log(total);
    console.log("You have 15% discount!");
    // document.getElementById("discount").classList.remove("hidden");

    document.getElementById("discountWindow").classList.remove("hidden");
    let finalPrice = total * (15 / 100);
    console.log(finalPrice);
    // total = total - finalPrice;
    // document.getElementById("totalPriceDiscount").innerHTML = `$${finalPrice}`;
    return finalPrice.toFixed(2);
  } else if (orders.length == 2) {
    let items = [];
    orders.forEach(function (ele) {
      items.push(ele.name);
    });
    if (
      (items.includes("Pizza") && items.includes("Beer")) ||
      (items.includes("Hamburger") && items.includes("Beer"))
    ) {
      console.log("You have 10% discount");

      document.getElementById("discountWindow10").classList.remove("hidden");

      let finalPrice = total * (10 / 100);

      return finalPrice.toFixed(2);
    }
  } else {
    return;
  }
}
