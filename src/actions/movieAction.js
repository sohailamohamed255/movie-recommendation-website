import axios from 'axios';

export const setMovies = (searchTerm) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}`
    );
    dispatch({
      type: 'SET_MOVIES',
      payload: response.data.results,
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};
