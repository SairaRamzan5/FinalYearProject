import mongoose from "mongoose";

const theftReportSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true }, // Customer ka naam
    cnic: { type: String, required: true }, // CNIC
    rentalDetails: {
      carName: { type: String, required: true },
      rentalStartDate: { type: Date, required: true },
      rentalEndDate: { type: Date, required: true },
      showroomName: { type: String, required: true },
    },
    reportDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("TheftReport", theftReportSchema);