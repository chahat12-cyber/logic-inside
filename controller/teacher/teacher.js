const Teacher = require('../../model/teacher/teacher_model'); // Update the path as per your file structure

const TeacherController = {
  createTeacher: async (req, res) => {
    try {
     
      const { firstName, middleName, lastName, address, contactDetails, dob, gender, joiningDate, education, experience, courseName, classAssigned, semester, subjects } = req.body;
          console.log(req.body);
          const newTeacher = new Teacher({
            basicInfo: {
              firstName,
              middleName,
              lastName,
              address,
              contactDetails,
              guardianInfo,
              dob,
              gender,
              nationality,
              employmentType,
              designation,
              joiningDate,
              education,
            },
            courseDetails: {
              courseName: courseName || [],
              classAssigned: classAssigned || [],
              semester: semester || [],
              subjects: subjects || []
            }
          });
    
          
  
      const savedTeacher = await newTeacher.save();
      res.status(201).json(savedTeacher);
    } catch (error) {
      console.error('Error creating teacher:', error.message);
      res.status(500).json({ error: error.message });
    }
  },
  
  
  // Get all teachers
  getTeachers: async (req, res) => {
    try {
      const teachers = await Teacher.find();
      res.status(200).json(teachers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a teacher by ID
  getTeacherById: async (req, res) => {
    try {
      const { id } = req.params;
      const teacher = await Teacher.findById(id);
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
      res.status(200).json(teacher);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a teacher by ID
  updateTeacher: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;

      const updatedTeacher = await Teacher.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

      if (!updatedTeacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }

      res.status(200).json(updatedTeacher);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a teacher by ID
  deleteTeacher: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedTeacher = await Teacher.findByIdAndDelete(id);

      if (!deletedTeacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }

      res.status(200).json({ message: 'Teacher deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = TeacherController;