let postArray = [];
const titleInput = document.getElementById("post-title");
const bodyInput = document.getElementById("post-body");
const form = document.getElementById("new-post");

function renderPosts(postArray) {
  let html = "";
  for (let post of postArray) {
    html += `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <hr />

        `;
  }
  document.getElementById("blog-list").innerHTML = html;
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
  .then((response) => response.json())
  .then((data) => {
    postArray = data.slice(0, 5);
    renderPosts(postArray);
  });
form.addEventListener("submit", function (e) {
  const postTitle = titleInput.value;
  const postBody = bodyInput.value;
  const data = {
    title: postTitle,
    body: postBody,
  };
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
    .then((res) => res.json())
    .then((post) => {
      console.log(post);
      postArray.unshift(post);
      form.reset();
      renderPosts(postArray);
    });
  e.preventDefault();
});
