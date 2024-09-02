import React from 'react';
import { Box, Typography, Link, Grid, IconButton, Container, Divider, Button, useTheme } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, Email, Phone, LocationOn } from '@mui/icons-material';

const Footer = ({ mode }) => {
  const theme = useTheme();

  const footerStyle = {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    py: 6,
  };

  const linkStyle = {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.primary.main,
    },
  };

  return (
    <Box component="footer" sx={footerStyle}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: theme.palette.primary.main }}>
              RepWeDo
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Your trusted solution for all electrical repairs. We bring expert technicians right to your doorstep.
            </Typography>
            <Box>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Email sx={{ mr: 1, color: theme.palette.primary.main }} /> info@repwedo.com
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Phone sx={{ mr: 1, color: theme.palette.primary.main }} /> (555) 123-4567
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ mr: 1, color: theme.palette.primary.main }} /> 123 Repair St, Fixitville, TX 12345
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Quick Links
            </Typography>
            <Link href="/" sx={linkStyle}>Home</Link>
            <Link href="/services" sx={{ ...linkStyle, display: 'block', mt: 1 }}>Services</Link>
            <Link href="/booking" sx={{ ...linkStyle, display: 'block', mt: 1 }}>Book Now</Link>
            <Link href="/contact" sx={{ ...linkStyle, display: 'block', mt: 1 }}>Contact Us</Link>
            <Link href="/about" sx={{ ...linkStyle, display: 'block', mt: 1 }}>About Us</Link>
            <Link href="/faq" sx={{ ...linkStyle, display: 'block', mt: 1 }}>FAQ</Link>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Connect With Us
            </Typography>
            <Box sx={{ mb: 2 }}>
              <IconButton color="inherit" href="https://www.facebook.com" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" href="https://www.twitter.com" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" href="https://www.instagram.com" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" href="https://www.linkedin.com" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
            </Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Subscribe to our newsletter for updates and tips:
            </Typography>
            <Box component="form" sx={{ display: 'flex' }}>
              <input type="email" placeholder="Enter your email" style={{ 
                flex: 1, 
                padding: '8px', 
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: '4px 0 0 4px',
              }} />
              <Button 
                variant="contained" 
                sx={{ 
                  borderRadius: '0 4px 4px 0',
                  boxShadow: 'none',
                  '&:hover': { boxShadow: 'none' },
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
          </Grid>
        <Divider sx={{ my: 4 }} />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} RepWeDo. All rights reserved.
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Link href="/privacy" sx={linkStyle}>Privacy Policy</Link>
            {' | '}
            <Link href="/terms" sx={linkStyle}>Terms of Service</Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;