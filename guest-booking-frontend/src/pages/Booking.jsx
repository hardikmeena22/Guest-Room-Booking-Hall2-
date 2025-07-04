import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css'; 

export default function BookingPage() {
  const backendURL = import.meta.env.VITE_BACKEND_URL
  const [query] = useSearchParams()
  const room = query.get("room");
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [purpose, setPurpose] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/available-rooms?start=${from}&end=${to}&purpose=${purpose}`)
image.png
   
  };

  return (
    <>
          <div className=' sticky top-0 flex m-1 p-1 items-center  justify-center gap-4 md:gap-8 lg:gap-40 h-20 bg-white shadow-lg whitespace-nowrap'
      >
        <button className = "font-semibold space-x-20  hover:text-gray-700 hover:cursor-pointer transition-all duration-150" onClick={() => navigate('/dashboard')}>Dashboard </button>
        <button>|</button> 
        <button className = "font-semibold space-x-20 hover:text-lg hover:text-green-800 hover:cursor-pointer transition-all duration-150 whitespace-nowrap" onClick={() => navigate('/booking')}>📅 Book a Room </button>
        <button>|</button> 
        <button className = "font-semibold hover:text-lg hover:text-green-800 hover:cursor-pointer transition-all duration-150 whitespace-nowrap " onClick={() => navigate('/my-bookings')}>📄 My Bookings</button>
        <button>|</button>
        <button className = "font-semibold place-items-end hover:text-red-500 transition-colors duration-100" onClick={() => {
          localStorage.removeItem("token");
          navigate('/login');
        }}>🚪 Logout</button>
    </div>
    
      <h2 className='flex justify-center items-center text-2xl mt-10 '>Room Booking Portal{room}</h2>
      <h2 className='flex justify-center items-center text-2xl mt-5 '>Select Dates</h2>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col md:flex-row items-start justify-center gap-6 w-full px-4'>
        <div className='flex flex-col items-center w-full max-w-xs'> 
        <p className='mr-75 mb-5 font-semibold text-lg'>From:</p>
        <DayPicker mode="single"
        selected={from}
        onSelect={(date) => {
          setFrom(date)
          setTo(undefined)
        }}
        classNames={{
          month: "border-2 border-black rounded-lg p-5  shadow"
        }}
      />
    </div>
        <div className='flex flex-col items-center w-full max-w-xs' >  
        <p className='mr-75 mb-5 font-semibold text-lg'>To:</p>
        <DayPicker mode="single"
        selected={to}
        onSelect={setTo}
        disabled={[
          { before: from },
        {
          after: from
            ? new Date(new Date(from).setDate(new Date(from).getDate() + 6)) // max 7 days including from date
            : undefined,
        }
      ]}
      fromDate={from}
      toDate={from ? new Date(new Date(from).setDate(new Date(from).getDate() + 6)) : undefined}
        classNames={{
          month: "border-2 border-black rounded-lg p-5  shadow"
        }}
      />
</div> </div>
<p className=" flex justify-center items-center text-2xl font-semibold mt-2">
    {from && to
      ? `Selected: ${from.toDateString()} → ${to.toDateString()}`
      : 'Please select a start and end date'}
  </p>

        <div className='flex  justify-center items-center mt-10 mb-5'><label className='mr-3 text-2xl'>Purpose:</label>
        <input   className='border border-black rounded-md w-200 p-3'
          type="text"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)} required /><br />
          </div>
        
       
        <div className='flex justify-center items-center'><button className='flex bg-green-500 rounded-lg p-2 hover:bg-green-600'  type="submit" onClick={handleSubmit}>Check Available Rooms</button> </div>
      </form>
    </>
  );
}

