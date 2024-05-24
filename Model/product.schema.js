const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName:{type:String,required:true},
    image:{type:String,required:true},
    description:{type:String,required:true},
    rating:{type:Number,required:true},
    price:{type:Number,required:true},
    offerPrice:{type:Number,required:true},
    
},
{
    timestamps: true,
    versionKey: false,
  })

const Product = mongoose.model('product',productSchema)

module.exports=Product