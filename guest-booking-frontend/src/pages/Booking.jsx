import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookingPage() {
  const [query] = useSearchParams()
  const room = query.get("room");
  const [start, setStart] = useState(query.get("start") || ""); // <-- added fallback
  const [end, setEnd] = useState(query.get("end") || "");       // <-- added fallback
  const [purpose, setPurpose] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/available-rooms?start=${start}&end=${end}&purpose=${purpose}`)

   
  };

  return (
    <div>
    
      <h2>Book Room {room}</h2>
      <form onSubmit={handleSubmit}>
        <label>Start Date:</label>
        <input
          type="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}  required /><br />
        

        <label>End Date:</label>
        <input
          type="date"
          value={end}
          onChange={(e) => setEnd(e.target.value)} required /><br />
        
       

        <label>Purpose:</label>
        <input
          type="text"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)} required /><br />
        
       
        <button type="submit">Check Available Rooms</button>
      </form>
    </div>
  );
}

