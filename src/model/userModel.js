import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    phoneNumber: String,
    address: String,
    identity: String,
    dob: Date,
    isDeleted: { type: Boolean, default: false },
    role: String,
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);

export default User;
