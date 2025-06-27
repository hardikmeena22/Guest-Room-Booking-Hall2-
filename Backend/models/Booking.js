const mongoose = require('mongoose')
const User = require('./User')

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    
    },
    room_no:{type:Number, required: true},
    start_date:{type:Date, required:true},
    end_date:{type:Date, required:true},
    purpose:{type: String}
    
}, {timestamps:true} )

module.exports = mongoose.model('Booking', bookingSchema)