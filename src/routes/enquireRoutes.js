import { Router } from "express";
import { createEnquiry, deleteEnquiryById, getAllEnquiries, getEnquiryById, updateEnquiryById } from "../controllers/enquireControllers.js";

const router = Router();

// POST /api/enquiries
router.post("/enquiries", createEnquiry);

// GET /api/enquiries
router.get("/enquiries", getAllEnquiries);

// GET /api/enquiries/:id
router.get("/enquiries/:id", getEnquiryById);

// PUT /api/enquiries/:id
router.put("/enquiries/:id", updateEnquiryById);

// DELETE /api/enquiries/:id
router.delete("/enquiries/:id", deleteEnquiryById);

export default router;