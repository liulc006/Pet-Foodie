import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { addToCart } from '../../store';
import { Rating, Stack, Box } from '@mui/material';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { ratings } = useSelector((state) => state);

  const ratingStar = (arr, productId) => {
    const productRatings = arr.filter((rate) => rate.productId === productId);
    const averageRating =
      productRatings.reduce((acc, value) => {
        acc += value.star;
        return acc;
      }, 0) / productRatings.length;

    return (
      <Grid style={{ display: 'flex', alignItems: 'center' }}>
        <Rating
          name="half-rating-read"
          value={averageRating}
          precision={0.5}
          readOnly
        />

        <Typography variant="body2" ml={1}>
          {productRatings.length}{' '}
          {productRatings.length <= 1 ? 'review' : 'reviews'}
        </Typography>
      </Grid>
    );
  };

  return (
    <>
      <Grid item key={product.id} xs={12} sm={6} md={4}>
        <Card spacing={5}>
          <Link to={`/products/${product.id}`}>
            <CardMedia
              component="img"
              height="200"
              image={require('../../images/' + product.imageName)}
            />
          </Link>
          <CardContent>
            <Box>
              <Typography
                variant="body1"
                onClick={() => navigate(`/products/${product.id}`)}
                sx={{
                  '&:hover': {
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  },
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '3',
                  WebkitBoxOrient: 'vertical',
                }}
                gutterBottom
              >
                {product.name}
              </Typography>
            </Box>
            <Stack direction="row" spacing={1} sx={{ margin: '10px 0' }}>
              <Typography
                variant="subtitle2"
                sx={{
                  border: '1px solid',
                  borderRadius: '5px',
                  width: 'fit-content',
                  padding: '2px 8px',
                }}
              >
                {product.foodForm}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  border: '1px solid #00000099',
                  borderRadius: '5px',
                  width: 'fit-content',
                  padding: '2px 8px',
                }}
              >
                {product.animal}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  border: '1px solid',
                  borderRadius: '5px',
                  width: 'fit-content',
                  padding: '2px 8px',
                }}
              >
                {product.lifeStage}
              </Typography>
            </Stack>

            {ratingStar(ratings, product.id)}

            <Typography variant="h4" mt={2}>
              ${product.price}
            </Typography>
          </CardContent>
          <Button
            variant="contained"
            sx={{ width: '100%', display: 'block', margin: 'auto' }}
            onClick={() => dispatch(addToCart(product, 1, navigate))}
          >
            Add to Cart
          </Button>
        </Card>
      </Grid>
    </>
  );
};

export default ProductCard;
