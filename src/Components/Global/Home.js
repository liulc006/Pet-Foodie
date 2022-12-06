import React from 'react';
import { useSelector } from 'react-redux';
import HomeBanner from './HomeBanner';
import { useNavigate, Link } from 'react-router-dom';
import { Typography, Container, Box, Grid } from '@mui/material';

import ProductsList from '../Product/ProductsList';

const Home = () => {
  const { products } = useSelector((state) => state);

  const productsToShow = products.filter(
    (product) => product.isBestSeller === true
  );

  const navigate = useNavigate();
  return (
    <>
      <HomeBanner />
      <Container>
        <Typography variant="h6" mt={4} mb={6} align="center">
          At Pet Foodie, we strive to deliver the best pet food with the best
          service – and we want to become even better. Happy customers are
          always our #1 priority, and our team members are passionate about
          finding new ways to wow pet parents.
        </Typography>
        <Box
          mx={-40}
          align="center"
          style={{
            backgroundColor: '#ffeacc',
          }}
        >
          <Typography variant="h5" m={3} maxWidth="md" p={2}>
            LIMITED TIME OFFER:
            <br /> Free 1-3 day shipping on all orders over $100
          </Typography>
        </Box>

        <Grid
          container
          align="center"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Grid item xs={12} md={6}>
            <Link to={'/products'} state={{ preset: 'Dog' }}>
              <img
                alt="Dog Shop"
                src="../../static/img/dog_shop.png"
                width="480"
              />
            </Link>
          </Grid>
          <Grid item xs={12} md={6}>
            <Link to={'/products'} state={{ preset: 'Cat' }}>
              <img
                alt="Cat Shop"
                src="../../static/img/cat_shop.png"
                width="480"
              />
            </Link>
          </Grid>
        </Grid>

        <Typography variant="h2" m={3} align="center">
          Best Sellers
        </Typography>
        <Typography variant="h5" mb={6} align="center">
          Our goal is to be the most trusted and convenient destination for pet
          parents everywhere.
        </Typography>
        <ProductsList products={productsToShow} />
      </Container>
    </>
  );
};

export default Home;
