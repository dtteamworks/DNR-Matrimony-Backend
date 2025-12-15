import express from "express";
import { createRegistration, deleteRegistrationById, getAllRegistrations, getRegistrationById, updateRegistrationById } from '../controllers/registrationControllers.js';

const router = express.Router();

// POST   /api/registrations        -> Create new
router.post("/registrations", createRegistration);

// GET    /api/registrations        -> Get all
router.get("/registrations", getAllRegistrations);

// GET    /api/registrations/:id    -> Get one by ID
router.get("/registrations/:id", getRegistrationById);

// PUT    /api/registrations/:id    -> Update by ID
router.put("/registrations/:id", updateRegistrationById);

// DELETE /api/registrations/:id    -> Delete by ID
router.delete("/registrations/:id", deleteRegistrationById);

export default router;
