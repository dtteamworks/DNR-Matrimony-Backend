import express from 'express';
import { createContact, deleteContact, getAllContacts, getContactById } from '../controllers/contactController.js';

const router = express.Router();

// Public route
router.post('/', createContact);

// Private routes (add auth middleware if needed later)
// Example: router.use(protect); // if you have auth

router.get('/', getAllContacts);
router.get('/:id', getContactById);
router.delete('/:id', deleteContact);

export default router;