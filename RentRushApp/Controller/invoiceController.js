// // import fs from "fs";
// // import path from "path";
// // import { PDFDocument as PDFLibDocument, rgb } from "pdf-lib";
// // import { fileURLToPath } from "url";
// // import Car from "../Model/Car.js";
// // import User from "../Model/signup.js";
// // import moment from "moment";

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);
// // const invoicesDir = path.join(__dirname, "../invoices");

// // if (!fs.existsSync(invoicesDir)) {
// //   fs.mkdirSync(invoicesDir, { recursive: true });
// // }

// // export const generateInvoice = async (bookingDetails) => {
// //   try {
// //     const user = await User.findById(bookingDetails.userId);
// //     const showroom = await User.findById(bookingDetails.showroomId);
// //     const car = bookingDetails.carId
// //       ? await Car.findById(bookingDetails.carId)
// //       : null;

// //     const invoiceName = `invoice_${bookingDetails._id}_${Date.now()}.pdf`;
// //     const invoicePath = path.join(invoicesDir, invoiceName);

// //     const pdfDoc = await PDFLibDocument.create();
// //     const page = pdfDoc.addPage([600, 800]);
// //     const { height, width } = page.getSize();
// //     let y = height - 40;

// //     const drawText = (text, x, y, size = 12, color = rgb(0, 0, 0)) => {
// //       page.drawText(text, { x, y, size, color });
// //     };

// //     function drawMultilineText(text, x, y, maxWidth, size = 12, color = rgb(0, 0, 0)) {
// //       if (!text) return y;
// //       const lines = text.split("\n");
// //       let currentY = y;
// //       let lineHeight = size + 4;

// //       for (let line of lines) {
// //         let words = line.split(" ");
// //         let currentLine = "";

// //         for (let word of words) {
// //           let testLine = currentLine + word + " ";
// //           if (testLine.length * (size * 0.6) > maxWidth) {
// //             page.drawText(currentLine, { x, y: currentY, size, color });
// //             currentLine = word + " ";
// //             currentY -= lineHeight;
// //           } else {
// //             currentLine = testLine;
// //           }
// //         }

// //         if (currentLine) {
// //           page.drawText(currentLine, { x, y: currentY, size, color });
// //           currentY -= lineHeight;
// //         }
// //       }

// //       return currentY;
// //     }

// //     const shortInvoiceId = bookingDetails._id.toString().slice(0, 6);

// //     // Header
// //     page.drawRectangle({
// //       x: 0,
// //       y: height - 100,
// //       width: 600,
// //       height: 100,
// //       color: rgb(0.29, 0.56, 0.89),
// //     });

// //     drawText("RentRush Invoice", 50, y, 30, rgb(1, 1, 1));
// //     y -= 30;
// //     drawText(`Invoice Type: ${bookingDetails.invoiceType || "General"}`, 50, y, 14, rgb(1, 1, 1));
// //     drawText(`Invoice #: ${shortInvoiceId}`, 400, height - 40, 12);
// //     drawText(`Date: ${moment().format("MMM Do YYYY")}`, 400, height - 60, 12);

// //     // ✅✅✅ FIXED: RED PAID STAMP - REMOVED OPACITY
// //     if (bookingDetails.isPaid) {
// //       console.log('🎯 Adding RED PAID STAMP...');
      
// //       // ✅ SOLID RED BACKGROUND - NO OPACITY
// //       page.drawRectangle({
// //         x: width / 2 - 80,
// //         y: height / 2,
// //         width: 160,
// //         height: 60,
// //         color: rgb(1, 0, 0), // SOLID RED
// //         // ❌ REMOVED: opacity: 0.1 - YEH HATANA HAI
// //       });
      
// //       // ✅ WHITE TEXT - SOLID
// //       drawText("PAID", width / 2 - 30, height / 2 + 35, 24, rgb(1, 1, 1));
      
// //       console.log('✅ RED PAID STAMP added at center');
// //     }

// //     // Parties Section
// //     y -= 60;
    
// //     drawText("Billed To:", 50, y, 14);
// //     const customerInfo = [
// //       user?.ownerName || "N/A",
// //       user?.email || "N/A",
// //       user?.contactNumber || "N/A",
// //       "Address:",
// //       user?.cnic || user?.address || "No address provided"
// //     ].join("\n");
    
// //     drawText("From:", 350, y, 14);
// //     const showroomInfo = [
// //       showroom?.showroomName || "N/A",
// //       showroom?.email || "N/A",
// //       showroom?.contactNumber || "N/A",
// //       "Address:",
// //       showroom?.address || "No address provided"
// //     ].join("\n");
    
// //     const customerEndY = drawMultilineText(customerInfo, 50, y - 20, 200, 12);
// //     const showroomEndY = drawMultilineText(showroomInfo, 350, y - 20, 200, 12);
    
// //     y = Math.min(customerEndY, showroomEndY) - 20;

// //     // Table Headers
// //     page.drawLine({ start: { x: 50, y }, end: { x: 550, y }, thickness: 1 });
// //     y -= 20;
// //     drawText("Description", 50, y, 12);
// //     drawText("Start Date", 180, y, 12);
// //     drawText("End Date", 300, y, 12);
// //     drawText("Daily Rent", 410, y, 12);
// //     drawText("Amount", 480, y, 12);
// //     y -= 10;
// //     page.drawLine({ start: { x: 50, y }, end: { x: 550, y }, thickness: 1 });

// //     y -= 20;

// //     let maintenanceTotal = 0;
// //     let rentalTotal = bookingDetails.totalPrice || 0;
// //     let overdueTotal = bookingDetails.overdueCharge || 0;

// //     // Car Rental Details
// //     if (car) {
// //       drawText(`${car.carBrand} ${car.carModel} (${car.color})`, 50, y, 12);
// //       drawText(moment(bookingDetails.rentalStartDate).format("YYYY-MM-DD"), 180, y, 12);
// //       drawText(moment(bookingDetails.rentalEndDate).format("YYYY-MM-DD"), 300, y, 12);
// //       drawText(`${car.rentRate.toFixed(0)} Rs`, 410, y, 12);
// //       drawText(`${rentalTotal.toFixed(0)} Rs`, 480, y, 12);
// //       y -= 30;
// //     }

// //     // Maintenance Costs
// //     if (bookingDetails.maintenanceCost && typeof bookingDetails.maintenanceCost === "object") {
// //       for (const [item, cost] of Object.entries(bookingDetails.maintenanceCost)) {
// //         const costNumber = parseFloat(cost);
// //         if (!isNaN(costNumber)) {
// //           drawText(`Maintenance - ${item}`, 50, y, 12);
// //           drawText("-", 180, y, 12);
// //           drawText("-", 300, y, 12);
// //           drawText("-", 410, y, 12);
// //           drawText(`${costNumber.toFixed(0)} Rs`, 480, y, 12);
// //           maintenanceTotal += costNumber;
// //           y -= 30;
// //         }
// //       }
// //     }

// //     // Overdue Charges
// //     if ((parseFloat(bookingDetails.overdueHours) || 0) > 0) {
// //       drawText(`Overdue Charges (${bookingDetails.overdueHours} hours)`, 50, y, 12);
// //       drawText("-", 180, y, 12);
// //       drawText("-", 300, y, 12);
// //       drawText("-", 410, y, 12);
// //       drawText(`${(bookingDetails.overdueCharge || 0).toFixed(0)} Rs`, 480, y, 12);
// //       y -= 30;
// //     }

// //     // Total
// //     const totalAmount = rentalTotal + maintenanceTotal + overdueTotal;
// //     page.drawLine({ start: { x: 50, y }, end: { x: 550, y }, thickness: 1 });
// //     y -= 20;
// //     drawText("Total", 410, y, 12);
// //     drawText(`${totalAmount.toFixed(0)} Rs`, 480, y, 12);

// //     // ✅ FIXED: Payment Status Section WITHOUT CHECKMARK SYMBOL
// //     if (bookingDetails.isPaid) {
// //       y -= 40;
// //       page.drawLine({ start: { x: 50, y }, end: { x: 550, y }, thickness: 0.5 });
// //       y -= 20;
      
// //       drawText("Payment Status:", 50, y, 14, rgb(0, 0.5, 0));
// //       y -= 20;
      
// //       // ✅ USE TEXT INSTEAD OF CHECKMARK SYMBOL
// //       drawText(`Payment Received - ${bookingDetails.paymentMethod || "N/A"}`, 50, y, 12, rgb(0, 0.5, 0));
// //       y -= 15;
      
// //       if (bookingDetails.paymentDate) {
// //         drawText(`Payment Date: ${moment(bookingDetails.paymentDate).format("MMMM Do YYYY, h:mm A")}`, 50, y, 10, rgb(0, 0.5, 0));
// //         y -= 15;
// //       }
      
// //       // ✅ ADD PAYMENT CONFIRMED MESSAGE
// //       drawText("Status: CONFIRMED", 50, y, 12, rgb(0, 0.5, 0));
// //     }

// //     // Footer
// //     y -= 60;
// //     page.drawLine({ start: { x: 50, y }, end: { x: 550, y }, thickness: 0.5 });
// //     y -= 20;
    
// //     const footerText = [
// //       "Thank you for choosing RentRush!",
// //       "RentRush Car Rentals",
// //       "123 Business Avenue, City, State 12345",
// //       "Email: support@rentrush.com | Phone: +1 (555) 123-4567",
// //       "www.rentrush.com"
// //     ].join("\n");
    
// //     drawMultilineText(footerText, 50, y, 500, 9, rgb(0.5, 0.5, 0.5));

// //     const pdfBytes = await pdfDoc.save();
// //     fs.writeFileSync(invoicePath, pdfBytes);
// //     console.log("✅ Invoice created successfully at:", invoicePath);

// //     return { invoicePath, invoiceName };
// //   } catch (error) {
// //     console.error("❌ Error generating invoice:", error);
// //     throw new Error(`Failed to generate invoice: ${error.message}`);
// //   }
// // };



// // // export const getShowroomInvoices = async (req, res) => {
// // //   try {
// // //     const userId = req.user; // Assuming this is the showroom ID
    
// // //     if (!userId) {
// // //       return res.status(401).json({
// // //         success: false,
// // //         message: "Unauthorized - User not found"
// // //       });
// // //     }

// // //     console.log('🔄 Fetching ALL invoices for showroom:', userId);

// // //     // ✅ FIX: Find ALL invoices for this showroom, not just recent ones
// // //     const invoices = await Invoice.find({ showroomId: userId })
// // //       .populate('userId', 'ownerName email contactNumber')
// // //       .populate('carId', 'carBrand carModel plateNumber')
// // //       .populate('bookingId', 'rentalStartDate rentalEndDate')
// // //       .sort({ createdAt: -1 }); // Sort by latest first

// // //     console.log(`✅ Found ${invoices.length} invoices for showroom`);

// // //     if (!invoices || invoices.length === 0) {
// // //       return res.status(200).json({
// // //         success: true,
// // //         message: "No invoices found for this showroom",
// // //         data: []
// // //       });
// // //     }

// // //     // Format the response data
// // //     const formattedInvoices = invoices.map(invoice => ({
// // //       _id: invoice._id,
// // //       bookingId: invoice.bookingId?._id || invoice.bookingId,
// // //       invoiceUrl: invoice.invoiceUrl,
// // //       balance: invoice.balance,
// // //       isCompleted: invoice.isCompleted,
// // //       paymentMethod: invoice.paymentMethod,
// // //       paymentDate: invoice.paymentDate,
// // //       carName: invoice.carName || 
// // //                (invoice.carId ? `${invoice.carId.carBrand} ${invoice.carId.carModel}` : 'N/A'),
// // //       user: {
// // //         ownerName: invoice.userId?.ownerName || 'N/A',
// // //         email: invoice.userId?.email || 'N/A',
// // //         contactNumber: invoice.userId?.contactNumber || 'N/A'
// // //       },
// // //       carDetails: invoice.carId ? {
// // //         carBrand: invoice.carId.carBrand,
// // //         carModel: invoice.carId.carModel,
// // //         plateNumber: invoice.carId.plateNumber
// // //       } : null,
// // //       bookingDetails: invoice.bookingId ? {
// // //         rentalStartDate: invoice.bookingId.rentalStartDate,
// // //         rentalEndDate: invoice.bookingId.rentalEndDate
// // //       } : null,
// // //       createdAt: invoice.createdAt,
// // //       updatedAt: invoice.updatedAt
// // //     }));

// // //     res.status(200).json({
// // //       success: true,
// // //       message: "All invoices fetched successfully",
// // //       count: formattedInvoices.length,
// // //       data: formattedInvoices
// // //     });

// // //   } catch (error) {
// // //     console.error("❌ Error fetching showroom invoices:", error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Failed to fetch invoices",
// // //       error: error.message
// // //     });
// // //   }
// // // };

// // export const getShowroomInvoices = async (req, res) => {
// //   try {
// //     const userId = req.user; // Assuming this is the showroom ID
    
// //     if (!userId) {
// //       return res.status(401).json({
// //         success: false,
// //         message: "Unauthorized - User not found"
// //       });
// //     }

// //     console.log('🔄 Fetching ALL invoices for showroom:', userId);

// //     // ✅ FIX: Find ALL invoices without any date filters or limits
// //     const invoices = await Invoice.find({ showroomId: userId })
// //       .populate('userId', 'ownerName email contactNumber')
// //       .populate('carId', 'carBrand carModel plateNumber rentRate')
// //       .populate('bookingId', 'rentalStartDate rentalEndDate totalPrice overdueCharge maintenanceCost')
// //       .sort({ createdAt: -1 }); // Sort by latest first, but get ALL records

// //     console.log(`✅ Found ${invoices.length} total invoices for showroom`);

// //     // ✅ ADDITIONAL: Also get invoices from bookings associated with showroom's cars
// //     const showroomCars = await Car.find({ userId: userId });
// //     const carIds = showroomCars.map(car => car._id);
    
// //     // Find bookings that belong to showroom's cars
// //     const showroomBookings = await Booking.find({ carId: { $in: carIds } });
// //     const bookingIds = showroomBookings.map(booking => booking._id);
    
// //     // Find invoices for these bookings
// //     const bookingInvoices = await Invoice.find({ bookingId: { $in: bookingIds } })
// //       .populate('userId', 'ownerName email contactNumber')
// //       .populate('carId', 'carBrand carModel plateNumber rentRate')
// //       .populate('bookingId', 'rentalStartDate rentalEndDate totalPrice overdueCharge maintenanceCost');

// //     // Combine both sets of invoices and remove duplicates
// //     const allInvoices = [...invoices, ...bookingInvoices];
// //     const uniqueInvoices = allInvoices.filter((invoice, index, self) => 
// //       index === self.findIndex(i => i._id.toString() === invoice._id.toString())
// //     );

// //     // Sort by creation date (newest first)
// //     uniqueInvoices.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

// //     console.log(`📊 Final count: ${uniqueInvoices.length} invoices (${invoices.length} direct + ${bookingInvoices.length} from bookings)`);

// //     if (uniqueInvoices.length === 0) {
// //       return res.status(200).json({
// //         success: true,
// //         message: "No invoices found for this showroom",
// //         data: []
// //       });
// //     }

// //     // Format the response data with enhanced information
// //     const formattedInvoices = uniqueInvoices.map(invoice => {
// //       const totalAmount = invoice.balance || 0;
// //       const isPaid = invoice.isCompleted || (invoice.paymentMethod && invoice.paymentDate);
      
// //       return {
// //         _id: invoice._id,
// //         bookingId: invoice.bookingId?._id || invoice.bookingId,
// //         invoiceUrl: invoice.invoiceUrl,
// //         balance: totalAmount,
// //         isCompleted: isPaid,
// //         paymentMethod: invoice.paymentMethod,
// //         paymentDate: invoice.paymentDate,
// //         carName: invoice.carName || 
// //                 (invoice.carId ? `${invoice.carId.carBrand} ${invoice.carId.carModel}` : 'N/A'),
// //         user: {
// //           ownerName: invoice.userId?.ownerName || 'N/A',
// //           email: invoice.userId?.email || 'N/A',
// //           contactNumber: invoice.userId?.contactNumber || 'N/A'
// //         },
// //         carDetails: invoice.carId ? {
// //           carBrand: invoice.carId.carBrand,
// //           carModel: invoice.carId.carModel,
// //           plateNumber: invoice.carId.plateNumber,
// //           rentRate: invoice.carId.rentRate
// //         } : null,
// //         bookingDetails: invoice.bookingId ? {
// //           rentalStartDate: invoice.bookingId.rentalStartDate,
// //           rentalEndDate: invoice.bookingId.rentalEndDate,
// //           totalPrice: invoice.bookingId.totalPrice,
// //           overdueCharge: invoice.bookingId.overdueCharge,
// //           maintenanceCost: invoice.bookingId.maintenanceCost
// //         } : null,
// //         status: isPaid ? 'paid' : 'unpaid',
// //         createdAt: invoice.createdAt,
// //         updatedAt: invoice.updatedAt,
// //         source: invoices.some(inv => inv._id.toString() === invoice._id.toString()) ? 'direct' : 'booking'
// //       };
// //     });

// //     res.status(200).json({
// //       success: true,
// //       message: "All invoices fetched successfully",
// //       count: formattedInvoices.length,
// //       data: formattedInvoices
// //     });

// //   } catch (error) {
// //     console.error("❌ Error fetching showroom invoices:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch invoices",
// //       error: error.message
// //     });
// //   }
// // };


// import fs from "fs";
// import path from "path";
// import { PDFDocument as PDFLibDocument, rgb } from "pdf-lib";
// import { fileURLToPath } from "url";
// import Car from "../Model/Car.js";
// import User from "../Model/signup.js";
// import Invoice from "../Model/invoiceModel.js"; // ✅ ADD THIS IMPORT
// import Booking from "../Model/bookingModel.js"; // ✅ ADD THIS IMPORT
// import moment from "moment";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const invoicesDir = path.join(__dirname, "../invoices");

// if (!fs.existsSync(invoicesDir)) {
//   fs.mkdirSync(invoicesDir, { recursive: true });
// }

// export const generateInvoice = async (bookingDetails) => {
//   try {
//     const user = await User.findById(bookingDetails.userId);
//     const showroom = await User.findById(bookingDetails.showroomId);
//     const car = bookingDetails.carId
//       ? await Car.findById(bookingDetails.carId)
//       : null;

//     const invoiceName = `invoice_${bookingDetails._id}_${Date.now()}.pdf`;
//     const invoicePath = path.join(invoicesDir, invoiceName);

//     const pdfDoc = await PDFLibDocument.create();
//     const page = pdfDoc.addPage([600, 800]);
//     const { height, width } = page.getSize();
//     let y = height - 40;

//     const drawText = (text, x, y, size = 12, color = rgb(0, 0, 0)) => {
//       page.drawText(text, { x, y, size, color });
//     };

//     function drawMultilineText(text, x, y, maxWidth, size = 12, color = rgb(0, 0, 0)) {
//       if (!text) return y;
//       const lines = text.split("\n");
//       let currentY = y;
//       let lineHeight = size + 4;

//       for (let line of lines) {
//         let words = line.split(" ");
//         let currentLine = "";

//         for (let word of words) {
//           let testLine = currentLine + word + " ";
//           if (testLine.length * (size * 0.6) > maxWidth) {
//             page.drawText(currentLine, { x, y: currentY, size, color });
//             currentLine = word + " ";
//             currentY -= lineHeight;
//           } else {
//             currentLine = testLine;
//           }
//         }

//         if (currentLine) {
//           page.drawText(currentLine, { x, y: currentY, size, color });
//           currentY -= lineHeight;
//         }
//       }

//       return currentY;
//     }

//     const shortInvoiceId = bookingDetails._id.toString().slice(0, 6);

//     // Header
//     page.drawRectangle({
//       x: 0,
//       y: height - 100,
//       width: 600,
//       height: 100,
//       color: rgb(0.29, 0.56, 0.89),
//     });

//     drawText("RentRush Invoice", 50, y, 30, rgb(1, 1, 1));
//     y -= 30;
//     drawText(`Invoice Type: ${bookingDetails.invoiceType || "General"}`, 50, y, 14, rgb(1, 1, 1));
//     drawText(`Invoice #: ${shortInvoiceId}`, 400, height - 40, 12);
//     drawText(`Date: ${moment().format("MMM Do YYYY")}`, 400, height - 60, 12);

//     // ✅ RED PAID STAMP
//     if (bookingDetails.isPaid) {
//       console.log('🎯 Adding RED PAID STAMP...');
      
//       page.drawRectangle({
//         x: width / 2 - 80,
//         y: height / 2,
//         width: 160,
//         height: 60,
//         color: rgb(1, 0, 0),
//       });
      
//       drawText("PAID", width / 2 - 30, height / 2 + 35, 24, rgb(1, 1, 1));
//       console.log('✅ RED PAID STAMP added at center');
//     }

//     // Parties Section
//     y -= 60;
    
//     drawText("Billed To:", 50, y, 14);
//     const customerInfo = [
//       user?.ownerName || "N/A",
//       user?.email || "N/A",
//       user?.contactNumber || "N/A",
//       "Address:",
//       user?.cnic || user?.address || "No address provided"
//     ].join("\n");
    
//     drawText("From:", 350, y, 14);
//     const showroomInfo = [
//       showroom?.showroomName || "N/A",
//       showroom?.email || "N/A",
//       showroom?.contactNumber || "N/A",
//       "Address:",
//       showroom?.address || "No address provided"
//     ].join("\n");
    
//     const customerEndY = drawMultilineText(customerInfo, 50, y - 20, 200, 12);
//     const showroomEndY = drawMultilineText(showroomInfo, 350, y - 20, 200, 12);
    
//     y = Math.min(customerEndY, showroomEndY) - 20;

//     // Table Headers
//     page.drawLine({ start: { x: 50, y }, end: { x: 550, y }, thickness: 1 });
//     y -= 20;
//     drawText("Description", 50, y, 12);
//     drawText("Start Date", 180, y, 12);
//     drawText("End Date", 300, y, 12);
//     drawText("Daily Rent", 410, y, 12);
//     drawText("Amount", 480, y, 12);
//     y -= 10;
//     page.drawLine({ start: { x: 50, y }, end: { x: 550, y }, thickness: 1 });

//     y -= 20;

//     let maintenanceTotal = 0;
//     let rentalTotal = bookingDetails.totalPrice || 0;
//     let overdueTotal = bookingDetails.overdueCharge || 0;

//     // Car Rental Details
//     if (car) {
//       drawText(`${car.carBrand} ${car.carModel} (${car.color})`, 50, y, 12);
//       drawText(moment(bookingDetails.rentalStartDate).format("YYYY-MM-DD"), 180, y, 12);
//       drawText(moment(bookingDetails.rentalEndDate).format("YYYY-MM-DD"), 300, y, 12);
//       drawText(`${car.rentRate.toFixed(0)} Rs`, 410, y, 12);
//       drawText(`${rentalTotal.toFixed(0)} Rs`, 480, y, 12);
//       y -= 30;
//     }

//     // Maintenance Costs
//     if (bookingDetails.maintenanceCost && typeof bookingDetails.maintenanceCost === "object") {
//       for (const [item, cost] of Object.entries(bookingDetails.maintenanceCost)) {
//         const costNumber = parseFloat(cost);
//         if (!isNaN(costNumber)) {
//           drawText(`Maintenance - ${item}`, 50, y, 12);
//           drawText("-", 180, y, 12);
//           drawText("-", 300, y, 12);
//           drawText("-", 410, y, 12);
//           drawText(`${costNumber.toFixed(0)} Rs`, 480, y, 12);
//           maintenanceTotal += costNumber;
//           y -= 30;
//         }
//       }
//     }

//     // Overdue Charges
//     if ((parseFloat(bookingDetails.overdueHours) || 0) > 0) {
//       drawText(`Overdue Charges (${bookingDetails.overdueHours} hours)`, 50, y, 12);
//       drawText("-", 180, y, 12);
//       drawText("-", 300, y, 12);
//       drawText("-", 410, y, 12);
//       drawText(`${(bookingDetails.overdueCharge || 0).toFixed(0)} Rs`, 480, y, 12);
//       y -= 30;
//     }

//     // Total
//     const totalAmount = rentalTotal + maintenanceTotal + overdueTotal;
//     page.drawLine({ start: { x: 50, y }, end: { x: 550, y }, thickness: 1 });
//     y -= 20;
//     drawText("Total", 410, y, 12);
//     drawText(`${totalAmount.toFixed(0)} Rs`, 480, y, 12);

//     // Payment Status Section
//     if (bookingDetails.isPaid) {
//       y -= 40;
//       page.drawLine({ start: { x: 50, y }, end: { x: 550, y }, thickness: 0.5 });
//       y -= 20;
      
//       drawText("Payment Status:", 50, y, 14, rgb(0, 0.5, 0));
//       y -= 20;
      
//       drawText(`Payment Received - ${bookingDetails.paymentMethod || "N/A"}`, 50, y, 12, rgb(0, 0.5, 0));
//       y -= 15;
      
//       if (bookingDetails.paymentDate) {
//         drawText(`Payment Date: ${moment(bookingDetails.paymentDate).format("MMMM Do YYYY, h:mm A")}`, 50, y, 10, rgb(0, 0.5, 0));
//         y -= 15;
//       }
      
//       drawText("Status: CONFIRMED", 50, y, 12, rgb(0, 0.5, 0));
//     }

//     // Footer
//     y -= 60;
//     page.drawLine({ start: { x: 50, y }, end: { x: 550, y }, thickness: 0.5 });
//     y -= 20;
    
//     const footerText = [
//       "Thank you for choosing RentRush!",
//       "RentRush Car Rentals",
//       "123 Business Avenue, City, State 12345",
//       "Email: support@rentrush.com | Phone: +1 (555) 123-4567",
//       "www.rentrush.com"
//     ].join("\n");
    
//     drawMultilineText(footerText, 50, y, 500, 9, rgb(0.5, 0.5, 0.5));

//     const pdfBytes = await pdfDoc.save();
//     fs.writeFileSync(invoicePath, pdfBytes);
//     console.log("✅ Invoice created successfully at:", invoicePath);

//     return { invoicePath, invoiceName };
//   } catch (error) {
//     console.error("❌ Error generating invoice:", error);
//     throw new Error(`Failed to generate invoice: ${error.message}`);
//   }
// };

// // ✅✅✅ UPDATED: Get ALL Invoices (Not Just Recent Ones)
// export const getShowroomInvoices = async (req, res) => {
//   try {
//     const userId = req.user; // Showroom ID
    
//     if (!userId) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized - User not found"
//       });
//     }

//     console.log('🔄 Fetching ALL invoices for showroom:', userId);

//     // ✅ GET ALL INVOICES - NO DATE FILTERS, NO LIMITS
//     const allInvoices = await Invoice.find({})
//       .populate('userId', 'ownerName email contactNumber address cnic')
//       .populate('carId', 'carBrand carModel plateNumber rentRate color')
//       .populate('bookingId', 'rentalStartDate rentalEndDate totalPrice overdueCharge maintenanceCost paymentStatus')
//       .populate('showroomId', 'showroomName email contactNumber address')
//       .sort({ createdAt: -1 }); // Sort by newest first, but get ALL

//     console.log(`📊 Total invoices in database: ${allInvoices.length}`);

//     // Filter invoices that belong to this showroom
//     const showroomInvoices = allInvoices.filter(invoice => {
//       // Check if invoice belongs to this showroom directly
//       const isDirectInvoice = invoice.showroomId?._id?.toString() === userId.toString();
      
//       // Check if invoice belongs to showroom's cars
//       const isShowroomCar = invoice.carId?.userId?.toString() === userId.toString();
      
//       return isDirectInvoice || isShowroomCar;
//     });

//     console.log(`✅ Found ${showroomInvoices.length} invoices for this showroom`);

//     if (showroomInvoices.length === 0) {
//       return res.status(200).json({
//         success: true,
//         message: "No invoices found for this showroom",
//         data: []
//       });
//     }

//     // Format response with complete invoice data
//     const formattedInvoices = showroomInvoices.map(invoice => {
//       const totalAmount = invoice.balance || invoice.totalAmount || 0;
//       const isPaid = invoice.isCompleted || 
//                     (invoice.paymentMethod && invoice.paymentDate) ||
//                     invoice.bookingId?.paymentStatus === 'confirmed';

//       return {
//         _id: invoice._id,
//         bookingId: invoice.bookingId?._id || invoice.bookingId,
//         invoiceUrl: invoice.invoiceUrl,
//         balance: totalAmount,
//         isCompleted: isPaid,
//         paymentMethod: invoice.paymentMethod,
//         paymentDate: invoice.paymentDate,
//         carName: invoice.carName || 
//                 (invoice.carId ? `${invoice.carId.carBrand} ${invoice.carId.carModel}` : 'N/A'),
//         user: {
//           ownerName: invoice.userId?.ownerName || 'N/A',
//           email: invoice.userId?.email || 'N/A',
//           contactNumber: invoice.userId?.contactNumber || 'N/A',
//           address: invoice.userId?.address || 'N/A'
//         },
//         carDetails: invoice.carId ? {
//           carBrand: invoice.carId.carBrand,
//           carModel: invoice.carId.carModel,
//           plateNumber: invoice.carId.plateNumber,
//           rentRate: invoice.carId.rentRate,
//           color: invoice.carId.color
//         } : null,
//         bookingDetails: invoice.bookingId ? {
//           rentalStartDate: invoice.bookingId.rentalStartDate,
//           rentalEndDate: invoice.bookingId.rentalEndDate,
//           totalPrice: invoice.bookingId.totalPrice,
//           overdueCharge: invoice.bookingId.overdueCharge,
//           maintenanceCost: invoice.bookingId.maintenanceCost,
//           paymentStatus: invoice.bookingId.paymentStatus
//         } : null,
//         showroomDetails: invoice.showroomId ? {
//           showroomName: invoice.showroomId.showroomName,
//           email: invoice.showroomId.email,
//           contactNumber: invoice.showroomId.contactNumber,
//           address: invoice.showroomId.address
//         } : null,
//         status: isPaid ? 'paid' : 'unpaid',
//         createdAt: invoice.createdAt,
//         updatedAt: invoice.updatedAt,
//         invoiceType: invoice.invoiceType || 'booking'
//       };
//     });

//     res.status(200).json({
//       success: true,
//       message: `All ${formattedInvoices.length} invoices fetched successfully`,
//       count: formattedInvoices.length,
//       data: formattedInvoices
//     });

//   } catch (error) {
//     console.error("❌ Error fetching showroom invoices:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch invoices",
//       error: error.message
//     });
//   }
// };

// // ✅ ADDITIONAL: Download Paid Invoice with Stamp
// export const downloadPaidInvoice = async (req, res) => {
//   try {
//     const { invoiceId } = req.params;
    
//     const invoice = await Invoice.findById(invoiceId)
//       .populate('userId')
//       .populate('carId')
//       .populate('bookingId')
//       .populate('showroomId');

//     if (!invoice) {
//       return res.status(404).json({
//         success: false,
//         message: "Invoice not found"
//       });
//     }

//     // Mark as paid for PDF generation to get the red stamp
//     const paidInvoiceDetails = {
//       ...invoice.toObject(),
//       isPaid: true
//     };

//     // Generate PDF with paid stamp
//     const { invoicePath } = await generateInvoice(paidInvoiceDetails);

//     // Send the file
//     res.download(invoicePath, `invoice_paid_${invoice.bookingId}.pdf`, (err) => {
//       if (err) {
//         console.error('Download error:', err);
//         res.status(500).json({
//           success: false,
//           message: "Failed to download invoice"
//         });
//       }
//     });

//   } catch (error) {
//     console.error('❌ Error downloading paid invoice:', error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to download paid invoice",
//       error: error.message
//     });
//   }
// };

// // ✅✅✅ UPDATED: Get ALL Customer Invoices (Not Just Recent Ones)
// export const getCustomerInvoices = async (req, res) => {
//   try {
//     const userId = req.user; // Customer ID
    
//     if (!userId) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized - User not found"
//       });
//     }

//     console.log('🔄 Fetching ALL invoices for customer:', userId);

//     // ✅ GET ALL INVOICES - NO DATE FILTERS, NO LIMITS
//     const allInvoices = await Invoice.find({})
//       .populate('userId', 'ownerName email contactNumber address cnic')
//       .populate('carId', 'carBrand carModel plateNumber rentRate color')
//       .populate('bookingId', 'rentalStartDate rentalEndDate totalPrice overdueCharge maintenanceCost paymentStatus')
//       .populate('showroomId', 'showroomName email contactNumber address')
//       .sort({ createdAt: -1 }); // Sort by newest first, but get ALL

//     console.log(`📊 Total invoices in database: ${allInvoices.length}`);

//     // Filter invoices that belong to this customer
//     const customerInvoices = allInvoices.filter(invoice => {
//       return invoice.userId?._id?.toString() === userId.toString();
//     });

//     console.log(`✅ Found ${customerInvoices.length} invoices for this customer`);

//     if (customerInvoices.length === 0) {
//       return res.status(200).json({
//         success: true,
//         message: "No invoices found for this customer",
//         data: []
//       });
//     }

//     // Format response with complete invoice data
//     const formattedInvoices = customerInvoices.map(invoice => {
//       const totalAmount = invoice.balance || invoice.totalAmount || 0;
//       const isPaid = invoice.isCompleted || 
//                     (invoice.paymentMethod && invoice.paymentDate) ||
//                     invoice.bookingId?.paymentStatus === 'confirmed';

//       return {
//         _id: invoice._id,
//         bookingId: invoice.bookingId?._id || invoice.bookingId,
//         invoiceUrl: invoice.invoiceUrl,
//         balance: totalAmount,
//         isCompleted: isPaid,
//         paymentMethod: invoice.paymentMethod,
//         paymentDate: invoice.paymentDate,
//         carName: invoice.carName || 
//                 (invoice.carId ? `${invoice.carId.carBrand} ${invoice.carId.carModel}` : 'N/A'),
//         user: {
//           ownerName: invoice.userId?.ownerName || 'N/A',
//           email: invoice.userId?.email || 'N/A',
//           contactNumber: invoice.userId?.contactNumber || 'N/A',
//           address: invoice.userId?.address || 'N/A'
//         },
//         carDetails: invoice.carId ? {
//           carBrand: invoice.carId.carBrand,
//           carModel: invoice.carId.carModel,
//           plateNumber: invoice.carId.plateNumber,
//           rentRate: invoice.carId.rentRate,
//           color: invoice.carId.color
//         } : null,
//         bookingDetails: invoice.bookingId ? {
//           rentalStartDate: invoice.bookingId.rentalStartDate,
//           rentalEndDate: invoice.bookingId.rentalEndDate,
//           totalPrice: invoice.bookingId.totalPrice,
//           overdueCharge: invoice.bookingId.overdueCharge,
//           maintenanceCost: invoice.bookingId.maintenanceCost,
//           paymentStatus: invoice.bookingId.paymentStatus
//         } : null,
//         showroomDetails: invoice.showroomId ? {
//           showroomName: invoice.showroomId.showroomName,
//           email: invoice.showroomId.email,
//           contactNumber: invoice.showroomId.contactNumber,
//           address: invoice.showroomId.address
//         } : null,
//         status: isPaid ? 'paid' : 'unpaid',
//         createdAt: invoice.createdAt,
//         updatedAt: invoice.updatedAt,
//         invoiceType: invoice.invoiceType || 'booking'
//       };
//     });

//     res.status(200).json({
//       success: true,
//       message: `All ${formattedInvoices.length} customer invoices fetched successfully`,
//       count: formattedInvoices.length,
//       data: formattedInvoices
//     });

//   } catch (error) {
//     console.error("❌ Error fetching customer invoices:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch invoices",
//       error: error.message
//     });
//   }
// };

import fs from "fs";
import path from "path";
import { PDFDocument as PDFLibDocument, rgb } from "pdf-lib";
import { fileURLToPath } from "url";
import Car from "../Model/Car.js";
import User from "../Model/signup.js";
import Invoice from "../Model/invoiceModel.js";
import Booking from "../Model/bookingModel.js";
import moment from "moment";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const invoicesDir = path.join(__dirname, "../invoices");

if (!fs.existsSync(invoicesDir)) {
  fs.mkdirSync(invoicesDir, { recursive: true });
}

export const generateInvoice = async (bookingDetails) => {
  try {
    const user = await User.findById(bookingDetails.userId);
    const showroom = await User.findById(bookingDetails.showroomId);
    const car = bookingDetails.carId
      ? await Car.findById(bookingDetails.carId)
      : null;

    const invoiceName = `invoice_${bookingDetails._id}_${Date.now()}.pdf`;
    const invoicePath = path.join(invoicesDir, invoiceName);

    const pdfDoc = await PDFLibDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { height, width } = page.getSize();
    let y = height - 40;

    const drawText = (text, x, y, size = 12, color = rgb(0, 0, 0)) => {
      page.drawText(text, { x, y, size, color });
    };

    function drawMultilineText(text, x, y, maxWidth, size = 12, color = rgb(0, 0, 0)) {
      if (!text) return y;
      const lines = text.split("\n");
      let currentY = y;
      let lineHeight = size + 4;

      for (let line of lines) {
        let words = line.split(" ");
        let currentLine = "";

        for (let word of words) {
          let testLine = currentLine + word + " ";
          if (testLine.length * (size * 0.6) > maxWidth) {
            page.drawText(currentLine, { x, y: currentY, size, color });
            currentLine = word + " ";
            currentY -= lineHeight;
          } else {
            currentLine = testLine;
          }
        }

        if (currentLine) {
          page.drawText(currentLine, { x, y: currentY, size, color });
          currentY -= lineHeight;
        }
      }

      return currentY;
    }

    const shortInvoiceId = bookingDetails._id.toString().slice(0, 6);

    // Header
    page.drawRectangle({
      x: 0,
      y: height - 100,
      width: 600,
      height: 100,
      color: rgb(0.29, 0.56, 0.89),
    });

    drawText("RentRush Invoice", 50, y, 30, rgb(1, 1, 1));
    y -= 30;
    drawText(`Invoice Type: ${bookingDetails.invoiceType || "General"}`, 50, y, 14, rgb(1, 1, 1));
    drawText(`Invoice #: ${shortInvoiceId}`, 400, height - 40, 12);
    drawText(`Date: ${moment().format("MMM Do YYYY")}`, 400, height - 60, 12);

    // ✅ RED PAID STAMP
    if (bookingDetails.isPaid) {
      console.log('🎯 Adding RED PAID STAMP...');
      
      page.drawRectangle({
        x: width / 2 - 80,
        y: height / 2,
        width: 160,
        height: 60,
        color: rgb(1, 0, 0),
      });
      
      drawText("PAID", width / 2 - 30, height / 2 + 35, 24, rgb(1, 1, 1));
      console.log('✅ RED PAID STAMP added at center');
    }

    // Parties Section
    y -= 60;
    
    drawText("Billed To:", 50, y, 14);
    const customerInfo = [
      user?.ownerName || "N/A",
      user?.email || "N/A",
      user?.contactNumber || "N/A",
      "Address:",
      user?.cnic || user?.address || "No address provided"
    ].join("\n");
    
    drawText("From:", 350, y, 14);
    const showroomInfo = [
      showroom?.showroomName || "N/A",
      showroom?.email || "N/A",
      showroom?.contactNumber || "N/A",
      "Address:",
      showroom?.address || "No address provided"
    ].join("\n");
    
    const customerEndY = drawMultilineText(customerInfo, 50, y - 20, 200, 12);
    const showroomEndY = drawMultilineText(showroomInfo, 350, y - 20, 200, 12);
    
    y = Math.min(customerEndY, showroomEndY) - 20;

    // Table Headers
    page.drawLine({ start: { x: 50, y }, end: { x: 550, y }, thickness: 1 });
    y -= 20;
    drawText("Description", 50, y, 12);
    drawText("Start Date", 180, y, 12);
    drawText("End Date", 300, y, 12);
    drawText("Daily Rent", 410, y, 12);
    drawText("Amount", 480, y, 12);
    y -= 10;
    page.drawLine({ start: { x: 50, y }, end: { x: 550, y }, thickness: 1 });

    y -= 20;

    let maintenanceTotal = 0;
    let rentalTotal = bookingDetails.totalPrice || 0;
    let overdueTotal = bookingDetails.overdueCharge || 0;

    // Car Rental Details
    if (car) {
      drawText(`${car.carBrand} ${car.carModel} (${car.color})`, 50, y, 12);
      drawText(moment(bookingDetails.rentalStartDate).format("YYYY-MM-DD"), 180, y, 12);
      drawText(moment(bookingDetails.rentalEndDate).format("YYYY-MM-DD"), 300, y, 12);
      drawText(`${car.rentRate.toFixed(0)} Rs`, 410, y, 12);
      drawText(`${rentalTotal.toFixed(0)} Rs`, 480, y, 12);
      y -= 30;
    }

    // ✅ ENHANCED: Maintenance Costs with Detailed Breakdown
    if (bookingDetails.maintenanceCost && typeof bookingDetails.maintenanceCost === "object") {
      console.log('🔧 Processing maintenance costs for invoice:', bookingDetails.maintenanceCost);
      
      // Handle both object with description and simple key-value pairs
      for (const [item, costData] of Object.entries(bookingDetails.maintenanceCost)) {
        let description = item;
        let cost = 0;
        
        // Check if costData is an object with description and cost
        if (typeof costData === 'object' && costData !== null) {
          description = costData.description || item;
          cost = parseFloat(costData.cost) || 0;
        } else {
          // Handle simple key-value pairs
          cost = parseFloat(costData) || 0;
        }
        
        if (cost > 0) {
          drawText(`Maintenance - ${description}`, 50, y, 12);
          drawText("-", 180, y, 12);
          drawText("-", 300, y, 12);
          drawText("-", 410, y, 12);
          drawText(`${cost.toFixed(0)} Rs`, 480, y, 12);
          maintenanceTotal += cost;
          y -= 30;
          
          console.log(`📝 Added maintenance item: ${description} - ${cost} Rs`);
        }
      }
    }

    // ✅ ENHANCED: Maintenance Total Row (if there are maintenance costs)
    if (maintenanceTotal > 0) {
      page.drawLine({ start: { x: 50, y }, end: { x: 550, y }, thickness: 0.5 });
      y -= 20;
      drawText("Maintenance Total", 410, y, 12);
      drawText(`${maintenanceTotal.toFixed(0)} Rs`, 480, y, 12);
      y -= 30;
    }

    // Overdue Charges
    if ((parseFloat(bookingDetails.overdueHours) || 0) > 0) {
      drawText(`Overdue Charges (${bookingDetails.overdueHours} hours)`, 50, y, 12);
      drawText("-", 180, y, 12);
      drawText("-", 300, y, 12);
      drawText("-", 410, y, 12);
      drawText(`${(bookingDetails.overdueCharge || 0).toFixed(0)} Rs`, 480, y, 12);
      y -= 30;
    }

    // ✅ ENHANCED: Final Total with Breakdown
    const totalAmount = rentalTotal + maintenanceTotal + overdueTotal;
    page.drawLine({ start: { x: 50, y }, end: { x: 550, y }, thickness: 1 });
    y -= 20;
    drawText("Total Amount", 410, y, 12);
    drawText(`${totalAmount.toFixed(0)} Rs`, 480, y, 12);

    // ✅ ENHANCED: Payment Status Section with Maintenance Info
    if (bookingDetails.isPaid) {
      y -= 40;
      page.drawLine({ start: { x: 50, y }, end: { x: 550, y }, thickness: 0.5 });
      y -= 20;
      
      drawText("Payment Status:", 50, y, 14, rgb(0, 0.5, 0));
      y -= 20;
      
      drawText(`Payment Received - ${bookingDetails.paymentMethod || "N/A"}`, 50, y, 12, rgb(0, 0.5, 0));
      y -= 15;
      
      if (bookingDetails.paymentDate) {
        drawText(`Payment Date: ${moment(bookingDetails.paymentDate).format("MMMM Do YYYY, h:mm A")}`, 50, y, 10, rgb(0, 0.5, 0));
        y -= 15;
      }
      
      // ✅ ADDED: Maintenance Included Notice
      if (maintenanceTotal > 0) {
        drawText("✅ Includes Maintenance Costs", 50, y, 10, rgb(0, 0.5, 0));
        y -= 15;
      }
      
      drawText("Status: CONFIRMED", 50, y, 12, rgb(0, 0.5, 0));
    }

    // ✅ ENHANCED: Footer with Maintenance Info
    y -= 60;
    page.drawLine({ start: { x: 50, y }, end: { x: 550, y }, thickness: 0.5 });
    y -= 20;
    
    let footerText = [
      "Thank you for choosing RentRush!",
      "RentRush Car Rentals",
      "123 Business Avenue, City, State 12345",
      "Email: support@rentrush.com | Phone: +1 (555) 123-4567",
      "www.rentrush.com"
    ];

    // ✅ ADDED: Maintenance Notice in Footer
    if (maintenanceTotal > 0) {
      footerText.unshift("This invoice includes maintenance and repair costs.");
    }

    drawMultilineText(footerText.join("\n"), 50, y, 500, 9, rgb(0.5, 0.5, 0.5));

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(invoicePath, pdfBytes);
    
    console.log("✅ Invoice created successfully at:", invoicePath);
    console.log("💰 Final Amount Breakdown:", {
      rentalTotal,
      maintenanceTotal,
      overdueTotal,
      totalAmount
    });

    return { invoicePath, invoiceName };
  } catch (error) {
    console.error("❌ Error generating invoice:", error);
    throw new Error(`Failed to generate invoice: ${error.message}`);
  }
};

// ✅ ENHANCED: Generate Paid Invoice with Maintenance for Email
export const generatePaidInvoiceForEmail = async (bookingDetails) => {
  try {
    console.log('📧 Generating PAID invoice for email with maintenance costs...');
    
    // Add paid stamp and ensure maintenance costs are included
    const paidInvoiceDetails = {
      ...bookingDetails,
      isPaid: true,
      invoiceType: "Payment Confirmed - Final Invoice"
    };

    const { invoicePath, invoiceName } = await generateInvoice(paidInvoiceDetails);
    
    console.log('✅ Paid invoice generated for email:', invoiceName);
    return { invoicePath, invoiceName };
    
  } catch (error) {
    console.error('❌ Error generating paid invoice for email:', error);
    throw error;
  }
};

// ✅✅✅ UPDATED: Get ALL Invoices (Not Just Recent Ones)
export const getShowroomInvoices = async (req, res) => {
  try {
    const userId = req.user; // Showroom ID
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - User not found"
      });
    }

    console.log('🔄 Fetching ALL invoices for showroom:', userId);

    // ✅ GET ALL INVOICES - NO DATE FILTERS, NO LIMITS
    const allInvoices = await Invoice.find({})
      .populate('userId', 'ownerName email contactNumber address cnic')
      .populate('carId', 'carBrand carModel plateNumber rentRate color')
      .populate('bookingId', 'rentalStartDate rentalEndDate totalPrice overdueCharge maintenanceCost paymentStatus')
      .populate('showroomId', 'showroomName email contactNumber address')
      .sort({ createdAt: -1 }); // Sort by newest first, but get ALL

    console.log(`📊 Total invoices in database: ${allInvoices.length}`);

    // Filter invoices that belong to this showroom
    const showroomInvoices = allInvoices.filter(invoice => {
      // Check if invoice belongs to this showroom directly
      const isDirectInvoice = invoice.showroomId?._id?.toString() === userId.toString();
      
      // Check if invoice belongs to showroom's cars
      const isShowroomCar = invoice.carId?.userId?.toString() === userId.toString();
      
      return isDirectInvoice || isShowroomCar;
    });

    console.log(`✅ Found ${showroomInvoices.length} invoices for this showroom`);

    if (showroomInvoices.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No invoices found for this showroom",
        data: []
      });
    }

    // Format response with complete invoice data
    const formattedInvoices = showroomInvoices.map(invoice => {
      const totalAmount = invoice.balance || invoice.totalAmount || 0;
      const isPaid = invoice.isCompleted || 
                    (invoice.paymentMethod && invoice.paymentDate) ||
                    invoice.bookingId?.paymentStatus === 'confirmed';

      return {
        _id: invoice._id,
        bookingId: invoice.bookingId?._id || invoice.bookingId,
        invoiceUrl: invoice.invoiceUrl,
        balance: totalAmount,
        isCompleted: isPaid,
        paymentMethod: invoice.paymentMethod,
        paymentDate: invoice.paymentDate,
        carName: invoice.carName || 
                (invoice.carId ? `${invoice.carId.carBrand} ${invoice.carId.carModel}` : 'N/A'),
        user: {
          ownerName: invoice.userId?.ownerName || 'N/A',
          email: invoice.userId?.email || 'N/A',
          contactNumber: invoice.userId?.contactNumber || 'N/A',
          address: invoice.userId?.address || 'N/A'
        },
        carDetails: invoice.carId ? {
          carBrand: invoice.carId.carBrand,
          carModel: invoice.carId.carModel,
          plateNumber: invoice.carId.plateNumber,
          rentRate: invoice.carId.rentRate,
          color: invoice.carId.color
        } : null,
        bookingDetails: invoice.bookingId ? {
          rentalStartDate: invoice.bookingId.rentalStartDate,
          rentalEndDate: invoice.bookingId.rentalEndDate,
          totalPrice: invoice.bookingId.totalPrice,
          overdueCharge: invoice.bookingId.overdueCharge,
          maintenanceCost: invoice.bookingId.maintenanceCost,
          paymentStatus: invoice.bookingId.paymentStatus
        } : null,
        showroomDetails: invoice.showroomId ? {
          showroomName: invoice.showroomId.showroomName,
          email: invoice.showroomId.email,
          contactNumber: invoice.showroomId.contactNumber,
          address: invoice.showroomId.address
        } : null,
        status: isPaid ? 'paid' : 'unpaid',
        createdAt: invoice.createdAt,
        updatedAt: invoice.updatedAt,
        invoiceType: invoice.invoiceType || 'booking'
      };
    });

    res.status(200).json({
      success: true,
      message: `All ${formattedInvoices.length} invoices fetched successfully`,
      count: formattedInvoices.length,
      data: formattedInvoices
    });

  } catch (error) {
    console.error("❌ Error fetching showroom invoices:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch invoices",
      error: error.message
    });
  }
};

// ✅ ADDITIONAL: Download Paid Invoice with Stamp
export const downloadPaidInvoice = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    
    const invoice = await Invoice.findById(invoiceId)
      .populate('userId')
      .populate('carId')
      .populate('bookingId')
      .populate('showroomId');

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found"
      });
    }

    // Mark as paid for PDF generation to get the red stamp
    const paidInvoiceDetails = {
      ...invoice.toObject(),
      isPaid: true
    };

    // Generate PDF with paid stamp
    const { invoicePath } = await generateInvoice(paidInvoiceDetails);

    // Send the file
    res.download(invoicePath, `invoice_paid_${invoice.bookingId}.pdf`, (err) => {
      if (err) {
        console.error('Download error:', err);
        res.status(500).json({
          success: false,
          message: "Failed to download invoice"
        });
      }
    });

  } catch (error) {
    console.error('❌ Error downloading paid invoice:', error);
    res.status(500).json({
      success: false,
      message: "Failed to download paid invoice",
      error: error.message
    });
  }
};

// ✅✅✅ UPDATED: Get ALL Customer Invoices (Not Just Recent Ones)
export const getCustomerInvoices = async (req, res) => {
  try {
    const userId = req.user; // Customer ID
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - User not found"
      });
    }

    console.log('🔄 Fetching ALL invoices for customer:', userId);

    // ✅ GET ALL INVOICES - NO DATE FILTERS, NO LIMITS
    const allInvoices = await Invoice.find({})
      .populate('userId', 'ownerName email contactNumber address cnic')
      .populate('carId', 'carBrand carModel plateNumber rentRate color')
      .populate('bookingId', 'rentalStartDate rentalEndDate totalPrice overdueCharge maintenanceCost paymentStatus')
      .populate('showroomId', 'showroomName email contactNumber address')
      .sort({ createdAt: -1 }); // Sort by newest first, but get ALL

    console.log(`📊 Total invoices in database: ${allInvoices.length}`);

    // Filter invoices that belong to this customer
    const customerInvoices = allInvoices.filter(invoice => {
      return invoice.userId?._id?.toString() === userId.toString();
    });

    console.log(`✅ Found ${customerInvoices.length} invoices for this customer`);

    if (customerInvoices.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No invoices found for this customer",
        data: []
      });
    }

    // Format response with complete invoice data
    const formattedInvoices = customerInvoices.map(invoice => {
      const totalAmount = invoice.balance || invoice.totalAmount || 0;
      const isPaid = invoice.isCompleted || 
                    (invoice.paymentMethod && invoice.paymentDate) ||
                    invoice.bookingId?.paymentStatus === 'confirmed';

      return {
        _id: invoice._id,
        bookingId: invoice.bookingId?._id || invoice.bookingId,
        invoiceUrl: invoice.invoiceUrl,
        balance: totalAmount,
        isCompleted: isPaid,
        paymentMethod: invoice.paymentMethod,
        paymentDate: invoice.paymentDate,
        carName: invoice.carName || 
                (invoice.carId ? `${invoice.carId.carBrand} ${invoice.carId.carModel}` : 'N/A'),
        user: {
          ownerName: invoice.userId?.ownerName || 'N/A',
          email: invoice.userId?.email || 'N/A',
          contactNumber: invoice.userId?.contactNumber || 'N/A',
          address: invoice.userId?.address || 'N/A'
        },
        carDetails: invoice.carId ? {
          carBrand: invoice.carId.carBrand,
          carModel: invoice.carId.carModel,
          plateNumber: invoice.carId.plateNumber,
          rentRate: invoice.carId.rentRate,
          color: invoice.carId.color
        } : null,
        bookingDetails: invoice.bookingId ? {
          rentalStartDate: invoice.bookingId.rentalStartDate,
          rentalEndDate: invoice.bookingId.rentalEndDate,
          totalPrice: invoice.bookingId.totalPrice,
          overdueCharge: invoice.bookingId.overdueCharge,
          maintenanceCost: invoice.bookingId.maintenanceCost,
          paymentStatus: invoice.bookingId.paymentStatus
        } : null,
        showroomDetails: invoice.showroomId ? {
          showroomName: invoice.showroomId.showroomName,
          email: invoice.showroomId.email,
          contactNumber: invoice.showroomId.contactNumber,
          address: invoice.showroomId.address
        } : null,
        status: isPaid ? 'paid' : 'unpaid',
        createdAt: invoice.createdAt,
        updatedAt: invoice.updatedAt,
        invoiceType: invoice.invoiceType || 'booking'
      };
    });

    res.status(200).json({
      success: true,
      message: `All ${formattedInvoices.length} customer invoices fetched successfully`,
      count: formattedInvoices.length,
      data: formattedInvoices
    });

  } catch (error) {
    console.error("❌ Error fetching customer invoices:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch invoices",
      error: error.message
    });
  }
};

export default {
  generateInvoice,
  generatePaidInvoiceForEmail,
  getShowroomInvoices,
  getCustomerInvoices,
  downloadPaidInvoice
};