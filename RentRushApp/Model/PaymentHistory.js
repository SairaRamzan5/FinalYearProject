// // models/PaymentHistory.js
// import mongoose from "mongoose";

// const paymentHistorySchema = new mongoose.Schema({
//   bookingId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Booking",
//     required: true
//   },
//   carId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "cars", // ✅ Aap ke car model ka name
//     required: true
//   },
//   customerId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Users_data", // ✅ Aap ke user model ka name - YEH CHANGE KARNA HAI
//     required: true
//   },
//   amount: {
//     type: Number,
//     required: true
//   },
//   paymentMethod: {
//     type: String,
//     required: true,
//     enum: ["Cash", "Card", "JazzCash", "EasyPaisa", "Bank Transfer"]
//   },
//   paymentDate: {
//     type: Date,
//     default: Date.now
//   },
//   status: {
//     type: String,
//     enum: ["completed", "failed", "pending"],
//     default: "completed"
//   },
//   transactionId: {
//     type: String,
//     unique: true
//   }
// }, {
//   timestamps: true
// });

// export default mongoose.model("PaymentHistory", paymentHistorySchema);

// models/PaymentHistory.js
import mongoose from "mongoose";

const paymentHistorySchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cars",
    required: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users_data",
    required: true
  },
  showroomId: { // ✅ YEH ADD KARNA IMPORTANT HAI
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users_data",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["Cash", "Card", "JazzCash", "EasyPaisa", "Bank Transfer"]
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["completed", "failed", "pending"],
    default: "completed"
  },
  transactionId: {
    type: String,
    unique: true
  }
}, {
  timestamps: true
});

export default mongoose.model("PaymentHistory", paymentHistorySchema);