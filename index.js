const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
let port = process.env.PORT || 5000;
const authRoutes = require('./route/tokenAuth/token_authentication_route')
const studentRoutes= require('./route/student/student_route')
const teacherRoutes= require('./route/teacher/teacher_route')
const subjectRoutes= require('./route/institution/course/subject_route')
const courseRoutes= require('./route/institution/course/course_route')
const instituteRoutes= require('./route/institution/institution_route')


mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("database is successfully connected");
  })
  .catch((error) => {
    console.log(error.message);
  });

  app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api", studentRoutes);
app.use("/api", teacherRoutes);
app.use("/api", subjectRoutes);
app.use("/api", courseRoutes);
app.use("/api", instituteRoutes);

const server = app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.log(`Port ${port} is already in use. Trying another port...`);
    port = port + 1; // Increment port number
    app.listen(port, () => {
      console.log(`server listening on port ${port}`);
    });
  } else {
    console.error(error);
  }
});
