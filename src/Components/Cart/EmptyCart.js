import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography, Container, Button } from '@mui/material';
const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="sm" align="center">
      <Typography variant="h2" m={3}>
        Shopping Cart
      </Typography>
      <img alt="" src="../../static/img/empty_cart.png" width="300" />
      <Typography variant="h4" m={2}>
        Your cart is currently empty.
      </Typography>
      <Typography variant="h6" m={2}>
        And we can't wait to see what you'll put inside!
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        sx={{ my: 2 }}
        onClick={() => navigate('/products')}
      >
        Continue Shopping
      </Button>
    </Container>
  );
};

export default EmptyCart;
