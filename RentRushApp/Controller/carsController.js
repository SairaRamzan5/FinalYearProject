// // import nodemailer from "nodemailer";
// // import { generateInvoiceEmailTemplate } from "../invoiceEmailTemplate.js";
// // import Booking from "../Model/bookingModel.js";
// // import car_Model from "../Model/Car.js";
// // import signup from "../Model/signup.js";
// // import { generateInvoice } from "./invoiceController.js";
// // import mongoose from "mongoose";
// // import Invoice from "../Model/invoiceModel.js"; // Import Invoice model

// // export const addCar = async (req, res) => {
// //   try {
// //     // console.log(req.body);
// //     const {
// //       carBrand,
// //       rentRate,
// //       carModel,
// //       year,
// //       yearOfManufacture,
// //       make,
// //       variant,
// //       engineType,
// //       images,
// //       color,
// //       mileage,
// //       bodyType,
// //       transmission,
// //       seatCapacity,
// //       luggageCapacity,
// //       fuelType,
// //       carFeatures,
// //       plateNumber, // New field added
// //     } = req.body;

// //     if (![carBrand, rentRate, carModel, year, engineType, plateNumber].every(Boolean)) {
// //       return res.status(400).json("Please provide all required fields.");
// //     }
// //     if (req.role !== "showroom") {
// //       return res
// //         .status(403)
// //         .json("Unauthorized action. Only showroom owners can add cars.");
// //     }

// //     await car_Model.create({
// //       carBrand,
// //       rentRate,
// //       carModel,
// //       year,
// //       yearOfManufacture,
// //       make,
// //       variant,
// //       engineType,
// //       images,
// //       plateNumber, // New field added
// //       availability: "Available", // default value
// //       userId: req.user,
// //       color,
// //       mileage,
// //       bodyType,
// //       transmission,
// //       seatCapacity,
// //       luggageCapacity,
// //       fuelType,
// //       carFeatures,
// //     });
// //     // console.log(req.body);

// //     // console.log(req.user);
// //     return res.status(201).json("Car has been added successfully.");
// //   } catch (error) {
// //     console.error("Error adding car:", error);
// //     return res
// //       .status(500)
// //       .json("An internal server error occurred. Please try again later.");
// //   }
// // };

// // export const getAllCars = async (req, res) => {
// //   try {
// //     const userId = req.user;
// //     if (!userId) {
// //       return res.status(401).json("Unauthorized");
// //     }
// //     const cars = await car_Model.find({ userId }).populate({
// //       path: "rentalInfo",
// //       populate: {
// //         path: "userId",
// //       },
// //     });
// //     // console.log(cars);
// //     return res.status(200).json(cars);
// //   } catch (error) {
// //     console.error("Error fetching cars:", error);
// //     return res
// //       .status(500)
// //       .json("An internal server error occurred. Please try again later.");
// //   }
// // };

// // export const getAllPaymentCars = async (req, res) => {
// //   try {
// //     const userId = req.user;
// //     if (!userId) {
// //       return res.status(401).json("Unauthorized");
// //     }
// //     const cars = await car_Model
// //       .find({ userId })
// //       .populate({
// //         path: "rentalInfo",
// //         match: { status: "pending payment" },
// //         populate: {
// //           path: "userId",
// //         },
// //       })
// //       .where("rentalInfo")
// //       .ne(null); // Ensure only cars with valid rentalInfo are returned

// //     return res.status(200).json(cars);
// //   } catch (error) {
// //     console.error("Error fetching pending payment cars:", error);
// //     return res
// //       .status(500)
// //       .json("An internal server error occurred. Please try again later.");
// //   }
// // };

// // export const getAllReturnCars = async (req, res) => {
// //   try {
// //     const userId = req.user;
// //     if (!userId) {
// //       return res.status(401).json("Unauthorized");
// //     }
// //     const cars = await car_Model
// //       .find({ userId })
// //       .populate({
// //         path: "rentalInfo",
// //         populate: {
// //           path: "userId",
// //         },
// //       })
// //       .where({
// //         availability: ["Pending Return", "In Maintenance"],
// //       });

// //     // console.log(cars);
// //     return res.status(200).json(cars);
// //   } catch (error) {
// //     console.error("Error fetching cars:", error);
// //     return res
// //       .status(500)
// //       .json("An internal server error occurred. Please try again later.");
// //   }
// // };

// // export const getCars = async (req, res) => {
// //   try {
// //     const cars = await car_Model
// //       .find()
// //       .populate("userId", "ownerName showroomName address");
// //     return res.status(200).json(cars);
// //   } catch (error) {
// //     console.error("Error fetching cars:", error);
// //     return res
// //       .status(500)
// //       .json("An internal server error occurred. Please try again later.");
// //   }
// // };

// // export const updateCar = async (req, res) => {
// //   try {
// //     const { Id } = req.params;
// //     const {
// //       carBrand,
// //       rentRate,
// //       carModel,
// //       year,
// //       yearOfManufacture,
// //       make,
// //       variant,
// //       engineType,
// //       images,
// //       color,
// //       mileage,
// //       bodyType,
// //       transmission,
// //       seatCapacity,
// //       luggageCapacity,
// //       fuelType,
// //       carFeatures,
// //       plateNumber, // New field added
// //     } = req.body;

// //     if (req.role !== "showroom") {
// //       return res
// //         .status(403)
// //         .json("Unauthorized action. Only showroom owners can update cars.");
// //     }

// //     const booking = await Booking.find({
// //       carId: Id,
// //       status: {
// //         $ne: "returned",
// //       },
// //     });

// //     if (booking?.length > 0) {
// //       return res.status(400).json("Car is currently booked. Cannot update.");
// //     }

// //     //   update a car function
// //     const updatedCar = await car_Model.findByIdAndUpdate(
// //       Id,
// //       {
// //         carBrand,
// //         rentRate,
// //         carModel,
// //         year,
// //         variant,
// //         yearOfManufacture,
// //         make,
// //         engineType,
// //         images,
// //         color,
// //         mileage,
// //         bodyType,
// //         transmission,
// //         seatCapacity,
// //         luggageCapacity,
// //         fuelType,
// //         carFeatures,
// //         plateNumber, // New field added
// //       },
// //       { new: true, runValidators: true } // Options to return the updated document and run validations
// //     );

// //     if (!updatedCar) {
// //       return res.status(404).json("Car not found.");
// //     }

// //     return res
// //       .status(200)
// //       .json({ message: "Car has been updated successfully.", car: updatedCar });
// //   } catch (error) {
// //     console.error("Error updating car:", error);
// //     return res
// //       .status(500)
// //       .json("An internal server error occurred. Please try again later.");
// //   }
// // };

// // export const removeCar = async (req, res) => {
// //   try {
// //     if (req.role !== "showroom") {
// //       return res
// //         .status(403)
// //         .json("Access denied. Only showroom owners can delete cars.");
// //     }
// //     const _id = req.params.id;
// //     const car = await car_Model.findById(_id);
// //     if (!car) {
// //       return res.status(404).json("Car not found. Please try again.");
// //     }
// //     const booking = await Booking.findById(car.rentalInfo);
// //     if (!booking || booking?.status === "returned") {
// //     } else {
// //       return res.status(400).json("Car is currently booked. Cannot delete.");
// //     }
// //     if (req.user !== car.userId.toString()) {
// //       return res
// //         .status(403)
// //         .json("Access denied. You can only delete cars you own.");
// //     }

// //     await car_Model.findByIdAndDelete(_id);

// //     return res.status(200).json("Car has been successfully deleted.");
// //   } catch (error) {
// //     console.error("Error deleting car:", error);
// //     return res
// //       .status(500)
// //       .json("An internal server error occurred. Please try again later.");
// //   }
// // };

// // export const searchCar = async (req, res) => {
// //   try {
// //     const { carmodel, carbrand, platenumber } = req.query; // Added plate number search

// //     const query = {};
// //     if (!carmodel && !carbrand && !platenumber) {
// //       return res
// //         .status(400)
// //         .json("Please enter car model, car brand, or plate number to search");
// //     }
// //     if (carmodel) {
// //       query.carModel = { $regex: carmodel, $options: "i" };
// //     }
// //     if (carbrand) {
// //       query.carBrand = { $regex: carbrand, $options: "i" };
// //     }
// //     if (platenumber) {
// //       query.plateNumber = { $regex: platenumber.toUpperCase(), $options: "i" };
// //     }
// //     // const cars = await car_Model.find(query).populate('userId');
// //     console.log(query);

// //     const cars = await car_Model
// //       .find(query)
// //       .populate("userId", "showroomName -_id");

// //     if (cars.length === 0) {
// //       return res
// //         .status(404)
// //         .json("No cars found matching your search criteria.");
// //     }

// //     return res.status(200).json(cars);
// //   } catch (error) {
// //     console.error("Error searching for cars:", error);
// //     return res.status(500).json("Internal server error");
// //   }
// // };

// // // Return details api
// // export const updateReturnDetails = async (req, res) => {
// //   const { carId, mileage, fuelLevel } = req.body;

// //   try {
// //     if (req.role !== "showroom") {
// //       return res
// //         .status(403)
// //         .json("Access denied. Only showroom owners can update Return Details");
// //     }

// //     const car = await car_Model.findByIdAndUpdate(
// //       carId,
// //       { mileage, fuelLevel },
// //       { new: true, runValidators: true, context: "query" } // update only specified fields
// //     );
// //     if (!car) {
// //       return res.status(404).json({ message: "Car not found" });
// //     }

// //     return res.status(200).json({
// //       message: "Car return details updated successfully",
// //       car: car,
// //     });
// //   } catch (error) {
// //     res.status(500).json({ message: "Server error", error });
// //   }
// // };

// // // Add a maintenance log and update car status to "In Maintenance"
// // export const addMaintenanceLog = async (req, res) => {
// //   const { carId, tasks } = req.body;

// //   try {
// //     if (req.role !== "showroom") {
// //       return res
// //         .status(403)
// //         .json("Access denied. Only showroom owners can add maintenance logs");
// //     }
// //     const car = await car_Model.findById(carId);
// //     if (!car) return res.status(404).json({ message: "Car not found" });

// //     car.maintenanceLogs.push({ tasks });
// //     car.availability = "In Maintenance"; // Update status
// //     await car.save();

// //     res.status(200).json({ message: "Maintenance log added", car });
// //   } catch (error) {
// //     res.status(500).json({ message: "Server error", error });
// //   }
// // };

// // // Set car status to "Available" after maintenance
// // export const startMaintenance = async (req, res) => {
// //   try {
// //     const {
// //       carId,
// //       showroomId,
// //       maintenanceCost,
// //       maintenanceLog,
// //       repairDescriptions,
// //       rentalStartDate,
// //       rentalStartTime,
// //       rentalEndDate,
// //       rentalEndTime,
// //     } = req.body;

// //     const car = await car_Model.findById(carId).populate("rentalInfo");
// //     if (!car) return res.status(404).json({ message: "Car not found" });

// //     const rentalStartDateis = new Date(rentalStartDate);
// //     const rentalEndDateis = new Date(rentalEndDate);
// //     const now = new Date();
// //     now.setHours(0, 0, 0, 0);

// //     let rentalDuration =
// //       (rentalEndDateis - rentalStartDateis) / (1000 * 60 * 60 * 24);
// //     if (rentalDuration === 0) {
// //       rentalDuration = 1;
// //     }
// //     const daysRented = Math.max(0, Math.ceil(rentalDuration));
// //     const totalPrice = daysRented * car.rentRate;
// //     const formattedRentalStartDate = rentalStartDateis
// //       .toISOString()
// //       .slice(0, 10);
// //     const formattedRentalEndDate = rentalEndDateis.toISOString().slice(0, 10);

// //     const formatTimeTo12Hour = (time) => {
// //       const [hour, minute] = time.split(":").map(Number);
// //       const period = hour >= 12 ? "PM" : "AM";
// //       const formattedHour = hour % 12 || 12;
// //       return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
// //     };

// //     const formattedRentalStartTime = formatTimeTo12Hour(rentalStartTime);
// //     const formattedRentalEndTime = formatTimeTo12Hour(rentalEndTime);

// //     if (req.role !== "showroom") {
// //       return res
// //         .status(403)
// //         .json("Access denied. Only showroom owners can complete maintenance");
// //     }

// //     const booking = await Booking.findById(car.rentalInfo._id);
// //     if (!booking) {
// //       return res.status(404).json({ message: "Booking not found" });
// //     }

// //     booking.repairDescriptions = repairDescriptions;

// //     const invoicePath = await generateInvoice({
// //       _id: car.rentalInfo?._id,
// //       carId,
// //       maintenanceCost,
// //       userId: car.rentalInfo?.userId,
// //       showroomId,
// //       rentalStartDate: formattedRentalStartDate,
// //       rentalEndDate: formattedRentalEndDate,
// //       rentalStartTime: formattedRentalStartTime,
// //       rentalEndTime: formattedRentalEndTime,
// //       totalPrice,
// //       invoiceType: "Updated Invoice Generated",
// //       updateCount: 0,
// //       overdueHours: booking?.overdueHours || 0,
// //       overdueCharge: booking?.overdueCharge || 0,
// //     });

// //     const invoiceUrl = `http://localhost:3000/invoices/${invoicePath.invoiceName}`;

// //     booking.invoiceUrls.push(invoiceUrl);
// //     booking.currentInvoiceUrl = invoiceUrl;
// //     car.availability = "In Maintenance";
// //     car.maintenanceLogs.push({
// //       bookingId: car.rentalInfo._id,
// //       tasks: maintenanceLog,
// //       repairCosts: maintenanceCost,
// //       repairDescriptions: repairDescriptions,
// //     });

// //     const showroom = await signup.findById(showroomId);
// //     const user = await signup.findById(car.rentalInfo?.userId);
// //     if (user) {
// //       const transporter = nodemailer.createTransport({
// //         service: "gmail",
// //         auth: {
// //           user: process.env.EMAIL_USER,
// //           pass: process.env.EMAIL_PASS,
// //         },
// //       });

// //       // Beautiful HTML email template
// //       const emailTemplate = generateInvoiceEmailTemplate(
// //         user,
// //         car,
// //         maintenanceCost,
// //         showroom,
// //         formattedRentalStartDate,
// //         formattedRentalEndDate,
// //         totalPrice
// //       );

// //       // Email options
// //       const mailOptions = {
// //         from: process.env.EMAIL_USER,
// //         to: user.email,
// //         subject: "Car Maintenance Started - Invoice",
// //         html: emailTemplate, // Use HTML template
// //         text: `Dear ${user.name || "Customer"},\n\nYour car (${car.carBrand} ${car.carModel} ${car.year}) has entered maintenance. Please find the invoice attached.\n\nDetails:\n- Start Date: ${formattedRentalStartDate}\n- End Date: ${formattedRentalEndDate}\n- Total Cost: $${totalPrice.toFixed(2)}\n\nThank you for choosing our service!\n\nBest regards,\nShowroom Team`, // Fallback text
// //         attachments: [
// //           {
// //             filename: invoicePath.invoiceName,
// //             path: invoiceUrl, // Use server file path, not URL
// //             contentType: "application/pdf",
// //           },
// //         ],
// //       };

// //       await transporter.sendMail(mailOptions);
// //     }
// //     await booking.save();
// //     await car.save();

// //     res
// //       .status(200)
// //       .json({ message: "Car status updated to Maintenance", car, invoiceUrl });
// //   } catch (error) {
// //     console.error("Error starting maintenance:", error);
// //     res.status(500).json({ message: "Server error", error });
// //   }
// // };

// // // Set car status to "Available" after maintenance
// // export const completeMaintenance = async (req, res) => {
// //   const { id } = req.params;

// //   try {
// //     if (req.role !== "showroom") {
// //       return res
// //         .status(403)
// //         .json("Access denied. Only showroom owners can complete maintenance");
// //     }

// //     const car = await car_Model.findById(id).populate("rentalInfo");
// //     if (!car) return res.status(404).json({ message: "Car not found" });

// //     const booking = await Booking.findById(car.rentalInfo._id);

// //     // Set to pending payment so it appears in payments page
// //     booking.status = "pending payment";
// //     car.availability = "Pending Payment";

// //     await car.save();
// //     await booking.save();

// //     res.status(200).json({ 
// //       message: "Maintenance completed. Car is now pending payment.", 
// //       car 
// //     });
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).json({ message: "Server error", error });
// //   }
// // };

// // // NEW: Payment Confirmation Function
// // export const confirmPayment = async (req, res) => {
// //   try {
// //     const { bookingId, paymentMethod } = req.body;
    
// //     if (!bookingId || !paymentMethod) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Booking ID and payment method are required"
// //       });
// //     }

// //     // Find the booking and populate related data
// //     const booking = await Booking.findById(bookingId)
// //       .populate("carId")
// //       .populate("userId");

// //     if (!booking) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Booking not found"
// //       });
// //     }

// //     // Update booking status to "paid"
// //     booking.status = "paid";
// //     await booking.save();

// //     // Update car availability to "Available"
// //     const car = await car_Model.findById(booking.carId._id);
// //     if (car) {
// //       car.availability = "Available";
// //       // Clear rental info
// //       car.rentalInfo = undefined;
// //       await car.save();
// //     }

// //     // Find and update invoice
// //     const invoice = await Invoice.findOne({ bookingId: bookingId });
// //     if (invoice) {
// //       invoice.isCompleted = true;
// //       invoice.paymentMethod = paymentMethod;
// //       invoice.paymentDate = new Date();
// //       await invoice.save();
// //     } else {
// //       // Create new invoice if doesn't exist
// //       await Invoice.create({
// //         bookingId: bookingId,
// //         userId: booking.userId._id,
// //         showroomId: booking.showroomId,
// //         carId: booking.carId._id,
// //         invoiceUrl: booking.currentInvoiceUrl || "",
// //         balance: booking.totalPrice + (booking.overdueCharge || 0),
// //         isCompleted: true,
// //         paymentMethod: paymentMethod,
// //         paymentDate: new Date()
// //       });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       message: "Payment confirmed successfully. Invoice marked as paid, booking status updated, and car is now available.",
// //       data: {
// //         booking: booking,
// //         car: car,
// //         invoice: invoice
// //       }
// //     });

// //   } catch (error) {
// //     console.error("Payment confirmation error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to confirm payment",
// //       error: error.message
// //     });
// //   }
// // };

// // // Keep the old function for backward compatibility
// // export const markPaymentReceived = async (req, res) => {
// //   const { id } = req.params;

// //   try {
// //     if (req.role !== "showroom") {
// //       return res
// //         .status(403)
// //         .json(
// //           "Access denied. Only showroom owners can mark payment as received"
// //         );
// //     }

// //     const car = await car_Model.findById(id).populate("rentalInfo");
// //     if (!car) return res.status(404).json({ message: "Car not found" });

// //     const booking = await Booking.findById(car.rentalInfo._id);
// //     if (!booking) return res.status(404).json({ message: "Booking not found" });

// //     booking.status = "returned";
// //     car.availability = "Available";

// //     await car.save();
// //     await booking.save();

// //     res.status(200).json({ message: "Payment marked as received", car });
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).json({ message: "Server error", error });
// //   }
// // };

// // // Add this to your carController.js

// // // Get cars for guest users (public access)
// // export const getCarsForGuests = async (req, res) => {
// //   try {
// //     const cars = await car_Model
// //       .find({ availability: "Available" }) // Only show available cars
// //       .populate("userId", "ownerName showroomName address")
// //       .select('-rentalInfo -maintenanceLogs -userId._id'); // Exclude sensitive info

// //     return res.status(200).json({
// //       success: true,
// //       data: cars,
// //       message: "Cars fetched successfully for guest users"
// //     });
// //   } catch (error) {
// //     console.error("Error fetching cars for guests:", error);
// //     return res.status(500).json({
// //       success: false,
// //       message: "An internal server error occurred. Please try again later."
// //     });
// //   }
// // };

// // // Get single car details for guest users
// // export const getCarDetailsForGuest = async (req, res) => {
// //   try {
// //     const { id } = req.params;
    
// //     const car = await car_Model
// //       .findById(id)
// //       .populate("userId", "ownerName showroomName address contactNumber email")
// //       .select('-rentalInfo -maintenanceLogs -userId._id');

// //     if (!car) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Car not found"
// //       });
// //     }

// //     return res.status(200).json({
// //       success: true,
// //       data: car,
// //       message: "Car details fetched successfully"
// //     });
// //   } catch (error) {
// //     console.error("Error fetching car details for guest:", error);
// //     return res.status(500).json({
// //       success: false,
// //       message: "An internal server error occurred. Please try again later."
// //     });
// //   }
// // };


// import nodemailer from "nodemailer";
// import { generateInvoiceEmailTemplate } from "../invoiceEmailTemplate.js";
// import Booking from "../Model/bookingModel.js";
// import car_Model from "../Model/Car.js";
// import signup from "../Model/signup.js";
// import { generateInvoice } from "./invoiceController.js";
// import mongoose from "mongoose";
// import Invoice from "../Model/invoiceModel.js"; // Import Invoice model

// export const addCar = async (req, res) => {
//   try {
//     // console.log(req.body);
//     const {
//       carBrand,
//       rentRate,
//       carModel,
//       year,
//       yearOfManufacture,
//       make,
//       variant,
//       engineType,
//       images,
//       color,
//       mileage,
//       bodyType,
//       transmission,
//       seatCapacity,
//       luggageCapacity,
//       fuelType,
//       carFeatures,
//       plateNumber, // New field added
//     } = req.body;

//     if (![carBrand, rentRate, carModel, year, engineType, plateNumber].every(Boolean)) {
//       return res.status(400).json("Please provide all required fields.");
//     }
//     if (req.role !== "showroom") {
//       return res
//         .status(403)
//         .json("Unauthorized action. Only showroom owners can add cars.");
//     }

//     await car_Model.create({
//       carBrand,
//       rentRate,
//       carModel,
//       year,
//       yearOfManufacture,
//       make,
//       variant,
//       engineType,
//       images,
//       plateNumber, // New field added
//       availability: "Available", // default value
//       userId: req.user,
//       color,
//       mileage,
//       bodyType,
//       transmission,
//       seatCapacity,
//       luggageCapacity,
//       fuelType,
//       carFeatures,
//     });
//     // console.log(req.body);

//     // console.log(req.user);
//     return res.status(201).json("Car has been added successfully.");
//   } catch (error) {
//     console.error("Error adding car:", error);
//     return res
//       .status(500)
//       .json("An internal server error occurred. Please try again later.");
//   }
// };

// export const getAllCars = async (req, res) => {
//   try {
//     const userId = req.user;
//     if (!userId) {
//       return res.status(401).json("Unauthorized");
//     }
//     const cars = await car_Model.find({ userId }).populate({
//       path: "rentalInfo",
//       populate: {
//         path: "userId",
//       },
//     });
//     // console.log(cars);
//     return res.status(200).json(cars);
//   } catch (error) {
//     console.error("Error fetching cars:", error);
//     return res
//       .status(500)
//       .json("An internal server error occurred. Please try again later.");
//   }
// };

// export const getAllPaymentCars = async (req, res) => {
//   try {
//     const userId = req.user;
//     if (!userId) {
//       return res.status(401).json("Unauthorized");
//     }
//     const cars = await car_Model
//       .find({ userId })
//       .populate({
//         path: "rentalInfo",
//         match: { status: "pending payment" },
//         populate: {
//           path: "userId",
//         },
//       })
//       .where("rentalInfo")
//       .ne(null); // Ensure only cars with valid rentalInfo are returned

//     return res.status(200).json(cars);
//   } catch (error) {
//     console.error("Error fetching pending payment cars:", error);
//     return res
//       .status(500)
//       .json("An internal server error occurred. Please try again later.");
//   }
// };

// export const getAllReturnCars = async (req, res) => {
//   try {
//     const userId = req.user;
//     if (!userId) {
//       return res.status(401).json("Unauthorized");
//     }
//     const cars = await car_Model
//       .find({ userId })
//       .populate({
//         path: "rentalInfo",
//         populate: {
//           path: "userId",
//         },
//       })
//       .where({
//         availability: ["Pending Return", "In Maintenance"],
//       });

//     // console.log(cars);
//     return res.status(200).json(cars);
//   } catch (error) {
//     console.error("Error fetching cars:", error);
//     return res
//       .status(500)
//       .json("An internal server error occurred. Please try again later.");
//   }
// };

// export const getCars = async (req, res) => {
//   try {
//     const cars = await car_Model
//       .find()
//       .populate("userId", "ownerName showroomName address");
//     return res.status(200).json(cars);
//   } catch (error) {
//     console.error("Error fetching cars:", error);
//     return res
//       .status(500)
//       .json("An internal server error occurred. Please try again later.");
//   }
// };

// export const updateCar = async (req, res) => {
//   try {
//     const { Id } = req.params;
//     const {
//       carBrand,
//       rentRate,
//       carModel,
//       year,
//       yearOfManufacture,
//       make,
//       variant,
//       engineType,
//       images,
//       color,
//       mileage,
//       bodyType,
//       transmission,
//       seatCapacity,
//       luggageCapacity,
//       fuelType,
//       carFeatures,
//       plateNumber, // New field added
//     } = req.body;

//     if (req.role !== "showroom") {
//       return res
//         .status(403)
//         .json("Unauthorized action. Only showroom owners can update cars.");
//     }

//     const booking = await Booking.find({
//       carId: Id,
//       status: {
//         $ne: "returned",
//       },
//     });

//     if (booking?.length > 0) {
//       return res.status(400).json("Car is currently booked. Cannot update.");
//     }

//     //   update a car function
//     const updatedCar = await car_Model.findByIdAndUpdate(
//       Id,
//       {
//         carBrand,
//         rentRate,
//         carModel,
//         year,
//         variant,
//         yearOfManufacture,
//         make,
//         engineType,
//         images,
//         color,
//         mileage,
//         bodyType,
//         transmission,
//         seatCapacity,
//         luggageCapacity,
//         fuelType,
//         carFeatures,
//         plateNumber, // New field added
//       },
//       { new: true, runValidators: true } // Options to return the updated document and run validations
//     );

//     if (!updatedCar) {
//       return res.status(404).json("Car not found.");
//     }

//     return res
//       .status(200)
//       .json({ message: "Car has been updated successfully.", car: updatedCar });
//   } catch (error) {
//     console.error("Error updating car:", error);
//     return res
//       .status(500)
//       .json("An internal server error occurred. Please try again later.");
//   }
// };

// export const removeCar = async (req, res) => {
//   try {
//     if (req.role !== "showroom") {
//       return res
//         .status(403)
//         .json("Access denied. Only showroom owners can delete cars.");
//     }
//     const _id = req.params.id;
//     const car = await car_Model.findById(_id);
//     if (!car) {
//       return res.status(404).json("Car not found. Please try again.");
//     }
//     const booking = await Booking.findById(car.rentalInfo);
//     if (!booking || booking?.status === "returned") {
//     } else {
//       return res.status(400).json("Car is currently booked. Cannot delete.");
//     }
//     if (req.user !== car.userId.toString()) {
//       return res
//         .status(403)
//         .json("Access denied. You can only delete cars you own.");
//     }

//     await car_Model.findByIdAndDelete(_id);

//     return res.status(200).json("Car has been successfully deleted.");
//   } catch (error) {
//     console.error("Error deleting car:", error);
//     return res
//       .status(500)
//       .json("An internal server error occurred. Please try again later.");
//   }
// };

// export const searchCar = async (req, res) => {
//   try {
//     const { carmodel, carbrand, platenumber } = req.query; // Added plate number search

//     const query = {};
//     if (!carmodel && !carbrand && !platenumber) {
//       return res
//         .status(400)
//         .json("Please enter car model, car brand, or plate number to search");
//     }
//     if (carmodel) {
//       query.carModel = { $regex: carmodel, $options: "i" };
//     }
//     if (carbrand) {
//       query.carBrand = { $regex: carbrand, $options: "i" };
//     }
//     if (platenumber) {
//       query.plateNumber = { $regex: platenumber.toUpperCase(), $options: "i" };
//     }
//     // const cars = await car_Model.find(query).populate('userId');
//     console.log(query);

//     const cars = await car_Model
//       .find(query)
//       .populate("userId", "showroomName -_id");

//     if (cars.length === 0) {
//       return res
//         .status(404)
//         .json("No cars found matching your search criteria.");
//     }

//     return res.status(200).json(cars);
//   } catch (error) {
//     console.error("Error searching for cars:", error);
//     return res.status(500).json("Internal server error");
//   }
// };

// // Return details api
// export const updateReturnDetails = async (req, res) => {
//   const { carId, mileage, fuelLevel } = req.body;

//   try {
//     if (req.role !== "showroom") {
//       return res
//         .status(403)
//         .json("Access denied. Only showroom owners can update Return Details");
//     }

//     const car = await car_Model.findByIdAndUpdate(
//       carId,
//       { mileage, fuelLevel },
//       { new: true, runValidators: true, context: "query" } // update only specified fields
//     );
//     if (!car) {
//       return res.status(404).json({ message: "Car not found" });
//     }

//     return res.status(200).json({
//       message: "Car return details updated successfully",
//       car: car,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // Add a maintenance log and update car status to "In Maintenance"
// export const addMaintenanceLog = async (req, res) => {
//   const { carId, tasks } = req.body;

//   try {
//     if (req.role !== "showroom") {
//       return res
//         .status(403)
//         .json("Access denied. Only showroom owners can add maintenance logs");
//     }
//     const car = await car_Model.findById(carId);
//     if (!car) return res.status(404).json({ message: "Car not found" });

//     car.maintenanceLogs.push({ tasks });
//     car.availability = "In Maintenance"; // Update status
//     await car.save();

//     res.status(200).json({ message: "Maintenance log added", car });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // Set car status to "Available" after maintenance
// export const startMaintenance = async (req, res) => {
//   try {
//     const {
//       carId,
//       showroomId,
//       maintenanceCost,
//       maintenanceLog,
//       repairDescriptions,
//       rentalStartDate,
//       rentalStartTime,
//       rentalEndDate,
//       rentalEndTime,
//     } = req.body;

//     const car = await car_Model.findById(carId).populate("rentalInfo");
//     if (!car) return res.status(404).json({ message: "Car not found" });

//     const rentalStartDateis = new Date(rentalStartDate);
//     const rentalEndDateis = new Date(rentalEndDate);
//     const now = new Date();
//     now.setHours(0, 0, 0, 0);

//     let rentalDuration =
//       (rentalEndDateis - rentalStartDateis) / (1000 * 60 * 60 * 24);
//     if (rentalDuration === 0) {
//       rentalDuration = 1;
//     }
//     const daysRented = Math.max(0, Math.ceil(rentalDuration));
//     const totalPrice = daysRented * car.rentRate;
//     const formattedRentalStartDate = rentalStartDateis
//       .toISOString()
//       .slice(0, 10);
//     const formattedRentalEndDate = rentalEndDateis.toISOString().slice(0, 10);

//     const formatTimeTo12Hour = (time) => {
//       const [hour, minute] = time.split(":").map(Number);
//       const period = hour >= 12 ? "PM" : "AM";
//       const formattedHour = hour % 12 || 12;
//       return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
//     };

//     const formattedRentalStartTime = formatTimeTo12Hour(rentalStartTime);
//     const formattedRentalEndTime = formatTimeTo12Hour(rentalEndTime);

//     if (req.role !== "showroom") {
//       return res
//         .status(403)
//         .json("Access denied. Only showroom owners can complete maintenance");
//     }

//     const booking = await Booking.findById(car.rentalInfo._id);
//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     booking.repairDescriptions = repairDescriptions;

//     const invoicePath = await generateInvoice({
//       _id: car.rentalInfo?._id,
//       carId,
//       maintenanceCost,
//       userId: car.rentalInfo?.userId,
//       showroomId,
//       rentalStartDate: formattedRentalStartDate,
//       rentalEndDate: formattedRentalEndDate,
//       rentalStartTime: formattedRentalStartTime,
//       rentalEndTime: formattedRentalEndTime,
//       totalPrice,
//       invoiceType: "Updated Invoice Generated",
//       updateCount: 0,
//       overdueHours: booking?.overdueHours || 0,
//       overdueCharge: booking?.overdueCharge || 0,
//     });

//     const invoiceUrl = `http://localhost:3000/invoices/${invoicePath.invoiceName}`;

//     booking.invoiceUrls.push(invoiceUrl);
//     booking.currentInvoiceUrl = invoiceUrl;
//     car.availability = "In Maintenance";
//     car.maintenanceLogs.push({
//       bookingId: car.rentalInfo._id,
//       tasks: maintenanceLog,
//       repairCosts: maintenanceCost,
//       repairDescriptions: repairDescriptions,
//     });

//     // ❌❌❌ EMAIL SENDING REMOVED FROM START MAINTENANCE
//     // Start maintenance pe email nahi jayegi

//     await booking.save();
//     await car.save();

//     res
//       .status(200)
//       .json({ message: "Car status updated to Maintenance", car, invoiceUrl });
//   } catch (error) {
//     console.error("Error starting maintenance:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // Set car status to "Available" after maintenance
// export const completeMaintenance = async (req, res) => {
//   const { id } = req.params;

//   try {
//     if (req.role !== "showroom") {
//       return res
//         .status(403)
//         .json("Access denied. Only showroom owners can complete maintenance");
//     }

//     const car = await car_Model.findById(id).populate("rentalInfo");
//     if (!car) return res.status(404).json({ message: "Car not found" });

//     const booking = await Booking.findById(car.rentalInfo._id);
//     const showroom = await signup.findById(booking.showroomId);
//     const user = await signup.findById(booking.userId);

//     // Set to pending payment so it appears in payments page
//     booking.status = "pending payment";
//     car.availability = "Pending Payment";

//     // ✅✅✅ MAINTENANCE COMPLETE EMAIL
//     if (user) {
//       const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASS,
//         },
//       });

//       // Maintenance Complete Email Template
//       const maintenanceCompleteTemplate = `
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <style>
//                 body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//                 .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; }
//                 .header { background: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
//                 .content { padding: 20px; }
//                 .footer { background: #f4f4f4; padding: 15px; text-align: center; border-radius: 0 0 10px 10px; }
//                 .details { background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0; }
//             </style>
//         </head>
//         <body>
//             <div class="container">
//                 <div class="header">
//                     <h1>🚗 Maintenance Completed</h1>
//                     <p>Your vehicle is ready for pickup!</p>
//                 </div>
//                 <div class="content">
//                     <h2>Dear ${user.ownerName || 'Customer'},</h2>
//                     <p>We're pleased to inform you that the maintenance for your rented vehicle has been completed successfully.</p>
                    
//                     <div class="details">
//                         <h3>Vehicle Details:</h3>
//                         <p><strong>Car:</strong> ${car.carBrand} ${car.carModel} (${car.year})</p>
//                         <p><strong>Plate Number:</strong> ${car.plateNumber}</p>
//                         <p><strong>Maintenance Completed On:</strong> ${new Date().toLocaleDateString()}</p>
//                     </div>

//                     <p>The vehicle is now ready for your use. Please proceed with the payment to complete the process.</p>
                    
//                     <p><strong>Next Steps:</strong></p>
//                     <ul>
//                         <li>Review the maintenance details</li>
//                         <li>Complete the payment process</li>
//                         <li>Collect your vehicle from the showroom</li>
//                     </ul>
//                 </div>
//                 <div class="footer">
//                     <p>Thank you for choosing our service!</p>
//                     <p><strong>${showroom?.showroomName || 'Car Rental Service'}</strong></p>
//                     <p>Contact: ${showroom?.contactNumber || 'N/A'} | Email: ${showroom?.email || 'N/A'}</p>
//                 </div>
//             </div>
//         </body>
//         </html>
//       `;

//       const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: user.email,
//         subject: `Maintenance Completed - ${car.carBrand} ${car.carModel}`,
//         html: maintenanceCompleteTemplate,
//         text: `Dear ${user.ownerName || 'Customer'},\n\nMaintenance for your vehicle ${car.carBrand} ${car.carModel} (${car.plateNumber}) has been completed successfully.\n\nThe vehicle is now ready for pickup. Please complete the payment process.\n\nThank you!\n${showroom?.showroomName || 'Car Rental Service'}`
//       };

//       await transporter.sendMail(mailOptions);
//       console.log('✅ Maintenance completion email sent to:', user.email);
//     }

//     await car.save();
//     await booking.save();

//     res.status(200).json({ 
//       message: "Maintenance completed. Car is now pending payment and customer notified.", 
//       car 
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // NEW: Payment Confirmation Function with Email
// export const confirmPayment = async (req, res) => {
//   try {
//     const { bookingId, paymentMethod } = req.body;
    
//     if (!bookingId || !paymentMethod) {
//       return res.status(400).json({
//         success: false,
//         message: "Booking ID and payment method are required"
//       });
//     }

//     // Find the booking and populate related data
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

//     // Update booking status to "paid"
//     booking.status = "paid";
//     await booking.save();

//     // Update car availability to "Available"
//     const car = await car_Model.findById(booking.carId._id);
//     if (car) {
//       car.availability = "Available";
//       // Clear rental info
//       car.rentalInfo = undefined;
//       await car.save();
//     }

//     // Find and update invoice
//     const invoice = await Invoice.findOne({ bookingId: bookingId });
//     if (invoice) {
//       invoice.isCompleted = true;
//       invoice.paymentMethod = paymentMethod;
//       invoice.paymentDate = new Date();
//       await invoice.save();
//     } else {
//       // Create new invoice if doesn't exist
//       await Invoice.create({
//         bookingId: bookingId,
//         userId: booking.userId._id,
//         showroomId: booking.showroomId,
//         carId: booking.carId._id,
//         invoiceUrl: booking.currentInvoiceUrl || "",
//         balance: booking.totalPrice + (booking.overdueCharge || 0),
//         isCompleted: true,
//         paymentMethod: paymentMethod,
//         paymentDate: new Date()
//       });
//     }

//     // ✅✅✅ PAYMENT CONFIRMATION EMAIL WITH PAID INVOICE
//     if (booking.userId) {
//       const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASS,
//         },
//       });

//       // Generate PAID invoice with red stamp
//       const paidInvoicePath = await generateInvoice({
//         _id: booking._id,
//         carId: booking.carId._id,
//         userId: booking.userId._id,
//         showroomId: booking.showroomId,
//         rentalStartDate: booking.rentalStartDate,
//         rentalEndDate: booking.rentalEndDate,
//         rentalStartTime: booking.rentalStartTime,
//         rentalEndTime: booking.rentalEndTime,
//         totalPrice: booking.totalPrice,
//         overdueCharge: booking.overdueCharge || 0,
//         maintenanceCost: booking.maintenanceCost || {},
//         invoiceType: "Payment Confirmed - Final Invoice",
//         isPaid: true, // ✅ YEH RED PAID STAMP KE LIYE HAI
//         paymentMethod: paymentMethod,
//         paymentDate: new Date(),
//         updateCount: invoice ? invoice.updateCount + 1 : 0
//       });

//       const paidInvoiceUrl = `http://localhost:3000/invoices/${paidInvoicePath.invoiceName}`;

//       // Payment Confirmation Email Template
//       const paymentConfirmTemplate = `
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <style>
//                 body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//                 .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; }
//                 .header { background: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
//                 .content { padding: 20px; }
//                 .footer { background: #f4f4f4; padding: 15px; text-align: center; border-radius: 0 0 10px 10px; }
//                 .paid-badge { background: #4CAF50; color: white; padding: 10px 20px; border-radius: 25px; display: inline-block; font-weight: bold; }
//                 .details { background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0; }
//             </style>
//         </head>
//         <body>
//             <div class="container">
//                 <div class="header">
//                     <h1>✅ Payment Confirmed</h1>
//                     <p>Your payment has been processed successfully!</p>
//                 </div>
//                 <div class="content">
//                     <h2>Dear ${booking.userId.ownerName || 'Customer'},</h2>
//                     <p>We're pleased to inform you that your payment has been confirmed successfully.</p>
                    
//                     <div class="paid-badge">PAYMENT CONFIRMED</div>
                    
//                     <div class="details">
//                         <h3>Transaction Details:</h3>
//                         <p><strong>Booking ID:</strong> ${booking._id.toString().slice(-8)}</p>
//                         <p><strong>Vehicle:</strong> ${booking.carId.carBrand} ${booking.carId.carModel}</p>
//                         <p><strong>Payment Method:</strong> ${paymentMethod}</p>
//                         <p><strong>Amount Paid:</strong> PKR ${(booking.totalPrice + (booking.overdueCharge || 0)).toLocaleString()}</p>
//                         <p><strong>Payment Date:</strong> ${new Date().toLocaleDateString()}</p>
//                     </div>

//                     <p>Your invoice with <strong style="color: red;">PAID</strong> stamp is attached with this email.</p>
                    
//                     <p><strong>Note:</strong> The attached invoice includes a red <strong style="color: red;">PAID</strong> stamp indicating successful payment confirmation.</p>
//                 </div>
//                 <div class="footer">
//                     <p>Thank you for your business!</p>
//                     <p><strong>${booking.showroomId?.showroomName || 'Car Rental Service'}</strong></p>
//                     <p>Contact: ${booking.showroomId?.contactNumber || 'N/A'} | Email: ${booking.showroomId?.email || 'N/A'}</p>
//                 </div>
//             </div>
//         </body>
//         </html>
//       `;

//       const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: booking.userId.email,
//         subject: `Payment Confirmed - Booking #${booking._id.toString().slice(-8)}`,
//         html: paymentConfirmTemplate,
//         text: `Dear ${booking.userId.ownerName || 'Customer'},\n\nYour payment of PKR ${(booking.totalPrice + (booking.overdueCharge || 0)).toLocaleString()} has been confirmed successfully.\n\nPayment Method: ${paymentMethod}\nBooking ID: ${booking._id.toString().slice(-8)}\nVehicle: ${booking.carId.carBrand} ${booking.carId.carModel}\n\nYour invoice with PAID stamp is attached.\n\nThank you for your business!\n${booking.showroomId?.showroomName || 'Car Rental Service'}`,
//         attachments: [
//           {
//             filename: `PAID_Invoice_${booking._id.toString().slice(-8)}.pdf`,
//             path: paidInvoiceUrl,
//             contentType: "application/pdf",
//           },
//         ],
//       };

//       await transporter.sendMail(mailOptions);
//       console.log('✅ Payment confirmation email sent with PAID invoice');
//     }

//     res.status(200).json({
//       success: true,
//       message: "Payment confirmed successfully. Invoice marked as paid, booking status updated, car is now available, and customer notified with PAID invoice.",
//       data: {
//         booking: booking,
//         car: car,
//         invoice: invoice
//       }
//     });

//   } catch (error) {
//     console.error("Payment confirmation error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to confirm payment",
//       error: error.message
//     });
//   }
// };

// // Keep the old function for backward compatibility
// export const markPaymentReceived = async (req, res) => {
//   const { id } = req.params;

//   try {
//     if (req.role !== "showroom") {
//       return res
//         .status(403)
//         .json(
//           "Access denied. Only showroom owners can mark payment as received"
//         );
//     }

//     const car = await car_Model.findById(id).populate("rentalInfo");
//     if (!car) return res.status(404).json({ message: "Car not found" });

//     const booking = await Booking.findById(car.rentalInfo._id);
//     if (!booking) return res.status(404).json({ message: "Booking not found" });

//     booking.status = "returned";
//     car.availability = "Available";

//     await car.save();
//     await booking.save();

//     res.status(200).json({ message: "Payment marked as received", car });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // Add this to your carController.js

// // Get cars for guest users (public access)
// export const getCarsForGuests = async (req, res) => {
//   try {
//     const cars = await car_Model
//       .find({ availability: "Available" }) // Only show available cars
//       .populate("userId", "ownerName showroomName address")
//       .select('-rentalInfo -maintenanceLogs -userId._id'); // Exclude sensitive info

//     return res.status(200).json({
//       success: true,
//       data: cars,
//       message: "Cars fetched successfully for guest users"
//     });
//   } catch (error) {
//     console.error("Error fetching cars for guests:", error);
//     return res.status(500).json({
//       success: false,
//       message: "An internal server error occurred. Please try again later."
//     });
//   }
// };

// // Get single car details for guest users
// export const getCarDetailsForGuest = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const car = await car_Model
//       .findById(id)
//       .populate("userId", "ownerName showroomName address contactNumber email")
//       .select('-rentalInfo -maintenanceLogs -userId._id');

//     if (!car) {
//       return res.status(404).json({
//         success: false,
//         message: "Car not found"
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       data: car,
//       message: "Car details fetched successfully"
//     });
//   } catch (error) {
//     console.error("Error fetching car details for guest:", error);
//     return res.status(500).json({
//       success: false,
//       message: "An internal server error occurred. Please try again later."
//     });
//   }
// };

import nodemailer from "nodemailer";
import { generateInvoiceEmailTemplate } from "../invoiceEmailTemplate.js";
import Booking from "../Model/bookingModel.js";
import car_Model from "../Model/Car.js";
import signup from "../Model/signup.js";
import { generateInvoice } from "./invoiceController.js";
import mongoose from "mongoose";
import Invoice from "../Model/invoiceModel.js"; // Import Invoice model

export const addCar = async (req, res) => {
  try {
    // console.log(req.body);
    const {
      carBrand,
      rentRate,
      carModel,
      year,
      yearOfManufacture,
      make,
      variant,
      engineType,
      images,
      color,
      mileage,
      bodyType,
      transmission,
      seatCapacity,
      luggageCapacity,
      fuelType,
      carFeatures,
      plateNumber, // New field added
    } = req.body;

    if (![carBrand, rentRate, carModel, year, engineType, plateNumber].every(Boolean)) {
      return res.status(400).json("Please provide all required fields.");
    }
    if (req.role !== "showroom") {
      return res
        .status(403)
        .json("Unauthorized action. Only showroom owners can add cars.");
    }

    await car_Model.create({
      carBrand,
      rentRate,
      carModel,
      year,
      yearOfManufacture,
      make,
      variant,
      engineType,
      images,
      plateNumber, // New field added
      availability: "Available", // default value
      userId: req.user,
      color,
      mileage,
      bodyType,
      transmission,
      seatCapacity,
      luggageCapacity,
      fuelType,
      carFeatures,
    });
    // console.log(req.body);

    // console.log(req.user);
    return res.status(201).json("Car has been added successfully.");
  } catch (error) {
    console.error("Error adding car:", error);
    return res
      .status(500)
      .json("An internal server error occurred. Please try again later.");
  }
};

export const getAllCars = async (req, res) => {
  try {
    const userId = req.user;
    if (!userId) {
      return res.status(401).json("Unauthorized");
    }
    const cars = await car_Model.find({ userId }).populate({
      path: "rentalInfo",
      populate: {
        path: "userId",
      },
    });
    // console.log(cars);
    return res.status(200).json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    return res
      .status(500)
      .json("An internal server error occurred. Please try again later.");
  }
};

export const getAllPaymentCars = async (req, res) => {
  try {
    const userId = req.user;
    if (!userId) {
      return res.status(401).json("Unauthorized");
    }
    const cars = await car_Model
      .find({ userId })
      .populate({
        path: "rentalInfo",
        match: { status: "pending payment" },
        populate: {
          path: "userId",
        },
      })
      .where("rentalInfo")
      .ne(null); // Ensure only cars with valid rentalInfo are returned

    return res.status(200).json(cars);
  } catch (error) {
    console.error("Error fetching pending payment cars:", error);
    return res
      .status(500)
      .json("An internal server error occurred. Please try again later.");
  }
};

export const getAllReturnCars = async (req, res) => {
  try {
    const userId = req.user;
    if (!userId) {
      return res.status(401).json("Unauthorized");
    }
    const cars = await car_Model
      .find({ userId })
      .populate({
        path: "rentalInfo",
        populate: {
          path: "userId",
        },
      })
      .where({
        availability: ["Pending Return", "In Maintenance"],
      });

    // console.log(cars);
    return res.status(200).json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    return res
      .status(500)
      .json("An internal server error occurred. Please try again later.");
  }
};

export const getCars = async (req, res) => {
  try {
    const cars = await car_Model
      .find()
      .populate("userId", "ownerName showroomName address");
    return res.status(200).json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    return res
      .status(500)
      .json("An internal server error occurred. Please try again later.");
  }
};

export const updateCar = async (req, res) => {
  try {
    const { Id } = req.params;
    const {
      carBrand,
      rentRate,
      carModel,
      year,
      yearOfManufacture,
      make,
      variant,
      engineType,
      images,
      color,
      mileage,
      bodyType,
      transmission,
      seatCapacity,
      luggageCapacity,
      fuelType,
      carFeatures,
      plateNumber, // New field added
    } = req.body;

    if (req.role !== "showroom") {
      return res
        .status(403)
        .json("Unauthorized action. Only showroom owners can update cars.");
    }

    const booking = await Booking.find({
      carId: Id,
      status: {
        $ne: "returned",
      },
    });

    if (booking?.length > 0) {
      return res.status(400).json("Car is currently booked. Cannot update.");
    }

    //   update a car function
    const updatedCar = await car_Model.findByIdAndUpdate(
      Id,
      {
        carBrand,
        rentRate,
        carModel,
        year,
        variant,
        yearOfManufacture,
        make,
        engineType,
        images,
        color,
        mileage,
        bodyType,
        transmission,
        seatCapacity,
        luggageCapacity,
        fuelType,
        carFeatures,
        plateNumber, // New field added
      },
      { new: true, runValidators: true } // Options to return the updated document and run validations
    );

    if (!updatedCar) {
      return res.status(404).json("Car not found.");
    }

    return res
      .status(200)
      .json({ message: "Car has been updated successfully.", car: updatedCar });
  } catch (error) {
    console.error("Error updating car:", error);
    return res
      .status(500)
      .json("An internal server error occurred. Please try again later.");
  }
};

export const removeCar = async (req, res) => {
  try {
    if (req.role !== "showroom") {
      return res
        .status(403)
        .json("Access denied. Only showroom owners can delete cars.");
    }
    const _id = req.params.id;
    const car = await car_Model.findById(_id);
    if (!car) {
      return res.status(404).json("Car not found. Please try again.");
    }
    const booking = await Booking.findById(car.rentalInfo);
    if (!booking || booking?.status === "returned") {
    } else {
      return res.status(400).json("Car is currently booked. Cannot delete.");
    }
    if (req.user !== car.userId.toString()) {
      return res
        .status(403)
        .json("Access denied. You can only delete cars you own.");
    }

    await car_Model.findByIdAndDelete(_id);

    return res.status(200).json("Car has been successfully deleted.");
  } catch (error) {
    console.error("Error deleting car:", error);
    return res
      .status(500)
      .json("An internal server error occurred. Please try again later.");
  }
};

export const searchCar = async (req, res) => {
  try {
    const { carmodel, carbrand, platenumber } = req.query; // Added plate number search

    const query = {};
    if (!carmodel && !carbrand && !platenumber) {
      return res
        .status(400)
        .json("Please enter car model, car brand, or plate number to search");
    }
    if (carmodel) {
      query.carModel = { $regex: carmodel, $options: "i" };
    }
    if (carbrand) {
      query.carBrand = { $regex: carbrand, $options: "i" };
    }
    if (platenumber) {
      query.plateNumber = { $regex: platenumber.toUpperCase(), $options: "i" };
    }
    // const cars = await car_Model.find(query).populate('userId');
    console.log(query);

    const cars = await car_Model
      .find(query)
      .populate("userId", "showroomName -_id");

    if (cars.length === 0) {
      return res
        .status(404)
        .json("No cars found matching your search criteria.");
    }

    return res.status(200).json(cars);
  } catch (error) {
    console.error("Error searching for cars:", error);
    return res.status(500).json("Internal server error");
  }
};

// Return details api
export const updateReturnDetails = async (req, res) => {
  const { carId, mileage, fuelLevel } = req.body;

  try {
    if (req.role !== "showroom") {
      return res
        .status(403)
        .json("Access denied. Only showroom owners can update Return Details");
    }

    const car = await car_Model.findByIdAndUpdate(
      carId,
      { mileage, fuelLevel },
      { new: true, runValidators: true, context: "query" } // update only specified fields
    );
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    return res.status(200).json({
      message: "Car return details updated successfully",
      car: car,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Add a maintenance log and update car status to "In Maintenance"
export const addMaintenanceLog = async (req, res) => {
  const { carId, tasks } = req.body;

  try {
    if (req.role !== "showroom") {
      return res
        .status(403)
        .json("Access denied. Only showroom owners can add maintenance logs");
    }
    const car = await car_Model.findById(carId);
    if (!car) return res.status(404).json({ message: "Car not found" });

    car.maintenanceLogs.push({ tasks });
    car.availability = "In Maintenance"; // Update status
    await car.save();

    res.status(200).json({ message: "Maintenance log added", car });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Set car status to "Available" after maintenance
export const startMaintenance = async (req, res) => {
  try {
    const {
      carId,
      showroomId,
      maintenanceCost,
      maintenanceLog,
      repairDescriptions,
      rentalStartDate,
      rentalStartTime,
      rentalEndDate,
      rentalEndTime,
    } = req.body;

    const car = await car_Model.findById(carId).populate("rentalInfo");
    if (!car) return res.status(404).json({ message: "Car not found" });

    const rentalStartDateis = new Date(rentalStartDate);
    const rentalEndDateis = new Date(rentalEndDate);
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    let rentalDuration =
      (rentalEndDateis - rentalStartDateis) / (1000 * 60 * 60 * 24);
    if (rentalDuration === 0) {
      rentalDuration = 1;
    }
    const daysRented = Math.max(0, Math.ceil(rentalDuration));
    const totalPrice = daysRented * car.rentRate;
    const formattedRentalStartDate = rentalStartDateis
      .toISOString()
      .slice(0, 10);
    const formattedRentalEndDate = rentalEndDateis.toISOString().slice(0, 10);

    const formatTimeTo12Hour = (time) => {
      const [hour, minute] = time.split(":").map(Number);
      const period = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
    };

    const formattedRentalStartTime = formatTimeTo12Hour(rentalStartTime);
    const formattedRentalEndTime = formatTimeTo12Hour(rentalEndTime);

    if (req.role !== "showroom") {
      return res
        .status(403)
        .json("Access denied. Only showroom owners can complete maintenance");
    }

    const booking = await Booking.findById(car.rentalInfo._id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.repairDescriptions = repairDescriptions;

    const invoicePath = await generateInvoice({
      _id: car.rentalInfo?._id,
      carId,
      maintenanceCost,
      userId: car.rentalInfo?.userId,
      showroomId,
      rentalStartDate: formattedRentalStartDate,
      rentalEndDate: formattedRentalEndDate,
      rentalStartTime: formattedRentalStartTime,
      rentalEndTime: formattedRentalEndTime,
      totalPrice,
      invoiceType: "Updated Invoice Generated",
      updateCount: 0,
      overdueHours: booking?.overdueHours || 0,
      overdueCharge: booking?.overdueCharge || 0,
    });

    const invoiceUrl = `http://localhost:3000/invoices/${invoicePath.invoiceName}`;

    booking.invoiceUrls.push(invoiceUrl);
    booking.currentInvoiceUrl = invoiceUrl;
    car.availability = "In Maintenance";
    car.maintenanceLogs.push({
      bookingId: car.rentalInfo._id,
      tasks: maintenanceLog,
      repairCosts: maintenanceCost,
      repairDescriptions: repairDescriptions,
    });

    // ❌❌❌ EMAIL SENDING REMOVED FROM START MAINTENANCE
    // Start maintenance pe email nahi jayegi

    await booking.save();
    await car.save();

    res
      .status(200)
      .json({ message: "Car status updated to Maintenance", car, invoiceUrl });
  } catch (error) {
    console.error("Error starting maintenance:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// // Set car status to "Available" after maintenance
// export const completeMaintenance = async (req, res) => {
//   const { id } = req.params;

//   try {
//     if (req.role !== "showroom") {
//       return res
//         .status(403)
//         .json("Access denied. Only showroom owners can complete maintenance");
//     }

//     const car = await car_Model.findById(id).populate("rentalInfo");
//     if (!car) return res.status(404).json({ message: "Car not found" });

//     const booking = await Booking.findById(car.rentalInfo._id);
//     const showroom = await signup.findById(booking.showroomId);
//     const user = await signup.findById(booking.userId);

//     // Set to pending payment so it appears in payments page
//     booking.status = "pending payment";
//     car.availability = "Pending Payment";

//     // ✅✅✅ MAINTENANCE COMPLETE EMAIL
//     if (user) {
//       const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASS,
//         },
//       });

//       // Maintenance Complete Email Template
//       const maintenanceCompleteTemplate = `
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <style>
//                 body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//                 .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; }
//                 .header { background: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
//                 .content { padding: 20px; }
//                 .footer { background: #f4f4f4; padding: 15px; text-align: center; border-radius: 0 0 10px 10px; }
//                 .details { background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0; }
//             </style>
//         </head>
//         <body>
//             <div class="container">
//                 <div class="header">
//                     <h1>🚗 Maintenance Completed</h1>
//                     <p>Your vehicle is ready for pickup!</p>
//                 </div>
//                 <div class="content">
//                     <h2>Dear ${user.ownerName || 'Customer'},</h2>
//                     <p>We're pleased to inform you that the maintenance for your rented vehicle has been completed successfully.</p>
                    
//                     <div class="details">
//                         <h3>Vehicle Details:</h3>
//                         <p><strong>Car:</strong> ${car.carBrand} ${car.carModel} (${car.year})</p>
//                         <p><strong>Plate Number:</strong> ${car.plateNumber}</p>
//                         <p><strong>Maintenance Completed On:</strong> ${new Date().toLocaleDateString()}</p>
//                     </div>

//                     <p>The vehicle is now ready for your use. Please proceed with the payment to complete the process.</p>
                    
//                     <p><strong>Next Steps:</strong></p>
//                     <ul>
//                         <li>Review the maintenance details</li>
//                         <li>Complete the payment process</li>
//                         <li>Collect your vehicle from the showroom</li>
//                     </ul>
//                 </div>
//                 <div class="footer">
//                     <p>Thank you for choosing our service!</p>
//                     <p><strong>${showroom?.showroomName || 'Car Rental Service'}</strong></p>
//                     <p>Contact: ${showroom?.contactNumber || 'N/A'} | Email: ${showroom?.email || 'N/A'}</p>
//                 </div>
//             </div>
//         </body>
//         </html>
//       `;

//       const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: user.email,
//         subject: `Maintenance Completed - ${car.carBrand} ${car.carModel}`,
//         html: maintenanceCompleteTemplate,
//         text: `Dear ${user.ownerName || 'Customer'},\n\nMaintenance for your vehicle ${car.carBrand} ${car.carModel} (${car.plateNumber}) has been completed successfully.\n\nThe vehicle is now ready for pickup. Please complete the payment process.\n\nThank you!\n${showroom?.showroomName || 'Car Rental Service'}`
//       };

//       await transporter.sendMail(mailOptions);
//       console.log('✅ Maintenance completion email sent to:', user.email);
//     }

//     await car.save();
//     await booking.save();

//     res.status(200).json({ 
//       message: "Maintenance completed. Car is now pending payment and customer notified.", 
//       car 
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// Set car status to "Available" after maintenance
export const completeMaintenance = async (req, res) => {
  const { id } = req.params;

  try {
    if (req.role !== "showroom") {
      return res
        .status(403)
        .json("Access denied. Only showroom owners can complete maintenance");
    }

    const car = await car_Model.findById(id).populate("rentalInfo");
    if (!car) return res.status(404).json({ message: "Car not found" });

    const booking = await Booking.findById(car.rentalInfo._id);

    // Set to pending payment so it appears in payments page
    booking.status = "pending payment";
    car.availability = "Pending Payment";

    // ❌❌❌ EMAIL SENDING REMOVED FROM COMPLETE MAINTENANCE
    // No email notification when maintenance is completed

    await car.save();
    await booking.save();

    res.status(200).json({ 
      message: "Maintenance completed. Car is now pending payment.", 
      car 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};


// NEW: Payment Confirmation Function with Email
export const confirmPayment = async (req, res) => {
  try {
    const { bookingId, paymentMethod } = req.body;
    
    if (!bookingId || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Booking ID and payment method are required"
      });
    }

    // Find the booking and populate related data
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

    // Update booking status to "paid"
    booking.status = "paid";
    await booking.save();

    // Update car availability to "Available"
    const car = await car_Model.findById(booking.carId._id);
    if (car) {
      car.availability = "Available";
      // Clear rental info
      car.rentalInfo = undefined;
      await car.save();
    }

    // Find and update invoice
    const invoice = await Invoice.findOne({ bookingId: bookingId });
    if (invoice) {
      invoice.isCompleted = true;
      invoice.paymentMethod = paymentMethod;
      invoice.paymentDate = new Date();
      await invoice.save();
    } else {
      // Create new invoice if doesn't exist
      await Invoice.create({
        bookingId: bookingId,
        userId: booking.userId._id,
        showroomId: booking.showroomId,
        carId: booking.carId._id,
        invoiceUrl: booking.currentInvoiceUrl || "",
        balance: booking.totalPrice + (booking.overdueCharge || 0),
        isCompleted: true,
        paymentMethod: paymentMethod,
        paymentDate: new Date()
      });
    }

    // ✅✅✅ PAYMENT CONFIRMATION EMAIL WITH PAID INVOICE
    if (booking.userId) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Generate PAID invoice with red stamp
      const paidInvoicePath = await generateInvoice({
        _id: booking._id,
        carId: booking.carId._id,
        userId: booking.userId._id,
        showroomId: booking.showroomId,
        rentalStartDate: booking.rentalStartDate,
        rentalEndDate: booking.rentalEndDate,
        rentalStartTime: booking.rentalStartTime,
        rentalEndTime: booking.rentalEndTime,
        totalPrice: booking.totalPrice,
        overdueCharge: booking.overdueCharge || 0,
        maintenanceCost: booking.maintenanceCost || {},
        invoiceType: "Payment Confirmed - Final Invoice",
        isPaid: true, // ✅ YEH RED PAID STAMP KE LIYE HAI
        paymentMethod: paymentMethod,
        paymentDate: new Date(),
        updateCount: invoice ? invoice.updateCount + 1 : 0
      });

      const paidInvoiceUrl = `http://localhost:3000/invoices/${paidInvoicePath.invoiceName}`;

      // Payment Confirmation Email Template (Same style as maintenance email)
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
                        <p><strong>Vehicle:</strong> ${booking.carId.carBrand} ${booking.carId.carModel}</p>
                        <p><strong>Payment Method:</strong> ${paymentMethod}</p>
                        <p><strong>Amount Paid:</strong> PKR ${(booking.totalPrice + (booking.overdueCharge || 0)).toLocaleString()}</p>
                        <p><strong>Payment Date:</strong> ${new Date().toLocaleDateString()}</p>
                        <p><strong>Status:</strong> <span style="color: green; font-weight: bold;">COMPLETED</span></p>
                    </div>

                    <p>Your invoice with <strong style="color: red;">PAID</strong> stamp is attached with this email.</p>
                    
                    <p><strong>Note:</strong> The attached invoice includes a red <strong style="color: red;">PAID</strong> stamp indicating successful payment confirmation.</p>
                    
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
        text: `Dear ${booking.userId.ownerName || 'Customer'},\n\nYour payment of PKR ${(booking.totalPrice + (booking.overdueCharge || 0)).toLocaleString()} has been confirmed successfully.\n\nPayment Method: ${paymentMethod}\nBooking ID: ${booking._id.toString().slice(-8)}\nVehicle: ${booking.carId.carBrand} ${booking.carId.carModel}\n\nYour invoice with PAID stamp is attached.\n\nThank you for your business!\n${booking.showroomId?.showroomName || 'Car Rental Service'}`,
        attachments: [
          {
            filename: `PAID_Invoice_${booking._id.toString().slice(-8)}.pdf`,
            path: paidInvoiceUrl,
            contentType: "application/pdf",
          },
        ],
      };

      await transporter.sendMail(mailOptions);
      console.log('✅ Payment confirmation email sent with PAID invoice');
    }

    res.status(200).json({
      success: true,
      message: "Payment confirmed successfully. Invoice marked as paid, booking status updated, car is now available, and customer notified with PAID invoice.",
      data: {
        booking: booking,
        car: car,
        invoice: invoice
      }
    });

  } catch (error) {
    console.error("Payment confirmation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to confirm payment",
      error: error.message
    });
  }
};

// Keep the old function for backward compatibility
export const markPaymentReceived = async (req, res) => {
  const { id } = req.params;

  try {
    if (req.role !== "showroom") {
      return res
        .status(403)
        .json(
          "Access denied. Only showroom owners can mark payment as received"
        );
    }

    const car = await car_Model.findById(id).populate("rentalInfo");
    if (!car) return res.status(404).json({ message: "Car not found" });

    const booking = await Booking.findById(car.rentalInfo._id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "returned";
    car.availability = "Available";

    await car.save();
    await booking.save();

    res.status(200).json({ message: "Payment marked as received", car });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get cars for guest users (public access)
export const getCarsForGuests = async (req, res) => {
  try {
    const cars = await car_Model
      .find({ availability: "Available" }) // Only show available cars
      .populate("userId", "ownerName showroomName address")
      .select('-rentalInfo -maintenanceLogs -userId._id'); // Exclude sensitive info

    return res.status(200).json({
      success: true,
      data: cars,
      message: "Cars fetched successfully for guest users"
    });
  } catch (error) {
    console.error("Error fetching cars for guests:", error);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred. Please try again later."
    });
  }
};

// Get single car details for guest users
export const getCarDetailsForGuest = async (req, res) => {
  try {
    const { id } = req.params;
    
    const car = await car_Model
      .findById(id)
      .populate("userId", "ownerName showroomName address contactNumber email")
      .select('-rentalInfo -maintenanceLogs -userId._id');

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: car,
      message: "Car details fetched successfully"
    });
  } catch (error) {
    console.error("Error fetching car details for guest:", error);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred. Please try again later."
    });
  }
};

// controllers/carsController.js - Ensure this function exists
export const getMaintenanceHistory = async (req, res) => {
  try {
    const userId = req.user;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    console.log('🔄 Fetching maintenance history for showroom:', userId);

    // Get all cars belonging to this showroom
    const showroomCars = await car_Model.find({ userId: userId });
    const carIds = showroomCars.map(car => car._id);

    console.log(`🚗 Found ${carIds.length} cars for showroom`);

    // Extract all maintenance logs from all cars
    let allMaintenanceLogs = [];

    showroomCars.forEach(car => {
      if (car.maintenanceLogs && car.maintenanceLogs.length > 0) {
        car.maintenanceLogs.forEach(log => {
          allMaintenanceLogs.push({
            _id: log._id,
            carId: car._id,
            carDetails: {
              carBrand: car.carBrand,
              carModel: car.carModel,
              plateNumber: car.plateNumber
            },
            bookingId: log.bookingId,
            tasks: log.tasks,
            repairCosts: log.repairCosts,
            repairDescriptions: log.repairDescriptions,
            date: log.date
          });
        });
      }
    });

    // Sort by date (newest first)
    allMaintenanceLogs.sort((a, b) => new Date(b.date) - new Date(a.date));

    console.log(`📋 Found ${allMaintenanceLogs.length} maintenance records`);

    res.status(200).json({
      success: true,
      message: "Maintenance history fetched successfully",
      count: allMaintenanceLogs.length,
      data: allMaintenanceLogs
    });

  } catch (error) {
    console.error("❌ Error fetching maintenance history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch maintenance history",
      error: error.message
    });
  }
};