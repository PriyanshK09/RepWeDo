import React, { useContext } from 'react';
import { Typography, Box, Button, Paper } from '@mui/material';
import { UserContext } from '../context/UserContext';

const Account = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <Box sx={{ padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Typography variant="h6">Name: {user.name}</Typography>
        <Typography variant="h6">Email: {user.email}</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={logout}
          sx={{ mt: 2 }}
        >
          Logout
        </Button>
      </Paper>
    </Box>
  );
};

export default Account;
