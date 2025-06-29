import { useState } from 'react'
import  Register   from  './pages/Register'
import  Login  from  './pages/Login'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Dashboard from './pages/Dashboard'
import Booking from './pages/Booking'
import AvailableRooms from './pages/AvailableRooms'
import MyBookings from './pages/MyBookings'
import ConfirmBooking from './pages/ConfirmBooking'


function App() {
  return(
    <div>  <Routes>
       <Route path="/" element={<Navigate to="/register" />} />
    <Route path="/Register" element={<Register />} />
    <Route path="/Login" element={<Login />} />
    <Route path="/Booking" element={<Booking />} />
    <Route path="/Dashboard" element={<Dashboard/>} />
    <Route path="/available-rooms" element={<AvailableRooms/>} />
    <Route path="/my-bookings" element={<MyBookings />} />
    <Route path="/confirm-booking" element={<ConfirmBooking />} />
  </Routes>
     <Toaster />
     
     </div>
    
   
  )
}

export default App
