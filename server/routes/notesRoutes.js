import express from "express";
import { getNotes, buyNotes, addNote } from "../controller/NotesController.js";

const router = express.Router();

router.get("/notes", getNotes);
router.post("/notes/buy", buyNotes);
router.post("/notes", addNote);

export default router;
