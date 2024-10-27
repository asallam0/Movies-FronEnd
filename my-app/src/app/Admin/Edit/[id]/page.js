
'use client'
import { useEffect, useRef, useState } from 'react';
import Cookies from "js-cookie"; 
import Image from 'next/image';


export default function HomePage(context) {
  const { id } = context.params;
  const [title, setTitle] = useState('');
  const [name, setname] = useState('');
  const [rate, setrate] = useState('');
  const [year, setyear] = useState('');
  const [movie, setMoive] = useState([]);
  const [photo, setPhoto] = useState(null);
  const image = useRef(null);
  const auth=  Cookies.get("auth")
  let user= JSON.parse(auth)
  
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(`http://localhost:4000/movies/${id}`);
      const data = await response.json();
      console.log(data);
      setMoive(data);
    };
    fetchMovies();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(); 
     formData.append('name', name);
    formData.append('description', title);
    formData.append('rate', rate);
    formData.append('year', year);
  
    if (image.current.files && image.current.files[0]) {
        formData.append("image", image.current.files[0]);
      }

    try {
      const response = await fetch(`http://localhost:4000/movies/${id}`, {
        method: 'Put',
        headers: {
            token: user.token,
            
          },
        body: formData,
        
      });

      const data = await response.json();
      console.log(data.message);

      // Clear the form fields
      setTitle('');
      setPhoto(null);
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  return (
    
    <div className="bg-gray-100">
           
            <div className="header my-3 h-12 px-10 flex items-center justify-between">
                <h1 className="font-medium text-2xl">Edit Movie</h1>
            </div>
            <div className="flex flex-col mx-3 mt-6 lg:flex-row">
                <div className="w-full lg:w-1/3 m-1">
                 <form className="w-full bg-white shadow-md p-6" onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-full px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2" >Add Movie</label>
                            <input className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]" type="text"  placeholder="Name"value={name}
           onChange={(e) => setname(e.target.value)} required />
                        </div>
                        <div className="w-full md:w-full px-3 mb-6">
                       
                            <input className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]" type="text"  placeholder="Description" required   value={title}
                               onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                        <div className="w-full md:w-full px-3 mb-6">
                           
                            <input className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]" type="text"  placeholder="Year"  value={year}
                               onChange={(e) => setyear(e.target.value)} required />
                        </div>
                        <div className="w-full md:w-full px-3 mb-6">
                           
                            <input className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]" type="text"  placeholder=" Rate" required  value={rate}
                               onChange={(e) => setrate(e.target.value)}/>
                        </div>
                                                
                        
                        <div className="w-full md:w-full px-3 mb-6">
                            <button className="appearance-none block w-full bg-green-700 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-green-600 focus:outline-none focus:bg-white focus:border-gray-500"
                           type='submit' >Add Movie</button>
                        </div>
                        
                        <div className="w-full px-3 ">
                            <label className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-400 bg-white px-6 py-3 text-center" htmlFor="dropzone-file">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>

                            <h2 className=" text-xl font-medium text-gray-700 tracking-wide">Category image</h2>

                            <p className=" text-gray-500 tracking-wide">Upload or drag & drop your file . </p>

                            <input id="dropzone-file" type="file" className="hidden"  accept="image/png, image/jpeg, image/webp" ref={image}/>
                            </label>
                        </div>
                        
                    </div>
                </form> 
                </div>
                <div className="w-full lg:w-2/3 m-1 bg-white shadow-lg text-lg rounded-sm border border-gray-200">
                    <div className="overflow-x-auto rounded-lg p-3">
                        <table className="table-auto w-full">
                            <thead className="text-sm font-semibold uppercase text-gray-800 bg-gray-50 mx-auto">
                                <tr>
                                    <th></th>
                                    <th><svg xmlns="http://www.w3.org/2000/svg" className="fill-current w-5 h-5 mx-auto"><path d="M6 22h12a2 2 0 0 0 2-2V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zm7-18 5 5h-5V4zm-4.5 7a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 8.5 11zm.5 5 1.597 1.363L13 13l4 6H7l2-3z"></path></svg></th>
                                    <th className="p-2">
                                        <div className="font-semibold">Name</div>
                                    </th>
                                    <th className="p-2">
                                        <div className="font-semibold text-left">Description</div>
                                    </th>
                                    <th className="p-2">
                                        <div className="font-semibold text-center">year</div>
                                    </th>
                                    <th className="p-2">
                                        <div className="font-semibold text-left">Rate</div>
                                    </th>
                                    
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>  <Image 
                src={movie.image_url} 
                alt={movie.name} 
                width={64} 
                height={64} 
                className="rounded-full object-cover"
              /></td>
                                    <td>{movie.name}</td>
                                    <td>{movie.description}</td>
                                    <td>{movie.year}</td>
                                    <td>{movie.rate}</td>
                                    
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                
            </div>
            
        </div>
  );
}


 