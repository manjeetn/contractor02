
import express from 'express';
import Attendance from '../models/Attendance.js';
import { authMiddleware, roleMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['labor']), async (req, res) => {
  try {
    const { place, date, status } = req.body;
    const userId = req.user.userId;

    if (!place || !date || !status) {
      return res.status(400).json({ message: 'Place, date, and status required' });
    }

    const attendance = new Attendance({ userId, place: place.trim(), date: new Date(date), status });
    await attendance.save();

 await attendance.save();
 
res.status(201).json({ message: "Attendance marked", attendance });  
 
} catch (error) {
    console.error("Error marking attendance:", error);  
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role === 'admin' || req.user.role === "sub-admin") {
      const attendanceRecords = await Attendance.find().populate('userId', 'name email role');
      return res.json(attendanceRecords);
    }
    if (req.user.role === 'labor') {
      const attendanceRecords = await Attendance.find({ userId: req.user.userId })
    .sort({ date: -1, createdAt: -1 })  
    .populate('userId', 'name email role');  
      return res.json(attendanceRecords);
    }
    res.status(403).json({ message: 'Access denied' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/paginated', authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let filter = {};
    if (req.user.role === 'labor') {
      filter = { userId: req.user.userId };
    }

    const total = await Attendance.countDocuments(filter);
    const records = await Attendance.find(filter)
      .sort({ date: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name email role');

    res.json({
      records,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching attendance" });
  }
});

export default router;
