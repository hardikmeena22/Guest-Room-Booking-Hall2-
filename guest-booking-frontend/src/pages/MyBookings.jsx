import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate= useNavigate()

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/booking/user/${userId}`);
        setBookings(res.data);
      } catch (err) {
        console.error("❌ Error fetching bookings:", err);
      }
    };
    fetchBookings();
  }, [userId]);

  return (
    <div>
        <button onClick={() => navigate('/dashboard')}>Dashboard </button>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Room No</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.room_no}</td>
                <td>{new Date(booking.start_date).toLocaleDateString()}</td>
                <td>{new Date(booking.end_date).toLocaleDateString()}</td>
                <td>{booking.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
