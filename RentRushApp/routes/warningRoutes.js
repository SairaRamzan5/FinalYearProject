import express from "express";
import Warning from "../Model/Warning.js";
import User from "../Model/signup.js";
import { verifyToken } from "../Middleware/verifyToken.js"; // Named import use karein

const router = express.Router();

// Send warning to showroom
router.post("/send-warning", verifyToken, async (req, res) => {
  try {
    const { showroomId, warningType, title, message, resolutionRate, totalComplaints, resolvedComplaints } = req.body;

    // Check if user is admin
    if (req.role !== "admin") { // req.role use karein
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only."
      });
    }

    const warning = new Warning({
      showroomId,
      warningType,
      title,
      message,
      resolutionRate,
      totalComplaints,
      resolvedComplaints,
      sentBy: req.user // req.user use karein
    });

    await warning.save();

    res.status(201).json({
      success: true,
      message: "Warning sent successfully",
      warning: warning
    });
  } catch (error) {
    console.error("Error sending warning:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send warning"
    });
  }
});

// Get warnings for a showroom
router.get("/showroom-warnings/:showroomId", verifyToken, async (req, res) => {
  try {
    const { showroomId } = req.params;

    const warnings = await Warning.find({ 
      showroomId,
      status: "ACTIVE"
    })
    .populate("sentBy", "name email")
    .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      warnings
    });
  } catch (error) {
    console.error("Error fetching warnings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch warnings"
    });
  }
});

// Get warnings for current showroom user
router.get("/my-warnings", verifyToken, async (req, res) => {
  try {
    const showroomId = req.user; // Current user ID

    const warnings = await Warning.find({ 
      showroomId,
      status: "ACTIVE"
    })
    .populate("sentBy", "name email")
    .sort({ createdAt: -1 });

    // Calculate unread count
    const unreadCount = await Warning.countDocuments({
      showroomId,
      status: "ACTIVE",
      acknowledged: false
    });

    res.status(200).json({
      success: true,
      warnings,
      unreadCount
    });
  } catch (error) {
    console.error("Error fetching warnings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch warnings"
    });
  }
});

// Acknowledge warning
router.put("/acknowledge-warning/:warningId", verifyToken, async (req, res) => {
  try {
    const { warningId } = req.params;

    const warning = await Warning.findByIdAndUpdate(
      warningId,
      {
        acknowledged: true,
        acknowledgedAt: new Date(),
        acknowledgedBy: req.user, // req.user use karein
        status: "RESOLVED"
      },
      { new: true }
    );

    if (!warning) {
      return res.status(404).json({
        success: false,
        message: "Warning not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Warning acknowledged",
      warning
    });
  } catch (error) {
    console.error("Error acknowledging warning:", error);
    res.status(500).json({
      success: false,
      message: "Failed to acknowledge warning"
    });
  }
});

// Get all active warnings (admin view)
router.get("/all-active", verifyToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.role !== "admin") { // req.role use karein
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only."
      });
    }

    const warnings = await Warning.find({ status: "ACTIVE" })
      .populate("showroomId", "showroomName email address")
      .populate("sentBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      warnings
    });
  } catch (error) {
    console.error("Error fetching warnings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch warnings"
    });
  }
});

export default router;