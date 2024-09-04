/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import NoteComponent from '../components/NoteComponent';
import axios from 'axios';
import { server } from '../context/UserContext.jsx';

const NotesBuyingPage = () => {
  const [notesForSale, setNotesForSale] = useState([]);

  // fetch all notes which are uploaded by other user
  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${server}/fetchAllNotes`, {
        withCredentials: true,
      });
      setNotesForSale(response.data.notes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleBuy = (noteId) => {
    console.log(`Buying note with ID: ${noteId}`);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ marginTop: 4 }}>Buy Notes</Typography>
      <Grid container spacing={4} sx={{ marginTop: 2 }}>
        {notesForSale.map(note => (
          <Grid item xs={12} sm={6} md={4} key={note._id}>
            <NoteComponent note={note} onBuy={handleBuy} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default NotesBuyingPage;
