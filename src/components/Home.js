import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from './MovieList';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(''); 
  const API_KEY = 'a7ee61998062d3404073d2279b6d9a9a';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
        setMovies(response.data.results);
        setFilteredMovies(response.data.results); 
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [API_KEY]);

  
  useEffect(() => {
    let filtered = movies;

   
    if (selectedGenre) {
      filtered = filtered.filter(movie => movie.genre_ids.includes(parseInt(selectedGenre)));
    }

    setFilteredMovies(filtered);
  }, [selectedGenre, movies]);

  return (
    <div className="home">
      <h1 className="home-title">Welcome to Movie Recommendations</h1>

     
      <div>
        <label htmlFor="genre-select">Filter by Genre: </label>
        <select
          id="genre-select"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">All</option>
       
          <option value="28">Action</option>
          <option value="35">Comedy</option>
          <option value="18">Drama</option>
          <option value="10749">Romance</option>
        </select>
      </div>

       
      <MovieList movies={filteredMovies} />
    </div>
  );
};

export default Home;






