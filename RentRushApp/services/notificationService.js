// // services/notificationService.js
// import cron from 'node-cron';
// import Booking from '../Model/bookingModel.js';
// import { sendBookingReminder } from '../Controller/notificationController.js';
// import moment from 'moment';

// // Check for upcoming booking endings every minute
// const startBookingReminderService = () => {
//   console.log('Starting booking reminder service...');

//   // Run every minute
//   cron.schedule('* * * * *', async () => {
//     try {
//       const now = moment();
//       const thirtyMinutesFromNow = moment().add(30, 'minutes');

//       // Find active bookings that end in the next 30 minutes
//       const upcomingBookings = await Booking.find({
//         status: 'active',
//         rentalEndDate: { $lte: thirtyMinutesFromNow.format('YYYY-MM-DD') },
//         $or: [
//           { reminderSent: { $exists: false } },
//           { reminderSent: false }
//         ]
//       }).populate('carId').populate('userId').populate('showroomId');

//       for (const booking of upcomingBookings) {
//         const bookingEndTime = moment(`${booking.rentalEndDate} ${booking.rentalEndTime}`, 'YYYY-MM-DD h:mm A');
//         const timeDiff = bookingEndTime.diff(now, 'minutes');

//         // Send reminder if between 25-35 minutes remaining (buffer for cron timing)
//         if (timeDiff >= 25 && timeDiff <= 35) {
//           try {
//             await sendBookingReminder(booking._id);
            
//             // Mark reminder as sent
//             booking.reminderSent = true;
//             booking.reminderSentAt = new Date();
//             await booking.save();

//             console.log(`Booking reminder sent for: ${booking._id}`);
//           } catch (error) {
//             console.error(`Failed to send reminder for booking ${booking._id}:`, error);
//           }
//         }
//       }
//     } catch (error) {
//       console.error('Error in booking reminder service:', error);
//     }
//   });
// };

// // Check for upcoming bookings starting soon (24 hours before)
// const startBookingStartReminderService = () => {
//   console.log('Starting booking start reminder service...');

//   // Run every hour
//   cron.schedule('0 * * * *', async () => {
//     try {
//       const twentyFourHoursFromNow = moment().add(24, 'hours');

//       const upcomingBookings = await Booking.find({
//         status: { $in: ['approved', 'active'] },
//         rentalStartDate: { $lte: twentyFourHoursFromNow.format('YYYY-MM-DD') },
//         startReminderSent: { $ne: true }
//       }).populate('carId').populate('userId');

//       for (const booking of upcomingBookings) {
//         const bookingStartTime = moment(`${booking.rentalStartDate} ${booking.rentalStartTime}`, 'YYYY-MM-DD h:mm A');
//         const timeDiff = bookingStartTime.diff(moment(), 'hours');

//         // Send reminder if between 23-25 hours before start
//         if (timeDiff >= 23 && timeDiff <= 25) {
//           try {
//             // Implement start reminder logic here
//             console.log(`Booking starts in 24 hours: ${booking._id}`);
            
//             booking.startReminderSent = true;
//             await booking.save();
//           } catch (error) {
//             console.error(`Failed to send start reminder for booking ${booking._id}:`, error);
//           }
//         }
//       }
//     } catch (error) {
//       console.error('Error in booking start reminder service:', error);
//     }
//   });
// };

// export {
//   startBookingReminderService,
//   startBookingStartReminderService
// };

// services/notificationService.js
import cron from 'node-cron';
import Booking from '../Model/bookingModel.js';
import { sendBookingReminder } from '../Controller/notificationController.js';
import moment from 'moment';

// Check for upcoming booking endings every minute
const startBookingReminderService = () => {
  console.log('Starting booking reminder service...');

  // Run every minute
  cron.schedule('* * * * *', async () => {
    try {
      const now = moment();
      const thirtyMinutesFromNow = moment().add(30, 'minutes');

      // Find active bookings that end in the next 30 minutes
      const upcomingBookings = await Booking.find({
        status: 'active',
        rentalEndDate: { $lte: thirtyMinutesFromNow.format('YYYY-MM-DD') },
        $or: [
          { reminderSent: { $exists: false } },
          { reminderSent: false }
        ]
      }).populate('carId').populate('userId').populate('showroomId');

      console.log(`Found ${upcomingBookings.length} bookings ending soon`);

      for (const booking of upcomingBookings) {
        const bookingEndTime = moment(`${booking.rentalEndDate} ${booking.rentalEndTime}`, 'YYYY-MM-DD h:mm A');
        const timeDiff = bookingEndTime.diff(now, 'minutes');

        // Send reminder if between 25-35 minutes remaining (buffer for cron timing)
        if (timeDiff >= 25 && timeDiff <= 35) {
          try {
            await sendBookingReminder(booking._id);
            
            // Mark reminder as sent
            booking.reminderSent = true;
            booking.reminderSentAt = new Date();
            await booking.save();

            console.log(`Booking reminder sent for booking ${booking._id} to both customer and showroom`);
          } catch (error) {
            console.error(`Failed to send reminder for booking ${booking._id}:`, error);
          }
        }
      }
    } catch (error) {
      console.error('Error in booking reminder service:', error);
    }
  });
};

// Check for upcoming bookings starting soon (24 hours before)
const startBookingStartReminderService = () => {
  console.log('Starting booking start reminder service...');

  // Run every hour
  cron.schedule('0 * * * *', async () => {
    try {
      const twentyFourHoursFromNow = moment().add(24, 'hours');

      const upcomingBookings = await Booking.find({
        status: { $in: ['approved', 'active'] },
        rentalStartDate: { $lte: twentyFourHoursFromNow.format('YYYY-MM-DD') },
        startReminderSent: { $ne: true }
      }).populate('carId').populate('userId');

      for (const booking of upcomingBookings) {
        const bookingStartTime = moment(`${booking.rentalStartDate} ${booking.rentalStartTime}`, 'YYYY-MM-DD h:mm A');
        const timeDiff = bookingStartTime.diff(moment(), 'hours');

        // Send reminder if between 23-25 hours before start
        if (timeDiff >= 23 && timeDiff <= 25) {
          try {
            // Implement start reminder logic here
            console.log(`Booking starts in 24 hours: ${booking._id}`);
            
            booking.startReminderSent = true;
            await booking.save();
          } catch (error) {
            console.error(`Failed to send start reminder for booking ${booking._id}:`, error);
          }
        }
      }
    } catch (error) {
      console.error('Error in booking start reminder service:', error);
    }
  });
};

export {
  startBookingReminderService,
  startBookingStartReminderService
};