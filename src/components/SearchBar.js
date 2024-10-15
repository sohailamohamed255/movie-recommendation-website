import React, { useState } from 'react';
import axios from 'axios';
import MovieList from './MovieList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'; 

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [recommendations, setRecommendations] = useState([]); 
  const API_KEY = 'a7ee61998062d3404073d2279b6d9a9a'; 

  const fetchRecommendations = async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
      );
      setRecommendations(response.data.results); 
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm) {
      alert('Please enter a movie name');
      return;
    }

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}&include_adult=false&language=en-US&page=1`
      );
      const movieResults = response.data.results;
      setMovies(movieResults);

      if (movieResults.length > 0) {
        const movieId = movieResults[0].id; 
        fetchRecommendations(movieId);
      } else {
        setRecommendations([]); 
      }

    } catch (error) {
      console.error('Error fetching movies:', error);
      if (error.response && error.response.status === 401) {
        alert('Invalid API Key. Please check your API key.');
      } else {
        alert('An error occurred while fetching data.');
      }
    }
  };

  return (
    <div>
      <h2>Search for Movies</h2>
      <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: '10px' }} 
        />
        <button 
          className="btn" 
          type="submit" 
          style={{ backgroundColor: 'transparent', border: 'none', color: 'black', display: 'flex', alignItems: 'center' }} 
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} style={{ marginRight: '5px' }} /> 
        </button>
      </form>

      <h3>Search Results:</h3>
      <MovieList movies={movies} />

      {recommendations.length > 0 && ( 
        <>
          <h3>Recommended Movies:</h3>
          <MovieList movies={recommendations} />
        </>
      )}
    </div>
  );
}

export default SearchBar;

