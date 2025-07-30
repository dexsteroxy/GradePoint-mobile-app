
import jwt from 'jsonwebtoken';
import { User } from "../models/Users.js";
import { UserProfile } from "../models/UserProfile.js";
import GPAResult from '../models/GPAResult.js';
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../utils/emailSender.js";
import bcrypt from "bcryptjs";
import crypto from "crypto"
import cloudinary from "../lib/cloudinary.js";

import mongoose from "mongoose";
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!email || !password || !username) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Create new user
    const user = new User({
      email,
      password: hashedPassword,
      username,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      isVerified: false,
    });

    await user.save();

    // Send verification email
    const emailSent = await sendVerificationEmail(email, verificationToken);
    if (!emailSent) {
      await User.deleteOne({ _id: user._id });
      return res
        .status(500)
        .json({ message: "Failed to send verification email" });
    }

    // Generate token but don't set cookie yet (user not fully verified)
    const token = generateTokenAndSetCookie(res, user._id, false); // Added false to not set cookie

    res.status(201).json({
      success: true,
      message:
        "User created successfully. Please check your email to verify your account.",
      user: {
        ...user._doc,
        password: undefined,
      },
      token, // Send token but require verification
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// for Email verifiaction endpoint

export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    console.log(`Starting verification for code: ${code}`);

    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    }).maxTimeMS(10000); // 10 second timeout

    if (!user) {
      console.log("No user found or token expired");
      return res.status(400).json({
        success: "false",
        message: "Invalid or expired verification code",
      });
    }

    console.log(`Found user: ${user.email}`);

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();
    console.log("User verification status updated");

    // Send welcome email
    try {
      await sendWelcomeEmail(user.email, user.username);
      console.log("Welcome email sent successfully");
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
      // Don't fail the whole verification if email fails
    }

    return res.status(200).json({
      success: "true",
      message: "Email verified successfully!",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        isVerified: true,
      },
    });
  } catch (error) {
    console.error("Full verification error:", error);
    return res.status(500).json({
      success: "false",
      message: "Internal server error during verification",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// for logging out the user

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ sucess: "true", message: "Logout sucessfully" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ 
        success: false, 
        message: "Incorrect Password" 
      });
    }

    // Generate token (modified)
    const token = jwt.sign(
      { id: user._id }, // Ensure payload uses 'id' field
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000 // 1 hour
    });

    user.lastlogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token, // Send token in response
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


// fot forgotting password


export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      // For security reasons, don't reveal if the user doesn't exist
      return res.status(200).json({
        success: true,
        message: "If an account with that email exists, a password reset link has been sent"
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 2 * 60 * 60 * 1000; // 2 hours from now

    // Save the token and expiration to the user
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiresAt;
    await user.save();

    // Send the email
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    const emailSent = await sendPasswordResetEmail(user.email, resetUrl);

    if (!emailSent) {
      throw new Error("Failed to send password reset email");
    }

    return res.status(200).json({
      success: true,
      message: "If an account with that email exists, a password reset link has been sent"
    });

  } catch (error) {
    console.error("Password reset error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request"
    });
  }
};







// for resetting the password endpoint
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Validate password if needed
    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired password reset token",
      });
    }

    // Hash and update password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    // Send success email
    const emailSent = await sendResetSuccessEmail(user.email);
    if (!emailSent) {
      console.warn("Password reset successful but failed to send confirmation email");
      // Don't fail the request, just log the email sending issue
    }

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });

  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "An error occurred while resetting your password" 
    });
  }
};



export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    
    console.error("Check auth error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}



export const createProfile = async (req, res) => {
  try {
    const { user, faculty, currentLevel, fullName, department, regNumber, gender, email } = req.body;

    // ✅ Check if profile already exists
    const existing = await UserProfile.findOne({ user });
    if (existing) return res.status(400).json({ message: "Profile already exists" });

    // ✅ Create profile directly with ObjectId
    const profile = await UserProfile.create({
      user, faculty, department, currentLevel, fullName, regNumber, gender, email
    });

    res.status(201).json(profile);
  } catch (error) {
    console.error("🔥 Profile creation error:", error);
    res.status(500).json({ message: "Profile creation failed", error: error.message });
  }
};



export const getProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ user: req.params.userId }).populate("user");

    if (!profile) return res.status(404).json({ message: "Profile not found" });

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updated = await UserProfile.findOneAndUpdate(
      { user: req.params.userId },  // Match the profile by userId
      req.body,                     // Update fields in request body
      { new: true }                 // Return the updated document
    );

    if (!updated) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Profile update failed" });
  }
};





export const uploadAvatar = async (req, res) => {
  try {
    const userId = mongoose.Types.ObjectId.createFromHexString(req.params.userId);

    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }

    const { buffer } = req.file;

  const uploadStreamToCloudinary = () =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "avatars", resource_type: "image" },
      (error, result) => {
        if (error) {
          console.error("❌ Cloudinary error:", error);
          return reject(error);
        }
        resolve(result);
      }
    );
    stream.end(buffer);
  });


    const result = await uploadStreamToCloudinary();

    // Save URL in DB
    const updated = await UserProfile.findOneAndUpdate(
      { user: userId },
      { avatar: result.secure_url },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Profile not found" });

    res.json(updated);
  } catch (err) {
    console.error("🔥 Avatar upload error:", err);
    res.status(500).json({ message: "Avatar upload failed" });
  }
};



// for CGPA calculations and dashboard



export const saveGPAResult = async (req, res) => {
  try {
    const { cgpa, courses, level, semester, year } = req.body;
    
    // Validate required fields
    if (!cgpa || !courses || !level || !semester || !year) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // Create new GPA result document
    const gpaResult = new GPAResult({
      user: req.user.id, // From verifyToken middleware
      cgpa: parseFloat(cgpa),
      courses: courses.map(course => ({
        code: course.code,
        unit: parseInt(course.unit),
        grade: course.grade
      })),
      level,
      semester,
      year: parseInt(year),
      date: new Date()
    });

    await gpaResult.save();

    res.status(201).json({
      success: true,
      message: "GPA result saved successfully",
      data: gpaResult
    });

  } catch (err) {
    console.error('Error saving GPA result:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to save GPA result',
      error: err.message
    });
  }
};

export const getGPAResults = async (req, res) => {
  try {
    const results = await GPAResult.find({ user: req.user.id })
      .sort({ date: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (err) {
    console.error('Error fetching GPA results:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch GPA results',
      error: err.message
    });
  }
};

export const getGPAResultById = async (req, res) => {
  try {
    const result = await GPAResult.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'GPA result not found'
      });
    }

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    console.error('Error fetching GPA result:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch GPA result',
      error: err.message
    });
  }
};

export const deleteGPAResult = async (req, res) => {
  try {
    const result = await GPAResult.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'GPA result not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'GPA result deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting GPA result:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to delete GPA result',
      error: err.message
    });
  }
};