// import express from "express";
// import multer from "multer";
// import {
//   addCar,
//   completeMaintenance,
//   getAllCars,
//   getAllPaymentCars,
//   getAllReturnCars,
//   getCars,
//   markPaymentReceived,
//   removeCar,
//   searchCar,
//   startMaintenance,
//   updateCar,
//   updateReturnDetails,
//   getCarsForGuests, // Add this
//   getCarDetailsForGuest 
// } from "../Controller/carsController.js";

// import { verifyToken } from "../Middleware/verifyToken.js";

// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";
// import { isShowroomApproved } from "../Middleware/verifyShowRoomStauts.js";

// // 🔹 Import Invoice model
// import Invoice from "../Model/invoiceModel.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const uploadPath = path.join(__dirname, "../public/uploads");

// if (!fs.existsSync(uploadPath)) {
//   console.log("Directory does not exist. Creating directory...");
//   fs.mkdirSync(uploadPath, { recursive: true });
// } else {
//   console.log("Directory exists.");
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     return cb(null, uploadPath);
//   },
//   filename: function (req, file, cb) {
//     const filename = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;
//     if (!req.body.images) {
//       req.body.images = [];
//     }
//     req.body.images.push(filename);
//     cb(null, filename);
//   },
// });
// const upload = multer({ storage });
// const router = express.Router();

// router.post(
//   "/add",
//   upload.array("images", 3),
//   verifyToken,
//   isShowroomApproved,
//   addCar
// );
// router.put(
//   "/update/:Id",
//   upload.array("images", 3),
//   verifyToken,
//   isShowroomApproved,
//   updateCar
// );
// router.get("/get-all-cars", verifyToken, isShowroomApproved, getAllCars);
// router.get("/get-all-return-cars", verifyToken, isShowroomApproved, getAllReturnCars);
// router.get("/get-all-payment-cars", verifyToken, isShowroomApproved, getAllPaymentCars);
// router.get("/get-cars", verifyToken, getCars);
// router.delete("/delete/:id", verifyToken, isShowroomApproved, removeCar);
// router.get("/search", searchCar);
// router.post("/return", verifyToken, updateReturnDetails);

// router.post("/start-maintenance", verifyToken, isShowroomApproved, startMaintenance);
// router.post("/complete-maintenance/:id", verifyToken, isShowroomApproved, completeMaintenance);

// router.post("/mark-payment-received/:id", verifyToken, isShowroomApproved, markPaymentReceived);



// // 🔹 Temporary Invoice update route
// router.patch("/invoice/:id", verifyToken, isShowroomApproved, async (req, res) => {
//   try {
//     const { status, paymentMethod, paymentNotes } = req.body;

//     const invoice = await Invoice.findByIdAndUpdate(
//       req.params.id,
//       {
//         status,
//         paymentMethod,
//         paymentNotes,
//         paymentStatus: status === "paid" ? "Completed" : "Pending",
//         isCompleted: status === "paid",
//       },
//       { new: true }
//     );

//     if (!invoice) {
//       return res.status(404).json({ message: "Invoice not found" });
//     }

//     res.json({ message: "Invoice updated successfully", invoice });
//   } catch (err) {
//     console.error("Invoice update error:", err);
//     res.status(500).json({ message: "Failed to update invoice", error: err.message });
//   }
// });


// export default router;


import express from "express";
import multer from "multer";
import {
  addCar,
  completeMaintenance,
  getAllCars,
  getAllPaymentCars,
  getAllReturnCars,
  getCars,
  markPaymentReceived,
  removeCar,
  searchCar,
  startMaintenance,
  updateCar,
  updateReturnDetails,
  getCarsForGuests, // Add this
  getCarDetailsForGuest, // Add this
  confirmPayment
} from "../Controller/carsController.js";
import { getMaintenanceHistory } from "../Controller/carsController.js";

import { verifyToken } from "../Middleware/verifyToken.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { isShowroomApproved } from "../Middleware/verifyShowRoomStauts.js";

// 🔹 Import Invoice model
import Invoice from "../Model/invoiceModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPath = path.join(__dirname, "../public/uploads");

if (!fs.existsSync(uploadPath)) {
  console.log("Directory does not exist. Creating directory...");
  fs.mkdirSync(uploadPath, { recursive: true });
} else {
  console.log("Directory exists.");
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;
    if (!req.body.images) {
      req.body.images = [];
    }
    req.body.images.push(filename);
    cb(null, filename);
  },
});
const upload = multer({ storage });
const router = express.Router();

// 🔹 PUBLIC ROUTES (No authentication required)
router.get("/public/cars", getCarsForGuests); // Guest access to cars
router.get("/public/cars/:id", getCarDetailsForGuest); // Single car details for guests
router.get("/public/search", searchCar); // Search for guests

// 🔹 PROTECTED ROUTES (Require authentication)
router.post(
  "/add",
  upload.array("images", 3),
  verifyToken,
  isShowroomApproved,
  addCar
);
router.put(
  "/update/:Id",
  upload.array("images", 3),
  verifyToken,
  isShowroomApproved,
  updateCar
);
router.get("/get-all-cars", verifyToken, isShowroomApproved, getAllCars);
router.get("/get-all-return-cars", verifyToken, isShowroomApproved, getAllReturnCars);
router.get("/get-all-payment-cars", verifyToken, isShowroomApproved, getAllPaymentCars);
router.get("/get-cars", verifyToken, getCars);
router.delete("/delete/:id", verifyToken, isShowroomApproved, removeCar);
router.get("/search", verifyToken, searchCar);
router.post("/return", verifyToken, updateReturnDetails);

router.post("/start-maintenance", verifyToken, isShowroomApproved, startMaintenance);
router.post("/complete-maintenance/:id", verifyToken, isShowroomApproved, completeMaintenance);

router.post("/mark-payment-received/:id", verifyToken, isShowroomApproved, markPaymentReceived);
router.post("/confirm-payment", verifyToken, isShowroomApproved, confirmPayment); // New payment confirmation route
router.get("/maintenance-history", verifyToken, isShowroomApproved, getMaintenanceHistory);



// 🔹 Temporary Invoice update route
router.patch("/invoice/:id", verifyToken, isShowroomApproved, async (req, res) => {
  try {
    const { status, paymentMethod, paymentNotes } = req.body;

    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      {
        status,
        paymentMethod,
        paymentNotes,
        paymentStatus: status === "paid" ? "Completed" : "Pending",
        isCompleted: status === "paid",
      },
      { new: true }
    );

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.json({ message: "Invoice updated successfully", invoice });
  } catch (err) {
    console.error("Invoice update error:", err);
    res.status(500).json({ message: "Failed to update invoice", error: err.message });
  }
});

export default router;