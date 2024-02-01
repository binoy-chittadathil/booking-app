
import './App.css'
import Layout from './components/Layout'
import IndexPg from './pages/IndexPg'
import LoginPg from './pages/LoginPg'
import { Route,Routes } from 'react-router-dom'
import RegisterPg from './pages/RegisterPg'
import axios from 'axios'
import { UserContextProvider } from './components/Context'
import AccountPg from './pages/AccountPg'
import PlacesPg from './pages/PlacesPg'
import IndividualPlacePg from './pages/IndividualPlacePg'
import MorePhotos from './pages/MorePhotos'
import BookingPg from './pages/BookingPg'
import BookingsPg from './pages/BookingsPg'

// Set default configuration for all Axios requests
axios.defaults.baseURL='http://localhost:4000';
axios.defaults.withCredentials=true;  //Automatically include cookies in requests

function App() {

  return (
    <UserContextProvider>
   <Routes>

    <Route path='/' element={<Layout/>}>

    <Route index element={<IndexPg/>} />
    <Route path='/login' element={<LoginPg/>}/>
    <Route path='/register' element={<RegisterPg/>} />
    <Route path='/account' element={<AccountPg/>} />
    <Route path='/account/:subpage' element={<AccountPg/>} />
    <Route path='/account/:subpage/:action' element={<AccountPg/>} />
    <Route path='/places/:id' element={<IndividualPlacePg/>} />
    <Route path='/account/bookings/:bookingId' element={<BookingPg/>} />
    
    </Route>
    <Route path='/place/photos/:id' element={<MorePhotos/>} />
    
   </Routes>
   </UserContextProvider>
  )
}

export default App
