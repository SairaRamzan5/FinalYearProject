import express from "express";
import { 
  confirmPayment, 
  getPaymentInvoices,
  getReturnedBookings,
  getPaymentHistory,
  getPaymentHistoryWithDetails 
} from "../Controller/paymentController.js";

const router = express.Router();

// ✅ Confirm payment and mark booking as returned
router.post("/confirm-payment", confirmPayment);

// ✅ Get all payment confirmed invoices
router.get("/invoices", getPaymentInvoices);

// ✅ Get all returned bookings
router.get("/returned-bookings", getReturnedBookings);

// ✅ Get payment history (simple version)
router.get("/payment-history", getPaymentHistory);

// ✅ Get payment history with details (alternative version)
router.get("/payment-history-details", getPaymentHistoryWithDetails);

export default router;
