import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
  },
  college: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
  },
  feedback: {
    type: String,
  },
});

export const User = mongoose.model("User", userSchema);
