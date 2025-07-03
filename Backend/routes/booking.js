const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { route } = require('./auth');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'MasterPassword123'



router.post('/', async (req, res) => {
    const {token, room_no, start_date, end_date, purpose } = req.body;
  
    if (!token || !room_no || !start_date || !end_date) {
      return res.status(400).json({ msg: 'Please fill all required fields' });
    }

    
  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid or expired token' });
  }

  const userId = decoded.id;
    try{
        const newBooking = new Booking({
            user: userId,
            room_no,
            start_date,
            end_date,
            purpose
          })
          const existingBooking = await Booking.findOne({
            room_no,
            $or: [
              {
                start_date: { $lte: new Date(end_date) },
                end_date: { $gte: new Date(start_date) }
              }
            ]
          });
          
          if (existingBooking) {
            return res.status(400).json({ msg: 'Room already booked for the selected dates' });
          }

          await newBooking.save();
    res.status(201).json({ msg: 'Booking successful', booking: newBooking });
  } catch (err) {
    console.error('❌ Booking error:', err);
    res.status(500).send('Server error');
  }

        })
        router.get('/user/', async (req, res) => {
          const token = req.headers.authorization?.split(' ')[1];
            try {
              const decoded = jwt.verify(token, "MasterPassword123" )
              const bookings = await Booking.find({ user: decoded.id }).sort({ createdAt: -1 });
              res.json(bookings);
            } catch (err) {
              console.error('❌ Fetch error:', err);
              res.status(500).send('Server error');
            }
          })

          router.get('/', async (req, res) => {
            try {
              const bookings = await Booking.find().populate('user', 'name email roll_no').sort({ createdAt: -1 });
              res.json(bookings);
            } catch (err) {
              console.error('❌ Fetch error:', err);
              res.status(500).send('Server error');
            }
          })
          
          router.delete('/:id', async (req,res) => {
            try
            {const booking = await Booking.findById(req.params.id)

            if(!booking){
              return res.status(404).json({msg: 'Booking not found'})
            }
            await Booking.deleteOne()
            res.json({msg:'Booking cancelled successfully'})}
            catch(err){
              console.error('Fetch error', err)
              res.status(500).send('Server error')
            }
          })

          router.get('/available', async (req, res) => {
            const { start, end } = req.query;
          
            if (!start || !end) {
              return res.status(400).json({ msg: 'Start and end dates are required' });
            }
          
            try {
              const allRooms = [101, 102, 103, 104, 105, 106, 107, 108, 109, 110];
          
              const bookedRooms = await Booking.find({
                
                  
                    start_date: { $lte: new Date(end) },
                    end_date: { $gte: new Date(start) }
                  
                
              }).distinct('room_no');
          
              const availableRooms = allRooms.filter(room => !bookedRooms.includes(room));
              console.log("bookedRooms:", bookedRooms);
console.log("allRooms:", allRooms);
console.log("availableRooms:", availableRooms);
          
              res.json({ availableRooms });
            } catch (err) {
              console.error('❌ Error fetching available rooms:', err);
              res.status(500).send('Server error');
            }
          })


        module.exports = router 