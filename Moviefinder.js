const API_URL = "http://www.omdbapi.com/?apikey=55274b33&i=";
const API_URL_SEARCH = "http://www.omdbapi.com/?apikey=55274b33&s="; // Use the same key for both URLs
var search_input = document.getElementById("search-input");
var cards = document.getElementsByClassName("movie-cards")[0];

document.getElementsByClassName("search")[0].addEventListener("click", function() {
    const query = search_input.value;
    if (query) {
        getmovies(API_URL_SEARCH + query);
    }
});

async function getmovies(url) {
    try {
        const resp = await fetch(url);
        const respdata = await resp.json();
        if (respdata.Response === "True") {
            showmovies(respdata.Search);
        } else {
            console.error(respdata.Error);
        }
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

function showmovies(movies) {
    cards.innerHTML = "";
    movies.forEach(async function(movie) {
        const moviedata = await fetch(API_URL + movie.imdbID);
        const moviedataobj = await moviedata.json();
        moviedisplay(moviedataobj);
    });
}

function moviedisplay(imovie) {
    const movieelm = document.createElement("div");
    movieelm.classList.add("movie-card");
    movieelm.innerHTML = `
        <div class="card">
          <img src="${imovie.Poster}" alt="Poster" width="300px" height="300px"/>
          <br>
          <div class="movie-description">
            <span class="movie-title"><b>Title</b><span class="value">${imovie.Title}</span></span>
            <span class="movie-title"><b>Rating</b><span class="value">${imovie.imdbRating}</span></span>
            <span class="movie-title"><b>Director</b><span class="value">${imovie.Director}</span></span>
            <span class="movie-title"><b>Released Date</b><span class="value">${imovie.Released}</span></span>
            <span class="movie-title"><b>Genre</b><span class="value">${imovie.Genre}</span></span>
          </div>
        </div>
    `;
    cards.appendChild(movieelm);
}