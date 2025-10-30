import Booking from "../Model/bookingModel.js";
import Car from "../Model/Car.js";
import { generateInvoice } from "./invoiceController.js";
import moment from "moment";

// BOOKED car controller
export const bookCar = async (req, res) => {
  const {
    carId,
    showroomId,
    rentalStartDate,
    rentalStartTime,
    rentalEndDate,
    rentalEndTime,
  } = req.body;

  const userId = req.user;

  if (
    !carId ||
    !showroomId ||
    !rentalStartDate ||
    !rentalStartTime ||
    !rentalEndDate ||
    !rentalEndTime
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if the car exists
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found." });
    }

    // Check if the car is available for booking
    if (car.availability !== "Available") {
      return res
        .status(400)
        .json({ message: "Car is not available for booking." });
    }

    // Check for overlapping bookings
    const overlappingBooking = await Booking.findOne({
      carId,
      $or: [
        {
          rentalStartDate: { $lte: rentalEndDate },
          rentalEndDate: { $gte: rentalStartDate },
        },
        {
          rentalStartDate: { $gte: rentalStartDate, $lte: rentalEndDate },
        },
        {
          rentalEndDate: { $gte: rentalStartDate, $lte: rentalEndDate },
        },
      ],
    });

    if (overlappingBooking && !overlappingBooking.status === "returned") {
      return res
        .status(400)
        .json({ message: "The car is already booked for the selected dates." });
    }
    // Create Date objects from the input dates
  const rentalStartDateis = new Date(rentalStartDate);
const rentalEndDateis = new Date(rentalEndDate);
const now = new Date();
now.setHours(0, 0, 0, 0);
const CurrentDate = new Date(); // current local date and time
const [hours, minutes] = rentalStartTime.split(":").map(Number);

const userTime = new Date(CurrentDate);
userTime.setHours(hours, minutes, 0, 0);

// ✅ Ensure rental time is at least 1 hour in the future
// const oneHourLater = new Date(CurrentDate.getTime() + 60 * 60 * 1000);
const oneHourLater = new Date(CurrentDate.getTime() + 61 * 60 * 1000);


if (userTime < oneHourLater) {
  return res.status(400).json({
    message: "Rental start time must be at least 1 hour from now.",
  });
}

if (rentalStartDateis < now) {
  return res.status(400).json({
    message: "Rental start date must be in the present or future.",
  });
}

if (rentalEndDateis < now) {
  return res.status(400).json({
    message: "Rental end date must be in the present or future.",
  });
}

if (rentalStartDate === rentalEndDate) {
  return res.status(400).json({
    message: "End date must be after the start date.",
  });
}

    // Calculate the rental duration including the last day
    const rentalDuration =
      (rentalEndDateis - rentalStartDateis) / (1000 * 60 * 60 * 24);
    if (rentalDuration === 0) {
      rentalDuration = 1;
    }
    const daysRented = Math.max(0, Math.ceil(rentalDuration));
    const totalPrice = daysRented * car.rentRate;
    const formattedRentalStartDate = rentalStartDateis
      .toISOString()
      .slice(0, 10); // Sirf date tak format kiya
    const formattedRentalEndDate = rentalEndDateis.toISOString().slice(0, 10);

    // ✅ Convert rental times to 12-hour format
    const formatTimeTo12Hour = (time) => {
      const [hour, minute] = time.split(":").map(Number);
      const period = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12; // Convert hour to 12-hour format
      return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
    };

    const formattedRentalStartTime = formatTimeTo12Hour(rentalStartTime);
    const formattedRentalEndTime = formatTimeTo12Hour(rentalEndTime);

    const newBooking = new Booking({
      carId,
      userId,
      showroomId,
      rentalStartDate: formattedRentalStartDate, // "YYYY-MM-DD" format
      rentalStartTime: formattedRentalStartTime, // 12-hour format
      rentalEndDate: formattedRentalEndDate, // "YYYY-MM-DD" format
      rentalEndTime: formattedRentalEndTime, // 12-hour format
      totalPrice,
    });

    await newBooking.save();
    // create invoice

    const invoicePath = await generateInvoice({
      _id: newBooking._id,
      carId,
      userId,
      showroomId,
      rentalStartDate: formattedRentalStartDate,
      rentalEndDate: formattedRentalEndDate,
      rentalStartTime: formattedRentalStartTime,
      rentalEndTime: formattedRentalEndTime,
      totalPrice,
      invoiceType: "New Booking Invoice Generated",
      updateCount: 0,
    });
  console.log("invoice path",invoicePath)


    car.availability = "Rented Out";
    car.rentalInfo = newBooking._id;
    await car.save();

    const invoiceUrl = `http://localhost:3000/invoices/${invoicePath.invoiceName}`;

    res.status(201).json({
      message: "Car booked successfully",
      booking: newBooking,
      invoiceUrl,
    });
  } catch (error) {
    console.error("Error booking car:", error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Invalid input data.", details: error.errors });
    }
    if (error.code === 11000) {
      return res.status(409).json({ message: "Duplicate booking detected." });
    }
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};
// GET USER BOOKING
export const getUserBookings = async (req, res) => {
  console.log("Received Cookies:", req.cookies);
  console.log("Authorization Header:", req.headers.authorization);
  try {
    const userId = req.user;
    if (!userId) {
      console.log("No user ID found in request");
      return res.status(400).json({ message: "User ID is required" });
    }
    console.log("User ID in getUserBookings:", userId);

    const bookings = await Booking.find({ userId: userId })
      .populate("carId") // Assuming carId is a reference to a Car document
      .populate({
        path: "carId", // Populate car's maintenance logs if needed
        populate: {
          path: "maintenanceLogs", // Populating maintenanceLogs if it's part of the car schema
        },
      })
      .populate("showroomId", "-password"); // Populate showroom without password field

    console.log("Bookings after population:", bookings);

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No active bookings found" });
    }

    // Create an array to hold the bookings with additional details
    const bookingsWithDetails = bookings.map((booking) => ({
      ...booking.toObject(),
      carDetails: booking.carId, // Car details populated
      showroomDetails: booking.showroomId, // Showroom details populated
      startDate: booking.rentalStartDate,
      EndDate: booking.rentalEndDate,
      EndTime: booking.rentalEndTime,
      StartTime: booking.rentalStartTime,
    }));

    res.status(200).json(bookingsWithDetails);
  } catch (error) {
    console.error("Error fetching bookings:", error);

    // Check if the error is a Mongoose error
    if (error.name === "MongoError") {
      return res.status(500).json({ message: "Database error occurred" });
    }

    // Handle other types of errors
    return res.status(500).json({ message: "Server error" });
  }
};
// Update booking
export const updateBooking = async (req, res) => {
  const { bookingId } = req.params;
  let { rentalStartDate, rentalEndDate, rentalStartTime, rentalEndTime } =
    req.body;

  try {
    console.log("Booking ID:", bookingId);

    // ✅ Convert rental times to 12-hour format with AM/PM
    const formatTimeTo12Hour = (time) => {
      const [hour, minute] = time.split(":").map(Number);
      const date = new Date();
      date.setHours(hour, minute);
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    };

    // Format date and time
    rentalStartDate = new Date(rentalStartDate).toISOString().split("T")[0];
    rentalEndDate = new Date(rentalEndDate).toISOString().split("T")[0];
    rentalStartTime = formatTimeTo12Hour(rentalStartTime);
    rentalEndTime = formatTimeTo12Hour(rentalEndTime);

    // Find the booking by ID
    const booking = await Booking.findById(bookingId).populate("carId");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Calculate the current time and the rental start time
    // const currentTime = new Date();
    // const rentalStartDateTime = new Date(
    //   `${rentalStartDate} ${rentalStartTime}`
    // );

    // Restrict updates if the rental start date is less than the current date
    // if (rentalStartDateTime <= currentTime) {
    //   return res.status(400).json({
    //     message:
    //       "Rental start date must be greater than or equal to the current date.",
    //   });
    // }

    const rentalStartDateTime = new Date(`${rentalStartDate} ${rentalStartTime}`);
const currentTime = new Date();

// Get current time and add 1 hour buffer
const oneHourLater = new Date(currentTime.getTime() + 60 * 60 * 1000);

// Check if the selected rental start time is at least 1 hour after the current time
if (rentalStartDateTime < oneHourLater) {
  return res.status(400).json({
    message: "Rental start time must be at least 1 hour from now.",
  });
}


    // Restrict updates if the rental start time has already passed
    if (rentalStartDateTime <= currentTime) {
      return res.status(400).json({
        message: "You can only update the booking before the rental time.",
      });
    }

    // Update booking details if provided
    if (rentalStartDate) booking.rentalStartDate = rentalStartDate;
    if (rentalEndDate) booking.rentalEndDate = rentalEndDate;
    if (rentalStartTime) booking.rentalStartTime = rentalStartTime;
    if (rentalEndTime) booking.rentalEndTime = rentalEndTime;

    // Recalculate the rental start and end times
    const updatedRentalStartDateTime = new Date(
      `${booking.rentalStartDate} ${booking.rentalStartTime}`
    );
    const updatedRentalEndDateTime = new Date(
      `${booking.rentalEndDate} ${booking.rentalEndTime}`
    );

    // Validate the updated rental times
    if (updatedRentalEndDateTime <= updatedRentalStartDateTime) {
      return res.status(400).json({
        message: "Rental end time must be after the rental start time.",
      });
    }

    // Check for overlapping bookings
    const overlappingBooking = await Booking.findOne({
      carId: booking.carId,
      _id: { $ne: bookingId },
      $or: [
        {
          rentalStartDate: { $lte: booking.rentalEndDate },
          rentalEndDate: { $gte: booking.rentalStartDate },
        },
      ],
    });
    if (overlappingBooking) {
      return res.status(400).json({
        message: "The car is already booked for the selected dates.",
      });
    }

    // Recalculate the total price based on the updated dates and times
    const car = booking.carId;
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    const rentalDuration =
      (updatedRentalEndDateTime - updatedRentalStartDateTime) /
      (1000 * 60 * 60 * 24);
    const daysRented = Math.max(0, Math.ceil(rentalDuration));
    const totalPrice = daysRented * car.rentRate;

    booking.totalPrice = totalPrice;

    // Generate invoice
    const invoicePath = await generateInvoice({
      _id: booking._id,
      carId: booking.carId,
      userId: booking.userId,
      showroomId: booking.showroomId,
      rentalStartDate: booking.rentalStartDate,
      rentalEndDate: booking.rentalEndDate,
      rentalStartTime: booking.rentalStartTime,
      rentalEndTime: booking.rentalEndTime,
      totalPrice,
      invoiceType: "Updated Booking Invoice Generated",
      updateCount: 1,
    });
    // Save the updated booking
    const invoiceUrl = `http://localhost:3000/invoices/${invoicePath.invoiceName}`;

    booking.currentInvoiceUrl = invoiceUrl;
    booking.invoiceUrls.push(invoiceUrl);

    await booking.save();
    res.status(200).json({
      message: "Booking updated successfully",
      booking,
      invoiceUrl,
    });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ message: "Error updating booking", error });
  }
};
// // EXTEND BOOKING
// export const extendBooking = async (req, res) => {
//   const { bookingId } = req.params;
//   const { rentalEndDate, rentalEndTime } = req.body;

//   try {
//     const booking = await Booking.findById(bookingId).populate("carId");
//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found." });
//     }

//     const rentalDate = booking.rentalStartDate; // Format: 2025-03-16
//     const rentalTime = booking.rentalStartTime; // Format: 7:40 AM

//     //  Convert '7:40 AM' to 12-hour format with AM/PM
//     const rentalStartDateTime = new Date(`${rentalDate} ${rentalTime}`);
//     console.log("Formatted Rental Start DateTime:", rentalStartDateTime);

//     if (isNaN(rentalStartDateTime.getTime())) {
//       return res
//         .status(400)
//         .json({ message: "Invalid rental start date or time." });
//     }

//     if (rentalEndDate && rentalEndTime) {
//       //  Ensure time is in 12-hour format with AM/PM
//       const updatedRentalEndDateTime = new Date(
//         `${rentalEndDate} ${rentalEndTime}`
//       );

//       if (isNaN(updatedRentalEndDateTime.getTime())) {
//         return res
//           .status(400)
//           .json({ message: "Invalid rental end date or time." });
//       }

//       if (updatedRentalEndDateTime <= rentalStartDateTime) {
//         return res.status(400).json({
//           message: "Rental end time must be after the rental start time.",
//         });
//       }

//       booking.rentalEndDate = rentalEndDate;

//       //  Save time in 12-hour format with AM/PM
//       booking.rentalEndTime = updatedRentalEndDateTime.toLocaleTimeString(
//         "en-US",
//         {
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: true,
//         }
//       );
//     }

//     // Calculate total price
//     const rentalDuration =
//       (new Date(`${booking.rentalEndDate} ${booking.rentalEndTime}`) -
//         rentalStartDateTime) /
//       (1000 * 60 * 60 * 24);
//     const daysRented = Math.max(1, Math.ceil(rentalDuration));
//     const totalPrice = daysRented * booking.carId.rentRate;

//     if (isNaN(totalPrice) || totalPrice <= 0) {
//       return res
//         .status(400)
//         .json({ message: "Failed to calculate total price." });
//     }

//     booking.totalPrice = totalPrice;
//     await booking.save();

//     //  Generate invoice
//     const invoicePath = await generateInvoice({
//       _id: booking._id,
//       carId: booking.carId,
//       userId: booking.userId,
//       showroomId: booking.showroomId,
//       rentalStartDate: booking.rentalStartDate,
//       rentalEndDate: booking.rentalEndDate,
//       rentalStartTime: booking.rentalStartTime,
//       rentalEndTime: booking.rentalEndTime,
//       totalPrice,
//       invoiceType: "Extend Booking Invoice Generated",
//       updateCount: 2,
//     });

//     const invoiceUrl = `http://localhost:3000/invoices/${invoicePath.invoiceName}`;

//     booking.currentInvoiceUrl = invoiceUrl;
//     booking.invoiceUrls.push(invoiceUrl);
//     await booking.save();

//     res.status(200).json({
//       message: "Booking extended successfully",
//       booking,
//       invoiceUrl,
//     });
//   } catch (error) {
//     console.error("Error extending booking:", error);
//     res
//       .status(500)
//       .json({ message: "Error extending booking", error: error.message });
//   }
// };

// EXTEND BOOKING
export const extendBooking = async (req, res) => {
  const { bookingId } = req.params;
  const { rentalEndDate, rentalEndTime } = req.body;

  try {
    const booking = await Booking.findById(bookingId).populate("carId");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    const rentalDate = booking.rentalStartDate; // Format: 2025-03-16
    const rentalTime = booking.rentalStartTime; // Format: 7:40 AM

    // Convert '7:40 AM' to 12-hour format with AM/PM
    const rentalStartDateTime = new Date(`${rentalDate} ${rentalTime}`);
    console.log("Formatted Rental Start DateTime:", rentalStartDateTime);

    if (isNaN(rentalStartDateTime.getTime())) {
      return res
        .status(400)
        .json({ message: "Invalid rental start date or time." });
    }

    // ✅ GET CURRENT END DATE & TIME
    const currentEndDate = booking.rentalEndDate;
    const currentEndTime = booking.rentalEndTime;
    const currentEndDateTime = new Date(`${currentEndDate} ${currentEndTime}`);
    console.log("Current End DateTime:", currentEndDateTime);

    if (rentalEndDate && rentalEndTime) {
      // Ensure time is in 12-hour format with AM/PM
      const updatedRentalEndDateTime = new Date(
        `${rentalEndDate} ${rentalEndTime}`
      );

      if (isNaN(updatedRentalEndDateTime.getTime())) {
        return res
          .status(400)
          .json({ message: "Invalid rental end date or time." });
      }

      // ✅ CHECK 1: New end date must be after start date
      if (updatedRentalEndDateTime <= rentalStartDateTime) {
        return res.status(400).json({
          message: "Rental end time must be after the rental start time.",
        });
      }

      // ✅ CHECK 2: New end date must be after CURRENT end date
      if (updatedRentalEndDateTime <= currentEndDateTime) {
        return res.status(400).json({
          message: "New rental end date must be after the current end date.",
        });
      }

      booking.rentalEndDate = rentalEndDate;

      // Save time in 12-hour format with AM/PM
      booking.rentalEndTime = updatedRentalEndDateTime.toLocaleTimeString(
        "en-US",
        {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }
      );
    }

    // Calculate total price based on NEW extended duration
    const rentalDuration =
      (new Date(`${booking.rentalEndDate} ${booking.rentalEndTime}`) -
        rentalStartDateTime) /
      (1000 * 60 * 60 * 24);
    const daysRented = Math.max(1, Math.ceil(rentalDuration));
    const totalPrice = daysRented * booking.carId.rentRate;

    if (isNaN(totalPrice) || totalPrice <= 0) {
      return res
        .status(400)
        .json({ message: "Failed to calculate total price." });
    }

    booking.totalPrice = totalPrice;
    await booking.save();

    // Generate invoice
    const invoicePath = await generateInvoice({
      _id: booking._id,
      carId: booking.carId,
      userId: booking.userId,
      showroomId: booking.showroomId,
      rentalStartDate: booking.rentalStartDate,
      rentalEndDate: booking.rentalEndDate,
      rentalStartTime: booking.rentalStartTime,
      rentalEndTime: booking.rentalEndTime,
      totalPrice,
      invoiceType: "Extend Booking Invoice Generated",
      updateCount: 2,
    });

    const invoiceUrl = `http://localhost:3000/invoices/${invoicePath.invoiceName}`;

    booking.currentInvoiceUrl = invoiceUrl;
    booking.invoiceUrls.push(invoiceUrl);
    await booking.save();

    res.status(200).json({
      message: "Booking extended successfully",
      booking,
      invoiceUrl,
    });
  } catch (error) {
    console.error("Error extending booking:", error);
    res
      .status(500)
      .json({ message: "Error extending booking", error: error.message });
  }
};

// GET BOOKING DETAIL Date AND TIME
export const GetBookingDetail = async (req, res) => {
  const { bookingId } = req.params;
  const userId = req.user;
  console.log("User ID in request:", userId);
  console.log("Booking ID in request:", bookingId);
  try {
    const booking = await Booking.findById(bookingId).populate("carId");
    console.log("booking", booking);

    if (!booking || booking.userId.toString() !== userId) {
      return res
        .status(404)
        .json({ message: "Booking not found or unauthorized access." });
    }

    const carImages = booking.carId?.images;

    console.log("response", booking);
    return res.status(200).json({
      _id: booking._id,
      rentalStartDate: booking.rentalStartDate,
      rentalEndDate: booking.rentalEndDate,
      rentalStartTime: booking.rentalStartTime,
      rentalEndTime: booking.rentalEndTime,
      totalPrice: booking.totalPrice,
      images: carImages,
    });
  } catch (error) {
    console.error("Error fetching booking details:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

// CANCEL BOOKING
export const cancelBooking = async (req, res) => {
  const { bookingId } = req.params;
  const userId = req.user;

  console.log("User ID in request:", userId);
  console.log("Booking ID in request:", bookingId);

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking || booking.userId.toString() !== userId) {
      return res
        .status(404)
        .json({ message: "Booking not found or unauthorized access." });
    }

    if (booking.carId) {
      const car = await Car.findById(booking.carId);
      if (car) {
        car.availability = "Available";
        await car.save();
      }
    }

    const deletedBooking = await Booking.findByIdAndDelete(bookingId);
    if (!deletedBooking) {
      return res.status(500).json({ message: "Failed to delete booking." });
    }

    return res.status(200).json({ message: "Booking canceled successfully." });
  } catch (error) {
    console.error("Error canceling booking:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

// // RETURN A CAR
// export const returnCar = async (req, res) => {
//   try {
//     const { BookingId } = req.params;
//     console.log("bookingId", BookingId);

//     // Populate carId
//     const booking = await Booking.findById(BookingId).populate("carId");
//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     const car = await Car.findById(booking.carId._id);
//     if (!car) {
//       return res.status(404).json({ message: "Car not found" });
//     }

//     if (car.availability === "Available") {
//       return res.status(400).json({ message: "Car is already available" });
//     }

//     // Calculate overdue time and charges
//     const rentalEndDateTime = moment(
//       `${booking.rentalEndDate} ${booking.rentalEndTime}`,
//       "YYYY-MM-DD h:mm A"
//     ).toDate();
//     if (isNaN(rentalEndDateTime)) {
//       return res
//         .status(400)
//         .json({ message: "Invalid rental end date or time" });
//     }

//     console.log("Rental End DateTime:", rentalEndDateTime);

//     // Use a realistic return time after rentalEndDateTime for testing
//     const currentDateTime = moment().toDate(); // Replace with actual return time
//     if (isNaN(currentDateTime)) {
//       return res.status(400).json({ message: "Invalid current date or time" });
//     }

//     console.log("Current DateTime:", currentDateTime);

//     const diffInMs = currentDateTime - rentalEndDateTime;
//     const diffInHours = diffInMs / (1000 * 60 * 60); // Convert ms to hours

//     let overdueHours = 0;
//     let overdueCharge = 0;

//     if (diffInHours > 1) {
//       overdueHours = Math.ceil(diffInHours - 1);
//       overdueCharge = overdueHours * 500;
//     } else if (diffInHours < 0) {
//       return res
//         .status(400)
//         .json({ message: "Car cannot be returned before rental end time" });
//     }

//     // Update car availability
//     car.availability = "Pending Return";
//     booking.status = "return initiated";

//     // Store overdue details in the booking
//     booking.overdueHours = overdueHours;
//     booking.overdueCharge = overdueCharge;

//     await booking.save();
//     await car.save();

//     return res.status(200).json({
//       message: "Return request sent to showroom owner for approval",
//       overdueHours,
//       overdueCharge,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Something went wrong", error });
//   }
// };

// RETURN A CAR - COMPLETE RETURN TO MAINTENANCE
export const returnCar = async (req, res) => {
  try {
    const { BookingId } = req.params;
    console.log("🔧 Completing return to maintenance for booking:", BookingId);

    // Populate carId
    const booking = await Booking.findById(BookingId).populate("carId");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const car = await Car.findById(booking.carId._id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Check if car is already in maintenance
    if (car.availability === "In Maintenance") {
      return res.status(400).json({ message: "Car is already in maintenance" });
    }

    // Calculate overdue time and charges
    const rentalEndDateTime = moment(
      `${booking.rentalEndDate} ${booking.rentalEndTime}`,
      "YYYY-MM-DD h:mm A"
    );
    
    const currentDateTime = moment();
    const diffInMs = currentDateTime.diff(rentalEndDateTime);
    const diffInHours = diffInMs / (1000 * 60 * 60);

    let overdueHours = 0;
    let overdueCharge = 0;

    if (diffInHours > 0) {
      overdueHours = Math.ceil(diffInHours);
      overdueCharge = overdueHours * 500;
    }

    // ✅ MOVE CAR TO "IN MAINTENANCE"
    car.availability = "In Maintenance";
    car.rentalInfo = null;
    
    // ✅ UPDATE BOOKING STATUS TO "returned"
    booking.status = "returned";
    booking.actualReturnDate = new Date();
    booking.overdueHours = overdueHours;
    booking.overdueCharge = overdueCharge;
    booking.autoReturnInitiated = true;

    await car.save();
    await booking.save();

    console.log(`✅ Car ${car.carBrand} ${car.carModel} moved to maintenance for booking ${BookingId}`);
    console.log(`⏰ Overdue: ${overdueHours} hours, Charge: PKR ${overdueCharge}`);

    // Generate final invoice
    try {
      const invoicePath = await generateInvoice({
        _id: booking._id,
        carId: booking.carId,
        userId: booking.userId,
        showroomId: booking.showroomId,
        rentalStartDate: booking.rentalStartDate,
        rentalEndDate: booking.rentalEndDate,
        rentalStartTime: booking.rentalStartTime,
        rentalEndTime: booking.rentalEndTime,
        totalPrice: booking.totalPrice + overdueCharge,
        overdueHours: overdueHours,
        overdueCharge: overdueCharge,
        invoiceType: "Final Return Invoice",
        updateCount: 3,
      });

      const invoiceUrl = `http://localhost:3000/invoices/${invoicePath.invoiceName}`;
      booking.currentInvoiceUrl = invoiceUrl;
      booking.invoiceUrls.push(invoiceUrl);
      await booking.save();
      
      console.log(`📄 Final invoice generated for booking ${BookingId}`);
    } catch (invoiceError) {
      console.error("❌ Error generating final invoice:", invoiceError);
    }

    return res.status(200).json({
      message: "Car successfully returned to maintenance",
      overdueHours,
      overdueCharge,
      totalCharges: booking.totalPrice + overdueCharge,
      returnedAt: booking.actualReturnDate
    });

  } catch (error) {
    console.log("❌ Error in return car process:", error);
    res.status(500).json({ message: "Something went wrong during return process", error });
  }
};


// GET CURRENT ACTIVE BOOKING
export const getCurrentBooking = async (req, res) => {
  try {
    const userId = req.user;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // ✅ Find booking where car is currently rented out by this user
    const booking = await Booking.find({
      userId: userId,
      status: { $ne: "returned" }, // Not yet returned
    })
      .populate("carId")
      .populate("showroomId", "-password");

    if (!booking) {
      return res
        .status(404)
        .json({ message: "No active booking found for this user" });
    }

    res.status(200).json({
      booking: {
        _id: booking._id,
        car: booking.carId?.model || "Unknown Car",
        plate: booking.carId?.plateNumber || "N/A",
        engineNo: booking.carId?.engineNo || "N/A",
        chassisNo: booking.carId?.chassisNo || "N/A",
        pickupLocation: booking.showroomId?.name || "N/A",
        customer: userId,
        rentalStartDate: booking.rentalStartDate,
        rentalEndDate: booking.rentalEndDate,
        rentalStartTime: booking.rentalStartTime,
        rentalEndTime: booking.rentalEndTime,
      },
    });
  } catch (error) {
    console.error("Error fetching current booking:", error);
    return res.status(500).json({
      message: "Failed to fetch current booking",
      error: error.message,
    });
  }
};

// ✅ GET SHOWROOM BOOKINGS
export const getShowroomBookings = async (req, res) => {
  try {
    const showroomId = req.user; // logged-in showroom ID
    console.log("🏢 Fetching bookings for showroom:", showroomId);

    // Step 1: Get all cars belonging to this showroom
    const showroomCars = await Car.find({ userId: showroomId }).select("_id");
    const carIds = showroomCars.map(car => car._id);
    console.log(`🚗 Found ${carIds.length} cars for showroom`);

    // Step 2: Get all bookings for these cars
    const bookings = await Booking.find({ carId: { $in: carIds } })
      .populate("userId", "name email contactNumber address") // customer details
      .populate({
        path: "carId",
        select: "carBrand carModel year plateNumber images rentRate color fuelType transmission seatCapacity engineNo chassisNo mileage bodyType"
      })
      .populate({
        path: "showroomId",
        select: "showroomName ownerName address contactNumber email"
      })
      .sort({ createdAt: -1 });

    console.log(`📋 Found ${bookings.length} bookings for showroom cars`);

    // Optional: Log some details for debugging
    bookings.forEach((booking, index) => {
      console.log(`🚘 Booking ${index + 1}:`, {
        _id: booking._id,
        status: booking.status,
        rentalDates: `${booking.rentalStartDate} to ${booking.rentalEndDate}`,
        customer: booking.userId ? {
          name: booking.userId.name,
          email: booking.userId.email,
          contact: booking.userId.contactNumber
        } : "No customer data",
        car: booking.carId ? {
          brand: booking.carId.carBrand,
          model: booking.carId.carModel,
          plate: booking.carId.plateNumber
        } : "No car data"
      });
    });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
      message: "Showroom bookings fetched successfully"
    });
  } catch (error) {
    console.error("❌ Error fetching showroom bookings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch showroom bookings",
      error: error.message
    });
  }
};
