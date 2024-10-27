 'use client'
 import Image from 'next/image';
import React from 'react';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
const CommentList = ({Reviwe} ) => {
    const [user, setUser] = useState(null);
    const [Auth, setAuth] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   
    useEffect(() => {

        const authCookie = Cookies.get("auth");
        setAuth(JSON.parse(authCookie))
       
      
      }, []);     
       
     const id =Auth.id
    useEffect(() => {
        if (id) {
            const fetchUser = async () => {
                try {
                    const response = await fetch(`http://localhost:4000/api/users/${id}`);
                    if (!response.ok) {
                        throw new Error('User not found');
                    }
                    const data = await response.json();
                    setUser(data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchUser();
            }
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
 
  
    return (

        
        <div className="space-y-4  bg-[#121212] bg-opacity-50 rounded-3xl ">
            {Reviwe.map((Reviwe) => (
                <div key={Reviwe.id} className="w-full  p-4 text-gray-500 rounded-lg shadow dark:bg-gray-800 dark:text-gray-400" role="alert">
                    <div className="flex">
                        <div className='lg:w-[25%] w-[70%]'>   
                             <Image className=" lg:h-16 h-10 text-xl rounded-full" src={user.image_url} alt={`image`} width={100} height={16} />
                            </div>
                    
                        <div className="ms-3 text-sm font-normal">
                            <span className=" text-xl font-semibold text-gray-900 dark:text-white">{user.name}</span>
                            <div className="my-2 text-sm font-normal">{Reviwe.review}</div>
                           
                        </div>
                    
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CommentList;