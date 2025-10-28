// // import mongoose from "mongoose";

// // const bookingSchema = new mongoose.Schema(
// //   {
// //     userId: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Users_data",
// //       required: true,
// //     },
// //     carId: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "cars",
// //       required: true,
// //     },
// //     showroomId: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Users_data",
// //       required: true,
// //     },
// //     rentalStartDate: {
// //       type: String,
// //       required: true,
// //     },
// //     rentalStartTime: {
// //       type: String,
// //       required: true,
// //     },
// //     rentalEndDate: {
// //       type: String,
// //       required: true,
// //     },
// //     rentalEndTime: {
// //       type: String,
// //       required: true,
// //     },
// //     totalPrice: {
// //       type: Number,
// //       required: true,
// //     },
// //     status: {
// //       type: String,
// //       enum: [
// //         "pending",
// //         "return initiated",
// //         "approved",
// //         "returned",
// //         "pending payment",
// //         "paid"
// //       ],
// //       default: "pending",
// //     },
// //     repairDescriptions: {
// //       type: Object,
// //       default: {},
// //     },
// //     invoiceUrls: [],
// //     currentInvoiceUrl: {
// //       type: String,
// //       default: "",
// //     },
// //     overdueHours: {
// //       type: Number,
// //       default: 0,
// //     },
// //     overdueCharge: {
// //       type: Number,
// //       default: 0,
// //     },
// //     actualReturnDate: {
// //       type: Date,
// //       default: null
// //     }
// //   },
// //   { timestamps: true }
// // );

// // const Booking = mongoose.model("Booking", bookingSchema);
// // export default Booking;

// import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Users_data",
//       required: true,
//     },
//     carId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "cars",
//       required: true,
//     },
//     showroomId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Users_data",
//       required: true,
//     },
//     rentalStartDate: {
//       type: String,
//       required: true,
//     },
//     rentalStartTime: {
//       type: String,
//       required: true,
//     },
//     rentalEndDate: {
//       type: String,
//       required: true,
//     },
//     rentalEndTime: {
//       type: String,
//       required: true,
//     },
//     totalPrice: {
//       type: Number,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: [
//         "pending",
//         "return initiated",
//         "approved",
//         "returned",
//         "pending payment",
//         "paid"
//       ],
//       default: "pending",
//     },
//     repairDescriptions: {
//       type: Object,
//       default: {},
//     },
//     invoiceUrls: [],
//     currentInvoiceUrl: {
//       type: String,
//       default: "",
//     },
//     overdueHours: {
//       type: Number,
//       default: 0,
//     },
//     overdueCharge: {
//       type: Number,
//       default: 0,
//     },
//     actualReturnDate: {
//       type: Date,
//       default: null
//     },
//     autoReturnInitiated: {
//       type: Boolean,
//       default: false
//     },
//     returnInitiatedAt: {
//       type: Date
//     }
//   },
//   { timestamps: true }
// );

// const Booking = mongoose.model("Booking", bookingSchema);
// export default Booking;

// models/bookingModel.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users_data",
      required: true,
    },
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cars",
      required: true,
    },
    showroomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users_data",
      required: true,
    },
    rentalStartDate: {
      type: String,
      required: true,
    },
    rentalStartTime: {
      type: String,
      required: true,
    },
    rentalEndDate: {
      type: String,
      required: true,
    },
    rentalEndTime: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "return initiated",
        "approved",
        "returned",
        "pending payment",
        "paid",
        "active",
        "cancelled"
      ],
      default: "pending",
    },
    repairDescriptions: {
      type: Object,
      default: {},
    },
    invoiceUrls: [],
    currentInvoiceUrl: {
      type: String,
      default: "",
    },
    overdueHours: {
      type: Number,
      default: 0,
    },
    overdueCharge: {
      type: Number,
      default: 0,
    },
    actualReturnDate: {
      type: Date,
      default: null
    },
    autoReturnInitiated: {
      type: Boolean,
      default: false
    },
    returnInitiatedAt: {
      type: Date
    },
    // New fields for notification system
    reminderSent: {
      type: Boolean,
      default: false
    },
    reminderSentAt: {
      type: Date
    },
    startReminderSent: {
      type: Boolean,
      default: false
    },
    cancellationReason: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;