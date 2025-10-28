// import express from "express";
// import {
//   bookCar,
//   updateBooking,
//   cancelBooking,
//   getUserBookings,
//   returnCar,
//   extendBooking,
//   GetBookingDetail
// } from "../Controller/bookingController.js";
// import { verifyToken } from "../Middleware/verifyToken.js";
// import path from "path";
// import { fileURLToPath } from "url";
// import { dirname } from "path";
// import Booking from "../Model/bookingModel.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const router = express.Router();

// // Booking routes
// router.post("/book", verifyToken, bookCar);
// router.put("/update/:bookingId", verifyToken, updateBooking);
// router.delete("/cancel/:bookingId", verifyToken, cancelBooking);
// router.get("/my-bookings", verifyToken, getUserBookings);
// router.patch("/extend-booking/:bookingId", verifyToken, extendBooking);
// router.post("/returncar/:BookingId", verifyToken, returnCar);
// router.get("/bookcar-detail/:bookingId", verifyToken, GetBookingDetail);

// // Invoice download route
// router.get("/invoices/:filename", (req, res) => {
//   const filePath = path.join(__dirname, "../invoices", req.params.filename);
//   res.download(filePath, (err) => {
//     if (err) {
//       console.error("Error downloading the invoice:", err);
//       res.status(404).send("Invoice not found");
//     }
//   });
// });


// //  Mark invoice as paid (paymentNotes removed)
// router.put("/invoices/:id/mark-paid", verifyToken, async (req, res) => {
//   try {
//     const booking = await Booking.findByIdAndUpdate(
//       req.params.id,
//       {
//         status: "paid",
//         paymentMethod: req.body.paymentMethod, // keep payment method
//       },
//       { new: true }
//     );

//     if (!booking) {
//       return res.status(404).json({ message: "Invoice/Booking not found" });
//     }

//     res.json({
//       message: "Invoice marked as paid",
//       booking,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });



// export default router;


import express from "express";
import {
  bookCar,
  updateBooking,
  cancelBooking,
  getUserBookings,
  returnCar,
  extendBooking,
  GetBookingDetail,
  getShowroomBookings // Make sure this is imported
} from "../Controller/bookingController.js";
import { verifyToken } from "../Middleware/verifyToken.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import Booking from "../Model/bookingModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Booking routes
router.post("/book", verifyToken, bookCar);
router.put("/update/:bookingId", verifyToken, updateBooking);
router.delete("/cancel/:bookingId", verifyToken, cancelBooking);
router.get("/my-bookings", verifyToken, getUserBookings);
router.patch("/extend-booking/:bookingId", verifyToken, extendBooking);
router.post("/returncar/:BookingId", verifyToken, returnCar);
router.get("/bookcar-detail/:bookingId", verifyToken, GetBookingDetail);

// Showroom bookings route - FIXED: Using verifyToken
router.get("/showroom/bookings", verifyToken, getShowroomBookings);

// Invoice download route
router.get("/invoices/:filename", (req, res) => {
  const filePath = path.join(__dirname, "../invoices", req.params.filename);
  res.download(filePath, (err) => {
    if (err) {
      console.error("Error downloading the invoice:", err);
      res.status(404).send("Invoice not found");
    }
  });
});

// Mark invoice as paid
router.put("/invoices/:id/mark-paid", verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status: "paid",
        paymentMethod: req.body.paymentMethod,
      },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Invoice/Booking not found" });
    }

    res.json({
      message: "Invoice marked as paid",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;