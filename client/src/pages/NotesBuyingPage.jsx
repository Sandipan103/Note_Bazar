/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Grid, Paper, Typography, Button } from '@mui/material';

const NotesBuyingPage = () => {
  const notesForSale = [
    { id: 1, title: 'Physics', description: 'Complete notes for Class 12', price: 200 },
    // Add more notes here
  ];

  const handleBuy = (noteId) => {
    // Integration with Razorpay will go here
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ marginTop: 4 }}>Buy Notes</Typography>
      <Grid container spacing={4} sx={{ marginTop: 2 }}>
        {notesForSale.map(note => (
          <Grid item xs={12} sm={6} md={4} key={note.id}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">{note.title}</Typography>
              <Typography variant="body2">{note.description}</Typography>
              <Typography variant="h6">₹{note.price}</Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
                onClick={() => handleBuy(note.id)}
              >
                Buy Now
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default NotesBuyingPage;
