import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import Hall2 from './Hall2.png'
import Ha from './Ha.png'

export default function Dashboard(){
    const [name, setName] = useState('')
    const navigate = useNavigate()
    useEffect(() => 
    {const token = localStorage.getItem('token' )
    if (!token) navigate('/login')

    const storedName = localStorage.getItem('name');
    setName(storedName)
} , [navigate])


return(
    <>
    <div className=' sticky top-0 flex m-1 p-1 items-center  justify-center gap-4 md:gap-8 lg:gap-40 h-20 bg-white shadow-lg whitespace-nowrap'
      >
        <button className = "font-semibold space-x-20  hover:text-gray-700 hover:cursor-pointer transition-all duration-150" onClick={() => navigate('/dashboard')}>Dashboard </button>
        <button>|</button> 
        <button className = "font-semibold space-x-20 hover:text-lg hover:text-green-800 hover:cursor-pointer transition-all duration-150" onClick={() => navigate('/booking')}>📅 Book a Room </button>
        <button>|</button> 
        <button className = "font-semibold hover:text-lg hover:text-green-800 hover:cursor-pointer transition-all duration-150 " onClick={() => navigate('/my-bookings')}>📄 My Bookings</button>
        <button>|</button>
        <button className = "font-semibold place-items-end hover:text-red-500 transition-colors duration-100" onClick={() => {
          localStorage.removeItem("token");
          navigate('/login');
        }}>🚪 Logout</button>
    </div>
   <div className='flex flex-col min-h-screen bg-[#F7F4EA]'>
   <div className='flex flex-col justify-center items-center'>
    <h1 className='flex items-center justify-center text-3xl mt-10 text-black underline' style={{ fontFamily: '"Edu SA Hand", cursive' }}>Welcome {name}!</h1>
    </div>
    <h2 className='mt-25 font-semibold m-5 px-3 text-3xl text-black'>Points to consider while booking a room:</h2>
    <div className='m-5 px-6 text-lg '>
        <ol className='list-decimal list-inside bg-white rounded-xl shadow-lg space-y-15 p-10 py-30  text-lg m-10' >
        <li><span className='font-semibold underline'>Booking Methods:</span> Rooms can be booked either online via this portal or in person at the Hall Office.</li>
        <li><span className='font-semibold underline'>Duration Limit:</span> Guests cannot stay for more than 7 consecutive days. Please plan your booking accordingly.</li>
        <li><span className='font-semibold underline'>Billing Policy:</span> Upon arrival, guests are required to visit the Hall Office to complete the payment process.</li>
        <li><span className='font-semibold underline'>Guest Restrictions:</span> Female parents and siblings are not permitted to stay in the guest room, as per hostel policy.</li>
        <li><span className='font-semibold underline'>ID Verification:</span> Guests may be asked to present a valid government-issued ID upon arrival. Please ensure they carry one.</li>
       
    </ol> </div>
    <div className='flex flex-col justify-center items-center'>
    <button className='flex bg-green-400 p-3 rounded-2xl text-2xl mt-7 hover:cursor-pointer hover:bg-green-600 transition-colors duration-300 m-5  ' onClick={() => navigate('/booking')}>Book Room </button> 
    </div>
    </div>
    <footer className="bg-black text-center p-4 text-white h-20">
  © 2025 Hall 2, IIT Kanpur. All rights reserved.
</footer>
    </>
   
)

}