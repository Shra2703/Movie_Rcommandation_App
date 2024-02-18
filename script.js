
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

function populateGenreDropdow(genresObj){
    const select = document.getElementById("genres");
    // console.log(genresObj);
    for(const genreItem of genresObj){
        let option = document.createElement("option");
        option.value = genreItem.id;
        option.text = genreItem.name;
        select.appendChild(option)
        console.log(genreItem)
    }
}

getGeneres();

