
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MovieList.css';

const MovieList = ({ movies }) => {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className="movie-list">
      {movies
        .filter(movie => movie.poster_path)  
        .map(movie => (
          <Link 
            to={`/movie/${movie.id}`}  
            state={{ movie }}  
            key={movie.id}
            className="movie-item"
          >
            <img 
              className="movie-poster" 
              src={`${IMAGE_BASE_URL}${movie.poster_path}`} 
              alt={movie.title} 
            />
          </Link>
        ))}
    </div>
  );
};

export default MovieList;




