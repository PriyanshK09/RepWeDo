import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Button, Grid, TextField, useTheme, keyframes } from '@mui/material';
import { Link } from 'react-router-dom';
import bgImage from './images/bg.png';
import { CheckCircle, Speed, AttachMoney, Star } from '@mui/icons-material';

const float = keyframes`
  0% { transform: translateY(0px) rotate(-5deg); }
  50% { transform: translateY(-20px) rotate(-5deg); }
  100% { transform: translateY(0px) rotate(-5deg); }
`;

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');
  const theme = useTheme();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, []);

  const handleSubmitReview = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/reviews', {
        text: reviewText,
        author: reviewAuthor,
      });
      setSubmissionStatus('Review submitted successfully!');
      setReviewText('');
      setReviewAuthor('');
      const response = await axios.get('http://localhost:5000/api/reviews');
      setReviews(response.data);
    } catch (error) {
      setSubmissionStatus('Failed to submit review.');
      console.error(error);
    }
  };

  return (
    <Box 
      sx={{ 
        flexGrow: 1, 
        backgroundColor: theme.palette.background.default,
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(to right, ${theme.palette.divider} 1px, transparent 1px),
            linear-gradient(to bottom, ${theme.palette.divider} 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          opacity: 0.1,
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ minHeight: '100vh', py: 8 }}>
          <Grid item xs={12} md={6}>
            <Typography
              component="h1"
              variant="h1"
              color="text.primary"
              gutterBottom
              fontWeight="bold"
              sx={{ mb: 2 }}
            >
              RepWeDo
            </Typography>
            <Typography variant="h4" color="text.secondary" paragraph sx={{ mb: 4 }}>
              Service at your doorstep
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              to="/booking" 
              size="large" 
              sx={{ 
                mt: 2, 
                borderRadius: '50px', 
                padding: '15px 40px',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                backgroundColor: theme.palette.info.main,
                '&:hover': {
                  backgroundColor: theme.palette.info.dark,
                  transform: 'scale(1.05)',
                  transition: 'all 0.3s ease-in-out',
                },
              }}
            >
              Book Now
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                component="img"
                src={bgImage}
                alt="RepWeDo service illustration"
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  height: 'auto',
                  animation: `${float} 6s ease-in-out infinite`,
                  position: 'relative',
                  top: '-10%', // Moved up slightly
                }}
              />
              <Box
                component="svg"
                viewBox="0 0 24 24"
                sx={{
                  width: 60,
                  position: 'absolute',
                  top: '5%',
                  left: '10%',
                  fill: theme.palette.info.main,
                  animation: `${float} 4s ease-in-out infinite`,
                }}
              >
                <path d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15Z" />
              </Box>
              <Box
                component="svg"
                viewBox="0 0 24 24"
                sx={{
                  width: 50,
                  position: 'absolute',
                  top: '20%',
                  right: '5%',
                  fill: theme.palette.secondary.main,
                  animation: `${float} 5s ease-in-out infinite`,
                }}
              >
                <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
              </Box>
              <Box
                component="svg"
                viewBox="0 0 24 24"
                sx={{
                  width: 70,
                  position: 'absolute',
                  bottom: '5%',
                  left: '5%',
                  fill: theme.palette.warning.main,
                  animation: `${float} 6s ease-in-out infinite`,
                }}
              >
                <path d="M11,5V11H5V13H11V19H13V13H19V11H13V5H11Z" />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Service Features */}
      <Container maxWidth="lg" sx={{ py: 8, position: 'relative', zIndex: 1 }}>
        <Typography variant="h3" color="text.primary" gutterBottom>
          Our Services
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                textAlign: 'center',
                p: 4,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: '12px',
                backgroundColor: theme.palette.background.paper,
                boxShadow: 3,
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: 6,
                },
              }}
            >
              <CheckCircle sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
              <Typography variant="h5" color="text.primary" gutterBottom>
                Reliable Service
              </Typography>
              <Typography color="text.secondary">
                Our technicians are highly trained and provide dependable service every time.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                textAlign: 'center',
                p: 4,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: '12px',
                backgroundColor: theme.palette.background.paper,
                boxShadow: 3,
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: 6,
                },
              }}
            >
              <Speed sx={{ fontSize: 60, color: theme.palette.warning.main, mb: 2 }} />
              <Typography variant="h5" color="text.primary" gutterBottom>
                Fast Response
              </Typography>
              <Typography color="text.secondary">
                We understand the urgency and ensure quick response and resolution.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                textAlign: 'center',
                p: 4,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: '12px',
                backgroundColor: theme.palette.background.paper,
                boxShadow: 3,
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: 6,
                },
              }}
            >
              <AttachMoney sx={{ fontSize: 60, color: theme.palette.success.main, mb: 2 }} />
              <Typography variant="h5" color="text.primary" gutterBottom>
                Affordable Pricing
              </Typography>
              <Typography color="text.secondary">
                Quality service at prices that won’t break the bank.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ py: 8, position: 'relative', zIndex: 1 }}>
        <Typography variant="h3" color="text.primary" gutterBottom>
          What Our Customers Say
        </Typography>
        <Grid container spacing={4}>
          {reviews.map((review, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box
                sx={{
                  p: 4,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: '12px',
                  backgroundColor: theme.palette.background.paper,
                  boxShadow: 3,
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Star sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
                <Typography variant="h6" color="text.primary" gutterBottom>
                  "{review.text}"
                </Typography>
                <Typography color="text.secondary">
                  - {review.author}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Review Submission Form */}
      <Container maxWidth="md" sx={{ py: 8, position: 'relative', zIndex: 1 }}>
        <Typography variant="h4" color="text.primary" gutterBottom>
          Submit Your Review
        </Typography>
        <form onSubmit={handleSubmitReview}>
          <TextField
            label="Your Name"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={reviewAuthor}
            onChange={(e) => setReviewAuthor(e.target.value)}
          />
          <TextField
            label="Your Review"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={4}
            margin="normal"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Submit Review
          </Button>
          {submissionStatus && (
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              {submissionStatus}
            </Typography>
          )}
        </form>
      </Container>

      {/* Decorative blobs with animation */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          left: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          backgroundColor: theme.palette.info.light,
          opacity: 0.1,
          zIndex: 0,
          animation: `${float} 15s ease-in-out infinite`,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          backgroundColor: theme.palette.secondary.light,
          opacity: 0.1,
          zIndex: 0,
          animation: `${float} 18s ease-in-out infinite`,
        }}
      />
    </Box>
  );
};

export default Home;
