
import express from 'express';
import User from '../models/User.js';
import { authMiddleware, roleMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, roleMiddleware(['admin','sub-admin']), async (req, res) => {
  try {
    const role = req.query.role;
    if (role) {
      const users = await User.find({ role: role }).select('_id name email address').lean();
      res.json(users);
    } else {
      res.status(400).json({ message: 'Role is required as query param' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
