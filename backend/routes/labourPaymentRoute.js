import express from "express";
import LaborPayment from "../models/LaborPayment.js";
import User from "../models/User.js";
import { authMiddleware, roleMiddleware } from "../middleware/authMiddleware.js";
import mongoose from "mongoose";
const router = express.Router();

router.post("/", authMiddleware, roleMiddleware(["admin",'sub-admin']), async (req, res) => {
  try {
    const { laborId, amount, note } = req.body;

    if (!laborId || !amount) {
      return res.status(400).json({ message: "laborId and amount are required" });
    }

    const laborUser = await User.findOne({ _id: laborId, role: "labor" });
    if (!laborUser) {
      return res.status(404).json({ message: "Labor user not found" });
    }

    const newPayment = new LaborPayment({
      laborId,
      amount,
      note: note || "",
      createdBy: req.user.userId,
    });

    await newPayment.save();

    return res.status(201).json({ message: "Payment added successfully", payment: newPayment });
  } catch (error) {
    console.error("Error adding labor payment:", error);
    return res.status(500).json({ message: "Server error" });
  }
});


router.get("/", authMiddleware, async (req, res) => {
  console.log("Decoded user:", req.user);
  try {
    if (req.user.role === "admin" || req.user.role === "sub-admin") {
      const payments = await LaborPayment.find()
        .populate("laborId", "name email")
        .populate("createdBy", "name email")
        .sort({ date: -1 });
      return res.json(payments);
    }
    if (req.user.role === "labor") {
      const payments = await LaborPayment.find({ laborId: req.user.userId })
        .sort({ date: -1 });
      return res.json(payments);
    }
    return res.status(403).json({ message: "Access denied" });
  } catch (error) {
    console.error("Error fetching labor payments:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get(
  "/my",
  authMiddleware,
  roleMiddleware(["labor"]),
  async (req, res) => {
    try {
      const payments = await LaborPayment.find({ laborId: req.user.userId })
        .populate("createdBy", "name email"); 

      res.json(payments);
    } catch (error) {
      console.error("Error fetching labor payments:", error);
      res.status(500).json({ message: "Error fetching your payments" });
    }
  }
);

router.get("/paginated", authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    if (req.user.role === "admin" || req.user.role === "sub-admin") {
      const total = await LaborPayment.countDocuments();
      const payments = await LaborPayment.find()
        .populate("laborId", "name email")
        .populate("createdBy", "name email")
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit);

      return res.json({
        records: payments,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      });
    }

    if (req.user.role === "labor") {
      const total = await LaborPayment.countDocuments({ laborId: req.user.userId });
      const payments = await LaborPayment.find({ laborId: req.user.userId })
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit);

      return res.json({
        records: payments,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      });
    }

    res.status(403).json({ message: "Access denied" });
  } catch (error) {
    console.error("Error fetching paginated labor payments:", error);
    return res.status(500).json({ message: "Server error" });
  }
});


router.get( "/my/summary", authMiddleware, roleMiddleware(["labor"]),
  async (req, res) => {
    try {
      const [summary] = await LaborPayment.aggregate([
        { $match: { laborId: new mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: null, totalPaid: { $sum: "$amount" } } }
      ]);

      res.json({ totalPaid: summary?.totalPaid || 0 });
    } catch (error) {
      console.error("Error fetching labor payment summary:", error);
      res.status(500).json({ message: "Error fetching summary" });
    }
  }
);

router.get("/summary", authMiddleware, roleMiddleware(["admin",'sub-admin']), async (req, res) => {
  try {
    const summary = await LaborPayment.aggregate([
      { $group: { _id: "$laborId", totalPaid: { $sum: "$amount" } } }
    ]);

    const populated = await User.populate(summary, { path: "_id", select: "name email" });

    res.json(
      populated.map((s) => ({
        labor: s._id.name,
        email: s._id.email,
        totalPaid: s.totalPaid,
      }))
    );
  } catch (error) {
    console.error("Error fetching admin summary:", error);
    res.status(500).json({ message: "Error fetching summary" });
  }
});




export default router;
