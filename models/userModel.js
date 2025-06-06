const mongoose = require('mongoose');

//schema
const userSchema= new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:[true,'Please provide first name']
        },
        lastName:{
            type:String,
        },
        role:{
            type:String,
            enum:['Manager', 'Employee'],
            required:[true, 'Please choose your role'],
        },
        email:{
            type:String,
            required:[true,'Please provide your mail'],
            unique:true
        },
        userName:{
            type:String,
            required:[true,'Please enter your username'],
            unique:true
        },
        password:{
            type:String,
           required:[true,'Please enter your password']

        }
},{timestamps:true});

//exports
module.exports=mongoose.model('User',userSchema);