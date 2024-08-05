const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  basicInfo: {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    contactDetails: { type: String, required: true },
    guardianInfo: {
      name: { type: String },
      contact: { type: String },
      email: { type: String },
      relation: { type: String }
    },
    dob: { type: Date, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    nationality: { type: String },
    employmentType: { type: String, enum: ['Full Time', 'Part-time'], required: true },
    designation: { type: String, required: true },
    joiningDate: { type: Date, required: true },
    education: { type: String, required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, auto: true }
  },
  courseDetails: {
    courseName: [{ type: String }],
    classAssigned: [{ type: String }],
    semester: [{ type: String }],
    subjects: [{ type: String }]
  }
}, {
  toJSON: { getters: true },
  toObject: { getters: true }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
