import { Link } from "react-router-dom"
import { useState } from "react"
import axios from 'axios'

function RegisterPg() {
  const[name,setName]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  async function registerUser(ev){
    ev.preventDefault();
   try{
    await axios.post('/register',{ //full length of url is defined from App.jsx,check App.jsx
      name,
      email,
      password,
    });
    alert('successfully registerd');
   }catch(e){
    alert('failed to register')
   }
  }
  return (
    <div className="mt-4 flex items-center justify-around grow">
      <div className="mb-16">
      <h1 className="text-4xl text-center mb-4">Register</h1>
      <form className="max-w-md mx-auto" onSubmit={registerUser} >
        <input type="text" placeholder="John Doe" value={name} onChange={(ev)=>setName(ev.target.value)} />
        <input type="email" placeholder="your@email.com" value={email} onChange={(ev)=>setEmail(ev.target.value)} />
        <input type="password" placeholder="password" value={password} onChange={(ev)=>setPassword(ev.target.value)} />
        <button type="submit" className="bg-primary w-full text-white rounded-2xl p-2">Register</button>
        <div className="text-center py-2 text-gray-500">
          Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
        </div>
      </form>
      </div>
    </div>
  )
}

export default RegisterPg