import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema({
  bookingId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Booking", 
    required: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  showroomId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  carId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Car" 
  },
  invoiceUrl: { 
    type: String, 
    required: true 
  },
  balance: { 
    type: Number, 
    required: true 
  },
  isCompleted: { 
    type: Boolean, 
    default: false 
  },
  paymentMethod: { 
    type: String, 
    enum: ["Cash", "Card", "Bank Transfer", "JazzCash", "EasyPaisa"], 
    default: "Cash" 
  },
  paymentDate: {
    type: Date
  },
  carName: {
    type: String
  }
}, { 
  timestamps: true 
});

export default mongoose.model("Invoice", InvoiceSchema);