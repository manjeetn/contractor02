import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const seedAdmins = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (adminEmail && adminPassword) {
      const adminExists = await User.findOne({ role: "admin" });

      if (!adminExists) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        await User.create({
          name: "Admin",
          email: adminEmail,
          password: hashedPassword,
          role: "admin",
          verified: true,
        });

        console.log(" Admin auto-seeded");
      }
    }

    const subAdminEmail = process.env.SUBADMIN_EMAIL;
    const subAdminPassword = process.env.SUBADMIN_PASSWORD;

    if (subAdminEmail && subAdminPassword) {
      const subAdminExists = await User.findOne({ role: "sub-admin" });

      if (!subAdminExists) {
        const hashedPassword = await bcrypt.hash(subAdminPassword, 10);

        await User.create({
          name: "Sub Admin",
          email: subAdminEmail,
          password: hashedPassword,
          role: "sub-admin",
          verified: true,
        });

        console.log(" Sub-admin auto-seeded");
      }
    }
  } catch (error) {
    console.error(" Admin seeding failed:", error.message);
  }
};
