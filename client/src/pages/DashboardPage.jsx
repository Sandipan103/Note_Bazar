/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Grid, Paper, Typography, Button } from '@mui/material';

const DashboardPage = () => {
  const notes = [
    { id: 1, title: 'Mathematics', description: 'Chapter 1 to 5 notes', date: '2024-08-29' },
    // Add more notes here
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ marginTop: 4 }}>Your Notes</Typography>
      <Grid container spacing={4} sx={{ marginTop: 2 }}>
        {notes.map(note => (
          <Grid item xs={12} sm={6} md={4} key={note.id}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">{note.title}</Typography>
              <Typography variant="body2">{note.description}</Typography>
              <Typography variant="caption">Uploaded on: {note.date}</Typography>
              <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>View/Edit</Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DashboardPage;
