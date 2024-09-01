import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
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
  feedback: {
    type: String,
    required: true,
  },
});

export const Feedback = mongoose.model("Feedback", feedbackSchema);
export default feedbackSchema;
