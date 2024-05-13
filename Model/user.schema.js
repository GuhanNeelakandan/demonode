const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName:{type:String,required:true},
    email:{type:String,required:true},
    mobile:{type:Number,required:true},
    password:{type:String,required:true},
    role:{type:String},
    otp:{type:Number},
    otpTimeStamp:{type:Number},
    isOtpVerified:{type:Boolean,default:false}
},{
    timestamps: true,
    versionKey: false,
  })

const User = mongoose.model('User',userSchema)

module.exports=User

