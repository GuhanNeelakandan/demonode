//importing express ,mongoose,cors
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('./Routes/user.routes')
const todoRoutes = require('./Routes/todo.routes')
const productRoutes = require('./Routes/product.routes')
const cartRoutes = require('./Routes/cart.routes')
const orderRoutes = require('./Routes/order.routes')

//create a port
const PORT = process.env.PORT||8000

const app = express()

app.use(express.json()) // communication process

app.use(cors()) //cross origin allow

app.use('/',userRoutes)
app.use('/',todoRoutes)
app.use('/',productRoutes)
app.use('/',cartRoutes)
app.use('/',orderRoutes)


//connecting mongodb

const URI = "mongodb+srv://GuhanBlueEye10:admin123@database.1l65x.mongodb.net/"
mongoose.connect(URI).then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running in ${PORT}`)
        console.log(`MongoDB Connected`)
    })
}).catch((err)=>{
    console.log(err)
})
