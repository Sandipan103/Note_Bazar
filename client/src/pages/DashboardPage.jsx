/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Grid,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import toast from "react-hot-toast";
import axios from "axios";
import { server, AuthContext } from "../context/UserContext.jsx";

const DashboardPage = () => {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [noteDetails, setNoteDetails] = useState({
    title: "",
    description: "",
    tags: "",
    file: null,
    price: "",
  });

  const fetchMyNotes = async () => {
    try {
      const response = await axios.get(`${server}/fetchMyNotes`, {
        withCredentials: true,
      });
      setNotes(response.data.notes);
      toast.success("Notes successfully fetched");
    } catch (error) {
      console.error("Error fetching notes:", error);
      toast.error("Error fetching notes");
    }
  };

  useEffect(() => {
    fetchMyNotes();
  }, []);

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
      toast.error("Upload a file first");
      return;
    }

    // upload the pdf file to cludinary
    let pdfResponse;
    const formData = new FormData();
    formData.append("pdfFile", noteDetails.file);
    try {
      pdfResponse = await axios.post(`${server}/pdfUpload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 60000,
      });
      // console.log("Uploaded pdf URL:", pdfResponse.data.uploadData);
      toast.success("pdf succesfully uploaded");
    } catch (error) {
      console.error("Error uploading pdf:", error);
      toast.error("Error uploading pdf");
      return;
    }

    // create the note and save in mongoDB
    try {
      const response = await axios.post(
        `${server}/createNote`,
        {
          title: noteDetails.title,
          description: noteDetails.description,
          tags: noteDetails.tags.split(",").map((tag) => tag.trim()),
          content: pdfResponse.data.uploadData,
          price: noteDetails.price,
        },
        { withCredentials: true }
      );
      toast.success(`Note created successfully`);
      setNotes([...notes, response.data.note]);
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("Error creating note");
    }

    setNoteDetails({
      title: "",
      description: "",
      tags: "",
      file: null,
      price: "",
    });
    handleClose();
  };

  const getAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return "No ratings yet";
    const sum = ratings.reduce((total, rating) => total + rating.value, 0);
    return (sum / ratings.length).toFixed(1);
  };

  return (
    <div>
      <h1>My Notes</h1>
      <IconButton color="primary" onClick={handleClickOpen}>
        <AddCircleIcon /> Upload New Note
      </IconButton>
      
      <Grid container spacing={3}>
        {notes.map((note, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              variant="outlined"
              style={{
                margin: "10px 0",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <CardMedia
                component="img"
                height="140"
                image={note.content} // Assuming Cloudinary generates a thumbnail for PDFs
                alt="PDF Front Page"
              />
              <CardContent>
                <Typography variant="h5">{note.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {note.description}
                </Typography>
                <Typography variant="body1">Price: ${note.price}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Tags: {note.tags.join(", ")}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Average Rating: {getAverageRating(note.ratings)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      

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

export default DashboardPage;
