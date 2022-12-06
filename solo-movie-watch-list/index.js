const form = document.getElementById("form");
const filmName = document.getElementById("film-name");
let films = [];
let filmsID = [];
let selectedMovies = [];
let allFilms = [];
let result = [];
let html = "";
let contentPlaceHolder = document.getElementById("content");
form.addEventListener("submit", function (e) {
  allFilms = [];
  fetch(`http://www.omdbapi.com/?apikey=4d8a6d37&s=${filmName.value}`)
    .then((res) => res.json())
    .then((data) => {
      films = data.Search;
      filmsID = films.map((item) => {
        return item.imdbID;
      });

      filmsID.forEach((element) => {
        fetch(`http://www.omdbapi.com/?apikey=4d8a6d37&i=${element}`)
          .then((res) => res.json())
          .then((data) => {
            if (data) {
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
                          <p> <i class="fas fa-plus-circle"></i> <a id="${data.imdbID}" class="watchlist-add">Watchlist</a></p>
                      </div>
                    </p>
                      <p class="plot">${data.Plot}</p>
                  </div>
              </div>
              `;
            } else {
              html = `
              No data
              `;
            }

            // console.log(html);
            contentPlaceHolder.innerHTML = html;
          });
      });
    });
  e.preventDefault();
});
document.addEventListener("click", function (e) {
  console.log(allFilms);
  console.log(e.target.id);
  // console.log(document.querySelector(".watching").dataset.movieID);
  // allFilms.forEach((element) => {
  //   //detect which movie is added to the watch list
  //   // console.log();
  //   // if(element.imdbID ==  ){
  //   //   selectedMovies.push(element)
  //   // }
  // });
});

//in watch list we render the movies available in selectedMovies
