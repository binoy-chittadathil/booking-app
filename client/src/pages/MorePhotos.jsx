import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function MorePhotos() {
    const [place,setPlace]=useState({});
    const [redirect,setRedirect]=useState(false);
    const {id}=useParams();
    useEffect(()=>{
        if(!id){
            return
        }
        axios.get('/place/'+id).then(({data})=>{
            setPlace(data)
        })
    },[id]);
    useEffect(()=>{
        if(redirect){
            window.history.back();
        }
    },[redirect])
  return (
    <div>
        <div className='p-8 bg-black'>
          <div className='flex justify-between'>
          <h2 className='text-2xl sm:text-3xl truncate text-white'>photos of {place.title}</h2>
          <div className='w-16 sm:w-40 h-6 p-4'></div>
          </div>
        <button onClick={()=>setRedirect(true)} className='inline-flex gap-1 py-2 px-4 bg-gray-600 rounded-2xl shadow shadow-black fixed z-10 right-8 top-8 bg-white'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
        <span className='hidden sm:block'>Close photos</span>
        </button>
        <div className='grid gap-4 relative top-5'>
        {place.photos && place.photos.map((photo,index)=>(
          <div key={index} >
            <img className='w-full ' src={"https://book-me-api.onrender.com/downloads/"+photo}  />
          </div>
        )) }
      </div>
      </div>
    </div>
  )
}

export default MorePhotos