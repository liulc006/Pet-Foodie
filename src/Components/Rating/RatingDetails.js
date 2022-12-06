import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../store';
import {
  Rating,
  Typography,
  Button,
  Grid,
  Divider,
  Stack,
} from '@mui/material';
import dayjs from 'dayjs';
import AddRating from './AddRating';

const RatingDetails = (prop) => {
  const dispatch = useDispatch();
  const { ratings } = useSelector((state) => state);
  const { user } = useSelector((state) => state);
  const { auth } = useSelector((state) => state);
  const [view, setView] = useState(false);

  const productRating = ratings.filter((rate) => rate.productId === prop.id);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const click = () => {
    setView(!view);
  };

  return (
    <Grid conatiner>
      {view ? <AddRating view={view} setView={setView} /> : ''}
      <Grid
        item
        mb={2}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4">Reviews</Typography>
        {/* {auth.id ? <Link to={`/addRating/${prop.id}`} style={{ size: '0.5rem'}}>Write a Review</Link>:''} */}
        {auth.id && !view ? (
          <Button onClick={click}>Write a Review</Button>
        ) : (
          ''
        )}
      </Grid>
      <Grid item>
        <Divider />
      </Grid>

      {productRating.map((rating) => {
        return (
          <Stack container key={rating.id} spacing={2}>
            <Grid container sx={{ alignItems: 'center' }}>
              <Grid item mt={2}>
                <Rating defaultValue={rating.star} precision={1} readOnly />
              </Grid>
              <Grid item ml={2} mt={2}>
                <Typography variant="body2">
                  By{' '}
                  {user.filter((ele) => ele.id === rating.userId)[0]?.username}{' '}
                  on {dayjs(rating.createdAt).format('MMM D, YYYY')}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="body1">{rating.comment}</Typography>
            </Grid>
            <Grid item>
              <Divider />
            </Grid>
          </Stack>
        );
      })}
    </Grid>
  );
};

export default RatingDetails;
