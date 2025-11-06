// // import mongoose from "mongoose";

// // const Signup = new mongoose.Schema(
// //   {
// //     showroomName: { type: String, sparse: true, unique: true },
// //     ownerName: { type: String },
// //     cnic: { type: String },
// //     contactNumber: { type: String },
// //     address: { type: String },
// //     email: { type: String, required: true, unique: true },
// //     password: { type: String, required: true },
// //     role: {
// //       type: String,
// //       enum: ["admin", "showroom", "client"],
// //       required: true,
// //     },
// //     images: [{ type: String }],
// //     resetPasswordToken: { type: String },
// //     resetPasswordExpires: { type: Date },
// //   },
// //   { timestamps: true },
// // );

// // const signup = mongoose.model("Users_data", Signup);
// // signup.createIndexes();
// // export default signup;

// import mongoose from "mongoose";

// const Signup = new mongoose.Schema(
//   {
//     showroomName: { type: String, sparse: true, unique: true },
//     ownerName: { type: String },
//     cnic: { type: String },
//     contactNumber: { type: String },
//     address: { type: String },
//     email: { type: String, required: true, unique: true },
//     password: { type: String }, // REMOVE required: true (temporary)
//     role: {
//       type: String,
//       enum: ["admin", "showroom", "client"],
//       required: true,
//     },
//     images: [{ type: String }],
//     description: { type: String }, // ADD THIS FIELD
//     resetPasswordToken: { type: String },
//     resetPasswordExpires: { type: Date },
    
//     // ADD THESE NEW FIELDS FOR MAGIC LINK
//     isVerified: { type: Boolean, default: false },
//     magicToken: { type: String },
//     magicTokenExpires: { type: Date },
//     tempPassword: { type: String } ,// Store password temporarily until verification

//      averageRating: {
//       type: Number,
//       default: 0,
//       min: 0,
//       max: 5
//     },
//     totalRatings: {
//       type: Number,
//       default: 0
//     },
//     ratings: [{
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Rating"
//     }],
//   },
  
//   { timestamps: true },
// );

// const signup = mongoose.model("Users_data", Signup);
// signup.createIndexes();
// export default signup;


import mongoose from "mongoose";

const Signup = new mongoose.Schema(
  {
    showroomName: { type: String, sparse: true, unique: true },
    ownerName: { type: String },
    cnic: { type: String },
    contactNumber: { type: String },
    address: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: {
      type: String,
      enum: ["admin", "showroom", "client"],
      required: true,
    },
    images: [{ type: String }],
    description: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    
    // ADD THESE NEW FIELDS FOR MAGIC LINK
    isVerified: { type: Boolean, default: false },
    magicToken: { type: String },
    magicTokenExpires: { type: Date },
    tempPassword: { type: String },

    // RATING FIELDS - MAKE SURE THESE ARE INCLUDED
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalRatings: {
      type: Number,
      default: 0
    },
    ratings: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rating"
    }],
  },
  { timestamps: true },
);

const signup = mongoose.model("Users_data", Signup);
signup.createIndexes();
export default signup;