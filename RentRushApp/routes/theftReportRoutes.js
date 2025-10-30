import express from "express";
import { 
  createTheftReport, 
  getAllTheftReports,
  getTheftReportsByShowroom,
  getTheftReportsByCustomer,
  getTheftReportsByCustomerQuery
} from "../Controller/theftReportController.js";
import { verifyToken } from "../Middleware/verifyToken.js";

const router = express.Router();

// POST /api/theft-report -> create new theft report
router.post("/", createTheftReport);

// GET /api/theft-report -> get all theft reports (admin only)
router.get("/", getAllTheftReports);

// GET /api/theft-report/showroom -> get showroom-specific theft reports
router.get("/showroom", verifyToken, getTheftReportsByShowroom);

// GET /api/theft-report/customer -> get customer-specific theft reports (using query params)
router.get("/customer", getTheftReportsByCustomerQuery);

// POST /api/theft-report/customer -> get customer-specific theft reports (using request body)
router.post("/customer-reports", getTheftReportsByCustomer);


export default router;