import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginWithToken, updateAddress } from '../../store';
import {
  Typography,
  Container,
  Paper,
  Button,
  Input,
  Grid,
  FormControl,
} from '@mui/material';

const ShippingUpdate = ({ auth }) => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState({
    address: '',
  });
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    setAddress(auth.address);
  }, [auth]);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      await dispatch(updateAddress({ address }, auth.id));
      await dispatch(loginWithToken());
      setIsShow(!isShow);
    } catch (ex) {
      console.log(ex);
    }
  };

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
        <Grid container>
          <Grid item mr={2}>
            <Typography variant="h4" gutterBottom>
              Shipping Address
            </Typography>
          </Grid>
          {!isShow && (
            <Grid item>
              <Button onClick={() => setIsShow(!isShow)}>Edit</Button>
            </Grid>
          )}
          {isShow && (
            <Grid item>
              <Button onClick={handleSubmit}>Submit</Button>
            </Grid>
          )}
        </Grid>

        {!isShow && (
          <Typography variant="body1" mt={1}>
            {auth.address}
          </Typography>
        )}
        {isShow && (
          <FormControl>
            <Input
              placeholder={address}
              name={address}
              value={address}
              onChange={(ev) => {
                setAddress(ev.target.value);
              }}
              sx={{ width: '500' }}
            />
          </FormControl>
        )}
        <Typography variant="body1" mt={2}>
          Ship to: {auth.fullName}
        </Typography>
      </Container>
    </Paper>
  );
};

export default ShippingUpdate;
