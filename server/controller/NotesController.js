import { Notes } from "../models/NotesModel.js";
import { User } from "../models/UserModel.js";
import { Rating } from "../models/RatingModel.js";
import { Feedback } from "../models/FeedbackModel.js";
import { v2 as cloudinary } from "cloudinary";


export const fetchMyNotes = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user ID is available in req.user after authentication
    const notes = await Notes.find({ userId }).populate("ratings");
    
    res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching notes",
    });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, description, content, price, tags } = req.body;

    const newNote = new Notes({
      title,
      description,
      content,
      price,
      tags,
      userId: req.user._id,
    });

    const savedNote = await newNote.save();
    res.status(201).json({ success: true, note: savedNote });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ success: false, message: "Error creating note" });
  }
};

export const fetchAllNotes = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('boughtNotes');
    const boughtNotesIds = user.boughtNotes.map(note => note._id);
    const notes = await Notes.find({
      userId: { $ne: req.user._id },
      _id: { $nin: boughtNotesIds }
    }).populate('userId', 'name');

    res.status(200).json({ success: true, notes });
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ success: false, message: 'Error fetching notes' });
  }
};


export const fetchBoughtNotes = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("boughtNotes");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, notes: user.boughtNotes });
  } catch (error) {
    console.error('Error fetching bought notes:', error);
    res.status(500).json({ success: false, message: 'Error fetching bought notes' });
  }
};


export const buyNote = async (req, res) => {
  try {
    const userId = req.user._id;
    const { noteId } = req.body;

    const note = await Notes.findById(noteId);
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    const user = await User.findById(userId);
    if (user.boughtNotes.includes(noteId)) {
      return res.status(400).json({ success: false, message: "You already bought this note" });
    }

    user.boughtNotes.push(noteId);
    await user.save();

    res.status(200).json({ success: true, message: "Note purchased successfully" });
  } catch (error) {
    console.error('Error purchasing note:', error);
    res.status(500).json({ success: false, message: 'Error purchasing note' });
  }
};

export const rateNote = async (req, res) => {
  try {
    const userId = req.user._id;
    const {notesId, rating} = req.body;
    let existingRating = await Rating.findOne({ notesId, userId });

    if (existingRating) {
      await Rating.findByIdAndUpdate(existingRating._id, { rating: rating });
    } else {
      const newRating = await Rating.create({
        notesId: notesId,
        userId: userId,
        rating: rating,
      });
      await Notes.findByIdAndUpdate(
        notesId,
        { $push: { ratings: newRating._id } },
        { new: true }
      );
    }

    res.status(200).json({ success: true, message: "Note rating updated successfully" });
  } catch (error) {
    console.error('Error updating note rating:', error);
    res.status(500).json({ success: false, message: 'Error updating note rating' });
  }
};

export const feedbackNote = async (req, res) => {
  try {
    const { notesId, feedback } = req.body;
    const userId = req.user._id;

    let existingFeedback = await Feedback.findOne({ notesId, userId });

    if (existingFeedback) {
      await Feedback.findByIdAndUpdate(existingFeedback._id, { feedback: feedback });
    } else {
      const newFeedback = await Feedback.create({
        notesId,
        userId,
        feedback,
      });
    
      await Notes.findByIdAndUpdate(
        notesId,
        { $push: { feedbacks: newFeedback._id } },
        { new: true }
      );
    }

    res.status(200).json({ success: true, message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ success: false, message: "Error submitting feedback" });
  }
};