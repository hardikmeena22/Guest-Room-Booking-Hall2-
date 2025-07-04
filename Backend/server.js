require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.options('*', cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

console.log("🌐 Using Mongo URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  dbName: 'guest_room_Hall_2'
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

const bookingRoutes = require('./routes/booking');
const authRoutes = require('./routes/auth');

app.use('/api/booking', bookingRoutes);
app.use('/api/auth', authRoutes);

app.get('/ping', (req, res) => {
  res.send('pong');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,'0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
