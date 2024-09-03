/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

const NoteComponent = ({ note }) => {
  const { title, description, price } = note;

  const truncatedDescription = description.split('\n').slice(0, 2).join(' ');

  return (
    <Card sx={{ maxWidth: 345, margin: '20px auto', padding: '20px' }}>
      <Typography variant="h5" component="div" gutterBottom>
        {title}
      </Typography>
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="Note image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {truncatedDescription}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Button variant="contained" color="primary">
            Preview
          </Button>
          <Button variant="contained" color="secondary">
            Buy
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NoteComponent;
