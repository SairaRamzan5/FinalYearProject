// import express from "express";
// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import { verifyToken } from "../Middleware/verifyToken.js";
// import { 
//   createComplaint, 
//   getAllComplaints, 
//   getComplaintById, 
//   resolveComplaint,
//   getUserComplaints,
//   getShowroomComplaintsList,
//   getShowroomComplaintDetails,
//   updateShowroomComplaintStatus,
//   getShowroomComplaintsSummary,
//   getShowroomPendingComplaints
// } from "../Controller/completeController.js";

// const router = express.Router();

// // 🗂 Create uploads folder if missing
// const uploadDir = "uploads/complaints";
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // ⚙️ Multer storage setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
// });

// const upload = multer({ storage });

// /* -------------------------------------------------------------------------- */
// /* 📨 POST: Create a new Complaint                                            */
// /* -------------------------------------------------------------------------- */
// router.post("/", verifyToken, upload.single("proof"), createComplaint);

// /* -------------------------------------------------------------------------- */
// /* 📜 GET: All Complaints (Admin only)                                        */
// /* -------------------------------------------------------------------------- */
// router.get("/all", verifyToken, getAllComplaints);

// /* -------------------------------------------------------------------------- */
// /* 📄 GET: Single Complaint by ID                                             */
// /* -------------------------------------------------------------------------- */
// router.get("/:id", verifyToken, getComplaintById);

// /* -------------------------------------------------------------------------- */
// /* ✅ PUT: Mark Complaint as Resolved                                         */
// /* -------------------------------------------------------------------------- */
// router.put("/:id/resolve", verifyToken, resolveComplaint);

// /* -------------------------------------------------------------------------- */
// /* 👤 GET: User's Own Complaints                                              */
// /* -------------------------------------------------------------------------- */
// router.get("/user/my-complaints", verifyToken, getUserComplaints);

// /* -------------------------------------------------------------------------- */
// /* 🏢 SHOWROOM COMPLAINTS ROUTES                                              */
// /* -------------------------------------------------------------------------- */

// /* 📋 GET: Showroom's All Complaints List */
// router.get("/showroom/list", verifyToken, getShowroomComplaintsList);

// /* 📊 GET: Showroom Complaints Summary & Statistics */
// router.get("/showroom/summary", verifyToken, getShowroomComplaintsSummary);

// /* ⏳ GET: Showroom's Pending Complaints */
// router.get("/showroom/pending", verifyToken, getShowroomPendingComplaints);

// /* 📄 GET: Showroom Single Complaint Details */
// router.get("/showroom/:id", verifyToken, getShowroomComplaintDetails);

// /* ✅ PUT: Update Showroom Complaint Status */
// router.put("/showroom/:id/status", verifyToken, updateShowroomComplaintStatus);

// export default router;

// routes/complaints.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { verifyToken } from "../Middleware/verifyToken.js";
import { 
  createComplaint, 
  getAllComplaints, 
  getComplaintById, 
  resolveComplaint,
  getUserComplaints,
  getShowroomComplaintsList,
  getShowroomComplaintDetails,
  updateShowroomComplaintStatus,
  getShowroomComplaintsSummary,
  getShowroomPendingComplaints
} from "../Controller/completeController.js";

const router = express.Router();

// 🗂 Create uploads folder if missing
const uploadDir = "uploads/complaints";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ⚙️ Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

/* -------------------------------------------------------------------------- */
/* 📨 POST: Create a new Complaint                                            */
/* -------------------------------------------------------------------------- */
router.post("/", verifyToken, upload.single("proof"), createComplaint);

/* -------------------------------------------------------------------------- */
/* 📜 GET: All Complaints (Admin only)                                        */
/* -------------------------------------------------------------------------- */
router.get("/all", verifyToken, getAllComplaints);

/* -------------------------------------------------------------------------- */
/* 📄 GET: Single Complaint by ID                                             */
/* -------------------------------------------------------------------------- */
router.get("/:id", verifyToken, getComplaintById);

/* -------------------------------------------------------------------------- */
/* ✅ PUT: Mark Complaint as Resolved                                         */
/* -------------------------------------------------------------------------- */
router.put("/:id/resolve", verifyToken, resolveComplaint);

/* -------------------------------------------------------------------------- */
/* 👤 GET: User's Own Complaints                                              */
/* -------------------------------------------------------------------------- */
router.get("/user/my-complaints", verifyToken, getUserComplaints);

/* -------------------------------------------------------------------------- */
/* 🏢 SHOWROOM COMPLAINTS ROUTES                                              */
/* -------------------------------------------------------------------------- */

/* 📋 GET: Showroom's All Complaints List */
router.get("/showroom/list", verifyToken, getShowroomComplaintsList);

/* 📊 GET: Showroom Complaints Summary & Statistics */
router.get("/showroom/summary", verifyToken, getShowroomComplaintsSummary);

/* ⏳ GET: Showroom's Pending Complaints */
router.get("/showroom/pending", verifyToken, getShowroomPendingComplaints);

/* 📄 GET: Showroom Single Complaint Details */
router.get("/showroom/:id", verifyToken, getShowroomComplaintDetails);

/* ✅ PUT: Update Showroom Complaint Status */
router.put("/showroom/:id/status", verifyToken, updateShowroomComplaintStatus);

export default router;