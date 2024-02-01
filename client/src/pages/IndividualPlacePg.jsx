import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import BookingWidget from '../components/BookingWidget';
import PlaceAddress from '../components/PlaceAddress';
import IndividualPlacePhotos from '../components/IndividualPlacePhotos';

function IndividualPlacePg() {
  const [place,setPlace]=useState([]);
  const [allPhotos,setAllPhotos]=useState(false)
  const {id}=useParams();
  useEffect(()=>{
    if(!id){
      return
    }
    axios.get('/place/'+id).then(({data})=>{
      setPlace(data);
    })
  },[id])
  
  return (
    <div className='mt-4 bg-gray-100 px-8 pt-8 relative'>
      <h1 className='text-2xl'>{place.title}</h1>
      <PlaceAddress>{place.address}</PlaceAddress>
      <IndividualPlacePhotos place={place} />
        <div className='grid sm:grid-cols-[2fr_1fr] sm:mt-8 sm:gap-4 mb-8'>
          <div>
          <div className='my-4 sm:mb-5 sm:my-0'>
          <h2 className='font-semibold text-2xl'>Description</h2>
          {place.description}
        </div>
            Check-in: {place.checkIn} <br />
            Check-out: {place.checkOut} <br />
            Max number of guests: {place.maxGuests}
          </div>
          
          <div>
            <BookingWidget place={place}/>
          </div>
        </div>
        <div className='bg-white -mx-8 px-8 py-8 border-t'>
        <h2 className='font-semibold text-2xl'>Extra info</h2>
        <div className='text-sm  text-gray-700 leding-4'>
              {place.extraInfo}
            </div>
        </div>
    </div>
  )
}

export default IndividualPlacePg