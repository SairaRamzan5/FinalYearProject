// routes/showroomRoutes.js
import express from "express";
import { 
  getShowroomBookings, 
  getCarBookings, 
  updateBookingStatus 
} from "../Controller/showroomBookingController.js";
import { verifyToken } from "../Middleware/verifyToken.js";

const router = express.Router();

// Showroom bookings routes
router.get("/bookings", verifyToken, getShowroomBookings);
router.get("/bookings/car/:carId", verifyToken, getCarBookings);
router.patch("/bookings/:bookingId/status", verifyToken, updateBookingStatus);

export default router;