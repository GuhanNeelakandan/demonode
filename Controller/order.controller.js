const Cart = require("../Model/cart.schema")
const Order = require("../Model/order.schema")

const newOrder = async(req,res)=>{ // only for login
    try {
        const {productName,description,rating,price,offerPrice,client,address,_id,buyNow}=req.body
        let productDetails={
            productName,
            description,
            rating,
            price,
            offerPrice,
            client,
            image:"https://loremflickr.com/640/480/city",
            address
        }

        const create = await Order.create(productDetails)
        if(!create){
            return res.json({status:0,message:"Not Ordered"})
        }

        if(!buyNow){
            const deleteCart =await Cart.findByIdAndDelete({_id:_id})

            if(!deleteCart){
                return res.json({status:0,message:"Cart Not Deleted"})
            }
        }
        

        res.json({status:1,message:"Ordered Placed"})
    } catch (error) {
        console.log(error)
    }
}

const allOrder = async(req,res)=>{
    try {
        const{userId}=req.user
       const getOrder = await Order.find({client:userId})
       if(!getOrder){
        return res.json({status:0,message:"No Ordered Found"})
       } 
       res.json({status:1,order:getOrder})
    } catch (error) {
        console.log(error)
    }
}

const deleteOrder =async(req,res)=>{
    try {
        const {id}=req.body
        const remove = await Order.findByIdAndDelete({_id:id})
        if(!remove){
            return res.json({status:0,message:"Ordered Not Removed"})
        }
        res.json({status:1,message:"Ordered Removed"})
    } catch (error) {
        console.log(error)
    }
}

const adminOrders = async(req,res)=>{
    try {
        const getOrder = await Order.find()
        if(!getOrder){
         return res.json({status:0,message:"No Ordered Found"})
        } 
        res.json({status:1,order:getOrder})
    } catch (error) {
        console.log(error)
    }
}


module.exports={
    newOrder,
    allOrder,
    deleteOrder,
    adminOrders
}


