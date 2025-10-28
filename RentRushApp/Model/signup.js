// import mongoose from "mongoose";

// const Signup = new mongoose.Schema(
//   {
//     showroomName: { type: String, sparse: true, unique: true },
//     ownerName: { type: String },
//     cnic: { type: String },
//     contactNumber: { type: String },
//     address: { type: String },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: {
//       type: String,
//       enum: ["admin", "showroom", "client"],
//       required: true,
//     },
//     images: [{ type: String }],
//     resetPasswordToken: { type: String },
//     resetPasswordExpires: { type: Date },
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
    password: { type: String }, // REMOVE required: true (temporary)
    role: {
      type: String,
      enum: ["admin", "showroom", "client"],
      required: true,
    },
    images: [{ type: String }],
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    
    // ADD THESE NEW FIELDS FOR MAGIC LINK
    isVerified: { type: Boolean, default: false },
    magicToken: { type: String },
    magicTokenExpires: { type: Date },
    tempPassword: { type: String } // Store password temporarily until verification
  },
  { timestamps: true },
);

const signup = mongoose.model("Users_data", Signup);
signup.createIndexes();
export default signup;