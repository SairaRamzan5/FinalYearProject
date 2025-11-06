// // controllers/notificationController.js
// import Notification from '../Model/Notification.js';
// import Booking from '../Model/bookingModel.js';
// import User from '../Model/signup.js';

// // Send booking reminder notification
// const sendBookingReminder = async (bookingId) => {
//   try {
//     const booking = await Booking.findById(bookingId)
//       .populate('carId')
//       .populate('userId')
//       .populate('showroomId');

//     if (!booking) {
//       throw new Error('Booking not found');
//     }

//     const notification = new Notification({
//       userId: booking.userId._id,
//       userType: 'customer',
//       bookingId: booking._id,
//       type: 'booking_reminder',
//       title: 'Booking Ending Soon!',
//       message: `Your booking for ${booking.carId.carBrand} ${booking.carId.carModel} will end in 30 minutes. Please prepare to return the vehicle.`,
//       priority: 'high',
//       sentVia: ['in_app'],
//       metadata: {
//         carBrand: booking.carId.carBrand,
//         carModel: booking.carId.carModel,
//         endTime: booking.rentalEndDate + ' ' + booking.rentalEndTime,
//         showroomName: booking.showroomId.showroomName
//       }
//     });

//     await notification.save();

//     // Also send notification to showroom
//     const showroomNotification = new Notification({
//       userId: booking.showroomId._id,
//       userType: 'showroom',
//       bookingId: booking._id,
//       type: 'booking_reminder',
//       title: 'Customer Booking Ending Soon',
//       message: `Booking for ${booking.carId.carBrand} ${booking.carId.carModel} will end in 30 minutes. Customer: ${booking.userId.name}`,
//       priority: 'medium',
//       sentVia: ['in_app'],
//       metadata: {
//         customerName: booking.userId.name,
//         carBrand: booking.carId.carBrand,
//         carModel: booking.carId.carModel,
//         endTime: booking.rentalEndDate + ' ' + booking.rentalEndTime
//       }
//     });

//     await showroomNotification.save();

//     console.log(`Booking reminder notifications sent for booking: ${bookingId}`);
//     return { success: true, notification };

//   } catch (error) {
//     console.error('Error sending booking reminder:', error);
//     throw error;
//   }
// };

// // Send booking confirmation notification
// const sendBookingConfirmation = async (bookingId) => {
//   try {
//     const booking = await Booking.findById(bookingId)
//       .populate('carId')
//       .populate('userId')
//       .populate('showroomId');

//     const customerNotification = new Notification({
//       userId: booking.userId._id,
//       userType: 'customer',
//       bookingId: booking._id,
//       type: 'booking_confirmation',
//       title: 'Booking Confirmed!',
//       message: `Your booking for ${booking.carId.carBrand} ${booking.carId.carModel} has been confirmed. Pickup: ${booking.rentalStartDate} at ${booking.rentalStartTime}`,
//       priority: 'medium',
//       sentVia: ['in_app'],
//       metadata: {
//         carBrand: booking.carId.carBrand,
//         carModel: booking.carId.carModel,
//         startDate: booking.rentalStartDate,
//         startTime: booking.rentalStartTime
//       }
//     });

//     const showroomNotification = new Notification({
//       userId: booking.showroomId._id,
//       userType: 'showroom',
//       bookingId: booking._id,
//       type: 'booking_confirmation',
//       title: 'New Booking Received',
//       message: `New booking for ${booking.carId.carBrand} ${booking.carId.carModel}. Customer: ${booking.userId.name}`,
//       priority: 'medium',
//       sentVia: ['in_app'],
//       metadata: {
//         customerName: booking.userId.name,
//         carBrand: booking.carId.carBrand,
//         carModel: booking.carId.carModel
//       }
//     });

//     await Promise.all([
//       customerNotification.save(),
//       showroomNotification.save()
//     ]);

//     return { success: true };

//   } catch (error) {
//     console.error('Error sending booking confirmation:', error);
//     throw error;
//   }
// };

// // Send car return notification
// const sendCarReturnNotification = async (bookingId) => {
//   try {
//     const booking = await Booking.findById(bookingId)
//       .populate('carId')
//       .populate('userId')
//       .populate('showroomId');

//     const showroomNotification = new Notification({
//       userId: booking.showroomId._id,
//       userType: 'showroom',
//       bookingId: booking._id,
//       type: 'car_return',
//       title: 'Car Returned',
//       message: `${booking.userId.name} has returned ${booking.carId.carBrand} ${booking.carId.carModel}`,
//       priority: 'medium',
//       sentVia: ['in_app'],
//       metadata: {
//         customerName: booking.userId.name,
//         carBrand: booking.carId.carBrand,
//         carModel: booking.carId.carModel
//       }
//     });

//     await showroomNotification.save();
//     return { success: true };

//   } catch (error) {
//     console.error('Error sending car return notification:', error);
//     throw error;
//   }
// };

// // Send maintenance notification
// const sendMaintenanceNotification = async (carId, showroomId, maintenanceDetails) => {
//   try {
//     const notification = new Notification({
//       userId: showroomId,
//       userType: 'showroom',
//       type: 'car_maintenance',
//       title: 'Car Maintenance Required',
//       message: `Maintenance required for car: ${maintenanceDetails.carBrand} ${maintenanceDetails.carModel}. Issue: ${maintenanceDetails.issue}`,
//       priority: 'high',
//       sentVia: ['in_app'],
//       metadata: {
//         carId: carId,
//         issue: maintenanceDetails.issue,
//         severity: maintenanceDetails.severity
//       }
//     });

//     await notification.save();
//     return { success: true };

//   } catch (error) {
//     console.error('Error sending maintenance notification:', error);
//     throw error;
//   }
// };

// // Get notifications for user
// const getUserNotifications = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { page = 1, limit = 20, unreadOnly = false } = req.query;

//     const query = { userId };
//     if (unreadOnly === 'true') {
//       query.read = false;
//     }

//     const notifications = await Notification.find(query)
//       .sort({ createdAt: -1 })
//       .limit(limit * 1)
//       .skip((page - 1) * limit);

//     const total = await Notification.countDocuments(query);

//     res.status(200).json({
//       success: true,
//       notifications,
//       totalPages: Math.ceil(total / limit),
//       currentPage: page,
//       total
//     });

//   } catch (error) {
//     console.error('Error getting notifications:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching notifications'
//     });
//   }
// };

// // Mark notification as read
// const markAsRead = async (req, res) => {
//   try {
//     const { notificationId } = req.params;

//     const notification = await Notification.findByIdAndUpdate(
//       notificationId,
//       { read: true },
//       { new: true }
//     );

//     if (!notification) {
//       return res.status(404).json({
//         success: false,
//         message: 'Notification not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       notification
//     });

//   } catch (error) {
//     console.error('Error marking notification as read:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error updating notification'
//     });
//   }
// };

// // Mark all notifications as read
// const markAllAsRead = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     await Notification.updateMany(
//       { userId, read: false },
//       { read: true }
//     );

//     res.status(200).json({
//       success: true,
//       message: 'All notifications marked as read'
//     });

//   } catch (error) {
//     console.error('Error marking all notifications as read:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error updating notifications'
//     });
//   }
// };

// // Delete notification
// const deleteNotification = async (req, res) => {
//   try {
//     const { notificationId } = req.params;

//     const notification = await Notification.findByIdAndDelete(notificationId);

//     if (!notification) {
//       return res.status(404).json({
//         success: false,
//         message: 'Notification not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Notification deleted successfully'
//     });

//   } catch (error) {
//     console.error('Error deleting notification:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error deleting notification'
//     });
//   }
// };

// // Get unread notification count
// const getUnreadCount = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const count = await Notification.countDocuments({
//       userId,
//       read: false
//     });

//     res.status(200).json({
//       success: true,
//       count
//     });

//   } catch (error) {
//     console.error('Error getting unread count:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching unread count'
//     });
//   }
// };

// export {
//   sendBookingReminder,
//   sendBookingConfirmation,
//   sendCarReturnNotification,
//   sendMaintenanceNotification,
//   getUserNotifications,
//   markAsRead,
//   markAllAsRead,
//   deleteNotification,
//   getUnreadCount
// };


// controllers/notificationController.js
import Notification from '../Model/Notification.js';
import Booking from '../Model/bookingModel.js';
import User from '../Model/signup.js';

// Send booking reminder notification (BOTH customer and showroom)
const sendBookingReminder = async (bookingId) => {
  try {
    const booking = await Booking.findById(bookingId)
      .populate('carId')
      .populate('userId')
      .populate('showroomId');

    if (!booking) {
      throw new Error('Booking not found');
    }

    // Customer notification
    const customerNotification = new Notification({
      userId: booking.userId._id,
      userType: 'customer',
      bookingId: booking._id,
      type: 'booking_reminder',
      title: 'Booking Ending Soon!',
      message: `Your booking for ${booking.carId.carBrand} ${booking.carId.carModel} will end in 30 minutes. Please prepare to return the vehicle.`,
      priority: 'high',
      sentVia: ['in_app'],
      metadata: {
        carBrand: booking.carId.carBrand,
        carModel: booking.carId.carModel,
        endTime: booking.rentalEndDate + ' ' + booking.rentalEndTime,
        showroomName: booking.showroomId.showroomName
      }
    });

    // Showroom notification
    const showroomNotification = new Notification({
      userId: booking.showroomId._id,
      userType: 'showroom',
      bookingId: booking._id,
      type: 'booking_reminder',
      title: 'Customer Booking Ending Soon',
      message: `Booking for ${booking.carId.carBrand} ${booking.carId.carModel} will end in 30 minutes. Customer: ${booking.userId.name}`,
      priority: 'medium',
      sentVia: ['in_app'],
      metadata: {
        customerName: booking.userId.name,
        carBrand: booking.carId.carBrand,
        carModel: booking.carId.carModel,
        endTime: booking.rentalEndDate + ' ' + booking.rentalEndTime
      }
    });

    await Promise.all([
      customerNotification.save(),
      showroomNotification.save()
    ]);

    console.log(`Booking reminder notifications sent for booking: ${bookingId}`);
    return { success: true };

  } catch (error) {
    console.error('Error sending booking reminder:', error);
    throw error;
  }
};

// Send booking confirmation notification
const sendBookingConfirmation = async (bookingId) => {
  try {
    const booking = await Booking.findById(bookingId)
      .populate('carId')
      .populate('userId')
      .populate('showroomId');

    const customerNotification = new Notification({
      userId: booking.userId._id,
      userType: 'customer',
      bookingId: booking._id,
      type: 'booking_confirmation',
      title: 'Booking Confirmed!',
      message: `Your booking for ${booking.carId.carBrand} ${booking.carId.carModel} has been confirmed. Pickup: ${booking.rentalStartDate} at ${booking.rentalStartTime}`,
      priority: 'medium',
      sentVia: ['in_app'],
      metadata: {
        carBrand: booking.carId.carBrand,
        carModel: booking.carId.carModel,
        startDate: booking.rentalStartDate,
        startTime: booking.rentalStartTime
      }
    });

    const showroomNotification = new Notification({
      userId: booking.showroomId._id,
      userType: 'showroom',
      bookingId: booking._id,
      type: 'booking_confirmation',
      title: 'New Booking Received',
      message: `New booking for ${booking.carId.carBrand} ${booking.carId.carModel}. Customer: ${booking.userId.name}`,
      priority: 'medium',
      sentVia: ['in_app'],
      metadata: {
        customerName: booking.userId.name,
        carBrand: booking.carId.carBrand,
        carModel: booking.carId.carModel
      }
    });

    await Promise.all([
      customerNotification.save(),
      showroomNotification.save()
    ]);

    return { success: true };

  } catch (error) {
    console.error('Error sending booking confirmation:', error);
    throw error;
  }
};

// Send car return notification
const sendCarReturnNotification = async (bookingId) => {
  try {
    const booking = await Booking.findById(bookingId)
      .populate('carId')
      .populate('userId')
      .populate('showroomId');

    const showroomNotification = new Notification({
      userId: booking.showroomId._id,
      userType: 'showroom',
      bookingId: booking._id,
      type: 'car_return',
      title: 'Car Returned',
      message: `${booking.userId.name} has returned ${booking.carId.carBrand} ${booking.carId.carModel}`,
      priority: 'medium',
      sentVia: ['in_app'],
      metadata: {
        customerName: booking.userId.name,
        carBrand: booking.carId.carBrand,
        carModel: booking.carId.carModel
      }
    });

    await showroomNotification.save();
    return { success: true };

  } catch (error) {
    console.error('Error sending car return notification:', error);
    throw error;
  }
};

// Send maintenance notification
const sendMaintenanceNotification = async (carId, showroomId, maintenanceDetails) => {
  try {
    const notification = new Notification({
      userId: showroomId,
      userType: 'showroom',
      type: 'car_maintenance',
      title: 'Car Maintenance Required',
      message: `Maintenance required for car: ${maintenanceDetails.carBrand} ${maintenanceDetails.carModel}. Issue: ${maintenanceDetails.issue}`,
      priority: 'high',
      sentVia: ['in_app'],
      metadata: {
        carId: carId,
        issue: maintenanceDetails.issue,
        severity: maintenanceDetails.severity
      }
    });

    await notification.save();
    return { success: true };

  } catch (error) {
    console.error('Error sending maintenance notification:', error);
    throw error;
  }
};

// Get notifications for user
const getUserNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 20, unreadOnly = false } = req.query;

    const query = { userId };
    if (unreadOnly === 'true') {
      query.read = false;
    }

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Notification.countDocuments(query);

    res.status(200).json({
      success: true,
      notifications,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });

  } catch (error) {
    console.error('Error getting notifications:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching notifications'
    });
  }
};

// Mark notification as read
const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.status(200).json({
      success: true,
      notification
    });

  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating notification'
    });
  }
};

// Mark all notifications as read
const markAllAsRead = async (req, res) => {
  try {
    const { userId } = req.params;

    await Notification.updateMany(
      { userId, read: false },
      { read: true }
    );

    res.status(200).json({
      success: true,
      message: 'All notifications marked as read'
    });

  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating notifications'
    });
  }
};

// Delete notification
const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findByIdAndDelete(notificationId);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Notification deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting notification'
    });
  }
};

// Get unread notification count
const getUnreadCount = async (req, res) => {
  try {
    const { userId } = req.params;

    const count = await Notification.countDocuments({
      userId,
      read: false
    });

    res.status(200).json({
      success: true,
      count
    });

  } catch (error) {
    console.error('Error getting unread count:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching unread count'
    });
  }
};

export {
  sendBookingReminder,
  sendBookingConfirmation,
  sendCarReturnNotification,
  sendMaintenanceNotification,
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount
};