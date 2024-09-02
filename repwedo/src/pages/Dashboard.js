import React from 'react';
import { Box, Typography } from '@mui/material';

const Dashboard = () => {
    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>
                User Dashboard
            </Typography>
            <Typography>
                Welcome to your dashboard! Here you can view your services, track orders, and manage your account.
            </Typography>
        </Box>
    );
};

export default Dashboard;
