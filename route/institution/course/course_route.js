const express = require('express');
const router = express.Router();
const courseController = require('../../../controller/institute/course/course');

router.post('/createCourse', courseController.createCourse);
router.get('/getCourses', courseController.getAllCourses);
router.get('/getCourseById/:id', courseController.getCourseById);
router.get('/getSUbjectById/:id', courseController.getSubjectById);
router.get('/getOptionalSubById/:id', courseController.getOptionalSubjectById);
router.patch('/updateCourse/:id', courseController.updateCourse);
router.delete('/deleteCourse/:id', courseController.deleteCourse);

module.exports = router;
