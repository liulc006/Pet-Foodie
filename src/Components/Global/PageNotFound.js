import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Link } from '@mui/material';
const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Container align='center' maxWidth='sm' sx={{ my: 3 }}>
      <Typography variant='h2' m={6}>
        Oops! Page Not Found
      </Typography>
      <img alt='' src='../../static/img/404.png' width='300' />
      <Typography variant='h6' m={3}>
        Looks like you've followed a broken link or entered a URL that doesn't
        exist on this site.
      </Typography>
      <Link
        variant='h6'
        underline='hover'
        sx={{ cursor: 'pointer' }}
        onClick={() => navigate('/products')}
      >
        ← Back to Homepage
      </Link>
    </Container>
  );
};

export default PageNotFound;
