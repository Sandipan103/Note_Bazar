import { Notes } from "../models/NotesModel.js";
import { User } from "../models/UserModel.js";
import { Rating } from "../models/RatingModel.js";
import { Feedback } from "../models/FeedbackModel.js";

// fetching all the notes which is uploaded by the logged in user
export const fetchMyNotes = async (req, res) => {
  try {
    const userId = req.userId;
    const notes = await Notes.find({ userId }).populate("ratings");

    res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    console.error("Error fetching notes in fetchMyNotes controller : ", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching notes in fetchMyNotes controller",
    });
  }
};

// creating new note for selling
export const createNote = async (req, res) => {
  try {
    const { title, description, content, price, tags } = req.body;
    const userId = req.userId;
    const newNote = await Notes.create({
      title,
      description,
      content,
      price,
      tags,
      userId,
    });

    return res.status(201).json({
      success: true,
      note: newNote,
    });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({
      success: false,
      message: "Error creating note",
    });
  }
};

// fetching all notes available for buying
// the notes uploaded by other user and currently not bought by logged in user
export const fetchAllNotes = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("boughtNotes");
    const boughtNotesIds = user.boughtNotes.map((note) => note._id);

    const notes = await Notes.find({
      userId: { $ne: req.userId },
      _id: { $nin: boughtNotesIds },
    }).populate("userId", "name")
    .populate({
      path: "ratings",
      select: "rating",
    })
    .populate({
      path: "feedbacks",
      populate: { path: "userId", select: "name" }
    });;

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

// fetching all the notes which is baought by the user
export const fetchBoughtNotes = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate("boughtNotes");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      notes: user.boughtNotes,
    });
  } catch (error) {
    console.error("Error fetching bought notes:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching bought notes",
    });
  }
};

// buying a note
export const buyNote = async (req, res) => {
  try {
    const userId = req.userId;
    const { noteId } = req.body;

    const note = await Notes.findById(noteId);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    // if the note is already bought then simply return from here
    const user = await User.findById(userId);
    if (user.boughtNotes.includes(noteId)) {
      return res.status(400).json({
        success: false,
        message: "You already bought this note",
      });
    }

    // push the current notes id in the boughtNotes array of user
    await User.findByIdAndUpdate(
      userId,
      { $push: { boughtNotes: noteId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Note purchased successfully",
    });
  } catch (error) {
    console.error("Error purchasing note:", error);
    res.status(500).json({
      success: false,
      message: "Error purchasing note",
    });
  }
};

// giving or updating ratings of a notes
export const rateNote = async (req, res) => {
  try {
    const userId = req.userId;
    const { notesId, rating } = req.body;
    let existingRating = await Rating.findOne({ notesId, userId });

    if (existingRating) {
      await Rating.findByIdAndUpdate(existingRating._id, { rating: rating });
    } else {
      // create new rating and push in the notes rating array
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

    res.status(200).json({
      success: true,
      message: "Note rating updated successfully",
    });
  } catch (error) {
    console.error("Error updating note rating:", error);
    res.status(500).json({
      success: false,
      message: "Error updating note rating",
    });
  }
};

// giving or updating feedback
export const feedbackNote = async (req, res) => {
  try {
    const { notesId, feedback } = req.body;
    const userId = req.userId;

    let existingFeedback = await Feedback.findOne({ notesId, userId });

    if (existingFeedback) {
      await Feedback.findByIdAndUpdate(existingFeedback._id, {
        feedback: feedback,
      });
    } else {
      // create new feedback and push it into feedback array of the user
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

    res.status(200).json({
      success: true,
      message: "Feedback submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({
      success: false,
      message: "Error submitting feedback",
    });
  }
};
