

import express from "express";
import {
  getInvoiceByBookingId,
  updateInvoicePayment,
  downloadInvoicePDF,
  getShowroomInvoices,
} from "../Controller/invoiceController.js";

const router = express.Router();

// Get invoice by bookingId
router.get("/booking/:bookingId", getInvoiceByBookingId);

// Mark invoice as paid
router.put("/:id/mark-paid", updateInvoicePayment);

// ✅ NEW ROUTES
router.get("/get-showroom-invoice", getShowroomInvoices);
router.get("/:id/download", downloadInvoicePDF);
router.put("/:id/update-payment", updateInvoicePayment);

// Add this route to your invoiceRoutes.js
router.get("/:id/download-paid", async (req, res) => {
  try {
    const invoiceId = req.params.id;
    
    // Find the invoice
    const invoice = await Invoice.findById(invoiceId)
      .populate("bookingId")
      .populate("userId")
      .populate("showroomId")
      .populate("carId");

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    // Check if invoice is paid
    if (!invoice.isCompleted) {
      return res.status(400).json({ message: "Only paid invoices can be downloaded with PAID stamp" });
    }

    // Generate invoice with PAID stamp
    const invoiceDetails = {
      _id: invoice.bookingId?._id || invoice._id,
      carId: invoice.carId,
      userId: invoice.userId,
      showroomId: invoice.showroomId,
      rentalStartDate: invoice.bookingId?.rentalStartDate,
      rentalEndDate: invoice.bookingId?.rentalEndDate,
      rentalStartTime: invoice.bookingId?.rentalStartTime,
      rentalEndTime: invoice.bookingId?.rentalEndTime,
      totalPrice: invoice.balance,
      overdueCharge: invoice.bookingId?.overdueCharge || 0,
      maintenanceCost: invoice.bookingId?.maintenanceCost || {},
      invoiceType: "Payment Confirmed Invoice",
      isPaid: true,
      paymentMethod: invoice.paymentMethod,
      paymentDate: invoice.paymentDate,
      carName: invoice.carName,
      updateCount: invoice.updateCount || 0
    };

    // Generate the invoice with PAID stamp
    const invoicePath = await generateInvoice(invoiceDetails);
    
    // Send the file
    res.download(invoicePath.invoicePath, `invoice_paid_${invoice.bookingId?._id || invoice._id}.pdf`, (err) => {
      if (err) {
        console.error("Error downloading paid invoice:", err);
        res.status(500).json({ message: "Error downloading invoice" });
      }
      
      // Clean up the temporary file after download
      setTimeout(() => {
        try {
          fs.unlinkSync(invoicePath.invoicePath);
        } catch (cleanupError) {
          console.error("Error cleaning up invoice file:", cleanupError);
        }
      }, 5000);
    });

  } catch (error) {
    console.error("Error generating paid invoice:", error);
    res.status(500).json({ message: "Failed to generate paid invoice" });
  }
});
// In your routes file
router.get('/getinvoice', getCustomerInvoices); // Updated to use new function

export default router;