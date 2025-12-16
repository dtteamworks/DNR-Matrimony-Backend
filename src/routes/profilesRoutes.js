import { Router } from "express";
import { createProfile, deleteProfileById, getAllProfiles, getProfileById, getProfileBySlug, updateProfileById } from "../controllers/profileControllers.js";

const router = Router();

// POST /api/profiles
router.post("/profiles", createProfile);

// GET /api/profiles
router.get("/profiles", getAllProfiles);

// GET /api/profiles/:id
router.get("/profiles/:id", getProfileById);

// GET /api/profiles/slug/:slug
router.get("/profiles/slug/:slug", getProfileBySlug);

// PUT /api/profiles/:id
router.put("/profiles/:id", updateProfileById);

// DELETE /api/profiles/:id
router.delete("/profiles/:id", deleteProfileById);

export default router;