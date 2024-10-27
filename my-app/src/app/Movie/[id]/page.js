// 
"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import InteractionBar from '../_Interactionbar/InteractionBar';
import CommentSection from '@/app/Comment/CommentSection';

const VideoPage = (context) => {
    const { id } = context.params;
    console.log(id)
    const [movie, setMovie] = useState([]);
    const [review, setreview] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch(`http://localhost:4000/movies/${id}`);
            const data = await response.json();
         
            setMovie(data);
            setreview(data.reviews);
        };
        fetchMovies();
    }, []);
    
   
    const videoUrl = movie.trailer;

    return (
      <div className='bg-black text-white'>
            <div className="grid lg:grid-cols-3 grid-cols-1 ">

            <div className='col-span-2 gap-4'>
                <div className="relative   lg:w-[100%] w-full h-0  pb-[56.25%]">
                    <iframe
                        src={videoUrl}
                        title="YouTube Video"
                        frameBorder="0"
                        allowFullScreen
                        className="absolute   w-full h-full"
                    />
                </div>
                 <div className="  bg-black bg-opacity-70 p-2  mt-2 ">
                <InteractionBar />
            </div>
              </div>
                {/* Info Section */}
                <div className="lg:w-[100%] w-full   ">
                   <div className=' bg-[#121212] pb-3 rounded-b-xl mt-4 lg:mt-0 pt-4 pl-2 mx-4 px-4 '> <h1 className="text-3xl font-bold">Venom: The Last Dance</h1>
                    <h2 className="text-xl mt-2">Final Trailer</h2>
                    <p className="mt-4 text-sm">{movie.description}</p>
                    <hr className="ipc-page-section__divider ipc-page-section__divider--baseAlt ipc-page-section__divider--full-width mt-2" />
                    <div className="mt-5  relative h-80  mx-10 ">
                        <Image
                            src={movie.image_url}
                            alt={movie.title}
                            fill
                            className="rounded-lg"
                        />
                    </div>
                    {/* Social Interaction Buttons */}
                    {/* <div className="mt-4 pb-4 flex space-x-4">
                        <button className="bg-gray-800 p-2 rounded">Like</button>
                        <button className="bg-gray-800 p-2 rounded">Share</button>
                    </div> */}</div>
                </div>
            </div>
             <div className='pt-10'><CommentSection ReviweData={review} Id={id}/></div>
           
           </div>
        
    );
};

export default VideoPage;