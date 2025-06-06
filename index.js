const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb=require("./config/db");

//dot env config
dotenv.config();

//DB connection
connectDb();

//rest object
const app= express();

app.use(express.json()); 
app.use(cors());


//routes
app.use('/api/v1/user',require('./routes/userRoutes'));
app.use('/api/v1/task',require('./routes/taskRoutes'));


app.get('/',(req,res)=>{
console.log("everything is working fine");
});



const PORT = 8080;

app.listen(PORT,()=>{
    console.log(`sever running on ${PORT}`);
});



