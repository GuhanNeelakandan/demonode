const express = require("express");
const { allTodo, getSingleTodo, deleteTodo, editTodo, newTodo, taskIsCompleted } = require("../Controller/todo.controller");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/new/todo", auth,newTodo);
router.get("/all/todo",auth,allTodo);
router.get("/todo/:id",auth,getSingleTodo);
router.delete("/remove/todo/:id",auth,deleteTodo);
router.put("/update/todo/:id",auth,editTodo);
router.post("/complete/todo",auth,taskIsCompleted);

module.exports=router