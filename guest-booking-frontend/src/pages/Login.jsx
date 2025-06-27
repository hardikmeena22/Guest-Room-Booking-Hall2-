import { useState } from "react"
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
export default function Login(){
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
            const res = await axios.post("http://localhost:5000/api/auth/login", {
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
        <form onSubmit={handleSubmit} className="login-Form">

            <input type="email" placeholder="Ex. Aaryan@iitk.ac.in" onChange={handleChange} name="email"/>
            <input type="password" placeholder="password" onChange={handleChange} name="password"/>
            <button type="submit">Login</button>
        </form>
    )

    }