const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb=require("./config/db");
const http = require('http');
const socketIo = require('socket.io');


//dot env config
dotenv.config();

//DB connection
connectDb();

//rest object
const app= express();
const server = http.createServer(app); 
const io = socketIo(server, {
  cors: {
    origin: "*", 
  },
});

app.set('io', io);

io.on('connection', (socket) => {
  console.log(' New client connected:', socket.id);
   socket.on('newTask', (data) => {
    console.log(' Received task:', data);
  
    socket.broadcast.emit('taskAdded', data);
  });

  
  socket.on('disconnect', () => {
    console.log(' Client disconnected:', socket.id);
  });
});



app.use(express.json()); 
app.use(cors());


//routes
app.use('/api/v1/user',require('./routes/userRoutes'));
app.use('/api/v1/task',require('./routes/taskRoutes'));


app.get('/',(req,res)=>{
res.send("server is up and running");
});



const PORT = 8080;

server.listen(PORT,()=>{
    console.log(`sever running on ${PORT}`);
});



