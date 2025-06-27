const express = require('express')
const User = require('../models/User')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs'); // or 'bcrypt'

router.post('/register', async(req,res)=> {
    console.log("🔥 Route entered")
    const {name, roll_no, email, password} = req.body
    if(!name || !email || !password || !roll_no){
        return res.status(400).json({ msg:'please enter all fields'})
    }
    
    try{
        console.log("Register route hit with:", req.body)
    
        const userExists = await User.findOne({ email })
        if(userExists){
            return res.status(400).json({ msg: 'user already exists'})
        }
    
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
    
        const newUser = new User({
            name,
            roll_no,
            email,
            password: hashedPassword
        })
        await newUser.save()
        console.log('user saved to mongodb')
        return res.status(201).json({ msg: 'User registered successfully'})
    
    }
    catch(err){
        console.error("❌ Registration error:", err)
        res.status(500).send('Server Error')
    }

   
})

router.post('/login', async(req,res)=> {
    console.log("login initiated")
    const{email, password} = req.body
    if(!password || !email){
        res.status(404).json({msg: 'please enter all the required fields'})
    }

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ msg: 'Invalid email or password' });
        }
    
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ msg: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
     
    
        // Successful login
        console.log("✅ Sending name to frontend:", user.name)
        res.json({
          msg: 'Login successful',
          token,
          name: user.name,
          user: {
            name: user.name,
            email: user.email,
            roll_no: user.roll_no,
            id: user._id
          }
        });
   
      } catch (err) {
        console.error('❌ Login error:', err);
        res.status(500).send('Server Error');
      }
})



module.exports = router