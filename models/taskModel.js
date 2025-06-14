const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true

    },
    assignedEmployee: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    status: {
         type: String,
        enum:['notstarted','inprogress','complete'],
        default:'notstarted'
    },
    dueDate: {
         type: Date,
        required: true
    }
});

module.exports=mongoose.model('Task',taskSchema);