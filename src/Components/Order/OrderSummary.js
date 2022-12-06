import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Container, Grid, Divider, Paper } from '@mui/material';

const OrderSummary = ({ subtotal, tax, shipping, orderTotal }) => {
  const { auth } = useSelector((state) => state);
  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        flexGrow: 4,
        backgroundColor: '#fff',
        width: '100%',
      }}
    >
      <Container align="left" sx={{ my: 3 }}>
        <Typography variant="h4" gutterBottom>
          Order Summary
        </Typography>
        <Grid container columns={9}>
          <Grid item xs={7}>
            <Typography variant="body1" gutterBottom>
              Subtotal:
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" gutterBottom>
              ${subtotal}
            </Typography>
          </Grid>
        </Grid>
        <Grid container columns={9}>
          <Grid item xs={7}>
            <Typography variant="body1" gutterBottom>
              Shipping:
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" gutterBottom>
              ${shipping}
            </Typography>
          </Grid>
        </Grid>
        <Grid container columns={9}>
          <Grid item xs={7}>
            <Typography variant="body1" gutterBottom>
              Estimated Tax:
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" gutterBottom>
              ${tax}
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 1 }} />
        <Grid container columns={9}>
          <Grid item xs={7}>
            <Typography variant="h5" gutterBottom>
              Order Total:
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h5" gutterBottom>
              ${orderTotal}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default OrderSummary;
