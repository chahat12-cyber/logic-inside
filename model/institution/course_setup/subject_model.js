const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    courseName: { type: String, required: true },
    className: { type: String, required: true },
    semesterNumber: { type: Number, required: true },
    subjectNames: [{ type: String, required: true }] // Ensure this field is defined as an array of strings
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
