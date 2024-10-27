import React from 'react'
import Image from 'next/image'
import MovieList from './MovieList'
const MovieSection = async () => {
    const getMoives= async()=>{
        const res= await fetch('http://localhost:4000/movies',{ next: { revalidate: 0 } })
        return res.json()
  
    }
    const data= await getMoives()
   
  return (
    <div className='p-5' >
        <MovieList data={data}/>
    </div>
  )
}

export default MovieSection
