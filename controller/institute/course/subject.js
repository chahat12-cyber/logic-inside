const subjectModel = require('../../../model/institution/course_setup/subject_model')


const SubjectController = {
    createSubject : async (req, res) => {
        const { courseName, class: className, subjects } = req.body;
        try {
            const newSubject = new subjectModel({
                courseName,
                class: className,
                subjects
            });
            await newSubject.save();
            res.status(201).json({ message: 'Subject created successfully', subject: newSubject });
        } catch (error) {
            res.status(500).json({ message: 'Error creating subject', error });
        }
    },
    getAllSubjects : async (req, res) => {
        try {
            const subjects = await subjectModel.find();
            res.status(200).json(subjects);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching subjects', error });
        }
    },
    
   getSubjectById : async (req, res) => {
        const { id } = req.params;
        try {
            const subject = await subjectModel.findById(id);
            if (!subject) {
                return res.status(404).json({ message: 'Subject not found' });
            }
            res.status(200).json(subject);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching subject', error });
        }
    },
    
    updateSubject : async (req, res) => {
        const { id } = req.params;
        const { courseName, class: className, subjects } = req.body;
        try {
            const updatedSubject = await subjectModel.findByIdAndUpdate(id, { courseName, class: className, subjects }, { new: true });
            if (!updatedSubject) {
                return res.status(404).json({ message: 'Subject not found' });
            }
            res.status(200).json({ message: 'Subject updated successfully', subject: updatedSubject });
        } catch (error) {
            res.status(500).json({ message: 'Error updating subject', error });
        }
    },
    
    deleteSubject : async (req, res) => {
        const { id } = req.params;
        try {
            const deletedSubject = await subjectModel.findByIdAndDelete(id);
            if (!deletedSubject) {
                return res.status(404).json({ message: 'Subject not found' });
            }
            res.status(200).json({ message: 'Subject deleted successfully', subject: deletedSubject });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting subject', error });
        }
    }
}

module.exports = SubjectController;