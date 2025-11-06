// import Complaint from "../Model/Complaint.js";
// import Booking from "../Model/bookingModel.js";
// import Car from "../Model/Car.js";
// import User from "../Model/signup.js";

// // ✅ Get All Complaints (Admin only) - COMPLETELY FIXED
// export const getAllComplaints = async (req, res) => {
//   try {
//     console.log("🔄 Fetching all complaints with complete population...");
    
//     const complaints = await Complaint.find()
//       .populate("user", "name email contactNumber address")
//       .populate({
//         path: "bookingId",
//         populate: [
//           {
//             path: "carId",
//             select: "carBrand carModel year plateNumber images rentRate color fuelType transmission seatCapacity engineNo chassisNo mileage bodyType"
//           },
//           {
//             path: "userId",
//             select: "name email contactNumber address"
//           },
//           {
//             path: "showroomId",
//             select: "showroomName ownerName address contactNumber email"
//           }
//         ]
//       })
//       .sort({ createdAt: -1 });

//     console.log(`✅ Found ${complaints.length} complaints`);

//     // Log detailed information for debugging
//     complaints.forEach((complaint, index) => {
//       console.log(`📋 Complaint ${index + 1}:`, {
//         _id: complaint._id,
//         email: complaint.email,
//         contact: complaint.contact,
//         type: complaint.compl_Against,
//         description: complaint.description?.substring(0, 50) + '...',
//         proof: complaint.proof,
//         resolved: complaint.resolved,
//         createdAt: complaint.createdAt,
//         hasUser: !!complaint.user,
//         hasBooking: !!complaint.bookingId,
//         bookingDetails: complaint.bookingId ? {
//           car: complaint.bookingId.carId ? {
//             brand: complaint.bookingId.carId.carBrand,
//             model: complaint.bookingId.carId.carModel,
//             plate: complaint.bookingId.carId.plateNumber
//           } : 'No car data',
//           user: complaint.bookingId.userId ? {
//             name: complaint.bookingId.userId.name,
//             email: complaint.bookingId.userId.email
//           } : 'No user data',
//           showroom: complaint.bookingId.showroomId ? {
//             name: complaint.bookingId.showroomId.showroomName,
//             owner: complaint.bookingId.showroomId.ownerName
//           } : 'No showroom data',
//           dates: `${complaint.bookingId.rentalStartDate} to ${complaint.bookingId.rentalEndDate}`,
//           price: complaint.bookingId.totalPrice
//         } : 'No booking data'
//       });
//     });

//     res.status(200).json({ 
//       success: true, 
//       complaints,
//       count: complaints.length,
//       message: "All complaints fetched successfully with complete data"
//     });
//   } catch (error) {
//     console.error("❌ Error fetching complaints:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Failed to fetch complaints",
//       error: error.message
//     });
//   }
// };

// // ✅ Create Complaint - FIXED
// export const createComplaint = async (req, res) => {
//   try {
//     const { email, contact, compl_Against, description, bookingId } = req.body;

//     console.log("📝 Creating complaint with data:", {
//       email, contact, compl_Against, description, bookingId
//     });

//     if (!email || !contact || !compl_Against || !description) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "All fields are required" 
//       });
//     }

//     const complaintData = {
//       email,
//       contact,
//       compl_Against,
//       description,
//       proof: req.file ? req.file.filename : null,
//       user: req.userId,
//     };

//     // ✅ Attach bookingId if provided and valid
//     if (bookingId && bookingId !== "null" && bookingId !== "" && bookingId !== "undefined") {
//       // Verify booking exists
//       const bookingExists = await Booking.findById(bookingId);
//       if (bookingExists) {
//         complaintData.bookingId = bookingId;
//         console.log("✅ Booking attached to complaint:", bookingId);
//       } else {
//         console.log("⚠️ Booking not found:", bookingId);
//       }
//     }

//     const complaint = new Complaint(complaintData);
//     await complaint.save();

//     // Populate the complaint before sending response
//     const populatedComplaint = await Complaint.findById(complaint._id)
//       .populate("user", "name email contactNumber")
//       .populate({
//         path: "bookingId",
//         populate: [
//           {
//             path: "carId",
//             select: "carBrand carModel year plateNumber images"
//           },
//           {
//             path: "userId",
//             select: "name email contactNumber"
//           }
//         ]
//       });

//     console.log("✅ Complaint created successfully:", populatedComplaint._id);

//     res.status(201).json({
//       success: true,
//       message: "Complaint submitted successfully",
//       complaint: populatedComplaint,
//     });
//   } catch (error) {
//     console.error("❌ Error saving complaint:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Failed to submit complaint",
//       error: error.message
//     });
//   }
// };

// // ✅ Get Single Complaint by ID - FIXED
// export const getComplaintById = async (req, res) => {
//   try {
//     const complaint = await Complaint.findById(req.params.id)
//       .populate("user", "name email contactNumber address")
//       .populate({
//         path: "bookingId",
//         populate: [
//           {
//             path: "carId",
//             select: "carBrand carModel year plateNumber images rentRate color fuelType transmission seatCapacity engineNo chassisNo mileage bodyType"
//           },
//           {
//             path: "userId",
//             select: "name email contactNumber address"
//           },
//           {
//             path: "showroomId",
//             select: "showroomName ownerName address contactNumber email"
//           }
//         ]
//       });

//     if (!complaint) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Complaint not found" 
//       });
//     }

//     console.log("✅ Complaint details fetched:", complaint._id);

//     res.status(200).json({ 
//       success: true, 
//       complaint,
//       message: "Complaint fetched successfully"
//     });
//   } catch (error) {
//     console.error("❌ Error fetching complaint:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Failed to fetch complaint",
//       error: error.message
//     });
//   }
// };

// // ✅ Resolve Complaint - FIXED
// export const resolveComplaint = async (req, res) => {
//   try {
//     const complaint = await Complaint.findByIdAndUpdate(
//       req.params.id,
//       { 
//         resolved: true,
//         resolvedAt: new Date()
//       },
//       { new: true }
//     )
//     .populate("user", "name email")
//     .populate({
//       path: "bookingId",
//       populate: {
//         path: "carId",
//         select: "carBrand carModel plateNumber"
//       }
//     });

//     if (!complaint) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Complaint not found" 
//       });
//     }

//     console.log("✅ Complaint resolved:", complaint._id);

//     res.status(200).json({ 
//       success: true, 
//       complaint,
//       message: "Complaint marked as resolved successfully"
//     });
//   } catch (error) {
//     console.error("❌ Error resolving complaint:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Failed to resolve complaint",
//       error: error.message
//     });
//   }
// };

// // // ✅ GET USER'S OWN COMPLAINTS - FIXED
// // export const getUserComplaints = async (req, res) => {
// //   try {
// //     const userId = req.user;
    
// //     console.log("👤 Fetching complaints for user:", userId);

// //     const complaints = await Complaint.find({ user: userId })
// //       .populate({
// //         path: "bookingId",
// //         populate: [
// //           {
// //             path: "carId",
// //             select: "carBrand carModel images plateNumber"
// //           },
// //           {
// //             path: "showroomId",
// //             select: "showroomName address contactNumber"
// //           }
// //         ]
// //       })
// //       .sort({ createdAt: -1 });

// //     console.log(`✅ Found ${complaints.length} complaints for user`);

// //     res.status(200).json({ 
// //       success: true, 
// //       complaints,
// //       count: complaints.length,
// //       message: "User complaints fetched successfully"
// //     });
// //   } catch (error) {
// //     console.error("❌ Error fetching user complaints:", error);
// //     res.status(500).json({ 
// //       success: false, 
// //       message: "Failed to fetch user complaints",
// //       error: error.message
// //     });
// //   }
// // };


// // // ✅ GET USER'S OWN COMPLAINTS - CLEAN REUSED VERSION
// // export const getUserComplaints = async (req, res) => {
// //   try {
// //     const userId = req.user?._id;

// //     const complaints = await Complaint.find({ user: userId })
// //       .populate({
// //         path: "bookingId",
// //         populate: [
// //           { path: "carId", select: "carBrand carModel images plateNumber" },
// //           { path: "showroomId", select: "showroomName contactNumber address" },
// //         ],
// //       })
// //       .sort({ createdAt: -1 });

// //     res.status(200).json({
// //       success: true,
// //       count: complaints.length,
// //       complaints,
// //       message: "User complaints fetched successfully",
// //     });
// //   } catch (error) {
// //     console.error("❌ Error fetching user complaints:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch user complaints",
// //       error: error.message,
// //     });
// //   }
// // };

// // ✅ GET USER'S OWN COMPLAINTS - DETAILED VERSION
// export const getUserComplaints = async (req, res) => {
//   try {
//     const userId = req.user?._id;

//     const complaints = await Complaint.find({ user: userId })
//       .populate("user", "name email contactNumber") // User details
//       .populate({
//         path: "bookingId",
//         populate: [
//           {
//             path: "carId",
//             select: "carBrand carModel year plateNumber images"
//           },
//           {
//             path: "showroomId",
//             select: "showroomName contactNumber address"
//           },
//           {
//             path: "userId",
//             select: "name email contactNumber"
//           }
//         ],
//       })
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: complaints.length,
//       complaints,
//       message: "User complaints fetched successfully with booking, user, and showroom details",
//     });
//   } catch (error) {
//     console.error("❌ Error fetching user complaints:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch user complaints",
//       error: error.message,
//     });
//   }
// };



// // ✅ GET SHOWROOM COMPLAINTS LIST (Optimized for Showroom Owners)
// export const getShowroomComplaintsList = async (req, res) => {
//   try {
//     const showroomId = req.user;
    
//     console.log("🏢 Fetching complaints list for showroom:", showroomId);

//     // Step 1: Get all cars belonging to this showroom
//     const showroomCars = await Car.find({ userId: showroomId }).select('_id');
//     const carIds = showroomCars.map(car => car._id);
    
//     console.log(`🚗 Found ${carIds.length} cars for showroom`);

//     // Step 2: Get all bookings for these cars
//     const showroomBookings = await Booking.find({ carId: { $in: carIds } }).select('_id');
//     const bookingIds = showroomBookings.map(booking => booking._id);
    
//     console.log(`📋 Found ${bookingIds.length} bookings for showroom cars`);

//     // Step 3: Get complaints related to these bookings
//     const complaints = await Complaint.find({
//       bookingId: { $in: bookingIds }
//     })
//     .populate("user", "name email contactNumber address")
//     .populate({
//       path: "bookingId",
//       populate: [
//         {
//           path: "carId",
//           select: "carBrand carModel year plateNumber images rentRate color fuelType transmission seatCapacity"
//         },
//         {
//           path: "userId",
//           select: "name email contactNumber address"
//         },
//         {
//           path: "showroomId",
//           select: "showroomName ownerName address contactNumber email"
//         }
//       ]
//     })
//     .sort({ createdAt: -1 });

//     console.log(`✅ Found ${complaints.length} complaints for showroom`);

//     // Log detailed information for debugging
//     complaints.forEach((complaint, index) => {
//       console.log(`🏢 Showroom Complaint ${index + 1}:`, {
//         _id: complaint._id,
//         against: complaint.compl_Against,
//         description: complaint.description?.substring(0, 50) + '...',
//         resolved: complaint.resolved,
//         car: complaint.bookingId?.carId ? {
//           brand: complaint.bookingId.carId.carBrand,
//           model: complaint.bookingId.carId.carModel,
//           plate: complaint.bookingId.carId.plateNumber
//         } : 'No car data',
//         customer: complaint.user ? {
//           name: complaint.user.name,
//           email: complaint.user.email,
//           contact: complaint.user.contactNumber
//         } : 'No user data',
//         bookingDates: complaint.bookingId ? `${complaint.bookingId.rentalStartDate} to ${complaint.bookingId.rentalEndDate}` : 'No booking data'
//       });
//     });

//     res.status(200).json({ 
//       success: true, 
//       complaints,
//       count: complaints.length,
//       message: "Showroom complaints list fetched successfully"
//     });
//   } catch (error) {
//     console.error("❌ Error fetching showroom complaints list:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Failed to fetch showroom complaints list",
//       error: error.message
//     });
//   }
// };

// // ✅ GET SHOWROOM COMPLAINT DETAILS BY ID
// export const getShowroomComplaintDetails = async (req, res) => {
//   try {
//     const showroomId = req.user;
//     const complaintId = req.params.id;

//     console.log(`🏢 Fetching complaint details ${complaintId} for showroom ${showroomId}`);

//     // First verify this complaint belongs to showroom's cars
//     const complaint = await Complaint.findById(complaintId)
//       .populate("user", "name email contactNumber address")
//       .populate({
//         path: "bookingId",
//         populate: [
//           {
//             path: "carId",
//             select: "carBrand carModel year plateNumber images rentRate color fuelType transmission seatCapacity engineNo chassisNo mileage bodyType userId"
//           },
//           {
//             path: "userId",
//             select: "name email contactNumber address"
//           },
//           {
//             path: "showroomId",
//             select: "showroomName ownerName address contactNumber email"
//           }
//         ]
//       });

//     if (!complaint) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Complaint not found" 
//       });
//     }

//     // Verify that the complaint belongs to this showroom's car
//     if (complaint.bookingId && complaint.bookingId.carId) {
//       const carBelongsToShowroom = complaint.bookingId.carId.userId.toString() === showroomId.toString();
      
//       if (!carBelongsToShowroom) {
//         return res.status(403).json({ 
//           success: false, 
//           message: "Access denied. This complaint does not belong to your showroom" 
//         });
//       }
//     }

//     console.log("✅ Showroom complaint details fetched:", complaintId);

//     res.status(200).json({ 
//       success: true, 
//       complaint,
//       message: "Showroom complaint details fetched successfully"
//     });
//   } catch (error) {
//     console.error("❌ Error fetching showroom complaint details:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Failed to fetch showroom complaint details",
//       error: error.message
//     });
//   }
// };

// // ✅ UPDATE SHOWROOM COMPLAINT STATUS
// export const updateShowroomComplaintStatus = async (req, res) => {
//   try {
//     const showroomId = req.user;
//     const complaintId = req.params.id;

//     console.log(`🏢 Updating complaint status ${complaintId} for showroom ${showroomId}`);

//     // First verify this complaint belongs to showroom's cars
//     const complaint = await Complaint.findById(complaintId)
//       .populate({
//         path: "bookingId",
//         populate: {
//           path: "carId",
//           select: "userId"
//         }
//       });

//     if (!complaint) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Complaint not found" 
//       });
//     }

//     // Verify that the complaint belongs to this showroom's car
//     if (complaint.bookingId && complaint.bookingId.carId) {
//       const carBelongsToShowroom = complaint.bookingId.carId.userId.toString() === showroomId.toString();
      
//       if (!carBelongsToShowroom) {
//         return res.status(403).json({ 
//           success: false, 
//           message: "Access denied. This complaint does not belong to your showroom" 
//         });
//       }
//     }

//     // Update complaint as resolved
//     const updatedComplaint = await Complaint.findByIdAndUpdate(
//       complaintId,
//       { 
//         resolved: true,
//         resolvedAt: new Date(),
//         resolvedBy: showroomId
//       },
//       { new: true }
//     )
//     .populate("user", "name email contactNumber")
//     .populate({
//       path: "bookingId",
//       populate: [
//         {
//           path: "carId",
//           select: "carBrand carModel plateNumber"
//         },
//         {
//           path: "showroomId",
//           select: "showroomName ownerName"
//         }
//       ]
//     });

//     console.log("✅ Showroom complaint status updated:", complaintId);

//     res.status(200).json({ 
//       success: true, 
//       complaint: updatedComplaint,
//       message: "Complaint status updated successfully"
//     });
//   } catch (error) {
//     console.error("❌ Error updating showroom complaint status:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Failed to update complaint status",
//       error: error.message
//     });
//   }
// };

// // ✅ GET SHOWROOM COMPLAINTS SUMMARY
// export const getShowroomComplaintsSummary = async (req, res) => {
//   try {
//     const showroomId = req.user;

//     console.log("📊 Fetching complaints summary for showroom:", showroomId);

//     // Get all cars belonging to this showroom
//     const showroomCars = await Car.find({ userId: showroomId }).select('_id');
//     const carIds = showroomCars.map(car => car._id);
    
//     // Get all bookings for these cars
//     const showroomBookings = await Booking.find({ carId: { $in: carIds } }).select('_id');
//     const bookingIds = showroomBookings.map(booking => booking._id);

//     // Get complaint statistics
//     const totalComplaints = await Complaint.countDocuments({
//       bookingId: { $in: bookingIds }
//     });

//     const resolvedComplaints = await Complaint.countDocuments({
//       bookingId: { $in: bookingIds },
//       resolved: true
//     });

//     const pendingComplaints = await Complaint.countDocuments({
//       bookingId: { $in: bookingIds },
//       resolved: false
//     });

//     // Get complaints by type
//     const complaintsByType = await Complaint.aggregate([
//       {
//         $match: {
//           bookingId: { $in: bookingIds }
//         }
//       },
//       {
//         $group: {
//           _id: "$compl_Against",
//           count: { $sum: 1 }
//         }
//       }
//     ]);

//     // Get recent complaints (last 7 days)
//     const sevenDaysAgo = new Date();
//     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

//     const recentComplaints = await Complaint.countDocuments({
//       bookingId: { $in: bookingIds },
//       createdAt: { $gte: sevenDaysAgo }
//     });

//     const summary = {
//       total: totalComplaints,
//       resolved: resolvedComplaints,
//       pending: pendingComplaints,
//       recent: recentComplaints,
//       resolutionRate: totalComplaints > 0 ? (resolvedComplaints / totalComplaints * 100).toFixed(1) : 0,
//       byType: complaintsByType
//     };

//     console.log("✅ Showroom complaints summary:", summary);

//     res.status(200).json({ 
//       success: true, 
//       summary,
//       message: "Showroom complaints summary fetched successfully"
//     });
//   } catch (error) {
//     console.error("❌ Error fetching showroom complaints summary:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Failed to fetch complaints summary",
//       error: error.message
//     });
//   }
// };

// // ✅ GET SHOWROOM PENDING COMPLAINTS
// export const getShowroomPendingComplaints = async (req, res) => {
//   try {
//     const showroomId = req.user;
    
//     console.log("⏳ Fetching pending complaints for showroom:", showroomId);

//     const showroomCars = await Car.find({ userId: showroomId }).select('_id');
//     const carIds = showroomCars.map(car => car._id);
    
//     const showroomBookings = await Booking.find({ carId: { $in: carIds } }).select('_id');
//     const bookingIds = showroomBookings.map(booking => booking._id);
    
//     const pendingComplaints = await Complaint.find({
//       bookingId: { $in: bookingIds },
//       resolved: false
//     })
//     .populate("user", "name email contactNumber")
//     .populate({
//       path: "bookingId",
//       populate: [
//         {
//           path: "carId",
//           select: "carBrand carModel year plateNumber images"
//         },
//         {
//           path: "userId",
//           select: "name email contactNumber"
//         }
//       ]
//     })
//     .sort({ createdAt: -1 });

//     console.log(`✅ Found ${pendingComplaints.length} pending complaints for showroom`);

//     res.status(200).json({ 
//       success: true, 
//       complaints: pendingComplaints,
//       count: pendingComplaints.length,
//       message: "Showroom pending complaints fetched successfully"
//     });
//   } catch (error) {
//     console.error("❌ Error fetching showroom pending complaints:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Failed to fetch pending complaints",
//       error: error.message
//     });
//   }
// };


// controllers/complaintController.js
import Complaint from "../Model/Complaint.js";
import Booking from "../Model/bookingModel.js";
import Car from "../Model/Car.js";
import Users_data from "../Model/signup.js"; // ✅ Import the correct model name

// ✅ Get All Complaints (Admin only)
export const getAllComplaints = async (req, res) => {
  try {
    console.log("🔄 Fetching all complaints with complete population...");
    
    const complaints = await Complaint.find()
      .populate("user", "name email contactNumber address")
      .populate("resolvedBy", "name email")
      .populate({
        path: "bookingId",
        populate: [
          {
            path: "carId",
            select: "carBrand carModel year plateNumber images rentRate color fuelType transmission seatCapacity engineNo chassisNo mileage bodyType"
          },
          {
            path: "userId",
            select: "name email contactNumber address"
          },
          {
            path: "showroomId",
            select: "showroomName ownerName address contactNumber email"
          }
        ]
      })
      .sort({ createdAt: -1 });

    console.log(`✅ Found ${complaints.length} complaints`);

    res.status(200).json({ 
      success: true, 
      complaints,
      count: complaints.length,
      message: "All complaints fetched successfully with complete data"
    });
  } catch (error) {
    console.error("❌ Error fetching complaints:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch complaints",
      error: error.message
    });
  }
};

// ✅ Create Complaint
export const createComplaint = async (req, res) => {
  try {
    const { email, contact, compl_Against, description, bookingId } = req.body;

    console.log("📝 Creating complaint with data:", {
      email, contact, compl_Against, description, bookingId
    });

    if (!email || !contact || !compl_Against || !description) {
      return res.status(400).json({ 
        success: false, 
        message: "All fields are required" 
      });
    }

    const complaintData = {
      email,
      contact,
      compl_Against,
      description,
      proof: req.file ? req.file.filename : null,
      user: req.userId,
    };

    if (bookingId && bookingId !== "null" && bookingId !== "" && bookingId !== "undefined") {
      const bookingExists = await Booking.findById(bookingId);
      if (bookingExists) {
        complaintData.bookingId = bookingId;
        console.log("✅ Booking attached to complaint:", bookingId);
      } else {
        console.log("⚠️ Booking not found:", bookingId);
      }
    }

    const complaint = new Complaint(complaintData);
    await complaint.save();

    const populatedComplaint = await Complaint.findById(complaint._id)
      .populate("user", "name email contactNumber")
      .populate({
        path: "bookingId",
        populate: [
          {
            path: "carId",
            select: "carBrand carModel year plateNumber images"
          },
          {
            path: "userId",
            select: "name email contactNumber"
          }
        ]
      });

    console.log("✅ Complaint created successfully:", populatedComplaint._id);

    res.status(201).json({
      success: true,
      message: "Complaint submitted successfully",
      complaint: populatedComplaint,
    });
  } catch (error) {
    console.error("❌ Error saving complaint:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to submit complaint",
      error: error.message
    });
  }
};

// ✅ Get Single Complaint by ID
export const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate("user", "name email contactNumber address")
      .populate("resolvedBy", "name email")
      .populate({
        path: "bookingId",
        populate: [
          {
            path: "carId",
            select: "carBrand carModel year plateNumber images rentRate color fuelType transmission seatCapacity engineNo chassisNo mileage bodyType"
          },
          {
            path: "userId",
            select: "name email contactNumber address"
          },
          {
            path: "showroomId",
            select: "showroomName ownerName address contactNumber email"
          }
        ]
      });

    if (!complaint) {
      return res.status(404).json({ 
        success: false, 
        message: "Complaint not found" 
      });
    }

    console.log("✅ Complaint details fetched:", complaint._id);

    res.status(200).json({ 
      success: true, 
      complaint,
      message: "Complaint fetched successfully"
    });
  } catch (error) {
    console.error("❌ Error fetching complaint:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch complaint",
      error: error.message
    });
  }
};

// ✅ UPDATED: Resolve Complaint with Resolution Description
// export const resolveComplaint = async (req, res) => {
//   try {
//     const { resolutionDescription } = req.body;

//     if (!resolutionDescription || !resolutionDescription.trim()) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Resolution description is required" 
//       });
//     }

//     const complaint = await Complaint.findByIdAndUpdate(
//       req.params.id,
//       { 
//         resolved: true,
//         resolvedAt: new Date(),
//         resolutionDescription: resolutionDescription.trim(),
//         resolvedBy: req.userId || req.user
//       },
//       { new: true }
//     )
//     .populate("user", "name email")
//     .populate("resolvedBy", "name email")
//     .populate({
//       path: "bookingId",
//       populate: {
//         path: "carId",
//         select: "carBrand carModel plateNumber"
//       }
//     });

//     if (!complaint) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Complaint not found" 
//       });
//     }

//     console.log("✅ Complaint resolved with description:", complaint._id);

//     res.status(200).json({ 
//       success: true, 
//       complaint,
//       message: "Complaint marked as resolved successfully"
//     });
//   } catch (error) {
//     console.error("❌ Error resolving complaint:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Failed to resolve complaint",
//       error: error.message
//     });
//   }
// };

// In your resolveComplaint function - UPDATE THIS:
export const resolveComplaint = async (req, res) => {
  try {
    const { resolutionDescription } = req.body;

    if (!resolutionDescription || !resolutionDescription.trim()) {
      return res.status(400).json({ 
        success: false, 
        message: "Resolution description is required" 
      });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { 
        resolved: true,
        resolvedAt: new Date(),
        resolutionDescription: resolutionDescription.trim(),
        resolvedBy: req.userId || req.user
      },
      { new: true }
    )
    .populate("user", "name email")
    .populate("resolvedBy", "name email")
    .populate({
      path: "bookingId",
      populate: [
        {
          path: "carId",
          select: "carBrand carModel plateNumber"
        },
        {
          path: "showroomId",
          select: "showroomName ownerName"
        }
      ]
    }); // ✅ Added proper population

    if (!complaint) {
      return res.status(404).json({ 
        success: false, 
        message: "Complaint not found" 
      });
    }

    console.log("✅ Complaint resolved with description:", complaint._id);

    res.status(200).json({ 
      success: true, 
      complaint, // ✅ This should now include populated data
      message: "Complaint marked as resolved successfully"
    });
  } catch (error) {
    console.error("❌ Error resolving complaint:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to resolve complaint",
      error: error.message
    });
  }
};


// ✅ GET USER'S OWN COMPLAINTS
// export const getUserComplaints = async (req, res) => {
//   try {
//     const userId = req.user?._id;

//     const complaints = await Complaint.find({ user: userId })
//       .populate("user", "name email contactNumber")
//       .populate("resolvedBy", "name email")
//       .populate({
//         path: "bookingId",
//         populate: [
//           {
//             path: "carId",
//             select: "carBrand carModel year plateNumber images"
//           },
//           {
//             path: "showroomId",
//             select: "showroomName contactNumber address"
//           },
//           {
//             path: "userId",
//             select: "name email contactNumber"
//           }
//         ],
//       })
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: complaints.length,
//       complaints,
//       message: "User complaints fetched successfully with booking, user, and showroom details",
//     });
//   } catch (error) {
//     console.error("❌ Error fetching user complaints:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch user complaints",
//       error: error.message,
//     });
//   }
// };

// ✅ UPDATE getUserComplaints to include resolution data
export const getUserComplaints = async (req, res) => {
  try {
    const userId = req.user?._id;

    const complaints = await Complaint.find({ user: userId })
      .populate("user", "name email contactNumber")
      .populate("resolvedBy", "name email") // ✅ Ensure this is populated
      .populate({
        path: "bookingId",
        populate: [
          {
            path: "carId",
            select: "carBrand carModel year plateNumber images"
          },
          {
            path: "showroomId",
            select: "showroomName contactNumber address"
          },
          {
            path: "userId",
            select: "name email contactNumber"
          }
        ],
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      complaints,
      message: "User complaints fetched successfully with complete details",
    });
  } catch (error) {
    console.error("❌ Error fetching user complaints:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user complaints",
      error: error.message,
    });
  }
};

// ✅ GET SHOWROOM COMPLAINTS LIST
export const getShowroomComplaintsList = async (req, res) => {
  try {
    const showroomId = req.user;
    
    console.log("🏢 Fetching complaints list for showroom:", showroomId);

    const showroomCars = await Car.find({ userId: showroomId }).select('_id');
    const carIds = showroomCars.map(car => car._id);
    
    const showroomBookings = await Booking.find({ carId: { $in: carIds } }).select('_id');
    const bookingIds = showroomBookings.map(booking => booking._id);

    const complaints = await Complaint.find({
      bookingId: { $in: bookingIds }
    })
    .populate("user", "name email contactNumber address")
    .populate("resolvedBy", "name email")
    .populate({
      path: "bookingId",
      populate: [
        {
          path: "carId",
          select: "carBrand carModel year plateNumber images rentRate color fuelType transmission seatCapacity"
        },
        {
          path: "userId",
          select: "name email contactNumber address"
        },
        {
          path: "showroomId",
          select: "showroomName ownerName address contactNumber email"
        }
      ]
    })
    .sort({ createdAt: -1 });

    console.log(`✅ Found ${complaints.length} complaints for showroom`);

    res.status(200).json({ 
      success: true, 
      complaints,
      count: complaints.length,
      message: "Showroom complaints list fetched successfully"
    });
  } catch (error) {
    console.error("❌ Error fetching showroom complaints list:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch showroom complaints list",
      error: error.message
    });
  }
};

// ✅ GET SHOWROOM COMPLAINT DETAILS BY ID
export const getShowroomComplaintDetails = async (req, res) => {
  try {
    const showroomId = req.user;
    const complaintId = req.params.id;

    console.log(`🏢 Fetching complaint details ${complaintId} for showroom ${showroomId}`);

    const complaint = await Complaint.findById(complaintId)
      .populate("user", "name email contactNumber address")
      .populate("resolvedBy", "name email")
      .populate({
        path: "bookingId",
        populate: [
          {
            path: "carId",
            select: "carBrand carModel year plateNumber images rentRate color fuelType transmission seatCapacity engineNo chassisNo mileage bodyType userId"
          },
          {
            path: "userId",
            select: "name email contactNumber address"
          },
          {
            path: "showroomId",
            select: "showroomName ownerName address contactNumber email"
          }
        ]
      });

    if (!complaint) {
      return res.status(404).json({ 
        success: false, 
        message: "Complaint not found" 
      });
    }

    if (complaint.bookingId && complaint.bookingId.carId) {
      const carBelongsToShowroom = complaint.bookingId.carId.userId.toString() === showroomId.toString();
      
      if (!carBelongsToShowroom) {
        return res.status(403).json({ 
          success: false, 
          message: "Access denied. This complaint does not belong to your showroom" 
        });
      }
    }

    console.log("✅ Showroom complaint details fetched:", complaintId);

    res.status(200).json({ 
      success: true, 
      complaint,
      message: "Showroom complaint details fetched successfully"
    });
  } catch (error) {
    console.error("❌ Error fetching showroom complaint details:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch showroom complaint details",
      error: error.message
    });
  }
};

// ✅ UPDATE SHOWROOM COMPLAINT STATUS
export const updateShowroomComplaintStatus = async (req, res) => {
  try {
    const showroomId = req.user;
    const complaintId = req.params.id;

    console.log(`🏢 Updating complaint status ${complaintId} for showroom ${showroomId}`);

    // First verify this complaint belongs to showroom's cars
    const complaint = await Complaint.findById(complaintId)
      .populate({
        path: "bookingId",
        populate: {
          path: "carId",
          select: "userId"
        }
      });

    if (!complaint) {
      return res.status(404).json({ 
        success: false, 
        message: "Complaint not found" 
      });
    }

    // Verify that the complaint belongs to this showroom's car
    if (complaint.bookingId && complaint.bookingId.carId) {
      const carBelongsToShowroom = complaint.bookingId.carId.userId.toString() === showroomId.toString();
      
      if (!carBelongsToShowroom) {
        return res.status(403).json({ 
          success: false, 
          message: "Access denied. This complaint does not belong to your showroom" 
        });
      }
    }

    // Update complaint as resolved
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { 
        resolved: true,
        resolvedAt: new Date(),
        resolvedBy: showroomId
      },
      { new: true }
    )
    .populate("user", "name email contactNumber")
    .populate({
      path: "bookingId",
      populate: [
        {
          path: "carId",
          select: "carBrand carModel plateNumber"
        },
        {
          path: "showroomId",
          select: "showroomName ownerName"
        }
      ]
    });

    console.log("✅ Showroom complaint status updated:", complaintId);

    res.status(200).json({ 
      success: true, 
      complaint: updatedComplaint,
      message: "Complaint status updated successfully"
    });
  } catch (error) {
    console.error("❌ Error updating showroom complaint status:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to update complaint status",
      error: error.message
    });
  }
};

// ✅ GET SHOWROOM COMPLAINTS SUMMARY
export const getShowroomComplaintsSummary = async (req, res) => {
  try {
    const showroomId = req.user;

    console.log("📊 Fetching complaints summary for showroom:", showroomId);

    const showroomCars = await Car.find({ userId: showroomId }).select('_id');
    const carIds = showroomCars.map(car => car._id);
    
    const showroomBookings = await Booking.find({ carId: { $in: carIds } }).select('_id');
    const bookingIds = showroomBookings.map(booking => booking._id);

    const totalComplaints = await Complaint.countDocuments({
      bookingId: { $in: bookingIds }
    });

    const resolvedComplaints = await Complaint.countDocuments({
      bookingId: { $in: bookingIds },
      resolved: true
    });

    const pendingComplaints = await Complaint.countDocuments({
      bookingId: { $in: bookingIds },
      resolved: false
    });

    const complaintsByType = await Complaint.aggregate([
      {
        $match: {
          bookingId: { $in: bookingIds }
        }
      },
      {
        $group: {
          _id: "$compl_Against",
          count: { $sum: 1 }
        }
      }
    ]);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentComplaints = await Complaint.countDocuments({
      bookingId: { $in: bookingIds },
      createdAt: { $gte: sevenDaysAgo }
    });

    const summary = {
      total: totalComplaints,
      resolved: resolvedComplaints,
      pending: pendingComplaints,
      recent: recentComplaints,
      resolutionRate: totalComplaints > 0 ? (resolvedComplaints / totalComplaints * 100).toFixed(1) : 0,
      byType: complaintsByType
    };

    console.log("✅ Showroom complaints summary:", summary);

    res.status(200).json({ 
      success: true, 
      summary,
      message: "Showroom complaints summary fetched successfully"
    });
  } catch (error) {
    console.error("❌ Error fetching showroom complaints summary:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch complaints summary",
      error: error.message
    });
  }
};

// ✅ GET SHOWROOM PENDING COMPLAINTS
export const getShowroomPendingComplaints = async (req, res) => {
  try {
    const showroomId = req.user;
    
    console.log("⏳ Fetching pending complaints for showroom:", showroomId);

    const showroomCars = await Car.find({ userId: showroomId }).select('_id');
    const carIds = showroomCars.map(car => car._id);
    
    const showroomBookings = await Booking.find({ carId: { $in: carIds } }).select('_id');
    const bookingIds = showroomBookings.map(booking => booking._id);
    
    const pendingComplaints = await Complaint.find({
      bookingId: { $in: bookingIds },
      resolved: false
    })
    .populate("user", "name email contactNumber")
    .populate("resolvedBy", "name email")
    .populate({
      path: "bookingId",
      populate: [
        {
          path: "carId",
          select: "carBrand carModel year plateNumber images"
        },
        {
          path: "userId",
          select: "name email contactNumber"
        }
      ]
    })
    .sort({ createdAt: -1 });

    console.log(`✅ Found ${pendingComplaints.length} pending complaints for showroom`);

    res.status(200).json({ 
      success: true, 
      complaints: pendingComplaints,
      count: pendingComplaints.length,
      message: "Showroom pending complaints fetched successfully"
    });
  } catch (error) {
    console.error("❌ Error fetching showroom pending complaints:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch pending complaints",
      error: error.message
    });
  }
};

