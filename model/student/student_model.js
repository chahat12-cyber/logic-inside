const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  basicInfo: {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    address: {
      state: { type: String, required: true },
      country: { type: String, required: true },
      pincode: { type: String, required: true }
    },
    contactDetails: {
      phone: { type: String, required: true },
      email: { type: String, required: true }
    },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    nationality: { type: String, required: true },
    scholarship: { type: Boolean, required: true },
    aadharCardDetails: { type: String, required: true },
    category: { type: String, required: true },
    guardianInfo: {
      name: { type: String, required: true },
      contact: { type: String, required: true },
      email: { type: String, required: true },
      relation: { type: String, required: true }
    },
    joiningDate: { type: Date, required: true },
    academicYear: { type: String, required: true }
  },
  course: {
    courseName: { type: String, required: true },
    year: { type: String, required: true },
    semester: { type: String, required: true },
    subjects: [{ type: String }] 
  }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
