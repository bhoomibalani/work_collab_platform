const express = require('express');
const { addTaskController,updateTaskController,deleteTaskController, viewTaskController}=require('../controllers/taskController');
const requireAuth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');

const router=express.Router();

//routes
//create task 
router.post('/addtask',requireAuth,checkRole(['Manager']),  addTaskController);
//update task m
router.put('/updatetask/:id',requireAuth,checkRole(['Manager']), updateTaskController);
//delet task 
router.delete('/deletetask/:id',requireAuth,checkRole(['Manager']), deleteTaskController);
//view routes
router.get('/viewtasks',requireAuth,viewTaskController);

module.exports=router;



