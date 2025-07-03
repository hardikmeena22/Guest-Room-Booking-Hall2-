const nodemailer = require('nodemailer');

const sendOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
       
      user: process.env.OTP_EMAIL,
      pass: process.env.OTP_PASSWORD,
    },
});
console.log("🔍 Transporter config:", {
    user: process.env.OTP_EMAIL,
    pass: process.env.OTP_PASSWORD ? '✅ exists' : '❌ missing',
  });

  const mailOptions = {
    from: process.env.OTP_EMAIL,
    to: email,
    subject: 'Your OTP for Guest Room Booking',
    text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOTP;
