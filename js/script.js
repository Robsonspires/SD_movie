const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=';
const API_URL_BR = 'https://api.themoviedb.org/3/discover/movie?language=pt-BR&sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const SEARCH_API_BR = 'https://api.themoviedb.org/3/search/movie?language=pt-BR&api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

async function getMovies(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data.results;
    } catch (error) {
        console.log(error);
    }
}

async function displayMovies(url) {
    const movies = await getMovies(url);
    main.innerHTML = '';
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;
        console.log(movie);
        const movieEL = document.createElement('div');
        var narrativa = overview.length;
        movieEL.classList.add('movie');
        if (narrativa > 0) {
            movieEL.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}" >
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Narrativa</h3>
                ${overview}
            </div>
        `;
        } else {
            movieEL.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}" >
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Narrativa</h3>
                <br>Sem Informação em português. :(
            </div>
        `;
        };
        main.appendChild(movieEL);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red'
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    var searchTerm = search.value;
    var idioma = searchTerm.substring(0, 3).toLowerCase();
    var tamanho = searchTerm.length;

    if (idioma == 'en ') {
        searchTerm = searchTerm.substring(3, tamanho);
        if (searchTerm && searchTerm !== '') {
            displayMovies(SEARCH_API + searchTerm);
            search.value = '';
        } else {
            displayMovies(API_URL);
        }
    } else {

        if (searchTerm && searchTerm !== '') {
            displayMovies(SEARCH_API_BR + searchTerm);
            search.value = '';
        } else {
            displayMovies(API_URL_BR);
        }
    }
});

displayMovies(API_URL_BR);
