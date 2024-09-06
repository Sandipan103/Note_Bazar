import express from "express";
import {
  fetchMyNotes,
  createNote,
  fetchAllNotes,
  fetchBoughtNotes,
  buyNote,
  rateNote,
  feedbackNote,
} from "../controller/NotesController.js";
import { pdfUpload } from "../utils/fileUpload.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/pdfUpload", pdfUpload);
router.post("/createNote", isAuthenticated, createNote);
router.get("/fetchMyNotes", isAuthenticated, fetchMyNotes);
router.get("/fetchAllNotes", isAuthenticated, fetchAllNotes);
router.get("/fetchBoughtNotes", isAuthenticated, fetchBoughtNotes);
router.post('/buyNote', isAuthenticated, buyNote);
router.post('/rateNote', isAuthenticated, rateNote);
router.post('/feedbackNote', isAuthenticated, feedbackNote);

export default router;
