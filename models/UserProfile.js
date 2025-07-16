// models/UserProfile.js
import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,  // ✅ must be ObjectId
    ref: "User",
    required: true,
    unique: true,
  },
  faculty: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },

  fullName: {
    type: String,
    required: true,
  },
   currentLevel: {
    type: String,
    required: true,
  },

   email: {
    type: String,
    required: true,
  },

  regNumber: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },

  avatar: {
  type: String,          
  default: null,
},

}, { timestamps: true });

export const UserProfile = mongoose.model("UserProfile", userProfileSchema);
