import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema(
  {
    showroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users_data",
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users_data",
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 500
    }
  },
  { timestamps: true }
);

// Prevent duplicate ratings from same user for same showroom
RatingSchema.index({ showroom: 1, user: 1 }, { unique: true });

const Rating = mongoose.model("Rating", RatingSchema);
export default Rating;