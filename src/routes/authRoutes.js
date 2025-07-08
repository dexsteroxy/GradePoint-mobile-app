import express from 'express';
import {  register, verifyEmail, logout, login, forgotPassword, createProfile, getProfile, updateProfile, resetPassword, checkAuth } from '../../controllers/auth.controller.js';
import { verifyToken } from '../../middleware/verifyToken.js';

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


export default router;