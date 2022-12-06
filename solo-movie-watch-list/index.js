const form = document.getElementById("form");
const filmName = document.getElementById("film-name");
let films = [];
let filmsID = [];
let selectedMovies = [];
let allFilms = [];
let result = [];
let html = "";
let contentPlaceHolder = document.getElementById("content");

document.addEventListener("submit", function (e) {
  html = "";

  allFilms = [];
  fetch(`http://www.omdbapi.com/?apikey=4d8a6d37&s=${filmName.value}`)
   .then(res=>{
     if(res.ok){
      return  res.json()
     }
     throw new Error();


   })
    .then((data) => {
      console.log(data)
        films = data.Search;
        filmsID = films.map((item) => {
          return item.imdbID;
        })
        renderFilms(filmsID)
      })
      .catch(() => {
        contentPlaceHolder.innerHTML = `
        <div class="watchlist-content">
          <p class="lighter ligther-search">Unable to find what you’re looking for. Please try another search.</p>
        </div>

        `;
      });
      filmName.value = ""
      e.preventDefault();

  
    })
 
  
function renderFilms(filmsID){
  filmsID.forEach((element) => {
    fetch(`http://www.omdbapi.com/?apikey=4d8a6d37&i=${element}`)

      .then((res) =>res.json())
      .then((data) => {
        
          console.log(data);
          allFilms.push(data);

          html += `
          <div class="movie">
              <img class="poster" src="${data.Poster}">
              <div class"movie-data">
                  <h3 >${data.Title}     <i class="fas fa-star star"></i> ${data.imdbRating}</h3>
                  <div class="movies-info">
                      <p>${data.Runtime}</p>
                      <p>  ${data.Genre}</p>
                      <p id="">
                      <a id="${data.imdbID}" class="watchlist-add"> <i class="fas fa-plus-circle"></i> Watchlist</a></p>
                  </div>
                </p>
                  <p class="plot">${data.Plot}</p>
              </div>
          </div>
          `;
        
        contentPlaceHolder.innerHTML = html;


      })
      
    

  });
}



document.addEventListener("click", function (e) {

  allFilms.forEach((element) => {
    if(element.imdbID == e.target.id ){
      if(!selectedMovies.includes(element)){
        storeFilms(element)

      }
      document.getElementById(`${element.imdbID}`).innerHTML = `<i class="fa fa-check-circle" aria-hidden="true"></i>Added</a>`;
      document.getElementById(`${element.imdbID}`).style.disabled = "true"

    }

  });

});



function storeFilms(newFilm) {
  let filmsData;
  if (localStorage.getItem("filmsData") === null) {
    filmsData = [];
  } else {
    filmsData = JSON.parse(localStorage.getItem("filmsData"));
  }
  filmsData.push(newFilm);
  localStorage.setItem("filmsData", JSON.stringify(filmsData));
}
