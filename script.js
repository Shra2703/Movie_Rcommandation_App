let idOfNext = "";
let selectedMovie = "";
let randomMovie;
const playBtn = document.getElementById("playBtn");
const likeBtn = document.getElementById("likeBtn");
const backBtn = document.getElementById("back");

function getGeneres() {
  const urlToFetch =
    "https://api.themoviedb.org/3/genre/movie/list?api_key=2735099ea2587a2d66c564ef37de1d3b";
  const xhr = new XMLHttpRequest();
  xhr.open("GET", urlToFetch, true);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const jsonResponse = JSON.parse(this.responseText);
      //   console.log( jsonResponse.genres[0].id);
      //   console.log(typeof jsonResponse);
      populateGenreDropdow(jsonResponse.genres);
    }
  };
  xhr.send();
}

// populate the drop down menu
function populateGenreDropdow(genresObj) {
  const select = document.getElementById("genres");
  // console.log(genresObj);
  for (const genreItem of genresObj) {
    let option = document.createElement("option");
    option.value = genreItem.id;
    option.text = genreItem.name;
    select.appendChild(option);
    // console.log(genreItem)
  }
}

// function to clear the current movie
function clearCurrentMovie() {
  const moviePosterDiv = document.getElementById("moviePoster");
  const movieTextDiv = document.getElementById("movieText");
  moviePosterDiv.innerHTML = "";
  movieTextDiv.innerHTML = "";
  // document.getElementsByTagName("h1").innerHTML = ""
}

function showRandomMovie() {
  const movieInfo = document.getElementById("movieInfo");
  if (movieInfo.childNodes.length > 0) {
    // console.log(movieInfo.childNodes.length);
    clearCurrentMovie();
  }
  getMovies();
}

// function to get the movies when the gdropdown is clicked
function getMovies() {
  const selectedGenre = getSlectedGenre();
  // console.log(selectedGenre);
  const urlToFetch = `https://api.themoviedb.org/3/discover/movie?api_key=2735099ea2587a2d66c564ef37de1d3b&with_genres=${selectedGenre}`;
  console.log(urlToFetch);
  const xhr = new XMLHttpRequest();
  xhr.open("GET", urlToFetch, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const jsonResponse = JSON.parse(this.responseText);
      randomMovie = getRandomMovies(jsonResponse.results);
      // getMovieInfo(randomMovie);
      displayMovie(randomMovie);
      console.log(randomMovie);
    }
  };
  xhr.send();
}

// function to get the selcted genre
function getSlectedGenre() {
  const selectedGenre = document.getElementById("genres").value;
  return selectedGenre;
}

// function to get the random movie of that particular genre
function getRandomMovies(movies) {
  const randomIndex = Math.floor(Math.random() * movies.length);

  const randomMovie = movies[randomIndex];
  return randomMovie;
}

// function to display the movie
function displayMovie(movieInfo) {
  const moviePosterDiv = document.getElementById("moviePoster");
  const movieTextDiv = document.getElementById("movieText");
  // const likeBtn = document.getElementById("likeBtn");

  const moviePoster = createMoviePoster(movieInfo.poster_path);
  const titleHeader = createMovieTitle(movieInfo.original_title);
  const overviewText = createMovieOverview(movieInfo.overview);
  moviePosterDiv.appendChild(moviePoster);
  movieTextDiv.appendChild(titleHeader);
  movieTextDiv.appendChild(overviewText);
}

// function to create movie poster
function createMoviePoster(posterPath) {
  const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;
  const posterImg = document.createElement("img");
  posterImg.setAttribute("src", moviePosterUrl);
  posterImg.setAttribute("id", "moviePoster");
  return posterImg;
}

// function to create movie title
function createMovieTitle(title) {
  const titleHeader = document.createElement("h1");
  titleHeader.setAttribute("id", "movieTitle");
  titleHeader.innerHTML = title;
  return titleHeader;
}

// function to create movie description
function createMovieOverview(overview) {
  const overviewParagraph = document.createElement("p");
  overviewParagraph.setAttribute("id", "movieOverview");
  overviewParagraph.innerHTML = overview;
  return overviewParagraph;
}

// function invoked then next movie will displayed
function nextMovie() {
  backBtn.disabled = false;
  selectedMovie = randomMovie;
  clearCurrentMovie();
  showRandomMovie();
}

getGeneres();
// playBtn.onclick = showRandomMovie;
playBtn.addEventListener("click", showRandomMovie);
likeBtn.addEventListener("click", nextMovie);
// event listener for back btn
backBtn.addEventListener("click", () => {
  clearCurrentMovie();
  console.log("backbtn", selectedMovie);
  // getMovies(idOfNext);
  displayMovie(selectedMovie);
});
