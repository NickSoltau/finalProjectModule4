const movieFormat = document.querySelector('.movies');
let moviesData = [];

function getValue() {
  const userSearch = document.querySelector('#search__input').value;

  const loading = document.querySelector(' .loading__state');
loading.classList += " loading__state--visible";
setTimeout (() =>{
    loading.classList.remove ("loading__state--visible")
}, 1000);
  
  // Reset dropdowns to their default state
  const sortOrder = document.getElementById('sort_order');
  if (sortOrder) sortOrder.selectedIndex = 0;
  
  const filterType = document.getElementById('filter_type');
  if (filterType) filterType.selectedIndex = 0;

  async function movieRequest() {
    const request = await fetch(`http://www.omdbapi.com/?s=${userSearch}&apikey=7cddbfc`);
    const requestData = await request.json();
    if (requestData.Search) {
      moviesData = requestData.Search;
      updateMovies();
    }
  }
  movieRequest();
}

function renderMovies(movies) {
  movieFormat.innerHTML = movies.map((elem) =>
    `<div class="movie">
      <figure class="movie__poster">
        <img src="${elem.Poster}" class="movie__poster--image" alt="movie_poster">
      </figure>
      <div class="movie__info">
        <h3 class="movie__title">${elem.Title}</h3>
        <h4 class="movie__release--date">Released: ${elem.Year}</h4>
        <h4 class="movie__type">Type: ${elem.Type}</h4>
        <h4 class="movie__imdb">IMDB #: ${elem.imdbID}</h4>
      </div>
    </div>`
  ).join('');
}

function pressEnter(event) {
  if (event.key === 'Enter') {
    getValue();
  }
}

function updateMovies() {
  const sortOption = document.getElementById('sort_order').value;
  const filterOption = document.getElementById('filter_type').value;

  let filteredMovies = [...moviesData];

  if (filterOption) {
    filteredMovies = filteredMovies.filter(movie => movie.Type === filterOption);
  }

  if (sortOption === 'title_asc') {
    filteredMovies.sort((a, b) => a.Title.localeCompare(b.Title));
  } else if (sortOption === 'title_desc') {
    filteredMovies.sort((a, b) => b.Title.localeCompare(a.Title));
  } else if (sortOption === 'release__date--asc') {
    filteredMovies.sort((a, b) => a.Year - b.Year);
  } else if (sortOption === 'release__date--desc') {
    filteredMovies.sort((a, b) => b.Year - a.Year);
  }

  renderMovies(filteredMovies);
}

// This function is being kept for now to avoid breaking any existing calls, but it is not used in the new filtering logic.
function filterChange(event) {
  updateMovies();
}
// loading state 

/*
const loading = document.querySelector(' .loading__state');
loading.classList += " loading__state--visible";
setTimeout (() =>{
    loading.classList.remove ("loading__state--visible")
}, 1000);
*/
