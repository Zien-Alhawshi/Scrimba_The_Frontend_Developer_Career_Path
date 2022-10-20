const posts = [
  {
    name: "Vincent van Gogh",
    username: "vincey1853",
    location: "Zundert, Netherlands",
    avatar: "images/avatar-vangogh.jpg",
    post: "images/post-vangogh.jpg",
    comment: "just took a few mushrooms lol",
    likes: 21,
  },
  {
    name: "Gustave Courbet",
    username: "gus1819",
    location: "Ornans, France",
    avatar: "images/avatar-courbet.jpg",
    post: "images/post-courbet.jpg",
    comment: "i'm feelin a bit stressed tbh",
    likes: 4,
  },
  {
    name: "Joseph Ducreux",
    username: "jd1735",
    location: "Paris, France",
    avatar: "images/avatar-ducreux.jpg",
    post: "images/post-ducreux.jpg",
    comment:
      "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
    likes: 152,
  },
];
let cards = document.querySelectorAll(".card");

let ids = ["likesVanBtn", "likesGustaveBtn", "likesDucreuxBtn"];
let double = ["likesVanDouble", "likesGustaveDouble", "likesDucreuxDouble"];
let classes = ["vincey1853", "gus1819", "jd1735"];
let content = "";
let mainEl = document.getElementById("main-el");
firstRender();

//Rendering
function firstRender() {
  for (let index = 0; index < posts.length; index++) {
    //   cards[index].innerHTML +=
    content += `
          <section class="card">
                  <div class="card-intro">
                    <img class="avatar" src="${posts[index].avatar}" />
                    <div>
                      <h3 class="main-name">${posts[index].name}</h3>
                      <p>${posts[index].location}</p>
                    </div>
                  </div>
                  <div class="end">
                    <div class="main-img">
                      <img
                        class="${classes[index]}"
                        id="${double[index]}"
                        src="${posts[index].post}"
                        alt=""
                      />
                      <span id="span" class="first"></span>
                    </div>
                    <div class="img-row">
                      <img
                        class="${classes[index]}"
                        id="${ids[index]}"
                        src="images/icon-heart.png"
                      />
                      <img src="images/icon-comment.png" />
                      <img src="images/icon-dm.png" />
                    </div>
                    <h3 class="likes-count">${posts[index].likes} likes</h3>
        
                    <p class="prof-comment">
                      <span class="user-name">${posts[index].username}</span> ${posts[index].comment}
                    </p>
                  </div>
                </section>
          
          `;
  }
  mainEl.innerHTML = content;
}

//likes VanGogh
const likesVanBtn = document.getElementById("likesVanBtn");
const likesVanDoubleBtn = document.getElementById("likesVanDouble");
likesVanBtn.addEventListener("click", function (e) {
  likesClick(e);
  picClickEffect(e);
});
likesVanDoubleBtn.addEventListener("dblclick", function (e) {
  likesDoubleClick(e);
  picDoubleClickEffect(e);
});

//likes Gustave
const likesGustaveBtn = document.getElementById("likesGustaveBtn");
const likesGustaveDoubleBtn = document.getElementById("likesGustaveDouble");
likesGustaveBtn.addEventListener("click", function (e) {
  likesClick(e);
  picClickEffect(e);
});
likesGustaveDoubleBtn.addEventListener("dblclick", function (e) {
  likesDoubleClick(e);
  picDoubleClickEffect(e);
});

//likes Ducreux
const likesDucreuxeBtn = document.getElementById("likesDucreuxBtn");
const likesDucreuxDoubleBtn = document.getElementById("likesDucreuxDouble");
likesDucreuxeBtn.addEventListener("click", function (e) {
  likesClick(e);
  picClickEffect(e);
});
likesDucreuxDoubleBtn.addEventListener("dblclick", function (e) {
  likesDoubleClick(e);
  picDoubleClickEffect(e);
});

//Functions likes addition!
function likesClick(e) {
  let userName = e.target.className;
  for (let index = 0; index < posts.length; index++) {
    if (userName === posts[index].username) {
      posts[index].likes += 1;
      let likesInfo = e.target.closest(".end");
      let likesCont = likesInfo && likesInfo.querySelector(".likes-count");

      likesCont.textContent = `${posts[index].likes} likes`;
    }
  }
}
function likesDoubleClick(e) {
  let userName = e.target.className;
  for (let index = 0; index < posts.length; index++) {
    if (userName === posts[index].username) {
      posts[index].likes += 1;
      let likesInfo = e.target.closest(".end");
      let likesCont = likesInfo && likesInfo.querySelector(".likes-count");

      likesCont.textContent = `${posts[index].likes} likes`;
    }
  }
}

function picClickEffect(e) {
  let spanz = e.target.closest(".img-row").previousElementSibling;
  let spanzSec = spanz.querySelector(".first");
  let imgz = spanz.querySelector("img");
  imgz.classList.add("img");
  spanzSec.classList.add("main");
  setTimeout(() => {
    spanzSec.classList.remove("main");
    imgz.classList.remove("img");
  }, 2000);
}
function picDoubleClickEffect(e) {
  let span = e.target.nextElementSibling;
  span.classList.add("main");
  e.target.classList.add("img");
  setTimeout(() => {
    e.target.classList.remove("img");
    span.classList.remove("main");
  }, 2000);
}
