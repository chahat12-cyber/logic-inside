const Institution = require('../../model/institution/institution_model'); // Update the path as needed
const mongoose = require('mongoose');

const InstitutionController = {
  // Create a new institution
  createInstitution: async (req, res) => {
    try {
      const {
        name,
        logo,
        institutionType,
        boardAffiliation,
        instituteCode,
        address,
        contactDetails,
        website
      } = req.body;

      // Validate required fields
      if (
        !name || !logo || !institutionType || !boardAffiliation ||
        !instituteCode || !address || !contactDetails || !website
      ) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Create a new institution
      const newInstitution = new Institution({
        name,
        logo,
        institutionType,
        boardAffiliation,
        instituteCode,
        address,
        contactDetails,
        website
      });

      const savedInstitution = await newInstitution.save();
      res.status(201).json(savedInstitution);
    } catch (error) {
      console.error('Error creating institution:', error.message);
      res.status(500).json({ error: error.message });
    }
  },

  // Get all institutions
  getInstitutions: async (req, res) => {
    try {
      const institutions = await Institution.find();
      res.status(200).json(institutions);
    } catch (error) {
      console.error('Error fetching institutions:', error.message);
      res.status(500).json({ error: error.message });
    }
  },

  // Get a single institution by ID
  getInstitutionById: async (req, res) => {
    try {
      const { institutionId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(institutionId)) {
        return res.status(400).json({ message: 'Invalid institution ID' });
      }

      const institution = await Institution.findById(institutionId);
      if (!institution) {
        return res.status(404).json({ message: 'Institution not found' });
      }

      res.status(200).json(institution);
    } catch (error) {
      console.error('Error fetching institution:', error.message);
      res.status(500).json({ error: error.message });
    }
  },

  // Update an institution by ID
  updateInstitution: async (req, res) => {
    try {
      const { institutionId } = req.params;
      const updatedData = req.body;

      if (!mongoose.Types.ObjectId.isValid(institutionId)) {
        return res.status(400).json({ message: 'Invalid institution ID' });
      }

      const updatedInstitution = await Institution.findByIdAndUpdate(
        institutionId,
        { $set: updatedData },
        { new: true, runValidators: true }
      );

      if (!updatedInstitution) {
        return res.status(404).json({ message: 'Institution not found' });
      }

      res.status(200).json(updatedInstitution);
    } catch (error) {
      console.error('Error updating institution:', error.message);
      res.status(500).json({ error: error.message });
    }
  },

  // Delete an institution by ID
  deleteInstitution: async (req, res) => {
    try {
      const { institutionId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(institutionId)) {
        return res.status(400).json({ message: 'Invalid institution ID' });
      }

      const deletedInstitution = await Institution.findByIdAndDelete(institutionId);
      if (!deletedInstitution) {
        return res.status(404).json({ message: 'Institution not found' });
      }

      res.status(200).json({ message: 'Institution deleted successfully' });
    } catch (error) {
      console.error('Error deleting institution:', error.message);
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = InstitutionController;
