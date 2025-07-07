import express from "express";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "../lib/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware (must come before routes)
app.use(express.json());
app.use(cookieParser()) //allows us to parse cookies from the request object
// for connecting the mongodb database;

// Routes
app.use("/api/auth", authRoutes);

// First connect to DB, then start server
async function startServer() {
  try {
    await connectDB();
  app.use(cors({
  origin: 'http://localhost:5000', // or '*' during testing
}));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();