// // // // // // import Booking from "../Model/bookingModel.js";
// // // // // // import Car from "../Model/Car.js";
// // // // // // import Invoice from "../Model/invoiceModel.js";
// // // // // // import mongoose from "mongoose";
// // // // // // import { generateInvoice } from "./invoiceController.js";
// // // // // // import moment from "moment";

// // // // // // export const confirmPayment = async (req, res) => {
// // // // // //   console.log('🔄 Payment confirmation started:', req.body);
  
// // // // // //   try {
// // // // // //     const { bookingId, paymentMethod } = req.body;
    
// // // // // //     // ✅ Input validation
// // // // // //     if (!bookingId || !paymentMethod) {
// // // // // //       return res.status(400).json({
// // // // // //         success: false,
// // // // // //         message: !bookingId ? "Booking ID is required" : "Payment method is required"
// // // // // //       });
// // // // // //     }

// // // // // //     if (!mongoose.Types.ObjectId.isValid(bookingId)) {
// // // // // //       return res.status(400).json({
// // // // // //         success: false,
// // // // // //         message: "Invalid booking ID format"
// // // // // //       });
// // // // // //     }

// // // // // //     console.log('📋 Processing payment for booking:', bookingId, 'with method:', paymentMethod);

// // // // // //     // ✅ Find booking with all related data
// // // // // //     const booking = await Booking.findById(bookingId)
// // // // // //       .populate("carId")
// // // // // //       .populate("userId")
// // // // // //       .populate("showroomId");

// // // // // //     if (!booking) {
// // // // // //       return res.status(404).json({
// // // // // //         success: false,
// // // // // //         message: "Booking not found"
// // // // // //       });
// // // // // //     }

// // // // // //     console.log('✅ Booking found:', booking._id, 'Current status:', booking.status);

// // // // // //     // ✅ Check if booking is already completed/returned
// // // // // //     if (booking.status === "returned" || booking.status === "completed") {
// // // // // //       return res.status(400).json({
// // // // // //         success: false,
// // // // // //         message: `This booking is already ${booking.status}`
// // // // // //       });
// // // // // //     }

// // // // // //     // ✅ Check if booking is already paid but not returned
// // // // // //     if (booking.status === "paid") {
// // // // // //       // Update to returned status since payment is already done
// // // // // //       booking.status = "returned";
// // // // // //       booking.actualReturnDate = new Date();
// // // // // //       await booking.save();
      
// // // // // //       // Update car availability
// // // // // //       let car = null;
// // // // // //       if (booking.carId) {
// // // // // //         car = await Car.findById(booking.carId._id);
// // // // // //         if (car) {
// // // // // //           car.availability = "Available";
// // // // // //           car.rentalInfo = undefined;
// // // // // //           await car.save();
// // // // // //           console.log('✅ Car availability updated to: Available');
// // // // // //         }
// // // // // //       }

// // // // // //       return res.status(200).json({
// // // // // //         success: true,
// // // // // //         message: "Booking marked as returned successfully! Car is now available.",
// // // // // //         data: {
// // // // // //           booking: {
// // // // // //             _id: booking._id,
// // // // // //             status: booking.status,
// // // // // //             totalPrice: booking.totalPrice,
// // // // // //             actualReturnDate: booking.actualReturnDate
// // // // // //           },
// // // // // //           car: car ? {
// // // // // //             _id: car._id,
// // // // // //             availability: car.availability
// // // // // //           } : null
// // // // // //         }
// // // // // //       });
// // // // // //     }

// // // // // //     // ✅ Update booking status to "returned" instead of "paid"
// // // // // //     booking.status = "returned";
// // // // // //     booking.actualReturnDate = new Date(); // Set actual return date
// // // // // //     await booking.save();
// // // // // //     console.log('✅ Booking status updated to: returned');

// // // // // //     // ✅ Update car availability
// // // // // //     let car = null;
// // // // // //     if (booking.carId) {
// // // // // //       car = await Car.findById(booking.carId._id);
// // // // // //       if (car) {
// // // // // //         car.availability = "Available";
// // // // // //         car.rentalInfo = undefined;
// // // // // //         await car.save();
// // // // // //         console.log('✅ Car availability updated to: Available');
// // // // // //       }
// // // // // //     }

// // // // // //     const paymentDate = new Date();
// // // // // //     let invoice = await Invoice.findOne({ bookingId: bookingId });
    
// // // // // //     // ✅ USE SAME INVOICE GENERATION FUNCTION AS BOOKING
// // // // // //     let newInvoiceUrl = null;
// // // // // //     try {
// // // // // //       console.log('🔄 Generating invoice with RETURNED status...');
      
// // // // // //       const invoiceDetails = {
// // // // // //         _id: booking._id,
// // // // // //         carId: booking.carId?._id || booking.carId,
// // // // // //         userId: booking.userId?._id || booking.userId,
// // // // // //         showroomId: booking.showroomId?._id || booking.showroomId,
// // // // // //         rentalStartDate: booking.rentalStartDate,
// // // // // //         rentalEndDate: booking.rentalEndDate,
// // // // // //         rentalStartTime: booking.rentalStartTime,
// // // // // //         rentalEndTime: booking.rentalEndTime,
// // // // // //         totalPrice: booking.totalPrice,
// // // // // //         overdueCharge: booking.overdueCharge || 0,
// // // // // //         maintenanceCost: booking.maintenanceCost || {},
// // // // // //         invoiceType: "Payment Confirmed & Return Completed Invoice",
// // // // // //         isPaid: true,
// // // // // //         paymentMethod: paymentMethod,
// // // // // //         paymentDate: paymentDate,
// // // // // //         updateCount: invoice ? invoice.updateCount + 1 : 0,
// // // // // //         actualReturnDate: booking.actualReturnDate
// // // // // //       };

// // // // // //       const newInvoicePath = await generateInvoice(invoiceDetails);
// // // // // //       newInvoiceUrl = `http://localhost:3000/invoices/${newInvoicePath.invoiceName}`;
      
// // // // // //       console.log('✅ Invoice generated with RETURNED status:', newInvoicePath.invoiceName);
// // // // // //     } catch (regenerateError) {
// // // // // //       console.warn('⚠️ Could not generate invoice:', regenerateError.message);
// // // // // //       newInvoiceUrl = booking.currentInvoiceUrl || "";
// // // // // //     }

// // // // // //     // ✅ Update or create invoice
// // // // // //     if (invoice) {
// // // // // //       invoice.isCompleted = true;
// // // // // //       invoice.paymentMethod = paymentMethod;
// // // // // //       invoice.paymentDate = paymentDate;
// // // // // //       invoice.invoiceUrl = newInvoiceUrl;
// // // // // //       invoice.updateCount = (invoice.updateCount || 0) + 1;
// // // // // //       invoice.actualReturnDate = booking.actualReturnDate;
// // // // // //       await invoice.save();
// // // // // //       console.log('✅ Existing invoice updated');
// // // // // //     } else {
// // // // // //       invoice = await Invoice.create({
// // // // // //         bookingId: bookingId,
// // // // // //         userId: booking.userId?._id || booking.userId,
// // // // // //         showroomId: booking.showroomId?._id || booking.showroomId,
// // // // // //         carId: booking.carId?._id || booking.carId,
// // // // // //         invoiceUrl: newInvoiceUrl,
// // // // // //         balance: booking.totalPrice + (booking.overdueCharge || 0),
// // // // // //         isCompleted: true,
// // // // // //         paymentMethod: paymentMethod,
// // // // // //         paymentDate: paymentDate,
// // // // // //         updateCount: 0,
// // // // // //         actualReturnDate: booking.actualReturnDate
// // // // // //       });
// // // // // //       console.log('✅ New invoice created');
// // // // // //     }

// // // // // //     console.log('🎉 Payment confirmation and return process completed successfully');

// // // // // //     // ✅ SUCCESS RESPONSE
// // // // // //     res.status(200).json({
// // // // // //       success: true,
// // // // // //       message: "Payment confirmed and car returned successfully! Booking marked as returned, car is now available, and rental period ended.",
// // // // // //       data: {
// // // // // //         booking: {
// // // // // //           _id: booking._id,
// // // // // //           status: booking.status,
// // // // // //           totalPrice: booking.totalPrice,
// // // // // //           actualReturnDate: booking.actualReturnDate
// // // // // //         },
// // // // // //         car: car ? {
// // // // // //           _id: car._id,
// // // // // //           availability: car.availability
// // // // // //         } : null,
// // // // // //         invoice: {
// // // // // //           _id: invoice._id,
// // // // // //           isCompleted: invoice.isCompleted,
// // // // // //           paymentMethod: invoice.paymentMethod,
// // // // // //           invoiceUrl: newInvoiceUrl,
// // // // // //           paymentDate: paymentDate,
// // // // // //           actualReturnDate: invoice.actualReturnDate
// // // // // //         }
// // // // // //       }
// // // // // //     });

// // // // // //   } catch (error) {
// // // // // //     console.error("❌ Payment confirmation error:", error);
    
// // // // // //     let errorMessage = "Failed to confirm payment";
// // // // // //     if (error.name === 'ValidationError') {
// // // // // //       errorMessage = "Validation error: " + Object.values(error.errors).map(e => e.message).join(', ');
// // // // // //     } else if (error.code === 11000) {
// // // // // //       errorMessage = "Duplicate invoice found";
// // // // // //     }
    
// // // // // //     res.status(500).json({
// // // // // //       success: false,
// // // // // //       message: errorMessage,
// // // // // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // // // // //     });
// // // // // //   }
// // // // // // };

// // // // // // // ✅ GET ALL RETURNED BOOKINGS WITH PAYMENT CONFIRMED
// // // // // // export const getReturnedBookings = async (req, res) => {
// // // // // //   try {
// // // // // //     console.log('🔄 Fetching returned bookings with payment confirmed...');
    
// // // // // //     const bookings = await Booking.find({ 
// // // // // //       status: "returned" 
// // // // // //     })
// // // // // //     .populate("userId", "ownerName email phone")
// // // // // //     .populate("carId", "carName carBrand carModel carNumber")
// // // // // //     .populate("showroomId", "showroomName")
// // // // // //     .sort({ actualReturnDate: -1 });

// // // // // //     console.log('✅ Found returned bookings:', bookings.length);

// // // // // //     if (!bookings || bookings.length === 0) {
// // // // // //       return res.status(404).json({
// // // // // //         success: false,
// // // // // //         message: "No returned bookings found"
// // // // // //       });
// // // // // //     }

// // // // // //     res.status(200).json({
// // // // // //       success: true,
// // // // // //       message: "Returned bookings fetched successfully",
// // // // // //       count: bookings.length,
// // // // // //       data: bookings
// // // // // //     });

// // // // // //   } catch (error) {
// // // // // //     console.error("❌ Error fetching returned bookings:", error);
// // // // // //     res.status(500).json({
// // // // // //       success: false,
// // // // // //       message: "Failed to fetch returned bookings",
// // // // // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // // // // //     });
// // // // // //   }
// // // // // // };

// // // // // // // ✅ GET ALL PAYMENT CONFIRMED INVOICES
// // // // // // export const getPaymentInvoices = async (req, res) => {
// // // // // //   try {
// // // // // //     console.log('🔄 Fetching payment confirmed invoices...');
    
// // // // // //     const invoices = await Invoice.find({ 
// // // // // //       isCompleted: true 
// // // // // //     })
// // // // // //     .populate("userId", "ownerName email phone")
// // // // // //     .populate("carId", "carName carBrand carModel carNumber")
// // // // // //     .populate("showroomId", "showroomName")
// // // // // //     .populate("bookingId", "rentalStartDate rentalEndDate totalPrice status actualReturnDate")
// // // // // //     .sort({ paymentDate: -1 });

// // // // // //     console.log('✅ Found payment invoices:', invoices.length);

// // // // // //     if (!invoices || invoices.length === 0) {
// // // // // //       return res.status(404).json({
// // // // // //         success: false,
// // // // // //         message: "No payment confirmed invoices found"
// // // // // //       });
// // // // // //     }

// // // // // //     res.status(200).json({
// // // // // //       success: true,
// // // // // //       message: "Payment confirmed invoices fetched successfully",
// // // // // //       count: invoices.length,
// // // // // //       data: invoices
// // // // // //     });

// // // // // //   } catch (error) {
// // // // // //     console.error("❌ Error fetching payment invoices:", error);
// // // // // //     res.status(500).json({
// // // // // //       success: false,
// // // // // //       message: "Failed to fetch payment invoices",
// // // // // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // // // // //     });
// // // // // //   }
// // // // // // };

// // // // // // // ✅ EXPORT ALL FUNCTIONS
// // // // // // export default {
// // // // // //   confirmPayment,
// // // // // //   getPaymentInvoices,
// // // // // //   getReturnedBookings
// // // // // // };

// // // // // import nodemailer from "nodemailer";
// // // // // import Booking from "../Model/bookingModel.js";
// // // // // import Car from "../Model/Car.js";
// // // // // import Invoice from "../Model/invoiceModel.js";
// // // // // import mongoose from "mongoose";
// // // // // import { generateInvoice } from "./invoiceController.js";
// // // // // import moment from "moment";

// // // // // export const confirmPayment = async (req, res) => {
// // // // //   console.log('🔄 Payment confirmation started:', req.body);
  
// // // // //   try {
// // // // //     const { bookingId, paymentMethod } = req.body;
    
// // // // //     // ✅ Input validation
// // // // //     if (!bookingId || !paymentMethod) {
// // // // //       return res.status(400).json({
// // // // //         success: false,
// // // // //         message: !bookingId ? "Booking ID is required" : "Payment method is required"
// // // // //       });
// // // // //     }

// // // // //     if (!mongoose.Types.ObjectId.isValid(bookingId)) {
// // // // //       return res.status(400).json({
// // // // //         success: false,
// // // // //         message: "Invalid booking ID format"
// // // // //       });
// // // // //     }

// // // // //     console.log('📋 Processing payment for booking:', bookingId, 'with method:', paymentMethod);

// // // // //     // ✅ Find booking with all related data
// // // // //     const booking = await Booking.findById(bookingId)
// // // // //       .populate("carId")
// // // // //       .populate("userId")
// // // // //       .populate("showroomId");

// // // // //     if (!booking) {
// // // // //       return res.status(404).json({
// // // // //         success: false,
// // // // //         message: "Booking not found"
// // // // //       });
// // // // //     }

// // // // //     console.log('✅ Booking found:', booking._id, 'Current status:', booking.status);

// // // // //     // ✅ Check if booking is already completed/returned
// // // // //     if (booking.status === "returned" || booking.status === "completed") {
// // // // //       return res.status(400).json({
// // // // //         success: false,
// // // // //         message: `This booking is already ${booking.status}`
// // // // //       });
// // // // //     }

// // // // //     // ✅ Check if booking is already paid but not returned
// // // // //     if (booking.status === "paid") {
// // // // //       // Update to returned status since payment is already done
// // // // //       booking.status = "returned";
// // // // //       booking.actualReturnDate = new Date();
// // // // //       await booking.save();
      
// // // // //       // Update car availability
// // // // //       let car = null;
// // // // //       if (booking.carId) {
// // // // //         car = await Car.findById(booking.carId._id);
// // // // //         if (car) {
// // // // //           car.availability = "Available";
// // // // //           car.rentalInfo = undefined;
// // // // //           await car.save();
// // // // //           console.log('✅ Car availability updated to: Available');
// // // // //         }
// // // // //       }

// // // // //       return res.status(200).json({
// // // // //         success: true,
// // // // //         message: "Booking marked as returned successfully! Car is now available.",
// // // // //         data: {
// // // // //           booking: {
// // // // //             _id: booking._id,
// // // // //             status: booking.status,
// // // // //             totalPrice: booking.totalPrice,
// // // // //             actualReturnDate: booking.actualReturnDate
// // // // //           },
// // // // //           car: car ? {
// // // // //             _id: car._id,
// // // // //             availability: car.availability
// // // // //           } : null
// // // // //         }
// // // // //       });
// // // // //     }

// // // // //     // ✅ Update booking status to "returned" instead of "paid"
// // // // //     booking.status = "returned";
// // // // //     booking.actualReturnDate = new Date(); // Set actual return date
// // // // //     await booking.save();
// // // // //     console.log('✅ Booking status updated to: returned');

// // // // //     // ✅ Update car availability
// // // // //     let car = null;
// // // // //     if (booking.carId) {
// // // // //       car = await Car.findById(booking.carId._id);
// // // // //       if (car) {
// // // // //         car.availability = "Available";
// // // // //         car.rentalInfo = undefined;
// // // // //         await car.save();
// // // // //         console.log('✅ Car availability updated to: Available');
// // // // //       }
// // // // //     }

// // // // //     const paymentDate = new Date();
// // // // //     let invoice = await Invoice.findOne({ bookingId: bookingId });
    
// // // // //     // ✅ USE SAME INVOICE GENERATION FUNCTION AS BOOKING
// // // // //     let newInvoiceUrl = null;
// // // // //     try {
// // // // //       console.log('🔄 Generating invoice with RETURNED status...');
      
// // // // //       const invoiceDetails = {
// // // // //         _id: booking._id,
// // // // //         carId: booking.carId?._id || booking.carId,
// // // // //         userId: booking.userId?._id || booking.userId,
// // // // //         showroomId: booking.showroomId?._id || booking.showroomId,
// // // // //         rentalStartDate: booking.rentalStartDate,
// // // // //         rentalEndDate: booking.rentalEndDate,
// // // // //         rentalStartTime: booking.rentalStartTime,
// // // // //         rentalEndTime: booking.rentalEndTime,
// // // // //         totalPrice: booking.totalPrice,
// // // // //         overdueCharge: booking.overdueCharge || 0,
// // // // //         maintenanceCost: booking.maintenanceCost || {},
// // // // //         invoiceType: "Payment Confirmed & Return Completed Invoice",
// // // // //         isPaid: true,
// // // // //         paymentMethod: paymentMethod,
// // // // //         paymentDate: paymentDate,
// // // // //         updateCount: invoice ? invoice.updateCount + 1 : 0,
// // // // //         actualReturnDate: booking.actualReturnDate
// // // // //       };

// // // // //       const newInvoicePath = await generateInvoice(invoiceDetails);
// // // // //       newInvoiceUrl = `http://localhost:3000/invoices/${newInvoicePath.invoiceName}`;
      
// // // // //       console.log('✅ Invoice generated with RETURNED status:', newInvoicePath.invoiceName);
// // // // //     } catch (regenerateError) {
// // // // //       console.warn('⚠️ Could not generate invoice:', regenerateError.message);
// // // // //       newInvoiceUrl = booking.currentInvoiceUrl || "";
// // // // //     }

// // // // //     // ✅ Update or create invoice
// // // // //     if (invoice) {
// // // // //       invoice.isCompleted = true;
// // // // //       invoice.paymentMethod = paymentMethod;
// // // // //       invoice.paymentDate = paymentDate;
// // // // //       invoice.invoiceUrl = newInvoiceUrl;
// // // // //       invoice.updateCount = (invoice.updateCount || 0) + 1;
// // // // //       invoice.actualReturnDate = booking.actualReturnDate;
// // // // //       await invoice.save();
// // // // //       console.log('✅ Existing invoice updated');
// // // // //     } else {
// // // // //       invoice = await Invoice.create({
// // // // //         bookingId: bookingId,
// // // // //         userId: booking.userId?._id || booking.userId,
// // // // //         showroomId: booking.showroomId?._id || booking.showroomId,
// // // // //         carId: booking.carId?._id || booking.carId,
// // // // //         invoiceUrl: newInvoiceUrl,
// // // // //         balance: booking.totalPrice + (booking.overdueCharge || 0),
// // // // //         isCompleted: true,
// // // // //         paymentMethod: paymentMethod,
// // // // //         paymentDate: paymentDate,
// // // // //         updateCount: 0,
// // // // //         actualReturnDate: booking.actualReturnDate
// // // // //       });
// // // // //       console.log('✅ New invoice created');
// // // // //     }

// // // // //     // ✅✅✅ PAYMENT CONFIRMATION EMAIL WITH PAID INVOICE
// // // // //     if (booking.userId) {
// // // // //       const transporter = nodemailer.createTransporter({
// // // // //         service: "gmail",
// // // // //         auth: {
// // // // //           user: process.env.EMAIL_USER,
// // // // //           pass: process.env.EMAIL_PASS,
// // // // //         },
// // // // //       });

// // // // //       // Generate PAID invoice with red stamp
// // // // //       const paidInvoicePath = await generateInvoice({
// // // // //         _id: booking._id,
// // // // //         carId: booking.carId._id,
// // // // //         userId: booking.userId._id,
// // // // //         showroomId: booking.showroomId,
// // // // //         rentalStartDate: booking.rentalStartDate,
// // // // //         rentalEndDate: booking.rentalEndDate,
// // // // //         rentalStartTime: booking.rentalStartTime,
// // // // //         rentalEndTime: booking.rentalEndTime,
// // // // //         totalPrice: booking.totalPrice,
// // // // //         overdueCharge: booking.overdueCharge || 0,
// // // // //         maintenanceCost: booking.maintenanceCost || {},
// // // // //         invoiceType: "Payment Confirmed - Final Invoice",
// // // // //         isPaid: true, // ✅ YEH RED PAID STAMP KE LIYE HAI
// // // // //         paymentMethod: paymentMethod,
// // // // //         paymentDate: paymentDate,
// // // // //         updateCount: invoice ? invoice.updateCount + 1 : 0
// // // // //       });

// // // // //       const paidInvoiceUrl = `http://localhost:3000/invoices/${paidInvoicePath.invoiceName}`;

// // // // //       // Payment Confirmation Email Template (Same style as maintenance email)
// // // // //       const paymentConfirmTemplate = `
// // // // //         <!DOCTYPE html>
// // // // //         <html>
// // // // //         <head>
// // // // //             <style>
// // // // //                 body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
// // // // //                 .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; }
// // // // //                 .header { background: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
// // // // //                 .content { padding: 20px; }
// // // // //                 .footer { background: #f4f4f4; padding: 15px; text-align: center; border-radius: 0 0 10px 10px; }
// // // // //                 .details { background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0; }
// // // // //                 .paid-stamp { color: red; font-weight: bold; font-size: 18px; text-align: center; margin: 15px 0; }
// // // // //             </style>
// // // // //         </head>
// // // // //         <body>
// // // // //             <div class="container">
// // // // //                 <div class="header">
// // // // //                     <h1>✅ Payment Confirmed</h1>
// // // // //                     <p>Your payment has been processed successfully!</p>
// // // // //                 </div>
// // // // //                 <div class="content">
// // // // //                     <h2>Dear ${booking.userId.ownerName || 'Customer'},</h2>
// // // // //                     <p>We're pleased to inform you that your payment has been confirmed successfully.</p>
                    
// // // // //                     <div class="paid-stamp">🎉 PAYMENT CONFIRMED 🎉</div>
                    
// // // // //                     <div class="details">
// // // // //                         <h3>Transaction Details:</h3>
// // // // //                         <p><strong>Booking ID:</strong> ${booking._id.toString().slice(-8)}</p>
// // // // //                         <p><strong>Vehicle:</strong> ${booking.carId.carBrand} ${booking.carId.carModel}</p>
// // // // //                         <p><strong>Payment Method:</strong> ${paymentMethod}</p>
// // // // //                         <p><strong>Amount Paid:</strong> PKR ${(booking.totalPrice + (booking.overdueCharge || 0)).toLocaleString()}</p>
// // // // //                         <p><strong>Payment Date:</strong> ${new Date().toLocaleDateString()}</p>
// // // // //                         <p><strong>Status:</strong> <span style="color: green; font-weight: bold;">COMPLETED</span></p>
// // // // //                     </div>

// // // // //                     <p>Your invoice with <strong style="color: red;">PAID</strong> stamp is attached with this email.</p>
                    
// // // // //                     <p><strong>Note:</strong> The attached invoice includes a red <strong style="color: red;">PAID</strong> stamp indicating successful payment confirmation.</p>
                    
// // // // //                     <p>Thank you for choosing our service. We look forward to serving you again!</p>
// // // // //                 </div>
// // // // //                 <div class="footer">
// // // // //                     <p>Thank you for your business!</p>
// // // // //                     <p><strong>${booking.showroomId?.showroomName || 'Car Rental Service'}</strong></p>
// // // // //                     <p>Contact: ${booking.showroomId?.contactNumber || 'N/A'} | Email: ${booking.showroomId?.email || 'N/A'}</p>
// // // // //                 </div>
// // // // //             </div>
// // // // //         </body>
// // // // //         </html>
// // // // //       `;

// // // // //       const mailOptions = {
// // // // //         from: process.env.EMAIL_USER,
// // // // //         to: booking.userId.email,
// // // // //         subject: `Payment Confirmed - Booking #${booking._id.toString().slice(-8)}`,
// // // // //         html: paymentConfirmTemplate,
// // // // //         text: `Dear ${booking.userId.ownerName || 'Customer'},\n\nYour payment of PKR ${(booking.totalPrice + (booking.overdueCharge || 0)).toLocaleString()} has been confirmed successfully.\n\nPayment Method: ${paymentMethod}\nBooking ID: ${booking._id.toString().slice(-8)}\nVehicle: ${booking.carId.carBrand} ${booking.carId.carModel}\n\nYour invoice with PAID stamp is attached.\n\nThank you for your business!\n${booking.showroomId?.showroomName || 'Car Rental Service'}`,
// // // // //         attachments: [
// // // // //           {
// // // // //             filename: `PAID_Invoice_${booking._id.toString().slice(-8)}.pdf`,
// // // // //             path: paidInvoiceUrl,
// // // // //             contentType: "application/pdf",
// // // // //           },
// // // // //         ],
// // // // //       };

// // // // //       await transporter.sendMail(mailOptions);
// // // // //       console.log('✅ Payment confirmation email sent with PAID invoice');
// // // // //     }

// // // // //     console.log('🎉 Payment confirmation and return process completed successfully');

// // // // //     // ✅ SUCCESS RESPONSE
// // // // //     res.status(200).json({
// // // // //       success: true,
// // // // //       message: "Payment confirmed and car returned successfully! Booking marked as returned, car is now available, and customer notified with PAID invoice.",
// // // // //       data: {
// // // // //         booking: {
// // // // //           _id: booking._id,
// // // // //           status: booking.status,
// // // // //           totalPrice: booking.totalPrice,
// // // // //           actualReturnDate: booking.actualReturnDate
// // // // //         },
// // // // //         car: car ? {
// // // // //           _id: car._id,
// // // // //           availability: car.availability
// // // // //         } : null,
// // // // //         invoice: {
// // // // //           _id: invoice._id,
// // // // //           isCompleted: invoice.isCompleted,
// // // // //           paymentMethod: invoice.paymentMethod,
// // // // //           invoiceUrl: newInvoiceUrl,
// // // // //           paymentDate: paymentDate,
// // // // //           actualReturnDate: invoice.actualReturnDate
// // // // //         }
// // // // //       }
// // // // //     });

// // // // //   } catch (error) {
// // // // //     console.error("❌ Payment confirmation error:", error);
    
// // // // //     let errorMessage = "Failed to confirm payment";
// // // // //     if (error.name === 'ValidationError') {
// // // // //       errorMessage = "Validation error: " + Object.values(error.errors).map(e => e.message).join(', ');
// // // // //     } else if (error.code === 11000) {
// // // // //       errorMessage = "Duplicate invoice found";
// // // // //     }
    
// // // // //     res.status(500).json({
// // // // //       success: false,
// // // // //       message: errorMessage,
// // // // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // // // //     });
// // // // //   }
// // // // // };

// // // // // // ✅ GET ALL RETURNED BOOKINGS WITH PAYMENT CONFIRMED
// // // // // export const getReturnedBookings = async (req, res) => {
// // // // //   try {
// // // // //     console.log('🔄 Fetching returned bookings with payment confirmed...');
    
// // // // //     const bookings = await Booking.find({ 
// // // // //       status: "returned" 
// // // // //     })
// // // // //     .populate("userId", "ownerName email phone")
// // // // //     .populate("carId", "carName carBrand carModel carNumber")
// // // // //     .populate("showroomId", "showroomName")
// // // // //     .sort({ actualReturnDate: -1 });

// // // // //     console.log('✅ Found returned bookings:', bookings.length);

// // // // //     if (!bookings || bookings.length === 0) {
// // // // //       return res.status(404).json({
// // // // //         success: false,
// // // // //         message: "No returned bookings found"
// // // // //       });
// // // // //     }

// // // // //     res.status(200).json({
// // // // //       success: true,
// // // // //       message: "Returned bookings fetched successfully",
// // // // //       count: bookings.length,
// // // // //       data: bookings
// // // // //     });

// // // // //   } catch (error) {
// // // // //     console.error("❌ Error fetching returned bookings:", error);
// // // // //     res.status(500).json({
// // // // //       success: false,
// // // // //       message: "Failed to fetch returned bookings",
// // // // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // // // //     });
// // // // //   }
// // // // // };

// // // // // // ✅ GET ALL PAYMENT CONFIRMED INVOICES
// // // // // export const getPaymentInvoices = async (req, res) => {
// // // // //   try {
// // // // //     console.log('🔄 Fetching payment confirmed invoices...');
    
// // // // //     const invoices = await Invoice.find({ 
// // // // //       isCompleted: true 
// // // // //     })
// // // // //     .populate("userId", "ownerName email phone")
// // // // //     .populate("carId", "carName carBrand carModel carNumber")
// // // // //     .populate("showroomId", "showroomName")
// // // // //     .populate("bookingId", "rentalStartDate rentalEndDate totalPrice status actualReturnDate")
// // // // //     .sort({ paymentDate: -1 });

// // // // //     console.log('✅ Found payment invoices:', invoices.length);

// // // // //     if (!invoices || invoices.length === 0) {
// // // // //       return res.status(404).json({
// // // // //         success: false,
// // // // //         message: "No payment confirmed invoices found"
// // // // //       });
// // // // //     }

// // // // //     res.status(200).json({
// // // // //       success: true,
// // // // //       message: "Payment confirmed invoices fetched successfully",
// // // // //       count: invoices.length,
// // // // //       data: invoices
// // // // //     });

// // // // //   } catch (error) {
// // // // //     console.error("❌ Error fetching payment invoices:", error);
// // // // //     res.status(500).json({
// // // // //       success: false,
// // // // //       message: "Failed to fetch payment invoices",
// // // // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // // // //     });
// // // // //   }
// // // // // };

// // // // // // ✅ EXPORT ALL FUNCTIONS
// // // // // export default {
// // // // //   confirmPayment,
// // // // //   getPaymentInvoices,
// // // // //   getReturnedBookings
// // // // // };

// // // // import nodemailer from "nodemailer";
// // // // import Booking from "../Model/bookingModel.js";
// // // // import Car from "../Model/Car.js";
// // // // import Invoice from "../Model/invoiceModel.js";
// // // // import mongoose from "mongoose";
// // // // import { generateInvoice } from "./invoiceController.js";
// // // // import moment from "moment";

// // // // export const confirmPayment = async (req, res) => {
// // // //   console.log('🔄 Payment confirmation started:', req.body);
  
// // // //   try {
// // // //     const { bookingId, paymentMethod } = req.body;
    
// // // //     // ✅ Input validation
// // // //     if (!bookingId || !paymentMethod) {
// // // //       return res.status(400).json({
// // // //         success: false,
// // // //         message: !bookingId ? "Booking ID is required" : "Payment method is required"
// // // //       });
// // // //     }

// // // //     if (!mongoose.Types.ObjectId.isValid(bookingId)) {
// // // //       return res.status(400).json({
// // // //         success: false,
// // // //         message: "Invalid booking ID format"
// // // //       });
// // // //     }

// // // //     console.log('📋 Processing payment for booking:', bookingId, 'with method:', paymentMethod);

// // // //     // ✅ Find booking with all related data
// // // //     const booking = await Booking.findById(bookingId)
// // // //       .populate("carId")
// // // //       .populate("userId")
// // // //       .populate("showroomId");

// // // //     if (!booking) {
// // // //       return res.status(404).json({
// // // //         success: false,
// // // //         message: "Booking not found"
// // // //       });
// // // //     }

// // // //     console.log('✅ Booking found:', booking._id, 'Current status:', booking.status);

// // // //     // ✅ Check if booking is already completed/returned
// // // //     if (booking.status === "returned" || booking.status === "completed") {
// // // //       return res.status(400).json({
// // // //         success: false,
// // // //         message: `This booking is already ${booking.status}`
// // // //       });
// // // //     }

// // // //     // ✅ Check if booking is already paid but not returned
// // // //     if (booking.status === "paid") {
// // // //       // Update to returned status since payment is already done
// // // //       booking.status = "returned";
// // // //       booking.actualReturnDate = new Date();
// // // //       await booking.save();
      
// // // //       // Update car availability
// // // //       let car = null;
// // // //       if (booking.carId) {
// // // //         car = await Car.findById(booking.carId._id);
// // // //         if (car) {
// // // //           car.availability = "Available";
// // // //           car.rentalInfo = undefined;
// // // //           await car.save();
// // // //           console.log('✅ Car availability updated to: Available');
// // // //         }
// // // //       }

// // // //       return res.status(200).json({
// // // //         success: true,
// // // //         message: "Booking marked as returned successfully! Car is now available.",
// // // //         data: {
// // // //           booking: {
// // // //             _id: booking._id,
// // // //             status: booking.status,
// // // //             totalPrice: booking.totalPrice,
// // // //             actualReturnDate: booking.actualReturnDate
// // // //           },
// // // //           car: car ? {
// // // //             _id: car._id,
// // // //             availability: car.availability
// // // //           } : null
// // // //         }
// // // //       });
// // // //     }

// // // //     // ✅ Update booking status to "returned" instead of "paid"
// // // //     booking.status = "returned";
// // // //     booking.actualReturnDate = new Date(); // Set actual return date
// // // //     await booking.save();
// // // //     console.log('✅ Booking status updated to: returned');

// // // //     // ✅ Update car availability
// // // //     let car = null;
// // // //     if (booking.carId) {
// // // //       car = await Car.findById(booking.carId._id);
// // // //       if (car) {
// // // //         car.availability = "Available";
// // // //         car.rentalInfo = undefined;
// // // //         await car.save();
// // // //         console.log('✅ Car availability updated to: Available');
// // // //       }
// // // //     }

// // // //     const paymentDate = new Date();
// // // //     let invoice = await Invoice.findOne({ bookingId: bookingId });
    
// // // //     // ✅ USE SAME INVOICE GENERATION FUNCTION AS BOOKING
// // // //     let newInvoiceUrl = null;
// // // //     try {
// // // //       console.log('🔄 Generating invoice with RETURNED status...');
      
// // // //       const invoiceDetails = {
// // // //         _id: booking._id,
// // // //         carId: booking.carId?._id || booking.carId,
// // // //         userId: booking.userId?._id || booking.userId,
// // // //         showroomId: booking.showroomId?._id || booking.showroomId,
// // // //         rentalStartDate: booking.rentalStartDate,
// // // //         rentalEndDate: booking.rentalEndDate,
// // // //         rentalStartTime: booking.rentalStartTime,
// // // //         rentalEndTime: booking.rentalEndTime,
// // // //         totalPrice: booking.totalPrice,
// // // //         overdueCharge: booking.overdueCharge || 0,
// // // //         maintenanceCost: booking.maintenanceCost || {},
// // // //         invoiceType: "Payment Confirmed & Return Completed Invoice",
// // // //         isPaid: true,
// // // //         paymentMethod: paymentMethod,
// // // //         paymentDate: paymentDate,
// // // //         updateCount: invoice ? invoice.updateCount + 1 : 0,
// // // //         actualReturnDate: booking.actualReturnDate
// // // //       };

// // // //       const newInvoicePath = await generateInvoice(invoiceDetails);
// // // //       newInvoiceUrl = `http://localhost:3000/invoices/${newInvoicePath.invoiceName}`;
      
// // // //       console.log('✅ Invoice generated with RETURNED status:', newInvoicePath.invoiceName);
// // // //     } catch (regenerateError) {
// // // //       console.warn('⚠️ Could not generate invoice:', regenerateError.message);
// // // //       newInvoiceUrl = booking.currentInvoiceUrl || "";
// // // //     }

// // // //     // ✅ Update or create invoice
// // // //     if (invoice) {
// // // //       invoice.isCompleted = true;
// // // //       invoice.paymentMethod = paymentMethod;
// // // //       invoice.paymentDate = paymentDate;
// // // //       invoice.invoiceUrl = newInvoiceUrl;
// // // //       invoice.updateCount = (invoice.updateCount || 0) + 1;
// // // //       invoice.actualReturnDate = booking.actualReturnDate;
// // // //       await invoice.save();
// // // //       console.log('✅ Existing invoice updated');
// // // //     } else {
// // // //       invoice = await Invoice.create({
// // // //         bookingId: bookingId,
// // // //         userId: booking.userId?._id || booking.userId,
// // // //         showroomId: booking.showroomId?._id || booking.showroomId,
// // // //         carId: booking.carId?._id || booking.carId,
// // // //         invoiceUrl: newInvoiceUrl,
// // // //         balance: booking.totalPrice + (booking.overdueCharge || 0),
// // // //         isCompleted: true,
// // // //         paymentMethod: paymentMethod,
// // // //         paymentDate: paymentDate,
// // // //         updateCount: 0,
// // // //         actualReturnDate: booking.actualReturnDate
// // // //       });
// // // //       console.log('✅ New invoice created');
// // // //     }

// // // //     // ✅✅✅ PAYMENT CONFIRMATION EMAIL WITH PAID INVOICE
// // // //     if (booking.userId) {
// // // //       // ✅ FIXED: Use createTransport instead of createTransporter
// // // //       const transporter = nodemailer.createTransport({
// // // //         service: "gmail",
// // // //         auth: {
// // // //           user: process.env.EMAIL_USER,
// // // //           pass: process.env.EMAIL_PASS,
// // // //         },
// // // //       });

// // // //       // Generate PAID invoice with red stamp
// // // //       const paidInvoicePath = await generateInvoice({
// // // //         _id: booking._id,
// // // //         carId: booking.carId._id,
// // // //         userId: booking.userId._id,
// // // //         showroomId: booking.showroomId,
// // // //         rentalStartDate: booking.rentalStartDate,
// // // //         rentalEndDate: booking.rentalEndDate,
// // // //         rentalStartTime: booking.rentalStartTime,
// // // //         rentalEndTime: booking.rentalEndTime,
// // // //         totalPrice: booking.totalPrice,
// // // //         overdueCharge: booking.overdueCharge || 0,
// // // //         maintenanceCost: booking.maintenanceCost || {},
// // // //         invoiceType: "Payment Confirmed - Final Invoice",
// // // //         isPaid: true, // ✅ YEH RED PAID STAMP KE LIYE HAI
// // // //         paymentMethod: paymentMethod,
// // // //         paymentDate: paymentDate,
// // // //         updateCount: invoice ? invoice.updateCount + 1 : 0
// // // //       });

// // // //       const paidInvoiceUrl = `http://localhost:3000/invoices/${paidInvoicePath.invoiceName}`;

// // // //       // Payment Confirmation Email Template (Same style as maintenance email)
// // // //       const paymentConfirmTemplate = `
// // // //         <!DOCTYPE html>
// // // //         <html>
// // // //         <head>
// // // //             <style>
// // // //                 body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
// // // //                 .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; }
// // // //                 .header { background: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
// // // //                 .content { padding: 20px; }
// // // //                 .footer { background: #f4f4f4; padding: 15px; text-align: center; border-radius: 0 0 10px 10px; }
// // // //                 .details { background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0; }
// // // //                 .paid-stamp { color: red; font-weight: bold; font-size: 18px; text-align: center; margin: 15px 0; }
// // // //             </style>
// // // //         </head>
// // // //         <body>
// // // //             <div class="container">
// // // //                 <div class="header">
// // // //                     <h1>✅ Payment Confirmed</h1>
// // // //                     <p>Your payment has been processed successfully!</p>
// // // //                 </div>
// // // //                 <div class="content">
// // // //                     <h2>Dear ${booking.userId.ownerName || 'Customer'},</h2>
// // // //                     <p>We're pleased to inform you that your payment has been confirmed successfully.</p>
                    
// // // //                     <div class="paid-stamp">🎉 PAYMENT CONFIRMED 🎉</div>
                    
// // // //                     <div class="details">
// // // //                         <h3>Transaction Details:</h3>
// // // //                         <p><strong>Booking ID:</strong> ${booking._id.toString().slice(-8)}</p>
// // // //                         <p><strong>Vehicle:</strong> ${booking.carId.carBrand} ${booking.carId.carModel}</p>
// // // //                         <p><strong>Payment Method:</strong> ${paymentMethod}</p>
// // // //                         <p><strong>Amount Paid:</strong> PKR ${(booking.totalPrice + (booking.overdueCharge || 0)).toLocaleString()}</p>
// // // //                         <p><strong>Payment Date:</strong> ${new Date().toLocaleDateString()}</p>
// // // //                         <p><strong>Status:</strong> <span style="color: green; font-weight: bold;">COMPLETED</span></p>
// // // //                     </div>

// // // //                     <p>Your invoice with <strong style="color: red;">PAID</strong> stamp is attached with this email.</p>
                    
// // // //                     <p><strong>Note:</strong> The attached invoice includes a red <strong style="color: red;">PAID</strong> stamp indicating successful payment confirmation.</p>
                    
// // // //                     <p>Thank you for choosing our service. We look forward to serving you again!</p>
// // // //                 </div>
// // // //                 <div class="footer">
// // // //                     <p>Thank you for your business!</p>
// // // //                     <p><strong>${booking.showroomId?.showroomName || 'Car Rental Service'}</strong></p>
// // // //                     <p>Contact: ${booking.showroomId?.contactNumber || 'N/A'} | Email: ${booking.showroomId?.email || 'N/A'}</p>
// // // //                 </div>
// // // //             </div>
// // // //         </body>
// // // //         </html>
// // // //       `;

// // // //       const mailOptions = {
// // // //         from: process.env.EMAIL_USER,
// // // //         to: booking.userId.email,
// // // //         subject: `Payment Confirmed - Booking #${booking._id.toString().slice(-8)}`,
// // // //         html: paymentConfirmTemplate,
// // // //         text: `Dear ${booking.userId.ownerName || 'Customer'},\n\nYour payment of PKR ${(booking.totalPrice + (booking.overdueCharge || 0)).toLocaleString()} has been confirmed successfully.\n\nPayment Method: ${paymentMethod}\nBooking ID: ${booking._id.toString().slice(-8)}\nVehicle: ${booking.carId.carBrand} ${booking.carId.carModel}\n\nYour invoice with PAID stamp is attached.\n\nThank you for your business!\n${booking.showroomId?.showroomName || 'Car Rental Service'}`,
// // // //         attachments: [
// // // //           {
// // // //             filename: `PAID_Invoice_${booking._id.toString().slice(-8)}.pdf`,
// // // //             path: paidInvoiceUrl,
// // // //             contentType: "application/pdf",
// // // //           },
// // // //         ],
// // // //       };

// // // //       await transporter.sendMail(mailOptions);
// // // //       console.log('✅ Payment confirmation email sent with PAID invoice');
// // // //     }

// // // //     console.log('🎉 Payment confirmation and return process completed successfully');

// // // //     // ✅ SUCCESS RESPONSE
// // // //     res.status(200).json({
// // // //       success: true,
// // // //       message: "Payment confirmed and car returned successfully! Booking marked as returned, car is now available, and customer notified with PAID invoice.",
// // // //       data: {
// // // //         booking: {
// // // //           _id: booking._id,
// // // //           status: booking.status,
// // // //           totalPrice: booking.totalPrice,
// // // //           actualReturnDate: booking.actualReturnDate
// // // //         },
// // // //         car: car ? {
// // // //           _id: car._id,
// // // //           availability: car.availability
// // // //         } : null,
// // // //         invoice: {
// // // //           _id: invoice._id,
// // // //           isCompleted: invoice.isCompleted,
// // // //           paymentMethod: invoice.paymentMethod,
// // // //           invoiceUrl: newInvoiceUrl,
// // // //           paymentDate: paymentDate,
// // // //           actualReturnDate: invoice.actualReturnDate
// // // //         }
// // // //       }
// // // //     });

// // // //   } catch (error) {
// // // //     console.error("❌ Payment confirmation error:", error);
    
// // // //     let errorMessage = "Failed to confirm payment";
// // // //     if (error.name === 'ValidationError') {
// // // //       errorMessage = "Validation error: " + Object.values(error.errors).map(e => e.message).join(', ');
// // // //     } else if (error.code === 11000) {
// // // //       errorMessage = "Duplicate invoice found";
// // // //     }
    
// // // //     res.status(500).json({
// // // //       success: false,
// // // //       message: errorMessage,
// // // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // // //     });
// // // //   }
// // // // };

// // // // // ✅ GET ALL RETURNED BOOKINGS WITH PAYMENT CONFIRMED
// // // // export const getReturnedBookings = async (req, res) => {
// // // //   try {
// // // //     console.log('🔄 Fetching returned bookings with payment confirmed...');
    
// // // //     const bookings = await Booking.find({ 
// // // //       status: "returned" 
// // // //     })
// // // //     .populate("userId", "ownerName email phone")
// // // //     .populate("carId", "carName carBrand carModel carNumber")
// // // //     .populate("showroomId", "showroomName")
// // // //     .sort({ actualReturnDate: -1 });

// // // //     console.log('✅ Found returned bookings:', bookings.length);

// // // //     if (!bookings || bookings.length === 0) {
// // // //       return res.status(404).json({
// // // //         success: false,
// // // //         message: "No returned bookings found"
// // // //       });
// // // //     }

// // // //     res.status(200).json({
// // // //       success: true,
// // // //       message: "Returned bookings fetched successfully",
// // // //       count: bookings.length,
// // // //       data: bookings
// // // //     });

// // // //   } catch (error) {
// // // //     console.error("❌ Error fetching returned bookings:", error);
// // // //     res.status(500).json({
// // // //       success: false,
// // // //       message: "Failed to fetch returned bookings",
// // // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // // //     });
// // // //   }
// // // // };

// // // // // ✅ GET ALL PAYMENT CONFIRMED INVOICES
// // // // export const getPaymentInvoices = async (req, res) => {
// // // //   try {
// // // //     console.log('🔄 Fetching payment confirmed invoices...');
    
// // // //     const invoices = await Invoice.find({ 
// // // //       isCompleted: true 
// // // //     })
// // // //     .populate("userId", "ownerName email phone")
// // // //     .populate("carId", "carName carBrand carModel carNumber")
// // // //     .populate("showroomId", "showroomName")
// // // //     .populate("bookingId", "rentalStartDate rentalEndDate totalPrice status actualReturnDate")
// // // //     .sort({ paymentDate: -1 });

// // // //     console.log('✅ Found payment invoices:', invoices.length);

// // // //     if (!invoices || invoices.length === 0) {
// // // //       return res.status(404).json({
// // // //         success: false,
// // // //         message: "No payment confirmed invoices found"
// // // //       });
// // // //     }

// // // //     res.status(200).json({
// // // //       success: true,
// // // //       message: "Payment confirmed invoices fetched successfully",
// // // //       count: invoices.length,
// // // //       data: invoices
// // // //     });

// // // //   } catch (error) {
// // // //     console.error("❌ Error fetching payment invoices:", error);
// // // //     res.status(500).json({
// // // //       success: false,
// // // //       message: "Failed to fetch payment invoices",
// // // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // // //     });
// // // //   }
// // // // };

// // // // // ✅ EXPORT ALL FUNCTIONS
// // // // export default {
// // // //   confirmPayment,
// // // //   getPaymentInvoices,
// // // //   getReturnedBookings
// // // // };

// // // // controllers/paymentController.js
// // // import nodemailer from "nodemailer";
// // // import Booking from "../Model/bookingModel.js";
// // // import Car from "../Model/Car.js";
// // // import Invoice from "../Model/invoiceModel.js";
// // // import PaymentHistory from "../Model/PaymentHistory.js"; // ✅ Naya Model
// // // import mongoose from "mongoose";
// // // import { generateInvoice } from "./invoiceController.js";
// // // import moment from "moment";

// // // export const confirmPayment = async (req, res) => {
// // //   console.log('🔄 Payment confirmation started:', req.body);
  
// // //   try {
// // //     const { bookingId, paymentMethod } = req.body;
    
// // //     // ✅ Input validation
// // //     if (!bookingId || !paymentMethod) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: !bookingId ? "Booking ID is required" : "Payment method is required"
// // //       });
// // //     }

// // //     if (!mongoose.Types.ObjectId.isValid(bookingId)) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: "Invalid booking ID format"
// // //       });
// // //     }

// // //     console.log('📋 Processing payment for booking:', bookingId, 'with method:', paymentMethod);

// // //     // ✅ Find booking with all related data
// // //     const booking = await Booking.findById(bookingId)
// // //       .populate("carId")
// // //       .populate("userId")
// // //       .populate("showroomId");

// // //     if (!booking) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: "Booking not found"
// // //       });
// // //     }

// // //     console.log('✅ Booking found:', booking._id, 'Current status:', booking.status);

// // //     // ✅ Check if booking is already completed/returned
// // //     if (booking.status === "returned" || booking.status === "completed") {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: `This booking is already ${booking.status}`
// // //       });
// // //     }

// // //     // ✅ Check if booking is already paid but not returned
// // //     if (booking.status === "paid") {
// // //       // Update to returned status since payment is already done
// // //       booking.status = "returned";
// // //       booking.actualReturnDate = new Date();
// // //       await booking.save();
      
// // //       // Update car availability
// // //       let car = null;
// // //       if (booking.carId) {
// // //         car = await Car.findById(booking.carId._id);
// // //         if (car) {
// // //           car.availability = "Available";
// // //           car.rentalInfo = undefined;
// // //           await car.save();
// // //           console.log('✅ Car availability updated to: Available');
// // //         }
// // //       }

// // //       return res.status(200).json({
// // //         success: true,
// // //         message: "Booking marked as returned successfully! Car is now available.",
// // //         data: {
// // //           booking: {
// // //             _id: booking._id,
// // //             status: booking.status,
// // //             totalPrice: booking.totalPrice,
// // //             actualReturnDate: booking.actualReturnDate
// // //           },
// // //           car: car ? {
// // //             _id: car._id,
// // //             availability: car.availability
// // //           } : null
// // //         }
// // //       });
// // //     }

// // //     // ✅ Calculate total amount
// // //     const totalAmount = booking.totalPrice + (booking.overdueCharge || 0);

// // //     // ✅ CREATE PAYMENT HISTORY RECORD
// // //     const paymentHistory = new PaymentHistory({
// // //       bookingId: booking._id,
// // //       carId: booking.carId._id,
// // //       customerId: booking.userId._id,
// // //       amount: totalAmount,
// // //       paymentMethod: paymentMethod,
// // //       status: "completed",
// // //       transactionId: `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
// // //       paymentDate: new Date()
// // //     });

// // //     await paymentHistory.save();
// // //     console.log('✅ Payment history record created:', paymentHistory._id);

// // //     // ✅ Update booking status to "returned" instead of "paid"
// // //     booking.status = "returned";
// // //     booking.actualReturnDate = new Date();
// // //     booking.paymentMethod = paymentMethod;
// // //     booking.paymentDate = new Date();
// // //     await booking.save();
// // //     console.log('✅ Booking status updated to: returned');

// // //     // ✅ Update car availability
// // //     let car = null;
// // //     if (booking.carId) {
// // //       car = await Car.findById(booking.carId._id);
// // //       if (car) {
// // //         car.availability = "Available";
// // //         car.rentalInfo = undefined;
// // //         await car.save();
// // //         console.log('✅ Car availability updated to: Available');
// // //       }
// // //     }

// // //     const paymentDate = new Date();
// // //     let invoice = await Invoice.findOne({ bookingId: bookingId });
    
// // //     // ✅ USE SAME INVOICE GENERATION FUNCTION AS BOOKING
// // //     let newInvoiceUrl = null;
// // //     try {
// // //       console.log('🔄 Generating invoice with RETURNED status...');
      
// // //       const invoiceDetails = {
// // //         _id: booking._id,
// // //         carId: booking.carId?._id || booking.carId,
// // //         userId: booking.userId?._id || booking.userId,
// // //         showroomId: booking.showroomId?._id || booking.showroomId,
// // //         rentalStartDate: booking.rentalStartDate,
// // //         rentalEndDate: booking.rentalEndDate,
// // //         rentalStartTime: booking.rentalStartTime,
// // //         rentalEndTime: booking.rentalEndTime,
// // //         totalPrice: booking.totalPrice,
// // //         overdueCharge: booking.overdueCharge || 0,
// // //         maintenanceCost: booking.maintenanceCost || {},
// // //         invoiceType: "Payment Confirmed & Return Completed Invoice",
// // //         isPaid: true,
// // //         paymentMethod: paymentMethod,
// // //         paymentDate: paymentDate,
// // //         updateCount: invoice ? invoice.updateCount + 1 : 0,
// // //         actualReturnDate: booking.actualReturnDate
// // //       };

// // //       const newInvoicePath = await generateInvoice(invoiceDetails);
// // //       newInvoiceUrl = `http://localhost:3000/invoices/${newInvoicePath.invoiceName}`;
      
// // //       console.log('✅ Invoice generated with RETURNED status:', newInvoicePath.invoiceName);
// // //     } catch (regenerateError) {
// // //       console.warn('⚠️ Could not generate invoice:', regenerateError.message);
// // //       newInvoiceUrl = booking.currentInvoiceUrl || "";
// // //     }

// // //     // ✅ Update or create invoice
// // //     if (invoice) {
// // //       invoice.isCompleted = true;
// // //       invoice.paymentMethod = paymentMethod;
// // //       invoice.paymentDate = paymentDate;
// // //       invoice.invoiceUrl = newInvoiceUrl;
// // //       invoice.updateCount = (invoice.updateCount || 0) + 1;
// // //       invoice.actualReturnDate = booking.actualReturnDate;
// // //       await invoice.save();
// // //       console.log('✅ Existing invoice updated');
// // //     } else {
// // //       invoice = await Invoice.create({
// // //         bookingId: bookingId,
// // //         userId: booking.userId?._id || booking.userId,
// // //         showroomId: booking.showroomId?._id || booking.showroomId,
// // //         carId: booking.carId?._id || booking.carId,
// // //         invoiceUrl: newInvoiceUrl,
// // //         balance: totalAmount,
// // //         isCompleted: true,
// // //         paymentMethod: paymentMethod,
// // //         paymentDate: paymentDate,
// // //         updateCount: 0,
// // //         actualReturnDate: booking.actualReturnDate
// // //       });
// // //       console.log('✅ New invoice created');
// // //     }

// // //     // ✅✅✅ PAYMENT CONFIRMATION EMAIL WITH PAID INVOICE
// // //     if (booking.userId) {
// // //       const transporter = nodemailer.createTransport({
// // //         service: "gmail",
// // //         auth: {
// // //           user: process.env.EMAIL_USER,
// // //           pass: process.env.EMAIL_PASS,
// // //         },
// // //       });

// // //       // Generate PAID invoice with red stamp
// // //       const paidInvoicePath = await generateInvoice({
// // //         _id: booking._id,
// // //         carId: booking.carId._id,
// // //         userId: booking.userId._id,
// // //         showroomId: booking.showroomId,
// // //         rentalStartDate: booking.rentalStartDate,
// // //         rentalEndDate: booking.rentalEndDate,
// // //         rentalStartTime: booking.rentalStartTime,
// // //         rentalEndTime: booking.rentalEndTime,
// // //         totalPrice: booking.totalPrice,
// // //         overdueCharge: booking.overdueCharge || 0,
// // //         maintenanceCost: booking.maintenanceCost || {},
// // //         invoiceType: "Payment Confirmed - Final Invoice",
// // //         isPaid: true,
// // //         paymentMethod: paymentMethod,
// // //         paymentDate: paymentDate,
// // //         updateCount: invoice ? invoice.updateCount + 1 : 0
// // //       });

// // //       const paidInvoiceUrl = `http://localhost:3000/invoices/${paidInvoicePath.invoiceName}`;

// // //       // Payment Confirmation Email Template
// // //       const paymentConfirmTemplate = `
// // //         <!DOCTYPE html>
// // //         <html>
// // //         <head>
// // //             <style>
// // //                 body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
// // //                 .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; }
// // //                 .header { background: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
// // //                 .content { padding: 20px; }
// // //                 .footer { background: #f4f4f4; padding: 15px; text-align: center; border-radius: 0 0 10px 10px; }
// // //                 .details { background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0; }
// // //                 .paid-stamp { color: red; font-weight: bold; font-size: 18px; text-align: center; margin: 15px 0; }
// // //             </style>
// // //         </head>
// // //         <body>
// // //             <div class="container">
// // //                 <div class="header">
// // //                     <h1>✅ Payment Confirmed</h1>
// // //                     <p>Your payment has been processed successfully!</p>
// // //                 </div>
// // //                 <div class="content">
// // //                     <h2>Dear ${booking.userId.ownerName || 'Customer'},</h2>
// // //                     <p>We're pleased to inform you that your payment has been confirmed successfully.</p>
                    
// // //                     <div class="paid-stamp">🎉 PAYMENT CONFIRMED 🎉</div>
                    
// // //                     <div class="details">
// // //                         <h3>Transaction Details:</h3>
// // //                         <p><strong>Booking ID:</strong> ${booking._id.toString().slice(-8)}</p>
// // //                         <p><strong>Transaction ID:</strong> ${paymentHistory.transactionId}</p>
// // //                         <p><strong>Vehicle:</strong> ${booking.carId.carBrand} ${booking.carId.carModel}</p>
// // //                         <p><strong>Payment Method:</strong> ${paymentMethod}</p>
// // //                         <p><strong>Amount Paid:</strong> PKR ${totalAmount.toLocaleString()}</p>
// // //                         <p><strong>Payment Date:</strong> ${new Date().toLocaleDateString()}</p>
// // //                         <p><strong>Status:</strong> <span style="color: green; font-weight: bold;">COMPLETED</span></p>
// // //                     </div>

// // //                     <p>Your invoice with <strong style="color: red;">PAID</strong> stamp is attached with this email.</p>
                    
// // //                     <p><strong>Note:</strong> This transaction has been recorded in our payment history.</p>
                    
// // //                     <p>Thank you for choosing our service. We look forward to serving you again!</p>
// // //                 </div>
// // //                 <div class="footer">
// // //                     <p>Thank you for your business!</p>
// // //                     <p><strong>${booking.showroomId?.showroomName || 'Car Rental Service'}</strong></p>
// // //                     <p>Contact: ${booking.showroomId?.contactNumber || 'N/A'} | Email: ${booking.showroomId?.email || 'N/A'}</p>
// // //                 </div>
// // //             </div>
// // //         </body>
// // //         </html>
// // //       `;

// // //       const mailOptions = {
// // //         from: process.env.EMAIL_USER,
// // //         to: booking.userId.email,
// // //         subject: `Payment Confirmed - Booking #${booking._id.toString().slice(-8)}`,
// // //         html: paymentConfirmTemplate,
// // //         text: `Dear ${booking.userId.ownerName || 'Customer'},\n\nYour payment of PKR ${totalAmount.toLocaleString()} has been confirmed successfully.\n\nTransaction ID: ${paymentHistory.transactionId}\nPayment Method: ${paymentMethod}\nBooking ID: ${booking._id.toString().slice(-8)}\nVehicle: ${booking.carId.carBrand} ${booking.carId.carModel}\n\nYour invoice with PAID stamp is attached.\n\nThank you for your business!\n${booking.showroomId?.showroomName || 'Car Rental Service'}`,
// // //         attachments: [
// // //           {
// // //             filename: `PAID_Invoice_${booking._id.toString().slice(-8)}.pdf`,
// // //             path: paidInvoiceUrl,
// // //             contentType: "application/pdf",
// // //           },
// // //         ],
// // //       };

// // //       await transporter.sendMail(mailOptions);
// // //       console.log('✅ Payment confirmation email sent with PAID invoice');
// // //     }

// // //     console.log('🎉 Payment confirmation and return process completed successfully');

// // //     // ✅ SUCCESS RESPONSE
// // //     res.status(200).json({
// // //       success: true,
// // //       message: "Payment confirmed and car returned successfully! Booking marked as returned, car is now available, and customer notified with PAID invoice.",
// // //       data: {
// // //         booking: {
// // //           _id: booking._id,
// // //           status: booking.status,
// // //           totalPrice: booking.totalPrice,
// // //           actualReturnDate: booking.actualReturnDate
// // //         },
// // //         car: car ? {
// // //           _id: car._id,
// // //           availability: car.availability
// // //         } : null,
// // //         invoice: {
// // //           _id: invoice._id,
// // //           isCompleted: invoice.isCompleted,
// // //           paymentMethod: invoice.paymentMethod,
// // //           invoiceUrl: newInvoiceUrl,
// // //           paymentDate: paymentDate,
// // //           actualReturnDate: invoice.actualReturnDate
// // //         },
// // //         paymentHistory: {
// // //           _id: paymentHistory._id,
// // //           transactionId: paymentHistory.transactionId,
// // //           amount: paymentHistory.amount,
// // //           paymentMethod: paymentHistory.paymentMethod
// // //         }
// // //       }
// // //     });

// // //   } catch (error) {
// // //     console.error("❌ Payment confirmation error:", error);
    
// // //     let errorMessage = "Failed to confirm payment";
// // //     if (error.name === 'ValidationError') {
// // //       errorMessage = "Validation error: " + Object.values(error.errors).map(e => e.message).join(', ');
// // //     } else if (error.code === 11000) {
// // //       errorMessage = "Duplicate invoice found";
// // //     }
    
// // //     res.status(500).json({
// // //       success: false,
// // //       message: errorMessage,
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // };

// // // // ✅ GET PAYMENT HISTORY
// // // export const getPaymentHistory = async (req, res) => {
// // //   try {
// // //     console.log('🔄 Fetching payment history...');
    
// // //     const payments = await PaymentHistory.find()
// // //       .populate("bookingId")
// // //       .populate("carId", "carBrand carModel carNumber plateNumber")
// // //       .populate("customerId", "ownerName email phone")
// // //       .sort({ paymentDate: -1 });

// // //     console.log('✅ Found payment history records:', payments.length);

// // //     res.status(200).json({
// // //       success: true,
// // //       message: "Payment history fetched successfully",
// // //       count: payments.length,
// // //       data: payments
// // //     });

// // //   } catch (error) {
// // //     console.error("❌ Error fetching payment history:", error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Failed to fetch payment history",
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // };

// // // // ✅ GET ALL RETURNED BOOKINGS WITH PAYMENT CONFIRMED
// // // export const getReturnedBookings = async (req, res) => {
// // //   try {
// // //     console.log('🔄 Fetching returned bookings with payment confirmed...');
    
// // //     const bookings = await Booking.find({ 
// // //       status: "returned" 
// // //     })
// // //     .populate("userId", "ownerName email phone")
// // //     .populate("carId", "carName carBrand carModel carNumber")
// // //     .populate("showroomId", "showroomName")
// // //     .sort({ actualReturnDate: -1 });

// // //     console.log('✅ Found returned bookings:', bookings.length);

// // //     if (!bookings || bookings.length === 0) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: "No returned bookings found"
// // //       });
// // //     }

// // //     res.status(200).json({
// // //       success: true,
// // //       message: "Returned bookings fetched successfully",
// // //       count: bookings.length,
// // //       data: bookings
// // //     });

// // //   } catch (error) {
// // //     console.error("❌ Error fetching returned bookings:", error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Failed to fetch returned bookings",
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // };

// // // // ✅ GET ALL PAYMENT CONFIRMED INVOICES
// // // export const getPaymentInvoices = async (req, res) => {
// // //   try {
// // //     console.log('🔄 Fetching payment confirmed invoices...');
    
// // //     const invoices = await Invoice.find({ 
// // //       isCompleted: true 
// // //     })
// // //     .populate("userId", "ownerName email phone")
// // //     .populate("carId", "carName carBrand carModel carNumber")
// // //     .populate("showroomId", "showroomName")
// // //     .populate("bookingId", "rentalStartDate rentalEndDate totalPrice status actualReturnDate")
// // //     .sort({ paymentDate: -1 });

// // //     console.log('✅ Found payment invoices:', invoices.length);

// // //     if (!invoices || invoices.length === 0) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: "No payment confirmed invoices found"
// // //       });
// // //     }

// // //     res.status(200).json({
// // //       success: true,
// // //       message: "Payment confirmed invoices fetched successfully",
// // //       count: invoices.length,
// // //       data: invoices
// // //     });

// // //   } catch (error) {
// // //     console.error("❌ Error fetching payment invoices:", error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Failed to fetch payment invoices",
// // //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// // //     });
// // //   }
// // // };

// // // export default {
// // //   confirmPayment,
// // //   getPaymentInvoices,
// // //   getReturnedBookings,
// // //   getPaymentHistory
// // // };

// // // controllers/paymentController.js
// // import nodemailer from "nodemailer";
// // import Booking from "../Model/bookingModel.js"; // ✅ Aap ka actual booking model
// // import Car from "../Model/Car.js"; // ✅ Aap ka actual car model
// // import Invoice from "../Model/invoiceModel.js"; // ✅ Aap ka actual invoice model
// // import PaymentHistory from "../Model/PaymentHistory.js";
// // import mongoose from "mongoose";
// // import { generateInvoice } from "./invoiceController.js";

// // export const confirmPayment = async (req, res) => {
// //   console.log('🔄 Payment confirmation started:', req.body);
  
// //   try {
// //     const { bookingId, paymentMethod } = req.body;
    
// //     // ✅ Input validation
// //     if (!bookingId || !paymentMethod) {
// //       return res.status(400).json({
// //         success: false,
// //         message: !bookingId ? "Booking ID is required" : "Payment method is required"
// //       });
// //     }

// //     if (!mongoose.Types.ObjectId.isValid(bookingId)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Invalid booking ID format"
// //       });
// //     }

// //     console.log('📋 Processing payment for booking:', bookingId, 'with method:', paymentMethod);

// //     // ✅ Find booking with all related data
// //     const booking = await Booking.findById(bookingId)
// //       .populate("carId")
// //       .populate("userId")
// //       .populate("showroomId");

// //     if (!booking) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Booking not found"
// //       });
// //     }

// //     console.log('✅ Booking found:', booking._id, 'Current status:', booking.status);

// //     // ✅ Check if booking is already completed/returned
// //     if (booking.status === "returned" || booking.status === "completed") {
// //       return res.status(400).json({
// //         success: false,
// //         message: `This booking is already ${booking.status}`
// //       });
// //     }

// //     // ✅ Check if booking is already paid but not returned
// //     if (booking.status === "paid") {
// //       // Update to returned status since payment is already done
// //       booking.status = "returned";
// //       booking.actualReturnDate = new Date();
// //       await booking.save();
      
// //       // Update car availability
// //       let car = null;
// //       if (booking.carId) {
// //         car = await Car.findById(booking.carId._id);
// //         if (car) {
// //           car.availability = "Available";
// //           car.rentalInfo = undefined;
// //           await car.save();
// //           console.log('✅ Car availability updated to: Available');
// //         }
// //       }

// //       return res.status(200).json({
// //         success: true,
// //         message: "Booking marked as returned successfully! Car is now available.",
// //         data: {
// //           booking: {
// //             _id: booking._id,
// //             status: booking.status,
// //             totalPrice: booking.totalPrice,
// //             actualReturnDate: booking.actualReturnDate
// //           },
// //           car: car ? {
// //             _id: car._id,
// //             availability: car.availability
// //           } : null
// //         }
// //       });
// //     }

// //     // ✅ Calculate total amount
// //     const totalAmount = booking.totalPrice + (booking.overdueCharge || 0);

// //     // ✅ CREATE PAYMENT HISTORY RECORD
// //     const paymentHistory = new PaymentHistory({
// //       bookingId: booking._id,
// //       carId: booking.carId._id,
// //       customerId: booking.userId._id,
// //       amount: totalAmount,
// //       paymentMethod: paymentMethod,
// //       status: "completed",
// //       transactionId: `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
// //       paymentDate: new Date()
// //     });

// //     await paymentHistory.save();
// //     console.log('✅ Payment history record created:', paymentHistory._id);

// //     // ✅ Update booking status to "returned" instead of "paid"
// //     booking.status = "returned";
// //     booking.actualReturnDate = new Date();
// //     booking.paymentMethod = paymentMethod;
// //     booking.paymentDate = new Date();
// //     await booking.save();
// //     console.log('✅ Booking status updated to: returned');

// //     // ✅ Update car availability
// //     let car = null;
// //     if (booking.carId) {
// //       car = await Car.findById(booking.carId._id);
// //       if (car) {
// //         car.availability = "Available";
// //         car.rentalInfo = undefined;
// //         await car.save();
// //         console.log('✅ Car availability updated to: Available');
// //       }
// //     }

// //     const paymentDate = new Date();
// //     let invoice = await Invoice.findOne({ bookingId: bookingId });
    
// //     // ✅ USE SAME INVOICE GENERATION FUNCTION AS BOOKING
// //     let newInvoiceUrl = null;
// //     try {
// //       console.log('🔄 Generating invoice with RETURNED status...');
      
// //       const invoiceDetails = {
// //         _id: booking._id,
// //         carId: booking.carId?._id || booking.carId,
// //         userId: booking.userId?._id || booking.userId,
// //         showroomId: booking.showroomId?._id || booking.showroomId,
// //         rentalStartDate: booking.rentalStartDate,
// //         rentalEndDate: booking.rentalEndDate,
// //         rentalStartTime: booking.rentalStartTime,
// //         rentalEndTime: booking.rentalEndTime,
// //         totalPrice: booking.totalPrice,
// //         overdueCharge: booking.overdueCharge || 0,
// //         maintenanceCost: booking.maintenanceCost || {},
// //         invoiceType: "Payment Confirmed & Return Completed Invoice",
// //         isPaid: true,
// //         paymentMethod: paymentMethod,
// //         paymentDate: paymentDate,
// //         updateCount: invoice ? invoice.updateCount + 1 : 0,
// //         actualReturnDate: booking.actualReturnDate
// //       };

// //       const newInvoicePath = await generateInvoice(invoiceDetails);
// //       newInvoiceUrl = `http://localhost:3000/invoices/${newInvoicePath.invoiceName}`;
      
// //       console.log('✅ Invoice generated with RETURNED status:', newInvoicePath.invoiceName);
// //     } catch (regenerateError) {
// //       console.warn('⚠️ Could not generate invoice:', regenerateError.message);
// //       newInvoiceUrl = booking.currentInvoiceUrl || "";
// //     }

// //     // ✅ Update or create invoice
// //     if (invoice) {
// //       invoice.isCompleted = true;
// //       invoice.paymentMethod = paymentMethod;
// //       invoice.paymentDate = paymentDate;
// //       invoice.invoiceUrl = newInvoiceUrl;
// //       invoice.updateCount = (invoice.updateCount || 0) + 1;
// //       invoice.actualReturnDate = booking.actualReturnDate;
// //       await invoice.save();
// //       console.log('✅ Existing invoice updated');
// //     } else {
// //       invoice = await Invoice.create({
// //         bookingId: bookingId,
// //         userId: booking.userId?._id || booking.userId,
// //         showroomId: booking.showroomId?._id || booking.showroomId,
// //         carId: booking.carId?._id || booking.carId,
// //         invoiceUrl: newInvoiceUrl,
// //         balance: totalAmount,
// //         isCompleted: true,
// //         paymentMethod: paymentMethod,
// //         paymentDate: paymentDate,
// //         updateCount: 0,
// //         actualReturnDate: booking.actualReturnDate
// //       });
// //       console.log('✅ New invoice created');
// //     }

// //     // ✅✅✅ PAYMENT CONFIRMATION EMAIL WITH PAID INVOICE
// //     if (booking.userId) {
// //       const transporter = nodemailer.createTransport({
// //         service: "gmail",
// //         auth: {
// //           user: process.env.EMAIL_USER,
// //           pass: process.env.EMAIL_PASS,
// //         },
// //       });

// //       // Generate PAID invoice with red stamp
// //       const paidInvoicePath = await generateInvoice({
// //         _id: booking._id,
// //         carId: booking.carId._id,
// //         userId: booking.userId._id,
// //         showroomId: booking.showroomId,
// //         rentalStartDate: booking.rentalStartDate,
// //         rentalEndDate: booking.rentalEndDate,
// //         rentalStartTime: booking.rentalStartTime,
// //         rentalEndTime: booking.rentalEndTime,
// //         totalPrice: booking.totalPrice,
// //         overdueCharge: booking.overdueCharge || 0,
// //         maintenanceCost: booking.maintenanceCost || {},
// //         invoiceType: "Payment Confirmed - Final Invoice",
// //         isPaid: true,
// //         paymentMethod: paymentMethod,
// //         paymentDate: paymentDate,
// //         updateCount: invoice ? invoice.updateCount + 1 : 0
// //       });

// //       const paidInvoiceUrl = `http://localhost:3000/invoices/${paidInvoicePath.invoiceName}`;

// //       // Payment Confirmation Email Template
// //       const paymentConfirmTemplate = `
// //         <!DOCTYPE html>
// //         <html>
// //         <head>
// //             <style>
// //                 body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
// //                 .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; }
// //                 .header { background: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
// //                 .content { padding: 20px; }
// //                 .footer { background: #f4f4f4; padding: 15px; text-align: center; border-radius: 0 0 10px 10px; }
// //                 .details { background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0; }
// //                 .paid-stamp { color: red; font-weight: bold; font-size: 18px; text-align: center; margin: 15px 0; }
// //             </style>
// //         </head>
// //         <body>
// //             <div class="container">
// //                 <div class="header">
// //                     <h1>✅ Payment Confirmed</h1>
// //                     <p>Your payment has been processed successfully!</p>
// //                 </div>
// //                 <div class="content">
// //                     <h2>Dear ${booking.userId.ownerName || 'Customer'},</h2>
// //                     <p>We're pleased to inform you that your payment has been confirmed successfully.</p>
                    
// //                     <div class="paid-stamp">🎉 PAYMENT CONFIRMED 🎉</div>
                    
// //                     <div class="details">
// //                         <h3>Transaction Details:</h3>
// //                         <p><strong>Booking ID:</strong> ${booking._id.toString().slice(-8)}</p>
// //                         <p><strong>Transaction ID:</strong> ${paymentHistory.transactionId}</p>
// //                         <p><strong>Vehicle:</strong> ${booking.carId.carBrand} ${booking.carId.carModel}</p>
// //                         <p><strong>Payment Method:</strong> ${paymentMethod}</p>
// //                         <p><strong>Amount Paid:</strong> PKR ${totalAmount.toLocaleString()}</p>
// //                         <p><strong>Payment Date:</strong> ${new Date().toLocaleDateString()}</p>
// //                         <p><strong>Status:</strong> <span style="color: green; font-weight: bold;">COMPLETED</span></p>
// //                     </div>

// //                     <p>Your invoice with <strong style="color: red;">PAID</strong> stamp is attached with this email.</p>
                    
// //                     <p><strong>Note:</strong> This transaction has been recorded in our payment history.</p>
                    
// //                     <p>Thank you for choosing our service. We look forward to serving you again!</p>
// //                 </div>
// //                 <div class="footer">
// //                     <p>Thank you for your business!</p>
// //                     <p><strong>${booking.showroomId?.showroomName || 'Car Rental Service'}</strong></p>
// //                     <p>Contact: ${booking.showroomId?.contactNumber || 'N/A'} | Email: ${booking.showroomId?.email || 'N/A'}</p>
// //                 </div>
// //             </div>
// //         </body>
// //         </html>
// //       `;

// //       const mailOptions = {
// //         from: process.env.EMAIL_USER,
// //         to: booking.userId.email,
// //         subject: `Payment Confirmed - Booking #${booking._id.toString().slice(-8)}`,
// //         html: paymentConfirmTemplate,
// //         text: `Dear ${booking.userId.ownerName || 'Customer'},\n\nYour payment of PKR ${totalAmount.toLocaleString()} has been confirmed successfully.\n\nTransaction ID: ${paymentHistory.transactionId}\nPayment Method: ${paymentMethod}\nBooking ID: ${booking._id.toString().slice(-8)}\nVehicle: ${booking.carId.carBrand} ${booking.carId.carModel}\n\nYour invoice with PAID stamp is attached.\n\nThank you for your business!\n${booking.showroomId?.showroomName || 'Car Rental Service'}`,
// //         attachments: [
// //           {
// //             filename: `PAID_Invoice_${booking._id.toString().slice(-8)}.pdf`,
// //             path: paidInvoiceUrl,
// //             contentType: "application/pdf",
// //           },
// //         ],
// //       };

// //       await transporter.sendMail(mailOptions);
// //       console.log('✅ Payment confirmation email sent with PAID invoice');
// //     }

// //     console.log('🎉 Payment confirmation and return process completed successfully');

// //     // ✅ SUCCESS RESPONSE
// //     res.status(200).json({
// //       success: true,
// //       message: "Payment confirmed and car returned successfully! Booking marked as returned, car is now available, and customer notified with PAID invoice.",
// //       data: {
// //         booking: {
// //           _id: booking._id,
// //           status: booking.status,
// //           totalPrice: booking.totalPrice,
// //           actualReturnDate: booking.actualReturnDate
// //         },
// //         car: car ? {
// //           _id: car._id,
// //           availability: car.availability
// //         } : null,
// //         invoice: {
// //           _id: invoice._id,
// //           isCompleted: invoice.isCompleted,
// //           paymentMethod: invoice.paymentMethod,
// //           invoiceUrl: newInvoiceUrl,
// //           paymentDate: paymentDate,
// //           actualReturnDate: invoice.actualReturnDate
// //         },
// //         paymentHistory: {
// //           _id: paymentHistory._id,
// //           transactionId: paymentHistory.transactionId,
// //           amount: paymentHistory.amount,
// //           paymentMethod: paymentHistory.paymentMethod
// //         }
// //       }
// //     });

// //   } catch (error) {
// //     console.error("❌ Payment confirmation error:", error);
    
// //     let errorMessage = "Failed to confirm payment";
// //     if (error.name === 'ValidationError') {
// //       errorMessage = "Validation error: " + Object.values(error.errors).map(e => e.message).join(', ');
// //     } else if (error.code === 11000) {
// //       errorMessage = "Duplicate invoice found";
// //     }
    
// //     res.status(500).json({
// //       success: false,
// //       message: errorMessage,
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // };

// // // ✅ GET PAYMENT HISTORY - SIMPLE VERSION WITHOUT POPULATE ERRORS
// // export const getPaymentHistory = async (req, res) => {
// //   try {
// //     console.log('🔄 Fetching payment history...');
    
// //     // ✅ SIMPLE QUERY WITHOUT COMPLEX POPULATE
// //     const payments = await PaymentHistory.find()
// //       .sort({ paymentDate: -1 });

// //     console.log('✅ Found payment history records:', payments.length);

// //     // If no payments found, return empty array
// //     if (!payments || payments.length === 0) {
// //       return res.status(200).json({
// //         success: true,
// //         message: "No payment history found",
// //         count: 0,
// //         data: []
// //       });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       message: "Payment history fetched successfully",
// //       count: payments.length,
// //       data: payments
// //     });

// //   } catch (error) {
// //     console.error("❌ Error fetching payment history:", error);
    
// //     // Return empty array instead of error
// //     res.status(200).json({
// //       success: true,
// //       message: "No payment history available",
// //       count: 0,
// //       data: []
// //     });
// //   }
// // };

// // // ✅ GET PAYMENT HISTORY WITH DETAILS - ALTERNATIVE VERSION
// // export const getPaymentHistoryWithDetails = async (req, res) => {
// //   try {
// //     console.log('🔄 Fetching payment history with details...');
    
// //     // ✅ USE AGGREGATION INSTEAD OF POPULATE
// //     const payments = await PaymentHistory.aggregate([
// //       {
// //         $sort: { paymentDate: -1 }
// //       },
// //       {
// //         $lookup: {
// //           from: "bookings", // ✅ Aap ke booking collection ka name
// //           localField: "bookingId",
// //           foreignField: "_id",
// //           as: "bookingDetails"
// //         }
// //       },
// //       {
// //         $lookup: {
// //           from: "cars", // ✅ Aap ke car collection ka name
// //           localField: "carId",
// //           foreignField: "_id",
// //           as: "carDetails"
// //         }
// //       },
// //       {
// //         $lookup: {
// //           from: "users_data", // ✅ Aap ke user collection ka name
// //           localField: "customerId",
// //           foreignField: "_id",
// //           as: "customerDetails"
// //         }
// //       },
// //       {
// //         $project: {
// //           _id: 1,
// //           transactionId: 1,
// //           amount: 1,
// //           paymentMethod: 1,
// //           paymentDate: 1,
// //           status: 1,
// //           bookingId: 1,
// //           "bookingDetails._id": 1,
// //           "bookingDetails.totalPrice": 1,
// //           "carDetails.carBrand": 1,
// //           "carDetails.carModel": 1,
// //           "carDetails.carNumber": 1,
// //           "carDetails.plateNumber": 1,
// //           "customerDetails.ownerName": 1,
// //           "customerDetails.email": 1,
// //           "customerDetails.phone": 1
// //         }
// //       }
// //     ]);

// //     console.log('✅ Found payment history records with details:', payments.length);

// //     // Format the data
// //     const formattedPayments = payments.map(payment => ({
// //       _id: payment._id,
// //       transactionId: payment.transactionId,
// //       amount: payment.amount,
// //       paymentMethod: payment.paymentMethod,
// //       paymentDate: payment.paymentDate,
// //       status: payment.status,
// //       bookingId: payment.bookingId,
// //       bookingDetails: payment.bookingDetails[0] || null,
// //       carDetails: payment.carDetails[0] || null,
// //       customerDetails: payment.customerDetails[0] || null
// //     }));

// //     if (!formattedPayments || formattedPayments.length === 0) {
// //       return res.status(200).json({
// //         success: true,
// //         message: "No payment history found",
// //         count: 0,
// //         data: []
// //       });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       message: "Payment history with details fetched successfully",
// //       count: formattedPayments.length,
// //       data: formattedPayments
// //     });

// //   } catch (error) {
// //     console.error("❌ Error fetching payment history with details:", error);
    
// //     // Fallback to simple version
// //     return getPaymentHistory(req, res);
// //   }
// // };

// // // ✅ GET ALL RETURNED BOOKINGS WITH PAYMENT CONFIRMED
// // export const getReturnedBookings = async (req, res) => {
// //   try {
// //     console.log('🔄 Fetching returned bookings with payment confirmed...');
    
// //     const bookings = await Booking.find({ 
// //       status: "returned" 
// //     })
// //     .populate("userId", "ownerName email phone")
// //     .populate({
// //       path: "carId",
// //       model: "cars",
// //       select: "carBrand carModel carNumber"
// //     })
// //     .populate("showroomId", "showroomName")
// //     .sort({ actualReturnDate: -1 });

// //     console.log('✅ Found returned bookings:', bookings.length);

// //     if (!bookings || bookings.length === 0) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "No returned bookings found"
// //       });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       message: "Returned bookings fetched successfully",
// //       count: bookings.length,
// //       data: bookings
// //     });

// //   } catch (error) {
// //     console.error("❌ Error fetching returned bookings:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch returned bookings",
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // };

// // // ✅ GET ALL PAYMENT CONFIRMED INVOICES
// // export const getPaymentInvoices = async (req, res) => {
// //   try {
// //     console.log('🔄 Fetching payment confirmed invoices...');
    
// //     const invoices = await Invoice.find({ 
// //       isCompleted: true 
// //     })
// //     .populate("userId", "ownerName email phone")
// //     .populate({
// //       path: "carId",
// //       model: "cars",
// //       select: "carBrand carModel carNumber"
// //     })
// //     .populate("showroomId", "showroomName")
// //     .populate("bookingId", "rentalStartDate rentalEndDate totalPrice status actualReturnDate")
// //     .sort({ paymentDate: -1 });

// //     console.log('✅ Found payment invoices:', invoices.length);

// //     if (!invoices || invoices.length === 0) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "No payment confirmed invoices found"
// //       });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       message: "Payment confirmed invoices fetched successfully",
// //       count: invoices.length,
// //       data: invoices
// //     });

// //   } catch (error) {
// //     console.error("❌ Error fetching payment invoices:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch payment invoices",
// //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // };

// // export default {
// //   confirmPayment,
// //   getPaymentInvoices,
// //   getReturnedBookings,
// //   getPaymentHistory,
// //   getPaymentHistoryWithDetails
// // };

// // controllers/paymentController.js
// import nodemailer from "nodemailer";
// import Booking from "../Model/bookingModel.js";
// import Car from "../Model/Car.js";
// import Invoice from "../Model/invoiceModel.js";
// import PaymentHistory from "../Model/PaymentHistory.js";
// import mongoose from "mongoose";
// import { generateInvoice } from "./invoiceController.js";

// export const confirmPayment = async (req, res) => {
//   console.log('🔄 Payment confirmation started:', req.body);
  
//   try {
//     const { bookingId, paymentMethod } = req.body;
    
//     // ✅ Input validation
//     if (!bookingId || !paymentMethod) {
//       return res.status(400).json({
//         success: false,
//         message: !bookingId ? "Booking ID is required" : "Payment method is required"
//       });
//     }

//     if (!mongoose.Types.ObjectId.isValid(bookingId)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid booking ID format"
//       });
//     }

//     console.log('📋 Processing payment for booking:', bookingId, 'with method:', paymentMethod);

//     // ✅ Find booking with all related data
//     const booking = await Booking.findById(bookingId)
//       .populate("carId")
//       .populate("userId")
//       .populate("showroomId");

//     if (!booking) {
//       return res.status(404).json({
//         success: false,
//         message: "Booking not found"
//       });
//     }

//     console.log('✅ Booking found:', booking._id, 'Current status:', booking.status);

//     // ✅ Check if booking is already completed/returned
//     if (booking.status === "returned" || booking.status === "completed") {
//       return res.status(400).json({
//         success: false,
//         message: `This booking is already ${booking.status}`
//       });
//     }

//     // ✅ Check if booking is already paid but not returned
//     if (booking.status === "paid") {
//       // Update to returned status since payment is already done
//       booking.status = "returned";
//       booking.actualReturnDate = new Date();
//       await booking.save();
      
//       // Update car availability
//       let car = null;
//       if (booking.carId) {
//         car = await Car.findById(booking.carId._id);
//         if (car) {
//           car.availability = "Available";
//           car.rentalInfo = undefined;
//           await car.save();
//           console.log('✅ Car availability updated to: Available');
//         }
//       }

//       return res.status(200).json({
//         success: true,
//         message: "Booking marked as returned successfully! Car is now available.",
//         data: {
//           booking: {
//             _id: booking._id,
//             status: booking.status,
//             totalPrice: booking.totalPrice,
//             actualReturnDate: booking.actualReturnDate
//           },
//           car: car ? {
//             _id: car._id,
//             availability: car.availability
//           } : null
//         }
//       });
//     }

//     // ✅ Calculate total amount
//     const totalAmount = booking.totalPrice + (booking.overdueCharge || 0);

//     // ✅ CREATE PAYMENT HISTORY RECORD WITH SHOWROOM ID
//     const paymentHistory = new PaymentHistory({
//       bookingId: booking._id,
//       carId: booking.carId._id,
//       customerId: booking.userId._id,
//       showroomId: booking.showroomId._id, // ✅ SHOWROOM ID ADDED
//       amount: totalAmount,
//       paymentMethod: paymentMethod,
//       status: "completed",
//       transactionId: `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
//       paymentDate: new Date()
//     });

//     await paymentHistory.save();
//     console.log('✅ Payment history record created:', paymentHistory._id);

//     // ✅ Update booking status to "returned" instead of "paid"
//     booking.status = "returned";
//     booking.actualReturnDate = new Date();
//     booking.paymentMethod = paymentMethod;
//     booking.paymentDate = new Date();
//     await booking.save();
//     console.log('✅ Booking status updated to: returned');

//     // ✅ Update car availability
//     let car = null;
//     if (booking.carId) {
//       car = await Car.findById(booking.carId._id);
//       if (car) {
//         car.availability = "Available";
//         car.rentalInfo = undefined;
//         await car.save();
//         console.log('✅ Car availability updated to: Available');
//       }
//     }

//     const paymentDate = new Date();
//     let invoice = await Invoice.findOne({ bookingId: bookingId });
    
//     // ✅ USE SAME INVOICE GENERATION FUNCTION AS BOOKING
//     let newInvoiceUrl = null;
//     try {
//       console.log('🔄 Generating invoice with RETURNED status...');
      
//       const invoiceDetails = {
//         _id: booking._id,
//         carId: booking.carId?._id || booking.carId,
//         userId: booking.userId?._id || booking.userId,
//         showroomId: booking.showroomId?._id || booking.showroomId,
//         rentalStartDate: booking.rentalStartDate,
//         rentalEndDate: booking.rentalEndDate,
//         rentalStartTime: booking.rentalStartTime,
//         rentalEndTime: booking.rentalEndTime,
//         totalPrice: booking.totalPrice,
//         overdueCharge: booking.overdueCharge || 0,
//         maintenanceCost: booking.maintenanceCost || {},
//         invoiceType: "Payment Confirmed & Return Completed Invoice",
//         isPaid: true,
//         paymentMethod: paymentMethod,
//         paymentDate: paymentDate,
//         updateCount: invoice ? invoice.updateCount + 1 : 0,
//         actualReturnDate: booking.actualReturnDate
//       };

//       const newInvoicePath = await generateInvoice(invoiceDetails);
//       newInvoiceUrl = `http://localhost:3000/invoices/${newInvoicePath.invoiceName}`;
      
//       console.log('✅ Invoice generated with RETURNED status:', newInvoicePath.invoiceName);
//     } catch (regenerateError) {
//       console.warn('⚠️ Could not generate invoice:', regenerateError.message);
//       newInvoiceUrl = booking.currentInvoiceUrl || "";
//     }

//     // ✅ Update or create invoice
//     if (invoice) {
//       invoice.isCompleted = true;
//       invoice.paymentMethod = paymentMethod;
//       invoice.paymentDate = paymentDate;
//       invoice.invoiceUrl = newInvoiceUrl;
//       invoice.updateCount = (invoice.updateCount || 0) + 1;
//       invoice.actualReturnDate = booking.actualReturnDate;
//       await invoice.save();
//       console.log('✅ Existing invoice updated');
//     } else {
//       invoice = await Invoice.create({
//         bookingId: bookingId,
//         userId: booking.userId?._id || booking.userId,
//         showroomId: booking.showroomId?._id || booking.showroomId,
//         carId: booking.carId?._id || booking.carId,
//         invoiceUrl: newInvoiceUrl,
//         balance: totalAmount,
//         isCompleted: true,
//         paymentMethod: paymentMethod,
//         paymentDate: paymentDate,
//         updateCount: 0,
//         actualReturnDate: booking.actualReturnDate
//       });
//       console.log('✅ New invoice created');
//     }

//     // ✅✅✅ PAYMENT CONFIRMATION EMAIL WITH PAID INVOICE
//     if (booking.userId && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
//       try {
//         const transporter = nodemailer.createTransport({
//           service: "gmail",
//           auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS,
//           },
//         });

//         // Generate PAID invoice with red stamp
//         const paidInvoicePath = await generateInvoice({
//           _id: booking._id,
//           carId: booking.carId._id,
//           userId: booking.userId._id,
//           showroomId: booking.showroomId,
//           rentalStartDate: booking.rentalStartDate,
//           rentalEndDate: booking.rentalEndDate,
//           rentalStartTime: booking.rentalStartTime,
//           rentalEndTime: booking.rentalEndTime,
//           totalPrice: booking.totalPrice,
//           overdueCharge: booking.overdueCharge || 0,
//           maintenanceCost: booking.maintenanceCost || {},
//           invoiceType: "Payment Confirmed - Final Invoice",
//           isPaid: true,
//           paymentMethod: paymentMethod,
//           paymentDate: paymentDate,
//           updateCount: invoice ? invoice.updateCount + 1 : 0
//         });

//         const paidInvoiceUrl = `http://localhost:3000/invoices/${paidInvoicePath.invoiceName}`;

//         // Payment Confirmation Email Template
//         const paymentConfirmTemplate = `
//           <!DOCTYPE html>
//           <html>
//           <head>
//               <style>
//                   body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//                   .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; }
//                   .header { background: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
//                   .content { padding: 20px; }
//                   .footer { background: #f4f4f4; padding: 15px; text-align: center; border-radius: 0 0 10px 10px; }
//                   .details { background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0; }
//                   .paid-stamp { color: red; font-weight: bold; font-size: 18px; text-align: center; margin: 15px 0; }
//               </style>
//           </head>
//           <body>
//               <div class="container">
//                   <div class="header">
//                       <h1>✅ Payment Confirmed</h1>
//                       <p>Your payment has been processed successfully!</p>
//                   </div>
//                   <div class="content">
//                       <h2>Dear ${booking.userId.ownerName || 'Customer'},</h2>
//                       <p>We're pleased to inform you that your payment has been confirmed successfully.</p>
                      
//                       <div class="paid-stamp">🎉 PAYMENT CONFIRMED 🎉</div>
                      
//                       <div class="details">
//                           <h3>Transaction Details:</h3>
//                           <p><strong>Booking ID:</strong> ${booking._id.toString().slice(-8)}</p>
//                           <p><strong>Transaction ID:</strong> ${paymentHistory.transactionId}</p>
//                           <p><strong>Vehicle:</strong> ${booking.carId.carBrand} ${booking.carId.carModel}</p>
//                           <p><strong>Payment Method:</strong> ${paymentMethod}</p>
//                           <p><strong>Amount Paid:</strong> PKR ${totalAmount.toLocaleString()}</p>
//                           <p><strong>Payment Date:</strong> ${new Date().toLocaleDateString()}</p>
//                           <p><strong>Status:</strong> <span style="color: green; font-weight: bold;">COMPLETED</span></p>
//                       </div>

//                       <p>Your invoice with <strong style="color: red;">PAID</strong> stamp is attached with this email.</p>
                      
//                       <p><strong>Note:</strong> This transaction has been recorded in our payment history.</p>
                      
//                       <p>Thank you for choosing our service. We look forward to serving you again!</p>
//                   </div>
//                   <div class="footer">
//                       <p>Thank you for your business!</p>
//                       <p><strong>${booking.showroomId?.showroomName || 'Car Rental Service'}</strong></p>
//                       <p>Contact: ${booking.showroomId?.contactNumber || 'N/A'} | Email: ${booking.showroomId?.email || 'N/A'}</p>
//                   </div>
//               </div>
//           </body>
//           </html>
//         `;

//         const mailOptions = {
//           from: process.env.EMAIL_USER,
//           to: booking.userId.email,
//           subject: `Payment Confirmed - Booking #${booking._id.toString().slice(-8)}`,
//           html: paymentConfirmTemplate,
//           text: `Dear ${booking.userId.ownerName || 'Customer'},\n\nYour payment of PKR ${totalAmount.toLocaleString()} has been confirmed successfully.\n\nTransaction ID: ${paymentHistory.transactionId}\nPayment Method: ${paymentMethod}\nBooking ID: ${booking._id.toString().slice(-8)}\nVehicle: ${booking.carId.carBrand} ${booking.carId.carModel}\n\nYour invoice with PAID stamp is attached.\n\nThank you for your business!\n${booking.showroomId?.showroomName || 'Car Rental Service'}`,
//           attachments: [
//             {
//               filename: `PAID_Invoice_${booking._id.toString().slice(-8)}.pdf`,
//               path: paidInvoiceUrl,
//               contentType: "application/pdf",
//             },
//           ],
//         };

//         await transporter.sendMail(mailOptions);
//         console.log('✅ Payment confirmation email sent with PAID invoice');
//       } catch (emailError) {
//         console.warn('⚠️ Email sending failed:', emailError.message);
//       }
//     }

//     console.log('🎉 Payment confirmation and return process completed successfully');

//     // ✅ SUCCESS RESPONSE
//     res.status(200).json({
//       success: true,
//       message: "Payment confirmed and car returned successfully! Booking marked as returned, car is now available, and customer notified with PAID invoice.",
//       data: {
//         booking: {
//           _id: booking._id,
//           status: booking.status,
//           totalPrice: booking.totalPrice,
//           actualReturnDate: booking.actualReturnDate
//         },
//         car: car ? {
//           _id: car._id,
//           availability: car.availability
//         } : null,
//         invoice: {
//           _id: invoice._id,
//           isCompleted: invoice.isCompleted,
//           paymentMethod: invoice.paymentMethod,
//           invoiceUrl: newInvoiceUrl,
//           paymentDate: paymentDate,
//           actualReturnDate: invoice.actualReturnDate
//         },
//         paymentHistory: {
//           _id: paymentHistory._id,
//           transactionId: paymentHistory.transactionId,
//           amount: paymentHistory.amount,
//           paymentMethod: paymentHistory.paymentMethod
//         }
//       }
//     });

//   } catch (error) {
//     console.error("❌ Payment confirmation error:", error);
    
//     let errorMessage = "Failed to confirm payment";
//     if (error.name === 'ValidationError') {
//       errorMessage = "Validation error: " + Object.values(error.errors).map(e => e.message).join(', ');
//     } else if (error.code === 11000) {
//       errorMessage = "Duplicate invoice found";
//     }
    
//     res.status(500).json({
//       success: false,
//       message: errorMessage,
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// // ✅ GET SHOWROOM'S PAYMENT HISTORY ONLY
// export const getShowroomPaymentHistory = async (req, res) => {
//   try {
//     const showroomId = req.user; // Current logged-in showroom ID
    
//     if (!showroomId) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized - Showroom not found"
//       });
//     }

//     console.log('🔄 Fetching payment history for showroom:', showroomId);

//     // ✅ METHOD 1: Direct payment history filtering by showroomId
//     const payments = await PaymentHistory.find({ showroomId: showroomId })
//       .populate("bookingId")
//       .populate("carId", "carBrand carModel plateNumber")
//       .populate("customerId", "ownerName email contactNumber")
//       .sort({ paymentDate: -1 });

//     console.log(`✅ Found ${payments.length} payment records for this showroom`);

//     // ✅ METHOD 2: Alternative - Get payments via showroom's cars
//     if (payments.length === 0) {
//       console.log('🔄 Trying alternative method: getting payments via showroom cars...');
      
//       // Get all cars belonging to this showroom
//       const showroomCars = await Car.find({ userId: showroomId });
//       const carIds = showroomCars.map(car => car._id);
      
//       console.log(`🚗 Found ${showroomCars.length} cars for this showroom`);
      
//       // Find payments for these cars
//       const carPayments = await PaymentHistory.find({ carId: { $in: carIds } })
//         .populate("bookingId")
//         .populate("carId", "carBrand carModel plateNumber")
//         .populate("customerId", "ownerName email contactNumber")
//         .sort({ paymentDate: -1 });
      
//       console.log(`💰 Found ${carPayments.length} payments via showroom cars`);
      
//       if (carPayments.length > 0) {
//         return res.status(200).json({
//           success: true,
//           message: "Showroom payment history fetched successfully",
//           count: carPayments.length,
//           data: carPayments
//         });
//       }
//     }

//     if (!payments || payments.length === 0) {
//       return res.status(200).json({
//         success: true,
//         message: "No payment history found for this showroom",
//         count: 0,
//         data: []
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Showroom payment history fetched successfully",
//       count: payments.length,
//       data: payments
//     });

//   } catch (error) {
//     console.error("❌ Error fetching showroom payment history:", error);
    
//     res.status(200).json({
//       success: true,
//       message: "No payment history available",
//       count: 0,
//       data: []
//     });
//   }
// };

// // ✅ GET PAYMENT HISTORY WITH DETAILS - SHOWROOM SPECIFIC
// export const getShowroomPaymentHistoryWithDetails = async (req, res) => {
//   try {
//     const showroomId = req.user;
    
//     if (!showroomId) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized - Showroom not found"
//       });
//     }

//     console.log('🔄 Fetching showroom payment history with details...');
    
//     // ✅ USE AGGREGATION WITH SHOWROOM FILTER
//     const payments = await PaymentHistory.aggregate([
//       {
//         $match: { showroomId: new mongoose.Types.ObjectId(showroomId) }
//       },
//       {
//         $sort: { paymentDate: -1 }
//       },
//       {
//         $lookup: {
//           from: "bookings",
//           localField: "bookingId",
//           foreignField: "_id",
//           as: "bookingDetails"
//         }
//       },
//       {
//         $lookup: {
//           from: "cars",
//           localField: "carId",
//           foreignField: "_id",
//           as: "carDetails"
//         }
//       },
//       {
//         $lookup: {
//           from: "users_data",
//           localField: "customerId",
//           foreignField: "_id",
//           as: "customerDetails"
//         }
//       },
//       {
//         $lookup: {
//           from: "users_data",
//           localField: "showroomId",
//           foreignField: "_id",
//           as: "showroomDetails"
//         }
//       },
//       {
//         $project: {
//           _id: 1,
//           transactionId: 1,
//           amount: 1,
//           paymentMethod: 1,
//           paymentDate: 1,
//           status: 1,
//           bookingId: 1,
//           "bookingDetails._id": 1,
//           "bookingDetails.totalPrice": 1,
//           "bookingDetails.actualReturnDate": 1,
//           "carDetails.carBrand": 1,
//           "carDetails.carModel": 1,
//           "carDetails.plateNumber": 1,
//           "customerDetails.ownerName": 1,
//           "customerDetails.email": 1,
//           "customerDetails.contactNumber": 1,
//           "showroomDetails.showroomName": 1
//         }
//       }
//     ]);

//     console.log(`✅ Found ${payments.length} payment records with details for this showroom`);

//     // Format the data
//     const formattedPayments = payments.map(payment => ({
//       _id: payment._id,
//       transactionId: payment.transactionId,
//       amount: payment.amount,
//       paymentMethod: payment.paymentMethod,
//       paymentDate: payment.paymentDate,
//       status: payment.status,
//       bookingId: payment.bookingId,
//       bookingDetails: payment.bookingDetails[0] || null,
//       carDetails: payment.carDetails[0] || null,
//       customerDetails: payment.customerDetails[0] || null,
//       showroomDetails: payment.showroomDetails[0] || null
//     }));

//     if (!formattedPayments || formattedPayments.length === 0) {
//       return res.status(200).json({
//         success: true,
//         message: "No payment history found for this showroom",
//         count: 0,
//         data: []
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Showroom payment history with details fetched successfully",
//       count: formattedPayments.length,
//       data: formattedPayments
//     });

//   } catch (error) {
//     console.error("❌ Error fetching showroom payment history with details:", error);
    
//     // Fallback to simple version
//     return getShowroomPaymentHistory(req, res);
//   }
// };

// // ✅ GET ALL RETURNED BOOKINGS WITH PAYMENT CONFIRMED (SHOWROOM SPECIFIC)
// export const getShowroomReturnedBookings = async (req, res) => {
//   try {
//     const showroomId = req.user;
    
//     if (!showroomId) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized - Showroom not found"
//       });
//     }

//     console.log('🔄 Fetching returned bookings for showroom:', showroomId);
    
//     // ✅ Get returned bookings for this showroom's cars
//     const showroomCars = await Car.find({ userId: showroomId });
//     const carIds = showroomCars.map(car => car._id);
    
//     const bookings = await Booking.find({ 
//       status: "returned",
//       carId: { $in: carIds }
//     })
//     .populate("userId", "ownerName email contactNumber")
//     .populate("carId", "carBrand carModel plateNumber")
//     .populate("showroomId", "showroomName")
//     .sort({ actualReturnDate: -1 });

//     console.log(`✅ Found ${bookings.length} returned bookings for this showroom`);

//     if (!bookings || bookings.length === 0) {
//       return res.status(200).json({
//         success: true,
//         message: "No returned bookings found for this showroom",
//         count: 0,
//         data: []
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Showroom returned bookings fetched successfully",
//       count: bookings.length,
//       data: bookings
//     });

//   } catch (error) {
//     console.error("❌ Error fetching showroom returned bookings:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch returned bookings",
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// // ✅ GET ALL PAYMENT CONFIRMED INVOICES (SHOWROOM SPECIFIC)
// export const getShowroomPaymentInvoices = async (req, res) => {
//   try {
//     const showroomId = req.user;
    
//     if (!showroomId) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized - Showroom not found"
//       });
//     }

//     console.log('🔄 Fetching payment confirmed invoices for showroom:', showroomId);
    
//     // ✅ Get invoices for this showroom's cars
//     const showroomCars = await Car.find({ userId: showroomId });
//     const carIds = showroomCars.map(car => car._id);
    
//     const invoices = await Invoice.find({ 
//       isCompleted: true,
//       $or: [
//         { showroomId: showroomId },
//         { carId: { $in: carIds } }
//       ]
//     })
//     .populate("userId", "ownerName email contactNumber")
//     .populate("carId", "carBrand carModel plateNumber")
//     .populate("showroomId", "showroomName")
//     .populate("bookingId", "rentalStartDate rentalEndDate totalPrice status actualReturnDate")
//     .sort({ paymentDate: -1 });

//     console.log(`✅ Found ${invoices.length} payment invoices for this showroom`);

//     if (!invoices || invoices.length === 0) {
//       return res.status(200).json({
//         success: true,
//         message: "No payment confirmed invoices found for this showroom",
//         count: 0,
//         data: []
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Showroom payment confirmed invoices fetched successfully",
//       count: invoices.length,
//       data: invoices
//     });

//   } catch (error) {
//     console.error("❌ Error fetching showroom payment invoices:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch payment invoices",
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// export default {
//   confirmPayment,
//   getShowroomPaymentInvoices,
//   getShowroomReturnedBookings,
//   getShowroomPaymentHistory,
//   getShowroomPaymentHistoryWithDetails
// };

// controllers/paymentController.js
import nodemailer from "nodemailer";
import Booking from "../Model/bookingModel.js";
import Car from "../Model/Car.js";
import Invoice from "../Model/invoiceModel.js";
import PaymentHistory from "../Model/PaymentHistory.js";
import mongoose from "mongoose";
import { generateInvoice } from "./invoiceController.js";

export const confirmPayment = async (req, res) => {
  console.log('🔄 Payment confirmation started:', req.body);
  
  try {
    const { bookingId, paymentMethod } = req.body;
    
    // ✅ Input validation
    if (!bookingId || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: !bookingId ? "Booking ID is required" : "Payment method is required"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID format"
      });
    }

    console.log('📋 Processing payment for booking:', bookingId, 'with method:', paymentMethod);

    // ✅ Find booking with all related data
    const booking = await Booking.findById(bookingId)
      .populate("carId")
      .populate("userId")
      .populate("showroomId");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    console.log('✅ Booking found:', booking._id, 'Current status:', booking.status);

    // ✅ Check if booking is already completed/returned
    if (booking.status === "returned" || booking.status === "completed") {
      return res.status(400).json({
        success: false,
        message: `This booking is already ${booking.status}`
      });
    }

    // ✅ Check if booking is already paid but not returned
    if (booking.status === "paid") {
      // Update to returned status since payment is already done
      booking.status = "returned";
      booking.actualReturnDate = new Date();
      await booking.save();
      
      // Update car availability
      let car = null;
      if (booking.carId) {
        car = await Car.findById(booking.carId._id);
        if (car) {
          car.availability = "Available";
          car.rentalInfo = undefined;
          await car.save();
          console.log('✅ Car availability updated to: Available');
        }
      }

      return res.status(200).json({
        success: true,
        message: "Booking marked as returned successfully! Car is now available.",
        data: {
          booking: {
            _id: booking._id,
            status: booking.status,
            totalPrice: booking.totalPrice,
            actualReturnDate: booking.actualReturnDate
          },
          car: car ? {
            _id: car._id,
            availability: car.availability
          } : null
        }
      });
    }

    // ✅ Calculate total amount INCLUDING MAINTENANCE COST
    let maintenanceTotal = 0;
    let maintenanceItems = [];
    
    // ✅ Calculate maintenance cost from maintenanceCost object
    if (booking.maintenanceCost && typeof booking.maintenanceCost === "object") {
      console.log('🔧 Processing maintenance costs:', booking.maintenanceCost);
      
      for (const [item, costData] of Object.entries(booking.maintenanceCost)) {
        let description = item;
        let cost = 0;
        
        if (typeof costData === 'object' && costData !== null) {
          description = costData.description || item;
          cost = parseFloat(costData.cost) || 0;
        } else {
          cost = parseFloat(costData) || 0;
        }
        
        if (cost > 0) {
          maintenanceTotal += cost;
          maintenanceItems.push({ description, cost });
          console.log(`📝 Maintenance item: ${description} - ${cost} Rs`);
        }
      }
    }

    const rentalTotal = booking.totalPrice || 0;
    const overdueTotal = booking.overdueCharge || 0;
    const totalAmount = rentalTotal + maintenanceTotal + overdueTotal;

    console.log('💰 Amount Breakdown:', {
      rentalTotal,
      maintenanceTotal,
      overdueTotal,
      totalAmount
    });

    // ✅ CREATE PAYMENT HISTORY RECORD WITH SHOWROOM ID
    const paymentHistory = new PaymentHistory({
      bookingId: booking._id,
      carId: booking.carId._id,
      customerId: booking.userId._id,
      showroomId: booking.showroomId._id,
      amount: totalAmount,
      paymentMethod: paymentMethod,
      status: "completed",
      transactionId: `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
      paymentDate: new Date()
    });

    await paymentHistory.save();
    console.log('✅ Payment history record created:', paymentHistory._id);

    // ✅ Update booking status to "returned" instead of "paid"
    booking.status = "returned";
    booking.actualReturnDate = new Date();
    booking.paymentMethod = paymentMethod;
    booking.paymentDate = new Date();
    await booking.save();
    console.log('✅ Booking status updated to: returned');

    // ✅ Update car availability
    let car = null;
    if (booking.carId) {
      car = await Car.findById(booking.carId._id);
      if (car) {
        car.availability = "Available";
        car.rentalInfo = undefined;
        await car.save();
        console.log('✅ Car availability updated to: Available');
      }
    }

    const paymentDate = new Date();
    let invoice = await Invoice.findOne({ bookingId: bookingId });
    
    // ✅ USE SAME INVOICE GENERATION FUNCTION AS BOOKING WITH MAINTENANCE COST
    let newInvoiceUrl = null;
    try {
      console.log('🔄 Generating invoice with RETURNED status and maintenance cost...');
      
      const invoiceDetails = {
        _id: booking._id,
        carId: booking.carId?._id || booking.carId,
        userId: booking.userId?._id || booking.userId,
        showroomId: booking.showroomId?._id || booking.showroomId,
        rentalStartDate: booking.rentalStartDate,
        rentalEndDate: booking.rentalEndDate,
        rentalStartTime: booking.rentalStartTime,
        rentalEndTime: booking.rentalEndTime,
        totalPrice: rentalTotal,
        overdueCharge: overdueTotal,
        maintenanceCost: booking.maintenanceCost || {},
        invoiceType: "Payment Confirmed & Return Completed Invoice",
        isPaid: true,
        paymentMethod: paymentMethod,
        paymentDate: paymentDate,
        updateCount: invoice ? invoice.updateCount + 1 : 0,
        actualReturnDate: booking.actualReturnDate
      };

      const newInvoicePath = await generateInvoice(invoiceDetails);
      newInvoiceUrl = `http://localhost:3000/invoices/${newInvoicePath.invoiceName}`;
      
      console.log('✅ Invoice generated with RETURNED status and maintenance cost:', newInvoicePath.invoiceName);
    } catch (regenerateError) {
      console.warn('⚠️ Could not generate invoice:', regenerateError.message);
      newInvoiceUrl = booking.currentInvoiceUrl || "";
    }

    // ✅ Update or create invoice
    if (invoice) {
      invoice.isCompleted = true;
      invoice.paymentMethod = paymentMethod;
      invoice.paymentDate = paymentDate;
      invoice.invoiceUrl = newInvoiceUrl;
      invoice.updateCount = (invoice.updateCount || 0) + 1;
      invoice.actualReturnDate = booking.actualReturnDate;
      invoice.balance = totalAmount;
      await invoice.save();
      console.log('✅ Existing invoice updated with maintenance cost');
    } else {
      invoice = await Invoice.create({
        bookingId: bookingId,
        userId: booking.userId?._id || booking.userId,
        showroomId: booking.showroomId?._id || booking.showroomId,
        carId: booking.carId?._id || booking.carId,
        invoiceUrl: newInvoiceUrl,
        balance: totalAmount,
        isCompleted: true,
        paymentMethod: paymentMethod,
        paymentDate: paymentDate,
        updateCount: 0,
        actualReturnDate: booking.actualReturnDate
      });
      console.log('✅ New invoice created with maintenance cost');
    }

    // ✅✅✅ PAYMENT CONFIRMATION EMAIL WITH PAID INVOICE (WITH MAINTENANCE COST)
    if (booking.userId && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        // Generate PAID invoice with red stamp INCLUDING MAINTENANCE COST
        const paidInvoicePath = await generateInvoice({
          _id: booking._id,
          carId: booking.carId._id,
          userId: booking.userId._id,
          showroomId: booking.showroomId,
          rentalStartDate: booking.rentalStartDate,
          rentalEndDate: booking.rentalEndDate,
          rentalStartTime: booking.rentalStartTime,
          rentalEndTime: booking.rentalEndTime,
          totalPrice: rentalTotal,
          overdueCharge: overdueTotal,
          maintenanceCost: booking.maintenanceCost || {},
          invoiceType: "Payment Confirmed - Final Invoice",
          isPaid: true,
          paymentMethod: paymentMethod,
          paymentDate: paymentDate,
          updateCount: invoice ? invoice.updateCount + 1 : 0
        });

        const paidInvoiceUrl = `http://localhost:3000/invoices/${paidInvoicePath.invoiceName}`;

        // ✅ ENHANCED Payment Confirmation Email Template WITH MAINTENANCE COST
        const maintenanceItemsHTML = maintenanceItems.map(item => 
          `<li><strong>${item.description}:</strong> PKR ${item.cost.toLocaleString()}</li>`
        ).join('');

        const paymentConfirmTemplate = `
          <!DOCTYPE html>
          <html>
          <head>
              <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; }
                  .header { background: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
                  .content { padding: 20px; }
                  .footer { background: #f4f4f4; padding: 15px; text-align: center; border-radius: 0 0 10px 10px; }
                  .details { background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0; }
                  .paid-stamp { color: red; font-weight: bold; font-size: 18px; text-align: center; margin: 15px 0; }
                  .breakdown { background: #f0f8ff; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #4CAF50; }
                  .maintenance-note { background: #fff3cd; padding: 10px; border-radius: 5px; margin: 10px 0; border-left: 4px solid #ffc107; }
                  .maintenance-items { background: #f8f9fa; padding: 10px; border-radius: 5px; margin: 10px 0; }
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="header">
                      <h1>✅ Payment Confirmed</h1>
                      <p>Your payment has been processed successfully!</p>
                  </div>
                  <div class="content">
                      <h2>Dear ${booking.userId.ownerName || 'Customer'},</h2>
                      <p>We're pleased to inform you that your payment has been confirmed successfully.</p>
                      
                      <div class="paid-stamp">🎉 PAYMENT CONFIRMED 🎉</div>
                      
                      <div class="details">
                          <h3>Transaction Details:</h3>
                          <p><strong>Booking ID:</strong> ${booking._id.toString().slice(-8)}</p>
                          <p><strong>Transaction ID:</strong> ${paymentHistory.transactionId}</p>
                          <p><strong>Vehicle:</strong> ${booking.carId.carBrand} ${booking.carId.carModel}</p>
                          <p><strong>Payment Method:</strong> ${paymentMethod}</p>
                          <p><strong>Payment Date:</strong> ${new Date().toLocaleDateString()}</p>
                          <p><strong>Status:</strong> <span style="color: green; font-weight: bold;">COMPLETED</span></p>
                      </div>

                      <div class="breakdown">
                          <h3>💰 Amount Breakdown:</h3>
                          <p><strong>Rental Charges:</strong> PKR ${rentalTotal.toLocaleString()}</p>
                          ${maintenanceTotal > 0 ? `<p><strong>Maintenance Charges:</strong> PKR ${maintenanceTotal.toLocaleString()}</p>` : ''}
                          ${overdueTotal > 0 ? `<p><strong>Overdue Charges:</strong> PKR ${overdueTotal.toLocaleString()}</p>` : ''}
                          <p style="border-top: 1px solid #ddd; padding-top: 8px; margin-top: 8px; font-size: 16px; font-weight: bold;">
                              <strong>Total Amount Paid:</strong> PKR ${totalAmount.toLocaleString()}
                          </p>
                      </div>

                      ${maintenanceTotal > 0 ? `
                      <div class="maintenance-note">
                          <h4>🔧 Maintenance Details</h4>
                          <p>This payment includes maintenance and repair costs for the vehicle:</p>
                          <div class="maintenance-items">
                              <ul style="margin: 0; padding-left: 20px;">
                                  ${maintenanceItemsHTML}
                              </ul>
                          </div>
                          <p><em>Detailed breakdown is available in the attached invoice.</em></p>
                      </div>
                      ` : ''}

                      <p>Your invoice with <strong style="color: red;">PAID</strong> stamp is attached with this email.</p>
                      
                      <p><strong>Note:</strong> This transaction has been recorded in our payment history.</p>
                      
                      <p>Thank you for choosing our service. We look forward to serving you again!</p>
                  </div>
                  <div class="footer">
                      <p>Thank you for your business!</p>
                      <p><strong>${booking.showroomId?.showroomName || 'Car Rental Service'}</strong></p>
                      <p>Contact: ${booking.showroomId?.contactNumber || 'N/A'} | Email: ${booking.showroomId?.email || 'N/A'}</p>
                  </div>
              </div>
          </body>
          </html>
        `;

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: booking.userId.email,
          subject: `Payment Confirmed - Booking #${booking._id.toString().slice(-8)}`,
          html: paymentConfirmTemplate,
          text: `Dear ${booking.userId.ownerName || 'Customer'},\n\nYour payment of PKR ${totalAmount.toLocaleString()} has been confirmed successfully.\n\nTransaction ID: ${paymentHistory.transactionId}\nPayment Method: ${paymentMethod}\nBooking ID: ${booking._id.toString().slice(-8)}\nVehicle: ${booking.carId.carBrand} ${booking.carId.carModel}\n\nAmount Breakdown:\n- Rental Charges: PKR ${rentalTotal.toLocaleString()}\n${maintenanceTotal > 0 ? `- Maintenance Charges: PKR ${maintenanceTotal.toLocaleString()}\n` : ''}${overdueTotal > 0 ? `- Overdue Charges: PKR ${overdueTotal.toLocaleString()}\n` : ''}Total: PKR ${totalAmount.toLocaleString()}\n\nYour invoice with PAID stamp is attached.\n\nThank you for your business!\n${booking.showroomId?.showroomName || 'Car Rental Service'}`,
          attachments: [
            {
              filename: `PAID_Invoice_${booking._id.toString().slice(-8)}.pdf`,
              path: paidInvoiceUrl,
              contentType: "application/pdf",
            },
          ],
        };

        await transporter.sendMail(mailOptions);
        console.log('✅ Payment confirmation email sent with PAID invoice including maintenance cost');
      } catch (emailError) {
        console.warn('⚠️ Email sending failed:', emailError.message);
      }
    }

    console.log('🎉 Payment confirmation and return process completed successfully');

    // ✅ SUCCESS RESPONSE WITH MAINTENANCE COST DETAILS
    res.status(200).json({
      success: true,
      message: "Payment confirmed and car returned successfully! Booking marked as returned, car is now available, and customer notified with PAID invoice including maintenance costs.",
      data: {
        booking: {
          _id: booking._id,
          status: booking.status,
          totalPrice: rentalTotal,
          maintenanceCost: maintenanceTotal,
          overdueCharge: overdueTotal,
          actualReturnDate: booking.actualReturnDate
        },
        car: car ? {
          _id: car._id,
          availability: car.availability
        } : null,
        invoice: {
          _id: invoice._id,
          isCompleted: invoice.isCompleted,
          paymentMethod: invoice.paymentMethod,
          invoiceUrl: newInvoiceUrl,
          paymentDate: paymentDate,
          actualReturnDate: invoice.actualReturnDate,
          balance: totalAmount
        },
        paymentHistory: {
          _id: paymentHistory._id,
          transactionId: paymentHistory.transactionId,
          amount: paymentHistory.amount,
          paymentMethod: paymentHistory.paymentMethod
        },
        amountBreakdown: {
          rentalTotal,
          maintenanceTotal,
          overdueTotal,
          totalAmount,
          maintenanceItems
        }
      }
    });

  } catch (error) {
    console.error("❌ Payment confirmation error:", error);
    
    let errorMessage = "Failed to confirm payment";
    if (error.name === 'ValidationError') {
      errorMessage = "Validation error: " + Object.values(error.errors).map(e => e.message).join(', ');
    } else if (error.code === 11000) {
      errorMessage = "Duplicate invoice found";
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ✅ GET SHOWROOM'S PAYMENT HISTORY ONLY
export const getShowroomPaymentHistory = async (req, res) => {
  try {
    const showroomId = req.user;
    
    if (!showroomId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Showroom not found"
      });
    }

    console.log('🔄 Fetching payment history for showroom:', showroomId);

    // ✅ METHOD 1: Direct payment history filtering by showroomId
    const payments = await PaymentHistory.find({ showroomId: showroomId })
      .populate("bookingId")
      .populate("carId", "carBrand carModel plateNumber")
      .populate("customerId", "ownerName email contactNumber")
      .sort({ paymentDate: -1 });

    console.log(`✅ Found ${payments.length} payment records for this showroom`);

    // ✅ METHOD 2: Alternative - Get payments via showroom's cars
    if (payments.length === 0) {
      console.log('🔄 Trying alternative method: getting payments via showroom cars...');
      
      const showroomCars = await Car.find({ userId: showroomId });
      const carIds = showroomCars.map(car => car._id);
      
      console.log(`🚗 Found ${showroomCars.length} cars for this showroom`);
      
      const carPayments = await PaymentHistory.find({ carId: { $in: carIds } })
        .populate("bookingId")
        .populate("carId", "carBrand carModel plateNumber")
        .populate("customerId", "ownerName email contactNumber")
        .sort({ paymentDate: -1 });
      
      console.log(`💰 Found ${carPayments.length} payments via showroom cars`);
      
      if (carPayments.length > 0) {
        return res.status(200).json({
          success: true,
          message: "Showroom payment history fetched successfully",
          count: carPayments.length,
          data: carPayments
        });
      }
    }

    if (!payments || payments.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No payment history found for this showroom",
        count: 0,
        data: []
      });
    }

    res.status(200).json({
      success: true,
      message: "Showroom payment history fetched successfully",
      count: payments.length,
      data: payments
    });

  } catch (error) {
    console.error("❌ Error fetching showroom payment history:", error);
    
    res.status(200).json({
      success: true,
      message: "No payment history available",
      count: 0,
      data: []
    });
  }
};

// ✅ GET PAYMENT HISTORY WITH DETAILS - SHOWROOM SPECIFIC
export const getShowroomPaymentHistoryWithDetails = async (req, res) => {
  try {
    const showroomId = req.user;
    
    if (!showroomId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Showroom not found"
      });
    }

    console.log('🔄 Fetching showroom payment history with details...');
    
    const payments = await PaymentHistory.aggregate([
      {
        $match: { showroomId: new mongoose.Types.ObjectId(showroomId) }
      },
      {
        $sort: { paymentDate: -1 }
      },
      {
        $lookup: {
          from: "bookings",
          localField: "bookingId",
          foreignField: "_id",
          as: "bookingDetails"
        }
      },
      {
        $lookup: {
          from: "cars",
          localField: "carId",
          foreignField: "_id",
          as: "carDetails"
        }
      },
      {
        $lookup: {
          from: "users_data",
          localField: "customerId",
          foreignField: "_id",
          as: "customerDetails"
        }
      },
      {
        $lookup: {
          from: "users_data",
          localField: "showroomId",
          foreignField: "_id",
          as: "showroomDetails"
        }
      },
      {
        $project: {
          _id: 1,
          transactionId: 1,
          amount: 1,
          paymentMethod: 1,
          paymentDate: 1,
          status: 1,
          bookingId: 1,
          "bookingDetails._id": 1,
          "bookingDetails.totalPrice": 1,
          "bookingDetails.maintenanceCost": 1,
          "bookingDetails.overdueCharge": 1,
          "bookingDetails.actualReturnDate": 1,
          "carDetails.carBrand": 1,
          "carDetails.carModel": 1,
          "carDetails.plateNumber": 1,
          "customerDetails.ownerName": 1,
          "customerDetails.email": 1,
          "customerDetails.contactNumber": 1,
          "showroomDetails.showroomName": 1
        }
      }
    ]);

    console.log(`✅ Found ${payments.length} payment records with details for this showroom`);

    const formattedPayments = payments.map(payment => ({
      _id: payment._id,
      transactionId: payment.transactionId,
      amount: payment.amount,
      paymentMethod: payment.paymentMethod,
      paymentDate: payment.paymentDate,
      status: payment.status,
      bookingId: payment.bookingId,
      bookingDetails: payment.bookingDetails[0] || null,
      carDetails: payment.carDetails[0] || null,
      customerDetails: payment.customerDetails[0] || null,
      showroomDetails: payment.showroomDetails[0] || null
    }));

    if (!formattedPayments || formattedPayments.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No payment history found for this showroom",
        count: 0,
        data: []
      });
    }

    res.status(200).json({
      success: true,
      message: "Showroom payment history with details fetched successfully",
      count: formattedPayments.length,
      data: formattedPayments
    });

  } catch (error) {
    console.error("❌ Error fetching showroom payment history with details:", error);
    return getShowroomPaymentHistory(req, res);
  }
};

// ✅ GET ALL RETURNED BOOKINGS WITH PAYMENT CONFIRMED (SHOWROOM SPECIFIC)
export const getShowroomReturnedBookings = async (req, res) => {
  try {
    const showroomId = req.user;
    
    if (!showroomId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Showroom not found"
      });
    }

    console.log('🔄 Fetching returned bookings for showroom:', showroomId);
    
    const showroomCars = await Car.find({ userId: showroomId });
    const carIds = showroomCars.map(car => car._id);
    
    const bookings = await Booking.find({ 
      status: "returned",
      carId: { $in: carIds }
    })
    .populate("userId", "ownerName email contactNumber")
    .populate("carId", "carBrand carModel plateNumber")
    .populate("showroomId", "showroomName")
    .sort({ actualReturnDate: -1 });

    console.log(`✅ Found ${bookings.length} returned bookings for this showroom`);

    if (!bookings || bookings.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No returned bookings found for this showroom",
        count: 0,
        data: []
      });
    }

    res.status(200).json({
      success: true,
      message: "Showroom returned bookings fetched successfully",
      count: bookings.length,
      data: bookings
    });

  } catch (error) {
    console.error("❌ Error fetching showroom returned bookings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch returned bookings",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ✅ GET ALL PAYMENT CONFIRMED INVOICES (SHOWROOM SPECIFIC)
export const getShowroomPaymentInvoices = async (req, res) => {
  try {
    const showroomId = req.user;
    
    if (!showroomId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Showroom not found"
      });
    }

    console.log('🔄 Fetching payment confirmed invoices for showroom:', showroomId);
    
    const showroomCars = await Car.find({ userId: showroomId });
    const carIds = showroomCars.map(car => car._id);
    
    const invoices = await Invoice.find({ 
      isCompleted: true,
      $or: [
        { showroomId: showroomId },
        { carId: { $in: carIds } }
      ]
    })
    .populate("userId", "ownerName email contactNumber")
    .populate("carId", "carBrand carModel plateNumber")
    .populate("showroomId", "showroomName")
    .populate("bookingId", "rentalStartDate rentalEndDate totalPrice maintenanceCost overdueCharge status actualReturnDate")
    .sort({ paymentDate: -1 });

    console.log(`✅ Found ${invoices.length} payment invoices for this showroom`);

    if (!invoices || invoices.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No payment confirmed invoices found for this showroom",
        count: 0,
        data: []
      });
    }

    res.status(200).json({
      success: true,
      message: "Showroom payment confirmed invoices fetched successfully",
      count: invoices.length,
      data: invoices
    });

  } catch (error) {
    console.error("❌ Error fetching showroom payment invoices:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch payment invoices",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export default {
  confirmPayment,
  getShowroomPaymentInvoices,
  getShowroomReturnedBookings,
  getShowroomPaymentHistory,
  getShowroomPaymentHistoryWithDetails
};