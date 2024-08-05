const express = require('express');
const router = express.Router();
const subjectController = require('../../../controller/institute/course/subject');

router.post('/createSubject', subjectController.createSubject);
router.get('/getSubjects', subjectController.getAllSubjects);
router.get('/getSubjectById/:id', subjectController.getSubjectById);
router.put('/updateSubject/:id', subjectController.updateSubject);
router.delete('/deleteSubject/:id', subjectController.deleteSubject);

module.exports = router;
