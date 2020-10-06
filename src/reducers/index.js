import { combineReducers } from 'redux';
import homeReducer from './home_reducer';
import movieReducer from './movie_reducer';

const rootReducer = combineReducers([
    homeReducer,
    movieReducer
]);

export default rootReducer;