const form = document.getElementById("form");
const filmName = document.getElementById("film-name");
let films = [];
let filmsID = [];
let selectedMovies = getFilms();
let allFilms = [];
let result = [];
let html = "";
let contentPlaceHolder = document.getElementById("content");



document.addEventListener("submit", function (e) {
  html = "";

  allFilms = [];
  fetch(`https://www.omdbapi.com/?apikey=4d8a6d37&s=${filmName.value}`)
   .then(res=>{
     if(res.ok){
      return  res.json()
     }
     throw new Error();


   })
    .then((data) => {
        films = data.Search;
        localStorageFilms = getFilms();
       
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
    let icon = '';
    fetch(`https://www.omdbapi.com/?apikey=4d8a6d37&i=${element}`)

      .then((res) =>res.json())
      .then((data) => {

          allFilms.push(data);
          if(check(selectedMovies,data.imdbID)){

            icon = `<span id="${data.imdbVotes}" class="imdbVotes"> <i class="fas fa-minus-circle"></i> Remove </span>`
          }
          else{
            icon = `<i class="fas fa-plus-circle"></i> Add to watchlist`
          }
   
          html += `
          <div class="movie">
              <img class="poster" src="${data.Poster}">
              <div class"movie-data">
                  <h3 >${data.Title}     <i class="fas fa-star star"></i> ${data.imdbRating}</h3>
                  <div class="movies-info">
                      <p>${data.Runtime}</p>
                      <p>  ${data.Genre}</p>
                      <p id=""><a id="${data.imdbID}" class="watchlist-add">${icon}</a></p>
                  </div>
                </p>
                  <p class="plot">${data.Plot}</p>
              </div>
          </div>
          `;
        
          contentPlaceHolder.innerHTML = html
         
       
        })
      })

  }

  // 

document.addEventListener("click", function (e) {

  for (const element of allFilms) {
    var found = false;

    if(element.imdbID == e.target.id ){

      for(var i = 0; i < selectedMovies.length; i++) {
          if (selectedMovies[i].imdbID == element.imdbID) {
              found = true;
              break;
          }
      }
      if(!found){
        selectedMovies.push(element)
        storeFilms(element)
      }

     
      document.getElementById(`${element.imdbID}`).innerHTML = `<span id="${element.imdbVotes}" class="imdbVotes"><i class="fas fa-minus-circle" aria-hidden="true"></i> Remove</span>`;
      document.getElementById(`${element.imdbID}`).style.disabled = "true"

    }
    else if(e.target.classList.contains("imdbVotes")){
    
      const indexOfObject = selectedMovies.findIndex(object => {
        return object.imdbVotes ===  e.target.id;
      });
      console.log(selectedMovies)

      selectedMovies.splice(indexOfObject, 1);
      console.log(selectedMovies)
      console.log(e.target.id)


      localStorage.setItem("filmsData", JSON.stringify(selectedMovies));
      classKeyword = ""
      e.target.classList.remove("imdbVotes")
      e.target.innerHTML = `<i class="fas fa-plus-circle"></i> Add to watch list </a>`;
      break
      
    } 
  }

});


function check(selected, id){
    let found = false
  for(var i = 0; i < selected.length; i++) {
    if (selectedMovies[i].imdbID == id) {
        found = true;
        break;
    }
}
return found
}
function storeFilms(newFilm) {
  let filmsData;
  
  if (localStorage.getItem("filmsData") === null) {
    filmsData = [];
  } else {
    filmsData = JSON.parse(localStorage.getItem("filmsData"));
  }
  if(filmsData.includes(newFilm)){
  }
  else{
    filmsData.push(newFilm);

  }
  localStorage.setItem("filmsData", JSON.stringify(filmsData));
}

function getFilms() {
  let filmsData =[];
  if (localStorage.getItem("filmsData") === null) {
    window.localStorage.setItem("filmsData", JSON.stringify(filmsData));
  } else {
      filmsData = JSON.parse(localStorage.getItem("filmsData"));
  }
  return filmsData;
}
