import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Link } from '@mui/material';
const OrderComplete = () => {
  const navigate = useNavigate();
  return (
    <Container align="center" maxWidth="sm" sx={{ my: 3 }}>
      <Typography variant="h2" m={6}>
        Your order is complete!
      </Typography>
      <img alt="" src="../../../static/img/order_complete.png" width="300" />
      <Typography variant="h6" m={3}>
        You'll receive a confirmation email with order details.
      </Typography>
      <Link
        variant="h6"
        underline="hover"
        sx={{ cursor: 'pointer' }}
        onClick={() => navigate('/products')}
      >
        ← Explore More Pet Food
      </Link>
    </Container>
  );
};

export default OrderComplete;
