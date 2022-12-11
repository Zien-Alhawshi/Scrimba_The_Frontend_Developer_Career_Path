let htmlContent = ""

 let selected = getFilms()
renderLocalStorage(selected)
console.log(selected)

document.addEventListener("click", function(e){
    console.log(e.target.id)
    if(e.target.id == ""){
        conseole.log("Hii!")
    }
    else{
        selected.forEach((element) => {
            if(element.imdbID == e.target.id ){
                const indexOfObject = selected.findIndex(object => {
                    return object.imdbID ===  e.target.id;
                  });
                  console.log(indexOfObject)
                  selected.splice(indexOfObject, 1);
                  localStorage.setItem("filmsData", JSON.stringify(selected));
                  
        
            }
            console.log(selected)
            if(selected.length >0){
                renderLocalStorage(selected)
            }
            else{
                htmlContent = `
                <p class="lighter">Your watchlist is looking a little empty...</p>
                <p><i class="fas fa-plus-circle"></i> <a href="index.html"> Let's add some movies!</a></p>
                ` 
                render(htmlContent)
            }
            
        
        e.preventDefault()
          });
          
        
    }
   

})

function getFilms() {
    let filmsData;
    if (localStorage.getItem("filmsData") === null) {
      window.localStorage.setItem("filmsData", JSON.stringify(filmsData));
    } else {
        filmsData = JSON.parse(localStorage.getItem("filmsData"));
    }
    return filmsData;
  }
  function renderLocalStorage(selected){
    htmlContent=""
    selected.forEach(data => {
        htmlContent += `
        <div class="movie">
        <img class="poster" src="${data.Poster}">
        <div class"movie-data">
            <h3 >${data.Title}     <i class="fas fa-star star"></i> ${data.imdbRating}</h3>
            <div class="movies-info">
                <p>${data.Runtime}</p>
                <p>  ${data.Genre}</p>
                <p id="">
                <a id="${data.imdbID}" class="watchlist-add"> <i class="fas fa-minus-circle"></i> Remove</a></p>
            </div>
          </p>
            <p class="plot">${data.Plot}</p>
        </div>
    </div>
        `
        
    });
    render(htmlContent)   
}
function render(htmlContent){
    document.getElementById("localStorage").innerHTML = htmlContent
    console.log(document.querySelector("header"))

}
