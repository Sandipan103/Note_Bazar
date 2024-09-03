import express from "express";
import { getNotes, buyNotes, addNote, fileUpload, imageUpload } from "../controller/NotesController.js";

const router = express.Router();

router.get("/notes", getNotes);
router.post("/notes/buy", buyNotes);
router.post("/notes", addNote);
router.post("/fileUpload", fileUpload);
router.post("/imageUpload", imageUpload);

export default router;
