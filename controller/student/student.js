const studentModel = require('../../model/student/student_model');
const mongoose = require('mongoose');
const Course = require('../../model/institution/course_setup/course_model');
const Subject = require('../../model/institution/course_setup/subject_model'); // Assuming you have this model
const OptionalSubject = require('../../model/institution/course_setup/optional_subjects'); // Assuming you have this model

const StudentController = {
  createStudent: async (req, res) => {
    try {
      const {
        firstName,
        middleName,
        lastName,
        address,
        contactDetails,
        dob,
        gender,
        nationality,
        scholarship,
        aadharCardDetails,
        category,
        guardianInfo,
        joiningDate,
        academicYear,
        courseName,
        year,
        semester
      } = req.body;
  
      // Validate required fields
      if (
        !firstName || !lastName || !address || !contactDetails || !dob ||
        !gender || !nationality || !aadharCardDetails || !category ||
        !guardianInfo || !joiningDate || !academicYear || !courseName ||
        !year || !semester
      ) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      // Fetch the course details from the Subject collection
      const subjectData = await Subject.findOne({
        courseName,
        className: year,
        semesterNumber: semester
      });
  
      if (!subjectData) {
        return res.status(404).json({ message: 'Subject details not found' });
      }
   
      const newStudent = new studentModel({
        basicInfo: {
          firstName,
          middleName,
          lastName,
          address,
          contactDetails,
          dob,
          gender,
          nationality,
          scholarship,
          aadharCardDetails,
          category,
          guardianInfo,
          joiningDate,
          academicYear
        },
        course: {
          courseName,
          year,
          semester,
          subjects: subjectData.subjectNames
        }
      });
  
      const savedStudent = await newStudent.save();
      res.status(201).json(savedStudent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },  

  getStudents: async (req, res) => {
    try {
      const students = await studentModel.find();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getStudentById: async (req, res) => {
    try {
      const { studentId } = req.params;

      // Validate studentId
      if (!mongoose.Types.ObjectId.isValid(studentId)) {
        return res.status(400).json({ message: 'Invalid student ID' });
      }

      const student = await studentModel.findById(studentId);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getStudentsByAcademicYear: async (req, res) => {
    try {
      const { academicYear } = req.params;

      // Validate academicYear
      if (!academicYear) {
        return res.status(400).json({ message: 'Academic year is required' });
      }

      const students = await studentModel.find({ 'basicInfo.academicYear': academicYear }).populate('course.courseId');
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateStudent: async (req, res) => {
    try {
      const { studentId } = req.params;
      const updatedData = req.body;

      // Validate studentId
      if (!mongoose.Types.ObjectId.isValid(studentId)) {
        return res.status(400).json({ message: 'Invalid student ID' });
      }

      const updatedStudent = await studentModel.findByIdAndUpdate(
        studentId,
        { $set: updatedData },
        { new: true, runValidators: true }
      );

      if (!updatedStudent) {
        return res.status(404).json({ message: 'Student not found' });
      }

      res.status(200).json(updatedStudent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  deleteStudent: async (req, res) => {
    try {
      const { studentId } = req.params;

      // Validate studentId
      if (!mongoose.Types.ObjectId.isValid(studentId)) {
        return res.status(400).json({ message: 'Invalid student ID' });
      }

      const deletedStudent = await studentModel.findByIdAndDelete(studentId);
      if (!deletedStudent) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = StudentController;
