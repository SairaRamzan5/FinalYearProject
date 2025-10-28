// import express from "express";
// import { 
//   confirmPayment, 
//   getPaymentInvoices,
//   getReturnedBookings,
//   getPaymentHistory,
//   getPaymentHistoryWithDetails 
// } from "../Controller/paymentController.js";

// const router = express.Router();

// // ✅ Confirm payment and mark booking as returned
// router.post("/confirm-payment", confirmPayment);

// // ✅ Get all payment confirmed invoices
// router.get("/invoices", getPaymentInvoices);

// // ✅ Get all returned bookings
// router.get("/returned-bookings", getReturnedBookings);

// // ✅ Get payment history (simple version)
// router.get("/payment-history", getPaymentHistory);

// // ✅ Get payment history with details (alternative version)
// router.get("/payment-history-details", getPaymentHistoryWithDetails);

// export default router;

// routes/paymentRoutes.js
import express from "express";
import { 
  confirmPayment, 
  getShowroomPaymentInvoices,
  getShowroomReturnedBookings,
  getShowroomPaymentHistory,
  getShowroomPaymentHistoryWithDetails
} from "../Controller/paymentController.js";
import { verifyToken } from "../Middleware/verifyToken.js";

const router = express.Router();

// ✅ Confirm payment and mark booking as returned
router.post("/confirm-payment", verifyToken, confirmPayment);

// ✅ Get all payment confirmed invoices (SHOWROOM SPECIFIC)
router.get("/showroom/invoices", verifyToken, getShowroomPaymentInvoices);

// ✅ Get all returned bookings (SHOWROOM SPECIFIC)
router.get("/showroom/returned-bookings", verifyToken, getShowroomReturnedBookings);

// ✅ Get payment history (SHOWROOM SPECIFIC - simple version)
router.get("/showroom/payment-history", verifyToken, getShowroomPaymentHistory);

// ✅ Get payment history with details (SHOWROOM SPECIFIC - alternative version)
router.get("/showroom/payment-history-details", verifyToken, getShowroomPaymentHistoryWithDetails);

export default router;