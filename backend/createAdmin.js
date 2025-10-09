// createAdmin.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js"; // make sure this path is correct

dotenv.config(); // to load .env variables

const createAdmin = async () => {
  try {
    // ✅ connect to your Atlas DB
    await mongoose.connect(process.env.MONGO_URI);

    const email = "sanjeetnishad212@gmail.com"; // your admin email
    const password = "nishadsanjeet";       // strong password

    // check if already exists
    const existing = await User.findOne({ email });
    if (existing) {
      console.log("⚠️ User already exists:", existing.email);
      mongoose.disconnect();
      return;
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new admin
    const admin = new User({
      name: "Sanjeet Nishad",
      email,
      password: hashedPassword,
      role: "sub-admin",   // 👈 fixed role
      verified: true   // 👈 mark verified
    });

    await admin.save();
    console.log("✅ Sub-Admin created successfully:", email);

    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    mongoose.disconnect();
  }
};

createAdmin();
