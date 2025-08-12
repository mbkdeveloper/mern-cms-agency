import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import path from "path";

// Routes
import userRouter from "./routes/userRoute.js";
import galerieRouter from "./routes/galerieRoute.js";
import serviceRouter from "./routes/serviceRoute.js";
import testimonialRouter from "./routes/testimonialRoute.js";
import headerRouter from "./routes/headerRoute.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
connectDB();

// Static files (uploads)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// API Routes (with versioning)
app.use("/api/users", userRouter);
app.use("/api/galeries", galerieRouter);
app.use("/api/services", serviceRouter);
app.use("/api/testimonials", testimonialRouter);
app.use("/api/header", headerRouter);

// Health check route
app.get("/", (req, res) => {
  res.send({ status: "API is running..." });
});

// Start Server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
