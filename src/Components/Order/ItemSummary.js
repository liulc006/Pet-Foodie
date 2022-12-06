import React from 'react';
import { Typography, Container, Grid, Paper, Divider } from '@mui/material';

const ItemSummary = ({ lineItems, totalQuantity }) => {
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
          Review Items
        </Typography>
        <Grid container columns={8}>
          <Grid item xs={7}>
            <Typography variant="body2" gutterBottom>
              Name
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="body2" gutterBottom>
              Qty
            </Typography>
          </Grid>
        </Grid>
        {lineItems.map((lineItem) => {
          return (
            <Grid container columns={8} key={lineItem.id} pb={1}>
              <Grid item xs={7}>
                <Typography variant="body1" gutterBottom mr={3}>
                  {lineItem.product.name}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="body1" gutterBottom>
                  {lineItem.quantity}
                </Typography>
              </Grid>
            </Grid>
          );
        })}
        <Divider sx={{ my: 1 }} />
        <Grid container columns={8}>
          <Grid item xs={7}>
            <Typography variant="h5" gutterBottom>
              Items Total:
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h5" gutterBottom>
              {totalQuantity}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default ItemSummary;
