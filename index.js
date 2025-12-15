import express from "express";
import dotenv from "dotenv";
import { errorMiddleware } from "./src/middlewares/errorMiddleware.js";
import connectDB from "./src/config/db.js";
import registrationRoutes from "./src/routes/registrationRoutes.js";

dotenv.config();
await connectDB();

const app = express();

//  Global Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Routes
app.use("/api", registrationRoutes);

//  Error Middleware (always last)
app.use(errorMiddleware);

//  DB + Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
