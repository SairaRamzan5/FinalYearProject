// Model/Complaint.js
import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, trim: true, lowercase: true },
    contact: { type: String, required: true, trim: true },
    compl_Against: {
      type: String,
      required: true,
      enum: ["Staff", "Service"],
      trim: true,
    },
    bookingId: {  // ✅ CHANGE FROM 'booking' TO 'bookingId'
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
    },
    description: { type: String, required: true, trim: true },
    proof: { type: String },
    resolved: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Complaint = mongoose.model("Complaint", ComplaintSchema);
export default Complaint;