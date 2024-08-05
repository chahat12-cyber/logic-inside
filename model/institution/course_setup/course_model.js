const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SemesterSchema = new Schema({
    sem: { type: Number, required: true },
    subjects: [{ type: String, required: true }] // Array of subject names
});

const YearSchema = new Schema({
    year: { type: String, required: true }, // e.g., "1st Year"
    semesters: [SemesterSchema]
});

const CourseSchema = new Schema({
    courseName: { type: String, required: true },
    years: [YearSchema]
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
