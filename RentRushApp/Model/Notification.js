// models/Notification.js
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users_data',
    required: true
  },
  userType: {
    type: String,
    enum: ['customer', 'showroom'],
    required: true
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  },
  type: {
    type: String,
    enum: [
      'booking_reminder',
      'booking_confirmation',
      'booking_cancellation',
      'booking_completion',
      'car_maintenance',
      'payment_due',
      'car_return',
      'general'
    ],
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
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  read: {
    type: Boolean,
    default: false
  },
  sentVia: [{
    type: String,
    enum: ['in_app', 'email', 'sms', 'push']
  }],
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

// Index for faster queries
notificationSchema.index({ userId: 1, createdAt: -1 });
notificationSchema.index({ userId: 1, read: 1 });
notificationSchema.index({ createdAt: 1 });

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;