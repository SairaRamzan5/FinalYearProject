import mongoose from "mongoose";
const maintenanceLogSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  },
  tasks: [], // Array of tasks performed
  repairCosts: [], // Array of repair costs
  repairDescriptions: [], // Array of repair costs
});

const car_Schema = new mongoose.Schema(
  {
    carBrand: { type: String, required: true },
    rentRate: { type: Number, required: true },
    color: { type: String, required: true },
    carModel: { type: String, required: true },
    year: { type: Number, required: true },
    yearOfManufacture: { type: Number, required: false },
    images: [{ type: String }],
    engineType: { type: String, required: true },
    bodyType: { type: String, required: true, enum: ["Sedan", "SUV"] },
    mileage: { type: String, required: true },
    variant: { type: String, required: false },
    plateNumber: { // New field added
      type: String, 
      required: false,
      match: [/^[A-Z]{3}-\d{4}$/, 'Plate number must be in format: ABC-1234']
    },
    transmission: {
      type: String,
      required: true,
      enum: ["Automatic", "Manual"],
    },
    availability: {
      type: String,
      enum: ["Available", "Rented Out", "In Maintenance", "Pending Return", "Pending Payment"], // availability status
      default: "Available", // default when car is added
    },
    maintenanceLogs: [maintenanceLogSchema],
    fuelLevel: Number,
    rentalInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users_data",
      required: true,
    },
    seatCapacity: {
      type: Number,
      required: true,
      min: 1,
    },
    luggageCapacity: {
      type: Number,
      required: true,
      min: 0,
    },
    fuelType: {
      type: String,
      required: true,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
    },
    carFeatures: {
      type: String,
    },
  },
  
  { timestamps: true },
);
const car_Model = mongoose.model("cars", car_Schema);
export default car_Model;