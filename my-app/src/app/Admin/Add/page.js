'use client'
import { useRef, useState } from 'react';
 import Cookies from "js-cookie"; 

export default function HomePage() {
  const [title, setTitle] = useState('');
  const [name, setname] = useState('');
  const [rate, setrate] = useState('');
  const [trailer, settrailer] = useState('');
  const [year, setyear] = useState('');
  const [photo, setPhoto] = useState(null);
  const image = useRef(null);
  
    const auth = Cookies.get("auth");
  const user = JSON.parse(auth);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(); 
     formData.append('name', name);
    formData.append('description', title);
     formData.append('rate', rate);
     formData.append('trailer', trailer);
    formData.append('year', year);
  
    if (image.current.files && image.current.files[0]) {
        formData.append("image", image.current.files[0]);
      }

    try {
      const response = await fetch('http://localhost:4000/movies', {
        method: 'POST',
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
  <>

<div className="bg-gray-100">
       
        
        <div className="flex flex-col justify-center mx-3 pt-3 lg:flex-row">
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
                        
                            <input className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]" type="text"  placeholder="Trailer"value={trailer}
           onChange={(e) => settrailer(e.target.value)} required />
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
             </div>
           
        
    </div>
  </>
    
  );
}




