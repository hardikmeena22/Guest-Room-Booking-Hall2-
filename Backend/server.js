const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
const mongoose = require('mongoose')
const bookingRoutes = require('./routes/booking');
app.use('/api/bookings', bookingRoutes)

require('dotenv').config()
console.log("🌐 Using Mongo URI:", process.env.MONGO_URI)
app.use(cors())

mongoose.connect(process.env.MONGO_URI, {
  dbName: 'guest_room_Hall_2', // 🔥 this forces the DB!

})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => console.error("❌ MongoDB connection error:", err))

const authRoutes = require('./routes/auth')


app.use('/api/auth', authRoutes)


const uri = process.env.MONGO_URI
const PORT = 5000
console.log("🧪 Connecting to:", process.env.MONGO_URI)
app.get('/ping', (req, res) => {
    console.log('✅ /ping hit');
    res.send('pong');
  })

app.listen(PORT, () => {console.log(`the server is successfully running on port ${PORT}`)})

