
import {
    SHOW_LOADING_SPINNER,
    CLEAR_MOVIE,
    GET_MOVIE,
    SET_MOVIE_PERSISTED_STATE
} from '../actions';

const defaultState = {
    movie: null, 
    actors: null,
    directors: [],
    loading: false
};

export default function(state = defaultState, action) {
    switch(action.type) {
        case GET_MOVIE:
            return {
                ...state,
                movie: action.payload.movie,
                actors: action.payload.actors,
                directors: action.payload.directors,
                loading: false
            }
        case CLEAR_MOVIE:
            return {
                ...state,
                movie: null,
                actors: null,
                directors: []
            }
        case SHOW_LOADING_SPINNER:
            return {
                ...state,
                loading: true
            }
        case SET_MOVIE_PERSISTED_STATE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}