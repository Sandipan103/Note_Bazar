/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import toast from "react-hot-toast";
import axios from "axios";
import { server, AuthContext } from "../context/UserContext.jsx";

const MyNotesPage = () => {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [noteDetails, setNoteDetails] = useState({
    title: "",
    description: "",
    tags: "",
    file: null,
    price: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteDetails({
      ...noteDetails,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setNoteDetails({
      ...noteDetails,
      file: e.target.files[0],
    });
  };

  const handleSave = async () => {
    if (noteDetails.file == null) {
      toast.error("upload a file first");
      return;
    }
    let imageResponse;
    const formData = new FormData();
    formData.append("imageFile", noteDetails.file);
    try {
      imageResponse = await axios.post(`${server}/imageUpload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 60000,
      });
      console.log("Uploaded image URL:", imageResponse.data.uploadData);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image");
    }

    setNotes([...notes, noteDetails]);
    setNoteDetails({
      title: "",
      description: "",
      tags: "",
      file: null,
      price: "",
    });
    handleClose();
  };

  return (
    <div>
      <h1>My Notes</h1>
      <List>
        {notes.map((note, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={note.title}
              secondary={`Price: $${note.price}`}
            />
          </ListItem>
        ))}
      </List>
      <IconButton color="primary" onClick={handleClickOpen}>
        <AddCircleIcon /> Upload New Note
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload New Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            value={noteDetails.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={noteDetails.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="tags"
            label="Tags (comma separated)"
            type="text"
            fullWidth
            value={noteDetails.tags}
            onChange={handleChange}
          />
          <input
            accept="application/pdf"
            style={{ display: "none" }}
            id="upload-file"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="upload-file">
            <Button variant="outlined" color="primary" component="span">
              Upload PDF
            </Button>
            {noteDetails.file && noteDetails.file.name}
          </label>
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            value={noteDetails.price}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyNotesPage;
