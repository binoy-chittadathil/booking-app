import React, { useContext, useState } from 'react'
import { UserContext } from '../components/Context'
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPg from './PlacesPg';
import BookingsPg from './BookingsPg';

function AccountPg() {
    const {user,ready,setUser}=useContext(UserContext);
    const {subpage}=useParams();
    const [redirect,setRedirect]=useState(false)
    
    function logout(){
     axios.post('/logout');
     setUser(null)
     setRedirect(true)
    }
    if(redirect){
      return(
        <Navigate to={'/'} />
      )
    }
    if(!ready){
      return 'Loading...'
    }
    if(ready && !user){
      return(
        <Navigate to={'/login'} />
      )
    }
    function linkClasses(type){
      let classes='py-2 px-6 inline-flex gap-1 rounded-full'
      if(type===subpage || subpage===undefined && type==='profile'){
        classes+=' bg-primary text-white'
      }else{
        classes+=' bg-gray-200'
      }
      return classes
    }
  return (
    <div>
      <nav className='sm:flex  w-full mt-8 gap-4 justify-center grid grid-cols-1'>
        <Link className={linkClasses('profile')} to={'/account'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          My Profile
        </Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
          </svg>
          My Bookings
        </Link>
        <Link className={linkClasses('places')} to={'/account/places'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
           <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
          </svg>
          My Accomodation
        </Link>
      </nav>
      {subpage===undefined && (
        <div className='text-center mt-7'>
          Logged in as {user.name} ({user.email}) <br />
          <button onClick={logout} className='bg-primary w-full max-w-sm text-white rounded-2xl p-2 mt-3'>Logout</button>
        </div>
      )}
      {subpage==='places' && (
        <PlacesPg/>
      )}
      {subpage==='bookings' && (
        <BookingsPg/>
      )}
    </div>
  )
}

export default AccountPg