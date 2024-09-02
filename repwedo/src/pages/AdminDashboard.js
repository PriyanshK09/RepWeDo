import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const AdminDashboard = () => {
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

  const handleAccept = async (reviewId) => {
    try {
      await axios.post(`http://localhost:5000/api/admin/reviews/${reviewId}/accept`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReviews(reviews.filter((review) => review._id !== reviewId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (reviewId) => {
    try {
      await axios.post(`http://localhost:5000/api/admin/reviews/${reviewId}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReviews(reviews.filter((review) => review._id !== reviewId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4">Admin Dashboard</Typography>
        <List>
          {reviews.map((review) => (
            <ListItem key={review._id}>
              <ListItemText
                primary={review.text}
                secondary={`Submitted by: ${review.author}`}
              />
              <Button onClick={() => handleAccept(review._id)} variant="contained" color="success">
                Accept
              </Button>
              <Button onClick={() => handleReject(review._id)} variant="contained" color="error">
                Reject
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
