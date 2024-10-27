// 'use client';
import { useEffect, useState } from 'react';
import CommentList from './List/CommentList';

const CommentSection = ({ ReviweData, Id }) => {
    const [review, setReview] = useState('');
    const [listReview, setListReview] = useState([]);
    const id = Id;

    const postReview = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/movies/review", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": "f62ebcad50d1a76b2b188f74f8a0b9fe",
                },
                body: JSON.stringify({
                    movie_id: id,
                    review: review,
                }),
            });

            if (response.ok) {
                const newReview = { review }; // Create a new review object
                setListReview((prevList) => [...prevList, newReview]); // Update the list with the new review
                setReview(''); // Clear the input field
            } else {
                console.error('Failed to post review:', response.statusText);
            }
        } catch (err) {
            console.error('Error posting review:', err);
        }
    };

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch(`http://localhost:4000/movies/${id}`);
            const data = await response.json();
            setListReview(data.reviews);
        };
        fetchMovies();
    }, [id]); // Ensure the fetch happens when the component mounts

    return (
        <div className='grid lg:grid-cols-6 grid-cols-1'>
            <div className='col-span-4'>
                <form onSubmit={postReview}>
                    <div className="flex items-center px-3 py-2 rounded-3xl bg-[#121212] bg-opacity-40 ">
                        <input
                            type="text"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            className="block mx-4 p-2.5 w-full text-sm text-white rounded-3xl border-none bg-black"
                            placeholder="Your comment..."
                        />
                        <button 
                            type="submit" 
                            className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                        >
                            <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                            </svg>
                            <span className="sr-only">Send comment</span>
                        </button>
                    </div>
                </form>
            </div>
            <div className='col-span-4 pt-5'>
                <CommentList Reviwe={listReview} />
            </div>
        </div>
    );
};

export default CommentSection;