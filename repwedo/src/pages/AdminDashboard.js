import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

const AdminDashboard = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/reviews/pending');
                setReviews(response.data);
            } catch (err) {
                console.error('Error fetching reviews:', err);
            }
        };
        fetchReviews();
    }, []);

    const handleAccept = async (id) => {
        try {
            await axios.post(`http://localhost:5000/api/reviews/accept/${id}`);
            setReviews(reviews.filter((review) => review._id !== id));
        } catch (err) {
            console.error('Error accepting review:', err);
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.post(`http://localhost:5000/api/reviews/reject/${id}`);
            setReviews(reviews.filter((review) => review._id !== id));
        } catch (err) {
            console.error('Error rejecting review:', err);
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>
                Admin Dashboard
            </Typography>
            <Typography sx={{ mb: 4 }}>
                Manage pending reviews.
            </Typography>
            <List>
                {reviews.map((review) => (
                    <ListItem key={review._id} sx={{ mb: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
                        <ListItemText
                            primary={review.content}
                            secondary={`Submitted by: ${review.username}`}
                        />
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleAccept(review._id)}
                            sx={{ mr: 2 }}
                        >
                            Accept
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleReject(review._id)}
                        >
                            Reject
                        </Button>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default AdminDashboard;
