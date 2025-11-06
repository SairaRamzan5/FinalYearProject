import express from "express";
import { verifyToken } from "../Middleware/verifyToken.js";
import {
  submitRating,
  getShowroomRatings,
  getUserRating,
  getRatingStats
} from "../Controller/ratingController.js";

const router = express.Router();

// ⭐ RATING ROUTES

// Submit/update rating for showroom
router.post("/:showroomId/ratings", verifyToken, submitRating);

// Get all ratings for a showroom
router.get("/:showroomId/ratings", getShowroomRatings);

// Get user's specific rating for a showroom
router.get("/:showroomId/ratings/user", verifyToken, getUserRating);

// Get rating statistics for showroom
router.get("/:showroomId/ratings/stats", getRatingStats);

export default router;