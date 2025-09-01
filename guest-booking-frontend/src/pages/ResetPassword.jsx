import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/reset-password", { token, password });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h2 className="text-xl mb-4">Set new password</h2>
  
      {!message.includes("successfully") ? (
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 mb-3"
          />
          <button type="submit" className="w-full bg-green-600 text-white p-2">
            Reset Password
          </button>
        </form>
      ) : (
        <div className="text-center">
          <p className="text-green-600 font-semibold mb-4">{message}</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition"
          >
            Login
          </button>
        </div>
      )}
  
      {message && !message.includes("successfully") && (
        <p className="mt-2 text-center text-red-500">{message}</p>
      )}
    </div>
  )
      }