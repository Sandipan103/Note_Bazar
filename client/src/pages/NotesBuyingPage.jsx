/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import NoteComponent from '../components/NoteComponent';

const NotesBuyingPage = () => {
  const notesForSale = [
    { 
      id: 1, 
      title: 'Physics', 
      description: 'Complete notes for Class 12.\nCovers all topics including Mechanics, Thermodynamics, Electromagnetism.', 
      content: 'Physics content here', 
      price: 200 
    },
    { 
      id: 2, 
      title: 'Chemistry', 
      description: 'Comprehensive Class 12 notes.\nIncludes Organic Chemistry, Inorganic Chemistry, and Physical Chemistry.', 
      content: 'Chemistry content here', 
      price: 250 
    },
    { 
      id: 3, 
      title: 'Mathematics', 
      description: 'Class 12 Mathematics notes.\nCovers Calculus, Algebra, Probability, and more.', 
      content: 'Mathematics content here', 
      price: 300 
    },
    { 
      id: 4, 
      title: 'Biology', 
      description: 'Detailed Biology notes for Class 12.\nIncludes Genetics, Evolution, Ecology, and more.', 
      content: 'Biology content here', 
      price: 220 
    },
  ];

  const handleBuy = (noteId) => {
    // Integration with Razorpay will go here
    console.log(`Buying note with ID: ${noteId}`);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ marginTop: 4 }}>Buy Notes</Typography>
      <Grid container spacing={4} sx={{ marginTop: 2 }}>
        {notesForSale.map(note => (
          <Grid item xs={12} sm={6} md={4} key={note.id}>
            <NoteComponent note={note} />
            <Typography variant="h6" align="center">₹{note.price}</Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ display: 'block', margin: '10px auto' }}
              onClick={() => handleBuy(note.id)}
            >
              Buy Now
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default NotesBuyingPage;
