import { Notes } from "../models/NotesModel.js";
import { User } from "../models/UserModel.js";
import { v2 as cloudinary } from "cloudinary";

export const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find().populate("userId", "name email");
    res.status(200).json({ success: true, notes });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch notes" });
  }
};

export const buyNotes = async (req, res) => {
  try {
    const { noteId, userId } = req.body;

    // Razorpay integration logic will be here

    res.status(200).json({ success: true, message: "Purchase successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Purchase failed" });
  }
};

export const addNote = async (req, res) => {
  try {
    const { title, description, content, price, userId } = req.body;

    const note = new Notes({ title, description, content, price, userId });
    await note.save();

    res.status(201).json({ success: true, message: "Note added successfully", note });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add note" });
  }
};

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
    const notes = await Notes.find({ userId: { $ne: req.user._id } }).populate('userId', 'name');
    res.status(200).json({ success: true, notes });
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ success: false, message: 'Error fetching notes' });
  }
};