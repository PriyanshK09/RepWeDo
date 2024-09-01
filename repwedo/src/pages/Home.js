import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container>
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Welcome to RepWeDo
        </Typography>
        <Typography variant="h6" gutterBottom>
          Your go-to solution for all electrical repairs
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/services">
          Explore Services
        </Button>
      </Box>
    </Container>
  );
}

export default Home;
