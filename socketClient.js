//for testing purposes only

const { io } = require("socket.io-client");


const socket = io("http://localhost:8080"); 


socket.on("connect", () => {
  console.log(" Connected to WebSocket server:", socket.id);

  //emit event
  socket.emit("newTask", {
    title: "Test Task",
    description: "This is just a socket test",
    assignedEmployee: "user123",
    dueDate: new Date().toISOString(),
  });
});


socket.on("taskAdded", (task) => {
  console.log(" Task added:", task);
});


socket.on("taskUpdated", (task) => {
  console.log(" Task updated:", task);
});


socket.on("taskDeleted", (taskId) => {
  console.log(" Task deleted:", taskId);
});


socket.on("disconnect", () => {
  console.log(" Disconnected from server");
});
