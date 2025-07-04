require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// ✅ Put CORS at the top, before routes!
const allowedOrigins = [
  'http://localhost:5173',
  'https://guest-room-booking-hall2.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser clients like Postman
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

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
  console.log('✅ /ping hit');
  res.send('pong');
});

// ✅ Important: Use process.env.PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
