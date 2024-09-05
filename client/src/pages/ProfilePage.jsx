/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Container, Avatar, Typography, Grid, Paper, Box, Button, TextField } from '@mui/material';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { server, AuthContext } from "../context/UserContext.jsx"

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState({});
  const [userId, setUserId] = useState(null);

  const getUserDetail = async () => {
    const token = Cookies.get('tokenf');
    if (token) {
      const decoded = jwtDecode(token);
      const userId = decoded.id;
      setUserId(userId);

      // Fetch user details from the backend  
      const response = await axios.get(`${server}/users/${userId}`);
      setUser(response.data.user);
      // console.log("user detail: ", response.data);
    } else {
      toast.error('Please login');
      navigate('/login');
    }
  };

  useEffect(() => {
    try {
      getUserDetail();
    } catch (error) {
      console.log('User detail not fetched: ', error);
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditableUser({
      name: user.name,
      college: user.college,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUser(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    const token = Cookies.get('tokenf');
    if (!token) {
      toast.error('Please login first');
      navigate('/login');
    } else {
      try {
        // Update user details in the backend
        const response = await axios.put(`${server}/users/${userId}`, editableUser);
        setUser(response.data.user);
        setIsEditing(false);
        toast.success('Profile updated successfully');
      } catch (error) {
        console.error('Error updating user details:', error);
        toast.error('Failed to update profile');
      }
    }
  };

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar
              alt="Profile Picture"
              src={user.profileImage || '/default-profile.png'}
              sx={{ width: 120, height: 120 }}
            />
          </Grid>
          <Grid item>
            {isEditing ? (
              <>
                <TextField
                  label="Name"
                  name="name"
                  value={editableUser.name}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="Email"
                  name="email"
                  value={user.email}
                  fullWidth
                  sx={{ marginTop: 2 }}
                  disabled
                />
                <TextField
                  label="College"
                  name="college"
                  value={editableUser.college}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ marginTop: 2 }}
                />
              </>
            ) : (
              <>
                <Typography variant="h4">{user.name}</Typography>
                <Typography variant="body1">{user.email}</Typography>
                <Typography variant="body1">{user.college}</Typography>
              </>
            )}
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="h6">Rating: ★★★★☆</Typography>
          <Typography variant="body1">Feedback: {user.feedback}</Typography>
        </Box>
        <Box mt={3}>
          {isEditing ? (
            <Button variant="contained" color="primary" onClick={handleSaveClick}>Save</Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleEditClick}>Edit Profile</Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
