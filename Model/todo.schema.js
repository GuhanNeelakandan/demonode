const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    task:{type:String,required:true},
    isCompleted:{type:Boolean,default:false},
    createdBy:{type:mongoose.Types.ObjectId,ref:'User'}
},
{
    timestamps: true,
    versionKey: false,
  })

const Todo = mongoose.model('todo',todoSchema)

module.exports=Todo