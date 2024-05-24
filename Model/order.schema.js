const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    productName:{type:String,required:true},
    image:{type:String,required:true},
    description:{type:String,required:true},
    rating:{type:Number,required:true},
    price:{type:Number,required:true},
    offerPrice:{type:Number,required:true},
    client:{type:mongoose.Types.ObjectId,ref:'User'},
    address:{
        name:{type:String,required:true},
        line1:{type:String,required:true},
        line2:{type:String,required:true},
        landmark:{type:String,required:true},
        city:{type:String,required:true},
        state:{type:String,required:true},
        country:{type:String,required:true},
        pincode:{type:Number,required:true}
    }
},
{
    timestamps: true,
    versionKey: false,
  })

const Order = mongoose.model('order',orderSchema)

module.exports=Order