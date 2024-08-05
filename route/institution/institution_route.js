const express = require('express');
const router = express.Router();
const InstitutionController = require('../../controller/institute/institution'); // Update the path as needed

// Create a new institution
router.post('/createInstitution', InstitutionController.createInstitution);

// Get all institutions
router.get('/getInstitutions', InstitutionController.getInstitutions);

// Get a specific institution by ID
router.get('/getInstitutionbyId/:institutionId', InstitutionController.getInstitutionById);

// Update an institution by ID
router.put('/updateInstitution/:institutionId', InstitutionController.updateInstitution);

// Delete an institution by ID
router.delete('/deleteInstitution/:institutionId', InstitutionController.deleteInstitution);

module.exports = router;
