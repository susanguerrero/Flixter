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

// get search results from API 
window.onload = getResults;

async function getResults() {
  let response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
  );
  let jsonResponse = await response.json();
  let responseData = jsonResponse.results;

  responseData.forEach((el) => displayResults(el));
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

    currentApiPage++;

    let response = await fetch(apiURL);
    let responseData = await response.json();
    let data = responseData.results;    

    let movies = responseData.results.map(element => ({
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


