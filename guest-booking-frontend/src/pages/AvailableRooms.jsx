import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function AvailableRooms() {
  const location = useLocation();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  // Get dates from query params
  const query = new URLSearchParams(location.search);
  const start = query.get("start");
  const end = query.get("end");

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await axios.get(`http://localhost:5000/api/booking/available?start=${start}&end=${end}`);
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
    <div>
      <h2>Available Rooms from {start} to {end}</h2>
      {Array.isArray(rooms) && rooms.length === 0 ? (
        <p>No rooms available for these dates.</p>
      ) : (
        Array.isArray(rooms) && rooms.map((room) => (
            <li key={room}>
              Room {room}
              <button onClick={() => handleSelectRoom(room)}>Select</button>
            </li>
        ))
      )}
    </div> 
  );
};

