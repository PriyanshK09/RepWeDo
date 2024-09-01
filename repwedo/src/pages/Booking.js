import React from 'react';
import { Container, Typography, Box, TextField, Button } from '@mui/material';

function Booking() {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Book a Technician
        </Typography>
        <form>
          <TextField fullWidth label="Name" margin="normal" required />
          <TextField fullWidth label="Contact Number" margin="normal" required />
          <TextField fullWidth label="Address" margin="normal" required />
          <TextField fullWidth label="Issue Details" margin="normal" multiline rows={4} required />
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button variant="contained" color="primary" type="submit">
              Book Now
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default Booking;
