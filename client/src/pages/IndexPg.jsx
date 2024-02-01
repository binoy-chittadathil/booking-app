
import { useEffect, useState } from "react"
import Header from "../components/Header"
import axios from "axios"
import { Link, useLocation } from "react-router-dom"


function IndexPg() {
  const location=useLocation();
  const [places,setPlaces]=useState([]);
  
 useEffect(() => {
    const fetchData = async () => {
      if (location.state && location.state.data) {
        setPlaces(location.state.data);
      } else {
        const response = await axios.get('/places');
        setPlaces(response.data);
      }
    };

    fetchData();
  }, [location.state]);

  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {places.length>0 && (
        places.map((place,index)=>(
          <Link to={'/places/'+place._id} key={index} >
            <div className="rounded-2xl bg-gray-500 aspect-square mb-2">
            {place.photos.length>0 && (
              <img className='aspect-square object-cover rounded-2xl' src={'http://localhost:4000/downloads/'+place.photos[0]} alt="" />
            )}
            </div>
            <h2 className="font-bold leading-4">{place.address}</h2>
            <h3 className="text-sm truncate leading-4 text-gray-500">{place.title}</h3>
            <div className="mt-1">
              <span className="font-bold">₹{place.price}</span> per night
            </div>
          </Link>
        ))
      )}
    </div>
  )
}

export default IndexPg