import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "./Context"
import axios from "axios";

function Header() {
  const [searchInput,setSearchInput]=useState('')
  const {user}=useContext(UserContext);
  const navigate=useNavigate()
  function handleSearch(ev){
    ev.preventDefault();
    axios.get('/places').then(({data})=>{
      const filteredPlace=data.filter((item)=>item.title.toLowerCase().includes(searchInput.toLowerCase()));
      navigate('/',{state:{data:filteredPlace}})
    })
    
  }
  return (
    <div>
        <header className=' grid gap-2 md:grid-cols-[1fr_4fr_1fr] md:gap-20'>
    <Link to={'/'} className="flex items-center gap-1 justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
    </svg>
    <span className='font-bold text-xl'>BookMe</span>
    </Link>
    <div className="flex gap-1">
    <input className="border-primary select-none focus:border-none w-full border my-1 py-2 px-3 rounded-full "  type="search" value={searchInput} onChange={(ev)=>setSearchInput(ev.target.value)} />
    <button className='bg-primary text-white p-1 h-12 w-12 flex items-center justify-center rounded-full' onClick={handleSearch}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    </button>

    </div>
    <Link to={user ? '/account' : '/login'} className='flex items-center gap-2 border border-gray-300 rounded-full p-2 px-4'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>
<div className='bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden'>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
</svg>
</div>
{ user && (<div>{user.name}</div>)} {/*if there is user then print name*/}
    </Link>
    </header>
    </div>
  )
}

export default Header