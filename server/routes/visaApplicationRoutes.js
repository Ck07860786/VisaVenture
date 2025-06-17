import express from 'express';
import { createVisaApplication, getVisaApplicationById, getVisaApplications } from '../controllers/visaApllicationController.js';
import ExpressFormidable from 'express-formidable';


const router = express.Router();

// Create a new visa application
router.post('/visa-apply',ExpressFormidable(), createVisaApplication);

// Get all visa applications for the logged-in user
router.get('/', getVisaApplications);

// Get a single visa application by ID
router.get('/:id', getVisaApplicationById);

export default router;







