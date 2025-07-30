import express from 'express';
import {  register, verifyEmail, logout, login, forgotPassword, createProfile, getProfile, updateProfile, uploadAvatar, resetPassword, checkAuth, saveGPAResult, getGPAResults, getGPAResultById, deleteGPAResult } from '../../controllers/auth.controller.js';
import verifyToken  from '../../middleware/verifyToken.js';
import { upload } from "../../middleware/upload.js";
import multer from 'multer';
const storage = multer.memoryStorage();
// const upload = multer({ storage });
const router = express.Router();
// endpoints
router.get("/check-auth", verifyToken, checkAuth);
router.post("/register", register)
router.post("/verify-email", verifyEmail)
router.post("/logout", logout)
router.post("/login", login)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password/:token", resetPassword)


router.post("/profile", createProfile);  // POST /api/profile
router.get("/profile/:userId", getProfile);  // GET /api/profile/:userId
router.put("/profile/:userId", updateProfile); // PUT /api/profile/:userId


// GPA Results endpoints
router.post("/gpa/save", verifyToken, saveGPAResult);
router.get("/gpa/results", verifyToken, getGPAResults);
router.get("/gpa/results/:id", verifyToken, getGPAResultById);
router.delete("/gpa/results/:id", verifyToken, deleteGPAResult);

router.put(
  "/profile/:userId/avatar",
  upload.single("avatar"),   // field name must match form‑data key
  uploadAvatar
);

export default router;