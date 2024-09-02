import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  TextField,
  useTheme,
  keyframes,
} from "@mui/material";
import { Link } from "react-router-dom";
import bgImage from "./images/bg.png";
import { CheckCircle, Speed, AttachMoney } from "@mui/icons-material";

const float = keyframes`
  0% { transform: translateY(0px) rotate(-5deg); }
  50% { transform: translateY(-20px) rotate(-5deg); }
  100% { transform: translateY(0px) rotate(-5deg); }
`;

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState("");
  const theme = useTheme();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reviews");
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
      await axios.post("http://localhost:5000/api/reviews", {
        text: reviewText,
        author: reviewAuthor,
      });
      setSubmissionStatus("Review submitted successfully!");
      setReviewText("");
      setReviewAuthor("");
      // Re-fetch reviews to include the new review if accepted
      const response = await axios.get("http://localhost:5000/api/reviews");
      setReviews(response.data);
    } catch (error) {
      setSubmissionStatus("Failed to submit review.");
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(to right, ${theme.palette.divider} 1px, transparent 1px),
            linear-gradient(to bottom, ${theme.palette.divider} 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          opacity: 0.1,
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid
          container
          spacing={4}
          alignItems="center"
          sx={{ minHeight: "100vh", py: 8 }}
        >
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
            <Typography
              variant="h4"
              color="text.secondary"
              paragraph
              sx={{ mb: 4 }}
            >
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
                borderRadius: "50px",
                padding: "15px 40px",
                fontWeight: "bold",
                fontSize: "1.2rem",
                backgroundColor: theme.palette.info.main,
                "&:hover": {
                  backgroundColor: theme.palette.info.dark,
                  transform: "scale(1.05)",
                  transition: "all 0.3s ease-in-out",
                },
              }}
            >
              Book Now
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={bgImage}
                alt="RepWeDo service illustration"
                sx={{
                  width: "100%",
                  maxWidth: 500,
                  height: "auto",
                  animation: `${float} 6s ease-in-out infinite`,
                  position: "relative",
                  top: "-10%",
                }}
              />
              <Box
                component="svg"
                viewBox="0 0 24 24"
                sx={{
                  width: 60,
                  position: "absolute",
                  top: "5%",
                  left: "10%",
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
                  position: "absolute",
                  top: "20%",
                  right: "5%",
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
                  width: 40,
                  position: "absolute",
                  bottom: "10%",
                  right: "10%",
                  fill: theme.palette.success.main,
                  animation: `${float} 6s ease-in-out infinite`,
                }}
              >
                <path d="M10,14L16,10L15.57,9.57L10,15.14L8.43,13.57L8,14L10,16L16,10L14.43,8.43L10,12.86L8.43,11.29L10,14Z" />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ py: 8, position: "relative", zIndex: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                textAlign: "center",
                p: 4,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: "12px",
                backgroundColor: theme.palette.background.paper,
                boxShadow: 3,
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: 6,
                },
              }}
            >
              <CheckCircle
                sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }}
              />
              <Typography variant="h5" color="text.primary">
                Quality Assurance
              </Typography>
              <Typography color="text.secondary">
                We ensure top-quality service with a focus on customer
                satisfaction.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                textAlign: "center",
                p: 4,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: "12px",
                backgroundColor: theme.palette.background.paper,
                boxShadow: 3,
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: 6,
                },
              }}
            >
              <Speed
                sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }}
              />
              <Typography variant="h5" color="text.primary">
                Fast Service
              </Typography>
              <Typography color="text.secondary">
                Get your electrical repairs done quickly and efficiently.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                textAlign: "center",
                p: 4,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: "12px",
                backgroundColor: theme.palette.background.paper,
                boxShadow: 3,
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: 6,
                },
              }}
            >
              <AttachMoney
                sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }}
              />
              <Typography variant="h5" color="text.primary">
                Affordable Pricing
              </Typography>
              <Typography color="text.secondary">
                Competitive prices for all your electrical repair needs.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ py: 8, position: "relative", zIndex: 1 }}>
        <Typography variant="h3" color="text.primary" gutterBottom>
          Customer Reviews
        </Typography>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Box
              key={review._id}
              sx={{
                p: 3,
                mb: 2,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: "8px",
                backgroundColor: theme.palette.background.paper,
                boxShadow: 3,
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
              }}
            >
              <Typography variant="h6" color="text.primary" gutterBottom>
                {review.author}
              </Typography>
              <Typography color="text.secondary">{review.text}</Typography>
            </Box>
          ))
        ) : (
          <Typography color="text.secondary">No reviews available.</Typography>
        )}
      </Container>

      <Container maxWidth="lg" sx={{ py: 8, position: "relative", zIndex: 1 }}>
        <Typography variant="h4" color="text.primary" gutterBottom>
          Leave a Review
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmitReview}
          sx={{
            maxWidth: "600px",
            margin: "auto",
            backgroundColor: theme.palette.background.paper,
            p: 4,
            borderRadius: "12px",
            boxShadow: 3,
            "&:hover": {
              boxShadow: 6,
            },
          }}
        >
          <TextField
            fullWidth
            label="Your Name"
            variant="outlined"
            margin="normal"
            value={reviewAuthor}
            onChange={(e) => setReviewAuthor(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Your Review"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2 }}
          >
            Submit Review
          </Button>
          {submissionStatus && (
            <Typography
              color={submissionStatus.includes("Failed") ? "error" : "success"}
              sx={{ mt: 2 }}
            >
              {submissionStatus}
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
