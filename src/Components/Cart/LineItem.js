import React from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { addToCart, removeFromCart } from '../../store';

import {
  Typography,
  Grid,
  Paper,
  Button,
  IconButton,
  Link,
} from '@mui/material';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
const LineItem = ({ product, quantity }) => {
  const dispatch = useDispatch();

  return (
    <Paper
      sx={{
        margin: 'auto',
        flexGrow: 4,
        backgroundColor: '#fff',
        width: '100%',
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          px: 1,
          py: 2,
        }}
      >
        <Grid
          item
          sx={{ width: '100', display: 'flex', justifyContent: 'center' }}
        >
          <img
            alt={product.name}
            /* {product.img} */
            src={require('../../images/' + product.imageName)}
            width="90%"
            height="90%"
          />
        </Grid>
        <Grid item sm container mr={2}>
          <Grid item xs container direction="column" align="left" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="body1" component="div">
                {product.name}
              </Typography>
              <Typography variant="body1" mt={2} gutterBottom>
                ${product.price}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                <Link component={RouterLink} to={`/products/${product.id}`}>
                  View Details
                </Link>
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography
              variant="body2"
              component="div"
              textAlign="center"
              gutterBottom
            >
              Quantity:
            </Typography>
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton
                color="primary"
                onClick={() => dispatch(removeFromCart(product, 1))}
              >
                <RemoveCircleOutlineIcon />
              </IconButton>

              <Typography variant="h6" component="div">
                {quantity}
              </Typography>
              <IconButton
                color="primary"
                onClick={() => dispatch(addToCart(product, 1))}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </Grid>

            <Grid />
            <Button
              variant="outlined"
              onClick={() => dispatch(removeFromCart(product, quantity))}
              sx={{ mt: 2 }}
            >
              <DeleteOutline sx={{ mr: 1 }} />
              Remove
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LineItem;
