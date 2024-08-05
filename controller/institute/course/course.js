const Subject = require('../../../model/institution/course_setup/subject_model');
const OptionalSubject = require('../../../model/institution/course_setup/optional_subjects');
const Course = require('../../../model/institution/course_setup/course_model');

const CourseController = {
     createCourse :async (req, res) => {
        const { courseName, years } = req.body;
        try {
            // Create the course with years and semesters
            const newCourse = new Course({
                courseName,
                years: years.map(year => ({
                    year: year.year,
                    semesters: year.semesters.map(semester => ({
                        sem: semester.sem,
                        subjects: semester.subjects // Directly use the subjects list
                    }))
                }))
            });
    
            await newCourse.save();
    
            console.log(`Received data: ${JSON.stringify(newCourse)}`);
    
            // Iterate through the years and semesters to create/update subjects
            for (const year of newCourse.years) {
                for (const semester of year.semesters) {
                    const subjectData = {
                        courseName: newCourse.courseName,
                        className: year.year,
                        semesterNumber: semester.sem,
                        subjectNames: semester.subjects
                    };
    
                    // Check if a document already exists for the given course, year, and semester
                    const existingSubject = await Subject.findOne({
                        courseName: subjectData.courseName,
                        className: subjectData.className,
                        semesterNumber: subjectData.semesterNumber
                    });
    
                    if (existingSubject) {
                        // Update the existing document with new subjects
                        existingSubject.subjectNames = Array.from(new Set([...existingSubject.subjectNames, ...subjectData.subjectNames]));
                        await existingSubject.save();
                    } else {
                        // Create a new document
                        const newSubject = new Subject(subjectData);
                        await newSubject.save();
                    }
                }
            }
    
            res.status(201).json({ message: 'Course and subjects created/updated successfully', course: newCourse });
        } catch (error) {
            console.error('Error creating course:', error);
            res.status(500).json({ message: 'Error creating course', error });
        }
    },    
    

    // Get all courses
    getAllCourses: async (req, res) => {
        try {
            const courses = await Course.find().populate('years.semesters.subjects');
            res.status(200).json(courses);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching courses', error });
        }
    },

    // Get a course by ID
  getCourseById: async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findById(id)
            .populate({
                path: 'years.semesters.subjects',
                select: 'subjects className semesterNumber' // Adjust based on what you need
            });
        if (!course) return res.status(404).json({ message: 'Course not found' });
        
        console.log('Course fetched:', course); // Debugging
        
        res.status(200).json(course);
    } catch (error) {
        console.error('Error fetching course:', error); // Debugging
        res.status(500).json({ message: 'Error fetching course', error });
    }
},

    getSubjectById: async (req, res) => {
        const { id } = req.params;
        try {
            const subject = await Subject.findById(id);
            if (!subject) {
                return res.status(404).json({ message: 'Subject not found' });
            }
            res.status(200).json(subject);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching subject', error });
        }
    },

    getOptionalSubjectById: async (req, res) => {
        const { id } = req.params;
        try {
            const subject = await OptionalSubject.findById(id);
            if (!subject) {
                return res.status(404).json({ message: 'Subject not found' });
            }
            res.status(200).json(subject);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching subject', error });
        }
    },
    
    // Update a course by ID
    updateCourse: async (req, res) => {
        const { id } = req.params;
        const { years } = req.body;  // Only expecting `years` field in request body
    
        try {
            // Fetch the existing course document
            let course = await Course.findById(id);
            if (!course) {
                return res.status(404).json({ message: 'Course not found' });
            }
    
            // Update years and semesters
            for (const yearUpdate of years) {
                const year = course.years.find(y => y.year === yearUpdate.year);
                if (year) {
                    for (const semesterUpdate of yearUpdate.semesters) {
                        const semester = year.semesters.find(s => s.sem === semesterUpdate.sem);
                        if (semester) {
                            if (semesterUpdate.subjects) {
                                // Update subjects in Subject collection
                                const updatedSubjects = await Subject.findOneAndUpdate(
                                    { courseName: course.courseName, class: yearUpdate.year, sem: semesterUpdate.sem },
                                    { subjects: semesterUpdate.subjects },
                                    { new: true, upsert: true }
                                );
                                semester.subjects = updatedSubjects._id;
                            }
    
                            if (semesterUpdate.optionalSubjects) {
                                // Update optional subjects in OptionalSubject collection
                                const updatedOptionalSubjects = await OptionalSubject.findOneAndUpdate(
                                    { courseName: course.courseName, class: yearUpdate.year, sem: semesterUpdate.sem },
                                    { optionalSubjects: semesterUpdate.optionalSubjects },
                                    { new: true, upsert: true }
                                );
                                semester.optionalSubjects = updatedOptionalSubjects._id;
                            }
                        }
                    }
                }
            }
    
            // Save the updated course document
            course.years = course.years; // Ensure the years are updated
            const updatedCourse = await course.save();
    
            res.status(200).json({ message: 'Course updated successfully', course: updatedCourse });
        } catch (error) {
            console.error('Error updating course:', error);
            res.status(500).json({ message: 'Error updating course', error });
        }
    },
    

    // Delete a course by ID
    deleteCourse: async (req, res) => {
        const { id } = req.params;
        try {
            const deletedCourse = await Course.findByIdAndDelete(id);
            if (!deletedCourse) {
                return res.status(404).json({ message: 'Course not found' });
            }
            res.status(200).json({ message: 'Course deleted successfully', course: deletedCourse });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting course', error });
    
    }

}};

module.exports = CourseController;
