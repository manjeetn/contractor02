import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  place: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Present', 'Absent'], required: true },
}, { timestamps: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
