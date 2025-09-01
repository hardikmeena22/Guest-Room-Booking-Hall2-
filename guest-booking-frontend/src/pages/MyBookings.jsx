import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function MyBookings() {
  const backendURL = import.meta.env.VITE_BACKEND_URL
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token")
  const navigate= useNavigate()

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/booking/user`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        // ✅ Filter out bookings whose end_date has passed
        const today = new Date();
        const validBookings = res.data.filter(
          (b) => new Date(b.end_date) >= today
        );
  
        setBookings(validBookings);
  
      } catch (err) {
        console.error("❌ Error fetching bookings:", err);
      }
    };
    fetchBookings();
  }, [token]);
  
  const handleCancelBooking = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
  
    try {
      const res = await axios.delete(`${backendURL}/api/booking/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      alert(res.data.msg);
  
      // Remove from UI
      setBookings((prev) => prev.filter((b) => b._id !== id));
  
    } catch (err) {
      console.error("❌ Error cancelling booking:", err);
      alert(err.response?.data?.msg || "Failed to cancel booking");
    }
  };
  

  return (
    <div>
         <div className=' sticky top-0 flex m-1 p-1 items-center  justify-center gap-4 md:gap-8 lg:gap-40 h-20 bg-white shadow-lg'
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
    <div className="p-6">
  <h2 className="text-2xl font-bold mb-4">My Bookings:</h2>

  {bookings.length === 0 ? (
    <p className="text-gray-600">No bookings found.</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="bg-white shadow-lg border border-gray-500 rounded-lg p-4"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Room No: {booking.room_no}
          </h3>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Start Date:</span>{' '}
            {new Date(booking.start_date).toLocaleDateString('en-GB')}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">End Date:</span>{' '}
            {new Date(booking.end_date).toLocaleDateString('en-GB')}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Purpose:</span> {booking.purpose}
          </p>
          <button
  onClick={() => handleCancelBooking(booking._id)}
  className="mt-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
>
  Cancel
</button>

        </div>
      ))}
    </div>
  )}
</div>
    </div>
  );
}
