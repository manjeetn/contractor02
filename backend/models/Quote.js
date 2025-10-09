import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  service: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Quote", quoteSchema);
