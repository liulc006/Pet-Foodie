import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { Container, Grid } from '@mui/material';

const ProductsList = ({ products }) => {
  return (
    <Container>
      <Grid container direction="row" rowSpacing={6} columnSpacing={3}>
        {products.map((product) => {
          return <ProductCard product={product} key={product.id} />;
        })}
      </Grid>
    </Container>
  );
};

export default ProductsList;
