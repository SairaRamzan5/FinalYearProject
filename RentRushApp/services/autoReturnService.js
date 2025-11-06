// // import cron from "node-cron";
// // import Booking from "../Model/bookingModel.js";
// // import moment from "moment";

// // export const startAutoReturnService = () => {
// //   console.log("🚗 Auto-return service started...");

// //   // Run every 30 seconds
// //   cron.schedule("*/30 * * * * *", async () => {
// //     console.log("🕒 Checking overdue bookings...");
// //     await autoInitiateReturns();
// //   });
// // };

// // const autoInitiateReturns = async () => {
// //   try {
// //     const currentDateTime = moment();

// //     const expiredBookings = await Booking.find({
// //       status: { $in: ["pending", "approved", "active"] },
// //       $or: [
// //         { rentalEndDate: { $lt: currentDateTime.format("YYYY-MM-DD") } },
// //         {
// //           rentalEndDate: currentDateTime.format("YYYY-MM-DD"),
// //           rentalEndTime: { $lt: currentDateTime.format("hh:mm A") },
// //         },
// //       ],
// //     });

// //     if (expiredBookings.length > 0) {
// //       console.log(`📦 Found ${expiredBookings.length} bookings to auto-initiate return.`);
// //     }

// //     for (const booking of expiredBookings) {
// //       booking.status = "return initiated";
// //       booking.autoReturnInitiated = true;
// //       booking.returnInitiatedAt = new Date();
// //       await booking.save();

// //       console.log(`✅ Booking ${booking._id} marked as "return initiated" automatically.`);
// //     }
// //   } catch (error) {
// //     console.error("❌ Error in auto-return initiation process:", error);
// //   }
// // };

// // autoReturnService.js - FIXED VERSION
// import cron from "node-cron";
// import Booking from "../Model/bookingModel.js";
// import Car from "../Model/Car.js";
// import moment from "moment";

// export const startAutoReturnService = () => {
//   console.log("🚗 Complete auto-return service started...");

//   // Run every minute to check for bookings
//   cron.schedule("* * * * *", async () => {
//     console.log("🕒 Checking for bookings to auto-process...");
//     try {
//       await autoInitiateReturns();
//       await autoCompleteReturns();
//     } catch (error) {
//       console.error("❌ Error in auto-return service:", error);
//     }
//   });
// };

// // Step 1: Auto initiate returns - FIXED
// const autoInitiateReturns = async () => {
//   try {
//     const currentDateTime = moment();
//     console.log(`🔍 Auto-initiate check at: ${currentDateTime.format()}`);

//     // Find bookings that should be auto-initiated
//     const bookingsToInitiate = await Booking.find({
//       status: { $in: ["pending", "approved", "active"] },
//       autoReturnInitiated: { $ne: true }
//     }).populate("carId");

//     console.log(`📋 Found ${bookingsToInitiate.length} bookings to check`);

//     for (const booking of bookingsToInitiate) {
//       try {
//         // Create moment objects for comparison
//         const rentalEndMoment = moment(
//           `${booking.rentalEndDate} ${booking.rentalEndTime}`,
//           "YYYY-MM-DD h:mm A"
//         );

//         console.log(`📅 Booking ${booking._id}:`);
//         console.log(`   End: ${rentalEndMoment.format()}`);
//         console.log(`   Now: ${currentDateTime.format()}`);
//         console.log(`   Is Past: ${currentDateTime.isAfter(rentalEndMoment)}`);

//         // Check if rental period has ended
//         if (currentDateTime.isAfter(rentalEndMoment)) {
//           // ✅ AUTO INITIATE RETURN
//           booking.status = "return initiated";
//           booking.autoReturnInitiated = true;
//           booking.returnInitiatedAt = new Date();

//           // Calculate overdue charges
//           const diffInMs = currentDateTime.diff(rentalEndMoment);
//           const diffInHours = diffInMs / (1000 * 60 * 60);
          
//           let overdueHours = 0;
//           let overdueCharge = 0;

//           if (diffInHours > 0) {
//             overdueHours = Math.ceil(diffInHours);
//             overdueCharge = overdueHours * 500; // ₹500 per hour overdue
//           }

//           booking.overdueHours = overdueHours;
//           booking.overdueCharge = overdueCharge;

//           await booking.save();

//           // Update car status
//           const car = await Car.findById(booking.carId._id);
//           if (car) {
//             car.availability = "Pending Return";
//             await car.save();
//           }

//           console.log(`✅ Booking ${booking._id} auto-initiated return`);
//           console.log(`   Overdue: ${overdueHours} hours, Charge: ₹${overdueCharge}`);
//         }
//       } catch (bookingError) {
//         console.error(`❌ Error auto-initiating return for booking ${booking._id}:`, bookingError);
//       }
//     }
//   } catch (error) {
//     console.error("❌ Error in auto-initiate returns:", error);
//   }
// };

// // Step 2: Auto complete returns (move to maintenance) - FIXED
// const autoCompleteReturns = async () => {
//   try {
//     const currentDateTime = moment();
//     console.log(`🔍 Auto-complete check at: ${currentDateTime.format()}`);

//     // Find return initiated bookings that should be completed
//     const initiatedBookings = await Booking.find({
//       status: "return initiated",
//       actualReturnDate: { $exists: false }
//     }).populate("carId");

//     console.log(`📋 Found ${initiatedBookings.length} initiated bookings`);

//     for (const booking of initiatedBookings) {
//       try {
//         const car = await Car.findById(booking.carId._id);
//         if (!car) continue;

//         // ✅ AUTO COMPLETE RETURN - MOVE TO MAINTENANCE
//         car.availability = "In Maintenance";
//         car.rentalInfo = null;
        
//         booking.status = "returned";
//         booking.actualReturnDate = new Date();

//         await car.save();
//         await booking.save();

//         console.log(`✅ Car ${car.carBrand} ${car.carModel} auto-returned to maintenance`);
//         console.log(`   Booking ${booking._id} marked as returned`);
        
//       } catch (bookingError) {
//         console.error(`❌ Error auto-completing return for booking ${booking._id}:`, bookingError);
//       }
//     }
//   } catch (error) {
//     console.error("❌ Error in auto-complete returns:", error);
//   }
// };


// // import cron from "node-cron";
// // import Booking from "../Model/bookingModel.js";
// // import Car from "../Model/Car.js";
// // import moment from "moment";

// // export const startAutoReturnService = () => {
// //   console.log("🚗 Auto-return service started...");

// //   // Run every 30 seconds
// //   cron.schedule("*/30 * * * * *", async () => {
// //     console.log("🕒 Checking overdue bookings...");
// //     await autoInitiateReturns();
// //   });
// // };

// // const autoInitiateReturns = async () => {
// //   try {
// //     const currentDateTime = moment();

// //     const expiredBookings = await Booking.find({
// //       status: { $in: ["pending", "approved", "active"] },
// //       $or: [
// //         { rentalEndDate: { $lt: currentDateTime.format("YYYY-MM-DD") } },
// //         {
// //           rentalEndDate: currentDateTime.format("YYYY-MM-DD"),
// //           rentalEndTime: { $lt: currentDateTime.format("hh:mm A") },
// //         },
// //       ],
// //     }).populate("carId");

// //     if (expiredBookings.length > 0) {
// //       console.log(`📦 Found ${expiredBookings.length} bookings to auto-return.`);
// //     }

// //     for (const booking of expiredBookings) {
// //       await processAutoReturn(booking);
// //     }
// //   } catch (error) {
// //     console.error("❌ Error in auto-return process:", error);
// //   }
// // };

// // // This function actually performs the return logic
// // const processAutoReturn = async (booking) => {
// //   try {
// //     const car = booking.carId;
// //     if (!car || car.availability === "Available") return;

// //     const rentalEndDateTime = moment(
// //       `${booking.rentalEndDate} ${booking.rentalEndTime}`,
// //       "YYYY-MM-DD h:mm A"
// //     ).toDate();

// //     const currentDateTime = new Date();
// //     const diffInMs = currentDateTime - rentalEndDateTime;
// //     const diffInHours = diffInMs / (1000 * 60 * 60);

// //     let overdueHours = 0;
// //     let overdueCharge = 0;

// //     if (diffInHours > 1) {
// //       overdueHours = Math.ceil(diffInHours - 1);
// //       overdueCharge = overdueHours * 500;
// //     }

// //     car.availability = "Pending Return";
// //     booking.status = "return initiated";
// //     booking.overdueHours = overdueHours;
// //     booking.overdueCharge = overdueCharge;
// //     booking.autoReturnInitiated = true;
// //     booking.returnInitiatedAt = new Date();

// //     await booking.save();
// //     await car.save();

// //     console.log(`✅ Booking ${booking._id} auto-return processed successfully.`);
// //   } catch (error) {
// //     console.error(`❌ Error processing booking ${booking._id}:`, error);
// //   }
// // };


// autoReturnService.js - FIXED VERSION WITH 1-HOUR GRACE PERIOD
import cron from "node-cron";
import Booking from "../Model/bookingModel.js";
import Car from "../Model/Car.js";
import moment from "moment";

export const startAutoReturnService = () => {
  console.log("🚗 Auto-return service started with 1-hour grace period...");

  // Run every minute to check for bookings
  cron.schedule("* * * * *", async () => {
    console.log("🕒 Checking for bookings to auto-process...");
    try {
      await autoInitiateReturns();
      await autoCompleteReturns();
    } catch (error) {
      console.error("❌ Error in auto-return service:", error);
    }
  });
};

// Step 1: Auto initiate returns - FIXED WITH 1-HOUR GRACE PERIOD
const autoInitiateReturns = async () => {
  try {
    const currentDateTime = moment();
    console.log(`🔍 Auto-initiate check at: ${currentDateTime.format()}`);

    // Find bookings that should be auto-initiated
    const bookingsToInitiate = await Booking.find({
      status: { $in: ["pending", "approved", "active"] },
      autoReturnInitiated: { $ne: true }
    }).populate("carId");

    console.log(`📋 Found ${bookingsToInitiate.length} bookings to check`);

    for (const booking of bookingsToInitiate) {
      try {
        // Create moment objects for comparison
        const rentalEndMoment = moment(
          `${booking.rentalEndDate} ${booking.rentalEndTime}`,
          "YYYY-MM-DD h:mm A"
        );

        // ✅ ADD 1-HOUR GRACE PERIOD
        const gracePeriodEndMoment = rentalEndMoment.clone().add(1, 'hour');

        console.log(`📅 Booking ${booking._id}:`);
        console.log(`   End: ${rentalEndMoment.format()}`);
        console.log(`   Grace Period Ends: ${gracePeriodEndMoment.format()}`);
        console.log(`   Now: ${currentDateTime.format()}`);
        console.log(`   Is Past Grace Period: ${currentDateTime.isAfter(gracePeriodEndMoment)}`);

        // Check if current time is AFTER the 1-hour grace period
        if (currentDateTime.isAfter(gracePeriodEndMoment)) {
          // ✅ AUTO INITIATE RETURN (only after grace period)
          booking.status = "return initiated";
          booking.autoReturnInitiated = true;
          booking.returnInitiatedAt = new Date();

          // ✅ CALCULATE OVERDUE CHARGES AFTER 1-HOUR GRACE PERIOD
          const diffInMs = currentDateTime.diff(gracePeriodEndMoment); // Start counting from end of grace period
          const diffInHours = diffInMs / (1000 * 60 * 60);
          
          let overdueHours = 0;
          let overdueCharge = 0;

          if (diffInHours > 0) {
            overdueHours = Math.ceil(diffInHours);
            overdueCharge = overdueHours * 500; // ₹500 per hour overdue
          }

          booking.overdueHours = overdueHours;
          booking.overdueCharge = overdueCharge;

          await booking.save();

          // Update car status
          const car = await Car.findById(booking.carId._id);
          if (car) {
            car.availability = "Pending Return";
            await car.save();
          }

          console.log(`✅ Booking ${booking._id} auto-initiated return`);
          console.log(`   Overdue: ${overdueHours} hours, Charge: ₹${overdueCharge}`);
          console.log(`   Grace period ended at: ${gracePeriodEndMoment.format()}`);
        } else if (currentDateTime.isAfter(rentalEndMoment)) {
          // Within grace period - just log, no charges
          console.log(`⏳ Booking ${booking._id} is within 1-hour grace period`);
        }
      } catch (bookingError) {
        console.error(`❌ Error auto-initiating return for booking ${booking._id}:`, bookingError);
      }
    }
  } catch (error) {
    console.error("❌ Error in auto-initiate returns:", error);
  }
};

// Step 2: Auto complete returns (move to maintenance) - UNCHANGED
const autoCompleteReturns = async () => {
  try {
    const currentDateTime = moment();
    console.log(`🔍 Auto-complete check at: ${currentDateTime.format()}`);

    // Find return initiated bookings that should be completed
    const initiatedBookings = await Booking.find({
      status: "return initiated",
      actualReturnDate: { $exists: false }
    }).populate("carId");

    console.log(`📋 Found ${initiatedBookings.length} initiated bookings`);

    for (const booking of initiatedBookings) {
      try {
        const car = await Car.findById(booking.carId._id);
        if (!car) continue;

        // ✅ AUTO COMPLETE RETURN - MOVE TO MAINTENANCE
        car.availability = "In Maintenance";
        car.rentalInfo = null;
        
        booking.status = "returned";
        booking.actualReturnDate = new Date();

        await car.save();
        await booking.save();

        console.log(`✅ Car ${car.carBrand} ${car.carModel} auto-returned to maintenance`);
        console.log(`   Booking ${booking._id} marked as returned`);
        
      } catch (bookingError) {
        console.error(`❌ Error auto-completing return for booking ${booking._id}:`, bookingError);
      }
    }
  } catch (error) {
    console.error("❌ Error in auto-complete returns:", error);
  }
};