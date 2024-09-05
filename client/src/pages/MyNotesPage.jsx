/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Button, Card, CardContent, CardActions } from '@mui/material';
import axios from 'axios';
import { server } from '../context/UserContext.jsx';

const MyNotesPage = () => {
  const [boughtNotes, setBoughtNotes] = useState([]);

  // Fetch notes from the backend
  const fetchBoughtNotes = async () => {
    try {
      const response = await axios.get(`${server}/fetchBoughtNotes`, {
        withCredentials: true,
      });
      setBoughtNotes(response.data.notes);
    } catch (error) {
      console.error('Error fetching bought notes:', error);
    }
  };

  useEffect(() => {
    fetchBoughtNotes();
  }, []);

  const handleRead = (contentUrl) => {
    window.open(contentUrl, '_blank');
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ marginTop: 4 }}>My Bought Notes</Typography>
      <Grid container spacing={4} sx={{ marginTop: 2 }}>
        {boughtNotes.map(note => (
          <Grid item xs={12} sm={6} md={4} key={note._id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5">{note.title}</Typography>
                <Typography variant="body2" color="textSecondary">{note.description}</Typography>
                <Typography variant="body2" color="textSecondary">Tags: {note.tags.join(', ')}</Typography>
              </CardContent>
              <CardActions style={{ justifyContent: 'space-between', padding: '16px' }}>
                <Button variant="contained" color="primary" onClick={() => handleRead(note.content)}>
                  Read
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MyNotesPage;
