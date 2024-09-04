import express from "express";
import { getNotes, buyNotes, addNote, fetchMyNotes, createNote, fetchAllNotes, } from "../controller/NotesController.js";
import {pdfUpload} from "../utils/fileUpload.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/notes", getNotes);
router.post("/notes/buy", buyNotes);
router.post("/notes", addNote);
router.post("/pdfUpload", pdfUpload);
router.post("/createNote", isAuthenticated, createNote);
router.get("/fetchMyNotes", isAuthenticated, fetchMyNotes);
router.get("/fetchAllNotes", isAuthenticated, fetchAllNotes);

export default router;
