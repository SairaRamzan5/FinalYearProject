import TheftReport from "../Model/TheftReport.js";
import Showroom from "../Model/signup.js";

// ✅ Get theft reports for logged-in showroom only
export const getTheftReportsByShowroom = async (req, res) => {
  try {
    const showroomId = req.user; // From verifyToken middleware
    
    console.log("Showroom ID from token:", showroomId);
    
    // Find showroom details to get showroom name
    const showroom = await Showroom.findById(showroomId);
    
    if (!showroom) {
      return res.status(404).json({ message: "Showroom not found" });
    }

    const showroomName = showroom.showroomName;
    console.log("Fetching theft reports for showroom:", showroomName);

    const reports = await TheftReport.find({
      "rentalDetails.showroomName": showroomName
    }).sort({ createdAt: -1 });
    
    console.log(`Found ${reports.length} theft reports for showroom: ${showroomName}`);
    
    res.status(200).json({ 
      message: `Found ${reports.length} theft reports for your showroom`,
      data: reports 
    });
  } catch (error) {
    console.error("Error fetching showroom theft reports:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get theft reports for logged-in customer only (reports they submitted)
export const getTheftReportsByCustomer = async (req, res) => {
  try {
    const { customerName, cnic } = req.body;

    if (!customerName || !cnic) {
      return res.status(400).json({ 
        message: "Customer name and CNIC are required" 
      });
    }

    const reports = await TheftReport.find({
      customerName: customerName,
      cnic: cnic
    }).sort({ createdAt: -1 });
    
    res.status(200).json({ 
      message: "Theft reports fetched successfully",
      data: reports 
    });
  } catch (error) {
    console.error("Error fetching customer theft reports:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Alternative version using query parameters
export const getTheftReportsByCustomerQuery = async (req, res) => {
  try {
    const { customerName, cnic } = req.query;

    if (!customerName || !cnic) {
      return res.status(400).json({ 
        message: "Customer name and CNIC are required" 
      });
    }

    const reports = await TheftReport.find({
      customerName: customerName,
      cnic: cnic
    }).sort({ createdAt: -1 });
    
    res.status(200).json({ 
      message: "Theft reports fetched successfully",
      data: reports 
    });
  } catch (error) {
    console.error("Error fetching customer theft reports:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createTheftReport = async (req, res) => {
  try {
    const { customerName, cnic, rentalDetails } = req.body;

    if (!customerName || !cnic || !rentalDetails) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const newReport = new TheftReport({
      customerName,
      cnic,
      rentalDetails,
    });

    const savedReport = await newReport.save();
    res.status(201).json({ message: "Theft report submitted", data: savedReport });
  } catch (error) {
    console.error("Error creating theft report:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllTheftReports = async (req, res) => {
  try {
    const reports = await TheftReport.find().sort({ createdAt: -1 });
    res.status(200).json({ data: reports });
  } catch (error) {
    console.error("Error fetching theft reports:", error);
    res.status(500).json({ message: "Server error" });
  }
};