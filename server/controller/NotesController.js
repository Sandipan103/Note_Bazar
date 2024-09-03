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


const uploadFileToCloudinary = async(file, folder, quality) => {
  const options = { folder };
  if (quality) {
      options.quality = quality;
  }
  options.resource_type = "auto"
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}


export const pdfUpload = async (req, res) => {
  try {

      const { name } = req.body;
      console.log(name);

      // Fetch file 
      const pdfFile = req.files.pdfFile;
      console.log(pdfFile);

      // Upload to Cloudinary
      const response = await uploadFileToCloudinary(pdfFile, "StorePdf");
      console.log(response);

      res.status(200).json({
          success: true,
          message: "File uploaded successfully",
          uploadData : response.secure_url,
      })

  }
  catch (error) {
      console.log(error)
      res.status(400).json({
          success: false,
          message: "Something went wrong"
      })
  }
}

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