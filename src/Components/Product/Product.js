import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addToCart } from '../../store';
import RatingStar from '../Rating/RatingStar';
import RatingDetails from '../Rating/RatingDetails';
import { fetchRatings } from '../../store';
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Stack,
} from '@mui/material';
import ProductsList from './ProductsList';

const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state);
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    //dispatch(fetchProductRatings(id));
    dispatch(fetchRatings());
  }, []);

  const product = products.find((product) => product.id === id);
  const filteredProducts = products
    .filter((p) => p.animal === product.animal && p.id !== product.id)
    .slice(0, 3);

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = () => {
    console.log(amount);
    dispatch(addToCart(product, Number(amount), navigate));
    setAmount(1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <Container maxWidth="md">
      {/* product/descriptrion/ you may also like */}
      <Stack spacing={4}>
        <Grid container mr={5}>
          {/* image */}
          <Grid item xs={12} sm={4} py={3} pl={0} pr={5} height="300">
            <img
              src={require('../../images/' + product.imageName)}
              style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                height: '100%',
                width: '100%',
              }}
            />
          </Grid>
          {/* info */}
          <Grid item xs={12} sm={8}>
            <Stack spacing={2}>
              <Typography variant="h4">{product.name}</Typography>
              <RatingStar id={id} />
              {/* <Box>
                <Typography variant="body1">24 reviews</Typography>
              </Box> */}

              <Grid container sx={{ width: '70%' }}>
                {' '}
                <TextField
                  type="number"
                  style={{ flex: '1', marginRight: '20' }}
                  value={amount}
                  onChange={(e) => handleChange(e)}
                  inputProps={{ min: 0 }}
                ></TextField>
                <Button
                  variant="contained"
                  style={{ flex: '3' }}
                  onClick={() => handleSubmit()}
                >
                  Add to Cart
                </Button>
              </Grid>

              <Typography variant="h5">${product.price}</Typography>
              <Typography variant="body1">
                Categories: {product.animal}, {product.foodForm},{' '}
                {product.lifeStage}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Typography variant="h4">Product Description</Typography>
        <Typography variant="body1">{product.description}</Typography>
        <RatingDetails id={product.id} />
        <Typography variant="h4">You may also like</Typography>
        <ProductsList products={filteredProducts}></ProductsList>
      </Stack>
    </Container>
  );
};

export default Product;
