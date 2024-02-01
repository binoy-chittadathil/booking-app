import axios from "axios";
import { useContext, useState } from "react"
import { Link, Navigate} from "react-router-dom"
import { UserContext } from "../components/Context";


function LoginPg() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [redirect,setRedirect]=useState(false);
  const {setUser,user}=useContext(UserContext)
  async function handleLoginSubmit(ev){
    ev.preventDefault();
   try{
    const response=await axios.post('/login',{email,password});
    setUser(response.data);
    alert('login successfull');
    setRedirect(true);
    
   }catch(e){
    alert('login failed');
   }
  }
  if(redirect){
    return <Navigate to={'/'} />
  }
  
  return (
    <div className="mt-4 flex items-center justify-around grow">
      <div className="mb-16">
      <h1 className="text-4xl text-center mb-4">Login</h1>
      <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
        <input type="email" placeholder="your@email.com" value={email} onChange={(ev)=>setEmail(ev.target.value)} />
        <input type="password" placeholder="password" value={password} onChange={(ev)=>setPassword(ev.target.value)} />
        <button type="submit" className="bg-primary w-full text-white rounded-2xl p-2">Login</button>
        <div className="text-center py-2 text-gray-500">
          Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register</Link>
        </div>
      </form>
      </div>
    </div>
  )
}

export default LoginPg