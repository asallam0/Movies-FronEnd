"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [auth, setAuth] = useState(false);
  const [user, setuser] = useState([]);

 
  useEffect(() => {

    const authCookie = Cookies.get("auth");
    if(authCookie){ setuser(JSON.parse(authCookie))}
   
    setAuth(!!authCookie); 
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const Logout = () => {
    Cookies.remove("auth");
    setAuth(false);
  };
  

  return (
    <nav className="bg-[#121212] text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-semibold text-white">
          <Link href="/">Cinema<span className='text-yellow-500' >Plus+</span> </Link>
        </div>

        {auth ? (
          <div className="hidden md:flex space-x-4">
            <Link href="/" className="hover:text-gray-400">Home</Link>
            <Link href="/about" className="hover:text-gray-400">About</Link>
            <Link href={`/Profile/${user.id}`} className="hover:text-gray-400">Profile</Link>
           
            <Link href="/">  <button onClick={Logout} className="hover:text-gray-400">Logout</button></Link>
          
          </div>
        ) : (
          <div className="hidden md:flex space-x-4">
            <Link href="/Login" className="hover:text-gray-400">Login</Link>
            <Link href="/Register" className="hover:text-gray-400">Register</Link>
          </div>
        )}

        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
          <Link href="/" className="block text-gray-200 hover:bg-gray-700 rounded px-3 py-2">Home</Link>
          <Link href="/about" className="block text-gray-200 hover:bg-gray-700 rounded px-3 py-2">About</Link>
          <Link href={`/Profile/${user.id}`} className="block text-gray-200 hover:bg-gray-700 rounded px-3 py-2">Profile</Link>
        
        </div>
      )}
    </nav>
  );
};

export default Header;