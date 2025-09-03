import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MyBookings() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/booking/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
  }, [token, backendURL]);

  const handleCancelBooking = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    try {
      const res = await axios.delete(`${backendURL}/api/booking/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
    <>
      {/* ✅ Top Navigation */}
      <div className="sticky top-0 flex m-1 p-1 items-center justify-center gap-4 md:gap-8 lg:gap-40 h-20 bg-white shadow-lg">
        <button
          className="font-semibold hover:text-gray-700 transition-all duration-150"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>
        <button>|</button>
        <button
          className="font-semibold hover:text-lg hover:text-green-800 transition-all duration-150"
          onClick={() => navigate("/booking")}
        >
          📅 Book a Room
        </button>
        <button>|</button>
        <button
          className="font-semibold hover:text-lg hover:text-green-800 transition-all duration-150"
          onClick={() => navigate("/my-bookings")}
        >
          📄 My Bookings
        </button>
        <button>|</button>
        <button
          className="font-semibold hover:text-red-500 transition-colors duration-100"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          🚪 Logout
        </button>
      </div>

      {/* ✅ Content */}
      <div className="min-h-screen bg-[#F7F4EA] p-6">
        <h2 className="text-3xl font-bold text-center mb-8">My Bookings</h2>

        {bookings.length === 0 ? (
          <p className="text-gray-600 text-center text-lg">
            No bookings found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white shadow-lg border border-gray-300 rounded-xl p-5 hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Room No: {booking.room_no}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Start Date:</span>{" "}
                  {new Date(booking.start_date).toLocaleDateString("en-GB")}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">End Date:</span>{" "}
                  {new Date(booking.end_date).toLocaleDateString("en-GB")}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-medium">Purpose:</span> {booking.purpose}
                </p>
                <button
                  onClick={() => handleCancelBooking(booking._id)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel Booking
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ Footer */}
      <footer className="bg-black text-center p-4 text-white h-20 mt-10">
        © 2025 Hall 2, IIT Kanpur. All rights reserved.
      </footer>
    </>
  );
}
