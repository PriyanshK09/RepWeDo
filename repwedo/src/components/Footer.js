import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ p: 2, textAlign: 'center', mt: 'auto', backgroundColor: 'primary.main', color: 'white' }}>
      <Typography variant="body2">© 2024 RepWeDo. All rights reserved.</Typography>
    </Box>
  );
}

export default Footer;
