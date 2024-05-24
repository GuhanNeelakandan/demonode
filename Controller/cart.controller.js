const Cart = require("../Model/cart.schema")


const newCart = async(req,res)=>{ // only for login
    try {
        const {productName,description,rating,price,offerPrice,client}=req.body
        let productDetails={
            productName,
            description,
            rating,
            price,
            offerPrice,
            client,
            image:"https://loremflickr.com/640/480/city"
        }

        const create = await Cart.create(productDetails)
        if(!create){
            return res.json({status:0,message:"Not Added to Cart"})
        }

        res.json({status:1,message:"Added to cart"})
    } catch (error) {
        console.log(error)
    }
}

const allCart = async(req,res)=>{
    try {
        const{userId}=req.user
       const getCart = await Cart.find({client:userId})
       if(!getCart){
        return res.json({status:0,message:"No Cart Found"})
       } 
       res.json({status:1,cart:getCart})
    } catch (error) {
        console.log(error)
    }
}

const deleteCart =async(req,res)=>{
    try {
        const {id}=req.body
        const remove = await Cart.findByIdAndDelete({_id:id})
        if(!remove){
            return res.json({status:0,message:"cart Not Removed"})
        }
        res.json({status:1,message:"Cart Removed"})
    } catch (error) {
        console.log(error)
    }
}

module.exports={
    newCart,
    allCart,
    deleteCart
}