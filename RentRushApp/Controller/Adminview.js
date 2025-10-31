// import Status_Model from "../Model/showroomStatus.js";
// import signup from "../Model/signup.js";
// export const Adminview = async (req, res) => {
//   const Admin_view = await signup.aggregate([
//     {
//       $match: { role: { $in: ["showroom", "client"] } },
//     },
//     {
//       $lookup: {
//         from: "showroomstatuses", // name of the collection for the status model in lowercase
//         localField: "_id",
//         foreignField: "showroomId",
//         as: "status",
//       },
//     },
//     {
//       $unwind: {
//         path: "$status",
//         preserveNullAndEmptyArrays: true,
//       },
//     },
//     {
//       $project: {
//         showroomName: 1,
//         ownerName: 1,
//         cnic: 1,
//         contactNumber: 1,
//         address: 1,
//         email: 1,
//         password: 1,
//         role: 1,
//         images: 1,
//         status: {
//           $cond: {
//             if: { $eq: ["$role", "showroom"] },
//             then: { $ifNull: ["$status.status", "active"] },
//             else: "$$REMOVE",
//           },
//         },
//         isApproved: {
//           $cond: {
//             if: { $eq: ["$role", "showroom"] },
//             then: { $ifNull: ["$status.approved", 0] },
//             else: "$$REMOVE",
//           },
//         },
//         createdAt: 1,
//       },
//     },
//   ]);

//   if (!Admin_view || Admin_view.length === 0) {
//     return res.status(404).json({ msg: "No data found" });
//   }
//   const showroomData = [];
//   const clientData = [];
//   console.log(Array.isArray(Admin_view)); //just check for selfpurpose
//   Admin_view.forEach((item) => {
//     if (item.role === "showroom") {
//       showroomData.push(item);
//     } else if (item.role === "client") {
//       clientData.push(item);
//     }
//   });
//   //  console.log("showroomdata",showroomData)
//   //  console.log("clientdata",clientData)
//   res.json({
//     showroomSection: showroomData,
//     clientSection: clientData,
//   });
// };
// export const BanShowroom = async (req, res) => {
//   const { showroomid } = req.params;
//   // console.log(showroomid)
//   try {
//     const showroom = await signup.findById(showroomid);
//     // console.log(showroom)
//     const exist_ban = await Status_Model.findOne({
//       showroomId: showroomid,
//     });
//     if (exist_ban) {
//       if (exist_ban?.status === "banned") {
//         exist_ban.status = "active";
//         await exist_ban.save();
//         return res.status(200).json({ msg: "Activated successfully" });
//       }

//       if (exist_ban?.status === "active") {
//         exist_ban.status = "banned";
//         await exist_ban.save();
//         return res.status(200).json({ msg: "Banned successfully" });
//       }
//     } else {
//       const newStatus = new Status_Model({
//         showroomId: showroomid,
//         status: "banned",
//       });
//       await newStatus.save();
//     }
//     return res.status(200).json({ msg: "Banned successfully" });
//   } catch (error) {
//     return res.status(500).json({ msg: "Error banning", error: error.message });
//   }
// };
// export const Show_BanShow_Room = async (req, res) => {
//   try {
//     const Ban_Data = await Status_Model.find().populate("showroomId");
//     if (!Ban_Data || Ban_Data.length === 0) {
//       return res.status(404).json({ message: "No Ban Showroom" });
//     }
//     return res.status(201).json({ BanUser: Ban_Data });
//   } catch (error) {
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };
// export const Active_Show_Room = async (req, res) => {
//   const { BanId } = req.body;
//   const Update_Data = await Status_Model.findByIdAndDelete(BanId);
//   if (Update_Data) {
//     console.log(Update_Data);
//     res.json("update data");
//   }
// };

// // Fetch all pending showrooms
// export const getPendingShowrooms = async (req, res) => {
//   try {
//     const pendingShowrooms = await Status_Model.find({ approved: 0 }).populate(
//       "showroomId"
//     );
//     res.json(pendingShowrooms);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching pending showrooms" });
//   }
// };

// // Approve showroom
// export const approveShowroom = async (req, res) => {
//   const { id } = req.params;
//   const { isApproved } = req.body;

//   try {
//     const status = await Status_Model.findOne({
//       showroomId: id,
//     }).populate("showroomId");
//     if (!status || status.approved === 1) {
//       return res
//         .status(404)
//         .json({ error: "Showroom not found or already approved" });
//     }

//     // Approve showroom
//     if (isApproved) {
//       status.approved = 1;
//       await status.save();
//       return res.json({ message: "Showroom approved!" });
//     } else {
//       await signup.deleteOne({ _id: status.showroomId._id });
//       await Status_Model.deleteOne({ showroomId: id });
//       return res.json({ message: "Showroom approval rejected!" });
//     }
//   } catch (error) {
//     console.error("Error approving showroom:", error);
//     res.status(500).json({ error: "Error approving showroom" });
//   }
// };


import Status_Model from "../Model/showroomStatus.js";
import signup from "../Model/signup.js";
import nodemailer from "nodemailer";
import Car from "../Model/Car.js";
import Booking from "../Model/bookingModel.js";


export const Adminview = async (req, res) => {
  const Admin_view = await signup.aggregate([
    {
      $match: { role: { $in: ["showroom", "client"] } },
    },
    {
      $lookup: {
        from: "showroomstatuses", // name of the collection for the status model in lowercase
        localField: "_id",
        foreignField: "showroomId",
        as: "status",
      },
    },
    {
      $unwind: {
        path: "$status",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        showroomName: 1,
        ownerName: 1,
        cnic: 1,
        contactNumber: 1,
        address: 1,
        email: 1,
        password: 1,
        role: 1,
        images: 1,
        status: {
          $cond: {
            if: { $eq: ["$role", "showroom"] },
            then: { $ifNull: ["$status.status", "active"] },
            else: "$$REMOVE",
          },
        },
        isApproved: {
          $cond: {
            if: { $eq: ["$role", "showroom"] },
            then: { $ifNull: ["$status.approved", 0] },
            else: "$$REMOVE",
          },
        },
        createdAt: 1,
      },
    },
  ]);

  if (!Admin_view || Admin_view.length === 0) {
    return res.status(404).json({ msg: "No data found" });
  }
  const showroomData = [];
  const clientData = [];
  console.log(Array.isArray(Admin_view)); //just check for selfpurpose
  Admin_view.forEach((item) => {
    if (item.role === "showroom") {
      showroomData.push(item);
    } else if (item.role === "client") {
      clientData.push(item);
    }
  });
  //  console.log("showroomdata",showroomData)
  //  console.log("clientdata",clientData)
  res.json({
    showroomSection: showroomData,
    clientSection: clientData,
  });
};

// export const BanShowroom = async (req, res) => {
//   const { showroomid } = req.params;
//   // console.log(showroomid)
//   try {
//     const showroom = await signup.findById(showroomid);
//     // console.log(showroom)
//     const exist_ban = await Status_Model.findOne({
//       showroomId: showroomid,
//     });
//     if (exist_ban) {
//       if (exist_ban?.status === "banned") {
//         exist_ban.status = "active";
//         await exist_ban.save();
//         return res.status(200).json({ msg: "Activated successfully" });
//       }

//       if (exist_ban?.status === "active") {
//         exist_ban.status = "banned";
//         await exist_ban.save();
//         return res.status(200).json({ msg: "Banned successfully" });
//       }
//     } else {
//       const newStatus = new Status_Model({
//         showroomId: showroomid,
//         status: "banned",
//       });
//       await newStatus.save();
//     }
//     return res.status(200).json({ msg: "Banned successfully" });
//   } catch (error) {
//     return res.status(500).json({ msg: "Error banning", error: error.message });
//   }
// };

export const BanShowroom = async (req, res) => {
  const { showroomid } = req.params;
  
  try {
    console.log(`🚫 Attempting to ban showroom: ${showroomid}`);

    // First check if showroom has active bookings
    const showroomCars = await Car.find({ userId: showroomid }).select("_id");
    console.log(`🚗 Found ${showroomCars.length} cars for showroom ${showroomid}`);
    
    const carIds = showroomCars.map(car => car._id);
    
    let activeBookings = [];
    if (carIds.length > 0) {
      activeBookings = await Booking.find({
        carId: { $in: carIds },
        status: { 
          $in: [
            'confirmed', 
            'active', 
            'ongoing', 
            'pending', 
            'approved',
            'pending payment',
            'return initiated'
          ] 
        }
      });
      
      console.log(`📊 Found ${activeBookings.length} active bookings for showroom ${showroomid}`);
      
      // Log active booking details for debugging
      activeBookings.forEach((booking, index) => {
        console.log(`  📝 Active Booking ${index + 1}:`, {
          id: booking._id,
          status: booking.status,
          carId: booking.carId,
          dates: `${booking.rentalStartDate} to ${booking.rentalEndDate}`
        });
      });
    }

    if (activeBookings.length > 0) {
      return res.status(400).json({
        msg: `Cannot ban showroom. It has ${activeBookings.length} active booking(s). Please wait for all bookings to complete.`
      });
    }

    const showroom = await signup.findById(showroomid);
    const exist_ban = await Status_Model.findOne({
      showroomId: showroomid,
    });
    
    if (exist_ban) {
      if (exist_ban?.status === "banned") {
        exist_ban.status = "active";
        await exist_ban.save();
        console.log(`✅ Showroom ${showroomid} activated successfully`);
        return res.status(200).json({ msg: "Activated successfully" });
      }

      if (exist_ban?.status === "active") {
        exist_ban.status = "banned";
        await exist_ban.save();
        console.log(`✅ Showroom ${showroomid} banned successfully`);
        return res.status(200).json({ msg: "Banned successfully" });
      }
    } else {
      const newStatus = new Status_Model({
        showroomId: showroomid,
        status: "banned",
      });
      await newStatus.save();
      console.log(`✅ Showroom ${showroomid} banned successfully (new status record)`);
      return res.status(200).json({ msg: "Banned successfully" });
    }
    
  } catch (error) {
    console.error("❌ Error banning showroom:", error);
    return res.status(500).json({ msg: "Error banning", error: error.message });
  }
};
export const Show_BanShow_Room = async (req, res) => {
  try {
    const Ban_Data = await Status_Model.find().populate("showroomId");
    if (!Ban_Data || Ban_Data.length === 0) {
      return res.status(404).json({ message: "No Ban Showroom" });
    }
    return res.status(201).json({ BanUser: Ban_Data });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const Active_Show_Room = async (req, res) => {
  const { BanId } = req.body;
  const Update_Data = await Status_Model.findByIdAndDelete(BanId);
  if (Update_Data) {
    console.log(Update_Data);
    res.json("update data");
  }
};

// Fetch all pending showrooms
export const getPendingShowrooms = async (req, res) => {
  try {
    const pendingShowrooms = await Status_Model.find({ approved: 0 }).populate(
      "showroomId"
    );
    res.json(pendingShowrooms);
  } catch (error) {
    res.status(500).json({ error: "Error fetching pending showrooms" });
  }
};

// Approve showroom with email notification
export const approveShowroom = async (req, res) => {
  const { id } = req.params;
  const { isApproved } = req.body;

  try {
    const status = await Status_Model.findOne({
      showroomId: id,
    }).populate("showroomId");
    
    if (!status || status.approved === 1) {
      return res
        .status(404)
        .json({ error: "Showroom not found or already approved" });
    }

    // Approve showroom
    if (isApproved) {
      status.approved = 1;
      await status.save();
      
      // ✅ Send approval confirmation email to showroom owner
      await sendApprovalConfirmationEmail(status.showroomId);
      
      return res.json({ message: "Showroom approved successfully!" });
    } else {
      // Reject showroom
      await signup.deleteOne({ _id: status.showroomId._id });
      await Status_Model.deleteOne({ showroomId: id });
      
      // ✅ Send rejection email to showroom owner
      await sendRejectionEmail(status.showroomId);
      
      return res.json({ message: "Showroom approval rejected!" });
    }
  } catch (error) {
    console.error("Error approving showroom:", error);
    res.status(500).json({ error: "Error approving showroom" });
  }
};

// ✅ NEW: Function to send approval confirmation email
const sendApprovalConfirmationEmail = async (showroom) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: showroom.email,
      subject: "🎉 Your Showroom Has Been Approved! - RentRush",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; color: white;">
            <h1 style="margin: 0; font-size: 28px;">🎉 Congratulations!</h1>
            <p style="font-size: 18px; margin: 10px 0 0 0;">Your Showroom Has Been Approved</p>
          </div>
          
          <div style="padding: 30px;">
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              Dear <strong>${showroom.ownerName}</strong>,
            </p>
            
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              We are pleased to inform you that your showroom <strong>"${showroom.showroomName}"</strong> has been successfully approved by our admin team.
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #28a745; margin: 20px 0;">
              <h3 style="color: #28a745; margin-top: 0;">📋 Showroom Details:</h3>
              <p><strong>Showroom Name:</strong> ${showroom.showroomName}</p>
              <p><strong>Owner Name:</strong> ${showroom.ownerName}</p>
              <p><strong>Contact Number:</strong> ${showroom.contactNumber}</p>
              <p><strong>Address:</strong> ${showroom.address}</p>
            </div>
            
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              You can now start using all the features of RentRush platform:
            </p>
            
            <ul style="font-size: 16px; color: #333; line-height: 1.6;">
              <li>✅ Add your cars for rental</li>
              <li>✅ Manage your inventory</li>
              <li>✅ Receive booking requests</li>
              <li>✅ Process payments</li>
              <li>✅ And much more!</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="http://localhost:5173/login" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 14px 35px; 
                        text-decoration: none; 
                        border-radius: 25px; 
                        font-size: 16px; 
                        font-weight: bold;
                        display: inline-block;">
                🚀 Login to Your Account
              </a>
            </div>
            
            <p style="font-size: 14px; color: #666; text-align: center;">
              If you have any questions, feel free to contact our support team.
            </p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              Best regards,<br>
              <strong>RentRush Team</strong>
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Approval confirmation email sent to: ${showroom.email}`);
    
  } catch (error) {
    console.error("❌ Error sending approval confirmation email:", error);
    // Don't throw error here to avoid affecting the main approval process
  }
};

// ✅ NEW: Function to send rejection email
const sendRejectionEmail = async (showroom) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: showroom.email,
      subject: "Update on Your Showroom Registration - RentRush",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Showroom Registration Update</h2>
          <p>Dear ${showroom.ownerName},</p>
          <p>We regret to inform you that your showroom registration for <strong>${showroom.showroomName}</strong> has not been approved at this time.</p>
          <p>Please contact our support team for more information or to resubmit your application.</p>
          <br>
          <p>Best regards,<br>RentRush Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Rejection email sent to: ${showroom.email}`);
  } catch (error) {
    console.error("❌ Error sending rejection email:", error);
  }
};

// ✅ GET ACTIVE BOOKINGS COUNT FOR ANY SHOWROOM (For Admin)
export const getShowroomActiveBookingsCount = async (req, res) => {
  try {
    const { showroomid } = req.params;
    console.log("🔍 ADMIN: Checking active bookings for showroom:", showroomid);

    // Step 1: Get all cars belonging to this showroom
    const showroomCars = await Car.find({ userId: showroomid }).select("_id");
    const carIds = showroomCars.map(car => car._id);
    console.log(`🚗 Found ${carIds.length} cars for showroom ${showroomid}`);

    if (carIds.length === 0) {
      return res.json({
        success: true,
        activeBookingsCount: 0,
        carCount: 0,
        message: "No cars found for this showroom"
      });
    }

    // Step 2: Count ACTIVE bookings for these cars
    const activeBookingCount = await Booking.countDocuments({
      carId: { $in: carIds },
      status: { 
        $in: [
          'confirmed', 
          'active', 
          'pending', 
          'approved',
          'pending payment',
          'return initiated'
        ] 
      }
    });

    console.log(`📊 ADMIN: Showroom ${showroomid} has ${activeBookingCount} active bookings`);

    res.json({
      success: true,
      activeBookingsCount: activeBookingCount,
      carCount: carIds.length,
      message: `Found ${activeBookingCount} active bookings for showroom`
    });

  } catch (error) {
    console.error("❌ ADMIN: Error checking active bookings:", error);
    res.status(500).json({
      success: false,
      activeBookingsCount: 0,
      error: error.message
    });
  }
};