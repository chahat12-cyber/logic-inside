const express = require("express");
const student = require("../../controller/student/student");
const { verifyToken } = require("../../controller/tokenAuth/token_authentication");
const router = express.Router();

// Routes for creating and getting students (protected routes)
router.post("/createstudents", verifyToken, student.createStudent);
router.get("/getstudents", verifyToken, student.getStudents);

// Route for getting a student by studentId
router.get('/getStudent/:studentId', verifyToken, student.getStudentById);

// Route for getting students by academic year
router.get('/getStudentsByAcademicYear/:academicYear', verifyToken, student.getStudentsByAcademicYear);

// Route for updating a student by studentId
router.put('/updateStudent/:studentId', verifyToken, student.updateStudent);

// Route for deleting a student by studentId
router.delete('/deleteStudent/:studentId', verifyToken, student.deleteStudent);

module.exports = router;
