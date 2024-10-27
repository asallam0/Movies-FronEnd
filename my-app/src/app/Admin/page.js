'use client'
// pages/movies.js

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from "js-cookie"; 
import Image from 'next/image';
const Page = () => {
  
  const [movies, setMovies] = useState([]);
  const auth = Cookies.get("auth");
  const user = JSON.parse(auth);
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch('http://localhost:4000/movies');
      const data = await response.json();
      setMovies(data);
    };
    fetchMovies();
  }, []);

  const deleteMovie = async (id) => {
    await fetch(`http://localhost:4000/movies/${id}`, {
      method: 'DELETE',
      headers: {
        token: user.token,
        
      },
    });
    setMovies(movies.filter(movie => movie.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Manage Movies</h1>
    <Link href="/Admin/Add">
      <button className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">Add Movie</button>
    </Link>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border ">Description</th>
            <th className="border px-4 py-2">Year</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">
              <Image 
                src={movie.image_url} 
                alt={movie.name} 
                width={64} // Specify width
                height={64} // Specify height
                className="rounded-full object-cover"
              />
              </td>
              <td className="border px-4 py-2">{movie.name}</td>
              <td className="border bg-yellow-500 ">{movie.description}</td>
              <td className="border px-4 py-2">{movie.year}</td>
              <td className="border px-4 py-2">
                <Link href={`/Admin/Edit/${movie.id}`}>
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                </Link>
                <button onClick={() => deleteMovie(movie.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default Page;
{/* <table class="table-auto">
  <thead>
    <tr>
      <th>Photo</th>
      <th>Name</th>
      <th>Description</th>
      <th>Year</th>
      <th>Rate</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><div class="flex items-center justify-center h-screen">
  <img 
    src="your-image-url.jpg" 
    alt="Description" 
    class="w-32 h-32 rounded-full object-cover"
  />
</div></td>
      <td>Malcolm Lockyer</td>
      <td>1961</td>
    </tr>
    
  </tbody>
</table> */}