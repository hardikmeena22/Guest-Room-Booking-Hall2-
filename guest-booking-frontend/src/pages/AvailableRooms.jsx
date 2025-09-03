import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function AvailableRooms() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const location = useLocation();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  // Query params
  const query = new URLSearchParams(location.search);
  const start = query.get("start");
  const end = query.get("end");

  // We only want 3 rooms
  const allowedRooms = [101, 102, 103];
  const roomNameMap = {
    101: "Guest Room 1",
    102: "Guest Room 2",
    103: "Guest Room 3",
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(
          `${backendURL}/api/booking/available?start=${start}&end=${end}`
        );
        console.log("Available rooms response:", res.data);

        // ✅ Only keep the 3 allowed rooms
        const filtered = (res.data.availableRooms || []).filter((room) =>
          allowedRooms.includes(room)
        );

        setRooms(filtered);
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setRooms([]);
      }
    };
    if (start && end) {
      fetchRooms();
    }
  }, [backendURL, start, end]);

  const handleSelectRoom = (room) => {
    navigate(
      `/confirm-booking?start=${start}&end=${end}&room=${room}&purpose=${query.get(
        "purpose"
      )}`
    );
  };

  return (
    <>
      {/* Navbar */}
      <div className="sticky top-0 bg-white shadow-lg p-3 z-50">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-lg text-green-700">
            Hall 2 Guest Room
          </h1>
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        <div
          className={`flex flex-col md:flex-row md:justify-center md:gap-8 lg:gap-20 mt-2 md:mt-0 
            ${menuOpen ? "block" : "hidden md:flex"}`}
        >
          <button
            className="font-semibold hover:text-green-800"
            onClick={() => navigate("/dashboard")}
          >
            🏠 Dashboard
          </button>
          <button
            className="font-semibold hover:text-green-800"
            onClick={() => navigate("/booking")}
          >
            📅 Book a Room
          </button>
          <button
            className="font-semibold hover:text-green-800"
            onClick={() => navigate("/my-bookings")}
          >
            📄 My Bookings
          </button>
          <button
            className="font-semibold hover:text-red-500"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center p-6">
        <h2 className="font-semibold text-2xl mt-5">Available Rooms</h2>
        <h2 className="text-lg m-5">
          From:{" "}
          <span className="font-semibold">
            {new Date(start).toDateString()}
          </span>{" "}
          → To:{" "}
          <span className="font-semibold">{new Date(end).toDateString()}</span>
        </h2>
      </div>

      {Array.isArray(rooms) && rooms.length === 0 ? (
        <p className="text-center text-lg font-medium text-red-600">
          ❌ No rooms available for these dates.
        </p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 p-6">
          {rooms.map((room) => (
            <div
              key={room}
              className="flex flex-col items-center text-xl border border-green-700 m-3 p-8 rounded-xl shadow-md bg-white hover:shadow-xl transition"
            >
              <span className="font-semibold">
                {roomNameMap[room] || `Room ${room}`}
              </span>
              <button
                className="mt-3 bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 transition"
                onClick={() => handleSelectRoom(room)}
              >
                Select
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
