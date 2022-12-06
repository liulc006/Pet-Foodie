import React from 'react'
import AdminProductCard from './AdminProductCard';
import { Container, Grid } from '@mui/material';
import { useSelector } from 'react-redux';


const AdminProductslist = () => {
    const {products} = useSelector (state => state)
    // console.log(products)
    return (
        <Container>
            <Grid container direction='row' rowSpacing={6} columnSpacing={3}>
                {products.map((product) => {
                return (
                    <AdminProductCard product={product} columns={4} key={product.id} />
                );
                })}
            </Grid>
        </Container>
    );
};

export default AdminProductslist;

