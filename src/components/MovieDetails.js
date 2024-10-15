
import React from 'react';
import { useLocation } from 'react-router-dom';
import genresData from '../genres.json';
import '../styles/MovieDetails.css';

const MovieDetails = () => {
  const location = useLocation();
  const { movie } = location.state || {};  
  if (!movie) {
    return <div>No movie data found</div>; 
  }

  const getGenres = (ids) => {
    return ids.map(id => {
      const genre = genresData.find(genre => genre.id === id);
      return genre ? genre.name : null;
    }).filter(Boolean).join(', ');
  };

  const BACKGROUND_IMAGE_URL = 'https://image.tmdb.org/t/p/original';

  return (
    <div
      className="movie-details-page"
      style={{
        backgroundImage: `url(${BACKGROUND_IMAGE_URL}${movie.backdrop_path})`,
      }}
    >
      <div className="movie-details-content">
        <h2>{movie.title}</h2>
        <p><strong>Description:</strong> {movie.overview}</p>
        <p><strong>Genres:</strong> {getGenres(movie.genre_ids)}</p>
        <p><strong>Rating:</strong> {movie.vote_average}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
