const color = document.getElementById("color");
const e = document.getElementById("drop-down");
const colorDiv = document.getElementById("color-section");
const colorValue = document.getElementById("color-value");
let html = "";
let htmlColorValue = "";
let placeholder = [];
render();
document.getElementById("get-color").addEventListener("click", function () {
  var option = e.options[e.selectedIndex].value;

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${color.value.slice(
      1
    )}&mode=${option}`
  )
    .then((res) => res.json())
    .then((data) => {
      html = "";
      htmlColorValue = "";
      const colors = data.colors;
      colors.forEach((el) => {
        const newColor = el.hex.value;
        console.log(el.hex.value);
        html += `
        <div class="colors" style="background:${newColor}">
            <div class="content">
                <h3 class="value">${newColor}</h3>
            </div>
        </div>`;
      });
      colorDiv.innerHTML = html;
    });
});
function render() {
  fetch(`https://www.thecolorapi.com/scheme?hex=F55A5A&mode=monochrome`)
    .then((res) => res.json())
    .then((data) => {
      placeholder = data.colors;
      placeholder.forEach((el) => {
        const newColor = el.hex.value;
        console.log(el.hex.value);
        html += `<div class="colors" style="background:${newColor}">

        <div class="content">
        <h3 class="value"  >${newColor}</h3> <br>
        <textarea style="visibility: hidden;" id="copyTextarea" focused></textarea>

    </div>
        </div>`;
      });
      colorDiv.innerHTML = html;
    });
}
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("colors")) {
    let copied = "";
    console.log();
    let copyText = e.target.style.backgroundColor;
    console.log(typeof e.target.style.backgroundColor);

    var copy = document.getElementById("copyTextarea");

    copy.value = copyText;

    copy.select();
    copy.setSelectionRange(0, 99999);

    // copy to the clipboard
    document.execCommand("copy");
    navigator.clipboard.writeText(copy.value);
    copied += `
    <br>
    <div id="box">Copied the text: ${copyText}</div>
    `;

    colorDiv.innerHTML += copied;

    setTimeout(() => {
      colorDiv.innerHTML = html;
    }, 1500);
  }
});
