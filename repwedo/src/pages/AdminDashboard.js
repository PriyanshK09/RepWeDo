import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Button, Grid, Card, CardContent, CardActions, useTheme } from '@mui/material';

const AdminDashboard = () => {
  const [reviews, setReviews] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReviews();
  }, []);

  const handleUpdateReview = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/reviews/${id}`, { status });
      setReviews(reviews.map(review =>
        review._id === id ? { ...review, accepted: status === 'accepted' } : review
      ));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ 
      bgcolor: theme.palette.background.default, 
      minHeight: '100vh',
      py: 8 
    }}>
      <Container maxWidth="lg">
        <Typography variant="h3" color="primary" gutterBottom sx={{ mb: 4 }}>
          Admin Dashboard
        </Typography>
        <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h4" color="text.secondary" gutterBottom>
            Manage Reviews (Highlighed Option is Selected)
          </Typography>
          <Grid container spacing={4}>
            {reviews.map((review) => (
              <Grid item xs={12} md={6} key={review._id}>
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  }
                }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" color="text.primary" gutterBottom>
                      "{review.text}"
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      - {review.author}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                    <Button
                      size="small"
                      variant={review.accepted ? 'contained' : 'outlined'}
                      color="success"
                      onClick={() => handleUpdateReview(review._id, 'accepted')}
                    >
                      Accept
                    </Button>
                    <Button
                      size="small"
                      variant={!review.accepted ? 'contained' : 'outlined'}
                      color="error"
                      onClick={() => handleUpdateReview(review._id, 'rejected')}
                    >
                      Reject
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default AdminDashboard;