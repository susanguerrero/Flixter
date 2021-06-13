//REMOVE API BEFORE PUBLISHING 

// Global Constants
const apiKey = ""; 
const pageSize = "9";

// global variables
var currentApiPage = 0;
var currentSearchTerm = "";

//page elements
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const posterArea = document.querySelector(".moviePosters");
const showMoreBtn = document.querySelector("#show-more-btn");

// const searchForm = document.getElementById('search-form');

const searchSection = document.getElementById('search-section');

const searchMovieSection = document.getElementById('movie-section');


// get search results from API 
window.onload = getResults;

async function getResults() {
  let response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
  );
  let jsonResponse = await response.json();
  let movieResponse = jsonResponse.results;

  movieResponse.forEach((element) => displayResults(element));
}
//display the results from API
function displayResults(movieData) {
  let imagePath = movieData.poster_path;
  urlOfPoster = `https://image.tmdb.org/t/p/w500/${imagePath}`;
  posterArea.innerHTML += `<div class = "single">
  <img src="${urlOfPoster}" alt="${movieData.title}"></img>
  <div class = "movieInfo">
    <h4>${movieData.title}</h4>
    <div id = "rating">
      <p>  ⭐️ ${movieData.vote_average}</p>
</div>`;
}


//Show Me More Button 
async function loadMore(element){
  
    currentApiPage++;
    let apiURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1` + currentApiPage;

    let response = await fetch(apiURL);
    let movieResponse = await response.json();
    let data = movieResponse.results;    

    let movies = movieResponse.results.map(element => ({
        id: element.id,
        title: element.title,
        poster_path: element.poster_path,
        vote_average: element.vote_average
        }))

    movies.forEach(element => {
        displayResults(element);
    });  
}
searchInput.value = ``;
currentApiPage++;

showMoreBtn.addEventListener('click', loadMore);


//search function
async function submitSearchForm(event) {

  currentApiPage ++;
  posterArea.innerHTML = "";

  event.preventDefault();

  currentSearchTerm = searchInput.value;
  const results = await searchResults(currentSearchTerm);

}
async function searchResults(searchTerm) {
  currentApiPage = 1;
  currentSearchTerm = searchTerm;
  
  let response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${currentSearchTerm}&page=${currentApiPage}`
  );
  let jsonResponse = await response.json();
  let movieResponse = jsonResponse.results;

  movieResponse.forEach((element) => displayResults(element));
}

searchForm.addEventListener("submit", submitSearchForm);

