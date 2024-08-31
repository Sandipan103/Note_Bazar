import { Notes } from "../models/NotesModel.js";
import { User } from "../models/UserModel.js";

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
