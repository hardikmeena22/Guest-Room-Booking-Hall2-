import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import toast from "react-hot-toast";

export default function BookingPage() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [query] = useSearchParams();
  const room = query.get("room");
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [purpose, setPurpose] = useState("");
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!from || !to) {
      toast.error("Please select both start and end dates.");
      return;
    }
    navigate(
      `/available-rooms?start=${from}&end=${to}&purpose=${purpose}`
    );
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

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

      {/* Content */}
      <h2 className="flex justify-center items-center text-2xl mt-10">
        Room Booking Portal {room && `(Room ${room})`}
      </h2>
      <h2 className="flex justify-center items-center text-2xl mt-5">
        Select Dates
      </h2>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="flex flex-col md:flex-row items-start justify-center gap-10">
          {/* From Date */}
          <div className="flex flex-col items-center w-full max-w-xs">
            <p className="mb-3 font-semibold text-lg">From:</p>
            <DayPicker
              mode="single"
              captionLayout="dropdown"
              selected={from}
              onSelect={(date) => {
                setFrom(date);
                setTo(undefined);
              }}
              disabled={{
                before: today,
                after: new Date(new Date().setDate(new Date().getDate() + 38)),
              }}
              classNames={{
                month: "border-2 border-black rounded-lg p-5 shadow",
              }}
            />
          </div>

          {/* To Date */}
          <div className="flex flex-col items-center w-full max-w-xs">
            <p className="mb-3 font-semibold text-lg">To:</p>
            <DayPicker
              mode="single"
              selected={to}
              onSelect={setTo}
              disabled={[
                {
                  before: from,
                  after: from
                    ? new Date(
                        Math.min(
                          new Date(from).setDate(new Date(from).getDate() + 6),
                          new Date().setDate(new Date().getDate() + 38)
                        )
                      )
                    : undefined,
                },
              ]}
              fromDate={from}
              toDate={
                from
                  ? new Date(
                      new Date(from).setDate(new Date(from).getDate() + 6)
                    )
                  : undefined
              }
              classNames={{
                month: "border-2 border-black rounded-lg p-5 shadow",
              }}
            />
          </div>
        </div>

        {/* Date Summary */}
        <p className="flex justify-center items-center text-xl font-semibold mt-5">
          {from && to
            ? `Selected: ${from.toDateString()} → ${to.toDateString()}`
            : "Please select a start and end date"}
        </p>

        {/* Purpose */}
        <div className="flex justify-center items-center mt-8 mb-5">
          <label className="mr-3 text-xl">Purpose:</label>
          <input
            className="border border-black rounded-md p-3 w-64"
            type="text"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
          />
        </div>

        {/* Submit */}
        <div className="flex justify-center items-center">
          <button
            className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 transition"
            type="submit"
          >
            Check Available Rooms
          </button>
        </div>
      </form>
    </>
  );
}
