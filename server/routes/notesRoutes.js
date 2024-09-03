import express from "express";
import { getNotes, buyNotes, addNote, pdfUpload, createNote } from "../controller/NotesController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/notes", getNotes);
router.post("/notes/buy", buyNotes);
router.post("/notes", addNote);
router.post("/pdfUpload", pdfUpload);
router.post("/createNotes", isAuthenticated, createNote);


export default router;
