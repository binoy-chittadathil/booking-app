import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from './Context';

function BookingWidget({place}) {
    const [checkin,setCheckin]=useState('');
    const [checkout,setCheckout]=useState('');
    const [maxguests,setMaxguests]=useState(1);
    const [name,setName]=useState('');
    const [mobile,setMobile]=useState('');
    const [redirect,setRedirect]=useState('');
    const {user}=useContext(UserContext)

    function bookPlace(){
        axios.post('/booking',{
            placeId:place._id,checkin,checkout,maxguests,
            name,mobile,bookingPrice:numberOfnights*place.price
        }).then(({data})=>{
          const bookingId=data._id
          setRedirect('/account/bookings/'+bookingId);
        })
        
    }
    useEffect(()=>{
      if(user){
        setName(user.name)
      }
    },[user])
    
    let numberOfnights=0;
    if(checkin&&checkout){
        numberOfnights=(new Date(checkout)-new Date(checkin))/(1000 * 60 * 60 * 24)
    }
    if(redirect){
      return <Navigate to={redirect} />
    }
  return (
    <div>
        <div className='bg-white shadow p-4 rounded-2xl mt-8 sm:mt-0'>
            <div className='text-2xl text-center'>
              price: ₹{place.price} / per night 
            </div>
           <div>
           <div>
           <div>
              <label htmlFor="checkIn">Check-in:</label>
              <input type="date" value={checkin} onChange={(ev)=>setCheckin(ev.target.value)} id="checkIn" />
            </div>
            <div>
              <label htmlFor="checkOut">Check-out:</label>
              <input type="date" value={checkout} onChange={(ev)=>setCheckout(ev.target.value)} id="checkOut" />
            </div>
           </div>
           <div>
              <label htmlFor="guests">Max number of guests:</label>
              <input type="number" value={maxguests} onChange={(ev)=>setMaxguests(ev.target.value)} id="guests" />
            </div>
            {numberOfnights>0 && (
                <div>
                <div>
                <label htmlFor="name">Name:</label>
                <input type="text" value={name} onChange={(ev)=>setName(ev.target.value)} id="name" />
              </div>
              <div>
              <label htmlFor="mobile">Mobile:</label>
              <input type="tel" value={mobile} onChange={(ev)=>setMobile(ev.target.value)} id="mobile" />
            </div>
            </div>
            )}
           </div>
            <button onClick={bookPlace} className='bg-primary w-full text-white rounded-2xl p-2 mt-4'>
                Book this place
                {numberOfnights>0 && (
                <span className='ml-1'>₹{numberOfnights*place.price}</span>
            )}
            </button>
          </div>
    </div>
  )
}

export default BookingWidget