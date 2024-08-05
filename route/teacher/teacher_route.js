const express = require('express');
const router = express.Router();
const TeacherController = require('../../controller/teacher/teacher');
// Route for creating a new teacher
router.post('/createTeacher', TeacherController.createTeacher);

// Route for getting all teachers
router.get('/getTeachers', TeacherController.getTeachers);

// Route to get a teacher by ID
router.get("/getteacher/:id",TeacherController.getTeacherById);

// Route for updating a teacher by ID
router.put('/updateTeacher/:id', TeacherController.updateTeacher);

// Route for deleting a teacher by ID
router.delete('/deleteTeacher/:id', TeacherController.deleteTeacher);

module.exports = router;
