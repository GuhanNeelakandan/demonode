//importing express ,mongoose,cors
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('./Routes/user.routes')
const todoRoutes = require('./Routes/todo.routes')

//create a port
const PORT = process.env.PORT||8000

const app = express()

app.use(express.json()) // communication process

app.use(cors()) //cross origin allow

app.use('/',userRoutes)
app.use('/',todoRoutes)


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
