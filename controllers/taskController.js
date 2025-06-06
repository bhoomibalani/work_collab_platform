const taskModel = require("../models/taskModel.js");

const addTaskController = async (req, res) => {
  try {
    const { title, description, assignedEmployee, dueDate } = req.body;

    if (!title || !description || !assignedEmployee || !dueDate) {
      return res.status(500).send({
        success: false,
        message: "please provide all the required details",
      });
    }

    const task = await taskModel.create({
      title,
      description,
      assignedEmployee,
      dueDate,
    });

     const io = req.app.get('io'); 
    io.emit('taskAdded', task);

    res.status(201).send({
      success: "true",
      message: "Task added",
      task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in addtask API",
      error,
    });
  }
};

//updatettask by manager
const updateTaskController = async (req, res) => {
  try {
    const { title, description, assignedEmployee, dueDate } = req.body;

    const updatedTask = await taskModel.findByIdAndUpdate(
      req.params.id,
      { title, description, assignedEmployee, dueDate },
      { new: true }
    );

    
    if (!updatedTask) {
      return res.status(404).send({ success: false, message: "Task not found" });
    }

      const io = req.app.get('io');
    io.emit('taskUpdated', updatedTask);


 
    res.status(200).send({
      success: true,
      message: "task updated successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updatetask API",
      error,
    });
  }
};

//delete task controller 
 const deleteTaskController = async(req,res)=>{
    try{
        const id = req.params.id;
        const deletedTask =  await taskModel.findByIdAndDelete(id);
        if(!deletedTask){
            res.send({
                success:false,
                message:"Task not found"
            })
        }

          const io = req.app.get('io');
    io.emit('taskDeleted', id);


        res.status(200).send({
            success:true,
            message:"task deleted successfully"
        });
    }catch(error){
        res.status(500).send({
            success:false,
            message:"error in delete task api",
            error
        })

    }
 }


 //view tasks by employee
 const viewTaskController = async(req,res)=>{
try{
    const id=req.user.id;
    const tasks = await taskModel.find({assignedEmployee:id});
    if(tasks.length===0){
        res.send({
            success:true,
            message:"no tasks assigned yet",
            data:[],
        })
    }

    res.status(200).send({
      success: true,
      message: "Tasks fetched successfully",
      data: tasks,
    });

  

}catch(error){

    res.status(500).send({
      success: false,
      message: "Error fetching assigned tasks",
      error: error.message,
    });

}
 }


 //update tasks status by emplyee

module.exports = { addTaskController, updateTaskController,deleteTaskController,viewTaskController };
