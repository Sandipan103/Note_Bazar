/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, List, ListItem, ListItemText } from '@mui/material';

const FeedbackDialog = ({ open, onClose, feedbacks }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Feedback</DialogTitle>
      <DialogContent dividers>
        {feedbacks && feedbacks.length > 0 ? (
          <List>
            {feedbacks.map((feedback, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={feedback.userId.name}
                  secondary={feedback.feedback}
                />
                <Typography variant="body2" color="textSecondary">
                  {feedback.date ? new Date(feedback.date).toLocaleDateString() : 'Unknown date'}
                </Typography>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="textSecondary">
            No feedback available for this note.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackDialog;
