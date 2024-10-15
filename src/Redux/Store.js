import { createStore, combineReducers } from 'redux';
import movieReducer from '../reducers/movieReducer';
import authReducer from '../reducers/authReducer';
const rootReducer = combineReducers({
  movies: movieReducer,
  auth: authReducer,
});

const store = createStore(rootReducer);

export default store;
