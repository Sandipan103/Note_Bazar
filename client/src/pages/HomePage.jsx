/* eslint-disable no-unused-vars */
import React from "react";
import { Container, Typography, Button, Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <Box className="homepage">
      <Container maxWidth="lg" className="content-container">
        <Typography variant="h2" className="title" gutterBottom>
          Welcome to NoteBazar
        </Typography>
        <Typography variant="h5" className="subtitle" gutterBottom>
          The Ultimate Platform to Buy and Sell Educational Notes
        </Typography>

        <Grid container spacing={4} className="features-grid">
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="feature-title">
              Buy Quality Notes
            </Typography>
            <Typography variant="body1" className="feature-description">
              Access a wide range of notes created by students and experts. Find the best materials to boost your learning.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="feature-title">
              Sell Your Notes
            </Typography>
            <Typography variant="body1" className="feature-description">
              Earn money by selling your own notes. Share your knowledge and help others succeed.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="feature-title">
              Rate & Give Feedback
            </Typography>
            <Typography variant="body1" className="feature-description">
              Rate notes you’ve bought and provide feedback. Help others make informed decisions.
            </Typography>
          </Grid>
        </Grid>

        <Box className="action-buttons">
          <Button variant="contained" color="primary" className="action-button">
            <Link to="/notes" className="link">
              Start Buying
            </Link>
          </Button>
          <Button variant="contained" color="secondary" className="action-button">
            <Link to="/dashboard" className="link">
              Start Selling
            </Link>
          </Button>
        </Box>

        <Box className="footer">
          <Typography variant="body2" className="footer-text">
            © 2024 NoteHub. All rights reserved.
          </Typography>
          <Box className="footer-links">
            <Link to="/contact" className="footer-link">Contact Us</Link>
            <Link to="/help" className="footer-link">Help</Link>
            <Link to="/terms" className="footer-link">Terms & Conditions</Link>
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
