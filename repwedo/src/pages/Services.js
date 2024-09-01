import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';

function Services() {
  const services = [
    { title: 'Fan Repair', description: 'Get your fans repaired by experts.' },
    { title: 'Light Installation', description: 'Quick and safe light installation.' },
    { title: 'Wiring Fixes', description: 'Fix any wiring issues in no time.' },
  ];

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Our Services
        </Typography>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  {service.title}
                </Typography>
                <Typography variant="body1">{service.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default Services;
