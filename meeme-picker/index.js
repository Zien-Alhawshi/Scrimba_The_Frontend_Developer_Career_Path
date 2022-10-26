import {catsData} from '/data.js'
const emotionsRadio = document.getElementById("emotion-radios")
const getImage = document.getElementById("get-image-btn")
const isGif = document.getElementById("gifs-only-option")
const memeModal = document.getElementById("meme-modal")
const memeModalInner = document.getElementById("meme-modal-inner")
// const modelCloseBtn = document.getElementById("meme-modal-close-btn")
const randomBtn = document.getElementById("randomOption")
const main = document.getElementById("main")


// When the user clicks anywhere outside of the modal, close it


getImage.addEventListener("click", renderCat)
// modelCloseBtn.addEventListener("click", function(){
//             memeModal.style.display = "none"

// })

//Test

function getMatchingCatsArray(){
            const randomChecked = randomBtn.checked
            if(randomChecked){
                return catsData
            }

    if(document.querySelector('input[type="radio"]:checked')){
        const checkedBtnValue = document.querySelector('input[type="radio"]:checked').value
        const isGif2 = isGif.checked 
        console.log(isGif2)
        const matchedCats = catsData.filter(function(cat){
            if(cat.emotionTags.includes(checkedBtnValue)){
                if(isGif2){
                    return cat.emotionTags.includes(checkedBtnValue) && cat.isGif
                }
                else{
                      return cat.emotionTags.includes(checkedBtnValue)
                }
            }
           
        })
     
        return matchedCats

    }
    
}
function getSingleCat(){
    const singleCat = getMatchingCatsArray()
    if(singleCat.length ===1 ){
        return singleCat[0]
    }
    else{
        const rand = Math.floor(Math.random()*singleCat.length)
        return singleCat[rand]
    }
}
function renderCat(){
    const catObject1 = getSingleCat();
   

console.log(catObject1)

     
     memeModalInner.innerHTML += `
     <img 
        class="cat-img" 
        src="./images/${catObject1.image}"
        alt="${catObject1.alt}"
        >
        `


    
        memeModal.style.display = "flex"
        window.onclick = function(event) {
  if (event.target === main) {
    memeModal.style.display = "none";
  }
}
        
}

emotionsRadio.addEventListener("change", function(e){
    console.log(e.target.id)
    const radioArray = document.getElementsByClassName("radio")
    for(let el of radioArray){
        el.classList.remove("highlight")
    }
    document.getElementById(e.target.id).parentElement.classList.add("highlight")
})



function getEmotionsArray(cats){
    const emtions = []
    for(let cat of cats){
        for (let emotionTag of cat.emotionTags){
                if(!emtions.includes(emotionTag))
                    emtions.push(emotionTag)

        }
    }
    return emtions
}
function renderEmotionsRadios(cats){
    const emotions = getEmotionsArray(cats)
    // console.log(emotions)
    let emotionsEl = "";
    for(let i=0; i< emotions.length; i++){
        emotionsEl += `
        <div class="radio">
        <label for = "${emotions[i]}">${emotions[i]}</label>
        <input name="radio" type ="radio" id = "${emotions[i]}" value  ="${emotions[i]}" aria-label="radio-button">
        </div>
        `
    }
    emotionsRadio.innerHTML = emotionsEl
    
    
}
renderEmotionsRadios(catsData)