const express = require('express')
const User = require('../models/User')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs'); // or 'bcrypt'
const Otp = require('../models/Otp')
const sendOTP = require('../utils/sendOTP')


router.post('/send-otp', async (req, res) => {
  const rawEmail = req.body.email;
  console.log("📥 Incoming raw email:", rawEmail);

  if (!rawEmail) {
    console.log("❌ No email provided");
    return res.status(400).json({ message: 'Email is required.' });
  }

  const email = rawEmail.toLowerCase().trim();
  console.log("✅ Normalized email:", email);

  if (!email.endsWith('@iitk.ac.in')) {
    console.log("❌ Rejected: Not IITK email");
    return res.status(400).json({ message: 'Only IITK emails allowed.' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // valid for 10 mins

  // Remove any existing OTPs for this email
  await Otp.deleteMany({ email })
  const newOtp = new Otp({
    email,
    otp,
    expiresAt
  });
  await newOtp.save()



  try {
    await sendOTP(email, otp);
    res.json({ message: 'OTP sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send OTP.' });
  }
});
router.post('/verify-otp', async (req, res) => {
  const rawEmail = req.body.email;
  const otp = req.body.otp;

  console.log("📥 Incoming verify request:", req.body);

  if (!rawEmail || !otp) {
    return res.status(400).json({ message: 'Email and OTP required.' });
  }

  const email = rawEmail.toLowerCase().trim();

  const record = await Otp.findOne({ email });

if (!record) {
  return res.status(400).json({ message: 'OTP not found. Please request again.' });
}

if (new Date() > record.expiresAt) {
  await Otp.deleteOne({ email });
  return res.status(400).json({ message: 'OTP expired.' });
}

if (record.otp !== otp) {
  return res.status(400).json({ message: 'Invalid OTP.' });
}

// OTP is valid, delete it
await Otp.deleteOne({ email });

res.json({ message: 'OTP verified successfully!' });

  delete otpStore[email];
  res.json({ message: 'OTP verified successfully!' });

});


router.post('/register', async(req,res)=> {
  
    console.log("🔥 Route entered")
    const {name, roll_no, email, password} = req.body
    if(!name || !email || !password || !roll_no){
        return res.status(400).json({ msg:'please enter all fields'})
    }
    if (!email.endsWith('@iitk.ac.in')) {
      return res.status(400).json({ message: 'Only IIT Kanpur email addresses are allowed.' });
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

router.post('/check-user', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const user = await User.findOne({ email });
    if (user) return res.json({ exists: true });
    else return res.json({ exists: false });
  } catch (err) {
    console.error("Check user error:", err);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router