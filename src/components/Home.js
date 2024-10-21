import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from './MovieList';
import '../styles/Home.css'; // Make sure the path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(''); 
  const [releaseYear, setReleaseYear] = useState('');
  const [rating, setRating] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility
  const API_KEY = 'a7ee61998062d3404073d2279b6d9a9a';
  const totalPagesToFetch = 5; // Adjust this to fetch more pages

  // Fetch popular movies from multiple pages
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let allMovies = [];
        for (let page = 1; page <= totalPagesToFetch; page++) {
          const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`);
          allMovies = [...allMovies, ...response.data.results]; // Concatenate movies from each page
        }
        setMovies(allMovies);
        setFilteredMovies(allMovies); 
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [API_KEY]);

  // Fetch genres for the dropdown
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
        setGenres(response.data.genres);  // Set fetched genres
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, [API_KEY]);

  // Filter movies when the selected genre, release year, or rating changes
  useEffect(() => {
    let filtered = movies;

    if (selectedGenre) {
      filtered = filtered.filter(movie => movie.genre_ids.includes(parseInt(selectedGenre)));
    }
    if (releaseYear) {
      filtered = filtered.filter(movie => new Date(movie.release_date).getFullYear() === parseInt(releaseYear));
    }
    if (rating) {
      filtered = filtered.filter(movie => movie.vote_average >= parseFloat(rating));
    }

    setFilteredMovies(filtered);
  }, [selectedGenre, releaseYear, rating, movies]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  return (
    <div className="home">
      {/* Filter Toggle Button */}
      <button className="filter-toggle" onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faFilter} />
      </button>

      {/* Dropdown Menu for Filters */}
      {isDropdownOpen && (
        <div className="filter-dropdown">
          <h3 style={{ textAlign: 'center', marginBottom: '10px', color: '#333' }}>Filters</h3>
          
          {/* Genre Filter */}
          <div className="filter-container">
            <label htmlFor="genre-select" className="filter-label">Genre</label>
            <select
              id="genre-select"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="filter-select"
            >
              <option value="">All</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          {/* Release Year Filter */}
          <div className="filter-container">
            <label htmlFor="release-year" className="filter-label">Release Year</label>
            <input
              type="number"
              id="release-year"
              value={releaseYear}
              onChange={(e) => setReleaseYear(e.target.value)}
              placeholder="YYYY"
              className="filter-input"
            />
          </div>

          {/* Rating Filter */}
          <div className="filter-container">
            <label htmlFor="rating" className="filter-label">Rating (0-10)</label>
            <input
              type="number"
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="0-10"
              className="filter-input"
              step="0.1" // Allows decimal values
            />
          </div>
        </div>
      )}

      {/* MovieList component renders filtered movies */}
      <MovieList movies={filteredMovies} />
    </div>
  );
};

export default Home;
