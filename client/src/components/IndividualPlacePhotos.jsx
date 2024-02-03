import React from 'react'
import { Link } from 'react-router-dom'

function IndividualPlacePhotos({place}) {
  return (
    <div className='grid gap-2 grid-cols-1 sm:grid-cols-[2fr_1fr] mt-1 rounded-3xl overflow-hidden'>
        <Link to={'/place/photos/'+place._id} className='bg-gray-600 '>
          {place.photos&&place.photos[0] && (
              <img className='aspect-square object-cover w-full h-full' src={"https://book-me-api.onrender.com/downloads/"+place.photos[0]} />
          )}
        </Link>
        <div className='grid grid-cols-2 sm:grid-cols-1 gap-2'>
          <Link to={'/place/photos/'+place._id}>
          {place.photos&&place.photos[1] && (
            <img className='aspect-square object-cover' src={"https://book-me-api.onrender.com/downloads/"+place.photos[1]} />
          )}
          </Link>
          <div className=' overflow-hidden relative'>
          {place.photos&&place.photos[2] && (
            <img className='aspect-square object-cover relative ' src={"https://book-me-api.onrender.com/downloads/"+place.photos[2]} />
          )}
          <Link to={'/place/photos/'+place._id} className='absolute max-w-12 right-2 bottom-2 py-1 px-2 sm:py-2 sm:px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500 inline-flex gap-1 text-sm '>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
        </svg>
        <span className='hidden md:block'>more photos</span>
        </Link>
          </div>
        </div>
        
      </div>
  )
}

export default IndividualPlacePhotos