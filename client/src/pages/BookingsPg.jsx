import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import BookingDate from '../components/BookingDate';
function BookingsPg() {
  const [bookings,setBookings]=useState([])
    useEffect(()=>{
        axios.get('/bookings').then(({data})=>{
          setBookings(data)
        }).catch(err=>{
          console.log(err);
        })
        
    },[])
  return (
    <div className='mt-8'>
      {bookings&&bookings.map(((booking,index)=>(
        <Link to={'/account/bookings/'+booking._id} key={index} className='grid sm:flex bg-gray-200 rounded-2xl overflow-hidden mt-4 gap-3' >
          {booking.place.photos.length>0 && (
           <div className=''>
             <img className='sm:w-48 sm:h-36 aspect-square  object-cover '  src={"http://localhost:4000/downloads/"+booking.place.photos[0]} />
           </div>
          )}
          <div className='grid py-3'>
          <h2 className=' text-xl'>{booking.place.title}</h2>
          <BookingDate booking={booking} className='text-gray-500' />
          <h1 className='font-semibold text-xl'>Total price: ₹{booking.bookingPrice}</h1>
          </div>
          </Link>
      )))}
    </div>
  )
}

export default BookingsPg