import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import Perks from '../components/Perks';
import axios from 'axios';
import UploadPhoto from '../components/UploadPhoto';

function PlacesPg() {
    const {action}=useParams();
    const [title,setTitle]=useState('');
    const [address,setAddress]=useState('');
    const [perks,setPerks]=useState([]);
    const [addedPhoto,setAddedPhoto]=useState([]);
    const [description,setDescription]=useState('');
    const [extraInfo,setExtraInfo]=useState('');
    const [checkIn,setCheckIn]=useState(0);
    const [checkOut,setCheckOut]=useState(0);
    const [maxGuests,setMaxGuests]=useState(1);
    const [userPlaces,setUserPlaces]=useState([]);
    const [price,setPrice]=useState(100)
    const navigate=useNavigate();
    let placeId=""

    async function savePlace(ev){
      ev.preventDefault();
      try{
        if(!title || !address){
          throw 'fill the form'
        }
        if(placeId){
          //update place
          await axios.put('/places',{
            placeId,title,address,perks,addedPhoto,
            description,extraInfo,checkIn,
            checkOut,maxGuests,price
          })
        }else{
          //add new place
          await axios.post('/places',{
            title,address,perks,addedPhoto,
            description,extraInfo,checkIn,
            checkOut,maxGuests,price
          });
        }
        
        setTitle('');
        setAddress('');
        setPerks([]);
        setAddedPhoto([]);
        setDescription('');
        setExtraInfo('');
        setCheckIn(0);
        setCheckOut(0);
        setMaxGuests(1);
        setPrice(100)
        axios.get('/user-places').then(({data})=>{
          setUserPlaces(data);
        })
      navigate('/account/places');
      }catch(err){
        alert(err)
      }
      }
      useEffect(()=>{
        axios.get('/user-places').then(({data})=>{
          setUserPlaces(data);
        }).catch(err=>{
          console.error(err);
        })
        
      },[]);
      if(userPlaces.some((place)=>place._id===action)){
        placeId=action;
      }
      useEffect(()=>{
        if(!placeId){
          return
        }
        axios.get('/places/'+placeId).then(({data})=>{
        setTitle(data.title);
        setAddress(data.address);
        setPerks(data.perks);
        setAddedPhoto(data.photos);
        setDescription(data.description);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        setPrice(data.price)
        })
      },[placeId])
      
      
    
if(action==='new' || userPlaces.some((place)=>place._id===action)){
    return (
        <div>
            <form onSubmit={savePlace}>
                <h2 className='text-2xl mt-4'>Title</h2>
                <p className='text-gray-500 text-sm'>title for your place should be short and catchy as in advertisment</p>
                <input type="text" value={title} onChange={ev=>setTitle(ev.target.value)} placeholder='title, for example: My lovely apt...'/>
                <h2 className='text-2xl mt-4'>Address</h2>
                <p className='text-gray-500 text-sm'>address to this place</p>
                <input type="text" value={address} onChange={ev=>setAddress(ev.target.value)} placeholder='address' />
                <h2 className='text-2xl mt-4'>Photos</h2>
                <p className='text-gray-500 text-sm'>more = better</p>
                <UploadPhoto photos={addedPhoto} onChange={setAddedPhoto  } />
                <h2 className='text-2xl mt-4'>Description</h2>
                <p className='text-gray-500 text-sm'>description of the place</p>
                <textarea value={description} onChange={ev=>setDescription(ev.target.value)} rows={6} />
                <h2 className='text-2xl mt-4'>Perks</h2>
                <p className='text-gray-500 text-sm'>select all the perks of your place</p>
                <Perks selected={perks} onChange={setPerks} />
                <h2 className='text-2xl mt-4'>Extra info</h2>
                <p className='text-gray-500 text-sm'>house rules,etc</p>
                <textarea value={extraInfo} onChange={ev=>setExtraInfo(ev.target.value)} />
                <h2 className='text-2xl mt-4'>Check in&out times</h2>
                <p className='text-gray-500 text-sm'>add check in and out times, remember to have some time window for cleaning the room between guests</p>
                <div className='grid grid-cols-2 gap-1 text-center'>
                  <div>
                    <h3 className='mt-2'>Check in time</h3>
                    <input type="text" value={checkIn} onChange={ev=>setCheckIn(ev.target.value)} placeholder='14' />
                  </div>
                  <div>
                    <h3 className='whitespace-nowrap mt-2'>Check out time</h3>
                    <input type="text" value={checkOut} onChange={ev=>setCheckOut(ev.target.value)} placeholder='11' />
                  </div>
                  <div>
                    <h3 className='whitespace-nowrap mt-2'>Max number of guests</h3>
                    <input type="number" value={maxGuests} onChange={ev=>setMaxGuests(ev.target.value)} placeholder='5' />
                  </div>
                  <div>
                    <h3 className='whitespace-nowrap mt-2'>Price per Night</h3>
                    <input type="number" value={price} onChange={ev=>setPrice(ev.target.value)} placeholder='5' />
                  </div>
                </div>
                <button type='submit' className='py-2 px-6 rounded-2xl bg-primary text-white w-full mt-2'>Save</button>
            </form>
        </div>
    )
}
  return (
    <div>
    <div className='text-center mt-8'>
        <Link to={'/account/places/new'} className='py-2 px-6 bg-primary text-white rounded-full inline-flex gap-1'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
            Add new place
        </Link>
    </div>
    <div className='mt-4'>
      {userPlaces.length>0 && userPlaces.map((place,index)=>(
        <Link to={'/account/places/'+place._id} key={index} className='bg-gray-200 p-4 mt-4 rounded-2xl flex gap-4'>
          <div className='w-32 h-32 bg-gray-300 shrink-0 flex'>
            {place.photos.length>0 && (
              <img className='object-cover' src={'http://localhost:4000/downloads/'+place.photos[0]} alt="" />
            )}
          </div>
          <div>
          <h2 className='text-xl'>{place.title}</h2>
          <p className='text-sm mt-2'>{place.description}</p>
          </div>
        </Link>
      ))}
    </div>
    </div>
  )
}

export default PlacesPg