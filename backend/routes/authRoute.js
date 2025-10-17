import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import Otp from "../models/Otp.js";
import resend from "../config/mailer.js";
import { otpEmailTemplate } from "../utils/emailTemplate.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (role !== "labor") {
      return res.status(403).json({ message: "Only labor signup is allowed" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      verified: false,
    });
    await user.save();

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
    await Otp.create({ email, otp: hashedOtp });

    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Verify your email",
      html: otpEmailTemplate(name, otp),
    });

    console.log("OTP sent to:", email, "Code:", otp);
    res.status(201).json({ message: "User created. Please verify your email." });
  } catch (error) {
    console.error(" Email sending error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord)
      return res.status(400).json({ message: "OTP expired or not found" });

    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
    if (otpRecord.otp !== hashedOtp) {
      return res.status(400).json({ message: "Invalid OTP. Please Enter Correct OTP" });
    }

    await User.updateOne({ email }, { verified: true });
    await Otp.deleteOne({ email });

    res.json({ message: "Email verified successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/resend-otp", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.verified) {
      return res.status(400).json({ message: "User already verified" });
    }

    await Otp.deleteMany({ email });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
    await Otp.create({ email, otp: hashedOtp });

    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Resend OTP",
      html: otpEmailTemplate(user.name, otp, "Resend OTP"),
    });

    console.log("OTP resent to:", email, "Code:", otp);
    res.json({ message: "New OTP sent to your email" });
  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials. Please Enter Correct Email" });

    if (!user.verified) {
      return res.status(400).json({ message: "Please verify your email first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Password Incorrect. Please Enter Correct Password" });

    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.role === "sub-admin") {
      return res.status(403).json({ message: "Sub-Admin cannot reset password" });
    }

    await Otp.deleteMany({ email });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
    await Otp.create({ email, otp: hashedOtp });

    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Reset Your Password",
      html: otpEmailTemplate(user.name, otp, "Use this OTP to reset your password"),
    });

    res.json({ message: "OTP sent to your email for password reset" });
  } catch (error) {
    console.error("Forgot Password error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord)
      return res.status(400).json({ message: "OTP expired or not found" });

    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
    if (otpRecord.otp !== hashedOtp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.updateOne({ email }, { password: hashedPassword });
    await Otp.deleteOne({ email });

    res.json({ message: "Password reset successfully!" });
  } catch (error) {
    console.error("Reset Password error:", error);
    res.status(500).json({ message: "Server error" });
  }
});



// 🧪 Test Resend connectivity (TEMPORARY)
router.get("/resend-test", async (req, res) => {
  try {
    const response = await fetch("https://api.resend.com/ping", {
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
    });

    console.log("Resend ping:", response.status);
    res.json({ status: response.status });
  } catch (error) {
    console.error("Resend connection failed:", error);
    res.status(500).json({ error: error.message });
  }
});



export default router;
