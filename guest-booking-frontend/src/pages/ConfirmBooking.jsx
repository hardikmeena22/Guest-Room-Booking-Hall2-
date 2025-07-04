import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ConfirmBooking() {
  const backendURL = import.meta.env.VITE_BACKEND_URL
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);

  const start = query.get("start");
  const end = query.get("end");
  const room = query.get("room");
  const purpose = query.get("purpose");
  const token = localStorage.getItem("token")
  const handleConfirm = async () => {
   
    if (!token) {
      alert("User not logged in");
      return;
    }


    const confirmed = window.confirm("₹400 will be added to your mess bill. Proceed?");
    if (!confirmed) return;

    try {
      const res = await axios.post(`${backendURL}/api/booking`, {
        token,
        room_no: room,
        start_date: start,
        end_date: end,
        purpose,
      });
      alert("✅ Booking successful!");
      console.log(res.data);
      navigate("/my-bookings");
    } catch (err) {
      console.error("Booking error", err);
      alert("❌ Failed to book room");
    }
  };

  return (
    <>
    <div  className=" flex flex-col justify-center items-center bg-white border border-gray-400 rounded-xl shadow-lg px-8 py-6 max-w-xl mx-auto mt-25 text-center">
      <h2 className='font-bold text-2xl p-5 m-5 border border-red-300 rounded-md'>CONFIRM BOOKING</h2>
      <p className='font-semibold text-2xl m-5 underline'>Room: {room} </p>
      <div className='flex mt-10 font-sans'><p className=''>From: <span className='font-semibold underline'>{new Date(start).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
</span></p>
      <p className='mr-4 ml-4'>&#x279C;</p>
      <p>To:  <span className='font-semibold underline'>{new Date(end).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
</span> </p>
      </div>
      <p className='mb-20 mt-20  '><span className='font-semibold text-lg'> Purpose: </span> {purpose}</p>
      <div className="mb-10 bg-red-200 text-yellow-800 border border-yellow-300 px-4 py-2 rounded-md shadow-sm text-center max-w-md">
  ₹400 will be added to your mess bill.
</div>
     
    </div>
    <div className='flex justify-center items-center'> <button className='  bg-green-400 hover:bg-green-500 p-2 rounded-lg mt-10 hover:text-white cursor-pointer' onClick={handleConfirm}>Confirm Booking</button>
    </div>
     </>
  );
}
