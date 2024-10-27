// pages/user/[id]/UpdateUser.js
"use client"
import Image from 'next/image';
import { useEffect, useState } from 'react';


const page = (context) => {
 
    const { id } = context.params;;
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
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
                    setName(data.name);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchUser();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch(`http://localhost:4000/api/users/${id}`, {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Update failed');
            }

            alert('User updated successfully!');
            router.push(`/user/${id}`); // Redirect to user detail page
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (<div className='grid grid-cols-8  bg-black h-screen'>
        <div className='md:col-start-4 md:col-end-6 col-span-5 '>
        <form onSubmit={handleSubmit}  className="flex flex-col  bg-[#121212] py-20 items-center mt-5 rounded-3xl ">
            <Image 
                src={user.image_url} 
                alt={user.name} 
                width={96}
                height={96}
                className="rounded-full border-solid border-white border-2  "
              // Set size
            />
            <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="max-w-full border rounded-2xl  p-2 my-5 "
                placeholder="New Name"
                required
            />
            {/* <input 
                type="file" 
             
                className="mb-3"
            /> */}
            <div className="max-w-full  pb-5">
                            <label className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-400 bg-white px-6 py-3 text-center" htmlFor="dropzone-file">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>

                            <h2 className=" text-xl font-medium text-gray-700 tracking-wide">Category image</h2>

                            <p className=" text-gray-500 tracking-wide">Upload or drag & drop your file . </p>

                            <input id="dropzone-file" type="file" className="hidden"  accept="image/png, image/jpeg, image/webp"  onChange={(e) => setImage(e.target.files[0])} />
                            </label>
                        </div>
            <button type="submit" className="bg-blue-500 text-white p-2 mb-3 rounded">
                Update User
            </button>
        </form> </div> </div>
    );
};

export default page;