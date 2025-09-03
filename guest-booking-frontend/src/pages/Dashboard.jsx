import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [name, setName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");

    const storedName = localStorage.getItem("name");
    setName(storedName);
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F4EA]">
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
            className="font-semibold hover:text-gray-700 transition-all duration-150"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
          <button
            className="font-semibold hover:text-green-800 transition-all duration-150"
            onClick={() => navigate("/booking")}
          >
            📅 Book a Room
          </button>
          <button
            className="font-semibold hover:text-green-800 transition-all duration-150"
            onClick={() => navigate("/my-bookings")}
          >
            📄 My Bookings
          </button>
          <button
            className="font-semibold hover:text-red-500 transition-colors duration-150"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-start items-center px-6 py-10">
        <h1
          className="text-3xl text-black underline mb-8"
          style={{ fontFamily: '"Edu SA Hand", cursive' }}
        >
          Welcome {name}!
        </h1>

        <h2 className="font-semibold text-2xl text-black mb-6">
          Points to consider while booking a room:
        </h2>

        <div className="w-full max-w-5xl text-lg">
          <ol className="list-decimal list-inside bg-white rounded-2xl shadow-xl p-10 space-y-10">
            <li className="text-2xl">
              <span className="font-semibold underline">Booking Methods:</span>{" "}
              Rooms can be booked either online via this portal or in person at
              the Hall Office.
            </li>
            <li className="text-2xl">
              <span className="font-semibold underline">Duration Limit:</span>{" "}
              Guests cannot stay for more than 7 consecutive days. Please plan
              your booking accordingly.
            </li >
            <li className="text-2xl">
              <span className="font-semibold underline">Billing Policy:</span>{" "}
              Upon arrival, guests are required to visit the Hall Office to
              complete the payment process.
            </li>
            <li className="text-2xl">
              <span className="font-semibold underline">Guest Restrictions:</span>{" "}
              Female parents and siblings are not permitted to stay in the guest
              room, as per hostel policy.
            </li>
            <li className="text-2xl">
              <span className="font-semibold underline">ID Verification:</span>{" "}
              Guests may be asked to present a valid government-issued ID upon
              arrival. Please ensure they carry one.
            </li>
          </ol>
        </div>


        <button
          className="bg-green-400 px-6 py-3 rounded-2xl text-2xl mt-10 hover:bg-green-600 transition-colors duration-300"
          onClick={() => navigate("/booking")}
        >
          Book Room
        </button>
      </main>

      {/* Footer */}
      <footer className="bg-black text-center p-4 text-white">
        © 2025 Hall 2, IIT Kanpur. All rights reserved.
      </footer>
    </div>
  );
}
