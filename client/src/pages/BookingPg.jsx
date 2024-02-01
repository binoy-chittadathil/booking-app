import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PlaceAddress from '../components/PlaceAddress';
import BookingDate from '../components/BookingDate';
import IndividualPlacePhotos from '../components/IndividualPlacePhotos';
import Razorpay from '../components/Razorpay'
function BookingPg() {
  const {bookingId}=useParams();
  const [booking,setBooking]=useState(null)
  useEffect(()=>{
    if(bookingId){
      axios.get('/bookings').then(({data})=>{
        const selectedBookingDetails=data.find((bookingData)=>bookingData._id===bookingId);
        setBooking(selectedBookingDetails);
      })
    }
  },[bookingId]);

  if(!booking){
    return ''
  }
  return (
    <div className='mt-4  relative'>
      <h1 className='text-2xl'>{booking.place.title}</h1>
      <PlaceAddress>{booking.place.address}</PlaceAddress>
      <div className='grid p-5 bg-gray-300 rounded-2xl sm:flex justify-between my-3 items-center'>
        <div className='grid gap-3'>
        <h2 className='text-xl'>Your booking information:</h2>
        <BookingDate booking={booking}/>
        </div>
        <Razorpay booking={booking} />
      </div>
      <IndividualPlacePhotos place={booking.place} />
    </div>
  )
}

export default BookingPg