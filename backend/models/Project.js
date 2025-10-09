import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  client: {
    name: { type: String, required: true },
    address: { type: String, required: true },
  },
  serviceType: {
    type: String,
    enum: ['painting', 'duco', 'polish', 'pu'],
    required: true,
  },
  startDate: { type: Date, required: true },
  deadline: { type: Date, required: true },
totalAmount: { type: Number, required: false, default: 0 },

  status: {
    type: String,
    enum: ['Not started', 'In progress', 'Completed'],
    default: 'Not started',
  },
  createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
