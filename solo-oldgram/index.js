import { posts } from "/data.js";

let ids = ["likesVanBtn", "likesGustaveBtn", "likesDucreuxBtn"];
let double = ["likesVanDouble", "likesGustaveDouble", "likesDucreuxDouble"];
let classes = ["vincey1853", "gus1819", "jd1735"];

render();
function render() {
  document.getElementById("main-el").innerHTML = firstRender();
  addEventsClick();
  addDoubleEvent(double);
}

//Rendering
function firstRender() {
  let content = ``;

  posts.forEach(function (post, index) {
    let liked = "";
    if (post.isLiked) {
      liked = "heart";
    }

    content += `
    <section class="card">
            <div class="card-intro">
              <img class="avatar" src="${post.avatar}" />
              <div>
                <h3 class="main-name">${post.name}</h3>
                <p>${post.location}</p>
              </div>
            </div>
            <div class="end">
              <div class="main-img">
                <img
                data-dblClick = "${post.uuid}"
                  class="${classes[index]} "
                  id="${double[index]}"
                  src="${post.post}"
                  alt=""
                  
                />
                <span id="span" class="first"></span>
              </div>
              <div class="img-row">
              <i   
              id="${ids[index]}"
              class="fa-regular fa-heart fa-2x ${classes[index]} ${liked}"data-like = "${post.uuid}"
              ></i>
                
                <i class="fa-regular fa-comment fa-2x"></i>
                <i class="fa-regular fa-paper-plane fa-2x"></i>
              </div>
              <h3 class="likes-count">${post.likes} likes</h3>
  
              <p class="prof-comment">
                <span class="user-name">${post.username}</span> ${post.comment}
              </p>
            </div>
          </section>
    
    `;
  });

  return content;
}

function addEventsClick() {
  for (let index = 0; index < posts.length; index++) {
    document
      .getElementById(`${ids[index]}`)
      .addEventListener("click", function (e) {
        let like = e.target.dataset.like;
        selectedItem(like);
        // picClickEffect(e);
      });
  }
}

function addDoubleEvent(id) {
  for (let index = 0; index < posts.length; index++) {
    document
      .getElementById(`${id[index]}`)
      .addEventListener("click", function (e) {
        let efect = e.target.dataset.dblclick;
        selectedItem(efect);
      });
  }
}

function selectedItem(dataItem) {
  const targetUnit = posts.filter(function (post) {
    return post.uuid === dataItem;
  })[0];
  if (targetUnit.isLiked) {
    targetUnit.likes--;
  } else {
    targetUnit.likes++;
  }
  targetUnit.isLiked = !targetUnit.isLiked;

  render();
}
