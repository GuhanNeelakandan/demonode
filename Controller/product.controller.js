const Product = require("../Model/product.schema")

const newProduct = async(req,res)=>{
    try {
        const {productName,description,rating,price,offerPrice}=req.body
        let productDetails={
            productName,
            description,
            rating,
            price,
            offerPrice,
            image:"https://loremflickr.com/640/480/city"
        }

        const create = await Product.create(productDetails)
        if(!create){
            return res.json({status:0,message:"Product Not created"})
        }

        res.json({status:1,message:"Product Created"})
    } catch (error) {
        console.log(error)
    }
}

const allProducts = async(req,res)=>{
    try {
       const getProducts = await Product.find()
       if(!getProducts){
        return res.json({status:0,message:"No Products Found"})
       } 
       res.json({status:1,products:getProducts})
    } catch (error) {
        console.log(error)
    }
}

const deleteProduct =async(req,res)=>{
    try {
        const {id}=req.body
        const remove = await Product.findByIdAndDelete({_id:id})
        if(!remove){
            return res.json({status:0,message:"Product Not Removed"})
        }
        res.json({status:1,message:"Product Removed"})
    } catch (error) {
        console.log(error)
    }
}

const editProduct = async(req,res)=>{
    try {
        const {id,productName,description,rating,price,offerPrice}=req.body 
        let productDetails={
            productName,
            description,
            rating,
            price,
            offerPrice,
            image:"https://loremflickr.com/640/480/city"
        }

        const update = await Product.findByIdAndUpdate({_id:id},productDetails)
        if(!update){
            return res.json({status:0,message:"Product Not Updated"})
        }
        res.json({status:1,message:"Product Updated"})
    } catch (error) {
        console.log(error)
    }
}

module.exports={
    newProduct,
    allProducts,
    deleteProduct,
    editProduct
}