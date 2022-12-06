import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { fetchCart, getSubtotal, getTotalQuantity } from '../../store';
import { Typography, Container, Stack, Link } from '@mui/material';
import OrderSummary from './OrderSummary';
import ItemSummary from './ItemSummary';
import ShippingUpdate from './ShippingUpdate';
import Stripe from './Stripe';

const Checkout = () => {
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

  useEffect(() => {
    if (!lineItems.length || !auth.id) {
      navigate('/cart');
    }
  }, [auth]);
  const totalQuantity = getTotalQuantity(lineItems) || 0;
  const subtotal = getSubtotal(lineItems) || 0;
  const tax = parseFloat(subtotal * 0.065).toFixed(2);
  const shipping =
    subtotal >= 100 ? parseFloat(0).toFixed(2) : parseFloat(10).toFixed(2);
  const orderTotal = parseFloat(subtotal * 1 + tax * 1 + shipping * 1).toFixed(
    2
  );

  return (
    <>
      <Container maxWidth="sm" align="center">
        <Typography variant="h2" my={2}>
          Checkout
        </Typography>
        <Link component={RouterLink} to="/cart">
          Go back to Cart
        </Link>
        <Stack sx={{ my: 3 }} spacing={3}>
          <ItemSummary lineItems={lineItems} totalQuantity={totalQuantity} />
          <ShippingUpdate auth={auth} />
          <OrderSummary
            subtotal={subtotal}
            tax={tax}
            shipping={shipping}
            orderTotal={orderTotal}
          />
        </Stack>
        <Stripe orderTotal={orderTotal} />
      </Container>
    </>
  );
};

export default Checkout;
