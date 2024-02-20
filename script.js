const playBtn = document.getElementById("playBtn");
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
function populateGenreDropdow(genresObj){
    const select = document.getElementById("genres");
    // console.log(genresObj);
    for(const genreItem of genresObj){
        let option = document.createElement("option");
        option.value = genreItem.id;
        option.text = genreItem.name;
        select.appendChild(option);
        // console.log(genreItem)
    }
}

function showRandomMovie(){
    const movieInfo = document.getElementById("movieInfo");
    console.log(movieInfo.childNodes);
    getMovies();

}

// function to get the movies when the gdropdown is clicked
function getMovies(){
    const selectedGenre = getSlectedGenre();
    // console.log(selectedGenre);
    const urlToFetch = `https://api.themoviedb.org/3/discover/movie?api_key=2735099ea2587a2d66c564ef37de1d3b&with_genres=${selectedGenre}`;
    console.log(urlToFetch);
    const xhr = new XMLHttpRequest();
    xhr.open("GET", urlToFetch, true);
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4 && xhr.status === 200) {
            const jsonResponse = JSON.parse(this.responseText);
            const randomMovie = getRandomMovies(jsonResponse.results);
            getMovieInfo(randomMovie);
            console.log(randomMovie)
        }
    }
    xhr.send();

}

// function to get the selcted genre
function getSlectedGenre(){
    const selectedGenre = document.getElementById("genres").value;
    return selectedGenre;
}

// function to get the random movie of that particular genre
function getRandomMovies(movies){
    const randomIndex = Math.floor(Math.random() * movies.length);

    const randomMovie = movies[randomIndex];
    return randomMovie;
}


function getMovieInfo(randomMovie){
    console.log(randomMovie.title)
}



getGeneres();
// playBtn.onclick = showRandomMovie;
playBtn.addEventListener("click", showRandomMovie)


