import express from "express";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "../lib/db.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3001;

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
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();