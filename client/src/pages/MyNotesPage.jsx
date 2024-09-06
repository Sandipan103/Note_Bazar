/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Rating as MuiRating } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { server } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

const MyNotesPage = () => {
  const navigate = useNavigate();
  const [boughtNotes, setBoughtNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [openRatingDialog, setOpenRatingDialog] = useState(false);
  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  // Fetch notes from the backend
  const fetchBoughtNotes = async () => {
    try {
      const response = await axios.get(`${server}/fetchBoughtNotes`, {
        withCredentials: true,
      });
      toast.success("Data fetched");
      setBoughtNotes(response.data.notes);
      console.log("notes : ", response.data.notes);
    } catch (error) {
      toast.error("Data not fetched");
      console.error("Error fetching bought notes:", error);
    }
  };

  useEffect(() => {
    fetchBoughtNotes();
  }, []);

  const handleSubmitRating = async () => {
    try {
      await axios.post(
        `${server}/rateNote`,
        {
          notesId: selectedNote._id,
          rating,
        },
        { withCredentials: true }
      );
      toast.success("Rating updated");

      // Update the state locally without refetching
      setBoughtNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === selectedNote._id
            ? {
                ...note,
                ratings: [...note.ratings, { rating }],
              }
            : note
        )
      );
      setSelectedNote(null);
      setOpenRatingDialog(false);
    } catch (error) {
      toast.error("Rating not updated");
      console.error("Error submitting rating:", error.response);
    }
  };

  const handleSubmitFeedback = async () => {
    try {
      await axios.post(
        `${server}/feedbackNote`,
        {
          notesId: selectedNote._id,
          feedback,
        },
        { withCredentials: true }
      );
      toast.success("Feedback updated");

      // Update the state locally without refetching
      setBoughtNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === selectedNote._id
            ? {
                ...note,
                feedbacks: [...note.feedbacks, feedback],
              }
            : note
        )
      );
      setSelectedNote(null);
      setOpenFeedbackDialog(false);
    } catch (error) {
      toast.error("Feedback not updated");
      console.error("Error submitting feedback:", error);
    } finally {
      setFeedback("");
    }
  };

  const handleReadNote = (note) => {
    window.open(note.content, "_blank");
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ marginTop: 4 }}>
        My Bought Notes
      </Typography>
      <Grid container spacing={4} sx={{ marginTop: 2 }}>
        {boughtNotes.map((note) => (
          <Grid item xs={12} sm={6} md={4} key={note._id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5">{note.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {note.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Tags: {note.tags.join(", ")}
                </Typography>
              </CardContent>
              <CardActions
                style={{ justifyContent: "space-between", padding: "16px" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleReadNote(note)}
                >
                  Read
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setSelectedNote(note);
                    setOpenRatingDialog(true);
                    setRating(0);
                  }}
                >
                  Rate
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setSelectedNote(note);
                    setOpenFeedbackDialog(true);
                  }}
                >
                  Feedback
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openRatingDialog}
        onClose={() => setOpenRatingDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Rate {selectedNote?.title}</DialogTitle>
        <DialogContent>
          <MuiRating
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            precision={1}
            max={5}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmitRating}
            color="primary"
            variant="contained"
          >
            Submit Rating
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openFeedbackDialog}
        onClose={() => setOpenFeedbackDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Feedback for {selectedNote?.title}</DialogTitle>
        <DialogContent>
          <TextField
            label="Feedback"
            multiline
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmitFeedback}
            color="primary"
            variant="contained"
          >
            Submit Feedback
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyNotesPage;
