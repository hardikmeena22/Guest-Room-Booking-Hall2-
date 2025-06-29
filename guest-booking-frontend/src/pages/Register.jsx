import { useState } from "react"
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
export default function Register(){
    const navigate = useNavigate()
    const [formData, setFormData] = useState({name: '', email: '', password: '', confirmpassword: '' ,roll_no: ''})

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.name === 'roll_no' ? Number(e.target.value) : e.target.value
        })
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmpassword) {
            alert("Passwords do not match");
            return;
          }
        try{
            const res = await axios.post("http://localhost:5000/api/auth/register", formData)
            toast.success('User registered successfully!')
            console.log("Registered Successfully")
            navigate("/login")
        }
        catch(err){
            console.error('server error', err.response?.data || err.message)
        }
    }
    return(
        <form onSubmit={handleSubmit} className="register-Form">
            <input type="text" placeholder="Ex. Aaryan" name= 'name' onChange={handleChange}/>
            <input type="number" placeholder="Ex. 23000X" onChange={handleChange} name="roll_no"/>
            <input type="email" placeholder="Ex. Aaryan@iitk.ac.in" onChange={handleChange} name="email"/>
            <input type="password" placeholder="password" onChange={handleChange} name="password"/>
            <input type="password" placeholder="Confirm Password" onChange={handleChange} name="confirmpassword"/>
            <button type="submit">Register</button>
            <button onClick={() => navigate('/login')}>Already registered? Login</button>
        </form>
    )


}