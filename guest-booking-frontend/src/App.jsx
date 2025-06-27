import { useState } from 'react'
import  Register   from  './pages/Register'
import  Login  from  './pages/Login'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Dashboard from './pages/Dashboard'

function App() {
  return(
    <div>  <Routes>
       <Route path="/" element={<Navigate to="/register" />} />
    <Route path="/Register" element={<Register />} />
    <Route path="/Login" element={<Login />} />
    <Route path="/Dashboard" element={<Dashboard/>} />
  </Routes>
     <Toaster />
     
     </div>
    
   
  )
}

export default App
