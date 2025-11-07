import mongoose from "mongoose";

const warningSchema = new mongoose.Schema({
  showroomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users_data",
    required: true
  },
  warningType: {
    type: String,
    enum: ["LOW_RESOLUTION_RATE", "PENDING_COMPLAINTS", "PERFORMANCE_ISSUE", "OTHER"],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  resolutionRate: {
    type: Number,
    min: 0,
    max: 100
  },
  totalComplaints: {
    type: Number,
    default: 0
  },
  resolvedComplaints: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ["ACTIVE", "RESOLVED", "DISMISSED"],
    default: "ACTIVE"
  },
  severity: {
    type: String,
    enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
    default: "MEDIUM"
  },
  sentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users_data",
    required: true
  },
  acknowledged: {
    type: Boolean,
    default: false
  },
  acknowledgedAt: Date,
  acknowledgedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users_data"
  },
  resolvedAt: Date
}, {
  timestamps: true
});

// Index for better performance
warningSchema.index({ showroomId: 1, status: 1 });
warningSchema.index({ createdAt: -1 });
warningSchema.index({ acknowledged: 1 });

export default mongoose.model("Warning", warningSchema);