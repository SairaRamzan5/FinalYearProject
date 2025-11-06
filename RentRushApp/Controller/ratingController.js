import Users_data from "../Model/signup.js";
import Rating from "../Model/Rating.js";
import mongoose from "mongoose";

// ✅ Submit rating for showroom
export const submitRating = async (req, res) => {
  try {
    const { showroomId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user; // Using req.user from your verifyToken

    console.log("⭐ Submitting rating for showroom:", { 
      showroomId, 
      rating, 
      userId
    });

    // Check if user is authenticated
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please log in to submit a rating."
      });
    }

    // Validate input
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5 stars"
      });
    }

    // Check if showroom exists
    const showroom = await Users_data.findById(showroomId);
    if (!showroom) {
      return res.status(404).json({
        success: false,
        message: "Showroom not found"
      });
    }

    // Check if user exists
    const user = await Users_data.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Check if user has already rated this showroom
    const existingRating = await Rating.findOne({
      showroom: showroomId,
      user: userId
    });

    let savedRating;

    if (existingRating) {
      // Update existing rating
      existingRating.rating = rating;
      existingRating.comment = comment || existingRating.comment;
      savedRating = await existingRating.save();
      console.log("✅ Rating updated:", existingRating._id);
    } else {
      // Create new rating
      const newRating = new Rating({
        showroom: showroomId,
        user: userId,
        rating,
        comment: comment || ""
      });

      savedRating = await newRating.save();
      console.log("✅ New rating submitted:", newRating._id);
    }

    // Calculate new average rating
    const ratings = await Rating.find({ showroom: showroomId });
    const totalRatings = ratings.length;
    const averageRating = totalRatings > 0 ? ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings : 0;

    // Update showroom with new rating data
    await Users_data.findByIdAndUpdate(showroomId, {
      averageRating: parseFloat(averageRating.toFixed(1)),
      totalRatings: totalRatings,
      $addToSet: { ratings: savedRating._id }
    });

    // Get the submitted/updated rating with proper user details
    const submittedRating = await Rating.findById(savedRating._id)
      .populate("user", "name email showroomName ownerName"); // Added more fields

    res.status(200).json({
      success: true,
      message: existingRating ? "Rating updated successfully" : "Rating submitted successfully",
      rating: submittedRating,
      averageRating: parseFloat(averageRating.toFixed(1)),
      totalRatings: totalRatings
    });

  } catch (error) {
    console.error("❌ Error submitting rating:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit rating",
      error: error.message
    });
  }
};

// ✅ Get all ratings for a showroom - UPDATED POPULATION
export const getShowroomRatings = async (req, res) => {
  try {
    const { showroomId } = req.params;

    const ratings = await Rating.find({ showroom: showroomId })
      .populate("user", "name email showroomName ownerName") // Added more fields
      .sort({ createdAt: -1 });

    console.log(`✅ Found ${ratings.length} ratings for showroom ${showroomId}`);
    
    // Debug: Check what user data is being returned
    if (ratings.length > 0) {
      console.log("📝 Sample rating user data:", {
        ratingId: ratings[0]._id,
        user: ratings[0].user,
        userName: ratings[0].user?.name,
        userEmail: ratings[0].user?.email
      });
    }

    res.status(200).json({
      success: true,
      ratings,
      count: ratings.length,
      message: "Ratings fetched successfully"
    });

  } catch (error) {
    console.error("❌ Error fetching ratings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch ratings",
      error: error.message
    });
  }
};

// ✅ Get user's rating for a showroom
export const getUserRating = async (req, res) => {
  try {
    const { showroomId } = req.params;
    const userId = req.user;

    console.log("🔍 Fetching user rating:", { showroomId, userId });

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }

    const rating = await Rating.findOne({
      showroom: showroomId,
      user: userId
    }).populate("user", "name email showroomName ownerName"); // Added more fields

    res.status(200).json({
      success: true,
      rating: rating || null,
      message: "User rating fetched successfully"
    });

  } catch (error) {
    console.error("❌ Error fetching user rating:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user rating",
      error: error.message
    });
  }
};

// ✅ Get rating statistics for showroom
export const getRatingStats = async (req, res) => {
  try {
    const { showroomId } = req.params;

    const stats = await Rating.aggregate([
      { $match: { showroom: new mongoose.Types.ObjectId(showroomId) } },
      {
        $group: {
          _id: "$showroom",
          averageRating: { $avg: "$rating" },
          totalRatings: { $sum: 1 },
          ratingDistribution: {
            $push: "$rating"
          }
        }
      }
    ]);

    const ratingStats = stats[0] || {
      averageRating: 0,
      totalRatings: 0,
      ratingDistribution: []
    };

    // Calculate distribution
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    ratingStats.ratingDistribution.forEach(rating => {
      distribution[rating]++;
    });

    res.status(200).json({
      success: true,
      stats: {
        averageRating: parseFloat(ratingStats.averageRating.toFixed(1)) || 0,
        totalRatings: ratingStats.totalRatings || 0,
        distribution
      },
      message: "Rating statistics fetched successfully"
    });

  } catch (error) {
    console.error("❌ Error fetching rating stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch rating statistics",
      error: error.message
    });
  }
};