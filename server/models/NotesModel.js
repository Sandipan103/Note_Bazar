import mongoose from "mongoose";
import ratingSchema from "./RatingModel.js";
import feedbackSchema from "./FeedbackModel.js";

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  ratings: [ratingSchema],
  feedbacks: [feedbackSchema],
});

export const Notes = mongoose.model("Notes", notesSchema);
