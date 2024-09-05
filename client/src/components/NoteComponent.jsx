/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Card, CardContent, Typography, CardActions, Button, Grid, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FeedbackDialog from './FeedbackDialog';

const NoteComponent = ({ note, onBuy }) => {
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const getAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((total, rating) => total + rating.value, 0);
    return (sum / ratings.length).toFixed(1);
  };
  
  const averageRating = getAverageRating(note.ratings);

  return (
    <Card variant="outlined" sx={{ marginBottom: '20px', boxShadow: 3, '&:hover': { boxShadow: 6 } }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>{note.title}</Typography>
        <Typography variant="body2" color="textSecondary">{note.description}</Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
          Uploaded by: {note.userId.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Tags: {note.tags.join(', ')}
        </Typography>
        <Grid container spacing={1} sx={{ marginTop: 1 }}>
          {[...Array(5)].map((_, index) => (
            <Grid item key={index}>
              {index < averageRating ? <StarIcon color="primary" /> : <StarBorderIcon color="primary" />}
            </Grid>
          ))}
        </Grid>
        <Button 
          size="small" 
          variant="text" 
          color="primary" 
          onClick={()=> {setFeedbackOpen(true)}}
          sx={{ marginTop: 1 }}
        >
          Show Feedback
        </Button>
      </CardContent>
      <CardActions style={{ justifyContent: 'space-between', padding: '16px' }}>
        <Typography variant="h6">₹{note.price}</Typography>
        <Button variant="contained" color="primary" onClick={() => onBuy(note._id)}>
          Buy Now
        </Button>
      </CardActions>
      <FeedbackDialog
        open={feedbackOpen}
        onClose={()=> {setFeedbackOpen(false)}}
        feedbacks={note.feedbacks}
      />
    </Card>
  );
};

export default NoteComponent;
