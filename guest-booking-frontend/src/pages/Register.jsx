import { useState, useEffect } from "react"
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  useEffect(() => {
    // prevent accidental auto-login
    localStorage.removeItem('token');
  }, [])
    const navigate = useNavigate()
    const [formData, setFormData] = useState({name: '', email: '', password: '', confirmpassword: '' ,roll_no: '', otp: ''})
    const [otpSent, setOtpSent] = useState(false)
    const handleSendOtp = async () => {
        try {
          await axios.post('/api/auth/send-otp', { email: formData.email });
          toast.success("OTP sent to your email!");
          setOtpSent(true); // this line is critical
        } catch (err) {
          toast.error("Failed to send OTP.");
          console.error(err);
        }
      }
    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.name === 'roll_no' ? Number(e.target.value) : e.target.value
        })
        
    }

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (formData.password !== formData.confirmpassword) {
        toast.error("Passwords do not match");
        return;
      }
    
      if (!formData.email.endsWith('@iitk.ac.in')) {
        toast.error('Please register with your IITK email');
        return;
      }
    
      try {
        // 🔍 Check if user already exists first
        const checkRes = await axios.post("http://localhost:5000/api/auth/check-user", { email: formData.email });
        if (checkRes.data.exists) {
          toast.error("User already registered");
          return;
        }
    
        // ✅ Then verify OTP
        const otpRes = await axios.post('/api/auth/verify-otp', {
          email: formData.email,
          otp: formData.otp,
        });
    
        if (otpRes.data.message !== 'OTP verified successfully!') {
          toast.error(otpRes.data.message || 'OTP verification failed');
          return;
        }
    
        // 📝 Finally register the user
        const res = await axios.post("http://localhost:5000/api/auth/register", formData);
        toast.success('User registered successfully!');
        navigate("/login");
    
      } catch (err) {
        const msg = err.response?.data?.message || "Server error";
        toast.error(msg);
        console.error('Register error:', err);
      }
       
    }
    return(
        <>
        <h1 className="flex justify-center items-center m-8 mt-20 font text-3xl font-semibold">Welcome to Hall 2 Guest Room Booking!</h1>
       <div className="flex flex-col min-h-screen  items-center justify-center ">
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center p-10 px-20 m-0 border rounded-2xl border--700 max-w-md mb-60">
        <h2 className="mb-10 mt-0 "  style={{ fontFamily: '"Edu SA Hand", cursive' }}>Register here!</h2>
            <input class="border border-black-400 rounded-3xl mb-6 hover:bg-slate-100 p-2 " type="text" placeholder="👤 Name" name= 'name' onChange={handleChange}/>
            <input className="border border-black-400 rounded-3xl mb-6 hover:bg-slate-100 p-2 " type="number" placeholder="Ex. 23000X" onChange={handleChange} name="roll_no"/>
 <input className="border border-black-400 rounded-3xl mb-6 hover:bg-slate-100 p-2 " type="email" placeholder="👤 Email" onChange={handleChange} name="email"/>
            <input className="border border-black-400 rounded-3xl mb-6 hover:bg-slate-100 p-2 " type="password" placeholder="🔒 password" onChange={handleChange} name="password"/>
            <input  className="border border-black-400 rounded-3xl mb-8 hover:bg-slate-100 p-2 " type="password" placeholder="🔒Confirm Password" onChange={handleChange} name="confirmpassword"/>
            <button
  type="button"
  className="text-pink-500 hover:text-pink-700"
  onClick={handleSendOtp}
>
  Send OTP
</button>
            {otpSent && (
  <input
    className="border border-gray-400 rounded-xl mb-6 px-4 py-2"
    type="text"
    placeholder="Enter OTP"
    name="otp"
    value={formData.otp}
    onChange={handleChange}
  />
)}
{otpSent && (
  <button
    className="flex bg-pink-500 hover:bg-pink-600 text-gray-200 p-1 rounded px-7 hover:cursor-pointer mb-4"
    type="submit"
  >
    Register
  </button>
)}
            <h2 className="mb-4">-OR-</h2>
            <button type="button" className= "hover:cursor-pointer mb-4 text-pink-500 hover:text-pink-700" onClick={() => navigate('/login')}>Already registered? Login</button>
        </form></div> 
        </>
    )


}