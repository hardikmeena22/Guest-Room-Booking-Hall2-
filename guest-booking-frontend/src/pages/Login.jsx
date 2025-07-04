import { useState } from "react"
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
export default function Login(){
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const [formData, setFormData] = useState({ email: '', password: ''})
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post(`${backendURL}/api/auth/login`, {
                email: formData.email,
                password: formData.password
            })

            localStorage.setItem("token", res.data.token)
            toast.success('User Login successful!')
            console.log("Login Successful!")
            localStorage.setItem("name", res.data.name)
            navigate('/dashboard');
        }
        catch(err){
            const msg = err.response?.data?.msg || "Login failed"
            toast.error(msg)
            console.error('Login error:', err)
        }
    }
    return(
        <>
         <h1 className="flex justify-center items-center m-8 mt-20 font text-3xl font-semibold mb-30">Welcome to Hall 2 Guest Room Booking!</h1>
        <div className="flex flex-col min-h-screen  items-center justify-center ">   
        <form className="flex flex-col justify-center items-center p-30 px-20 m-0 border rounded-2xl border--700 max-w-md mb-100 gap-1" onSubmit={handleSubmit}>
          <h2 className="mb-15 text-lg"  style={{ fontFamily: '"Edu SA Hand", cursive' }}>Please Enter Your Login Details</h2>  
        <input className="border border-black-400 rounded-3xl mb-6 hover:bg-slate-100 p-2 " type="email" placeholder="👤 Email" onChange={handleChange} name="email"/>
        <input className="border border-black-400 rounded-3xl mb-8 hover:bg-slate-100 p-2 " type="password" placeholder="🔒 password" onChange={handleChange} name="password"/>
        <button className= "flex bg-pink-500 hover:bg-pink-600 text-gray-200 p-1 rounded px-7 hover:cursor-pointer mb-4" type="submit">Login</button>
        <h2 className="mb-5">-OR-</h2>
        <button
  className="hover:cursor-pointer mb-4 text-pink-500 hover:text-pink-700 text-lg"
  onClick={() => {
    setFormData({ email: '', password: '' }); // clear login state
    localStorage.removeItem("token"); // clear any existing token
    navigate('/register');
  }}
>
  Register Here
</button>
    </form></div>
     </>
    )

    }