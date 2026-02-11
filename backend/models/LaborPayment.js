import mongoose from "mongoose";

const LaborPaymentSchema = new mongoose.Schema({
  laborId: { type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
   required: true },
  amount: { type: Number,
     required: true },
  note: { type: String,
   default: "" },
  date: { type: Date,
     default: Date.now
     },
  createdBy: { type: mongoose.Schema.Types.ObjectId,
     ref: "User",
      required: true }, 
}, { timestamps: true });

const LaborPayment = mongoose.model("LaborPayment", LaborPaymentSchema);

export default LaborPayment;
