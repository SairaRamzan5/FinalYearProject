// // // routes/notificationRoutes.js
// // import express from 'express';
// // const router = express.Router();
// // import {
// //   sendBookingReminder,
// //   sendBookingConfirmation,
// //   sendCarReturnNotification,
// //   sendMaintenanceNotification,
// //   getUserNotifications,
// //   markAsRead,
// //   markAllAsRead,
// //   deleteNotification,
// //   getUnreadCount
// // } from '../Controller/notificationController.js';

// // // Get notifications for user
// // router.get('/user/:userId', getUserNotifications);

// // // Get unread notification count
// // router.get('/unread-count/:userId', getUnreadCount);

// // // Mark notification as read
// // router.patch('/read/:notificationId', markAsRead);

// // // Mark all notifications as read
// // router.patch('/read-all/:userId', markAllAsRead);

// // // Delete notification
// // router.delete('/:notificationId', deleteNotification);

// // // Send booking reminder (for testing/internal use)
// // router.post('/booking-reminder/:bookingId', async (req, res) => {
// //   try {
// //     const result = await sendBookingReminder(req.params.bookingId);
// //     res.status(200).json(result);
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message
// //     });
// //   }
// // });

// // // Send booking confirmation (for testing/internal use)
// // router.post('/booking-confirmation/:bookingId', async (req, res) => {
// //   try {
// //     const result = await sendBookingConfirmation(req.params.bookingId);
// //     res.status(200).json(result);
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message
// //     });
// //   }
// // });

// // export default router;

// // routes/notificationRoutes.js
// import express from 'express';
// const router = express.Router();
// import {
//   sendBookingReminder,
//   sendBookingConfirmation,
//   sendCarReturnNotification,
//   sendMaintenanceNotification,
//   getUserNotifications,
//   markAsRead,
//   markAllAsRead,
//   deleteNotification,
//   getUnreadCount
// } from '../ontroller/notificationController.js';

// // Get notifications for user
// router.get('/user/:userId', getUserNotifications);

// // Get unread notification count
// router.get('/unread-count/:userId', getUnreadCount);

// // Mark notification as read
// router.patch('/read/:notificationId', markAsRead);

// // Mark all notifications as read
// router.patch('/read-all/:userId', markAllAsRead);

// // Delete notification
// router.delete('/:notificationId', deleteNotification);

// // Send booking reminder (for testing/internal use)
// router.post('/booking-reminder/:bookingId', async (req, res) => {
//   try {
//     const result = await sendBookingReminder(req.params.bookingId);
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// });

// // Send booking confirmation (for testing/internal use)
// router.post('/booking-confirmation/:bookingId', async (req, res) => {
//   try {
//     const result = await sendBookingConfirmation(req.params.bookingId);
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// });

// export default router;

// routes/notificationRoutes.js
import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js'; // Adjust path as needed
const router = express.Router();
import {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount
} from '../Controller/notificationController.js';

// Apply auth middleware to all notification routes
router.use(verifyToken);

// Get notifications for user
router.get('/user/:userId', getUserNotifications);

// Get unread notification count
router.get('/unread-count/:userId', getUnreadCount);

// Mark notification as read
router.patch('/read/:notificationId', markAsRead);

// Mark all notifications as read
router.patch('/read-all/:userId', markAllAsRead);

// Delete notification
router.delete('/:notificationId', deleteNotification);

export default router;