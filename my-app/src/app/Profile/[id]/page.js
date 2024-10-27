// pages/index.js
'use client'
import ProfileCard from "../ProfileCard";

import { useEffect, useState } from 'react';
const page = (context) => {
    const { id } = context.params;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        <div  className="w-full bg-black">
        <div className="flex justify-center items-center h-screen">
            <ProfileCard user={user} id={id}/>
        </div></div>
    );
};

export default page;