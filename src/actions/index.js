import { API_URL, API_KEY } from '../config';

// Action types for Home
export const GET_POPULAR_MOVIES = 'GET_POPULAR_MOVIES';
export const SEARCH_FOR_MOVIES = 'SEARCH_FOR_MOVIES';
export const RENDER_MORE_MOVIES = 'RENDER_MORE_MOVIES';
export const CLEAR_MOVIES = 'CLEAR_MOVIES';
export const SET_POPULAR_PERSISTED_STATE = 'SET_POPULAR_PERSISTED_STATE';

// Action types for Movie
export const GET_MOVIE = 'GET_MOVIE';
export const CLEAR_MOVIE = 'CLEAR_MOVIE';
export const SET_MOVIE_PERSISTED_STATE = 'SET_MOVIE_PERSISTED_STATE';

// Action types for both Home and Movie 
export const SHOW_LOADING_SPINNER = 'SHOW_LOADING_SPINNER';

// Action creators for home

export function getPopularMovies() {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-GB&page=1`;
    const request = fetch(endpoint)
        .then(result => result.json())
        .then(result => {
            return result;
        })
        .catch(error => console.error('Error:', error));
    
    return {
        type: GET_POPULAR_MOVIES,
        payload: request
    }
}

export function searchForMovies(searchTerm) {
    let endpoint;
    if (!searchTerm) {
        endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-GB&page=1`;
      } else {
        endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-GB&query=${searchTerm}`;
      }

    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-GB&page=1`;
    const request = fetch(endpoint)
          .then(result => result.json())
          .then(result => {
              return {...result, searchTerm };
          })
          .catch(error => console.error('Error:', error));
      
    return {
      type: SEARCH_FOR_MOVIES,
      payload: request
    }
}

export function renderMoreMovies(searchTerm, currentPage) {
    let endpoint;
    if (!searchTerm) {
        endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-GB&page=${currentPage + 1}`;
      } else {
        endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-GB&query=${searchTerm}&page=${currentPage + 1}`;
      }
      const request = fetch(endpoint)
      .then(result => result.json())
      .then(result => {
          return result;
      })
      .catch(error => console.error('Error:', error));
  
    return {
        type: RENDER_MORE_MOVIES,
        payload: request
    }
}

export function clearMovies() {
    return {
        type: CLEAR_MOVIES,
        payload: null
    }
}

export function setPopularPersistedState(state) {
    return {
      type: SET_POPULAR_PERSISTED_STATE,
      payload: state
    }
}

// Action creators for movie
export function clearMovie() {
    return {
        type: CLEAR_MOVIE,
        payload: null
    }
}

export function getMovie(movieId) {
    let endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-GB`;
    let newState = {};

    const request = fetch(endpoint)
    .then(result => result.json())
    .then(result => {

      if (result.status_code) {
        // If we don't find any movie
        return newState;
      } else {
        newState = { movie: result };
        endpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        
        return fetch(endpoint)
          .then(result => result.json())
          .then(result => {

            const directors = result.crew.filter( (member) => member.job === "Director");

            newState.actors = result.cast;
            newState.directors = result.directors;
            
            return newState;
        })
      }
    })
    .catch(error => console.error('Error:', error))
    
    return {
        type: GET_MOVIE,
        payload: request
    }
  }

export function setMoviePersistedState(state) {
  return {
    type: SET_MOVIE_PERSISTED_STATE,
    payload: state
  }
}

// Action creator for both 

export function showLoadingSpinner() {
    return {
        type: SHOW_LOADING_SPINNER,
        payload: null
    }
}