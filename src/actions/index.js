import { API_URL, API_KEY } from '../config';

// Action types for Home
export const GET_POPULAR_MOVIES = 'GET_POPULAR_MOVIES';
export const SEARCH_FOR_MOVIES = 'SEARCH_FOR_MOVIES';
export const RENDER_MORE_MOVIES = 'RENDER_MORE_MOVIES';
export const CLEAR_MOVIES = 'CLEAR_MOVIES';

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

// Action creator for both 

export function showLoadingSpinner() {
    return {
        type: SHOW_LOADING_SPINNER,
        payload: null
    }
}