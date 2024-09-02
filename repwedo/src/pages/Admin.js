import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Button, List, ListItem, ListItemText } from '@mui/material';

const Admin = () => {
  const [reviews, setReviews] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/reviews', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReviews(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [token]);

  const handleAccept = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/admin/accept/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReviews(reviews.filter(review => review._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/admin/reject/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReviews(reviews.filter(review => review._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Typography variant="h5">Admin Review Management</Typography>
      <List>
        {reviews.map(review => (
          <ListItem key={review._id}>
            <ListItemText primary={review.name} secondary={review.reviewText} />
            <Button onClick={() => handleAccept(review._id)}>Accept</Button>
            <Button onClick={() => handleReject(review._id)}>Reject</Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Admin;
