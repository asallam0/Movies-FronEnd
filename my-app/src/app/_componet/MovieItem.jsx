
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const MovieItem = ({ movie }) => {
  const rate= movie.rate
  const renderStars = (rate) => {
    const starCount = rate < 5 ? rate : 5; // Use the actual rate if less than 5, otherwise use 5
    const stars = [];

    for (let i = 0; i < starCount; i++) {
      stars.push(
        <svg
          key={i}
          className="w-5 h-5 text-yellow-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <Link href={`/Movie/${movie.id}`}>
    <div className="bg-[#121212] shadow-md rounded-lg overflow-hidden transform transition-all hover:scale-105 duration-100 ">
      <div className="relative  w-full h-64">
        <Image
          src={movie.image_url}
          alt={movie.title}
          fill
          className="rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg text-white font-bold">{movie.name}</h2>
        <p className="text-[#faf8f1c7] text-sm">{movie.year}</p>

        <div className="flex items-center mt-2">
          {renderStars(movie.rate)} {/* Render stars based on movie rate */}
          <span className="ml-1 text-[#faf8f1c7]">{movie.rate}</span>
        </div>
        <p className="text-[#faf8f1c7] text-sm mt-2 line-clamp-2">{movie.description}</p>
        <div className="flex justify-end mt-4">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm">
            Watch Trailer
          </button>
        </div>
      </div>
    </div></Link>
  );
};

export default MovieItem;