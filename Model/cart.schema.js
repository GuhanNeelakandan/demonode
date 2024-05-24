const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    productName:{type:String,required:true},
    image:{type:String,required:true},
    description:{type:String,required:true},
    rating:{type:Number,required:true},
    price:{type:Number,required:true},
    offerPrice:{type:Number,required:true},
    client:{type:mongoose.Types.ObjectId,ref:'User'}
},
{
    timestamps: true,
    versionKey: false,
  })

const Cart = mongoose.model('cart',cartSchema)

module.exports=Cart