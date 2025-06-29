import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'

export default function Dashboard(){
    const [name, setName] = useState('')
    const navigate = useNavigate()
    useEffect(() => 
    {const token = localStorage.getItem('token' )
    if (!token) navigate('/login')

    const storedName = localStorage.getItem('name');
    setName(storedName)
} , [navigate])


return(
    <>
    <div className='Navbar'>
        <button onClick={() => navigate('/booking')}>📅 Book a Room</button>
        <button onClick={() => navigate('/my-bookings')}>📄 My Bookings</button>
        <button onClick={() => {
          localStorage.removeItem("token");
          navigate('/login');
        }}>🚪 Logout</button>
    </div>
   
   <div>
    <h1>Welcome {name}</h1>
    <button onClick={() => navigate('/booking')}>Book Room </button>
    </div>
    </>
   
)

}