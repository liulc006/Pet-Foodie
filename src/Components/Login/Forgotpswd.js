import { getandsendEmail, clearresetUser } from '../../store';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Forgotpswd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetUser } = useSelector((state) => state);
  const [email, setEmail] = useState('');

  //everty time refresh this page, reset the resetUser to empty object
  useEffect(() => {
    dispatch(clearresetUser());
  }, []);

  //when click Send button, will send the emial to the render(store)
  const onSubmit = (ev) => {
    ev.preventDefault();
    dispatch(getandsendEmail(email));
  };
  return (
    <>
      {Object.keys(resetUser).length === 0 ? (
        <div
          style={{
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Forgot Password?
          </Typography>
          <Typography variant="h5" gutterBottom>
            Please enter your email for recovery
          </Typography>
          <form
            onSubmit={onSubmit}
            style={{
              margin: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Email
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                onChange={(ev) => setEmail(ev.target.value)}
                label="Email"
              />
            </FormControl>
            <Button
              variant="contained"
              sx={{ width: '30%', lm: '10%' }}
              onClick={onSubmit}
            >
              {' '}
              Send
            </Button>
          </form>
        </div>
      ) : (
        <div>
          {resetUser.getUser ? (
            <Box
              style={{
                with: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mx: '15px' }}>
                {resetUser.message}
              </Typography>
              <Box>
                <Link to="/products">Keep shopping</Link>
              </Box>
            </Box>
          ) : (
            <Box
              style={{
                with: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mx: '15px' }}>
                {resetUser.message}
              </Typography>
              <Button onClick={() => navigate(-1)}>Try again</Button>
            </Box>
          )}
        </div>
      )}
    </>
  );
};

export default Forgotpswd;
