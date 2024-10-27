import React from 'react'
import MovieItem from './MovieItem'

const MovieList = ({ data }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
      {data.map((movie) => (
        <div key={movie.id}> {/* Move the key here */}
          <MovieItem movie={movie} />
        </div>
      ))}
    </div>
  );
};

export default MovieList;
