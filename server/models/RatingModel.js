import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  notesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Notes",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
});

export const Rating = mongoose.model("Rating", ratingSchema);
