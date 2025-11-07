// // import dotenv from "dotenv";
// // import express from "express";
// // import http from "http";
// // import { Server } from "socket.io";
// // import user from "./routes/user.js";
// // import Booking from "./routes/bookingRoute.js";
// // import admin from "./routes/Admin.js";
// // import dbconnect from "./DB/db.js";
// // import car from "./routes/cars.js";
// // import cookieParser from "cookie-parser";
// // import cors from "cors";
// // import path from "path";
// // import { fileURLToPath } from "url";
// // import Complaints from "./routes/complaints.js";
// // import theftReportRoutes from "./routes/theftReportRoutes.js";
// // import paymentRoutes from "./routes/paymentRoutes.js";
// // import { startAutoReturnService } from './services/autoReturnService.js';




// // dotenv.config();

// // const app = express();
// // const server = http.createServer(app);

// // // Socket.io setup
// // export const io = new Server(server, {
// //   cors: {
// //     origin: "http://localhost:5173",
// //     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
// //   },
// // });

// // // Middleware
// // app.use(express.json());
// // app.use(cookieParser());

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // app.use(
// //   cors({
// //     origin: "http://localhost:5173",
// //     credentials: true,
// //     allowedHeaders: ["Content-Type", "Authorization"],
// //   })
// // );

// // // Connect DB
// // dbconnect();

// // // Routes
// // app.use("/api", user);
// // app.use("/api/admin", admin);
// // app.use("/api/car", car);
// // app.use("/api/bookcar", Booking);
// // app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
// // app.use("/invoices", express.static(path.join(__dirname, "invoices")));
// // app.use("/api/complaints", Complaints);
// // app.use("/uploads/complaints", express.static(path.join(process.cwd(), "uploads/complaints")));
// // app.use("/api/theft-report", theftReportRoutes);
// // app.use("/api/payments", paymentRoutes);




// // const PORT = process.env.PORT || 3000;
// // server.listen(PORT, () => {
// //   console.log(`Server running on http://localhost:${PORT}`);
// // });
// // startAutoReturnService();

// // console.log('⏰ Auto-return service: Immediate returns enabled (no grace period)');
// // export default app;


// //index.js
// import dotenv from "dotenv";
// import express from "express";
// import http from "http";
// import { Server } from "socket.io";
// import user from "./routes/user.js";
// import Booking from "./routes/bookingRoute.js";
// import admin from "./routes/Admin.js";
// import dbconnect from "./DB/db.js";
// import car from "./routes/cars.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import path from "path";
// import { fileURLToPath } from "url";
// import Complaints from "./routes/complaints.js";
// import theftReportRoutes from "./routes/theftReportRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js";
// import { startAutoReturnService } from './services/autoReturnService.js';

// // ✅ IMPORT MODELS TO REGISTER THEM
// import "./Model/signup.js";
// import "./Model/Car.js"; // ✅ Car model register karen
// import "./Model/bookingModel.js";
// import "./Model/invoiceModel.js";
// import "./Model/PaymentHistory.js"; // ✅ PaymentHistory model register karen

// dotenv.config();

// const app = express();
// const server = http.createServer(app);

// // Socket.io setup
// export const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//   },
// });

// // Middleware
// app.use(express.json());
// app.use(cookieParser());

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// // Connect DB
// dbconnect();

// // Routes
// app.use("/api", user);
// app.use("/api/admin", admin);
// app.use("/api/car", car);
// app.use("/api/bookcar", Booking);
// app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
// app.use("/invoices", express.static(path.join(__dirname, "invoices")));
// app.use("/api/complaints", Complaints);
// app.use("/uploads/complaints", express.static(path.join(process.cwd(), "uploads/complaints")));
// app.use("/api/theft-report", theftReportRoutes);
// app.use("/api/payments", paymentRoutes);

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
// startAutoReturnService();

// console.log('⏰ Auto-return service: Immediate returns enabled (no grace period)');
// export default app;

// index.js
import dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import user from "./routes/user.js";
import Booking from "./routes/bookingRoute.js";
import admin from "./routes/Admin.js";
import dbconnect from "./DB/db.js";
import car from "./routes/cars.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import Complaints from "./routes/complaints.js";
import theftReportRoutes from "./routes/theftReportRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import { startAutoReturnService } from './services/autoReturnService.js';
import { startBookingReminderService } from './services/notificationService.js';
import ratingRoutes from './routes/ratings.js';
import warningRoutes from './routes/warningRoutes.js';

// ✅ IMPORT MODELS TO REGISTER THEM
import "./Model/signup.js";
import "./Model/Car.js"; // ✅ Car model register karen
import "./Model/bookingModel.js";
import "./Model/Notification.js"; // ✅ Notification model register karen
import "./Model/invoiceModel.js";
import "./Model/PaymentHistory.js"; // ✅ PaymentHistory model register karen


dotenv.config();

const app = express();
const server = http.createServer(app);

// Socket.io setup
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  },
});

// Middleware
app.use(express.json());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Connect DB
dbconnect();

// Routes
app.use("/api", user);
app.use("/api/admin", admin);
app.use("/api/car", car);
app.use("/api/bookcar", Booking);
app.use("/api/notifications", notificationRoutes); // ✅ Notification routes add karen
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use("/invoices", express.static(path.join(__dirname, "invoices")));
app.use("/api/complaints", Complaints);
app.use("/uploads/complaints", express.static(path.join(process.cwd(), "uploads/complaints")));
app.use("/api/theft-report", theftReportRoutes);
app.use("/api/payments", paymentRoutes);
app.use('/api/showrooms', ratingRoutes);
app.use('/api/warnings', warningRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Start background services
startAutoReturnService();
startBookingReminderService();

console.log('⏰ Auto-return service: Immediate returns enabled (no grace period)');
console.log('🔔 Notification services started successfully');

export default app;