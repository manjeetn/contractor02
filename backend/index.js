import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import projectRoutes from "./routes/projectRoute.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import userRoutes from "./routes/user.js";
import laborPaymentRoute from "./routes/labourPaymentRoute.js";
import homeContactRoute from "./routes/homeContactRoute.js";
import settingRoutes from "./routes/settingsRoute.js";


const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173", 
  "https://contractor-management-app.vercel.app",
];

app.use(
   cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());


app.get("/", (req, res) => res.send("Contractor Management System API is running"));
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/users", userRoutes);
app.use("/api/labor-payments", laborPaymentRoute);
app.use("/api/forms", homeContactRoute);
app.use("/api/users", settingRoutes);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
