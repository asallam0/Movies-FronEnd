// pages/about.js
import React from 'react';

const About = () => {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center py-10">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full p-4">
        
        <div className="bg-[#121212] shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 duration-300">
          <h2 className="text-2xl font-semibold text-white mb-4">Welcome to Our Movie Hub!</h2>
          <p className="text-gray-100">
            We are dedicated to providing movie enthusiasts with a comprehensive platform to discover, watch, and discuss films from various genres.
          </p>
        </div>

        <div className="bg-[#121212] shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 duration-300">
          <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
          <p className="text-gray-100">
            Our mission is to curate a diverse collection of movies that cater to all tastes and preferences. Whether you are a fan of action, drama, comedy, or indie films, we aim to bring you the best cinematic experiences.
          </p>
        </div>

        <div className="bg-[#121212] shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 duration-300">
          <h2 className="text-2xl font-semibold text-white mb-4">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-100">
            <li>Detailed movie descriptions and ratings</li>
            <li>User-friendly interface for easy navigation</li>
            <li>Regular updates with the latest movie releases</li>
            <li>A community for movie lovers to connect and share opinions</li>
          </ul>
        </div>

        <div className="bg-[#121212] shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 duration-300">
          <h2 className="text-2xl font-semibold text-white mb-4">Join Us</h2>
          <p className="text-gray-100">
            We invite you to explore our collection and join our growing community of movie lovers. Together, let's celebrate the art of cinema!
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;