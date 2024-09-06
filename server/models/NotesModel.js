import mongoose from "mongoose";

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
  tags : [String],
  ratings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rating",
    required: true,
  }],
  feedbacks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Feedback",
    required: true,
  }],
});

export const Notes = mongoose.model("Notes", notesSchema);
