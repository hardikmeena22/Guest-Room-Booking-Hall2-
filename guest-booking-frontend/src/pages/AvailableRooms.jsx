import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function AvailableRooms() {
  const backendURL = import.meta.env.VITE_BACKEND_URL
  const location = useLocation();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  // Get dates from query params
  const query = new URLSearchParams(location.search);
  const start = query.get("start");
  const end = query.get("end");

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await axios.get(`${backendURL}/api/booking/available?start=${start}&end=${end}`);
      console.log('Available rooms response:', res.data)
      setRooms(res.data.availableRooms || []);
    };
    fetchRooms();
  }, [start, end]);
 
  const handleSelectRoom = (room) => {
    // Navigate to booking page with room and dates
    navigate(`/confirm-booking?start=${start}&end=${end}&room=${room}&purpose=${query.get("purpose")}`);
  };

  return (
    <>
        <div className=' sticky top-0 flex m-1 p-1 items-center  justify-center gap-4 md:gap-8 lg:gap-40 h-20 bg-white shadow-lg'
      >
        <button className = "font-semibold space-x-20 hover:text-lg hover:text-green-800 hover:cursor-pointer transition-all duration-150" onClick={() => navigate('/booking')}>📅 Book a Room </button>
        <button>|</button> 
        <button className = "font-semibold hover:text-lg hover:text-green-800 hover:cursor-pointer transition-all duration-150 " onClick={() => navigate('/my-bookings')}>📄 My Bookings</button>
        <button>|</button>
        <button className = "font-semibold place-items-end hover:text-red-500 transition-colors duration-100" onClick={() => {
          localStorage.removeItem("token");
          navigate('/login');
        }}>🚪 Logout</button>
    </div>
    <div className=" flex-grow flex flex-col justify-center items-center ">
      <h2 className="font-semibold text-2xl mt-5">These rooms are avaialble</h2>
      <h2 className="text-lg m-5">From: <span className="font-semibold">{new Date(start).toDateString()} </span> To: <span className="font-semibold">{new Date(end).toDateString()} </span>
      </h2>  </div> 
      {Array.isArray(rooms) && rooms.length === 0 ? (
        <p>No rooms available for these dates.</p>
      ) : (

        <div className=" flex flex-wrap justify-center ">
       {rooms && Array.isArray(rooms) && rooms.map((room) => (
         
            <div key={room} className="  list-none flex flex-col text-2xl border border-green-900 m-3 mt-40 p-20 rounded-md ">
              Room {room}
              <button className="mt-3 bg-green-400 rounded-lg p-1 hover:bg-green-500" onClick={() => handleSelectRoom(room)}>Select</button>
            </div>
           
        ))}
        </div>
      )}
     
     <div>
</div>
    </>

  );
};

