import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ConfirmBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);

  const start = query.get("start");
  const end = query.get("end");
  const room = query.get("room");
  const purpose = query.get("purpose");

  const handleConfirm = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not logged in");
      return;
    }

    const confirmed = window.confirm("₹400 will be added to your mess bill. Proceed?");
    if (!confirmed) return;

    try {
      const res = await axios.post("http://localhost:5000/api/booking", {
        userId,
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
    <div>
      <h2>Confirm Booking</h2>
      <p>Room: {room}</p>
      <p>From: {start}</p>
      <p>To: {end}</p>
      <p>Purpose: {purpose}</p>
      <p>₹400 will be added to your mess bill.</p>
      <button onClick={handleConfirm}>Confirm Booking</button>
    </div>
  );
}
