const { SHOW_LOADING_SPINNER, CLEAR_MOVIES, SEARCH_FOR_MOVIES, GET_POPULAR_MOVIES, RENDER_MORE_MOVIES } = require("../actions");

import {
    SHOW_LOADING_SPINNER,
    CLEAR_MOVIES,
    SEARCH_FOR_MOVIES,
    GET_POPULAR_MOVIES,
    RENDER_MORE_MOVIES
} from '../actions';

const defaultState = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: ''
};

export default function(state = defaultState, action) {
    switch(action.type) {
        case GET_POPULAR_MOVIES:
            return {
                ...state,
                movies: action.payload.results,
                heroImage: state.heroImage || action.payload.results[0],
                loading: false,
                currentPage: action.payload.page,
                totalPages: action.payload.total_pages,
                searchTerm: ''
            }
        case RENDER_MORE_MOVIES:
            return {
                ...state,
                movies: [...state.movies, ...action.payload.results],
                loading: false,
                currentPage: action.payload.page,
                totalPages: action.payload.total_pages
            }
        case SEARCH_FOR_MOVIES:
            return {
                ...state,
                movies: action.payload.results,
                loading: false,
                currentPage: action.payload.page,
                totalPages: action.payload.total_pages,
                searchTerm: action.payload.searchTerm
            }
        case CLEAR_MOVIES:
            return {
                ...state,
                moves: []
            }
        case SHOW_LOADING_SPINNER:
            return {
                ...state,
                loading: true
            }
    }
}