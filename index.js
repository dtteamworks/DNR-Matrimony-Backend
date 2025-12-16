import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./src/middlewares/errorMiddleware.js";
import connectDB from "./src/config/db.js";
import registrationRoutes from "./src/routes/registrationRoutes.js";
import profilesRoutes from "./src/routes/profilesRoutes.js";
import enquireRoutes from "./src/routes/enquireRoutes.js";

dotenv.config();
await connectDB();

const app = express();


app.use(cors());  // Development ke liye sab origins allow karta hai

//  Global Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Routes

// Root route – basic info
app.get("/", (req, res) => {
  res.status(200).json({
    name: "Dunga Matrimony Backend",
    status: "running",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

// Health check route – for monitoring
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});


app.use("/api", registrationRoutes);
app.use("/api", profilesRoutes);
app.use("/api", enquireRoutes);

//  Error Middleware (always last)
app.use(errorMiddleware);

//  DB + Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
