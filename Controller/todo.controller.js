const Todo = require("../Model/todo.schema");


const newTodo = async (req, res) => {
    try {
      const { task,isCompleted} = req.body;
      const userId = req.user.userId
  
      if(task===""){
        return res.json({ status: 0, message: "Task Should  not be empty" });
      }

      let data = {
        task,
        isCompleted,
        createdBy:userId
      }
      const saveTodo = await Todo.create(data); //null
  
      if (!saveTodo) {
        return res.json({ status: 0, message: "Todo Not  Created" });
      }
  
      res.json({ status: 1, message: "Todo Created Successfully" });
    } catch (error) {
      console.log("todo.controller.js/newTodo ---->error", error);
    }
  };

  const allTodo = async (req, res) => {
    try {
      const todo = await Todo.find({createdBy:req.user.userId}).limit(3).skip(2).populate('createdBy'); //All Data
      if (!todo) {
        return res.json({ status: 0, message: "Todo not found" });
      }
      res.json({ status: 1, response: todo });
    } catch (error) {
        console.log("todo.controller.js/allTodo ---->error", error);
    }
  };

  const getSingleTodo = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.json({ status: 0, message: "Todo Id Required in Params" });
      }
  
      const todo = await Todo.findById(id);
      if (!todo) {
        return res.json({ status: 0, message: "todo not found" });
      }
  
      res.json({ status: 1, response: todo });
    } catch (error) {
      console.log("user.controller.js/getSingleUser ---->error", error);
    }
  };

  const deleteTodo = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.json({ status: 0, message: "Todo Id Required in Params" });
      }
  
      const todo = await Todo.findByIdAndDelete(id);
      if (!todo) {
        return res.json({ status: 0, message: "Todo not Deleted" });
      }
  
      res.json({ status: 1, message: "Deleted Successfully" });
    } catch (error) {
      console.log("user.controller.js/deleteUser ---->error", error);
    }
  };

  const editTodo = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.json({ status: 0, message: "Todo Id Required in Params" });
      }
      const todo = await Todo.findByIdAndUpdate(id, req.body);
      if (!todo) {
        return res.json({ status: 0, message: "Todo not Updated" });
      }
  
      res.json({ status: 1, message: "updated Successfully" });
    } catch (error) {
      console.log("user.controller.js/editUser ---->error", error);
    }
  };

  const taskIsCompleted =async(req,res)=>{
    try {
      const {id,isCompleted}=req.body

      if (!id) {
        return res.json({ status: 0, message: "Todo Id Required" });
      }

      const update = await Todo.updateOne({_id:id},{isCompleted:isCompleted})

      if(!update){
        return res.json({ status: 0, message: "Todo not Updated" });
      }
      res.json({status:1,message:"Updated"})

    } catch (error) {
      console.log("user.controller.js/editUser ---->error", error);
    }
  }


  module.exports= {
    newTodo,
    allTodo,
    getSingleTodo,
    deleteTodo,
    editTodo,
    taskIsCompleted
  }
  