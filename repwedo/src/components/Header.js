import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          RepWeDo
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/services">
          Services
        </Button>
        <Button color="inherit" component={Link} to="/booking">
          Book Now
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
