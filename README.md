# Task Manager with Real-time Notifications

This is a collaborative task management application built with **Node.js**, **Express**, **MongoDB**, and **Socket.IO** for real-time notifications.

---

## Features

- User registration and login (Manager & Employee roles)
- Create, update, delete tasks (Managers only)
- Employees can view tasks assigned to them
- Real-time notifications on task creation, update, and deletion using WebSockets (Socket.IO)
- Role-based access control (RBAC)

---

## Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Socket.IO for real-time communication
- bcrypt for password hashing
- dotenv for environment variables
- CORS

---

## Setup & Installation

1. Clone the repo:

   -bash
    git clone https://github.com/bhoomibalani/work_collab_platform.git
    cd work_collab_platform

   

2. Install dependencies:

    -npm install
  



3. Create .env file in root folder and add:

   -PORT=
   -MONGO_URI=
   -JWT_SECRET=


4. Start the server:

   -npm start

