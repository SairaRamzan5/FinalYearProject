// // import express from "express";
// // import { body } from "express-validator";
// // import {
// //   Signup,
// //   login,
// //   test,
// //   forgotPassword,
// //   resetPassword,
// //   logout,
// //   UpdateProfile,
// //   GetUser,
// //   Getinvoice,
// //   getshowroomcar,
// //   getInvoicesForShowroom,
// // } from "../Controller/users.js";
// // import { showAllShowRooms } from "../Controller/showRoom.js";
// // import { verifyToken } from "../Middleware/verifyToken.js";
// // import multer from "multer";
// // const router = express.Router();
// // import fs from "fs";
// // import path from "path";
// // import { fileURLToPath } from "url";

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);
// // const uploadPath = path.join(__dirname, "../public/uploads");

// // if (!fs.existsSync(uploadPath)) {
// //   console.log("Directory does not exist. Creating directory...");
// //   fs.mkdirSync(uploadPath, { recursive: true });
// // } else {
// //   console.log("Directory exists.");
// // }
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     return cb(null, uploadPath);
// //   },
// //   filename: function (req, file, cb) {
// //     const filename = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;
// //     req.body.images = filename; // Set filename directly to req.body.images
// //     cb(null, filename);
// //     // return cb(null, `${Date.now()}-${file.originalname}`);
// //   },
// // });
// // const upload = multer({ storage });

// // router.post(
// //   "/signup",
// //   [
// //     upload.array("images", 3),
// //     body("ownerName").isLength({ min: 3 }),
// //     body("email").isEmail(),
// //     body("cnic").isLength({ min: 15, max: 15 }),
// //     body("contactNumber").isLength({ min: 12, max: 12 }),
// //   ],
// //   Signup
// // );

// // router.post("/login", [body("email").isEmail()], login);
// // router.post("/forgot-password", forgotPassword);
// // router.post("/reset-password/:token", resetPassword);
// // router.post("/logout", verifyToken, logout);
// // router.put("/updateprofile", verifyToken, UpdateProfile);
// // router.get("/getuser", verifyToken, GetUser);
// // router.get("/getinvoice", verifyToken, Getinvoice);
// // router.get("/get-showroom-invoice", verifyToken, getInvoicesForShowroom);
// // //   this is just for testing purpose
// // router.get("/test", verifyToken, test);
// // router.get("/showrooms", showAllShowRooms);
// // router.get("/getshowroomcar/:showroomid", verifyToken, getshowroomcar);
// // export default router;


// import express from "express";
// import { body } from "express-validator";
// import {
//   Signup,
//   login,
//   test,
//   forgotPassword,
//   resetPassword,
//   logout,
//   UpdateProfile,
//   GetUser,
//   Getinvoice,
//   getshowroomcar,
//   getInvoicesForShowroom,
//   verifyEmail // ADD THIS IMPORT
// } from "../Controller/users.js";
// import { showAllShowRooms } from "../Controller/showRoom.js";
// import { verifyToken } from "../Middleware/verifyToken.js";
// import multer from "multer";
// const router = express.Router();
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

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
//     req.body.images = filename; // Set filename directly to req.body.images
//     cb(null, filename);
//     // return cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });
// const upload = multer({ storage });

// router.post(
//   "/signup",
//   [
//     upload.array("images", 3),
//     body("ownerName").isLength({ min: 3 }),
//     body("email").isEmail(),
//     body("cnic").isLength({ min: 15, max: 15 }),
//     body("contactNumber").isLength({ min: 12, max: 12 }),
//   ],
//   Signup
// );

// // ADD THIS NEW ROUTE FOR MAGIC LINK VERIFICATION
// router.get("/verify-email", verifyEmail);

// router.post("/login", [body("email").isEmail()], login);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password/:token", resetPassword);
// router.post("/logout", verifyToken, logout);
// router.put("/updateprofile", verifyToken, UpdateProfile);
// router.get("/getuser", verifyToken, GetUser);
// router.get("/getinvoice", verifyToken, Getinvoice);
// router.get("/get-showroom-invoice", verifyToken, getInvoicesForShowroom);
// //   this is just for testing purpose
// router.get("/test", verifyToken, test);
// router.get("/showrooms", showAllShowRooms);
// router.get("/getshowroomcar/:showroomid", verifyToken, getshowroomcar);
// export default router;

import express from "express";
import { body } from "express-validator";
import {
  Signup,
  login,
  test,
  forgotPassword,
  resetPassword,
  logout,
  UpdateProfile,
  GetUser,
  Getinvoice,
  getshowroomcar,
  getInvoicesForShowroom,
   getShowroomProfile,
  updateShowroomProfile,
  uploadShowroomImage,
  uploadRegistrationDoc,
  getPublicShowroom,
  getShowroomDocuments,
  verifyEmail // MAKE SURE THIS IS IMPORTED
} from "../Controller/users.js";
import { showAllShowRooms } from "../Controller/showRoom.js";
import { verifyToken } from "../Middleware/verifyToken.js";
import multer from "multer";
const router = express.Router();
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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
    req.body.images = filename; // Set filename directly to req.body.images
    cb(null, filename);
    // return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.post(
  "/signup",
  [
    upload.array("images", 3),
    body("ownerName").isLength({ min: 3 }),
    body("email").isEmail(),
    body("cnic").isLength({ min: 15, max: 15 }),
    body("contactNumber").isLength({ min: 12, max: 12 }),
  ],
  Signup
);

// VERIFICATION ROUTE - MAKE SURE THIS EXISTS
router.get("/verify-email", verifyEmail);

router.post("/login", [body("email").isEmail()], login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/logout", verifyToken, logout);
router.put("/updateprofile", verifyToken, UpdateProfile);
router.get("/getuser", verifyToken, GetUser);
router.get("/getinvoice", verifyToken, Getinvoice);
router.get("/get-showroom-invoice", verifyToken, getInvoicesForShowroom);
//   this is just for testing purpose
router.get("/test", verifyToken, test);
router.get("/showrooms", showAllShowRooms);
router.get("/getshowroomcar/:showroomid", verifyToken, getshowroomcar);
// Showroom Profile Routes
router.get("/showroom/profile", verifyToken, getShowroomProfile);
router.put("/showroom/profile", verifyToken, updateShowroomProfile);
router.post("/showroom/upload-image", verifyToken, upload.single('profileImage'), uploadShowroomImage);
router.post("/showroom/upload-document", verifyToken, upload.single('document'), uploadRegistrationDoc);
router.get("/showroom/public/:id", getPublicShowroom);
router.get("/showroom/documents/:id", getShowroomDocuments);
export default router;