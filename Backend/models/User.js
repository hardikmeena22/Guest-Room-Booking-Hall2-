const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {type:String , required:true},
    roll_no: {type:Number,  required:true, unique:true  },
    email: {type:String, required:true, unique:true  },
    password: {type:String, required:true  }

}, {timestamps: true} )

module.exports = mongoose.model('User', userSchema, 'Students_data')