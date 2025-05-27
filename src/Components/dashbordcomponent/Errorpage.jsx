import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <Container component="main" maxWidth="xs" style={{ textAlign: 'center', marginTop: '100px' }}>
      <Box>
        <Typography variant="h1" component="h1" style={{ fontSize: '4rem', fontWeight: 'bold', color: '#f44336' }}>
          Oops!
        </Typography>
        <Typography variant="h5" component="h2" style={{ margin: '20px 0' }}>
          Something went wrong.
        </Typography>
        <Typography variant="body1" color="textSecondary">
          We're sorry, but the page you're looking for does not exist or has been moved. 
          Please check the URL and try again.
        </Typography>
        <Typography variant="body1" color="textSecondary" style={{ margin: '20px 0' }}>
          If the problem persists, please contact support or return to the home page.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          component={Link} 
          to="/" 
          style={{ marginTop: '20px' }}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorPage;
