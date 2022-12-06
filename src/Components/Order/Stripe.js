import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { placeOrder } from '../../store';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Button } from '@mui/material';
const MySwal = withReactContent(Swal);

const Stripe = ({ orderTotal }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const publishableKey =
    'pk_test_51M1nJKCcsJKN6oCNZcnv1njdMTOvl27iaju0kukf6to8YEzxsf85TsdtxQrLSIS9szGAel1J6m4SvMOzO82ojXp000nhK02HmK';

  const handleSuccess = () => {
    dispatch(placeOrder(orderTotal, navigate));
  };
  const handleFailure = () => {
    MySwal.fire({
      icon: 'error',
      title: 'Payment was not successful',
    });
  };
  const processPayment = async (token) => {
    try {
      const response = await axios.post('/api/orders/payment', {
        amount: orderTotal * 100,
        token,
      });
      if (response.status === 200) {
        handleSuccess();
      }
    } catch (error) {
      handleFailure();
    }
  };

  return (
    <div className="container">
      <StripeCheckout
        email={auth.email}
        stripeKey={publishableKey}
        label="Place Order"
        name="Pay With Credit Card"
        amount={Math.round(orderTotal * 100)}
        description="Pet Foodie "
        token={processPayment}
      >
        <Button variant="contained" color="secondary" sx={{ my: 3 }}>
          Place Order
        </Button>
      </StripeCheckout>
    </div>
  );
};

export default Stripe;
