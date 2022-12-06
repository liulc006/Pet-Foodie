import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LineItem from './LineItem';
import EmptyCart from './EmptyCart';
import { fetchCart, getSubtotal, getTotalQuantity } from '../../store';

import { Typography, Container, Button, Stack, Grid } from '@mui/material';

const Cart = () => {
  const {
    cart: { lineItems },
    auth,
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchCart());
    }
  }, [auth]);

  const subtotal = getSubtotal(lineItems) || 0;
  const totalQuantity = getTotalQuantity(lineItems) || 0;
  if (!lineItems.length || !auth.id) {
    return <EmptyCart />;
  } else {
    return (
      <Container maxWidth="sm" align="center">
        <Typography variant="h2" m={6}>
          Shopping Cart
        </Typography>
        <Stack spacing={3}>
          {lineItems.map((lineItem) => {
            return <LineItem key={lineItem.id} {...lineItem} />;
          })}
        </Stack>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ my: 3 }}
        >
          <Grid item>
            <Typography variant="h5">
              Subtotal: ${subtotal}
              {totalQuantity === 1
                ? ` (${totalQuantity} item)`
                : ` (${totalQuantity} items)`}
            </Typography>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </Button>
          </Grid>
        </Grid>
        <Typography variant="h6" sx={{ mt: 8, mb: 2 }}>
          {subtotal >= 100
            ? `Yeah! Your Order Ships Free`
            : `You're $${parseFloat(100 - subtotal).toFixed(2)} away from free
              shipping`}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          sx={{ my: 2 }}
          onClick={() => navigate('/products')}
        >
          ADD MORE TO CART
        </Button>
      </Container>
    );
  }
};

export default Cart;
