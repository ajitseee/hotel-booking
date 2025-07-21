import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AllRooms from './pages/AllRooms'
import { Route, Routes, useLocation } from 'react-router-dom'
import RoomDetails from './pages/RoomDetails'
import Mybookings from './pages/Mybookings'
import HotelReg from './components/HotelReg'
import Layout from './components/hotelOwner/Layout'
import Dashboard from './components/hotelOwner/Dashboard'
import Hotels from './components/hotelOwner/Hotels'
import Bookings from './components/hotelOwner/Bookings'
import Revenue from './components/hotelOwner/Revenue'
import AddHotel from './components/hotelOwner/AddHotel'
import HotelOwnerSignIn from './components/HotelOwnerSignIn'
import HotelOwnerSignUp from './components/HotelOwnerSignUp'
import CustomerSignIn from './components/CustomerSignIn'
import CustomerSignUp from './components/CustomerSignUp'

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner")
  const isAuthPath = useLocation().pathname.includes("sign-in") || useLocation().pathname.includes("sign-up")

  return (
    <div>
      {!isOwnerPath && !isAuthPath && <Navbar />}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-booking" element={<Mybookings />} />
          <Route path="/hotel-registration" element={<HotelReg />} />
          
          {/* Customer Authentication Routes */}
          <Route path="/customer/sign-in" element={<CustomerSignIn />} />
          <Route path="/customer/sign-up" element={<CustomerSignUp />} />
          
          {/* Hotel Owner Authentication Routes */}
          <Route path="/owner/sign-in" element={<HotelOwnerSignIn />} />
          <Route path="/owner/sign-up" element={<HotelOwnerSignUp />} />
          
          {/* Hotel Owner Dashboard Routes */}
          <Route path="/owner" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="hotels" element={<Hotels />} />
            <Route path="add-hotel" element={<AddHotel />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="revenue" element={<Revenue />} />
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
