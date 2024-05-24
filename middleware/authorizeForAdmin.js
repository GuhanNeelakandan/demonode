const jwt = require('jsonwebtoken')
const User = require('../Model/user.schema')

const authorizeForAdmin = (req,res,next)=>{
    try {
        if(req.headers.authorization){
             jwt.verify(req.headers.authorization,"ABcd123",async function(err,decode){
                if(err){
                    return res.json({status:0,message:"Invalid Token"})
                }
                const checkUser = await User.findOne({email:decode.email})
                if(!checkUser){
                    return res.json("Invalid User/Token")
                }
                if(checkUser.role==="admin"){
                    req.user=decode//{_id,userName,email}
                    next()
                }else{
                    return res.json({status:0,message:"You are not authorized to access this resource"})
                }
                
             })
        }else{
            res.json({status:"00",message:"UnAuthorized"})
        }
    } catch (error) {
        console.log('auth.js',error)
    }
}

module.exports = authorizeForAdmin